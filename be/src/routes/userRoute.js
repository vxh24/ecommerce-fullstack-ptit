const express = require("express");

const {
  getAllUsersController,
  getUserByIdController,
  blockAUserController,
  updateAUserController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  getWishlistController,
  saveAddressController,
  getProfileUserController,
  removeAddressController,
  updateAddressController,
  getAddressController,
  unBlockAUserController,
} = require("../controllers/userController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  addToCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  removeProductFromCartController,
  updateProductQuantityController,
} = require("../controllers/cartController");

const {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
} = require("../controllers/orderController");

const router = express.Router();

router.put("/update-user", authMiddleware, updateAUserController);
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
router.put(
  "/cart/update-product",
  authMiddleware,
  updateProductQuantityController
);
router.delete("/empty-cart", authMiddleware, removeCartController);
router.post("/apply-coupon", authMiddleware, handleCouponController);
router.post("/cart/cash-order", authMiddleware, createOrderByCODController); //COD

router.get("/orders", authMiddleware, getOrderByUIDController);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrdersController);
router.put("/update-password", authMiddleware, updatePasswordController);
router.post("/forgot-password", forgotPasswordTokenController);
router.get("/address", authMiddleware, getAddressController);
router.put("/address/:id", authMiddleware, updateAddressController);
router.delete("/address/:id", authMiddleware, removeAddressController);
router.put("/reset-password/:token", resetPasswordController);
router.get("/order/:id", authMiddleware, isAdmin, getOrderByIdController);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatusController
);
router.get("/:id", authMiddleware, isAdmin, getUserByIdController);
router.put("/block/:id", authMiddleware, isAdmin, blockAUserController);
router.put("/unblock/:id", authMiddleware, isAdmin, unBlockAUserController);
router.put("/:id", authMiddleware, updateAUserController);

module.exports = router;
