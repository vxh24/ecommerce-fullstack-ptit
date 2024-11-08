const express = require("express");

const {
  createBlogController,
  updateBlogController,
  getABlogController,
  getAllBlogsController,
  deleteABlogController,
  likeBlogController,
  disLikeBlogController,
  uploadImagesBlogController,
} = require("../controllers/blogController");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogController);
router.get("/", getAllBlogsController);
router.put("/likes", authMiddleware, likeBlogController);
router.put("/dislikes", authMiddleware, disLikeBlogController);
router.put("/upload/:id", authMiddleware, uploadImagesBlogController);
router.put("/:id", authMiddleware, isAdmin, updateBlogController);
router.get("/:id", getABlogController);
router.delete("/:id", authMiddleware, isAdmin, deleteABlogController);

module.exports = router;
