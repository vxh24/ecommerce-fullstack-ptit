require("dotenv").config();
const { io, getReceiverSocketId } = require("../socket/socket");
const asyncHandler = require("express-async-handler");
const {
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
  getMonthlyStatistics,
} = require("../services/orderService");

const createOrderByCODController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { totalAmount, orderAddress } = req.body;
  const result = await createOrderByCOD(_id, totalAmount, orderAddress);

  const adminSocketId = getReceiverSocketId("6749f2c34151afc711fc4a8c");
  // if (adminSocketId) {
  //   io.emit("new-order-notification", result);
  // }
  if (adminSocketId) {
    const currentTime = new Date();
    const formattedTime = `${currentTime
      .getDate()
      .toString()
      .padStart(2, "0")}/${(currentTime.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${currentTime.getFullYear()}`;
    io.emit("new-order-notification", {
      title: "Đơn hàng mới đã được tạo",
      message: `Người dùng với ID ${_id} đã đặt hàng.`,
      userId: _id,
      timestamp: formattedTime,
    });
  }
  res.json({
    EC: 0,
    message: "Order created successfully",
    data: result,
  });
});

const createPaymentController = asyncHandler(async (req, res) => {
  const { totalAmount, orderAddress } = req.body;
  const { _id } = req.user;
  const result = await createPaymentService(_id, totalAmount, orderAddress);
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

const cancelOrderController = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { _id } = req.user;

  try {
    const canceledOrder = await cancelOrder(_id, orderId);
    res.status(200).json({
      EC: 0,
      message: "Order canceled successfully",
      data: canceledOrder,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const handleRevenueCalculationController = asyncHandler(async (req, res) => {
  try {
    const result = await handleRevenueCalculation();
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const handlePrintInvoiceController = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  try {
    const result = await printInvoice(orderId);

    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getStatisticsController = async (req, res) => {
  const { year } = req.query;

  console.log("year: ", year);

  if (!year || isNaN(year)) {
    throw new Error("Please provide a valid year");
  }

  try {
    const statistics = await getMonthlyStatistics(year);
    res.status(200).json({
      EC: 0,
      success: true,
      data: statistics,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
  createPaymentController,
  paymentCallbackController,
  cancelOrderController,
  handleRevenueCalculationController,
  handlePrintInvoiceController,
  getStatisticsController,
};
