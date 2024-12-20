import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
  createCategory,
  updateAProductCategory,
} from "../features/pcategory/pCategorySlice";
import CustomModal from "../components/CustomModal";
import * as yup from "yup";
import { useFormik } from "formik";
let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên danh mục"),
});

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
    title: "Thao tác",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [category, setCategory] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const pCatStat = useSelector((state) => state.pCategory.pCategories.data);
  useEffect(() => {
    if (searchTerm) {
      const results = pCatStat?.filter((cat) =>
        cat.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(results || []);
    } else {
      setFilteredCategories(pCatStat || []);
    }
  }, [searchTerm, pCatStat]);
  const data1 = [];
  const data2 = filteredCategories?.map((cat) => ({
    key: cat._id,
    name: cat.title,
    action: (
      <>
        <button
          onClick={() => {
            setClick1(true);
            setCategory(cat);
          }}
          className=" fs-3 text-danger border-0 bg-transparent"
        >
          <BiEdit />
        </button>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(cat._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));
  if (pCatStat && pCatStat.length) {
    for (let i = 0; i < pCatStat.length; i++) {
      data1.push({
        key: i + 1,
        name: pCatStat[i].title,
        action: (
          <>
            <button
              onClick={() => {
                setClick1(true);
                setCategory(pCatStat[i]);
              }}
              className=" fs-3 text-danger border-0 bg-transparent"
            >
              <BiEdit />
            </button>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(pCatStat[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }

  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
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
            Danh sách danh mục sản phẩm
          </h3>
          <button onClick={() => setClick(true)}>Thêm danh mục</button>
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
            options={pCatStat?.map((cat) => cat.title) || []}
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
            deleteCategory(pCatId);
          }}
          title="Bạn có chắc chắn muốn xóa danh mục này không?"
        />
      </div>
      {click && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Thêm danh mục</h3>
            <AddCat />
          </div>
        </div>
      )}
      {click1 && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick1(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Cập nhật danh mục</h3>
            <EditCat cat={category} />
          </div>
        </div>
      )}
    </>
  );
};
const AddCat = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      setTimeout(() => {
        dispatch(getCategories());
      }, 200);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        label="Nhập danh mục"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="brand"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-3" type="submit">
        Thêm
      </button>
    </form>
  );
};
const EditCat = ({ cat }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: cat.title,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: cat._id, pCatData: values };
      dispatch(updateAProductCategory(data));
      setTimeout(() => {
        dispatch(getCategories());
      }, 200);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        label="Nhập danh mục"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="brand"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-3" type="submit">
        Cập nhật
      </button>
    </form>
  );
};
export default CategoryList;
