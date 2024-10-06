const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongodbId");

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
  } else {
    throw new Error("Invalid Credentials");
  }
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

module.exports = {
  createUser,
  handleLogin,
  getAllUsers,
  getUserById,
  updateAUser,
  deleteAUser,
};
