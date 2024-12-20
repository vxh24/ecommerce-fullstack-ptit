const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async (blogData) => {
  const newBlog = await Blog.create(blogData);
  return newBlog;
});

const updateBlog = asyncHandler(async (id, blogData) => {
  validateMongodbId(id);
  const result = await Blog.findByIdAndUpdate(id, blogData);
  return result;
});

const getABlog = asyncHandler(async (id) => {
  validateMongodbId(id);
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      $inc: { numViews: 1 },
    },
    { new: true }
  )
    .populate({
      path: "likes",
      select: "_id name",
    })
    .populate({
      path: "dislikes",
      select: "_id name",
    });
  return updatedBlog;
});

const getAllBlogs = asyncHandler(async () => {
  const result = await Blog.find({});
  return result;
});

const deleteABlog = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Blog.deleteOne({ _id: id });
  return result;
});

const likeBlog = asyncHandler(async (blogId, loginUserId) => {
  validateMongodbId(blogId);

  //find blog and check status like, dislike
  const blog = await Blog.findById(blogId);
  const isLiked = blog?.likes?.includes(loginUserId);
  const isDisliked = blog?.dislikes?.includes(loginUserId);

  const updateBlog = async (updateFields) => {
    return await Blog.findByIdAndUpdate(blogId, updateFields, {
      new: true,
    }).populate("likes dislikes");
  };

  if (isDisliked) {
    return await updateBlog({
      $pull: { dislikes: loginUserId },
      $addToSet: { likes: loginUserId },
      isLiked: true,
      isDisliked: false,
    });
  }

  if (isLiked) {
    return await updateBlog({
      $pull: { likes: loginUserId },
      isLiked: false,
    });
  }

  return await updateBlog({
    $addToSet: { likes: loginUserId },
    isLiked: true,
  });
});

const dislikeBlog = asyncHandler(async (blogId, loginUserId) => {
  validateMongodbId(blogId);

  const blog = await Blog.findById(blogId);
  const isLiked = blog?.likes?.includes(loginUserId);
  const isDisliked = blog?.dislikes?.includes(loginUserId);

  const updateBlog = async (updateFields) => {
    return await Blog.findByIdAndUpdate(blogId, updateFields, {
      new: true,
    }).populate("likes dislikes");
  };

  if (isLiked) {
    return await updateBlog({
      $pull: { likes: loginUserId },
      $addToSet: { dislikes: loginUserId },
      isLiked: false,
      isDisliked: true,
    });
  }

  if (isDisliked) {
    return await updateBlog({
      $pull: { dislikes: loginUserId },
      isDisliked: false,
    });
  }

  return await updateBlog({
    $addToSet: { dislikes: loginUserId },
    isDisliked: true,
  });
});

module.exports = {
  createBlog,
  updateBlog,
  getABlog,
  getAllBlogs,
  deleteABlog,
  likeBlog,
  dislikeBlog,
};
