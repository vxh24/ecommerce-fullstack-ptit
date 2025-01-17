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
    width: 250,
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    width: 300,
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
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

  useEffect(() => {
    let results = productState || [];
    if (searchTerm) {
      results = results.filter((pro) =>
        pro.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // setFilteredProducts(results || []);
    }
    //  else {
    //   setFilteredProducts(productState || []);
    // }
    if (selectedCategory) {
      results = results.filter(
        (pro) => pro.category.title === selectedCategory
      );
    }

    if (selectedBrand) {
      results = results.filter((pro) => pro.brand.title === selectedBrand);
    }
    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, selectedBrand, productState]);

  const formattedPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleGenerateAndDownloadQRCode = async (productId) => {
    try {
      const results = await dispatch(generateQRCode(productId));

      if (results.payload) {
        const response = await fetch(results.payload);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `product_${productId}_qr.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
    brand: pro.brand.title,
    category: pro.category.title,
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
        <div className="product-list d-flex justify-content-between align-items-center tw-cursor-pointer">
          <h3
            className="mb-4 title"
            style={{ fontSize: "18px", fontWeight: "bold" }}
            onClick={() => setSearchTerm("")}
          >
            Danh sách sản phẩm
          </h3>
          <button onClick={() => navigate("/admin/product")}>
            Thêm sản phẩm
          </button>
        </div>
        <div>
          <div className="d-flex align-items-center gap-10">
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
              style={{ width: "50%" }}
            />
            <div className="filters d-flex gap-3 mt-3 w-50">
              <select
                className="form-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Tất cả thương hiệu</option>
                {[
                  ...new Set(productState?.map((pro) => pro.brand.title) || []),
                ].map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ width: "100%" }}
              >
                <option value="">Tất cả danh mục</option>
                {[
                  ...new Set(
                    productState?.map((pro) => pro.category.title) || []
                  ),
                ].map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
