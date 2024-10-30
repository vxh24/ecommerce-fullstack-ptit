const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const brandSchema = new mongoose.Schema(
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

brandSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
