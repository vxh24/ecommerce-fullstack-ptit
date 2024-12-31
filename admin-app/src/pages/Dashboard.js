import React, { useEffect } from "react";
import { Column } from "@ant-design/plots";
import { Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  getRevenue,
  getStatistic,
} from "../features/auth/authSlice";

const { Option } = Select;
const years = [2020, 2021, 2022, 2023, 2024];

const statusColors = {
  "Chờ xác nhận": "orange",
  "Chờ giao hàng": "blue",
  "Hoàn thành": "green",
  "Đã hủy": "red",
};

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
    render: (status) => (
      <span style={{ color: statusColors[status], fontWeight: "bold" }}>
        {status}
      </span>
    ),
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  );

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getRevenue());
    dispatch(getStatistic(Number(selectedYear)));
  }, [selectedYear]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const orderState = useSelector((state) => state?.auth?.orders?.data);
  const totalRevenue =
    useSelector((state) => state?.auth?.totalRevenue?.data) || 0;

  const pendingOrdersCount = orderState
    ? orderState.filter((order) => order.orderStatus === "Chờ xác nhận").length
    : 0;

  const statisticData =
    useSelector((state) => state?.auth?.statistic?.data) || [];

  const formattedPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const allMonths = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    sales: 0,
    revenue: 0,
  }));

  const mergedData = allMonths.map((month) => {
    const existingMonth = statisticData?.find(
      (data) => data.month === month.month
    );
    return existingMonth || month;
  });

  const transformedData = mergedData.flatMap((item) => [
    { type: `Tháng ${item.month}`, value: item.sales, category: "Đã bán" },
    {
      type: `Tháng ${item.month}`,
      value: item.revenue / 1000000,
      category: `Doanh số (x${formattedPrice(1000000)})`,
    },
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
    yAxis: {
      sales: {
        alias: "Số lượng đã bán",
        min: 0,
      },
      revenue: {
        alias: "Doanh thu (VND)",
        min: 0,
      },
    },
    meta: {
      type: {
        alias: "Tháng",
      },
      sales: {
        alias: "Số lượng",
      },
      revenue: {
        alias: "Doanh thu",
      },
    },
  };

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3
            className="mb-5 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Thống kê thu nhập
          </h3>
          <Select
            defaultValue={selectedYear}
            style={{ width: 120 }}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          {transformedData.length === 0 ? (
            <p>Không có dữ liệu thống kê cho năm {selectedYear}.</p>
          ) : (
            <Column {...config} />
          )}
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
