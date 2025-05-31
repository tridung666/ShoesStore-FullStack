const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

// Tạo review mới (yêu cầu đăng nhập)
router.post("/", authenticateUser, reviewController.createReview);

// Lấy tất cả review của 1 sản phẩm
router.get("/product/:productId", reviewController.getReviewsByProduct);

// Xóa review (chỉ admin)
router.delete("/:reviewId", authenticateUser, authorizeRoles("admin"), reviewController.deleteReview);

// Sửa review (chỉ admin)
router.put("/:reviewId", authenticateUser, authorizeRoles("admin"), reviewController.updateReview);

module.exports = router;