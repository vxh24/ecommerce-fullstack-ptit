const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Product = require("../models/productModel");

const createColor = asyncHandler(async (colorData) => {
  const newColor = await Color.create(colorData);
  return newColor;
});

const updateColor = asyncHandler(async (id, colorData) => {
  validateMongodbId(id);
  const updatedColor = await Color.findByIdAndUpdate(id, colorData, {
    new: true,
  });
  return updatedColor;
});

const deleteColor = asyncHandler(async (id) => {
  validateMongodbId(id);
  await Product.updateMany({ colors: id }, { $pull: { colors: id } });

  const deletedColor = await Color.deleteOne({ _id: id });
  return deletedColor;
});

const getAColor = asyncHandler(async (id) => {
  validateMongodbId(id);
  const getAColor = await Color.findById(id);
  return getAColor;
});

const getAllColors = asyncHandler(async () => {
  const result = await Color.find({});
  return result;
});

module.exports = {
  createColor,
  updateColor,
  deleteColor,
  getAColor,
  getAllColors,
};
