const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware xác thực token chuẩn
exports.authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Không có token, truy cập bị từ chối" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Truy vấn User từ DB để lấy đủ thông tin (bao gồm _id)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Người dùng không tồn tại" });
    }

    req.user = user;  // ✅ Gán User đầy đủ vào req.user
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

// ✅ Middleware kiểm tra quyền (ví dụ: admin)
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Bạn không có quyền truy cập chức năng này!" });
    }
    next();
  };
};
