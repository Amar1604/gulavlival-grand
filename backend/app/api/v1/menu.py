from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.menu import Category, MenuItem
from app.schemas.menu import CategoryResponse, MenuItemResponse

router = APIRouter()


@router.get("/categories", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).order_by(Category.sort_order.asc()))
    return result.scalars().all()


@router.get("/items", response_model=List[MenuItemResponse])
async def get_menu_items(
    category: Optional[str] = Query(None, description="Filter by category name"),
    popular_only: Optional[bool] = Query(False, description="Filter popular items"),
    db: AsyncSession = Depends(get_db)
):
    query = select(MenuItem).options(selectinload(MenuItem.variants)).filter(MenuItem.is_available == True)

    if category and category != "All":
        query = query.filter(MenuItem.category_name == category)

    if popular_only:
        query = query.filter(MenuItem.popular == True)

    query = query.order_by(MenuItem.rating.desc(), MenuItem.name.asc())
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/items/{item_id}", response_model=MenuItemResponse)
async def get_menu_item(item_id: str, db: AsyncSession = Depends(get_db)):
    query = select(MenuItem).options(selectinload(MenuItem.variants)).filter(MenuItem.id == item_id)
    result = await db.execute(query)
    item = result.scalars().first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
