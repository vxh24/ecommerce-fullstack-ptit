const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createCouponController,
  getAllCouponsController,
  updateCouponController,
  deleteCouponController,
  getACouponController,
} = require("../controllers/couponController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCouponController);
router.get("/", authMiddleware, getAllCouponsController);
router.get("/:id", authMiddleware, isAdmin, getACouponController);
router.put("/:id", authMiddleware, isAdmin, updateCouponController);
router.delete("/:id", authMiddleware, isAdmin, deleteCouponController);

module.exports = router;
