const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (productData) => {
  const result = await Product.create(productData);
  return result;
});

const getAProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.findById(id);
  return result;
});

const getAllProducts = asyncHandler(
  async (queryObj, sortBy, fields, page, limit) => {
    let query = Product.find(queryObj);

    //sorting
    if (sortBy) {
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting the fields
    if (fields) {
      const fieldList = fields.split(",").join(" ");
      query = query.select(fieldList);
    } else {
      query = query.select("-__v");
    }

    //paginating
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page does not exists");
    }

    const products = await query;
    return products;
  }
);

const updateProduct = asyncHandler(async (id, productData) => {
  validateMongodbId(id);
  const result = await Product.updateOne({ _id: id }, productData);
  return result;
});

const deleteProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.deleteById(id);
  return result;
});

module.exports = {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
