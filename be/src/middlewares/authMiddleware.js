require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const white_lists = ["/", "/register", "/login", "/refresh", "/logout"];
  if (white_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      //verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
          createdBy: "andy",
        };
        // console.log(">>> check token: ", decoded);
        next();
      } catch (error) {
        return res.status(401).json({
          EC: 1,
          message: "Not Authorized token expired. Please login again!",
        });
      }
    } else {
      return res.status(401).json({
        EC: 1,
        message:
          "You did not pass an access token in the header or The token has expired",
      });
    }
  }
});

module.exports = authMiddleware;
