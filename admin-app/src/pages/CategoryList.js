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
    title: "Ảnh",
    dataIndex: "image",
    render: (image) => (
      <img
        src={image || "default-image-path.jpg"}
        alt="category"
        style={{ width: 100, height: 80, objectFit: "cover" }}
      />
    ),
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
  console.log(pCatStat)
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
    image: cat.image,
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
        <div className="product-list d-flex justify-content-between align-items-center tw-cursor-pointer">
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
            onClick={() => setSearchTerm("")}
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
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: cat.title || "",
      image: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title)
      formData.append("image", images)
      // const data = { id: cat._id, pCatData: formData };
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      dispatch(updateAProductCategory({ id: cat._id, data: formData }));
      setTimeout(() => {
        dispatch(getCategories());
      }, 200);
    },
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <CustomInput
          type="text"
          label="Nhập danh mục"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          id="brand"
        />
        <div className="error">{formik.touched.title && formik.errors.title}</div>
      </div>
      <div className="d-flex align-items-center gap-10">
        <div className="cat-img">
          <img
            src={imagePreview || cat?.image}
            alt="Avatar"
          />
        </div>
        <div className="upload-data">
          <input
            type="file"
            id="avatar"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="error">{formik.errors.image}</div>
          )}
        </div>
      </div>
      <button className="btn btn-success border-0 rounded-3 my-3" type="submit">
        Cập nhật
      </button>
    </form>
  );
};
export default CategoryList;
