require("dotenv").config();
const asyncHandler = require("express-async-handler");
const {
  addToCart,
  getCartUser,
  emptyCart,
  applyCoupon,
  removeProductFromCart,
  updateProductQuantityInCart,
} = require("../services/cartService");

const addToCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cart } = req.body;

  try {
    const result = await addToCart(_id, cart);

    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, color } = req.body;

  try {
    const result = await removeProductFromCart(_id, productId, color);
    res.status(200).json({
      EC: 0,
      message: "Remove product from cart successful!!!",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateProductQuantityController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, color, newQuantity } = req.body;

  try {
    const result = await updateProductQuantityInCart(_id, productId, color, newQuantity);
    res.status(200).json({
      EC: 0,
      message: "Product quantity updated successfully!",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getUserCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await getCartUser(_id);
    res.status(200).json({
      EC: 0,
      result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const removeCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await emptyCart(_id);

    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const handleCouponController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  try {
    const result = await applyCoupon(_id, coupon);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addToCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  removeProductFromCartController,
  updateProductQuantityController,
};
