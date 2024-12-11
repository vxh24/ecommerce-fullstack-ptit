const asyncHandler = require("express-async-handler");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiries,
} = require("../services/enquiryService");

const createEnquiryController = asyncHandler(async (req, res) => {
  try {
    const result = await createEnquiry(req.body);
    res.status(200).json({
      EC: 0,
      data: result,
      message: "Enquiry created and email sent to admin",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateEnquiryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateEnquiry(id, req.body);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteEnquiryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteEnquiry(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAEnquiryController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAEnquiry(id);
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllEnquiriesController = asyncHandler(async (req, res) => {
  try {
    const result = await getAllEnquiries();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createEnquiryController,
  updateEnquiryController,
  deleteEnquiryController,
  getAEnquiryController,
  getAllEnquiriesController,
};
