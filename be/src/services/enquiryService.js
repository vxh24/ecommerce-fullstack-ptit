const Enquiry = require("../models/enquiryModel");
const asyncHandler = require("express-async-handler");
const sendEmail = require("./emailService");
const validateMongodbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async (enquiryData) => {
  const newEnquiry = await Enquiry.create(enquiryData);
  const adminEmail = process.env.MAIL_NAME;
  const mailData = {
    to: adminEmail,
    subject: "[THÔNG BÁO] Bạn vừa nhận được một yêu cầu tư vấn mới",
    text: `Xin chào Quản trị viên,
  Bạn vừa nhận được một yêu cầu tư vấn mới từ khách hàng. Dưới đây là thông tin chi tiết:

  - Họ và tên: ${newEnquiry.name}
  - Email: ${newEnquiry.email}
  - Số điện thoại: ${newEnquiry.phone}
  - Nội dung: ${newEnquiry.comment}
  
  Vui lòng kiểm tra và phản hồi lại khách hàng sớm nhất.
  
  Trân trọng,
  Hệ thống quản lý`,
    html: `
    <h2 style="color: #2c3e50;">Xin chào Quản trị viên,</h2>
    <p>Bạn vừa nhận được một yêu cầu tư vấn mới từ khách hàng. Dưới đây là thông tin chi tiết:</p>
    <table style="border-collapse: collapse; width: 100%;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Họ và tên:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${newEnquiry.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${newEnquiry.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Số điện thoại:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${newEnquiry.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nội dung:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${newEnquiry.comment}</td>
      </tr>
    </table>
    <p style="margin-top: 20px;">Vui lòng kiểm tra và phản hồi lại khách hàng sớm nhất.</p>
    <p>Trân trọng,<br>Hệ thống quản lý</p>
    `,
  };

  await sendEmail(mailData);
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
