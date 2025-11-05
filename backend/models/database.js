// In-memory database for demonstration
// In production, replace with a real database like MongoDB or PostgreSQL

class Database {
  constructor() {
    this.users = [];
    this.products = this.initializeProducts();
    this.carts = {};
    this.orders = [];
    this.nextUserId = 1;
    this.nextProductId = 11;
    this.nextOrderId = 1;
  }

  initializeProducts() {
    return [
      {
        id: 1,
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        price: 999.99,
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200?text=Laptop',
        stock: 10
      },
      {
        id: 2,
        name: 'Smartphone',
        description: 'Latest model with advanced features',
        price: 699.99,
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200?text=Smartphone',
        stock: 15
      },
      {
        id: 3,
        name: 'Headphones',
        description: 'Noise-cancelling wireless headphones',
        price: 199.99,
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200?text=Headphones',
        stock: 20
      },
      {
        id: 4,
        name: 'Running Shoes',
        description: 'Comfortable shoes for running and sports',
        price: 89.99,
        category: 'Sports',
        image: 'https://via.placeholder.com/300x200?text=Running+Shoes',
        stock: 30
      },
      {
        id: 5,
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        price: 79.99,
        category: 'Home',
        image: 'https://via.placeholder.com/300x200?text=Coffee+Maker',
        stock: 12
      },
      {
        id: 6,
        name: 'Backpack',
        description: 'Durable backpack for travel',
        price: 49.99,
        category: 'Accessories',
        image: 'https://via.placeholder.com/300x200?text=Backpack',
        stock: 25
      },
      {
        id: 7,
        name: 'Watch',
        description: 'Elegant wristwatch with leather strap',
        price: 149.99,
        category: 'Accessories',
        image: 'https://via.placeholder.com/300x200?text=Watch',
        stock: 8
      },
      {
        id: 8,
        name: 'Desk Chair',
        description: 'Ergonomic office chair',
        price: 249.99,
        category: 'Furniture',
        image: 'https://via.placeholder.com/300x200?text=Desk+Chair',
        stock: 5
      },
      {
        id: 9,
        name: 'Bluetooth Speaker',
        description: 'Portable speaker with great sound',
        price: 59.99,
        category: 'Electronics',
        image: 'https://via.placeholder.com/300x200?text=Bluetooth+Speaker',
        stock: 18
      },
      {
        id: 10,
        name: 'Water Bottle',
        description: 'Insulated stainless steel water bottle',
        price: 24.99,
        category: 'Sports',
        image: 'https://via.placeholder.com/300x200?text=Water+Bottle',
        stock: 40
      }
    ];
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const user = {
      id: this.nextUserId++,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  // Product methods
  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === parseInt(id));
  }

  createProduct(productData) {
    const product = {
      id: this.nextProductId++,
      ...productData
    };
    this.products.push(product);
    return product;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  // Cart methods
  getCart(userId) {
    if (!this.carts[userId]) {
      this.carts[userId] = { items: [] };
    }
    return this.carts[userId];
  }

  addToCart(userId, productId, quantity) {
    if (!this.carts[userId]) {
      this.carts[userId] = { items: [] };
    }
    
    const existingItem = this.carts[userId].items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.carts[userId].items.push({ productId, quantity });
    }
    
    return this.carts[userId];
  }

  updateCartItem(userId, productId, quantity) {
    if (!this.carts[userId]) {
      return null;
    }
    
    const item = this.carts[userId].items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      return this.carts[userId];
    }
    return null;
  }

  removeFromCart(userId, productId) {
    if (!this.carts[userId]) {
      return null;
    }
    
    this.carts[userId].items = this.carts[userId].items.filter(
      item => item.productId !== productId
    );
    return this.carts[userId];
  }

  clearCart(userId) {
    this.carts[userId] = { items: [] };
    return this.carts[userId];
  }

  // Order methods
  createOrder(orderData) {
    const order = {
      id: this.nextOrderId++,
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    };
    this.orders.push(order);
    return order;
  }

  getOrdersByUserId(userId) {
    return this.orders.filter(o => o.userId === userId);
  }

  getOrderById(orderId) {
    return this.orders.find(o => o.id === parseInt(orderId));
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(o => o.id === parseInt(orderId));
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  }
}

module.exports = new Database();
