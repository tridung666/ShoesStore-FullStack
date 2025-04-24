const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  changePassword, // Thêm import cho changePassword
} = require("../controllers/authController");

const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/users", authenticateUser, authorizeRoles("admin"), getAllUsers);

// Delete user by ID (admin only)
router.delete("/users/:id", authenticateUser, authorizeRoles("admin"), deleteUserById);

// Add route for changing password (only authenticated users can access this route)
router.put("/change-password", authenticateUser, changePassword); // Route để thay đổi mật khẩu

module.exports = router;
