const asyncHandler = require("express-async-handler");
const {
  createBlog,
  updateBlog,
  getABlog,
  getAllBlogs,
  deleteABlog,
  likeBlog,
  dislikeBlog,
} = require("../services/blogService");
const BlogCategory = require("../models/blogCategoryModel");

const createBlogController = asyncHandler(async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !description || !category) {
      throw new Error(
        "Please provide all required fields: title, category, description"
      );
    }

    const newBlog = await createBlog(title, category, description);

    res.json({
      EC: 0,
      data: newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlogController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateBlog(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getABlogController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getABlog(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw Error(error);
  }
});

const getAllBlogsController = asyncHandler(async (req, res) => {
  try {
    const queryObj = req.query;
    if (queryObj.category) {
      const category = await BlogCategory.findOne({ title: queryObj.category });
      if (category) {
        queryObj.category = category._id;
      } else {
        return res.status(400).json({
          EC: 1,
          message: "Category not found",
        });
      }
    }
    let queryStr = JSON.stringify(queryObj);
    const result = await getAllBlogs(JSON.parse(queryStr));
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw Error(error);
  }
});

const deleteABlogController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteABlog(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlogController = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const loginUserId = req?.user?._id;
  try {
    const result = await likeBlog(blogId, loginUserId);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const disLikeBlogController = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const loginUserId = req?.user?._id;
  try {
    const result = await dislikeBlog(blogId, loginUserId);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogController,
  updateBlogController,
  getABlogController,
  getAllBlogsController,
  deleteABlogController,
  likeBlogController,
  disLikeBlogController,
};
