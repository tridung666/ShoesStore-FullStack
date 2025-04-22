const express = require("express");
const { authenticateUser } = require("../middlewares/auth");
const {
  createReview,
  getReviewsByProduct,
} = require("../controllers/reviewController");

const router = express.Router();

// Người dùng viết review
router.post("/", authenticateUser, createReview);

// Lấy review theo sản phẩm
router.get("/:productId", getReviewsByProduct);

module.exports = router;
