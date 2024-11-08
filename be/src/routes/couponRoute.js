const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createCouponController,
  getAllCouponsController,
  updateCouponController,
  deleteCouponController,
} = require("../controllers/couponController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCouponController);
router.get("/", authMiddleware, isAdmin, getAllCouponsController);
router.put("/:id", authMiddleware, isAdmin, updateCouponController);
router.delete("/:id", authMiddleware, isAdmin, deleteCouponController);

module.exports = router;
