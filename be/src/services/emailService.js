require("dotenv").config();
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_NAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Hey 👻" <abc@ethereal.email>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
});
const sendOrderConfirmationEmail = async (user, order, userCart, method) => {
  const mailData = {
    // to: user.email,
    to: "vuxuanhoa2403@gmail.com",
    subject: "[Thông báo] Đặt hàng thành công",
    text: `Xin chào ${user.name},
      Đơn hàng của bạn đã được đặt thành công với phương thức thanh toán ${method}. Dưới đây là thông tin chi tiết đơn hàng:
      - Mã đơn hàng: ${order.paymentIndent.orderId}
      - Ngày tạo: ${method === "COD" ? new Date(order.paymentIndent.created).toLocaleString() : order.paymentIndent.created}
      - Tổng số tiền: ${order.paymentIndent.amount} VNĐ
      - Địa chỉ giao hàng: ${order.orderAddress}
      - Trạng thái đơn hàng: ${order.orderStatus}
      Sản phẩm:
      ${userCart.products
        .map(
          (item) =>
            `* ${item.product.name} - Số lượng: ${item.count} - Giá: ${item.product.price} VNĐ`
        )
        .join("\n")}
      Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Chúng tôi sẽ liên hệ bạn sớm nhất để xác nhận đơn hàng.
      Trân trọng,
      Hệ thống quản lý`,
    html: `
      <h2 style="color: #2c3e50;">Xin chào ${user.name},</h2>
      <p>Đơn hàng của bạn đã được đặt thành công với phương thức thanh toán <strong>${method}</strong>. Dưới đây là thông tin chi tiết đơn hàng:</p>
      <ul>
        <li><strong>Mã đơn hàng:</strong> ${order.paymentIndent.orderId}</li>
        <li><strong>Ngày tạo:</strong>${method === "COD" ? new Date(order.paymentIndent.created).toLocaleString() : order.paymentIndent.created}</li>
        <li><strong>Tổng số tiền:</strong> ${order.paymentIndent.amount} VNĐ</li>
        <li><strong>Địa chỉ giao hàng:</strong> ${order.orderAddress}</li>
        <li><strong>Trạng thái đơn hàng:</strong> ${order.orderStatus}</li>
      </ul>
      <h3>Sản phẩm:</h3>
      <table style="border-collapse: collapse; width: 100%; text-align: left;">
        <thead>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd;">Sản phẩm</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Số lượng</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Giá</th>
          </tr>
        </thead>
        <tbody>
        ${userCart.products
        .map(
          (item) =>
            `<tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.product.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.count}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.price * item.count} VNĐ</td>
              </tr>`
        )
        .join("")}
        </tbody>
      </table>
      <p style="margin-top: 20px;">Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Chúng tôi sẽ liên hệ bạn sớm nhất để xác nhận đơn hàng.</p>
      <p>Trân trọng,<br>Hệ thống quản lý</p>
    `,
  };

  await sendEmail(mailData);
};

module.exports = {
  sendEmail,
  sendOrderConfirmationEmail
};
