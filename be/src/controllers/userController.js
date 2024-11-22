require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { uploadSingleFile } = require("../services/fileService");
const {
  getAllUsers,
  getUserById,
  updateAUser,
  deleteAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
  getWishlist,
  saveAddress,
} = require("../services/userService");

const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    EC: 0,
    data: users,
  });
});

const getUserByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await getUserById(id);
  res.status(200).json({
    EC: 0,
    data: user,
  });
});

const updateAUserController = asyncHandler(async (req, res) => {
  let { name, phone } = req.body;
  const id = req.params.id;

  let imageUrl = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({
      msg: "No files were uploaded. Try uploading an image",
    });
    return;
  } else {
    let result = await uploadSingleFile(req.files.avatar);
    imageUrl = result.path;
  }

  let userData = {
    name,
    phone,
    avatar: imageUrl,
  };

  const result = await updateAUser(id, userData);
  res.status(200).json({
    EC: 0,
    data: result,
  });
});

const deleteAUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await deleteAUser(id);
  res.status(200).json({
    EC: 0,
    data: result,
  });
});

const updatePasswordController = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const { password } = req.body;

  try {
    const updatedUser = await updatePassword(email, password);
    res.status(200).json({
      message: "Password updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordTokenController = asyncHandler(async (req, res) => {
  const { email } = req.user;
  try {
    const token = await generateResetPasswordToken(email);
    res.json({ reset_token: token });
  } catch (error) {
    throw new Error(error);
  }
});

const resetPasswordController = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  try {
    const user = await resetPassword(token, password);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlistController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await getWishlist(_id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const saveAddressController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const address = req.body.address;
  try {
    const result = await saveAddress(_id, address);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllUsersController,
  getUserByIdController,
  updateAUserController,
  deleteAUserController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  getWishlistController,
  saveAddressController,
};
