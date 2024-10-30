const asyncHandler = require("express-async-handler");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getABrand,
  getAllBrands,
} = require("../services/brandService");

const createBrandController = asyncHandler(async (req, res) => {
  try {
    const result = await createBrand(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrandController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateBrand(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrandController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteBrand(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getABrandController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getABrand(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrandsController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllBrands();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrandController,
  updateBrandController,
  deleteBrandController,
  getABrandController,
  getAllBrandsController,
};
