require("dotenv").config();
const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const {
  getAllUsers,
  getUserById,
  updateAUser,
  blockAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
  getWishlist,
  createAddress,
  removeAddress,
  updateAddress,
  getAddress,
  unBlockAUser,
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
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must contain exactly 10 digits",
      }),
  });

  const { name, phone } = req.body;
  const { _id } = req.user;
  const file = req.files?.image;

  const { error } = schema.validate({ name, phone });

  if (error) {
    return res.status(400).json({
      EC: 1,
      message: error.details[0].message,
    });
  }

  if (!file || file.length === 0) {
    throw new Error("No images uploaded");
  }

  const updatedUser = await updateAUser(_id, { name, phone }, file);
  res.status(200).json({
    EC: 0,
    message: "Update user successfull",
    data: updatedUser,
  });
});

const blockAUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await blockAUser(id);
  res.status(200).json({
    EC: 0,
    message: "Block user successfull!!!",
    data: result,
  });
});

const unBlockAUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await unBlockAUser(id);
  res.status(200).json({
    EC: 0,
    message: "Unblock user successfull!!!",
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

const getProfileUserController = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const result = await getUserById(_id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAddressController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await getAddress(_id);
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
  const { name, phone, city, district, commune, specificAddress, isDefault } =
    req.body;

  try {
    const result = await createAddress(
      _id,
      name,
      phone,
      city,
      district,
      commune,
      specificAddress,
      isDefault
    );
    res.status(200).json({
      EC: 0,
      message: "Create address successfull!!!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateAddressController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const addressId = req.params.id;
  const addressData = req.body;

  try {
    const result = await updateAddress(_id, addressId, addressData);
    res.status(200).json({
      EC: 0,
      message: "Update address successfull!!!",
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const removeAddressController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const addressId = req.params.id;

  try {
    const result = await removeAddress(_id, addressId);
    res.status(200).json({
      EC: 0,
      message: "Remove address successfull!!!",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllUsersController,
  getUserByIdController,
  updateAUserController,
  blockAUserController,
  unBlockAUserController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  getWishlistController,
  saveAddressController,
  getProfileUserController,
  removeAddressController,
  updateAddressController,
  getAddressController,
};
