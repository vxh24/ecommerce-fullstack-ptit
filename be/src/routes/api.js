const express = require("express");
const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  deleteAUserController,
  updateAUserController,
  handleRefreshToken,
  logout,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.all("*", authMiddleware);

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/users/all-users", getAllUsersController);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteAUserController);
router.put("/users/:id", updateAUserController);

module.exports = router;
