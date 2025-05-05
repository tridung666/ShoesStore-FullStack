const express = require('express');
const router = express.Router();
const { getCartByUser, updateCart, deleteCart, deleteCartItem } = require('../controllers/cartController');
const { authenticateUser } = require('../middlewares/auth');

// ✅ GET cart by userId
router.get('/:userId', authenticateUser, getCartByUser);

// ✅ UPDATE cart by userId (FE gọi đúng: PUT /cart/:userId)
router.put('/:userId', authenticateUser, updateCart);

// ✅ DELETE cart
router.delete('/:userId', authenticateUser, deleteCart);

// ❗ Thêm mới route delete 1 item
router.delete('/:userId/item/:productId', authenticateUser, deleteCartItem);

module.exports = router;
