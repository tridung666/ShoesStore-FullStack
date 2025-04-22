const Review = require("../models/Review");

// ✅ Tạo review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Option: ngăn 1 người review nhiều lần
    const existing = await Review.findOne({ productId, userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Bạn đã đánh giá sản phẩm này rồi." });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Đánh giá thành công!", review });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo review", error: err.message });
  }
};

// ✅ Lấy review theo sản phẩm
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "name");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đánh giá", error: err.message });
  }
};
