const asyncHandler = require("express-async-handler");
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  recommendProducts,
  searchProductsByName,
  generateQRCodeProduct,
} = require("../services/productService");
const { deleteToCloudinary } = require("../utils/cloudinary");

const createProductController = asyncHandler(async (req, res) => {
  const { name, description, price, category, brand, quantity, colors, tags } =
    req.body;

  const files = req.files.images;

  if (!files || files.length === 0) {
    throw new Error("No images uploaded");
  }

  const newProduct = await createProduct(
    { name, description, price, category, brand, quantity, colors, tags },
    files
  );

  res.status(200).json({
    EC: 0,
    message: "Product added successfully",
    data: newProduct,
  });
});

const getProductByIdController = asyncHandler(async (req, res) => {
  // res.send("get product by id");
  const id = req.params.id;
  const findProduct = await getAProduct(id);
  const recommendedP = await recommendProducts(id);
  res.status(200).json({
    EC: 0,
    data: findProduct,
    recommend: recommendedP,
  });
});

const getAllProductsController = asyncHandler(async (req, res) => {
  //filtering
  const queryObj = { ...req.query };
  const excludeFields = ["sort", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //sorting
  const sortBy = req.query.sort ? req.query.sort.split(",").join(" ") : "";
  const fields = req.query.fields;

  //paginating
  // const page = req.query.page;
  // const limit = req.query.limit;

  let products = await getAllProducts(
    JSON.parse(queryStr),
    sortBy,
    fields
    // page,
    // limit
  );

  res.status(200).json({
    EC: 0,
    data: products,
  });
});

const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const productData = req.body;
  const files = req.files ? req.files.images : [];

  const result = await updateProduct(id, productData, files);
  res.status(200).json({
    EC: 0,
    message: "Update product successfull",
    data: result,
  });
});

const deleteProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await deleteProduct(id);
  res.status(200).json({
    EC: 0,
    message: "Delete product successfully!!!",
  });
});

const addToWishlistController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const result = await addToWishlist(productId, _id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const ratingController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, productId } = req.body;
  try {
    const result = await rating(star, comment, productId, _id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImagesController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const public_id = "products" + "/" + id;
  try {
    const imageDeleted = await deleteToCloudinary(public_id);

    res.status(200).json({
      EC: 0,
      message: "Deleted successful",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const searchProductsController = asyncHandler(async (req, res) => {
  const { name } = req.query;

  const products = await searchProductsByName(name);
  res.status(200).json({
    EC: 0,
    message: "Search completed",
    data: products,
  });
});

const generateQRCodeController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const qrCodeURL = await generateQRCodeProduct(id);
    res.status(200).json({
      EC: 0,
      data: qrCodeURL,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  addToWishlistController,
  ratingController,
  deleteImagesController,
  searchProductsController,
  generateQRCodeController,
};
