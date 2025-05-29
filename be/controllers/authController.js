const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// ✅ Đăng ký người dùng mới
const registerUser = async (req, res) => {
    try {
        const { name, username, password, role = "user" } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username đã tồn tại!" });
        }

        const newUser = new User({ name, username, password, role });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Đăng ký thành công!",
            user: {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
};

// ✅ Đăng nhập
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập username và mật khẩu!" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: "Username không tồn tại!" });
        }

        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" });
        }

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
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

// ✅ Lấy tất cả users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error: error.message });
    }
};

// ✅ Lấy chi tiết user theo ID (CÓ validate ObjectId)
const getUserById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// ✅ Update user (cho Admin)
const updateUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng để cập nhật" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

const createUserByAdmin = async (req, res) => {
  try {
    const { name, username, password, role = "user" } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username đã tồn tại!" });
    }

    const newUser = new User({ name, username, password, role });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Admin tạo user thành công!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
  }
};


// ✅ Xoá user
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
        const user = await User.findById(req.user.id);

        if (currentPassword !== user.password) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
        }

        user.password = newPassword;
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
    getUserById,
    updateUser,         // ✅ Thêm export updateUser
    deleteUserById,
    changePassword,
    createUserByAdmin   // ✅ Thêm export createUserByAdmin
};
