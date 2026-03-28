from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product, Category
from app.schemas.product import ProductOut, ProductListOut

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=list[ProductListOut])
def list_products(
    db: Session = Depends(get_db),
    search: str | None = Query(None),
    category: int | None = Query(None),
    skip: int = 0,
    limit: int = 20
):
    query = db.query(Product)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Product.category_id == category)
    return query.offset(skip).limit(limit).all()

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.id == product_id).first()