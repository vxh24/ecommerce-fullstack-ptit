const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Cart = require("../models/cartModel");

const addToCart = asyncHandler(async (id, cart) => {
  validateMongodbId(id);
  const user = await User.findById(id);

  let existingCart = await Cart.findOne({ orderBy: user._id });
  if (!existingCart) {
    existingCart = new Cart({ products: [], cartTotal: 0, orderBy: user._id });
  }
  for (let i = 0; i < cart.length; i++) {
    const { _id, count, color } = cart[i];
    const productIndex = existingCart.products.findIndex(
      (item) => item.product.toString() === _id && item.color === color
    );
    if (productIndex >= 0) {
      existingCart.products[productIndex].count += count;
    } else {
      const getPrice = await Product.findById(_id).select("price").exec();
      existingCart.products.push({
        product: _id,
        count,
        color,
        price: getPrice.price,
      });
    }
  }
  existingCart.cartTotal = existingCart.products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  await existingCart.save();

  return existingCart;
});

const removeProductFromCart = asyncHandler(async (userId, productId, color) => {
  validateMongodbId(userId);
  validateMongodbId(productId);
  const user = await User.findById(userId);
  const cart = await Cart.findOne({ orderBy: user._id });

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productId || item.color !== color
  );

  cart.cartTotal = cart.products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  await cart.save();
  return cart;
});

const getCartUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const cart = await Cart.findOne({ orderBy: id });
  return cart;
});

const emptyCart = asyncHandler(async (id) => {
  validateMongodbId(id);
  const cart = await Cart.deleteOne({ orderBy: id });
  return cart;
});

const applyCoupon = asyncHandler(async (id, coupon) => {
  validateMongodbId(id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  let { products, cartTotal } = await Cart.findOne({ orderBy: id }).populate(
    "products.product"
  );
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderBy: id },
    { totalAfterDiscount },
    { new: true }
  );

  return { totalAfterDiscount: totalAfterDiscount };
});

module.exports = {
  addToCart,
  getCartUser,
  emptyCart,
  applyCoupon,
  removeProductFromCart,
};
