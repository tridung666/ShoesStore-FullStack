const express = require('express');
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByBrand
} = require('../controllers/productController');

const router = express.Router();

// ✅ POST /api/products - chỉ admin được phép tạo sản phẩm
router.post('/', authenticateUser, authorizeRoles('admin'), createProduct);

// ✅ GET /api/products - ai cũng có thể xem sản phẩm
router.get('/', getAllProducts);

// ✅ GET /api/products/brand/:brand - ai cũng có thể lọc sản phẩm theo brand
router.get('/brand/:brand', getProductsByBrand);

// ✅ GET /api/products/:id - ai cũng có thể xem chi tiết sản phẩm
router.get('/:id', getProductById);

// ✅ DELETE /api/products/:id - chỉ admin được phép xóa sản phẩm
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
