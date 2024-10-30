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
const Blog = require("../models/blogModel");
const cloudinaryUploadImage = require("../utils/cloudinary");
const { uploadMultipleFiles } = require("../services/fileService");

const createBlogController = asyncHandler(async (req, res) => {
  try {
    const newBlog = await createBlog(req.body);
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
    const result = await getAllBlogs();
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
  // console.log(blogId);
  const loginUserId = req?.user?._id;
  // console.log(loginUserId);
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
  // console.log(blogId);
  const loginUserId = req?.user?._id;
  // console.log(loginUserId);
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

const uploadImagesBlogController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const files = req.files.images;
    if (!files) {
      return res.status(400).json({
        EC: 1,
        message: "No files uploaded",
      });
    }

    const filesArr = Array.isArray(files) ? files : [files];
    console.log(filesArr);

    // Gọi hàm upload để upload lên cả local và Cloudinary
    const uploadResults = await uploadMultipleFiles(filesArr, "blogs");

    if (uploadResults.countSuccess === 0) {
      return res.status(500).json({
        EC: 1,
        message: "Failed to upload files",
      });
    }

    // Lấy cả đường dẫn local và Cloudinary URL
    const images = uploadResults.detail.map((file) => ({
      localPath: file.path,
      cloudinaryUrl: file.cloudinaryUrl,
    }));

    const currentBlog = await getABlog(id);
    const updatedImages = [...(currentBlog.images || []), ...images];

    const updatedBlog = await updateBlog(
      id,
      {
        images: updatedImages,
      },
      { new: true }
    );
    res.json(updatedBlog);
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
  uploadImagesBlogController,
};
