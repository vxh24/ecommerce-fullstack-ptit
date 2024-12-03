import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";
import moment from "moment";
const PaymentResult = () => {
  const location = useLocation();

  const [paymentDetails, setPaymentDetails] = useState({
    partnerCode: "",
    orderId: "",
    amount: 0,
    orderInfo: "",
    transId: "",
    resultCode: "",
    message: "",
    responseTime: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setPaymentDetails({
      partnerCode: params.get("partnerCode"),
      orderId: params.get("orderId"),
      amount: params.get("amount"),
      orderInfo: params.get("orderInfo"),
      transId: params.get("transId"),
      resultCode: params.get("resultCode"),
      message: params.get("message"),
      responseTime: params.get("responseTime"),
    });
  }, [location.search]);

  const formatDate = (timestamp) => {
    return moment(parseInt(timestamp)).format("DD-MM-YYYY");
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <>
      <Meta title={"Payment Result"} />
      <BreadCrumb title="Payment Result" />
      <div className="main-payment-result">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="payment-result text-center">
                <h1>Kết quả thanh toán</h1>
                <IoIosCheckmarkCircle className=" payment-icon" />
                <p>{paymentDetails.message}</p>
                <div className="d-flex justify-content-center">
                  <table className="payment-table">
                    <tbody>
                      <tr>
                        <td>
                          <strong> Mã giao dịch của bạn là</strong>
                        </td>
                        <td>{paymentDetails.transId}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Số tiền thanh toán</strong>
                        </td>
                        <td>{formatAmount(paymentDetails.amount)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Ngân hàng</strong>
                        </td>
                        <td>{paymentDetails.partnerCode}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Ngày giao dịch</strong>
                        </td>
                        <td>{formatDate(paymentDetails.responseTime)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
