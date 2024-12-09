import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";

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
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => {
                navigate(`/admin/edit-product/${productState[i]._id}`);
              }}
            >
              <BiEdit />
            </button>
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

  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteAProduct(productId));
      setOpen(false);
      dispatch(getProducts());
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
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
          performAction={handleDeleteProduct}
          title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
        />
      </div>
    </>
  );
};

export default ProductList;
