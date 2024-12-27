const asyncHandler = require("express-async-handler");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
  getAllCategories,
} = require("../services/productCategoryService");

const createCategoryController = asyncHandler(async (req, res) => {
  try {
    const result = await createCategory(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const file = req.files?.image;
  try {
    const result = await updateCategory(id, { title }, file);
    res.status(200).json({
      EC: 0,
      message: "Update category successfull",
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteCategory(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getACategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getACategory(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategoriesController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllCategories();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getACategoryController,
  getAllCategoriesController,
};
