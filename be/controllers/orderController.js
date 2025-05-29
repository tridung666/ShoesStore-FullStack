const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// ✅ Tạo đơn hàng mới (server tự tính totalPrice)
exports.createOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, phone } = req.body;
    const userId = req.user.id;

    // Lấy thông tin user để lấy tên
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }

    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Không tìm thấy sản phẩm ${item.productId}` });
      }
      totalPrice += product.price * item.quantity;
    }

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      deliveryAddress,
      phone,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Tạo đơn hàng thất bại', error: err.message });
  }
};

// Các hàm khác giữ nguyên không cần thay đổi
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('userId', 'name username')
      .populate('products.productId', 'name');

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: 'Không thể lấy đơn hàng của bạn',
      error: err.message,
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name username') // Lấy tên và username
      .populate('products.productId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách đơn hàng', error: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật trạng thái thất bại', error: err.message });
  }
};

exports.deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng để xoá" });
    }

    res.status(200).json({ message: "Đã xoá đơn hàng thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Xoá đơn hàng thất bại", error: err.message });
  }
};
