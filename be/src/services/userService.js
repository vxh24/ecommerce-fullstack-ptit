const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongodbId");
const sendEmail = require("../controllers/emailController");
const crypto = require("crypto");

const createUser = asyncHandler(async (userData) => {
  const email = userData.email;

  const isCheckExistUser = await User.findOne({ email: email });

  if (!isCheckExistUser) {
    const newUser = await User.create(userData);
    return newUser;
  } else {
    throw new Error("User Already Exists");
  }
});

const handleLogin = asyncHandler(async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user) {
    //compare password
    const isMatchPassword = await user.isPasswordMatched(password);
    if (isMatchPassword) {
      //login/create an access token
      const payload = {
        email: user?.email,
        name: user?.name,
      };
      const refresh_token = await generateRefreshToken(payload);
      const updateUser = await User.updateOne(
        { _id: user.id },
        { refresh_token: refresh_token }
      );
      const access_token = generateToken(payload);
      return {
        EC: 0,
        access_token,
        refresh_token,
        user: {
          email: user.email,
          name: user.name,
        },
      };
    }
    return { EC: 1, message: "Password is incorrect" };
  }
  return { EC: 2, message: "User not found" };
});

const getAllUsers = asyncHandler(async () => {
  const result = await User.find({}).select("-password");
  return result;
});

const getUserById = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await User.findById(id).select("-password");
  return result;
});

const updateAUser = asyncHandler(async (id, userData) => {
  validateMongodbId(id);
  const result = await User.updateOne(
    { _id: id },
    {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    }
  );
  return result;
});

const deleteAUser = asyncHandler(async (id) => {
  validateMongodbId(id);
  const result = await User.deleteById(id);
  return result;
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

  const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="http://localhost:5000/v1/api/users/reset-password/${token}">Click here</a>`;

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

module.exports = {
  createUser,
  handleLogin,
  getAllUsers,
  getUserById,
  updateAUser,
  deleteAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
};
