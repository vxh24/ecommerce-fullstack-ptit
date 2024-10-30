const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const User = require("../models/userModel");

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
  const result = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  return result;
});

const deleteProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.deleteById(id);
  return result;
});

const addToWishlist = asyncHandler(async (productId, userId) => {
  validateMongodbId(productId);
  const user = await User.findById(userId);

  const alreadyAdded = user.wishlist.find(
    (id) => id.toString() === productId.toString()
  );
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { wishlist: productId },
      },
      {
        new: true,
      }
    );
    return user;
  } else {
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { wishlist: productId },
      },
      {
        new: true,
      }
    );
    return user;
  }
});

const rating = asyncHandler(async (star, comment, productId, userId) => {
  validateMongodbId(productId);
  const product = await Product.findById(productId);
  let alreadyRated = product.ratings.find(
    (id) => id.postedBy.toString() === userId.toString()
  );
  if (alreadyRated) {
    const updatedRating = await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRated },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      { new: true }
    );
  } else {
    const rateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedBy: userId,
          },
        },
      },
      {
        new: true,
      }
    );
  }
  const getAllRatings = await Product.findById(productId);
  let totalRating = getAllRatings.ratings.length;
  let ratingSum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((prev, cur) => prev + cur, 0);
  let actualRating = Math.round(ratingSum / totalRating);
  console.log(actualRating);
  let findProduct = await Product.findByIdAndUpdate(
    productId,
    { totalRatings: actualRating },
    { new: true }
  );
  return findProduct;
});

module.exports = {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
