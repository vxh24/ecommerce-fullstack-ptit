const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createBlogCategoryController,
  updateBlogCategoryController,
  deleteBlogCategoryController,
  getABlogCategoryController,
  getAllBlogCategoriesController,
} = require("../controllers/blogCategoryController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlogCategoryController);
router.get("/", getAllBlogCategoriesController);
router.put("/:id", authMiddleware, isAdmin, updateBlogCategoryController);
router.get("/:id", getABlogCategoryController);
router.delete("/:id", authMiddleware, isAdmin, deleteBlogCategoryController);

module.exports = router;
