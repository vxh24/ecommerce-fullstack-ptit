const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createColorController,
  getAllColorsController,
  updateColorController,
  getAColorController,
  deleteColorController,
} = require("../controllers/colorController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColorController);
router.get("/", authMiddleware, isAdmin, getAllColorsController);
router.put("/:id", authMiddleware, isAdmin, updateColorController);
router.get("/:id", authMiddleware, isAdmin, getAColorController);
router.delete("/:id", authMiddleware, isAdmin, deleteColorController);

module.exports = router;
