# Quick Start Guide

Welcome! This guide will help you get the ecommerce platform up and running in minutes.

## Prerequisites

Make sure you have these installed:
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)
- A code editor (VS Code recommended)
- A terminal/command prompt

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd myfirst_project
```

## Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies (this will take a minute)
npm install

# Create environment file
cp .env.example .env

# Start the backend server
npm start
```

You should see: `Server is running on port 5000`

Keep this terminal window open!

## Step 3: Setup Frontend (New Terminal)

Open a NEW terminal window and run:

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies (this will take 2-3 minutes)
npm install

# Create environment file
cp .env.example .env

# Start the frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

## Step 4: Test the Application

### Create an Account
1. Click "Register" in the top navigation
2. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
3. Click "Register"

You'll be automatically logged in!

### Browse Products
- You should see 10 products on the home page
- Products include laptops, smartphones, headphones, and more

### Add to Cart
1. Click "Add to Cart" on any product
2. Click "Cart" in the navigation to see your cart
3. You can adjust quantities or remove items

### Place an Order
1. Click "Proceed to Checkout"
2. Enter a shipping address
3. Select payment method
4. Click "Place Order"
5. View your order in "My Orders"

## Quick API Test (Optional)

Test the API directly using curl:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Get all products
curl http://localhost:5000/api/products
```

## Project Structure

```
myfirst_project/
├── backend/              # Node.js/Express API
│   ├── models/          # Database models
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   └── server.js        # Entry point
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # State management
│   │   └── services/   # API calls
│   └── public/         # Static files
│
└── README.md           # Full documentation
```

## Common Issues & Solutions

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill the process using port 5000
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Backend Won't Start
**Problem:** Dependencies missing or errors

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Frontend Won't Start
**Problem:** Build errors or dependency issues

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Can't Login/Register
**Problem:** Backend not running

**Solution:** Make sure the backend server is running on port 5000

## Default Credentials for Testing

Since the database is in-memory, you need to register first. Use:
- Email: test@example.com
- Password: password123

Or create your own account!

## What's Included?

### Pre-loaded Products (10 items)
1. Laptop - $999.99
2. Smartphone - $699.99
3. Headphones - $199.99
4. Running Shoes - $89.99
5. Coffee Maker - $79.99
6. Backpack - $49.99
7. Watch - $149.99
8. Desk Chair - $249.99
9. Bluetooth Speaker - $59.99
10. Water Bottle - $24.99

### Features Working
✅ User Registration & Login
✅ Browse Products
✅ Add to Cart
✅ Update Cart Quantities
✅ Remove from Cart
✅ Checkout Process
✅ Order History
✅ Protected Routes (must login)

## Next Steps

### Learn More
- Read `README.md` for detailed documentation
- Check `API_TESTING.md` for API examples
- Review `ARCHITECTURE.md` to understand the system
- Read `SECURITY.md` for security considerations

### Customize
- Add more products in `backend/models/database.js`
- Change colors in CSS files
- Add new features (search, filters, reviews)
- Connect to a real database

### Deploy
- Follow instructions in README.md for deployment
- Consider using free tiers:
  - Frontend: Vercel, Netlify
  - Backend: Heroku, Railway

## Need Help?

### Documentation Files
- `README.md` - Complete setup and API docs
- `API_TESTING.md` - How to test APIs
- `ARCHITECTURE.md` - System design
- `SECURITY.md` - Security information

### Check Status
```bash
# Backend health
curl http://localhost:5000/api/health

# Should return: {"status":"ok","message":"Ecommerce API is running"}
```

## Development Tips

### Watch Mode (Auto-restart on changes)
```bash
# Backend with nodemon
cd backend
npm run dev

# Frontend (already watches by default)
cd frontend
npm start
```

### View Logs
- Backend logs appear in the terminal where you ran `npm start`
- Frontend errors appear in browser console (F12)

### Stop Servers
- Press `Ctrl + C` in the terminal to stop a server

## Success Checklist

Before you start coding:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register a new user
- [ ] Can login
- [ ] Can view products
- [ ] Can add to cart
- [ ] Can place an order
- [ ] Can view order history

## Congratulations! 🎉

You now have a fully functional ecommerce platform running locally!

Start exploring the code, make changes, and build something amazing!

---

**Happy Coding!** 🚀
