require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { uploadSingleFile } = require("../services/fileService");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {
  createUser,
  handleLogin,
  getAllUsers,
  getUserById,
  updateAUser,
  deleteAUser,
  updatePassword,
  generateResetPasswordToken,
  resetPassword,
  handleAdminLogin,
  getWishlist,
  saveAddress,
  addToCart,
  getCartUser,
  emptyCart,
  applyCoupon,
  createOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../services/userService");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

const createUserController = asyncHandler(async (req, res) => {
  let { name, email, phone, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().allow("").pattern(new RegExp("^[0-9]{8,11}$")),
    password: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  } else {
    let userData = {
      name,
      email,
      phone,
      password,
    };

    // console.log(userData);

    const result = await createUser(userData);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  }
});

const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await handleLogin(email, password);

  if (result.EC === 0) {
    res.cookie("refresh_token", result.refresh_token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // 3day
    });

    res.status(200).json({
      access_token: result.access_token,
      user: result.user,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const loginAdminController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await handleAdminLogin(email, password);

  if (result.EC === 0) {
    res.cookie("refresh_token", result.refresh_token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // 3day
    });

    res.status(200).json({
      access_token: result.access_token,
      user: result.user,
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(">>>cookie: ", cookie);

  if (!cookie?.refresh_token) throw new Error("No refresh token in Cookies");
  const refresh_token = cookie.refresh_token;
  // console.log(">>>> refresh_token: ", refresh_token);
  const user = await User.findOne({ refresh_token });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refresh_token, process.env.JWT_SECRET, (error, decoded) => {
    // console.log(">>>> decoded", decoded);
    if (error || user.email !== decoded.email) {
      throw new Error("There is something wrong with refresh token");
    }
    const payload = {
      email: user?.email,
      name: user?.name,
    };
    const access_token = generateToken(payload);
    res.json({ access_token });
  });
});

const logoutController = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refresh_token) throw new Error("No refresh token in Cookies");
  const refresh_token = cookie.refresh_token;
  const user = await User.findOne({ refresh_token });
  if (!user) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
    });
    return res.status(204); //forbidden, no content
  }
  await User.updateOne(
    { _id: user._id },
    {
      refresh_token: "",
    }
  );
  // remove cookie after remove refresh_token
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true, //https
  });
  return res.status(200).json({
    message: "Logout successful!!!",
  }); //no content
});

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

const addToCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cart } = req.body;

  try {
    const result = await addToCart(_id, cart);

    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await getCartUser(_id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const removeCartController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await emptyCart(_id);

    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const handleCouponController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  try {
    const result = await applyCoupon(_id, coupon);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createOrderController = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  try {
    if (!COD) throw new Error("Create cash order failed");
    const result = await createOrder(_id, COD, couponApplied);
    res.json({
      EC: 0,
      message: "success",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrdersController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllOrders();
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await updateOrderStatus(id, status);
    res.json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateAUserController,
  deleteAUserController,
  handleRefreshToken,
  logoutController,
  updatePasswordController,
  forgotPasswordTokenController,
  resetPasswordController,
  loginAdminController,
  getWishlistController,
  saveAddressController,
  addToCartController,
  getUserCartController,
  removeCartController,
  handleCouponController,
  createOrderController,
  getAllOrdersController,
  updateOrderStatusController,
};
