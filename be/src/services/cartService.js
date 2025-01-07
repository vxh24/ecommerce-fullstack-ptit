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

    const product = await Product.findById(_id).populate("category brand");
    if (!product) {
      throw new Error("Product not found");
    }

    const colorExists = product.colors.some(
      (productColor) => productColor.name === color
    );
    if (!colorExists) {
      throw new Error(`Color "${color}" does not exist for this product`);
    }

    const colorInStock = product.colors.find(
      (productColor) => productColor.name === color
    );
    // console.log(colorInStock);
    // console.log(colorInStock.quantity);
    // console.log(count);

    const productIndex = existingCart.products.findIndex(
      (item) => item.product.toString() === _id && item.color === color
    );

    let totalCountInCart = 0;
    if (productIndex >= 0) {
      totalCountInCart = existingCart.products[productIndex].count;
    }

    if (colorInStock.quantity < totalCountInCart + count) {
      throw new Error(
        `Not enough stock for color "${color}". Only ${colorInStock.quantity} items left.`
      );
    }

    if (productIndex >= 0) {
      existingCart.products[productIndex].count += count;
    } else {
      existingCart.products.push({
        product: _id,
        count,
        color,
        price: product.price,
      });
    }
  }

  existingCart.cartTotal = existingCart.products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  await existingCart.save();

  return existingCart.populate({
    path: "products.product",
    select: "name price",
  });
});

const removeProductFromCart = asyncHandler(async (userId, productId, color) => {
  validateMongodbId(userId);
  validateMongodbId(productId);

  const user = await User.findById(userId);
  const cart = await Cart.findOne({ orderBy: user._id });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId && item.color === color
  );

  if (productIndex === -1) {
    throw new Error(`Product with color '${color}' not found in the cart`);
  }

  cart.products = cart.products.filter((item) => {
    if (item.product.toString() === productId && item.color === color) {
      return false;
    }
    return true;
  });

  if (cart.products.length === 0) {
    await emptyCart(userId);
    return null;
  }

  cart.cartTotal = cart.products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  await cart.save();
  return cart.populate({
    path: "products.product",
    select: "name price",
  });
});

const updateProductQuantityInCart = asyncHandler(
  async (userId, productId, color, newQuantity) => {
    validateMongodbId(userId);
    validateMongodbId(productId);

    const user = await User.findById(userId);
    const cart = await Cart.findOne({ orderBy: user._id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.products[productIndex].count = newQuantity;

    cart.cartTotal = cart.products.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    await cart.save();
    return cart.populate({
      path: "products.product",
      select: "name price",
    });
  }
);

const getCartUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const cart = await Cart.findOne({ orderBy: id }).populate({
    path: "products.product",
    select: "name price images",
  });
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
  let { cartTotal } = await Cart.findOne({ orderBy: id });
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
  updateProductQuantityInCart,
};
