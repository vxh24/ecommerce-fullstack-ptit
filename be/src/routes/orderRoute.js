const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
  createPaymentController,
  createOrderByPaymentOnline,
  paymentCallbackController,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/cash-order", authMiddleware, createOrderByCODController); //COD
router.post("/create-payment", authMiddleware, createPaymentController); //MOMO
router.post("/payment-callback", authMiddleware, paymentCallbackController);
router.post("/callback", authMiddleware, createOrderByPaymentOnline);
router.get("/", authMiddleware, getOrderByUIDController);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrdersController);
router.get("/:id", authMiddleware, isAdmin, getOrderByIdController);
router.put(
  "/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatusController
);

module.exports = router;
