const jwt = require("jsonwebtoken");

// ✅ Middleware xác thực token
exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: "Không có token, truy cập bị từ chối" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gán user (id, role) vào req
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
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
