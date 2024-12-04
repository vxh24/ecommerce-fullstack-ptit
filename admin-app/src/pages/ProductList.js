import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Màu sắc",
    dataIndex: "colors",
    render: (colorIds, record) => {
      if (!Array.isArray(record.colors) || record.colors.length === 0) {
        return null;
      }

      return colorIds.map((colorId, index) => {
        const color = record.colors.find((c) => c._id === colorId);

        if (!color) {
          return null;
        }

        return (
          <span
            key={index}
            style={{
              backgroundColor: color.colorHex,
              padding: "5px 10px",
              marginRight: "5px",
              borderRadius: "4px",
              color: "#fff",
            }}
          >
            {color.colorHex}
          </span>
        );
      });
    },
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const formattedPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [click, setClick] = useState(false);
  const productState = useSelector((state) => state.product.products.data);

  const data1 = [];

  useEffect(() => {
    if (click === true) {
      navigate("/admin/product");
    }
  }, [click]);

  if (productState && productState.length) {
    for (let i = 0; i < productState.length; i++) {
      data1.push({
        key: i + 1,
        title: productState[i].title,
        brand: productState[i].brand,
        category: productState[i].category,
        color: productState[i].color,
        price: formattedPrice(productState[i].price),
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }

  return (
    <div>
      <div className="product-list d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">Danh sách sản phẩm</h3>
        <button onClick={() => setClick(true)}>+Thêm sản phẩm</button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
