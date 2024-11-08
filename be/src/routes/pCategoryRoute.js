const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getACategoryController,
  getAllCategoriesController,
} = require("../controllers/productCategoryController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategoryController);
router.get("/", getAllCategoriesController);
router.put("/:id", authMiddleware, isAdmin, updateCategoryController);
router.get("/:id", getACategoryController);
router.delete("/:id", authMiddleware, isAdmin, deleteCategoryController);

module.exports = router;
