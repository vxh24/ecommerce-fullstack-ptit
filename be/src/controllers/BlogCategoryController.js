const asyncHandler = require("express-async-handler");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
  getAllCategories,
} = require("../services/BlogCategoryService");

const createBlogCategoryController = asyncHandler(async (req, res) => {
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

const updateBlogCategoryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateCategory(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlogCategoryController = asyncHandler(async (req, res) => {
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

const getABlogCategoryController = asyncHandler(async (req, res) => {
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

const getAllBlogCategoriesController = asyncHandler(async (req, res) => {
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
  createBlogCategoryController,
  updateBlogCategoryController,
  deleteBlogCategoryController,
  getABlogCategoryController,
  getAllBlogCategoriesController,
};
