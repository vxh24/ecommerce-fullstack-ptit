const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
