import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  deleteABlogCat,
  getCategories,
  resetState,
  createNewblogCat,
  updateABlogCat,
} from "../features/bcategory/bcategorySlice";
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

const BlogCatList = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [blogcat, setBlogcat] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogCats, setFilteredBlogCats] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories.data);
  useEffect(() => {
    if (searchTerm) {
      const results = bCatState?.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogCats(results || []);
    } else {
      setFilteredBlogCats(bCatState || []);
    }
  }, [searchTerm, bCatState]);
  const data2 = filteredBlogCats?.map((bCat) => ({
    key: bCat._id,
    name: bCat.title,
    action: (
      <>
        <button
          onClick={() => {
            setClick1(true);
            setBlogcat(bCat);
          }}
          className="fs-3 text-danger border-0 bg-transparent"
        >
          <BiEdit />
        </button>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(bCat._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <>
      <div>
        <div className="product-list d-flex justify-content-between align-items-center tw-cursor-pointer">
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
            onClick={() => setSearchTerm("")}
          >
            Danh mục bài viết
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
            options={bCatState?.map((bCat) => bCat.title) || []}
            placeholder="Tìm kiếm theo chủ đề..."
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
            deleteBlogCategory(blogCatId);
          }}
          title="Bạn chắc chắn muốn xóa danh mục này không?"
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
              Thêm danh mục bài viết
            </h3>
            <AddBlogCat />
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
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Cập nhật danh mục bài viết
            </h3>
            <EditBlogCat blogcat={blogcat} />
          </div>
        </div>
      )}
    </>
  );
};
const AddBlogCat = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createNewblogCat(values));
      setTimeout(() => {
        dispatch(getCategories());
      }, 300);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        name="title"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        label="Nhập danh mục"
        id="blogcat"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Thêm
      </button>
    </form>
  );
};
const EditBlogCat = ({ blogcat }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogcat.title,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: blogcat._id, blogCatData: values };
      dispatch(updateABlogCat(data));
      setTimeout(() => {
        dispatch(getCategories());
      }, 300);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        name="title"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        label="Nhập danh mục"
        id="blogcat"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Cập nhật
      </button>
    </form>
  );
};
export default BlogCatList;
