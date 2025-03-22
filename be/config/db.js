const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Đọc các biến môi trường từ file .env
dotenv.config();

// Lấy giá trị kết nối MongoDB từ .env
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("🚀 MongoDB Connected to 'account' database");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
