const Order = require("../models/Order");

// ✅ Tạo đơn hàng
exports.createOrder = async (req, res) => {
  try {
    const { products, totalPrice, deliveryAddress } = req.body;
    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalPrice,
      deliveryAddress,
    });

    await newOrder.save();
    res.status(201).json({ message: "Đặt hàng thành công!", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error: err.message });
  }
};

// ✅ Lấy đơn hàng của người dùng hiện tại
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error: err.message });
  }
};

// ✅ Admin lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("products.productId");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: err.message });
  }
};

// ✅ Admin cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ message: "Cập nhật trạng thái thành công", order });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error: err.message });
  }
};
