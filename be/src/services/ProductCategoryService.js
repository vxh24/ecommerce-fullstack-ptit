const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const { uploadSingleFile } = require("./fileService");

const createCategory = asyncHandler(async (categoryData) => {
  const newCategory = await ProductCategory.create(categoryData);
  return newCategory;
});

const updateCategory = asyncHandler(async (id, categoryData, file) => {
  validateMongodbId(id);

  const updateData = {};
  if (categoryData.title) updateData.title = categoryData.title;

  if (file) {
    const uploadResult = await uploadSingleFile(file, "categories");
    updateData.image = uploadResult.cloudinaryUrl;
  }

  const result = await ProductCategory.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return result;
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
