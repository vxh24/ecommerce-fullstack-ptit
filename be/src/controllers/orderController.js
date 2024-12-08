require("dotenv").config();
const asyncHandler = require("express-async-handler");
const {
  createOrderByCOD,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
  createPaymentService,
  handlePaymentCallback,
} = require("../services/orderService");

const createOrderByCODController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { totalAmount, orderAddress } = req.body;
  const result = await createOrderByCOD(_id, totalAmount, orderAddress);
  res.json({
    EC: 0,
    message: "Order created successfully",
    data: result,
  });
});

const createPaymentController = asyncHandler(async (req, res) => {
  const { totalAmount } = req.body;
  const result = await createPaymentService(totalAmount);
  res.json({
    EC: 0,
    data: result,
  });
});

const paymentCallbackController = async (req, res) => {
  const { _id } = req.user;
  const callbackData = req.body;

  try {
    const order = await handlePaymentCallback(_id, callbackData);

    res.status(200).json({
      EC: 0,
      message: "Payment processed successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      EC: 1,
      message:
        error.message || "An error occurred while processing the payment",
    });
  }
};

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
  createPaymentController,
  paymentCallbackController,
};
