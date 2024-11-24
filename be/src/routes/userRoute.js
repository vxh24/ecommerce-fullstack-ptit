const express = require("express");

const {
  getAllUsersController,
  getUserByIdController,
  deleteAUserController,
  updateAUserController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  getWishlistController,
  saveAddressController,
  getProfileUserController,
  removeAddressController,
} = require("../controllers/userController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  addToCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  removeProductFromCartController,
} = require("../controllers/cartController");

const {
  createOrderController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/all-users", authMiddleware, isAdmin, getAllUsersController);
router.get("/wishlist", authMiddleware, getWishlistController);
router.get("/profile", authMiddleware, getProfileUserController);
router.put("/save-address", authMiddleware, saveAddressController);

router.post("/cart", authMiddleware, addToCartController);
router.get("/cart", authMiddleware, getUserCartController);
router.delete(
  "/cart/remove-product",
  authMiddleware,
  removeProductFromCartController
);
router.delete("/empty-cart", authMiddleware, removeCartController);
router.post("/apply-coupon", authMiddleware, handleCouponController);
router.post("/cart/cash-order", authMiddleware, createOrderController); //COD

router.get("/orders", authMiddleware, getOrderByUIDController);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrdersController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.post("/forgot-password", authMiddleware, forgotPasswordTokenController);
router.delete("/address/:id", authMiddleware, removeAddressController);
router.put("/reset-password/:token", authMiddleware, resetPasswordController);
router.get("/order/:id", authMiddleware, isAdmin, getOrderByIdController);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatusController
);
router.get("/:id", authMiddleware, isAdmin, getUserByIdController);
router.delete("/:id", authMiddleware, isAdmin, deleteAUserController);
router.put("/:id", authMiddleware, updateAUserController);

module.exports = router;
