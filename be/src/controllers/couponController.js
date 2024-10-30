const asyncHandler = require("express-async-handler");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponService");

const createCouponController = asyncHandler(async (req, res) => {
  try {
    const result = await createCoupon(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCouponsController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllCoupons();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCouponController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateCoupon(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCouponController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCoupon(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCouponController,
  getAllCouponsController,
  updateCouponController,
  deleteCouponController,
};
