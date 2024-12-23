import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit, BiLogo500Px } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import CustomInput from "../components/CustomInput";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {
  deleteABlog,
  getBlogs,
  resetState,
  createBlogs,
  updateABlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";
import { useFormik } from "formik";
import * as yup from "yup";
import ReactQuill from "react-quill";
let schema = yup.object().shape({
  title: yup.string().required("Vui lòng nhập tên chủ đề bài viết"),
  description: yup.string().required("Vui lòng nhập mô tả bài viết"),
  category: yup.string().required("Vui lòng chọn danh mục bài viết"),
});
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Chủ đề",
    dataIndex: "name",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [blog, setBlog] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);

  const getBlogState = useSelector((state) => state.blogs.blogs.data);
  useEffect(() => {
    if (searchTerm) {
      const results = getBlogState?.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(results || []);
    } else {
      setFilteredBlogs(getBlogState || []);
    }
  }, [searchTerm, getBlogState]);
  const data1 = [];
  const data2 = filteredBlogs?.map((blog) => ({
    key: blog._id,
    name: blog.title,
    category: blog.category,
    action: (
      <>
        <div className="d-flex align-items-center gap-10">
          <Link
            onClick={() => {
              setClick1(true);
              setBlog(blog);
            }}
            className=" fs-3 text-danger border-0 bg-transparent"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blog._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      </>
    ),
  }));
  if (getBlogState && getBlogState.length) {
    for (let i = 0; i < getBlogState.length; i++) {
      data1.push({
        key: i + 1,
        name: getBlogState[i].title,
        category: getBlogState[i].category,

        action: (
          <>
            <div className="d-flex align-items-center gap-10">
              <Link
                onClick={() => {
                  setClick1(true);
                  setBlog(getBlogState[i]);
                }}
                className=" fs-3 text-danger border-0 bg-transparent"
              >
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(getBlogState[i]._id)}
              >
                <AiFillDelete />
              </button>
            </div>
          </>
        ),
      });
    }
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
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
            Danh sách bài viết
          </h3>
          <button onClick={() => setClick(true)}>Thêm bài viết</button>
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
            options={getBlogState?.map((blog) => blog.title) || []}
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
            deleteBlog(blogId);
          }}
          title="Bạn chắc chắn muốn xóa bài viết này không?"
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
              Thêm bài viết
            </h3>
            <AddBlog />
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
              Cập nhật bài viết
            </h3>
            <EditBlog blog={blog} />
          </div>
        </div>
      )}
    </>
  );
};
const EditBlog = ({ blog }) => {
  const dispatch = useDispatch();

  const bCatState = useSelector((state) => state.bCategory.bCategories.data);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blog.title,
      description: blog.description,
      category: blog.category,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: blog._id, blogData: values };
      dispatch(updateABlog(data));
      setTimeout(() => {
        dispatch(getBlogs());
      }, 300);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="mt-4">
        <CustomInput
          type="text"
          label="Nhập chủ đề"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
        />
      </div>
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <select
        name="category"
        onChange={formik.handleChange("category")}
        onBlur={formik.handleBlur("category")}
        value={formik.values.category}
        className="form-control py-3  mt-3"
        id=""
      >
        <option value="">Chọn danh mục</option>
        {Array.isArray(bCatState) &&
          bCatState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
      </select>
      <div className="error">
        {formik.touched.category && formik.errors.category}
      </div>
      <ReactQuill
        theme="snow"
        className="mt-3"
        name="description"
        onChange={formik.handleChange("description")}
        value={formik.values.description}
      />
      <div className="error">
        {formik.touched.description && formik.errors.description}
      </div>

      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Cập nhật
      </button>
    </form>
  );
};
const AddBlog = () => {
  const dispatch = useDispatch();

  const bCatState = useSelector((state) => state.bCategory.bCategories.data);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      category: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogs(values));
      setTimeout(() => {
        dispatch(getBlogs());
      }, 300);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="mt-4">
        <CustomInput
          type="text"
          label="Nhập chủ đề"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
        />
      </div>
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <select
        name="category"
        onChange={formik.handleChange("category")}
        onBlur={formik.handleBlur("category")}
        value={formik.values.category}
        className="form-control py-3  mt-3"
        id=""
      >
        <option value="">Chọn danh mục</option>
        {Array.isArray(bCatState) &&
          bCatState.map((i, j) => {
            return (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            );
          })}
      </select>
      <div className="error">
        {formik.touched.category && formik.errors.category}
      </div>
      <ReactQuill
        theme="snow"
        className="mt-3"
        name="description"
        onChange={formik.handleChange("description")}
        value={formik.values.description}
      />
      <div className="error">
        {formik.touched.description && formik.errors.description}
      </div>

      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Thêm
      </button>
    </form>
  );
};

export default BlogList;
