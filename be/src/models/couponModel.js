const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

couponSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
