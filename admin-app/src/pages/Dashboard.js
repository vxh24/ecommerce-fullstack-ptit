import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getRevenue } from "../features/auth/authSlice";

const columns = [
  {
    title: "Mã Đơn hàng",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Ngày đặt",
    dataIndex: "date",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const data1 = [];
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const formattedPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getRevenue());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.data);
  const totalRevenue = useSelector((state) => state?.auth?.totalRevenue?.data);
  if (orderState && orderState.length) {
    for (let i = orderState.length - 1; i >= 0; i--) {
      data1.push({
        key: orderState[i]._id,
        name: orderState[i].orderBy?.name,
        status: orderState[i].orderStatus,
        date: new Date(orderState[i].createdAt).toLocaleString(),
      });
    }
  }
  // console.log(totalRevenue);

  const pendingOrdersCount = orderState
    ? orderState.filter((order) => order.orderStatus === "Chờ xác nhận").length
    : 0;

  return (
    <div>
      <h3
        className="mb-4 title"
        style={{ fontSize: "30px", fontWeight: "bold" }}
      >
        Dashboard
      </h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng lượt đặt hàng</p>
            <h4
              className="mb-0 sub-title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {orderState?.length}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Số đơn chờ xử lý</p>
            <h4
              className="mb-0 sub-title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {pendingOrdersCount}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Tổng doanh thu</p>
            <h4
              className="mb-0 sub-title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              {formattedPrice(totalRevenue)}
            </h4>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3
          className="mb-5 title"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Thống kê thu nhập
        </h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3
          className="mb-5 title"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Đơn hàng gần đây
        </h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
