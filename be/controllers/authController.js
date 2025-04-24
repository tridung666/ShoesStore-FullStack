const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Đăng ký người dùng mới (không mã hóa mật khẩu)
const registerUser = async (req, res) => {
    console.log("📩 Dữ liệu nhận được:", req.body);

    try {
        const { name, username, password, role = "user" } = req.body;

        // Kiểm tra đầu vào
        if (!name || !username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        // Kiểm tra username đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username đã tồn tại!" });
        }

        // Tạo người dùng mới không mã hóa
        const newUser = new User({ name, username, password, role });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công!",
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                role: newUser.role
            }
        });

    } catch (err) {
        console.error("❌ Lỗi server:", err);
        return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
};

// ✅ Đăng nhập (không mã hóa)
const loginUser = async (req, res) => {
    console.log("🔵 Nhận request login:", req.body);

    try {
        const { username, password } = req.body;

        // Kiểm tra đầu vào
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập username và mật khẩu!" });
        }

        // Kiểm tra người dùng
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: "Username không tồn tại!" });
        }

        // So sánh mật khẩu dạng text
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" });
        }

        // Tạo JWT token có role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error("❌ Lỗi server:", error);
        return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// ✅ Lấy danh sách tất cả người dùng (chỉ admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // bỏ mật khẩu
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error: error.message });
    }
};

// ✅ Xoá người dùng theo ID (chỉ admin)
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng để xoá" });
        }
        res.status(200).json({ message: "Đã xoá người dùng thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xoá người dùng", error: error.message });
    }
};

// ✅ Thay đổi mật khẩu
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        // Lấy người dùng từ DB bằng userId
        const user = await User.findById(req.user.id);

        // Kiểm tra mật khẩu cũ
        if (currentPassword !== user.password) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
        }

        // Cập nhật mật khẩu mới (không mã hóa)
        user.password = newPassword;

        // Lưu lại mật khẩu mới vào cơ sở dữ liệu
        await user.save();

        res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công!" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi khi thay đổi mật khẩu", error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUserById,
    changePassword // Thêm tính năng đổi mật khẩu
};
