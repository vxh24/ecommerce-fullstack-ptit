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
import { getColors } from "../features/color/colorSlice";
import "react-bootstrap-typeahead/css/Typeahead.css";
import moment from "moment";
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
    date: new Date(order.createdAt).toLocaleString(),
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
        date: new Date(orderState[i].createdAt).toLocaleString(),
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
    title: "Thương hiệu",
    dataIndex: "brand",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
    render: (color) => (
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: color?.title,
          borderRadius: "50%",
        }}
      ></div>
    ),
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
    dispatch(getColors());
    dispatch(getOrderById(order._id));
  }, []);
  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    dispatch(updateOrderStatusSlice({ id: order._id, status: newStatus }));
    setTimeout(() => {
      dispatch(getOrders());
      dispatch(getOrderById(order._id));
    }, 300);
  };
  const colorData = useSelector((state) => state.color.colors.data);
  if (order.products && order.products.length) {
    for (let i = 0; i < order.products.length; i++) {
      const color = colorData?.find(
        (productItem) => productItem?._id === order.products[i].color
      );
      data1.push({
        key: order.products[i].product._id,
        name: order.products[i].product.name,
        brand: order.products[i].product.brand,
        count: order.products[i].count,
        color: color,
        price: formattedPrice(
          order.products[i].product.price * order.products[i].count
        ),
      });
    }
  }

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
