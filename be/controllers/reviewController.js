const mongoose = require("mongoose");
const Review = require("../models/Review");

// ✅ Tạo review mới
exports.createReview = async (req, res) => {
  try {
    console.log("========== [Create Review] ==========");
    console.log("Request body:", req.body);
    console.log("Request user:", req.user);

    const { product, rating, comment } = req.body;
    const user = req.user?._id;

    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!product || !rating || !comment) {
      return res.status(400).json({ error: "Missing fields in request body" });
    }

    // ✅ ép product về ObjectId
    const review = new Review({
      product: mongoose.Types.ObjectId(product),
      user,
      rating,
      comment
    });

    await review.save();

    console.log("✅ Review created:", review);
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error("❌ Create Review Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Lấy tất cả review của 1 sản phẩm
exports.getReviewsByProduct = async (req, res) => {
  try {
    console.log("========== [Get Reviews] ==========");
    const { productId } = req.params;
    console.log("Product ID:", productId);

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error("❌ Get Reviews Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Xóa review
exports.deleteReview = async (req, res) => {
  try {
    console.log("========== [Delete Review] ==========");
    const { reviewId } = req.params;
    console.log("Review ID:", reviewId);

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await review.deleteOne();
    console.log("✅ Review deleted");
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Review Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Sửa review
exports.updateReview = async (req, res) => {
  try {
    console.log("========== [Update Review] ==========");
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    console.log("Review ID:", reviewId, "Body:", req.body);

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    console.log("✅ Review updated:", review);
    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("❌ Update Review Error:", error);
    res.status(400).json({ error: error.message });
  }
};
