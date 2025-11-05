# Ecommerce Platform Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
│                    (React Application)                           │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Login/     │  │   Product    │  │  Shopping    │          │
│  │   Register   │  │   Catalog    │  │    Cart      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │   Checkout   │  │    Orders    │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS
                              │ (axios)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVER                              │
│                  (Node.js + Express.js)                          │
│                                                                   │
│  ┌───────────────────────────────────────────────────────┐      │
│  │                    API Routes                          │      │
│  │                                                         │      │
│  │  /api/auth          - Authentication                   │      │
│  │  /api/products      - Product Management               │      │
│  │  /api/cart          - Shopping Cart                    │      │
│  │  /api/orders        - Order Processing                 │      │
│  └───────────────────────────────────────────────────────┘      │
│                              │                                    │
│                              ▼                                    │
│  ┌───────────────────────────────────────────────────────┐      │
│  │              Middleware Layer                          │      │
│  │                                                         │      │
│  │  • Authentication (JWT Verification)                   │      │
│  │  • CORS                                                │      │
│  │  • Body Parser                                         │      │
│  │  • Error Handler                                       │      │
│  └───────────────────────────────────────────────────────┘      │
│                              │                                    │
│                              ▼                                    │
│  ┌───────────────────────────────────────────────────────┐      │
│  │              Data Layer                                │      │
│  │         (In-Memory Database)                           │      │
│  │                                                         │      │
│  │  • Users Collection                                    │      │
│  │  • Products Collection (10 preloaded)                  │      │
│  │  • Carts Collection                                    │      │
│  │  • Orders Collection                                   │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### Frontend Components

```
App.js (Main Application)
├── Header (Navigation)
│   ├── Logo
│   ├── Product Link
│   ├── Cart Link (with badge)
│   ├── Orders Link
│   └── Auth Links (Login/Register or Logout)
│
├── AuthContext (State Management)
│   ├── User State
│   ├── Login Function
│   ├── Register Function
│   └── Logout Function
│
├── Pages
│   ├── Home (Product Listing)
│   │   └── ProductCard Components
│   ├── Login
│   ├── Register
│   ├── Cart
│   ├── Checkout
│   └── Orders
│
└── Services
    └── API Service
        ├── Auth API
        ├── Products API
        ├── Cart API
        └── Orders API
```

### Backend Structure

```
server.js (Express App)
├── Routes
│   ├── auth.js
│   │   ├── POST /register
│   │   └── POST /login
│   │
│   ├── products.js
│   │   ├── GET /products
│   │   ├── GET /products/:id
│   │   ├── POST /products (Protected)
│   │   ├── PUT /products/:id (Protected)
│   │   └── DELETE /products/:id (Protected)
│   │
│   ├── cart.js (All Protected)
│   │   ├── GET /cart
│   │   ├── POST /cart/add
│   │   ├── PUT /cart/update
│   │   ├── DELETE /cart/remove/:productId
│   │   └── DELETE /cart/clear
│   │
│   └── orders.js (All Protected)
│       ├── POST /orders
│       ├── GET /orders
│       ├── GET /orders/:id
│       └── PUT /orders/:id/status
│
├── Middleware
│   └── auth.js (JWT Verification)
│
└── Models
    └── database.js (In-Memory Data Store)
```

## Data Flow Examples

### 1. User Registration Flow
```
User → Registration Form → Frontend
                              ↓
                    POST /api/auth/register
                              ↓
                         Backend API
                              ↓
                    Hash Password (bcrypt)
                              ↓
                      Save to Database
                              ↓
                    Generate JWT Token
                              ↓
                  Return Token + User Info
                              ↓
                    Store in LocalStorage
                              ↓
                    Update AuthContext
                              ↓
                  Redirect to Home Page
```

### 2. Shopping Flow
```
Browse Products → View Details → Add to Cart
      ↓                             ↓
  GET /api/products      POST /api/cart/add (with JWT)
      ↓                             ↓
  Display Products            Update Cart State
                                    ↓
                              View Cart Page
                                    ↓
                           GET /api/cart (with JWT)
                                    ↓
                           Display Cart Items
                                    ↓
                              Checkout Page
                                    ↓
                        POST /api/orders (with JWT)
                                    ↓
                           Create Order Record
                                    ↓
                          Update Product Stock
                                    ↓
                             Clear Cart
                                    ↓
                         Redirect to Orders
```

### 3. Authentication Flow
```
Login Request
     ↓
POST /api/auth/login
     ↓
Verify Credentials
     ↓
Generate JWT Token
     ↓
Return to Client
     ↓
Store in LocalStorage
     ↓
Include in Headers (Authorization: Bearer <token>)
     ↓
Every Protected API Request
     ↓
Verify Token in Middleware
     ↓
Extract User Info
     ↓
Process Request
```

## Technology Stack

### Frontend
- **React 18** - UI Framework
- **React Router v6** - Navigation
- **Axios** - HTTP Client
- **Context API** - State Management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **CORS** - Cross-Origin Support
- **dotenv** - Environment Config

## API Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_if_applicable"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Detailed error info (dev mode only)"
}
```

## Security Layers

```
Request → CORS Check → JWT Validation → Route Handler → Response
             ↓              ↓               ↓
         Allowed?      Valid Token?    Authorized?
             ↓              ↓               ↓
            Yes            Yes             Yes
                                            ↓
                                      Process Request
```

## Deployment Considerations

### Frontend Deployment
- Build static files: `npm run build`
- Deploy to: Netlify, Vercel, AWS S3, or any static hosting
- Configure API URL environment variable

### Backend Deployment
- Deploy to: Heroku, AWS EC2, Digital Ocean, Railway
- Set environment variables
- Enable HTTPS
- Add rate limiting
- Connect to production database

## Future Enhancements

1. **Database Integration**
   - MongoDB or PostgreSQL
   - Database migrations
   - Connection pooling

2. **Advanced Features**
   - Search and filtering
   - Product categories
   - User reviews
   - Wishlist
   - Admin dashboard

3. **Security Enhancements**
   - Rate limiting
   - Input sanitization
   - 2FA authentication
   - Session management

4. **Performance**
   - Caching (Redis)
   - CDN for images
   - Database indexing
   - Load balancing

5. **Payment Integration**
   - Stripe
   - PayPal
   - Other payment gateways
