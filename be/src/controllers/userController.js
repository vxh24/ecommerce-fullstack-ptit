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
} = require("../services/userService");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const sendEmail = require("./emailController");
const crypto = require("crypto");

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
    return res.status(200).json({
      msg: error,
    });
  } else {
    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      //do nothing
    } else {
      let result = await uploadSingleFile(req.files.avatar);
      imageUrl = result.path;
    }

    let userData = {
      name,
      email,
      phone,
      password,
      avatar: imageUrl,
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
  const id = req.params.id;
  const result = await updateAUser(id, req.body);
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
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="http://localhost:5000/v1/api/users/reset-password/${token}">Click here</a>`;
    const data = {
      to: email,
      text: "Hey user",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json({
      reset_token: token,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const resetPasswordController = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired, Please try again later.");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
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
};
