const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const isCheckExistUser = await User.findOne({ email: email });
  if (!isCheckExistUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(">>>>> email,password: ", email, password);

  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const listUsers = await User.find({});
    res.status(200).json({
      EC: 0,
      data: listUsers,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const gAUser = await User.findById(id);
    res.json(gAUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updateAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.updateOne(
      { _id: id },
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      }
    );

    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.deleteById(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteAUser,
  updateAUser,
};
