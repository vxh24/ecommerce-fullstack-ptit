const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  addToWishlistController,
  ratingController,
  uploadImagesController,
  deleteImagesController,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProductController);
router.get("/", getAllProductsController);
router.put("/wishlist", authMiddleware, addToWishlistController);
router.put("/rating", authMiddleware, ratingController);
router.post("/upload", authMiddleware, isAdmin, uploadImagesController);
router.delete(
  "/upload/delete-img/:id",
  authMiddleware,
  isAdmin,
  deleteImagesController
);
router.get("/:id", getProductByIdController);
router.put("/:id", authMiddleware, isAdmin, updateProductController);
router.delete("/:id", authMiddleware, isAdmin, deleteProductController);

module.exports = router;
