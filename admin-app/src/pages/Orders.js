import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  getOrderById,
  getOrders,
  updateOrderStatusSlice,
} from "../features/auth/authSlice";
import { FaEye } from "react-icons/fa";
import "react-bootstrap-typeahead/css/Typeahead.css";
import moment from "moment";
import { toast } from "react-toastify";
const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "key",
  },
  {
    title: "Tên người mua",
    dataIndex: "name",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },

  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.data);
  useEffect(() => {
    if (searchTerm) {
      const results = orderState?.filter((order) =>
        order.orderBy?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(results || []);
    } else {
      setFilteredOrders(orderState || []);
    }
  }, [searchTerm, orderState]);
  const data = [];
  const data2 = filteredOrders?.map((order) => ({
    key: order._id,
    name: order.orderBy?.name,
    status: order.orderStatus,
    amount: order.paymentIndent.amount,
    date: moment(order.createdAt).format("DD-MM-YYYY"),
    action: (
      <>
        <div className="d-flex align-items-center">
          <button
            className="ms-3 fs-3 text-info"
            onClick={() => {
              setOpen(true);
              setOrder(order);
            }}
          >
            <FaEye />
          </button>
        </div>
      </>
    ),
  }));
  if (orderState && orderState.length) {
    for (let i = 0; i < orderState.length; i++) {
      data.push({
        key: orderState[i]._id,
        name: orderState[i].orderBy?.name,
        status: orderState[i].orderStatus,
        date: moment(orderState[i].createdAt).format("DD-MM-YYYY"),
        action: (
          <>
            <div className="d-flex align-items-center">
              <button
                className="ms-3 fs-3 text-info"
                onClick={() => {
                  setOpen(true);
                  setOrder(orderState[i]);
                }}
              >
                <FaEye />
              </button>
            </div>
          </>
        ),
      });
    }
  }

  return (
    <>
      <div>
        <h3
          className="mb-4 title"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Danh sách đơn hàng
        </h3>
        {/* Search Input */}
        <Typeahead
          id="search-orders"
          onChange={(selected) => {
            if (selected.length > 0) {
              setSearchTerm(selected[0]);
            } else {
              setSearchTerm("");
            }
          }}
          options={orderState?.map((order) => order.orderBy?.name) || []}
          placeholder="Tìm kiếm theo tên người mua..."
          selected={searchResults}
          onInputChange={(text) => setSearchTerm(text)}
        />
        <div>{<Table columns={columns} dataSource={data2} />}</div>
      </div>
      {open && (
        <div className="modal-order">
          <div className="modal-content-order">
            <button
              className="close-model-order"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
            <ViewOrder orderState={order} />
          </div>
        </div>
      )}
    </>
  );
};
const columns1 = [
  {
    title: "Mã sản phẩm",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
];

const formattedPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const ViewOrder = (orderState) => {
  const order = orderState.orderState;
  const dispatch = useDispatch();
  const orderStatus1 = useSelector((state) => state?.auth?.orderbyuser?.data);
  const data1 = [];
  useEffect(() => {
    dispatch(getOrderById(order._id));
  }, []);
  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (newStatus === "Đã hủy" && selectedStatus !== "Chờ xác nhận") {
      toast.error("Chỉ có thể hủy đơn hàng ở trạng thái 'Chờ xác nhận'");
      return;
    }
    if (statusPriority[newStatus] < statusPriority[selectedStatus]) {
      toast.error(
        "Không thể chuyển trạng thái đơn hàng về mức thấp hơn trạng thái hiện tại."
      );
      return;
    }
    setSelectedStatus(newStatus);
    dispatch(updateOrderStatusSlice({ id: order._id, status: newStatus }));
    toast.success("Thay đổi thành công")
    setTimeout(() => {
      dispatch(getOrders());
      dispatch(getOrderById(order._id));
    }, 300);
  };
  if (order?.products && order?.products.length) {
    for (let i = 0; i < order.products.length; i++) {
      data1.push({
        key: order.products[i]?.product?._id,
        name: order.products[i].product.name,
        count: order.products[i].count,
        color: order.products[i].color,
        price: formattedPrice(
          order.products[i].product.price * order.products[i].count
        ),
      });
    }
  }
  const statusPriority = {
    "Chờ xác nhận": 1,
    "Chờ giao hàng": 2,
    "Hoàn thành": 3,
    "Đã hủy": 4,
  };

  return (
    <div className="order-detail">
      <h4 className="mb-4 title">Chi tiết đơn hàng</h4>
      <ul>
        <li>
          <strong>Mã đơn hàng:</strong> {order.paymentIndent.orderId}
        </li>
        <li>
          <strong>Ngày tạo:</strong>
          {moment(order.created_at).format("DD-MM-YYYY")}
        </li>
        <li>
          <strong>Tổng số tiền:</strong>{" "}
          {formattedPrice(order.paymentIndent.amount)}
        </li>
        <li>
          <strong>Địa chỉ giao hàng:</strong> {order.orderAddress}
        </li>
        <li>
          <strong>Số điện thoại:</strong> {order.orderBy?.phone}
        </li>
        <div className="d-flex align-items-center gap-10">
          <li>
            <strong>Trạng thái đơn hàng:</strong> {orderStatus1?.orderStatus}
          </li>
          <select value={selectedStatus} onChange={handleStatusChange}>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Chờ giao hàng">Chờ giao hàng</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>
      </ul>
      <div>{<Table columns={columns1} dataSource={data1} />}</div>
    </div>
  );
};
export default Orders;
