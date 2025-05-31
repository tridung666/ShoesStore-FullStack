const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser,
  changePassword,
  createUserByAdmin
} = require("../controllers/authController");

const { authenticateUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authenticateUser, authorizeRoles("admin"), getAllUsers);
router.get("/users/:id", authenticateUser, authorizeRoles("admin"), getUserById);
router.post("/users", authenticateUser, authorizeRoles("admin"), createUserByAdmin);
router.put("/users/:id", authenticateUser, authorizeRoles("admin"), updateUser); // ✅ thêm dòng này
router.delete("/users/:id", authenticateUser, authorizeRoles("admin"), deleteUserById);
router.put("/change-password", authenticateUser, changePassword);

module.exports = router;
