import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
  createCategory,
  getAProductCategory,
  updateAProductCategory,
} from "../features/pcategory/pCategorySlice";
import CustomModal from "../components/CustomModal";
import * as yup from "yup";
import { useFormik } from "formik";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [category, setCategory] = useState(false);
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

  const data1 = [];

  if (pCatStat && pCatStat.length) {
    for (let i = 0; i < pCatStat.length; i++) {
      data1.push({
        key: i + 1,
        name: pCatStat[i].title,
        action: (
          <>
            <button
              // to={`/admin/category/${pCatStat[i]._id}`}
              onClick={() => { setClick1(true); setCategory(pCatStat[i]) }}
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
          <h3 className="mb-4 title">Product Categories</h3>
          <button onClick={() => setClick(true)}>+Add Category</button>
        </div>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(pCatId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
      </div>
      {
        click && (
          < div className="modal" >
            <div className="modal-content">
              <button className="close-model" onClick={() => setClick(false)}>✖</button>
              <h3 className="mb-3 title">
                Add Category
              </h3>
              <AddCat />
            </div>
          </div>
        )
      }
      {
        click1 && (
          < div className="modal" >
            <div className="modal-content">
              <button className="close-model" onClick={() => setClick1(false)}>✖</button>
              <h3 className="mb-3 title">
                Edit Category
              </h3>
              <EditCat cat={category} />
            </div>
          </div>
        )
      }
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
    }
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        label="Enter Product Category"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="brand"
      />
      <div className="error">
        {formik.touched.title && formik.errors.title}
      </div>
      <button
        className="btn btn-success border-0 rounded-3 my-3"
        type="submit"
      >
        Add Category
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
    }
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="text"
        label="Enter Product Category"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="brand"
      />
      <div className="error">
        {formik.touched.title && formik.errors.title}
      </div>
      <button
        className="btn btn-success border-0 rounded-3 my-3"
        type="submit"
      >
        Edit Category
      </button>
    </form>
  );
};
export default CategoryList;
