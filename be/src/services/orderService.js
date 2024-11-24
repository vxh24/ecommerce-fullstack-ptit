const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

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
  createOrder,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
};
