const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (categoryData) => {
  const newCategory = await BlogCategory.create(categoryData);
  return newCategory;
});

const updateCategory = asyncHandler(async (id, categoryData) => {
  validateMongodbId(id);
  const updatedCategory = await BlogCategory.updateOne(
    { _id: id },
    categoryData
  );
  return updatedCategory;
});

const deleteCategory = asyncHandler(async (id) => {
  validateMongodbId(id);
  const deletedCategory = await BlogCategory.deleteOne({ _id: id });
  return deletedCategory;
});

const getACategory = asyncHandler(async (id) => {
  validateMongodbId(id);
  const getACategory = await BlogCategory.findById(id);
  return getACategory;
});

const getAllCategories = asyncHandler(async () => {
  const result = await BlogCategory.find({});
  return result;
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
  getAllCategories,
};
