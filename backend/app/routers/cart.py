from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.cart import CartItem
from app.schemas.cart import CartItemCreate, CartItemOut

router = APIRouter(prefix="/cart", tags=["cart"])

DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000001"

@router.get("/", response_model=list[CartItemOut])
def get_cart(db: Session = Depends(get_db)):
    return db.query(CartItem).filter(CartItem.user_id == DEFAULT_USER_ID).all()

@router.post("/", response_model=CartItemOut)
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    existing = db.query(CartItem).filter(
        CartItem.user_id == DEFAULT_USER_ID,
        CartItem.product_id == item.product_id
    ).first()
    if existing:
        existing.quantity += item.quantity
        db.commit()
        db.refresh(existing)
        return existing
    cart_item = CartItem(**item.dict(), user_id=DEFAULT_USER_ID)
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.put("/{item_id}")
def update_quantity(item_id: str, quantity: int, db: Session = Depends(get_db)):
    item = db.query(CartItem).filter(CartItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    if quantity <= 0:
        db.delete(item)
    else:
        item.quantity = quantity
    db.commit()
    return {"success": True}

@router.delete("/{item_id}")
def remove_from_cart(item_id: str, db: Session = Depends(get_db)):
    item = db.query(CartItem).filter(CartItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return {"success": True}