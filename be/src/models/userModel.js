const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
      default:
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refresh_token: { type: String },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoose_delete, { overrideMethods: "all" });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const reset_token = crypto.randomBytes(32).toString("hex");
  console.log(reset_token);
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(reset_token)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
  return reset_token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
