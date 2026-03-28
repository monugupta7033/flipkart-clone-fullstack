from pydantic import BaseModel
from uuid import UUID
from app.schemas.product import ProductListOut

class CartItemCreate(BaseModel):
    product_id: UUID
    quantity: int = 1

class CartItemOut(BaseModel):
    id: UUID
    product_id: UUID
    quantity: int
    product: ProductListOut

    class Config:
        from_attributes = True