const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Sản phẩm được review
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người review
  rating: { type: Number, required: true, min: 1, max: 5 }, // Điểm đánh giá (1-5 sao)
  comment: { type: String, required: true }, // Nội dung review
}, { timestamps: true }); // Thêm createdAt, updatedAt

module.exports = mongoose.model("Review", reviewSchema);