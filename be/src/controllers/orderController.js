require("dotenv").config();
const asyncHandler = require("express-async-handler");
const {
  createOrder,
  getAllOrders,
  getOrderByUID,
  updateOrderStatus,
  getOrderUserById,
} = require("../services/orderService");

const createOrderController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  try {
    if (!COD) throw new Error("Create cash order failed");
    const result = await createOrder(_id, COD, couponApplied);
    res.json({
      EC: 0,
      message: "success",
    });
  } catch (error) {
    throw new Error(error);
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
  createOrderController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
};
