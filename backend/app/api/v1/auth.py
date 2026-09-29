from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token
from app.models.identity import User, Role, UserRole
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserResponse
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    if not token:
        return None
    payload = decode_access_token(token)
    if not payload:
        return None
    user_id = payload.get("sub")
    if not user_id:
        return None

    query = select(User).options(selectinload(User.user_roles).selectinload(UserRole.role)).filter(User.id == user_id)
    result = await db.execute(query)
    user = result.scalars().first()
    return user


@router.post("/register", response_model=TokenResponse)
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    # Check if email exists
    result = await db.execute(select(User).filter(User.email == req.email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=req.email,
        full_name=req.full_name,
        phone=req.phone,
        password_hash=get_password_hash(req.password),
        is_active=True,
    )
    db.add(new_user)
    await db.flush()

    # Assign Customer role by default
    cust_role_query = select(Role).filter(Role.name == "Customer")
    cust_role_res = await db.execute(cust_role_query)
    cust_role = cust_role_res.scalars().first()
    if cust_role:
        db.add(UserRole(user_id=new_user.id, role_id=cust_role.id))

    await db.commit()

    token = create_access_token(data={"sub": new_user.id, "email": new_user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name,
            "phone": new_user.phone,
            "is_active": new_user.is_active,
            "roles": ["Customer"],
        }
    }


@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    query = select(User).options(selectinload(User.user_roles).selectinload(UserRole.role)).filter(User.email == req.email)
    result = await db.execute(query)
    user = result.scalars().first()

    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    roles = [ur.role.name for ur in user.user_roles if ur.role]
    token = create_access_token(data={"sub": user.id, "email": user.email, "roles": roles})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "phone": user.phone,
            "is_active": user.is_active,
            "roles": roles,
        }
    }


@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    roles = [ur.role.name for ur in user.user_roles if ur.role]
    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "is_active": user.is_active,
        "roles": roles,
    }
