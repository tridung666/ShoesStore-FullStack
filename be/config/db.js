const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Đọc biến môi trường từ file .env
dotenv.config();

// Lấy giá trị kết nối MongoDB từ .env
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Kết nối MongoDB (Không còn truyền useNewUrlParser, useUnifiedTopology)
    await mongoose.connect(dbURI);

    console.log("🚀 MongoDB Connected to database");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
