import React, { useEffect, useState } from "react";
import moment from "moment";
import ProductReview from "../components/ProductReview";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllColors } from "../features/color/colorSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
const OrderDetailCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colorState = useSelector((state) => state?.color?.colors?.data);
  useEffect(() => {
    dispatch(getAllColors());
  }, []);
  const handleOpenReviewProduct = (product) => {
    setSelectedOrder(product);
    setOpen(true);
  };

  const handleCloseReviewProduct = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <div>
      <h4 className="mb-4">Chi tiết đơn hàng</h4>
      <p>
        <strong>Địa chỉ: </strong> {order.orderAddress}
      </p>
      <p>
        <strong>Mã đơn hàng:</strong> {order._id}
      </p>
      <p>
        <strong>Tổng tiền:</strong> {formatPrice(order.paymentIndent.amount)}
      </p>
      <p>
        <strong>Ngày đặt hàng:</strong>{" "}
        {moment(order.created_at).format("DD-MM-YYYY")}
      </p>
      <p>
        <strong>Trạng thái:</strong> {order.orderStatus}
      </p>
      <div className="col-12">
        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
          <h4 className="cart-col-1">Sản phẩm</h4>
          <h4 className="cart-col-2">Giá</h4>
          <h4 className="cart-col-3">Số lượng</h4>
          <h4 className="cart-col-4">Tổng</h4>

          {order.orderStatus === "Hoàn thành" && (
            <h4 className="cart-col-5"></h4>
          )}
        </div>
        {order?.products &&
          order?.products?.map((item, index) => {
            return (
              <div
                key={index}
                className="cart-data py-3 d-flex justify-content-between align-items-center"
              >
                <div className="cart-col-1 gap-15 d-flex justify-content-between align-items-center">
                  <div className="w-25">
                    <img
                      src={item?.product?.images[0]?.url}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="w-75 d-flex flex-column gap-10">
                    <p className="mb-0">{item?.product?.name}</p>
                    <p className="d-flex gap-15">
                      Màu:
                      <div className="colors ps-0">{item?.color}</div>
                    </p>
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">{formatPrice(item?.product?.price)}</h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-15">
                  <div className="">
                    <h5 className="">{item?.count}</h5>
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">
                    {formatPrice(item?.product?.price * item?.count)}
                  </h5>
                </div>
                {order.orderStatus === "Hoàn thành" && (
                  <div cart-col-5>
                    <button
                      className="button-filter form-control w-100"
                      onClick={() => handleOpenReviewProduct(item.product)}
                    >
                      Đánh giá
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        {open && selectedOrder && (
          <div className="model-container">
            <div className="model-content">
              <button
                className="close-model"
                onClick={handleCloseReviewProduct}
              >
                ✖
              </button>
              <ProductReview product={selectedOrder} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailCard;
