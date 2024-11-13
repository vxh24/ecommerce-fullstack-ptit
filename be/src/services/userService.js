const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongodbId");
const sendEmail = require("../controllers/emailController");
const crypto = require("crypto");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const createUser = asyncHandler(async (userData) => {
  const email = userData.email;

  const isCheckExistUser = await User.findOne({ email: email });

  if (!isCheckExistUser) {
    const newUser = await User.create(userData);
    return newUser;
  } else {
    throw new Error("User Already Exists");
  }
});

const handleLogin = asyncHandler(async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    //compare password
    const isMatchPassword = await user.isPasswordMatched(password);
    if (isMatchPassword) {
      //login/create an access token
      const payload = {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
      };
      const refresh_token = await generateRefreshToken(payload);
      const updateUser = await User.updateOne(
        { _id: user.id },
        { refresh_token: refresh_token }
      );
      const access_token = generateToken(payload);
      return {
        EC: 0,
        access_token,
        refresh_token,
        user: {
          email: user.email,
          name: user.name,
        },
      };
    }
    return { EC: 1, message: "Password is incorrect" };
  }
  return { EC: 2, message: "User not found" };
});

const handleAdminLogin = asyncHandler(async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user.role !== "admin") throw new Error("Not Authorized!!!");
  if (user) {
    //compare password
    const isMatchPassword = await user.isPasswordMatched(password);
    if (isMatchPassword) {
      //login/create an access token
      const payload = {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
      };
      const refresh_token = await generateRefreshToken(payload);
      const updateUser = await User.updateOne(
        { _id: user.id },
        { refresh_token: refresh_token }
      );
      const access_token = generateToken(payload);
      return {
        EC: 0,
        access_token,
        refresh_token,
        user: {
          email: user.email,
          name: user.name,
        },
      };
    }
    return { EC: 1, message: "Password is incorrect" };
  }
  return { EC: 2, message: "User not found" };
});

const getAllUsers = asyncHandler(async () => {
  const result = await User.find({}).select("-password");
  return result;
});

const getUserById = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await User.findById(id).select("-password");
  return result;
});

const updateAUser = asyncHandler(async (id, userData) => {
  validateMongodbId(id);
  const result = await User.updateOne(
    { _id: id },
    {
      name: userData.name,
      phone: userData.phone,
      avatar: userData.avatar,
    }
  );
  return result;
});

const deleteAUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await User.deleteById(id);
  return result;
});

const updatePassword = asyncHandler(async (email, newPassword) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!newPassword) {
    throw new Error("Password not provided");
  }

  user.password = newPassword;
  const reset_token = user.createPasswordResetToken();
  const updatedUser = await user.save();

  return updatedUser;
});

const generateResetPasswordToken = asyncHandler(async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");

  const token = await user.createPasswordResetToken();
  await user.save();

  const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="http://localhost:5000/v1/api/users/reset-password/${token}">Click here</a>`;

  const data = {
    to: email,
    text: "Hey user",
    subject: "Forgot Password Link",
    html: resetURL,
  };
  await sendEmail(data);
  return token;
});

const resetPassword = asyncHandler(async (token, password) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired, Please try again later.");

  //reset password and remove token
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
});

const getWishlist = asyncHandler(async (id) => {
  const user = await User.findById(id).populate("wishlist");
  return user;
});

const saveAddress = asyncHandler(async (id, address) => {
  validateMongodbId(id);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      address: address,
    },
    {
      new: true,
    }
  );
  return updatedUser;
});

const addToCart = asyncHandler(async (id, cart) => {
  validateMongodbId(id);
  let products = [];
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

const getCartUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const cart = await Cart.findOne({ orderBy: id }).populate("products.product");
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

const createOrder = asyncHandler(async (id, COD, couponApplied) => {
  validateMongodbId(id);
  const user = await User.findById(id);
  let userCart = await Cart.findOne({ orderBy: user._id });

  let finalAmount = 0;
  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount;
  } else {
    finalAmount = userCart.cartTotal;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIndent: {
      id: uniqid(),
      method: "COD",
      amount: finalAmount,
      status: "Cash on delivery",
      created: Date.now(),
      currency: "usd",
    },
    orderBy: user._id,
    orderStatus: "Cash on delivery",
  }).save();
  let update = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const updated = await Product.bulkWrite(update, {});

  await Cart.findByIdAndDelete(userCart._id);

  return newOrder;
});

const getOrderByUID = asyncHandler(async (userID) => {
  const orderUser = await Order.find({ orderBy: userID })
    .populate("products.product")
    .populate("orderBy")
    .exec();
  return orderUser;
});

const getOrderUserById = asyncHandler(async (id) => {
  const orderUser = await Order.findById(id)
    .populate("products.product")
    .populate("orderBy")
    .exec();
  return orderUser;
});

const getAllOrders = asyncHandler(async () => {
  const allOrderUser = await Order.find({})
    .populate("products.product")
    .populate("orderBy")
    .exec();
  return allOrderUser;
});

const updateOrderStatus = asyncHandler(async (id, status) => {
  validateMongodbId(id);
  const updateOrderStatus = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
      paymentIndent: {
        status: status,
      },
    },
    { new: true }
  );
  return updateOrderStatus;
});

module.exports = {
  createUser,
  handleLogin,
  getAllUsers,
  getUserById,
  updateAUser,
  deleteAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
  handleAdminLogin,
  getWishlist,
  saveAddress,
  addToCart,
  getCartUser,
  emptyCart,
  applyCoupon,
  createOrder,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
};
