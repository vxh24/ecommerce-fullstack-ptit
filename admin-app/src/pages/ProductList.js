import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import AddProduct from "./AddProduct";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
  },
  {
    title: "Màu sắc",
    dataIndex: "colors",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [productId, setProductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products.data);

  const formattedPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const data1 = [];

  useEffect(() => {
    if (click) {
      navigate("/admin/product");
    }
  }, [click]);

  if (productState && productState.length) {
    for (let i = 0; i < productState.length; i++) {
      data1.push({
        key: i + 1,
        name: productState[i].name,
        brand: productState[i].brand,
        category: productState[i].category,
        colors: productState[i].colors.map((color) => (
          <div
            key={color._id}
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              backgroundColor: color.title,
              borderRadius: "50%",
              border: "1px solid #ccc",
              marginRight: "5px",
            }}
          ></div>
        )),
        quantity: productState[i].quantity,
        price: formattedPrice(productState[i].price),
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(productState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }

  const deleteProduct = (e) => {
    dispatch(deleteProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <>
      <div>
        <div className="product-list d-flex justify-content-between align-items-center">
          <h3 className="mb-4 title">Danh sách sản phẩm</h3>
          <button onClick={() => navigate("/admin/product")}>
            Thêm sản phẩm
          </button>
        </div>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteProduct(productId);
          }}
          title="Are you sure you want to delete this product?"
        />
      </div>
      {click && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Add Product</h3>
            <AddProduct />
          </div>
        </div>
      )}
      {click1 && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-model" onClick={() => setClick1(false)}>
              ✖
            </button>
            <h3 className="mb-3 title">Edit Product</h3>
            {/* <EditProduct product={product} /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
