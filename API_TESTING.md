# API Testing Guide

This document provides example API calls for testing the ecommerce platform.

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Products

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Product by ID
```bash
curl http://localhost:5000/api/products/1
```

### Create Product (Protected)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10
  }'
```

### Update Product (Protected)
```bash
curl -X PUT http://localhost:5000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "price": 89.99,
    "stock": 15
  }'
```

### Delete Product (Protected)
```bash
curl -X DELETE http://localhost:5000/api/products/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Cart (All Protected)

### Get Cart
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Update Cart Item
```bash
curl -X PUT http://localhost:5000/api/cart/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": 1,
    "quantity": 3
  }'
```

### Remove from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/remove/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/clear \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Orders (All Protected)

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "shippingAddress": "123 Main St, City, Country",
    "paymentMethod": "Cash on Delivery"
  }'
```

### Get All Orders
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Order by ID
```bash
curl http://localhost:5000/api/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "status": "shipped"
  }'
```

## Complete Workflow Example

### 1. Register and Login
```bash
# Register
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### 2. Browse Products
```bash
curl http://localhost:5000/api/products | jq '.products[:3]'
```

### 3. Add Items to Cart
```bash
# Add Laptop (Product 1)
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"productId":1,"quantity":1}'

# Add Smartphone (Product 2)
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"productId":2,"quantity":1}'
```

### 4. View Cart
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer $TOKEN" | jq .
```

### 5. Place Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"shippingAddress":"123 Main St, City, Country","paymentMethod":"Cash on Delivery"}' \
  | jq .
```

### 6. View Order History
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer $TOKEN" | jq .
```

## Health Check
```bash
curl http://localhost:5000/api/health
```

## Notes

- Replace `YOUR_TOKEN_HERE` with the actual JWT token received from login/register
- The `jq` command is used to format JSON responses (install with `sudo apt-get install jq` if needed)
- In-memory database resets when server restarts
- All prices are in USD
- Stock is automatically decremented when orders are placed
