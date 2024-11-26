const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      require: true,
    },
    commune: {
      type: String,
      require: true,
    },
    specificAddress: {
      type: String,
      require: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
