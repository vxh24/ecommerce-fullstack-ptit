const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");

const createUser = asyncHandler(async (userData) => {
  const email = userData.email;

  const isCheckExistUser = await User.findOne({ email });

  if (!isCheckExistUser) {
    const newUser = await User.create(userData);
    return newUser;
  } else {
    throw new Error("User Already Exists");
  }
});

const handleLogin = asyncHandler(async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user && user.deleted === false) {
    //compare password
    const isMatchPassword = await user.isPasswordMatched(password);
    if (isMatchPassword) {
      //login/create an access token
      const payload = {
        _id: user?._id,
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

const handleAdminLogin = asyncHandler(async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user.role !== "admin") throw new Error("Not Authorized!!!");
  if (user) {
    //compare password
    const isMatchPassword = await user.isPasswordMatched(password);
    if (isMatchPassword) {
      //login/create an access token
      const payload = {
        _id: user?._id,
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

module.exports = {
  createUser,
  handleLogin,
  handleAdminLogin,
};
