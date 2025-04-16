// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentMethod: { type: String, required: true, enum: ['credit card', 'paypal', 'cash on delivery'] },
  paymentStatus: { type: String, required: true, enum: ['completed', 'failed', 'pending'], default: 'pending' },
  paymentDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
