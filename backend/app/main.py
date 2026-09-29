from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, menu, orders

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Gulavlival Grand - Integrated Hotel + Restaurant + Hospitality Management Platform API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# Set CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication & RBAC"])
app.include_router(menu.router, prefix=f"{settings.API_V1_STR}/menu", tags=["Restaurant & Menu"])
app.include_router(orders.router, prefix=f"{settings.API_V1_STR}/orders", tags=["Orders & Kitchen"])


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "platform": "Gulavlival Grand",
        "tagline": "Stay • Dine • Experience",
        "version": settings.VERSION,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
