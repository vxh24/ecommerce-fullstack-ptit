const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIndent: {},
    orderAddress: {
      type: String,
      require: true,
    },
    orderStatus: {
      type: String,
      default: "Chờ xác nhận",
      enum: ["Chờ xác nhận", "Chờ giao hàng", "Hoàn thành", "Hủy"],
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
