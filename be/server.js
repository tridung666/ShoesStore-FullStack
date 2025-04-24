const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const morgan = require("morgan");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ Thêm middleware để Express xử lý dữ liệu đúng cách
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cần thiết cho Postman gửi x-www-form-urlencoded
app.use(cors());
app.use(morgan("dev")); // Log các request đến server

// Routes
app.use("/api/auth/", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
