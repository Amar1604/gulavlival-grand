import os
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Gulavlival Grand API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # PostgreSQL Database URL - Reads dynamically from environment / .env
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "postgresql+asyncpg://postgres:postgres@localhost:5432/gulavlival_grand"
    )
    DATABASE_URL_SYNC: str = os.getenv(
        "DATABASE_URL_SYNC", 
        "postgresql+psycopg2://postgres:postgres@localhost:5432/gulavlival_grand"
    )

    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "gulavlival-grand-dev-secret-key-change-in-prod")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day for local dev
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
