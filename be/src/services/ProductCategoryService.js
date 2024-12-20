const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (categoryData) => {
  const newCategory = await ProductCategory.create(categoryData);
  return newCategory;
});

const updateCategory = asyncHandler(async (id, categoryData) => {
  validateMongodbId(id);
  const updatedCategory = await ProductCategory.updateOne(
    { _id: id },
    categoryData
  );
  return updatedCategory;
});

const deleteCategory = asyncHandler(async (id) => {
  validateMongodbId(id);
  const deletedCategory = await ProductCategory.deleteOne({ _id: id });
  return deletedCategory;
});

const getACategory = asyncHandler(async (id) => {
  validateMongodbId(id);
  const getACategory = await ProductCategory.findById(id);
  return getACategory;
});

const getAllCategories = asyncHandler(async () => {
  const result = await ProductCategory.find({});
  return result;
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
  getAllCategories,
};
