require("dotenv").config();
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const axios = require("axios");
const crypto = require("crypto");

var accessKey = process.env.ACCESS_KEY;
var secretKey = process.env.SECRET_KEY_MOMO;
var partnerCode = process.env.PARTNER_CODE;

const createOrderByCOD = asyncHandler(async (id, COD, couponApplied) => {
  validateMongodbId(id);
  const user = await User.findById(id);
  let userCart = await Cart.findOne({ orderBy: user._id });

  const finalAmount =
    couponApplied && userCart.totalAfterDiscount
      ? userCart.totalAfterDiscount
      : userCart.cartTotal;

  if (COD === true) {
    let newOrder = await new Order({
      products: userCart.products,
      paymentIndent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on delivery",
        created: Date.now(),
        currency: "VNĐ",
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

    await Product.bulkWrite(update, {});

    await Cart.findByIdAndDelete(userCart._id);

    return newOrder;
  }
});

const createPaymentService = asyncHandler(async (totalAmount) => {
  var orderInfo = "Thanh toán qua ví Momo";
  var redirectUrl = "http://localhost:3000/payment-result";
  var ipnUrl = "http://localhost:3000/payment-result";
  var requestType = "payWithMethod";
  var amount = totalAmount;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  //option for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    return result.data;
  } catch (error) {
    throw new Error("Payment request failed");
  }
});

const handlePaymentCallback = asyncHandler(async (userId, callbackData) => {
  validateMongodbId(userId);
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  let userCart = await Cart.findOne({ orderBy: user._id });

  if (!userCart) {
    throw new Error("Cart not found");
  }

  const {
    orderId,
    amount,
    resultCode,
    message,
    transId,
    partnerCode,
    responseTime,
  } = callbackData;

  if (resultCode === "0") {
    const order = new Order({
      products: userCart.products,
      paymentIndent: {
        orderId,
        amount,
        transId,
        partnerCode,
        message,
        responseTime,
      },
      orderBy: user._id,
      orderStatus: "Processing",
    });

    await order.save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    await Product.bulkWrite(update, {});

    await Cart.findByIdAndDelete(userCart._id);

    return order;
  } else {
    throw new Error(`Payment failed: ${message}`);
  }
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
  createOrderByCOD,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
  createPaymentService,
  handlePaymentCallback,
};
