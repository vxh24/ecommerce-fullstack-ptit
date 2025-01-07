import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  blockAUser,
  getUsers,
  unBlockAUser,
} from "../features/customers/customerSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
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
  useEffect(() => {
    if (searchTerm) {
      const results = customerState
        ?.filter((cus) => cus.role !== "admin")
        .filter((cus) =>
          cus.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setFilteredCustomers(results || []);
    } else {
      const results = customerState?.filter((cus) => cus.role !== "admin");
      setFilteredCustomers(results || []);
    }
  }, [searchTerm, customerState]);
  const data2 = filteredCustomers?.map((cus) => ({
    key: cus._id,
    name: cus.name,
    email: cus.email,
    status:
      cus.isBlock === false ? (
        <>
          <span style={{ color: "green", fontWeight: "bold" }}>Hoạt động</span>
        </>
      ) : (
        <>
          <span style={{ color: "red", fontWeight: "bold" }}>
            Tài khoản bị khóa
          </span>
        </>
      ),
    action:
      cus.isBlock === false ? (
        <>
          <button
            type="button"
            className="btn btn-danger"
            style={{ width: "100px" }}
            onClick={() => handleBlock(cus._id)}
          >
            Khóa
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn btn-success"
            style={{ width: "100px" }}
            onClick={() => handleUnblock(cus._id)}
          >
            Mở khóa
          </button>
        </>
      ),
  }));

  return (
    <div>
      <h3
        className="mb-4 title tw-cursor-pointer"
        style={{ fontSize: "18px", fontWeight: "bold" }}
        onClick={() => setSearchTerm("")}
      >
        Danh sách người dùng
      </h3>
      <div>
        <Typeahead
          id="search-orders"
          onChange={(selected) => {
            if (selected.length > 0) {
              setSearchTerm(selected[0]);
            } else {
              setSearchTerm("");
            }
          }}
          options={customerState?.filter((cus) => cus.role !== "admin")?.map((cus) => cus.name) || []}
          placeholder="Tìm kiếm theo tên..."
          selected={searchResults}
          onInputChange={(text) => setSearchTerm(text)}
          className="mt-3"
        />
        <Table columns={columns} dataSource={data2} />
      </div>
    </div>
  );
};

export default Customers;
