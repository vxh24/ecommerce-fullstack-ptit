import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import ViewEnquiry from "./ViewEnquiry";
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
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
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

const Enquiries = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");
  const [click, setClick] = useState(false);
  const [enquiry, setEnquiry] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enqState = useSelector((state) => state.enquiry.enquiries.data);
  useEffect(() => {
    if (searchTerm) {
      const results = enqState?.filter((enq) =>
        enq.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEnquiries(results || []);
    } else {
      setFilteredEnquiries(enqState || []);
    }
  }, [searchTerm, enqState]);
  const data1 = [];
  const data2 = filteredEnquiries?.map((enq) => ({
    key: enq._id,
    name: enq.name,
    email: enq.email,
    phone: enq.phone,
    status: enq.status,
    action: (
      <>
        <button
          className="ms-3 fs-3 text-danger border-0 bg-transparent"
          onClick={() => {
            setClick(true);
            setEnquiry(enq);
          }}
        >
          <AiOutlineEye />
        </button>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(enq._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));
  if (enqState && enqState.length) {
    for (let i = 0; i < enqState.length; i++) {
      data1.push({
        key: i + 1,
        name: enqState[i].name,
        email: enqState[i].email,
        phone: enqState[i].phone,
        status: enqState[i].status,
        action: (
          <>
            <button
              className="ms-3 fs-3 text-danger border-0 bg-transparent"
              onClick={() => {
                setClick(true);
                setEnquiry(enqState[i]);
              }}
            >
              <AiOutlineEye />
            </button>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(enqState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }

  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 200);
  };

  const deleteEnq = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 200);
  };

  return (
    <>
      <div>
        <h3
          className="mb-4 title tw-cursor-pointer"
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={() => setSearchTerm("")}
        >
          Danh sách khảo sát
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
            options={enqState?.map((enq) => enq.name) || []}
            placeholder="Tìm kiếm theo tên..."
            selected={searchResults}
            onInputChange={(text) => setSearchTerm(text)}
            className="mt-3"
          />
          <Table columns={columns} dataSource={data2} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteEnq(enqId);
          }}
          title="Bạn có chắc chắn muốn xóa khảo sát này không?"
        />
      </div>
      {click && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick(false)}>
              ✖
            </button>
            <h3
              className="mb-3 title"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Xem khảo sát
            </h3>
            <ViewEnquiry enquiry={enquiry} />
          </div>
        </div>
      )}
    </>
  );
};

export default Enquiries;
