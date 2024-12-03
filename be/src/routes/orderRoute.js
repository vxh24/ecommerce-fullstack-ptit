const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createOrderByCODController,
  getAllOrdersController,
  updateOrderStatusController,
  getOrderByUIDController,
  getOrderByIdController,
  handlePaymentController,
  createOrderByPaymentOnline,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/cash-order", authMiddleware, createOrderByCODController); //COD
router.post("/payment", authMiddleware, handlePaymentController);
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
