const express = require('express');
const router = express.Router();
const db = require('../models/database');
const authMiddleware = require('../middleware/auth');

// Get all products (public)
router.get('/', (req, res) => {
  try {
    const products = db.getAllProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get product by ID (public)
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Create product (protected - requires authentication)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const product = db.createProduct({
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || 'https://via.placeholder.com/300x200?text=Product',
      stock: stock || 0
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update product (protected)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (price) updates.price = parseFloat(price);
    if (category) updates.category = category;
    if (image) updates.image = image;
    if (stock !== undefined) updates.stock = stock;

    const product = db.updateProduct(req.params.id, updates);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Delete product (protected)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const success = db.deleteProduct(req.params.id);
    
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
