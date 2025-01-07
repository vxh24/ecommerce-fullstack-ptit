const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const { sendEquiryEmail } = require("./emailService");
const validateMongodbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (enquiryData) => {
  const newEnquiry = await Enquiry.create(enquiryData);
  await sendEquiryEmail(newEnquiry);
  return newEnquiry;
});

const updateEnquiry = asyncHandler(async (id, enquiryData) => {
  validateMongodbId(id);
  const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, enquiryData, {
    new: true,
  });
  return updatedEnquiry;
});

const deleteEnquiry = asyncHandler(async (id) => {
  validateMongodbId(id);
  const deletedEnquiry = await Enquiry.deleteOne({ _id: id });
  return deletedEnquiry;
});

const getAEnquiry = asyncHandler(async (id) => {
  validateMongodbId(id);
  const getAEnquiry = await Enquiry.findById(id);
  return getAEnquiry;
});

const getAllEnquiries = asyncHandler(async () => {
  const result = await Enquiry.find({});
  return result;
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAEnquiry,
  getAllEnquiries,
};
