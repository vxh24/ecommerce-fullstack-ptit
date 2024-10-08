const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  deleteAUserController,
  updateAUserController,
  handleRefreshToken,
  logoutController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
} = require("../controllers/userController");
const {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

const router = express.Router();
router.all("*", authMiddleware);

//auth
router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutController);

//user
router.get("/users/all-users", getAllUsersController);
router.put("/users/update-password", updatePasswordController);
router.post("/users/forgot-password", forgotPasswordTokenController);
router.put("/users/reset-password/:token", resetPasswordController);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteAUserController);
router.put("/users/:id", updateAUserController);

//product
router.post("/products/", createProductController);
router.get("/products/", getAllProductsController);
router.get("/products/:id", getProductByIdController);
router.put("/products/:id", updateProductController);
router.delete("/products/:id", deleteProductController);

module.exports = router;
