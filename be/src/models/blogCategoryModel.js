const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const blogCategorySchema = new mongoose.Schema(
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

blogCategorySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const blogCategory = mongoose.model("BlogCategory", blogCategorySchema);

module.exports = blogCategory;
