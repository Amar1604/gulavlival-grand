import random
import string
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from app.core.database import get_db
from app.models.orders import Order, OrderItem, OrderStatusHistory
from app.models.menu import MenuItem, MenuVariant
from app.schemas.orders import OrderCreateRequest, OrderResponse

router = APIRouter()


def generate_order_number():
    random_digits = "".join(random.choices(string.digits, k=4))
    return f"GG-{random_digits}"


@router.post("", response_model=OrderResponse)
async def create_order(req: OrderCreateRequest, db: AsyncSession = Depends(get_db)):
    if not req.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    subtotal = 0.0
    order_items_to_create = []

    for item_in in req.items:
        # Fetch authoritative menu item
        query = select(MenuItem).filter(MenuItem.id == item_in.menu_item_id)
        result = await db.execute(query)
        menu_item = result.scalars().first()

        if not menu_item:
            raise HTTPException(status_code=404, detail=f"Menu item '{item_in.menu_item_id}' not found")

        unit_price = menu_item.base_price
        variant_name = None

        if item_in.variant_id:
            v_query = select(MenuVariant).filter(
                MenuVariant.id == item_in.variant_id,
                MenuVariant.menu_item_id == menu_item.id
            )
            v_result = await db.execute(v_query)
            variant = v_result.scalars().first()
            if not variant:
                raise HTTPException(status_code=400, detail=f"Invalid variant for item {menu_item.name}")
            unit_price = variant.price
            variant_name = variant.name

        line_total = round(unit_price * item_in.quantity, 2)
        subtotal += line_total

        order_items_to_create.append({
            "menu_item_id": menu_item.id,
            "variant_id": item_in.variant_id,
            "name": menu_item.name,
            "variant_name": variant_name,
            "unit_price": unit_price,
            "quantity": item_in.quantity,
            "total_price": line_total,
        })

    subtotal = round(subtotal, 2)
    tax = round(subtotal * 0.05, 2)  # 5% GST for restaurant dining
    delivery_fee = 30.0 if req.order_type == "DELIVERY" else 0.0
    total = round(subtotal + tax + delivery_fee, 2)

    order = Order(
        order_number=generate_order_number(),
        customer_name=req.customer_name,
        customer_phone=req.customer_phone,
        table_number=req.table_number,
        room_number=req.room_number,
        delivery_address=req.delivery_address,
        order_type=req.order_type,
        status="PLACED",
        subtotal=subtotal,
        tax=tax,
        delivery_fee=delivery_fee,
        discount=0.0,
        total=total,
        payment_method=req.payment_method,
        payment_status="PENDING",
        notes=req.notes,
    )
    db.add(order)
    await db.flush()

    # Create line items
    for item_dict in order_items_to_create:
        db.add(OrderItem(order_id=order.id, **item_dict))

    # Create initial status history entry
    db.add(OrderStatusHistory(
        order_id=order.id,
        from_status=None,
        to_status="PLACED",
        changed_by="CUSTOMER",
        notes="Order placed by customer",
    ))

    await db.commit()

    # Re-fetch order with items
    fetch_query = select(Order).options(selectinload(Order.items)).filter(Order.id == order.id)
    fetch_res = await db.execute(fetch_query)
    return fetch_res.scalars().first()


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, db: AsyncSession = Depends(get_db)):
    query = select(Order).options(selectinload(Order.items)).filter(
        (Order.id == order_id) | (Order.order_number == order_id)
    )
    result = await db.execute(query)
    order = result.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.get("", response_model=List[OrderResponse])
async def list_orders(
    status: Optional[str] = Query(None),
    limit: int = Query(50, le=100),
    db: AsyncSession = Depends(get_db)
):
    query = select(Order).options(selectinload(Order.items))
    if status:
        query = query.filter(Order.status == status)
    query = query.order_by(Order.created_at.desc()).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.patch("/{order_id}/status", response_model=OrderResponse)
async def update_order_status(
    order_id: str,
    new_status: str = Query(...),
    changed_by: str = Query("STAFF"),
    db: AsyncSession = Depends(get_db)
):
    allowed_statuses = ["PLACED", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "COMPLETED", "CANCELLED"]
    if new_status not in allowed_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {allowed_statuses}")

    query = select(Order).options(selectinload(Order.items)).filter(Order.id == order_id)
    result = await db.execute(query)
    order = result.scalars().first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    old_status = order.status
    order.status = new_status
    if new_status == "COMPLETED" and order.payment_status == "PENDING":
        order.payment_status = "PAID"

    db.add(OrderStatusHistory(
        order_id=order.id,
        from_status=old_status,
        to_status=new_status,
        changed_by=changed_by,
        notes=f"Status updated to {new_status}",
    ))

    await db.commit()
    return order
