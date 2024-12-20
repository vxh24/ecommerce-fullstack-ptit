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
const Dashboard = () => {
  const data = [
    { type: "Tháng 1", sales: 38, revenue: 50 },
    { type: "Tháng 2", sales: 52, revenue: 60 },
    { type: "Tháng 3", sales: 61, revenue: 70 },
    { type: "Tháng 4", sales: 145, revenue: 160 },
    { type: "Tháng 5", sales: 48, revenue: 55 },
    { type: "Tháng 6", sales: 38, revenue: 40 },
    { type: "Tháng 7", sales: 38, revenue: 45 },
    { type: "Tháng 8", sales: 38, revenue: 42 },
    { type: "Tháng 9", sales: 38, revenue: 50 },
    { type: "Tháng 10", sales: 38, revenue: 53 },
    { type: "Tháng 11", sales: 38, revenue: 55 },
    { type: "Tháng 12", sales: 38, revenue: 60 },
  ];

  const transformedData = data.flatMap((item) => [
    { type: item.type, value: item.sales, category: "Đã bán" },
    { type: item.type, value: item.revenue, category: "Doanh số" },
  ]);

  const config = {
    data: transformedData,
    isGroup: true,
    xField: "type",
    yField: "value",
    seriesField: "category",
    color: ({ category }) => (category === "Đã bán" ? "#1677ff" : "#ffc107"),
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
        alias: "Amount",
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

  const orderState = useSelector((state) => state?.auth?.orders?.data);
  const totalRevenue =
    useSelector((state) => state?.auth?.totalRevenue?.data) || 0;

  const data1 = [];

  if (orderState && orderState.length) {
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: orderState[i]._id,
        name: orderState[i].orderBy?.name,
        status: orderState[i].orderStatus,
        date: new Date(orderState[i].createdAt).toLocaleString(),
      });
    }
  }

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
