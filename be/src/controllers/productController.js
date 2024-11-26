const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  recommendProducts,
} = require("../services/productService");
const { uploadMultipleFiles } = require("../services/fileService");
const { deleteToCloudinary } = require("../utils/cloudinary");

const createProductController = asyncHandler(async (req, res) => {
  // res.send("Create new product");
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await createProduct(req.body);
  res.status(200).json({
    EC: 0,
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
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //sorting
  const sortBy = req.query.sort ? req.query.sort.split(",").join(" ") : "";
  const fields = req.query.fields;

  //paginating
  const page = req.query.page;
  const limit = req.query.limit;

  let products = await getAllProducts(
    JSON.parse(queryStr),
    sortBy,
    fields,
    page,
    limit
  );

  res.status(200).json({
    EC: 0,
    data: products,
  });
});

const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const result = await updateProduct(id, req.body);
  res.status(200).json({
    EC: 0,
    data: result,
  });
});

const deleteProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await deleteProduct(id);
  res.status(200).json({
    EC: 0,
    data: result,
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

const uploadImagesController = asyncHandler(async (req, res) => {
  try {
    const files = req.files.images;
    if (!files) {
      return res.status(400).json({
        EC: 1,
        message: "No files uploaded",
      });
    }

    const filesArr = Array.isArray(files) ? files : [files];

    const uploadResults = await uploadMultipleFiles(filesArr, "products");

    if (uploadResults.countSuccess === 0) {
      return res.status(500).json({
        EC: 1,
        message: "Failed to upload files",
      });
    }

    const images = uploadResults.detail.map((file) => ({
      url: file.cloudinaryUrl,
      asset_id: file.asset_id,
      public_id: file.public_id,
    }));

    res.status(200).json({
      EC: 0,
      message: "Files uploaded successfully",
      images,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImagesController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const public_id = "products" + "/" + id;
  try {
    const imageDeleted = deleteToCloudinary(public_id);
    res.status(200).json({
      EC: 0,
      message: "Deleted successful",
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
  uploadImagesController,
  deleteImagesController,
};
