const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:  { type: Number, required: true },
    size:      { type: Number, required: true },
    color:     { type: String, required: true },  // ✅ thêm dòng này
  }],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
