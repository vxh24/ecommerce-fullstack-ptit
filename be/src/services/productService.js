const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const User = require("../models/userModel");
const natural = require("natural");
const { uploadMultipleFiles } = require("./fileService");
const tfidf = new natural.TfIdf();

const createProduct = asyncHandler(async (productData, files) => {
  const uploadResults = await uploadMultipleFiles(files, "products");
  const uploadedImages = uploadResults.detail.map((result) => ({
    public_id: result.public_id,
    url: result.cloudinaryUrl,
  }));

  let colors = productData.colors;
  if (!Array.isArray(colors)) {
    colors = [colors];
  }

  const validColors = colors.map((color) => {
    if (!color.name || typeof color.quantity !== "number") {
      throw new Error(`Invalid color format: ${JSON.stringify(color)}`);
    }
    return {
      name: color.name,
      quantity: color.quantity,
    };
  });

  const newProduct = new Product({
    images: uploadedImages,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    category: productData.category,
    brand: productData.brand,
    quantity: productData.quantity,
    colors: validColors,
    tags: productData.tags,
  });

  await newProduct.save();

  return newProduct.populate("category brand");
});

const getAProduct = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await Product.findById(id).populate("category brand");
  return result;
});

const getAllProducts = asyncHandler(async (queryObj, sortBy, fields) => {
  let query = Product.find(queryObj).populate("category brand");

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

  let colors = productData.colors || product.colors;
  if (typeof colors === "string") {
    try {
      colors = JSON.parse(colors);
    } catch (error) {
      throw new Error("Invalid colors format");
    }
  }

  if (!Array.isArray(colors)) {
    throw new Error("Colors must be an array");
  }

  const validColors = colors.map((color) => {
    if (!color.name || typeof color.quantity !== "number") {
      throw new Error(`Invalid color format: ${JSON.stringify(color)}`);
    }
    return {
      name: color.name,
      quantity: color.quantity,
    };
  });

  product.images = uploadedImages;
  product.name = productData.name || product.name;
  product.description = productData.description || product.description;
  product.price = productData.price || product.price;
  product.category = productData.category || product.category;
  product.brand = productData.brand || product.brand;
  product.quantity = productData.quantity || product.quantity;
  product.colors = validColors;
  product.tags = productData.tags || product.tags;

  const updatedProduct = await product.save();

  return updatedProduct.populate("category brand");
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
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
        },
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
  let totalRating = product.ratings.length;
  let ratingSum = product.ratings
    .map((item) => item.star)
    .reduce((prev, cur) => prev + cur, 0);
  let actualRating = Math.round(ratingSum / totalRating);
  let updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { totalRatings: actualRating },
    { new: true }
  );

  updatedProduct = await Product.findById(productId).populate(
    "ratings.postedBy"
  );

  return updatedProduct;
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
  const product = await Product.findById(productId).populate("category brand");
  const allProducts = await Product.find().populate("category brand");

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

  return recommendedProducts.slice(0, 4); // Trả về top 4 sản phẩm gợi ý
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

const generateQRCodeProduct = asyncHandler(async (productId) => {
  validateMongodbId(productId);

  const product = await Product.findById(productId).populate("category brand");

  if (!product) {
    throw new Error("Product not found");
  }

  const qrContent = productId;

  const encodedQRContent = encodeURIComponent(qrContent);

  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedQRContent}&size=200x200`;

  return qrCodeURL;
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
  generateQRCodeProduct,
};
