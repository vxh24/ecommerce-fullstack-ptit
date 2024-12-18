import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProduct,
  generateQRCode,
  getProducts,
} from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { BsCloudDownload } from "react-icons/bs";
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
  {
    title: "QR Code",
    dataIndex: "qrcode",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products.data);
  const qrCodeURL = useSelector((state) => state.product.qrCodeURL);

  console.log(qrCodeURL);

  useEffect(() => {
    if (searchTerm) {
      const results = productState?.filter((pro) =>
        pro.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results || []);
    } else {
      setFilteredProducts(productState || []);
    }
  }, [searchTerm, productState]);

  const formattedPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleGenerateAndDownloadQRCode = async (productId) => {
    try {
      await dispatch(generateQRCode(productId));

      // console.log(qrCodeURL);

      if (qrCodeURL) {
        const a = document.createElement("a");
        a.href = qrCodeURL;
        a.download = `product_${productId}_qr.png`;
        a.click();
        console.log("QR Code đã được tải xuống");
      } else {
        console.error("Không thể tải QR Code");
      }
    } catch (error) {
      console.error("Lỗi khi tạo và tải QR Code:", error);
    }
  };

  const data2 = filteredProducts?.map((pro) => ({
    key: pro._id,
    name: pro.name,
    brand: pro.brand,
    category: pro.category,
    colors: pro.colors.map((color) => (
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
    quantity: pro.quantity,
    price: formattedPrice(pro.price),
    action: (
      <>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => {
            navigate(`/admin/edit-product/${pro._id}`);
          }}
        >
          <BiEdit />
        </button>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(pro._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
    qrcode: (
      <>
        <button
          className="ms-3 fs-3 text-primary bg-transparent border-0"
          onClick={() => handleGenerateAndDownloadQRCode(pro._id)}
        >
          <BsCloudDownload />
        </button>
      </>
    ),
  }));

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
        qrcode: (
          <>
            <button
              className="ms-3 fs-3 text-primary bg-transparent border-0"
              onClick={() =>
                handleGenerateAndDownloadQRCode(productState[i]._id)
              }
            >
              <BsCloudDownload />
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
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Danh sách sản phẩm
          </h3>
          <button onClick={() => navigate("/admin/product")}>
            Thêm sản phẩm
          </button>
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
            options={productState?.map((pro) => pro.name) || []}
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
          performAction={handleDeleteProduct}
          title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
        />
      </div>
    </>
  );
};

export default ProductList;
