const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createCouponController,
  getAllCouponsController,
  updateCouponController,
  deleteCouponController,
} = require("../controllers/couponController");

const router = express.Router();

router.post("/coupons/", authMiddleware, isAdmin, createCouponController);
router.get("/coupons/", authMiddleware, getAllCouponsController);
router.put("/coupons/:id", authMiddleware, isAdmin, updateCouponController);
router.delete("/coupons/:id", authMiddleware, isAdmin, deleteCouponController);

module.exports = router;
