const asyncHandler = require("express-async-handler");
const {
  createColor,
  updateColor,
  deleteColor,
  getAColor,
  getAllColors,
} = require("../services/colorService");

const createColorController = asyncHandler(async (req, res) => {
  try {
    const result = await createColor(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateColorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateColor(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteColor(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAColorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAColor(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllColorsController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllColors();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColorController,
  updateColorController,
  deleteColorController,
  getAColorController,
  getAllColorsController,
};
