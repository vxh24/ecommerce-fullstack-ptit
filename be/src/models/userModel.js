const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_delete = require("mongoose-delete");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refresh_token: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
