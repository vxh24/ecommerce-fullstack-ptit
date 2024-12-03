import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";

const ViewEnquiry = ({ enquiry }) => {
  const dispatch = useDispatch();
  const enqState = useSelector((state) => state.enquiry.enquiries.data);
  const enqui = enqState.find((item) => item._id === enquiry._id);
  // console.log(enqui);
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 200);
  };

  return (
    <div className="bg-white p-3 d-flex gap-3 flex-column rounded-3">
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Name:</h6>
        <p className="mb-0">{enquiry.name}</p>
      </div>
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Phone:</h6>
        <a href={`tel:+84${enquiry.phone}`}>{enquiry.phone}</a>
      </div>
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Email:</h6>
        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
      </div>
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Comment:</h6>
        <p className="mb-0">{enquiry.comment}</p>
      </div>
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Status:</h6>
        <p className="mb-0">{enqui.status}</p>
      </div>
      <div className="d-flex align-items-center gap-3">
        <h6 className="mb-0">Change Status:</h6>
        <div>
          <select
            name=""
            value={enqui.status}
            className="form-control form-select"
            id=""
            onChange={(e) => setEnquiryStatus(e.target.value, enquiry._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
