from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import products, categories, cart, orders
from app.database import Base, engine
from app.models import user, product, cart as cart_model, order

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Flipkart Clone API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(cart.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {"status": "ok"}