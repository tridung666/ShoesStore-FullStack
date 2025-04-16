const express = require('express');
const { createProduct, getAllProducts, getProductById, deleteProduct, getProductsByBrand } = require('../controllers/productController');

const router = express.Router();

// Route POST để tạo sản phẩm mới
router.post('/products', createProduct);

// Route GET để lấy tất cả sản phẩm
router.get('/products', getAllProducts);

// Route GET để lấy sản phẩm theo ID
router.get('/products/:id', getProductById);

// Route DELETE để xoá sản phẩm
router.delete('/products/:id', deleteProduct);

router.get('/products/brand/:brand', getProductsByBrand);  // Route GET để lấy sản phẩm theo brand


module.exports = router;
