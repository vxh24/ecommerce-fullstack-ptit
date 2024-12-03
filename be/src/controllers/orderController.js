require("dotenv").config();
const asyncHandler = require("express-async-handler");
const {
  createOrderByCOD,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
  createPaymentService,
  handleMomoCallback,
} = require("../services/orderService");

const createOrderByCODController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  if (!COD) throw new Error("Create cash order failed");
  const result = await createOrderByCOD(_id, COD, couponApplied);
  res.json({
    EC: 0,
    message: "Order created successfully",
    data: result,
  });
});

const createOrderByPaymentOnline = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const result = await handleMomoCallback(_id, req.body);
  res.json({
    EC: 0,
    message: "Order created successfully",
    data: result,
  });
});

const handlePaymentController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  if (COD) throw new Error("Create payment online failed");
  const result = await createPaymentService(_id, COD, couponApplied);
  res.json({
    EC: 0,
    data: result,
  });
});

const checkTransactionStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    requestId: orderId,
    orderId,
    lang: "vi",
    signature: signature,
  });

  //option for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "server error",
    });
  }
});

const getAllOrdersController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllOrders();
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderUserById(id);
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByUIDController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await getOrderByUID(_id);
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await updateOrderStatus(id, status);
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
  handlePaymentController,
  checkTransactionStatus,
  createOrderByPaymentOnline,
};
