import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  deleteACoupon,
  getCoupons,
  resetState,
  createCoupon,
  updateACoupon,
} from "../features/coupon/couponSlice";
import moment from "moment";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percent is Required"),
});
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
    title: "Giảm giá",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "expiry",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons.data);

  const data1 = [];

  if (couponState && couponState.length) {
    for (let i = 0; i < couponState.length; i++) {
      data1.push({
        key: i + 1,
        name: couponState[i].name,
        discount: couponState[i].discount,
        expiry: moment(couponState[i].expiry).format("DD/MM/YYYY"),
        action: (
          <>
            <div>
              <Link
                // to={`/admin/coupon/${couponState[i]._id}`}
                onClick={() => {
                  setClick1(true);
                  setCoupon(couponState[i]);
                }}
                className=" fs-3 text-danger border-0 bg-transparent"
              >
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(couponState[i]._id)}
              >
                <AiFillDelete />
              </button>
            </div>
          </>
        ),
      });
    }
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <>
      <div>
        <div className="product-list d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">Coupon</h3>
          <button onClick={() => setClick(true)}>Thêm mã giảm giá</button>
        </div>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCoupon(couponId);
          }}
          title="Bạn có chắc chắn muốn xóa mã giảm này không?"
        />
      </div>
      {click && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Thêm mã</h3>
            <AddCoupon />
          </div>
        </div>
      )}
      {click1 && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick1(false)}>
              ✖
            </button>
            <EditCoupon coupon={coupon} />
          </div>
        </div>
      )}
    </>
  );
};
const AddCoupon = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCoupon(values));
      setTimeout(() => {
        dispatch(getCoupons());
      }, 300);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        name="name"
        onChng={formik.handleChange("name")}
        onBlr={formik.handleBlur("name")}
        val={formik.values.name}
        label="Nhập tên mã"
        id="name"
      />
      <div className="error">{formik.touched.name && formik.errors.name}</div>
      <CustomInput
        type="date"
        name="expiry"
        onChng={formik.handleChange("expiry")}
        onBlr={formik.handleBlur("expiry")}
        val={formik.values.expiry}
        label="Nhập ngày hết hạn"
        id="date"
      />
      <div className="error">
        {formik.touched.expiry && formik.errors.expiry}
      </div>
      <CustomInput
        type="number"
        name="discount"
        onChng={formik.handleChange("discount")}
        onBlr={formik.handleBlur("discount")}
        val={formik.values.discount}
        label="Nhập % giảm giá"
        id="discount"
      />
      <div className="error">
        {formik.touched.discount && formik.errors.discount}
      </div>
      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Thêm
      </button>
    </form>
  );
};
const EditCoupon = ({ coupon }) => {
  const dispatch = useDispatch();
  const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(newDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: coupon.name,
      expiry: changeDateFormat(coupon.expiry),
      discount: coupon.discount,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: coupon._id, couponData: values };
      dispatch(updateACoupon(data));
      setTimeout(() => {
        dispatch(getCoupons());
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Cập nhật mã</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Nhập tên mã"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChng={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Nhập ngày hết hạn"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChng={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Nhập % giảm giá"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};
export default Couponlist;
