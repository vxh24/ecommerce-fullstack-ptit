const asyncHandler = require("express-async-handler");
const { io, getReceiverSocketId } = require("../socket/socket");
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
    const adminSocketId = getReceiverSocketId("6749f2c34151afc711fc4a8c");
    if (adminSocketId) {
      const currentTime = new Date();
      const formattedTime = `${currentTime
        .getDate()
        .toString()
        .padStart(2, "0")}/${(currentTime.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${currentTime.getFullYear()}`;
      io.emit("new-order-notification", {
        title: "Khảo sát mới của khách hàng đã được tạo",
        message: `Người dùng với tên là ${result.name} đã gửi phản hồi.`,
        userId: result.name,
        timestamp: formattedTime,
      });
    }
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
