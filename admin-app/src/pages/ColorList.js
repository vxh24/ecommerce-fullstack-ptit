import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (colorHex) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Hiển thị màu sắc */}
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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

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

  const data1 = [];

  if (colorState && colorState.length) {
    for (let i = 0; i < colorState.length; i++) {
      data1.push({
        key: i + 1,
        name: colorState[i].title,
        color: colorState[i].title,
        action: (
          <>
            <Link
              to={`/admin/color/${colorState[i]._id}`}
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
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
