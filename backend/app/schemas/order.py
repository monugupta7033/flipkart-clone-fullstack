from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ShippingAddress(BaseModel):
    full_name: str
    phone: str
    address: str
    city: str
    state: str
    pincode: str

class OrderCreate(BaseModel):
    shipping_address: ShippingAddress

class OrderItemOut(BaseModel):
    product_id: UUID
    quantity: int
    price_at_purchase: float

    class Config:
        from_attributes = True

class OrderOut(BaseModel):
    id: UUID
    total_amount: float
    status: str
    shipping_address: dict
    placed_at: datetime
    items: list[OrderItemOut]

    class Config:
        from_attributes = True