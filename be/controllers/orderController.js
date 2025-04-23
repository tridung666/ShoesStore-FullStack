const Order = require('../models/Order');

// ✅ Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user.id,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
      phone: req.body.phone // ✅ Gán số điện thoại từ frontend
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Tạo đơn hàng thất bại', error: err.message });
  }
};


// ✅ Người dùng xem đơn hàng của chính mình
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('userId', 'name phone') // 👈 Lấy tên + SĐT người dùng
      .populate('products.productId', 'name'); // 👈 Lấy tên sản phẩm

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      message: 'Không thể lấy đơn hàng của bạn',
      error: err.message,
    });
  }
};

// ✅ Admin xem tất cả đơn hàng (CÓ POPULATE)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email') // 👈 chỉ lấy name và email
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách đơn hàng', error: err.message });
  }
};

// ✅ Admin cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật trạng thái thất bại', error: err.message });
  }
};
