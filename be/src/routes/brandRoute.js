const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createBrandController,
  updateBrandController,
  deleteBrandController,
  getABrandController,
  getAllBrandsController,
} = require("../controllers/brandController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrandController);
router.get("/", getAllBrandsController);
router.put("/:id", authMiddleware, isAdmin, updateBrandController);
router.get("/:id", getABrandController);
router.delete("/:id", authMiddleware, isAdmin, deleteBrandController);

module.exports = router;
