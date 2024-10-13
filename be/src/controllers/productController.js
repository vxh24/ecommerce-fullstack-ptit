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
} = require("../services/productService");
const { uploadMultipleFiles } = require("../services/fileService");

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
  res.status(200).json({
    EC: 0,
    data: findProduct,
  });
});

const getAllProductsController = asyncHandler(async (req, res) => {
  //filtering
  const queryObj = { ...req.query };
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));

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
  // console.log(_id);
  const { productId } = req.body;
  // console.log(productId);
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
  // console.log(_id);
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
  const { id } = req.params;
  try {
    const files = req.files.images;
    if (!files) {
      return res.status(400).json({
        EC: 1,
        message: "No files uploaded",
      });
    }

    const filesArr = Array.isArray(files) ? files : [files];

    // Gọi hàm upload để upload lên cả local và Cloudinary
    const uploadResults = await uploadMultipleFiles(filesArr, "products");

    if (uploadResults.countSuccess === 0) {
      return res.status(500).json({
        EC: 1,
        message: "Failed to upload files",
      });
    }

    // Lấy cả đường dẫn local và Cloudinary URL
    const images = uploadResults.detail.map((file) => ({
      localPath: file.path,
      cloudinaryUrl: file.cloudinaryUrl,
    }));

    const currentProduct = await getAProduct(id);
    const updatedImages = [...(currentProduct.images || []), ...images];

    const updatedProduct = await updateProduct(
      id,
      {
        images: updatedImages,
      },
      { new: true }
    );
    res.json(updatedProduct);
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
};
