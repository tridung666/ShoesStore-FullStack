const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    console.log("📩 Dữ liệu nhận được:", req.body); // Debug dữ liệu gửi lên

    try {
        const { name, username, password } = req.body;

        // 🔍 Kiểm tra dữ liệu nhập vào
        if (!name || !username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        // 🔍 Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username đã tồn tại!" });
        }

        // 🔑 Mã hóa mật khẩu
        // const salt = await bcrypt.genSalt(10); // Tạo muối
        // const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa mật khẩu

        // Không mã hoá mật khẩu
        const newUser = new User({ name, username, password }); // dùng trực tiếp password


        // ✅ Tạo người dùng mới
        // const newUser = new User({ name, email, password: hashedPassword }); // dùng hashedPassword
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công!",
            user: { name: newUser.name, username: newUser.username, id: newUser._id },
        });

    } catch (err) {
        console.error("❌ Lỗi server:", err);
        return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
};

// ✅ Xử lý đăng nhập
const loginUser = async (req, res) => {
    console.log("🔵 Nhận request login:", req.body); // Debug

    try {
        const { username, password } = req.body;

        // 🔍 Kiểm tra dữ liệu nhập vào
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu!" });
        }

        // 🔍 Kiểm tra người dùng có tồn tại không
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: "Username không tồn tại!" });
        }

        // 🔑 Kiểm tra mật khẩu
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" });
        // }

         // ✅ So sánh trực tiếp mật khẩu (plain text)
         if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" });
        }

        // 🔐 Tạo JWT token
        const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            token,
            user: { name: user.name, username: user.username, id: user._id },
        });

    } catch (error) {
        console.error("❌ Lỗi server:", error);
        return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
