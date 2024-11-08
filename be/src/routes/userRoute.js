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
  addToCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  createOrderController,
  getAllOrdersController,
  updateOrderStatusController,
} = require("../controllers/userController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all-users", authMiddleware, isAdmin, getAllUsersController);
router.get("/wishlist", authMiddleware, getWishlistController);
router.put("/save-address", authMiddleware, saveAddressController);
router.post("/cart", authMiddleware, addToCartController);
router.get("/cart", authMiddleware, getUserCartController);
router.delete("/empty-cart", authMiddleware, removeCartController);
router.post("/apply-coupon", authMiddleware, handleCouponController);
router.post("/cart/cash-order", authMiddleware, createOrderController);
router.get("/orders", authMiddleware, getAllOrdersController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.post("/forgot-password", authMiddleware, forgotPasswordTokenController);
router.put("/reset-password/:token", authMiddleware, resetPasswordController);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  updateOrderStatusController
);
router.get("/:id", authMiddleware, isAdmin, getUserByIdController);
router.delete("/:id", authMiddleware, isAdmin, deleteAUserController);
router.put("/:id", authMiddleware, updateAUserController);

module.exports = router;
