// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled'], default: 'pending' },
  orderDate: { type: Date, default: Date.now },
  deliveryAddress: { type: String, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
