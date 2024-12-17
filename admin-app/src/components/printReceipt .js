import React from 'react'

const printReceipt = () => {
  const newWindow = window.open("", "_blank", "width=600,height=800");
  newWindow.document.write(`
    <html>
      <head>
        <title>Hóa Đơn</title>
      </head>
      <body>
        <h2 style="text-align:center;">Hóa Đơn Thanh Toán</h2>
        <p><strong>Mã đơn hàng:</strong> ${receiptData.orderId}</p>
        <p><strong>Ngày:</strong> ${receiptData.date}</p>
        <hr />
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <th style="border:1px solid black; padding:5px;">Tên sản phẩm</th>
            <th style="border:1px solid black; padding:5px;">Số lượng</th>
            <th style="border:1px solid black; padding:5px;">Giá</th>
          </tr>
          ${receiptData.items
      .map(
        (item) => `
            <tr>
              <td style="border:1px solid black; padding:5px;">${item.name}</td>
              <td style="border:1px solid black; padding:5px;">${item.quantity}</td>
              <td style="border:1px solid black; padding:5px;">${item.price}</td>
            </tr>
          `
      )
      .join("")}
        </table>
        <hr />
        <p><strong>Tổng cộng:</strong> ${receiptData.total}</p>
      </body>
    </html>
  `);
  newWindow.document.close();
  newWindow.print();
  return (
    <></>
  )
}

export default printReceipt 