const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products
router.get('/', auth, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a product
router.post('/', auth, async (req, res) => {
  const { name, category, price } = req.body;
  if (!name || !category || !price) return res.status(400).json({ message: 'All fields required' });
  const product = new Product({ name, category, price });
  await product.save();
  res.status(201).json(product);
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
