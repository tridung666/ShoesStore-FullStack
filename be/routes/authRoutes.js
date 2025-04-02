const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUserById
} = require("../controllers/authController");

const { authenticateUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login an existing user
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/users", authenticateUser, authorizeRoles("admin"), getAllUsers);

// Delete user by ID (admin only)
router.delete("/users/:id", authenticateUser, authorizeRoles("admin"), deleteUserById);

module.exports = router;
