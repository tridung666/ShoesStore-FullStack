const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chatbotRoutes = require("./routes/chatbot"); // ✅ THÊM DÒNG NÀY
const reviewRoutes = require("./routes/reviewRoutes"); // ✅ Thêm dòng này

const cors = require("cors");
const morgan = require("morgan");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chatbot", chatbotRoutes); // ✅ THÊM DÒNG NÀY
app.use("/api/reviews", reviewRoutes); // ✅ Thêm dòng này

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
