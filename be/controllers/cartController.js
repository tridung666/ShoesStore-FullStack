const Cart = require('../models/Cart');

exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('items.productId');
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy giỏ hàng' });
  }
};

exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi cập nhật giỏ hàng' });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Đã xoá giỏ hàng' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi xoá giỏ hàng' });
  }
};

exports.deleteCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  const { size, color } = req.query;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => {
      if (!item.productId) return true;
      return !(
        item.productId.toString() === productId &&
        item.size === Number(size) &&
        item.color === color
      );
    });

    await cart.save({ validateBeforeSave: false });

    res.json(cart);
  } catch (err) {
    console.error('Server error in deleteCartItem:', err);
    res.status(500).json({ error: 'Error deleting item from cart' });
  }
};
