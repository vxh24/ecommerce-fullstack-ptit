import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { createColor, updateAColor } from "../features/color/colorSlice";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
let schema = yup.object().shape({
  title: yup.string().required("Vui lòng chọn màu"),
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
    title: "Màu",
    dataIndex: "color",
    render: (colorHex) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: colorHex,
            marginRight: "10px",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    ),
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [color, setColor] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColors, setFilteredColors] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors.data);
  useEffect(() => {
    if (searchTerm) {
      const results = colorState?.filter((color) =>
        color.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColors(results || []);
    } else {
      setFilteredColors(colorState || []);
    }
  }, [searchTerm, colorState]);
  const data1 = [];
  const data2 = filteredColors?.map((color) => ({
    key: color._id,
    name: color.title,
    color: color.title,
    action: (
      <>
        <div className="d-flex align-items-center gap-10">
          <Link
            onClick={() => {
              setClick1(true);
              setColor(color);
            }}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(color._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      </>
    ),
  }));
  if (colorState && colorState.length) {
    for (let i = 0; i < colorState.length; i++) {
      data1.push({
        key: i + 1,
        name: colorState[i].title,
        color: colorState[i].title,
        action: (
          <>
            <div className="d-flex align-items-center gap-10">
              <Link
                onClick={() => {
                  setClick1(true);
                  setColor(colorState[i]);
                }}
                className=" fs-3 text-danger"
              >
                <BiEdit />
              </Link>
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(colorState[i]._id)}
              >
                <AiFillDelete />
              </button>
            </div>
          </>
        ),
      });
    }
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 300);
  };

  return (
    <>
      <div>
        <div className="product-list d-flex justify-content-between align-items-center">
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Danh sách màu sắc
          </h3>
          <button onClick={() => setClick(true)}>Thêm màu</button>
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
            options={colorState?.map((color) => color.title) || []}
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
            deleteColor(colorId);
          }}
          title="Bạn có chắc chắn muốn xóa màu này không?"
        />
      </div>
      {click && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Thêm màu</h3>
            <AddColor />
          </div>
        </div>
      )}
      {click1 && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick1(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Cập nhật</h3>
            <EditColor color={color} />
          </div>
        </div>
      )}
    </>
  );
};

const AddColor = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      setTimeout(() => {
        dispatch(getColors());
      }, 200);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="color"
        label="Enter Product Color"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="color"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Add Color
      </button>
    </form>
  );
};
const EditColor = ({ color }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: color.title,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: color._id, colorData: values };
      dispatch(updateAColor(data));
      setTimeout(() => {
        dispatch(getColors());
      }, 200);
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <CustomInput
        type="color"
        label="Enter Product Color"
        onChng={formik.handleChange("title")}
        onBlr={formik.handleBlur("title")}
        val={formik.values.title}
        id="color"
      />
      <div className="error">{formik.touched.title && formik.errors.title}</div>
      <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
        Cập nhật
      </button>
    </form>
  );
};
export default ColorList;
