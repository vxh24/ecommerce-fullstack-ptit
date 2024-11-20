const express = require("express");

const {
  createUserController,
  loginUserController,
  handleRefreshToken,
  logoutController,
  loginAdminController,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdminController);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutController);
router.post("/google", googleLogin);

module.exports = router;
