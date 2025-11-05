const express = require('express');
const router = express.Router();
const db = require('../models/database');
const authMiddleware = require('../middleware/auth');

// Get cart (protected)
router.get('/', authMiddleware, (req, res) => {
  try {
    const cart = db.getCart(req.user.id);
    
    // Populate cart with product details
    const cartWithDetails = {
      items: cart.items.map(item => {
        const product = db.getProductById(item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          product: product
        };
      })
    };

    // Calculate total
    const total = cartWithDetails.items.reduce((sum, item) => {
      return sum + (item.product ? item.product.price * item.quantity : 0);
    }, 0);

    res.json({
      cart: cartWithDetails,
      total: total.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Add to cart (protected)
router.post('/add', authMiddleware, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Check if product exists
    const product = db.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const cart = db.addToCart(req.user.id, productId, parseInt(quantity));

    res.json({
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update cart item (protected)
router.put('/update', authMiddleware, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity cannot be negative' });
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      const cart = db.removeFromCart(req.user.id, productId);
      return res.json({
        message: 'Product removed from cart',
        cart
      });
    }

    // Check stock
    const product = db.getProductById(productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    const cart = db.updateCartItem(req.user.id, productId, parseInt(quantity));

    if (!cart) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Remove from cart (protected)
router.delete('/remove/:productId', authMiddleware, (req, res) => {
  try {
    const cart = db.removeFromCart(req.user.id, parseInt(req.params.productId));

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json({
      message: 'Product removed from cart',
      cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Clear cart (protected)
router.delete('/clear', authMiddleware, (req, res) => {
  try {
    const cart = db.clearCart(req.user.id);

    res.json({
      message: 'Cart cleared',
      cart
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
