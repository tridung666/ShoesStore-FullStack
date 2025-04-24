const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByBrand
} = require('../controllers/productController');

const router = express.Router();

// POST /api/products
router.post('/', createProduct);

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// GET /api/products/brand/:brand
router.get('/brand/:brand', getProductsByBrand);

module.exports = router;
