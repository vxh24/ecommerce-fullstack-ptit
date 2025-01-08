import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { momoOrderUser } from "../features/cart/CartSlice";

const PaymentResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const returnCounter = async () => {
    navigate("/counter", { state: { message: "false" } });
  };
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
  }, []);

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
      localStorage.setItem("orderId", result.payload.data._id);
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
      <div className="main-payment-result" style={{ height: "100vh" }}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 mb-3">
              <div
                className="payment-result text-center"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100vh",
                }}
              >
                <h1 style={{ fontSize: "40px" }}>Kết quả thanh toán</h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IoIosCheckmarkCircle className="payment-icon" />
                  <p style={{ fontSize: "30px" }}>{paymentDetails.message}</p>
                </div>
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
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end mt-3"></div>
                <button
                  onClick={returnCounter}
                  className="payment-button"
                  type="submit"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
