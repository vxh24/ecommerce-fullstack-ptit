import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAUser,
  getUsers,
  unBlockAUser,
} from "../features/customers/customerSlice";

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
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleBlock = (userId) => {
    dispatch(blockAUser(userId));
  };

  const handleUnblock = (userId) => {
    dispatch(unBlockAUser(userId));
  };

  const customerState = useSelector((state) => state.customer.customers?.data);

  console.log(customerState);

  const data1 = [];
  if (customerState && customerState.length) {
    for (let i = 0; i < customerState.length; i++) {
      if (customerState[i].role !== "admin") {
        data1.push({
          key: i + 1,
          name: customerState[i]?.name,
          email: customerState[i]?.email,
          status:
            customerState[i]?.deleted === false ? (
              <>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Active
                </span>
              </>
            ) : (
              <>
                <span style={{ color: "red", fontWeight: "bold" }}>Block</span>
              </>
            ),
          action:
            customerState[i]?.deleted === false ? (
              <>
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ width: "100px" }}
                  onClick={() => handleBlock(customerState[i]._id)}
                >
                  Block
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "100px" }}
                  onClick={() => handleUnblock(customerState[i]._id)}
                >
                  Unblock
                </button>
              </>
            ),
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
