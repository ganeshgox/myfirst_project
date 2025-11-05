const express = require('express');
const router = express.Router();
const db = require('../models/database');
const authMiddleware = require('../middleware/auth');

// Create order (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ error: 'Shipping address is required' });
    }

    // Get user's cart
    const cart = db.getCart(req.user.id);

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate order details
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
      const product = db.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      
      // Check stock
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      };
    });

    // Create order
    const order = db.createOrder({
      userId: req.user.id,
      items: orderItems,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'pending'
    });

    // Update product stock
    orderItems.forEach(item => {
      const product = db.getProductById(item.productId);
      if (product) {
        db.updateProduct(item.productId, { stock: product.stock - item.quantity });
      }
    });

    // Clear cart
    db.clearCart(req.user.id);

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get all orders for user (protected)
router.get('/', authMiddleware, (req, res) => {
  try {
    const orders = db.getOrdersByUserId(req.user.id);

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get specific order (protected)
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to view this order' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update order status (protected - in production, add admin check)
router.put('/:id/status', authMiddleware, (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = db.updateOrderStatus(req.params.id, status);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
