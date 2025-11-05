# Ecommerce Platform

A full-stack ecommerce platform built with React (frontend) and Node.js/Express (backend).

## Features

### Frontend
- 🛍️ Product browsing and search
- 🔐 User authentication (Login/Register)
- 🛒 Shopping cart management
- 💳 Checkout process
- 📦 Order history and tracking
- 📱 Responsive design

### Backend
- ✅ RESTful API architecture
- 🔒 JWT-based authentication
- 📦 Product management (CRUD operations)
- 🛒 Cart management
- 📝 Order processing
- 💾 In-memory database (easily replaceable with MongoDB/PostgreSQL)

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Project Structure

```
myfirst_project/
├── backend/
│   ├── models/
│   │   └── database.js          # Data models and in-memory database
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product routes
│   │   ├── cart.js              # Cart routes
│   │   └── orders.js            # Order routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── server.js                # Express server setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js        # Navigation header
│   │   │   └── ProductCard.js   # Product display card
│   │   ├── pages/
│   │   │   ├── Home.js          # Product listing page
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Cart.js          # Shopping cart page
│   │   │   ├── Checkout.js      # Checkout page
│   │   │   └── Orders.js        # Order history page
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd myfirst_project
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Configuration

1. Backend configuration:
```bash
cd backend
cp .env.example .env
# Edit .env and set your configuration
```

Default backend `.env`:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

2. Frontend configuration:
```bash
cd frontend
cp .env.example .env
# Edit .env if needed
```

Default frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get all products
```
GET /api/products
```

#### Get product by ID
```
GET /api/products/:id
```

#### Create product (Protected)
```
POST /api/products
Headers: { Authorization: "Bearer <token>" }
Body: {
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 10
}
```

#### Update product (Protected)
```
PUT /api/products/:id
Headers: { Authorization: "Bearer <token>" }
Body: { <fields to update> }
```

#### Delete product (Protected)
```
DELETE /api/products/:id
Headers: { Authorization: "Bearer <token>" }
```

### Cart Endpoints (All Protected)

#### Get cart
```
GET /api/cart
Headers: { Authorization: "Bearer <token>" }
```

#### Add to cart
```
POST /api/cart/add
Headers: { Authorization: "Bearer <token>" }
Body: {
  "productId": 1,
  "quantity": 2
}
```

#### Update cart item
```
PUT /api/cart/update
Headers: { Authorization: "Bearer <token>" }
Body: {
  "productId": 1,
  "quantity": 3
}
```

#### Remove from cart
```
DELETE /api/cart/remove/:productId
Headers: { Authorization: "Bearer <token>" }
```

#### Clear cart
```
DELETE /api/cart/clear
Headers: { Authorization: "Bearer <token>" }
```

### Order Endpoints (All Protected)

#### Create order
```
POST /api/orders
Headers: { Authorization: "Bearer <token>" }
Body: {
  "shippingAddress": "123 Main St, City, Country",
  "paymentMethod": "Cash on Delivery"
}
```

#### Get all orders
```
GET /api/orders
Headers: { Authorization: "Bearer <token>" }
```

#### Get order by ID
```
GET /api/orders/:id
Headers: { Authorization: "Bearer <token>" }
```

#### Update order status
```
PUT /api/orders/:id/status
Headers: { Authorization: "Bearer <token>" }
Body: {
  "status": "shipped"
}
```

## Default Products

The application comes with 10 pre-loaded products across various categories:
- Electronics (Laptop, Smartphone, Headphones, Bluetooth Speaker)
- Sports (Running Shoes, Water Bottle)
- Home (Coffee Maker)
- Accessories (Backpack, Watch)
- Furniture (Desk Chair)

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Future Enhancements

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Product images upload
- [ ] Advanced search and filtering
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] Wishlist functionality
- [ ] User profile management

## Security Notes

- Change the JWT_SECRET in production
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS in production
- Implement proper error handling
- Add request logging
- Consider implementing refresh tokens

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
