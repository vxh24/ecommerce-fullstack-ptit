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
const { sendEmail, sendOrderConfirmationEmail } = require("./emailService");
var accessKey = process.env.ACCESS_KEY;
var secretKey = process.env.SECRET_KEY_MOMO;
var partnerCode = process.env.PARTNER_CODE;

const createOrderByCOD = asyncHandler(
  async (userId, totalAmount, orderAddress) => {
    validateMongodbId(userId);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    let userCart = await Cart.findOne({ orderBy: user._id }).populate({
      path: "products.product",
      select: "name images",
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIndent: {
        orderId: uniqid(),
        method: "COD",
        amount: totalAmount,
        created: Date.now(),
      },
      orderAddress,
      orderBy: user._id,
      orderStatus: user.role === "user" ? "Chờ xác nhận" : "Hoàn thành",
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
    await sendOrderConfirmationEmail(user, newOrder, userCart, "COD");
    return newOrder;
  }
);

const createPaymentService = asyncHandler(async (totalAmount, orderAddress) => {
  var orderInfo = "Thanh toán qua ví Momo";
  var redirectUrl = "http://localhost:3000/payment-result";
  var ipnUrl = "http://localhost:3000/payment-result";
  var requestType = "payWithMethod";
  var amount = totalAmount;
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = JSON.stringify({ orderAddress });
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

  let userCart = await Cart.findOne({ orderBy: user._id }).populate({
    path: "products.product",
    select: "name images",
  });

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
    extraData,
  } = callbackData;

  const timestamp = Number(responseTime);
  const date = new Date(timestamp);

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const { orderAddress } = JSON.parse(extraData || "{}");

  if (resultCode === "0") {
    const order = new Order({
      products: userCart.products,
      paymentIndent: {
        orderId,
        amount,
        method: partnerCode,
        created: formattedDate,
        responseTime,
        transId,
        message,
      },
      orderAddress,
      orderBy: user._id,
      orderStatus: user.role === "user" ? "Chờ xác nhận" : "Hoàn thành",
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
    await sendOrderConfirmationEmail(user, order, userCart, "MONO");
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
    .sort({ createdAt: -1 })
    .exec();
  return allOrderUser;
});

const updateOrderStatus = asyncHandler(async (id, status) => {
  validateMongodbId(id);
  const updateOrderStatus = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
    },
    { new: true }
  );
  return updateOrderStatus;
});

const cancelOrder = asyncHandler(async (userId, orderId) => {
  validateMongodbId(userId);
  validateMongodbId(orderId);

  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.orderBy.toString() !== userId.toString()) {
    throw new Error("You are not authorized to cancel this order");
  }

  if (order.orderStatus !== "Chờ xác nhận") {
    throw new Error(
      "Order cannot be canceled because it's not in 'Chờ xác nhận' status"
    );
  }

  order.orderStatus = "Đã hủy";
  await order.save();
});

const handleRevenueCalculation = asyncHandler(async () => {
  const allOrders = await getAllOrders();

  const completedOrders = allOrders.filter(
    (order) => order.orderStatus === "Hoàn thành"
  );

  // return completedOrders;

  let totalRevenue = 0;
  for (const order of completedOrders) {
    for (const product of order.products) {
      totalRevenue += product.product.price * product.count;
    }
  }

  return totalRevenue;
});

const printInvoice = asyncHandler(async (orderId, customerName) => {
  validateMongodbId(orderId);

  const order = getOrderUserById(orderId);

  const receiptData = {
    orderId: orderId,
    date: new Date().toLocaleString(),
    items: order.products,
    customerName: customerName || "Khách lẻ",
  };

  return receiptData;
});

module.exports = {
  createOrderByCOD,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
  createPaymentService,
  handlePaymentCallback,
  cancelOrder,
  handleRevenueCalculation,
  printInvoice,
};
