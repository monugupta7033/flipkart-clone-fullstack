from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Category

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()