import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import moment from "moment";
const VoucherModal = ({ show, handleClose, data, setCoupon }) => {
  const [voucher, setVoucher] = useState(null);
  const { voucherChecked, setVoucherChecked } = useConversation();
  console.log(voucherChecked);
  const handleOk = () => {
    setCoupon(voucher);
    handleClose();
  };
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Chọn Voucher</h5>
          <button onClick={handleClose} className="close-button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group d-flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Mã Voucher"
              className="form-control"
            />
            <button className="btn btn-primary">ÁP DỤNG</button>
          </div>

          {data &&
            data.map((item, index) => {
              return (
                <div className="voucher-item mb-3" key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <img
                        src="https://down-vn.img.susercontent.com/file/03f3dd4a6cc1782ef09556295da3e0f7"
                        alt="Voucher"
                        className="me-3"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">
                          Giảm tối đa {item.discount}% Đơn Tối Thiểu 0₫
                        </h6>
                        <p className="text-muted mb-1">Tên: {item.name}</p>
                        <p className="text-muted">Ngày hết hạn: {moment(item.expiry).format("DD-MM-YYYY")}</p>
                      </div>
                    </div>
                    {
                      moment(item?.expiry).isAfter(moment()) ?
                        (<input
                          value={item}
                          type="radio"
                          checked={voucherChecked === item.name}
                          name="voucher"
                          onChange={() => {
                            if (voucherChecked === item.name) {
                              setVoucher(null);
                              setVoucherChecked(null);
                            } else {
                              setVoucher(item.discount);
                              setVoucherChecked(item.name);
                            }
                          }}
                          className="form-radio"
                        />)
                        :
                        (<p style={{ color: "red" }}>Hết hạn</p>)
                    }

                  </div>
                </div>
              );
            })}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            TRỞ LẠI
          </button>
          <button className="btn btn-danger" onClick={handleOk}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherModal;
