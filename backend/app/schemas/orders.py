from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class OrderItemCreate(BaseModel):
    menu_item_id: str
    variant_id: Optional[str] = None
    quantity: int = 1


class OrderCreateRequest(BaseModel):
    customer_name: str
    customer_phone: str
    table_number: Optional[str] = None
    room_number: Optional[str] = None
    delivery_address: Optional[str] = None
    order_type: str = "DINE_IN"  # DINE_IN, ROOM_SERVICE, TAKEAWAY, DELIVERY
    payment_method: str = "UPI"  # CASH, UPI, RAZORPAY, ROOM_FOLIO
    notes: Optional[str] = None
    items: List[OrderItemCreate]


class OrderItemResponse(BaseModel):
    id: str
    name: str
    variant_name: Optional[str] = None
    unit_price: float
    quantity: int
    total_price: float

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: str
    order_number: str
    customer_name: str
    customer_phone: str
    table_number: Optional[str] = None
    room_number: Optional[str] = None
    delivery_address: Optional[str] = None
    order_type: str
    status: str
    subtotal: float
    tax: float
    delivery_fee: float
    discount: float
    total: float
    payment_method: str
    payment_status: str
    notes: Optional[str] = None
    created_at: datetime
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True
