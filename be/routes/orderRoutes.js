const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// User đặt hàng
router.post("/", authenticateUser, createOrder);

// User xem đơn hàng của mình
router.get("/my-orders", authenticateUser, getMyOrders);

// Admin xem tất cả đơn hàng
router.get("/", authenticateUser, authorizeRoles("admin"), getAllOrders);

// Admin cập nhật trạng thái đơn hàng
router.put("/:id/status", authenticateUser, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;
