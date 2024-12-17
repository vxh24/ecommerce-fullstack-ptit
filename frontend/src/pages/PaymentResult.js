import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { momoOrderUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

const PaymentResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const details = {
      partnerCode: params.get("partnerCode"),
      orderId: params.get("orderId"),
      amount: params.get("amount"),
      orderInfo: params.get("orderInfo"),
      transId: params.get("transId"),
      resultCode: params.get("resultCode"),
      message: params.get("message"),
      responseTime: params.get("responseTime"),
      extraData: params.get("extraData"),
    };

    setPaymentDetails(details);
    setLoading(false);

    if (details.resultCode === "0") {
      handlePaymentCallback(details);
    }
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

  const handlePaymentCallback = async (details) => {
    const paymentData = {
      orderId: details.orderId,
      amount: details.amount,
      resultCode: details.resultCode,
      message: details.message,
      transId: details.transId,
      partnerCode: details.partnerCode,
      responseTime: details.responseTime,
      extraData: details.extraData,
    };

    setLoading(true);
    setError(null);
    try {
      const result = await dispatch(momoOrderUser(paymentData));
      console.log("Payment success:", result);

      toast.success("Tạo đơn hàng thành công!!!");
    } catch (err) {
      setError("Payment failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Đang tạo đơn hàng...</div>
      </div>
    );
  }

  if (!paymentDetails) {
    return <p>Không có dữ liệu thanh toán.</p>;
  }

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
                          <strong>Mã giao dịch của bạn</strong>
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
                      {/* <tr>
                        <td>
                          <strong>Địa chỉ</strong>
                        </td>
                        <td>{paymentDetails.extraData.slice(17, paymentDetails.extraData.length - 2)}</td>
                      </tr> */}
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
