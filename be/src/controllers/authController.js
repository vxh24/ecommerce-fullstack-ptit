require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(process.env.GG_CLIENT_ID);
const {
  createUser,
  handleLogin,
  handleAdminLogin,
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

const googleLogin = async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GG_CLIENT_ID,
  });

  const { name, email, sub } = ticket.getPayload();
  const password = token;
  const phone = "";
  let user = await User.findOne({ email });
  if (!user) {
    let userData = {
      name,
      email,
      password,
      phone,
    };

    const result = await createUser(userData);
    const access_token = generateToken(userData);
    res.status(200).json({
      access_token,
      data: result,
    });
  }
};

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

  if (!cookie?.refresh_token) throw new Error("No refresh token in Cookies");
  const refresh_token = cookie.refresh_token;
  const user = await User.findOne({ refresh_token });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refresh_token, process.env.JWT_SECRET, (error, decoded) => {
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

module.exports = {
  createUserController,
  loginUserController,
  handleRefreshToken,
  logoutController,
  loginAdminController,
  googleLogin,
};
