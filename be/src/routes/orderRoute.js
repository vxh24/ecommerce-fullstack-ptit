const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
  createPaymentController,
  paymentCallbackController,
  cancelOrderController,
  handleRevenueCalculationController,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/cash-order", authMiddleware, createOrderByCODController); //COD
router.post("/create-payment", authMiddleware, createPaymentController); //MOMO
router.post("/payment-callback", authMiddleware, paymentCallbackController);
router.get("/", authMiddleware, getOrderByUIDController);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrdersController);
router.get(
  "/get-revenue",
  authMiddleware,
  isAdmin,
  handleRevenueCalculationController
);
router.get("/:id", authMiddleware, isAdmin, getOrderByIdController);
router.put(
  "/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatusController
);
router.put("/cancel-order/:orderId", authMiddleware, cancelOrderController);

module.exports = router;
