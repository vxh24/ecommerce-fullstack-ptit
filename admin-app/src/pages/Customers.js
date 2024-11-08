import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const customerState = useSelector((state) => state.customer.customers?.data);

  // console.log(customerState);

  const data1 = [];
  if (customerState && customerState.length) {
    for (let i = 0; i < customerState.length; i++) {
      if (customerState[i].role !== "admin") {
        data1.push({
          key: i + 1,
          name: customerState[i]?.name,
          email: customerState[i]?.email,
          phone: customerState[i]?.phone,
        });
      }
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
