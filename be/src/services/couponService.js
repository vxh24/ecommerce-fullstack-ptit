const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (data) => {
  const newCoupon = await Coupon.create(data);

  return newCoupon;
});

const getAllCoupons = asyncHandler(async () => {
  const result = await Coupon.find({});
  return result;
});

const updateCoupon = asyncHandler(async (id, couponData) => {
  validateMongodbId(id);
  const updatedCoupon = await Coupon.updateOne({ _id: id }, couponData);
  return updatedCoupon;
});

const deleteCoupon = asyncHandler(async (id) => {
  validateMongodbId(id);
  const deletedCoupon = await Coupon.deleteById(id);
  return deletedCoupon;
});

module.exports = { createCoupon, getAllCoupons, updateCoupon, deleteCoupon };
