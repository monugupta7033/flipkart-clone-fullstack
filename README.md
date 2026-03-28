# 🛒 Flipkart Clone — Full Stack E-Commerce App

A fully functional e-commerce web application replicating Flipkart's UI and core features, built as part of the Scaler SDE Intern Fullstack Assignment.

---

## 🚀 Live Demo

- **Frontend:** _(Add Vercel link after deployment)_
- **Backend API:** _(Add Render link after deployment)_
- **API Docs:** `<backend-url>/docs`

---

## 🧰 Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React.js (Vite), React Router, Zustand, Axios |
| Backend  | Python 3.11, FastAPI, Uvicorn                 |
| Database | PostgreSQL 18, SQLAlchemy ORM                 |
| Styling  | Inline CSS (Flipkart design system)           |

---

## ✅ Features

### Core

- 🏠 **Product Listing Page** — Grid layout with Flipkart-style cards
- 🔍 **Search** — Search products by name in real time
- 🗂️ **Category Filter** — Filter by Electronics, Mobiles, Fashion, etc.
- 📄 **Product Detail Page** — Image carousel, specs table, stock status
- 🛒 **Shopping Cart** — Add, remove, update quantity, live price summary
- 📦 **Order Placement** — Shipping address form with order confirmation
- ✅ **Order Confirmation** — Displays order ID, total, and status

### Bonus

- 💛 Flipkart-accurate color scheme and layout
- 📱 Responsive grid layout
- ⚡ Buy Now button (adds to cart and redirects to checkout)
- 🔄 Cart persists across page refreshes (backend-stored)

---

## 🗄️ Database Schema

| Table       | Key Columns                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| users       | id, name, email, password_hash, created_at                                        |
| categories  | id, name, slug                                                                    |
| products    | id, category_id, name, price, stock, rating, images (JSON), specifications (JSON) |
| cart_items  | id, user_id, product_id, quantity, added_at                                       |
| orders      | id, user_id, total_amount, status, shipping_address (JSON), placed_at             |
| order_items | id, order_id, product_id, quantity, price_at_purchase                             |

**Key design decisions:**

- `images` and `specifications` stored as JSON — flexible per category
- `price_at_purchase` captured at order time — preserves historical accuracy
- Default user pre-seeded — no login required per assignment spec

---

## 📁 Project Structure

```
flipkart-clone/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app, CORS, routers
│   │   ├── database.py      # SQLAlchemy engine and session
│   │   ├── models/          # ORM models (user, product, cart, order)
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── routers/         # API endpoints (products, cart, orders)
│   │   ├── services/        # Business logic layer
│   │   └── seed.py          # Sample data seeder
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/             # Axios API calls
    │   ├── store/           # Zustand global cart state
    │   ├── components/      # Navbar
    │   └── pages/           # All page components
    └── .env
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 16+

### 1. Clone the repository

```
git clone https://github.com/monugupta7033/flipkart-clone.git
cd flipkart-clone
```

### 2. Backend setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` inside `backend/`:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost/flipkart
```

Run the backend:

```
uvicorn app.main:app --reload
```

### 3. Seed the database

```
python -m app.seed
```

### 4. Frontend setup

```
cd frontend
npm install
```

Create `.env` inside `frontend/`:

```
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint                | Description                                         |
| ------ | ----------------------- | --------------------------------------------------- |
| GET    | `/products`             | List products (supports search and category filter) |
| GET    | `/products/{id}`        | Get single product                                  |
| GET    | `/categories`           | List all categories                                 |
| GET    | `/cart`                 | Get cart items                                      |
| POST   | `/cart`                 | Add item to cart                                    |
| PUT    | `/cart/{id}?quantity=N` | Update item quantity                                |
| DELETE | `/cart/{id}`            | Remove item from cart                               |
| POST   | `/orders`               | Place an order                                      |
| GET    | `/orders/{id}`          | Get order details                                   |

---

## 🧪 Sample Data

10 products seeded across 5 categories:

- 📱 **Mobiles** — Samsung Galaxy S24 Ultra, Apple iPhone 15
- 💻 **Electronics** — Sony WH-1000XM5, Dell Inspiron 15
- 👟 **Fashion** — Nike Air Max 270, Levis 511 Jeans
- 🍳 **Home and Kitchen** — Instant Pot, Philips Air Fryer
- 📚 **Books** — Atomic Habits, The Alchemist

---

## 💡 Assumptions

- A default user is pre-seeded — no authentication required
- All cart and order operations use this default user
- Product images loaded from external URLs
- No payment gateway integration

---

## 👤 Author

Built by **Monu Raj** as part of the Scaler SDE Intern Fullstack Assignment
