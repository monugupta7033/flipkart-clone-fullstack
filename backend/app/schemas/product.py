from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class ProductListOut(BaseModel):
    id: UUID
    name: str
    price: float
    rating: float
    stock: int
    images: list
    category_id: Optional[int]

    class Config:
        from_attributes = True

class ProductOut(ProductListOut):
    description: Optional[str]
    specifications: Optional[dict]