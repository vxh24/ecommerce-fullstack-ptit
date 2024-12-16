const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const User = require("../models/userModel");
const natural = require("natural");
const { uploadMultipleFiles } = require("./fileService");
const Color = require("../models/colorModel");
const tfidf = new natural.TfIdf();

// var TfIdf = require('node-tfidf');
// var tfidf = new TfIdf();

const createProduct = asyncHandler(async (productData, files) => {
  const uploadResults = await uploadMultipleFiles(files, "products");

  const uploadedImages = uploadResults.detail.map((result) => ({
    public_id: result.public_id,
    url: result.cloudinaryUrl,
  }));

  let colorIds = productData.colors;

  if (!Array.isArray(colorIds)) {
    colorIds = [colorIds];
  }

  const existingColors = await Color.find({
    _id: { $in: colorIds },
  }).select("_id");

  const existingColorIds = existingColors.map((color) => color._id.toString());

  const notFoundColors = colorIds.filter(
    (id) => !existingColorIds.includes(id)
  );

  if (notFoundColors.length > 0) {
    throw new Error(
      `One or more colors do not exist: ${notFoundColors.join(", ")}`
    );
  } else {
    console.log("All color IDs are valid.");
  }

  const newProduct = new Product({
    images: uploadedImages,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    category: productData.category,
    brand: productData.brand,
    quantity: productData.quantity,
    colors: colorIds,
    tags: productData.tags,
  });

  await newProduct.save();

  return newProduct.populate("colors");
});

const getAProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.findById(id).populate("colors");
  return result;
});

const getAllProducts = asyncHandler(async (queryObj, sortBy, fields) => {
  let query = Product.find(queryObj).populate("colors");

  //sorting
  if (sortBy) {
    switch (sortBy) {
      case "name-asc": // A-Z
        query = query.sort("name");
        break;
      case "name-desc": // Z-A
        query = query.sort("-name");
        break;
      case "price-asc": // tang dan
        query = query.sort("price");
        break;
      case "price-desc": // giam dan
        query = query.sort("-price");
        break;
      default:
        query = query.sort("-createdAt"); // ngay tao
    }
  } else {
    query = query.sort("-createdAt"); // ngay tao
  }

  //limiting the fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    query = query.select(fieldList);
  } else {
    query = query.select("-__v");
  }

  //paginating
  // const skip = (page - 1) * limit;
  // query = query.skip(skip).limit(limit);
  // if (page) {
  //   const productCount = await Product.countDocuments();
  //   if (skip >= productCount) throw new Error("This page does not exists");
  // }

  const products = await query;
  return products;
});

const updateProduct = asyncHandler(async (id, productData, files) => {
  validateMongodbId(id);

  const product = await getAProduct(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  let uploadedImages = product.images;
  if (files && files.length > 0) {
    const uploadResults = await uploadMultipleFiles(files, "products");
    uploadedImages = uploadResults.detail.map((result) => ({
      public_id: result.public_id,
      url: result.cloudinaryUrl,
    }));
  }

  let colorIds = productData.colors;
  if (!Array.isArray(colorIds)) {
    colorIds = [colorIds];
  }

  const existingColors = await Color.find({ _id: { $in: colorIds } }).select(
    "_id"
  );
  const existingColorIds = existingColors.map((color) => color._id.toString());

  const notFoundColors = colorIds.filter(
    (id) => !existingColorIds.includes(id)
  );

  if (notFoundColors.length > 0) {
    throw new Error(
      `One or more colors do not exist: ${notFoundColors.join(", ")}`
    );
  }

  product.images = uploadedImages;
  product.name = productData.name || product.name;
  product.description = productData.description || product.description;
  product.price = productData.price || product.price;
  product.category = productData.category || product.category;
  product.brand = productData.brand || product.brand;
  product.quantity = productData.quantity || product.quantity;
  product.colors = colorIds;
  product.tags = productData.tags || product.tags;

  const updatedProduct = await product.save();

  return updatedProduct.populate("colors");
});

const deleteProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.deleteOne({ _id: id });
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
  let findProduct = await Product.findByIdAndUpdate(
    productId,
    { totalRatings: actualRating },
    { new: true }
  );
  return findProduct;
});

