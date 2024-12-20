const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (brandData) => {
  const newBrand = await Brand.create(brandData);
  return newBrand;
});

const updateBrand = asyncHandler(async (id, brandData) => {
  validateMongodbId(id);
  const updatedBrand = await Brand.updateOne({ _id: id }, brandData);
  return updatedBrand;
});

const deleteBrand = asyncHandler(async (id) => {
  validateMongodbId(id);
  const deletedBrand = await Brand.deleteOne({ _id: id });
  return deletedBrand;
});

const getABrand = asyncHandler(async (id) => {
  validateMongodbId(id);
  const getABrand = await Brand.findById(id);
  return getABrand;
});

const getAllBrands = asyncHandler(async () => {
  const result = await Brand.find({});
  return result;
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getABrand,
  getAllBrands,
};
