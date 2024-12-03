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
} = require("../services/authService");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

const createUserController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  } else {
    let userData = {
      name,
      email,
      password,
    };

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
  // const phone = "";
  let user = await User.findOne({ email });
  if (!user) {
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      // phone: phone,
    });
    newUser.save();
    const result1 = await handleLogin(email, token);

    if (result1.EC === 0) {
      res.cookie("refresh_token", result1.refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 3day
      });

      res.status(200).json({
        access_token: result1.access_token,
        user: result1.user,
      });
    }
  } else {
    const result1 = await handleLogin(email, token);

    if (result1.EC === 0) {
      res.cookie("refresh_token", result1.refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 3day
      });

      res.status(200).json({
        access_token: result1.access_token,
        user: result1.user,
      });
    }
  }
};

const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await handleLogin(email, password);

  if (result.EC === 0) {
    res.cookie("refresh_token", result.refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 3day
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
      maxAge: 24 * 60 * 60 * 1000, // 3day
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
