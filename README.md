# 🏨 Gulavlival Grand

**Stay • Dine • Experience**

Integrated **Hotel + Restaurant + Hospitality Management Platform**.

Gulavlival Grand combines customer-facing food ordering, table reservations, and room bookings with operational back-office systems for kitchen, reception, housekeeping, inventory, billing, payments, staff, and management.

---

## 🌟 Key Capabilities

### 🍽️ Customer Dining Experience
- **Authentic Indian & Gourmet Menu**: 44+ handcrafted dishes across Pizza, Bread, Burger, Maggi, Chinese, Momos, Shakes, and Tea/Coffee.
- **Multi-Tier Size & Portion Variants**: Dynamic size selection (Regular, Medium, Large, Half, Full) in Indian Rupee (**₹**).
- **Cart & Server-Authoritative Checkout**: Accurate 5% GST calculation, table number and room service selection, and instant UPI/Card payment options.
- **Real-Time Order Tracking**: Live visual stepper tracking preparation status.

### 🏨 Hotel & Hospitality (In Progress)
- **Room Booking Engine**: Real-time room availability search with half-open interval booking `[check_in, check_out)` and database exclusion constraints.
- **Guest Folios**: Consolidated guest account covering room stay, restaurant food charges, and room service.
- **Reception & Housekeeping**: Operational status management (`AVAILABLE` → `OCCUPIED` → `CLEANING` → `AVAILABLE`).

### 👨‍🍳 Operational Core
- **Kitchen Display System (KDS)**: High-contrast tablet dashboard with real-time order queue and status progression.
- **Role-Based Access Control (RBAC)**: 10 distinct roles (Customer, Super Admin, Restaurant Manager, Hotel Manager, Kitchen Staff, Receptionist, Billing Staff, Inventory Manager, Housekeeping, Delivery Staff).
- **PostgreSQL Transactional Source of Truth**: Strict append-only financial records and zero floating-point money errors.

---

## 🏗️ Repository Architecture

```text
gulavlival-grand/
├── frontend/                        # Next.js 16 + React 19 Client
│   ├── app/                         # App Router (Customer & Staff routes)
│   ├── components/                  # Navbar, Footer, UI components
│   ├── context/                     # Cart Context (with variant support)
│   ├── lib/                         # Official menu data & auth helpers
│   ├── public/                      # Static assets & icons
│   ├── package.json                 # Frontend dependencies
│   ├── tsconfig.json                # TypeScript config
│   └── Dockerfile                   # Container config for Next.js
│
├── backend/                         # FastAPI (Python 3.13) Modular Monolith
│   ├── app/
│   │   ├── main.py                  # App entry point, CORS, and routers
│   │   ├── core/                    # Config, DB async engine, JWT security
│   │   ├── models/                  # SQLAlchemy 2.x declarative models
│   │   ├── schemas/                 # Pydantic v2 validation schemas
│   │   ├── api/v1/                  # Versioned API routes (auth, menu, orders)
│   │   └── websocket/               # Realtime WebSocket connection manager
│   ├── venv/                        # Python virtual environment (gitignored)
│   ├── requirements.txt             # Python dependencies
│   └── seed_db.py                   # PostgreSQL database seeder
│
├── .env.example                     # Environment template
├── .gitignore                       # Production gitignore
└── README.md                        # Documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Python](https://www.python.org/) (v3.12 or v3.13)
- [PostgreSQL](https://www.postgresql.org/) (v16 or v18)

---

### 1. Database Setup

Ensure PostgreSQL is running locally on port `5432`:

```sql
CREATE DATABASE gulavlival_grand;
```

Copy `.env.example` to `.env` and fill in your PostgreSQL credentials:

```bash
cp .env.example .env
```

---

### 2. Backend Setup (FastAPI)

```powershell
cd backend

# Create & activate Python virtual environment
python -m venv venv
.\venv\Scripts\activate   # On Windows
# source venv/bin/activate # On Linux/macOS

# Install dependencies
pip install -r requirements.txt

# Seed the database (Creates tables, 10 roles, admin account & 44+ menu items)
python seed_db.py

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```

- **Backend API**: `http://localhost:8000`
- **Swagger Documentation**: `http://localhost:8000/api/v1/docs`
- **Health Check**: `http://localhost:8000/health`

---

### 3. Frontend Setup (Next.js)

In a second terminal:

```powershell
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

- **Customer Web App**: `http://localhost:3000`
- **Dining Menu**: `http://localhost:3000/menu`
- **Admin Dashboard**: `http://localhost:3000/admin`

---

## 🔐 Default Credentials (Seeded)

- **Admin Email**: `admin@gulavlivalgrand.com`
- **Password**: `admin123`
- **Role**: `Super Admin`

---

## 📜 Engineering Principles

1. **Transactional Core First**: Identity → Menu → Cart → Order → Payment → Kitchen → Billing → Rooms/Bookings → Operations → Analytics.
2. **Authoritative Pricing**: Never calculate or trust pricing from the client; snapshot authoritative prices in order lines.
3. **Database-Level Integrity**: Enforce constraints in PostgreSQL; application checks alone are insufficient for hotel inventory.
4. **Append-Oriented Financials**: Financial records (folios/invoices) are immutable events; adjustments use credits rather than destructive updates.

---

## 📄 License

Proprietary & Confidential — All rights reserved © Gulavlival Grand.
