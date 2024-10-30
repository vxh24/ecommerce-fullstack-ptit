const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  deleteAUserController,
  updateAUserController,
  handleRefreshToken,
  logoutController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  loginAdminController,
  getWishlistController,
  saveAddressController,
  addtoCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  createOrderController,
  getOrderController,
  updateOrderStatusController,
} = require("../controllers/userController");

const {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  addToWishlistController,
  ratingController,
  uploadImagesController,
} = require("../controllers/productController");

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

const {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getACategoryController,
  getAllCategoriesController,
} = require("../controllers/productCategoryController");

const {
  createBlogCategoryController,
  updateBlogCategoryController,
  deleteBlogCategoryController,
  getABlogCategoryController,
  getAllBlogCategoriesController,
} = require("../controllers/blogCategoryController");

const {
  createBrandController,
  updateBrandController,
  deleteBrandController,
  getABrandController,
  getAllBrandsController,
} = require("../controllers/brandController");

const {
  createCouponController,
  getAllCouponsController,
  updateCouponController,
  deleteCouponController,
} = require("../controllers/couponController");
const {
  createColorController,
  getAllColorsController,
  updateColorController,
  getAColorController,
  deleteColorController,
} = require("../controllers/colorController");

const router = express.Router();
router.all("*", authMiddleware);

//auth
router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/admin-login", loginAdminController);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutController);

//user
router.get("/users/all-users", getAllUsersController);
router.get("/users/wishlist", getWishlistController);
router.put("/users/save-address", saveAddressController);
router.post("/users/cart", addtoCartController);
router.get("/users/cart", getUserCartController);
router.delete("/users/empty-cart", removeCartController);
router.post("/users/apply-coupon", handleCouponController);
router.post("/users/cart/cash-order", createOrderController);
router.get("/users/orders", getOrderController);
router.put("/users/update-password", updatePasswordController);
router.post("/users/forgot-password", forgotPasswordTokenController);
router.put("/users/reset-password/:token", resetPasswordController);
router.get("/users/:id", getUserByIdController);
router.delete("/users/:id", deleteAUserController);
router.put("/users/:id", updateAUserController);
router.put("/users/order/update-order/:id", updateOrderStatusController);

//product
router.post("/products/", createProductController);
router.get("/products/", getAllProductsController);
router.put("/products/wishlist", addToWishlistController);
router.put("/products/rating", ratingController);
router.put("/products/upload/:id", uploadImagesController);
router.get("/products/:id", getProductByIdController);
router.put("/products/:id", updateProductController);
router.delete("/products/:id", deleteProductController);

//blog
router.post("/blogs/", createBlogController);
router.get("/blogs/", getAllBlogsController);
router.put("/blogs/likes", likeBlogController);
router.put("/blogs/dislikes", disLikeBlogController);
router.put("/blogs/upload/:id", uploadImagesBlogController);
router.put("/blogs/:id", updateBlogController);
router.get("/blogs/:id", getABlogController);
router.delete("/blogs/:id", deleteABlogController);

//product category
router.post("/product-categories/", createCategoryController);
router.get("/product-categories/", getAllCategoriesController);
router.put("/product-categories/:id", updateCategoryController);
router.get("/product-categories/:id", getACategoryController);
router.delete("/product-categories/:id", deleteCategoryController);

//blog category
router.post("/blog-categories/", createBlogCategoryController);
router.get("/blog-categories/", getAllBlogCategoriesController);

router.put("/products/upload/:id", uploadImagesBlogController);

router.put("/blog-categories/:id", updateBlogCategoryController);
router.get("/blog-categories/:id", getABlogCategoryController);
router.delete("/blog-categories/:id", deleteBlogCategoryController);

//brand
router.post("/brands/", createBrandController);
router.get("/brands/", getAllBrandsController);
router.put("/brands/:id", updateBrandController);
router.get("/brands/:id", getABrandController);
router.delete("/brands/:id", deleteBrandController);

//color
router.post("/color/", createColorController);
router.get("/color/", getAllColorsController);
router.put("/color/:id", updateColorController);
router.get("/color/:id", getAColorController);
router.delete("/color/:id", deleteColorController);

//coupon
router.post("/coupons/", createCouponController);
router.get("/coupons/", getAllCouponsController);
router.put("/coupons/:id", updateCouponController);
router.delete("/coupons/:id", deleteCouponController);

module.exports = router;