// Tính toán độ tương đồng giữa các mô tả sử dụng TF-IDF
const calculateDescriptionSimilarity = (descriptionA, descriptionB) => {
  const TfIdf = require("natural").TfIdf;
  const tfidf = new TfIdf();

  tfidf.addDocument(descriptionA);
  tfidf.addDocument(descriptionB);
  // return tfidf.cosineSimilarity(0, 1); // Tính độ tương đồng giữa hai văn bản
  // Lấy các vector của cả hai văn bản
  const vectorA = tfidf.listTerms(0); // Vector của document 0 (descriptionA)
  const vectorB = tfidf.listTerms(1); // Vector của document 1 (descriptionB)

  // Tính cosine similarity
  const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, termA) => {
      const termB = vecB.find((term) => term.term === termA.term);
      if (termB) {
        return sum + termA.tf * termB.tf;
      }
      return sum;
    }, 0);

    const magnitudeA = Math.sqrt(
      vecA.reduce((sum, term) => sum + Math.pow(term.tf, 2), 0)
    );
    const magnitudeB = Math.sqrt(
      vecB.reduce((sum, term) => sum + Math.pow(term.tf, 2), 0)
    );

    return dotProduct / (magnitudeA * magnitudeB);
  };
  return cosineSimilarity(vectorA, vectorB);
};

// Tính độ tương đồng dựa trên các tags
const calculateTagsSimilarity = (tagsA, tagsB) => {
  const commonTags = tagsA.filter((tag) => tagsB.includes(tag)).length;
  return commonTags / Math.max(tagsA.length, tagsB.length); // Độ tương đồng theo số lượng tags chung
};

// Tính độ tương đồng giữa giá sản phẩm (đơn giản: tỉ lệ chênh lệch giá)
const calculatePriceSimilarity = (priceA, priceB) => {
  const maxPrice = Math.max(priceA, priceB);
  const minPrice = Math.min(priceA, priceB);
  return 1 - (maxPrice - minPrice) / maxPrice; // Độ tương đồng ngược lại với sự khác biệt về giá
};

// Tính độ tương đồng giữa sản phẩm
const calculateProductSimilarity = (productA, productB) => {
  // Tính độ tương đồng theo từng đặc tính
  const descriptionSimilarity = calculateDescriptionSimilarity(
    productA.description,
    productB.description
  );
  const tagsSimilarity = calculateTagsSimilarity(productA.tags, productB.tags);
  const priceSimilarity = calculatePriceSimilarity(
    productA.price,
    productB.price
  );
  const categorySimilarity = productA.category === productB.category ? 1 : 0; // Độ tương đồng dựa trên category (giống nhau là 1, khác nhau là 0)

  // Kết hợp các độ tương đồng thành một giá trị tổng hợp
  const totalSimilarity =
    0.4 * descriptionSimilarity +
    0.3 * tagsSimilarity +
    0.2 * priceSimilarity +
    0.1 * categorySimilarity;
  return totalSimilarity;
};

// API để gợi ý sản phẩm dựa trên độ tương đồng
const recommendProducts = async (productId) => {
  validateMongodbId(productId);
  const product = await Product.findById(productId);
  const allProducts = await Product.find();

  // Tính toán độ tương đồng cho tất cả các sản phẩm và sắp xếp theo độ tương đồng
  const recommendedProducts = allProducts
    .filter((p) => p.id !== productId) // Lọc ra sản phẩm không phải là sản phẩm đang xem
    .map((p) => {
      return {
        product: p,
        similarity: calculateProductSimilarity(product, p),
      };
    })
    .sort((a, b) => b.similarity - a.similarity); // Sắp xếp theo độ tương đồng giảm dần

  return recommendedProducts.slice(0, 4); // Trả về top 5 sản phẩm gợi ý
};

const searchProductsByName = asyncHandler(async (name) => {
  if (!name) {
    throw new Error("Searc query 'name' is required");
  }

  const products = await Product.find({
    name: { $regex: name, $options: "i" },
  });

  return products;
});

module.exports = {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  recommendProducts,
  searchProductsByName,
};
