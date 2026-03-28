from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.product import Product, Category
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
import uuid

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Create default user
user = User(
    id=uuid.UUID("00000000-0000-0000-0000-000000000001"),
    name="Default User",
    email="user@flipkart.com",
    password_hash="none"
)
db.merge(user)
db.commit()

# Create categories
categories = [
    Category(id=1, name="Electronics", slug="electronics"),
    Category(id=2, name="Mobiles", slug="mobiles"),
    Category(id=3, name="Fashion", slug="fashion"),
    Category(id=4, name="Home & Kitchen", slug="home-kitchen"),
    Category(id=5, name="Books", slug="books"),
]
for c in categories:
    db.merge(c)
db.commit()

# Create products
products = [
    Product(name="Samsung Galaxy S24 Ultra", description="Latest Samsung flagship with 200MP camera and S Pen.", price=124999, stock=50, rating=4.5, category_id=2, images=["https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573652"], specifications={"Brand": "Samsung", "RAM": "12GB", "Storage": "256GB", "Battery": "5000mAh"}),
    Product(name="Apple iPhone 15", description="Apple iPhone 15 with Dynamic Island and 48MP camera.", price=79999, stock=30, rating=4.6, category_id=2, images=["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=400"], specifications={"Brand": "Apple", "RAM": "6GB", "Storage": "128GB", "Battery": "3877mAh"}),
    Product(name="Sony WH-1000XM5 Headphones", description="Industry-leading noise cancelling headphones.", price=24999, stock=40, rating=4.7, category_id=1, images=["https://www.sony.co.in/image/5d02da5df552836db894cead8a68f764?fmt=pjpeg&wid=400"], specifications={"Brand": "Sony", "Type": "Over-ear", "Battery": "30 hours", "Connectivity": "Bluetooth 5.2"}),
    Product(name="Dell Inspiron 15 Laptop", description="15.6 inch FHD laptop with Intel Core i5 processor.", price=58990, stock=25, rating=4.3, category_id=1, images=["https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/inspiron-15-3530/media-gallery/black/notebook-inspiron-15-3530-black-gallery-4.psd?fmt=pjpg&wid=400"], specifications={"Brand": "Dell", "Processor": "Intel i5", "RAM": "16GB", "Storage": "512GB SSD"}),
    Product(name="Nike Air Max 270", description="Men's running shoes with Max Air cushioning.", price=11995, stock=100, rating=4.4, category_id=3, images=["https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png"], specifications={"Brand": "Nike", "Material": "Mesh", "Sole": "Rubber", "Closure": "Lace-up"}),
    Product(name="Levi's 511 Slim Jeans", description="Classic slim fit jeans in stretch denim.", price=3999, stock=200, rating=4.2, category_id=3, images=["https://lsco.scene7.com/is/image/lsco/045111392-front-pdp?fmt=jpeg&wid=400"], specifications={"Brand": "Levi's", "Fit": "Slim", "Material": "Denim", "Rise": "Mid-rise"}),
    Product(name="Instant Pot Duo 7-in-1", description="Electric pressure cooker, slow cooker, rice cooker and more.", price=8999, stock=60, rating=4.5, category_id=4, images=["https://www.instantpot.com/wp-content/uploads/2022/04/IP-Duo-7in1_6qt.png"], specifications={"Brand": "Instant Pot", "Capacity": "6 Quart", "Functions": "7-in-1", "Wattage": "1000W"}),
    Product(name="Philips Air Fryer", description="Rapid Air technology for healthy frying with little to no oil.", price=6995, stock=45, rating=4.4, category_id=4, images=["https://www.philips.co.in/c-dam/b2c/category-pages/kitchen/air-fryers/HD9252.jpg"], specifications={"Brand": "Philips", "Capacity": "4.1L", "Wattage": "1400W", "Temperature": "Up to 200°C"}),
    Product(name="Atomic Habits - James Clear", description="An Easy & Proven Way to Build Good Habits & Break Bad Ones.", price=499, stock=500, rating=4.8, category_id=5, images=["https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UY436_FMwebp_QL65_.jpg"], specifications={"Author": "James Clear", "Pages": "320", "Language": "English", "Publisher": "Penguin"}),
    Product(name="The Alchemist - Paulo Coelho", description="A magical story about following your dreams.", price=299, stock=300, rating=4.7, category_id=5, images=["https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg"], specifications={"Author": "Paulo Coelho", "Pages": "208", "Language": "English", "Publisher": "HarperOne"}),
]

for p in products:
    db.add(p)

db.commit()
db.close()
print("Database seeded successfully with 10 products across 5 categories!")