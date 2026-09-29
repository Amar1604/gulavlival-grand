import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, Float, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), unique=True, nullable=False, index=True)
    description = Column(String(255), nullable=True)
    sort_order = Column(Integer, default=0)

    menu_items = relationship("MenuItem", back_populates="category_rel", cascade="all, delete-orphan")


class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category_id = Column(String(36), ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    category_name = Column(String(100), nullable=False)  # Denormalized for fast reads
    base_price = Column(Float, nullable=False)  # in INR (₹)
    image = Column(String(500), nullable=True)
    rating = Column(Float, default=5.0)
    popular = Column(Boolean, default=False)
    veg = Column(Boolean, default=True)
    calories = Column(Integer, nullable=True)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    category_rel = relationship("Category", back_populates="menu_items")
    variants = relationship("MenuVariant", back_populates="menu_item", cascade="all, delete-orphan")
    order_items = relationship("OrderItem", back_populates="menu_item")


class MenuVariant(Base):
    __tablename__ = "menu_variants"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    menu_item_id = Column(String(36), ForeignKey("menu_items.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)  # Regular, Medium, Large, Half, Full, etc.
    price = Column(Float, nullable=False)  # in INR (₹)
    is_available = Column(Boolean, default=True)

    menu_item = relationship("MenuItem", back_populates="variants")
    order_items = relationship("OrderItem", back_populates="variant")
