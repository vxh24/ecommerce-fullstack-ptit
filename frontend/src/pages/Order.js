import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderSlice, getOrderUser } from "../features/user/userSlice";
import moment from "moment";
import { AiOutlineEye } from "react-icons/ai";
import OrderDetailCard from "../components/OrderDetailCard";
import { useNavigate } from "react-router-dom";
const Order = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});
  const getToken = JSON.parse(localStorage.getItem("customer"));
  const navigate = useNavigate();
  useEffect(() => {
    if (getToken?.access_token === undefined) {
      navigate("/login", { state: { message: "my-orders" } });
    }
  }, [getToken]);
  useEffect(() => {
    dispatch(getOrderUser());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders?.data);
  useEffect(() => {
    if (orderState?.length > 0) {
      setStatus(orderState);
    }
  }, [orderState]);
  const handleOpenOrderDetail = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCloseOrderDetail = () => {
    setOpen(false);
    setSelectedOrder(null);
  };
  const [activeTab, setActiveTab] = useState(0);
  const status = [
    "Tất cả",
    "Chờ xác nhận",
    "Chờ giao hàng",
    "Hoàn thành",
    "Đã hủy",
  ];
  useEffect(() => {
    if (orderState?.length > 0) {
      const counts = orderState.reduce((acc, order) => {
        acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts(counts);

      setStatus(orderState);
    }
  }, [orderState]);

  const [filterstatus, setStatus] = useState([]);
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (status[index] === "Tất cả") {
      setStatus(orderState);
    } else {
      setStatus(
        orderState?.filter((order) => order.orderStatus === status[index])
      );
    }
  };
  const handleCancel = (id) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này không?"
    );

    if (isConfirmed) {
      dispatch(cancelOrderSlice(id));
      setTimeout(() => {
        dispatch(getOrderUser());
      }, 500);
    }
  };
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const statusColors = {
    "Chờ xác nhận": "orange",
    "Chờ giao hàng": "blue",
    "Hoàn thành": "green",
    "Đã hủy": "red",
    "Tất cả": "grey",
  };

  const getStatusColor = (status) => {
    return statusColors[status] || "grey";
  };

  return (
    <>
      <Meta title={"Đơn hàng"} />
      <BreadCrumb title="Đơn hàng" />
      <div className="order-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div
                style={{ "margin-left": "0" }}
                className="tabs d-flex justify-content-center "
              >
                {status.map((item, index) => (
                  <div key={index} className="tab-container">
                    <button
                      className={activeTab === index ? "tab active" : "tab"}
                      onClick={() => handleTabChange(index)}
                    >
                      {item}
                      <span
                        className={
                          statusCounts[item] && item !== "Đã hủy"
                            ? "statusCount"
                            : ""
                        }
                      >
                        {item === "Đã hủy" ? "" : statusCounts[item]}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 mt-3">
              <div className="order-list">
                <table className="table caption-top">
                  <thead>
                    <tr>
                      <th scope="col" className="col-3">
                        Mã đơn hàng
                      </th>
                      <th scope="col" className="col-2">
                        Tổng tiền
                      </th>
                      <th scope="col" className="col-3">
                        Ngày đặt hàng{" "}
                      </th>
                      <th scope="col" className="col-2">
                        Trạng thái
                      </th>
                      <th scope="col" className="col-2"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterstatus?.length > 0 ? (
                      filterstatus
                        .slice()
                        .reverse()
                        .map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{item?._id}</th>
                            <td className="price">
                              {formatPrice(item?.paymentIndent?.amount)}
                            </td>
                            <td>
                              {moment(item?.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {" "}
                              <span
                                style={{
                                  color: getStatusColor(item?.orderStatus),
                                  fontWeight: "bold",
                                }}
                              >
                                {item?.orderStatus}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-10 align-items-center">
                                <AiOutlineEye
                                  size={22}
                                  className="cursor-pointer ms-2"
                                  onClick={() => handleOpenOrderDetail(item)}
                                  title="Quick view"
                                />
                                {item?.orderStatus === "Chờ xác nhận" && (
                                  <button
                                    onClick={() => handleCancel(item?._id)}
                                    className="btn btn-primary btn-sm"
                                  >
                                    Hủy đơn
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Không có đơn hàng nào phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && selectedOrder && (
        <div className="model-container">
          <div className="model-content">
            <button className="close-model" onClick={handleCloseOrderDetail}>
              ✖
            </button>
            <OrderDetailCard order={selectedOrder} />
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
