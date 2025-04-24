// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  size: { type: [Number], required: true }, // Mảng các kích cỡ có sẵn
  color: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL của hình ảnh sản phẩm
  stock: { type: Number, required: true, default: 0 }, // Số lượng tồn kho
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
