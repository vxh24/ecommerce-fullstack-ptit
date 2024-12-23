import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomInput from "../components/CustomInput";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  deleteABrand,
  getBrands,
  resetState,
  createBrand,
  updateABrand,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import AddBrand from "./AddBrand";
let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên thương hiệu"),
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
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [brand, setBrand] = useState(false);
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands.data);
  useEffect(() => {
    if (searchTerm) {
      const results = brandState?.filter((brand) =>
        brand.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands(results || []);
    } else {
      setFilteredBrands(brandState || []);
    }
  }, [searchTerm, brandState]);
  const data1 = [];
  const data2 = filteredBrands?.map((brand) => ({
    key: brand._id,
    name: brand.title,
    action: (
      <>
        <button
          onClick={() => {
            setClick1(true);
            setBrand(brand);
          }}
          className=" fs-3 text-danger border-0 bg-transparent "
        >
          <BiEdit />
        </button>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(brand._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));
  if (brandState && brandState.length) {
    for (let i = 0; i < brandState.length; i++) {
      data1.push({
        key: i + 1,
        name: brandState[i].title,
        action: (
          <>
            <button
              onClick={() => {
                setClick1(true);
                setBrand(brandState[i]);
              }}
              className=" fs-3 text-danger border-0 bg-transparent "
            >
              <BiEdit />
            </button>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brandState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <>
      <div>
        <div className="product-list d-flex justify-content-between align-items-center">
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Danh sách thương hiệu
          </h3>
          <button onClick={() => setClick(true)}>Thêm thương hiệu</button>
        </div>
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
            options={brandState?.map((brand) => brand.title) || []}
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
            deleteBrand(brandId);
          }}
          title="Bạn có chắc chắn muốn xóa thương hiệu này không?"
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
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Thêm thương hiệu
            </h3>
            <AddBrand1 />
          </div>
        </div>
      )}
      {click1 && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick1(false)}>
              ✖
            </button>
            <h3
              className="mb-3 title"
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Cập nhật thương hiệu
            </h3>
            <UpdateBrand brand={brand} />
          </div>
        </div>
      )}
    </>
  );
};
const AddBrand1 = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(getBrands());
      }, 100);
    },
  });

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          label="Nhập tên thương hiệu"
          id="brand"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            Thêm
          </button>
        </div>
      </form>
    </>
  );
};
const UpdateBrand = ({ brand }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brand.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: brand._id, brandData: values };
      dispatch(updateABrand(data));
      setTimeout(() => {
        dispatch(getBrands());
      }, 100);
    },
  });

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          label="Nhập tên thương hiệu"
          id="brand"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-success border-0 rounded-3 my-3"
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </>
  );
};
export default Brandlist;
