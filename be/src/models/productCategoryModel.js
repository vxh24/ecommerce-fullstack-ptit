const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

productCategorySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const productCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = productCategory;
