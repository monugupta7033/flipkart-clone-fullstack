from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.order import Order, OrderItem
from app.models.cart import CartItem
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["orders"])

DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000001"

@router.post("/", response_model=OrderOut)
def place_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    cart_items = db.query(CartItem).filter(
        CartItem.user_id == DEFAULT_USER_ID
    ).all()

    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = sum(item.product.price * item.quantity for item in cart_items)

    order = Order(
        user_id=DEFAULT_USER_ID,
        total_amount=total,
        shipping_address=order_data.shipping_address.dict()
    )
    db.add(order)
    db.flush()

    for item in cart_items:
        db.add(OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.product.price
        ))
        db.delete(item)

    db.commit()
    db.refresh(order)
    return order

@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order