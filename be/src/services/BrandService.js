const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const { uploadSingleFile } = require("./fileService");

const createBrand = asyncHandler(async (brandData) => {
  const newBrand = await Brand.create(brandData);
  return newBrand;
});

const updateBrand = asyncHandler(async (id, brandData, file) => {
  validateMongodbId(id);

  const updateData = {};
  if (brandData.title) updateData.title = brandData.title;

  if (file) {
    const uploadResult = await uploadSingleFile(file, "brands");
    updateData.image = uploadResult.cloudinaryUrl;
  }

  const result = await Brand.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return result;
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
