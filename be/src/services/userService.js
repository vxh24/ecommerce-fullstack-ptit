const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const sendEmail = require("./emailService");
const crypto = require("crypto");
const Address = require("../models/addressModel");
const { uploadSingleFile } = require("./fileService");

const getAllUsers = asyncHandler(async () => {
  const result = await User.find({}).select("-password");
  return result;
});

const getUserById = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await User.findById(id)
    .select("-password")
    .populate("address");
  return result;
});

const updateAUser = asyncHandler(async (id, userData, file) => {
  validateMongodbId(id);

  const updateData = {};
  if (userData.name) updateData.name = userData.name;
  if (userData.phone) updateData.phone = userData.phone;

  if (file) {
    const uploadResult = await uploadSingleFile(file);
    updateData.avatar = uploadResult.cloudinaryUrl;
  }

  const result = await User.findByIdAndUpdate(id, updateData, { new: true });
  return result;
});

const blockAUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  user.isBlock = true;
  const result = await user.save();
  return {
    _id: result._id,
    email: result.email,
    isBlock: result.isBlock,
  };
});

const unBlockAUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  user.isBlock = false;
  const result = await user.save();
  return {
    _id: result._id,
    email: result.email,
    isBlock: result.isBlock,
  };
});

const updatePassword = asyncHandler(async (email, newPassword) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!newPassword) {
    throw new Error("Password not provided");
  }

  user.password = newPassword;
  const reset_token = user.createPasswordResetToken();
  const updatedUser = await user.save();

  return updatedUser;
});

const generateResetPasswordToken = asyncHandler(async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");

  const token = await user.createPasswordResetToken();
  await user.save();

  const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="http://localhost:3000/reset-password/${token}">Click here</a>`;

  const data = {
    to: email,
    text: "Hey user",
    subject: "Forgot Password Link",
    html: resetURL,
  };
  await sendEmail(data);
  return token;
});

const resetPassword = asyncHandler(async (token, password) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired, Please try again later.");

  //reset password and remove token
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
});

const getWishlist = asyncHandler(async (id) => {
  const user = await User.findById(id).populate("wishlist");
  return user;
});

const getAddress = asyncHandler(async (id) => {
  const user = await User.findById(id).populate("address");
  return user;
});

const createAddress = asyncHandler(
  async (
    userId,
    name,
    phone,
    city,
    district,
    commune,
    specificAddress,
    isDefault
  ) => {
    validateMongodbId(userId);

    if (!name || !phone || !city || !district || !commune || !specificAddress) {
      throw new Error("Please provide all required fields");
    }
    if (isDefault) {
      await Address.updateMany({ $set: { isDefault: false } });
    }
    const newAddress = new Address({
      name,
      phone,
      city,
      district,
      commune,
      specificAddress,
      isDefault: isDefault || false,
    });

    const savedAddress = await newAddress.save();

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: { address: savedAddress._id },
      }
    );
    return updatedUser;
  }
);

const updateAddress = asyncHandler(async (userId, addressId, addressData) => {
  validateMongodbId(userId);
  validateMongodbId(addressId);

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.address.includes(addressId)) {
    throw new Error("Address not found in user");
  }

  if (addressData.isDefault) {
    await Address.updateMany(
      { _id: { $ne: addressId }, _id: { $in: user.address }, isDefault: true },
      { $set: { isDefault: false } }
    );
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    addressData,
    {
      new: true,
    }
  );
  return updatedAddress;
});

const removeAddress = asyncHandler(async (userId, addressId) => {
  validateMongodbId(userId);
  validateMongodbId(addressId);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.address.includes(addressId)) {
    throw new Error("Address not found in user");
  }

  const updatedUser = await User.updateOne(
    {
      _id: userId,
    },
    {
      $pull: { address: addressId },
    }
  );

  await Address.deleteOne({ _id: addressId });

  return updatedUser;
});

module.exports = {
  getAllUsers,
  getUserById,
  updateAUser,
  blockAUser,
  unBlockAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
  getWishlist,
  createAddress,
  removeAddress,
  updateAddress,
  getAddress,
};
