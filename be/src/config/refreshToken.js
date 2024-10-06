require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = { generateRefreshToken };
