import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    customer_name = Column(String(200), nullable=False)
    customer_phone = Column(String(50), nullable=False)
    table_number = Column(String(20), nullable=True)
    room_number = Column(String(20), nullable=True)
    delivery_address = Column(Text, nullable=True)
    
    order_type = Column(String(50), default="DINE_IN")  # DINE_IN, ROOM_SERVICE, TAKEAWAY, DELIVERY
    status = Column(String(50), default="PLACED", index=True)  # PLACED, CONFIRMED, PREPARING, READY, OUT_FOR_DELIVERY, COMPLETED, CANCELLED
    
    subtotal = Column(Float, nullable=False, default=0.0)
    tax = Column(Float, nullable=False, default=0.0)
    delivery_fee = Column(Float, default=0.0)
    discount = Column(Float, default=0.0)
    total = Column(Float, nullable=False, default=0.0)
    
    payment_method = Column(String(50), default="UPI")  # CASH, UPI, RAZORPAY, ROOM_FOLIO
    payment_status = Column(String(50), default="PENDING")  # PENDING, PAID, FAILED, REFUNDED
    notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    status_history = relationship("OrderStatusHistory", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    menu_item_id = Column(String(36), ForeignKey("menu_items.id", ondelete="SET NULL"), nullable=True)
    variant_id = Column(String(36), ForeignKey("menu_variants.id", ondelete="SET NULL"), nullable=True)
    
    name = Column(String(255), nullable=False)
    variant_name = Column(String(100), nullable=True)
    unit_price = Column(Float, nullable=False)  # Authoritative price snapshot
    quantity = Column(Integer, nullable=False, default=1)
    total_price = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    menu_item = relationship("MenuItem", back_populates="order_items")
    variant = relationship("MenuVariant", back_populates="order_items")


class OrderStatusHistory(Base):
    __tablename__ = "order_status_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    from_status = Column(String(50), nullable=True)
    to_status = Column(String(50), nullable=False)
    changed_by = Column(String(100), default="SYSTEM")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    order = relationship("Order", back_populates="status_history")
