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

  const data1 = [];

  if (enqState && enqState.length) {
    for (let i = 0; i < enqState.length; i++) {
      data1.push({
        key: i + 1,
        name: enqState[i].name,
        email: enqState[i].email,
        phone: enqState[i].phone,
        status: (
          <>
            <select
              value={enqState[i].status}
              name=""
              defaultValue={
                enqState[i].status ? enqState[i].status : "Submitted"
              }
              className="form-control form-select"
              id=""
              onChange={(e) =>
                setEnquiryStatus(e.target.value, enqState[i]._id)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),

        action: (
          <>
            <button
              className="ms-3 fs-3 text-danger border-0 bg-transparent"
              // to={`/admin/enquiries/${enqState[i]._id}`}
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
        <h3 className="mb-4 title">Danh sách khảo sát</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
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
            <h3 className="mb-3 title">Xem khảo sát</h3>
            <ViewEnquiry enquiry={enquiry} />
          </div>
        </div>
      )}
    </>
  );
};

export default Enquiries;
