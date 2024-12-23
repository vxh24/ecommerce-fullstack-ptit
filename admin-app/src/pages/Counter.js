import React, { useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { BsQrCodeScan } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getProducts } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUsers } from "../features/customers/customerSlice";
import { getCoupons } from "../features/coupon/couponSlice";
import VoucherModal from "../components/VoucherModal";
import {
  AddProdToCart,
  cashOrderUser,
  deleteProductfromCart,
  paymentMoMoSlice,
  printOrderSlice,
  updatecountCart,
} from "../features/cart/CartSlice";
import { toast } from "react-toastify";
import { QrReader } from "react-qr-reader";

const Counter = () => {
  const location = useLocation();
  const message = location.state || {};
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [infor, setInfor] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [click, setClick] = useState(false);
  const [total, setTotal] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [coupon, setCoupon] = useState();
  const [change, setChange] = useState(null);
  const [payment, setPayment] = useState(null);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);

  const handleRemove = (productId) => {
    let selectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        if (product.selectedColor) {
          const co = product.colors.find(
            (item) => item.name === product.selectedColor
          );
          dispatch(
            deleteProductfromCart({ productId: product._id, color: co.name })
          );
        }
      }
      return product;
    });
    selectedProducts = selectedProducts.filter(
      (product) => product._id !== productId
    );

    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    setProducts(selectedProducts);
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getCoupons());
  }, []);

  const productState = useSelector((state) => state.product.products.data);
  const userState = useSelector((state) => state.customer.customers.data);
  const couponState = useSelector((state) => state.coupon.coupons.data);
  const cartState = useSelector((state) => state.cart);
  const printState = useSelector((state) => state?.cart?.print?.data);
  const [payurl, setPayurl] = useState(cartState?.momo?.data?.payUrl);

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

  useEffect(() => {
    if (searchTerm1) {
      const results = userState?.filter((pro) =>
        pro.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomer(results || []);
    } else {
      setFilteredCustomer(userState || []);
    }
  }, [searchTerm1, userState]);

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setProducts(storedProducts);
  }, []);

  const handleAddProduct = (selectedProduct) => {
    let selectedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    if (
      !selectedProducts.find((product) => product._id === selectedProduct._id)
    ) {
      const updatedProduct = {
        ...selectedProduct,
        selectedColor: "",
        count: 1,
      };
      selectedProducts.push(updatedProduct);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
      setProducts(selectedProducts);
    }
  };

  const handleColorChange = (productId, color) => {
    const storedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];

    const updatedProducts1 = storedProducts.map((product) => {
      if (product._id === productId && product.selectedColor) {
        const co = product.colors.find(
          (item) => item.name === product.selectedColor
        );
        dispatch(
          deleteProductfromCart({ productId: product._id, color: co.name })
        );
      }
      return product;
    });

    const updatedProducts = storedProducts.map((product) => {
      if (product._id === productId) {
        product["selectedColor"] = color;
        const co = product.colors.find((item) => item.name === color);
        dispatch(
          AddProdToCart({
            _id: product._id,
            count: product.count,
            color: co.name,
          })
        );
      }
      return product;
    });

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleCountChange = (productId, newCount) => {
    const storedProducts =
      JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = storedProducts.map((product) => {
      if (product._id === productId) {
        if (product.selectedColor) {
          product["count"] = newCount;
          const co = product.colors.find(
            (item) => item.name === product.selectedColor
          );
          console.log(co);
          dispatch(
            updatecountCart({
              productId: product._id,
              newQuantity: newCount,
              color: co.name,
            })
          );
        } else {
          toast.info("Vui lòng chọn màu");
        }
      }
      return product;
    });
    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < products.length; index++) {
      sum = sum + Number(products[index].price * products[index].count);
      setTotal(sum);
    }
    setTotal(sum);
  }, [products, total]);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (coupon) {
      let sum = Number(total) - (Number(total) * Number(coupon)) / 100;
      setTotalAmount(sum);
    } else {
      let sum = Number(total);
      setTotalAmount(sum);
    }
  }, [total, coupon]);
  const [value, setValue] = useState("");

  const formatDisplay = (input) => {
    if (!input) return "";
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setValue(numericValue);
  };

  useEffect(() => {
    if (value > totalAmount) {
      let sum = Number(value) - Number(totalAmount);
      setChange(sum);
    } else {
      setChange(null);
    }
  }, [totalAmount, value]);

  const [loading, setLoading] = useState();

  const createOrder = async () => {
    if (infor.length <= 3) {
      toast.info("Vui lòng thêm thông tin khách hàng");
      return;
    }
    if (value === "" && payment === "off") {
      toast.info("Vui lòng nhập tiền khách đưa");
      return;
    }
    if (payment === "off") {
      try {
        setLoading(true);
        const response = await dispatch(
          cashOrderUser({
            userId: process.env.AdminId,
            totalAmount: totalAmount,
            orderAddress: infor,
          })
        );
        localStorage.setItem("orderId", response.payload.data._id);
      } catch (error) {
        console.error("Lỗi khi dispatch:", error);
      } finally {
        setLoading(false);
        setIsDisabled(false);
      }
    }
    if (payment === "on") {
      dispatch(
        paymentMoMoSlice({
          userId: process.env.AdminId,
          totalAmount: totalAmount,
          orderAddress: infor,
        })
      );
    }
  };

  const printInvoice = () => {
    const orderId = localStorage.getItem("orderId");
    dispatch(
      printOrderSlice({ orderId: orderId, customerName: name, phone: phone })
    );
    localStorage.removeItem("orderId");
    localStorage.removeItem("selectedProducts");
    setProducts([]);
    setIsDisabled(true);
    setValue("");
    setChange(null);
  };

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (printState?.orderId && printState?.date && isDisabled === false) {
      const newWindow = window.open("", "_blank", "width=1000,height=1200");

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Hóa Đơn</title>
            </head>
            <body>
              <h2 style="text-align:center;">Hóa Đơn Thanh Toán</h2>
              <p><strong>Mã đơn hàng:</strong> ${printState.orderId}</p>
              <p><strong>Ngày:</strong> ${printState.date}</p>
              <p><strong>Tên:</strong> ${printState.customerName}</p>
              <p><strong>Số điện thoại:</strong> ${printState.phone}</p>
              <hr />
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <th style="border:1px solid black; padding:5px;">Tên sản phẩm</th>
                  <th style="border:1px solid black; padding:5px;">Số lượng</th>
                  <th style="border:1px solid black; padding:5px;">Giá</th>
                </tr>
                <!-- Bạn có thể lặp qua danh sách sản phẩm của bạn ở đây -->
                ${printState.items
                  ?.map(
                    (product) => `
                  <tr>
                    <td style="border:1px solid black; padding:5px;">${
                      product.product.name
                    }</td>
                    <td style="border:1px solid black; padding:5px;">${
                      product.count
                    }</td>
                    <td style="border:1px solid black; padding:5px;">${
                      product.product.price * product.count
                    }</td>
                  </tr>
                `
                  )
                  .join("")}
              </table>
              <hr />
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
      }
    } else {
      console.error("Dữ liệu không hợp lệ: printState");
    }
  }, [printState, isDisabled]);

  useEffect(() => {
    if (payurl !== undefined) {
      window.location.href = cartState.momo.data.payUrl;
    }
    setPayurl(cartState?.momo?.data?.payUrl);
  }, [cartState, payurl]);

  // console.log(message.message);

  useEffect(() => {
    if (message.message === "false") {
      setIsDisabled(false);
    }
  }, [message.message]);

  useEffect(() => {
    if (customers) {
      setName(customers.name);
      setPhone(customers.phone);
    }
    const str = `${name} - ${phone}`;
    setInfor(str);
  }, [name, phone, customers]);

  const [showScanner, setShowScanner] = useState(false);
  const [qrData, setQrData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      setShowScanner(false);
    }
  };
  useEffect(() => {
    if (qrData) {
      const prod = productState.find((item) => item._id === qrData);
      console.log(prod);
      let selectedProducts =
        JSON.parse(localStorage.getItem("selectedProducts")) || [];

      if (!selectedProducts.find((product) => product._id === prod._id)) {
        const updatedProduct = {
          ...prod,
          selectedColor: "",
          count: 1,
        };
        selectedProducts.push(updatedProduct);
        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(selectedProducts)
        );
        setProducts(selectedProducts);
      }
    }
    setQrData("");
  }, [productState, qrData]);
  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && (
        <div className="loading-container">
          <div className="loading-text">Đang tạo đơn hàng...</div>
        </div>
      )}
      <div className="counter-container">
        <div className="counter-header">
          <div className="w-50 d-flex align-items-center gap-10">
            <Typeahead
              id="search-orders"
              onChange={(selected) => {
                if (selected.length > 0) {
                  const selectedProduct = selected[0];
                  setSearchTerm(selectedProduct.name);
                  handleAddProduct(selectedProduct);
                } else {
                  setSearchTerm("");
                }
              }}
              options={productState || []}
              labelKey={(option) => option.name}
              placeholder="🔍 Tìm kiếm sản phẩm..."
              selected={searchResults}
              onInputChange={(text) => setSearchTerm(text)}
              className="typehead"
              renderMenuItemChildren={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={option.images[0]?.url}
                    alt={option.name}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 10,
                      objectFit: "cover",
                    }}
                  />
                  <div className="d-flex gap-10">
                    <div style={{ fontWeight: "bold" }}>{option.name}</div>
                    <div style={{ color: "green" }}>{option.price} VNĐ</div>
                    <div> Còn lại: {option.quantity}</div>
                  </div>
                </div>
              )}
            />
            <Link to="/admin">
              <GoHome className="fs-3" />
            </Link>
            <button onClick={() => setShowScanner(true)}>
              <BsQrCodeScan className="fs-4 text-dark" />
            </button>

            {qrData && (
              <div>
                <h3>Kết quả QR Code:</h3>
                <p>{qrData}</p>
              </div>
            )}
          </div>
        </div>

        <div className="counter-main">
          <div className="counter-product-list">
            {products.name}
            <table>
              <thead>
                <tr>
                  <th>MÃ</th>
                  <th>ẢNH</th>
                  <th>TÊN SẢN PHẨM</th>
                  <th>MÀU</th>
                  <th>SỐ LƯỢNG</th>
                  <th>ĐƠN GIÁ</th>
                  <th>THÀNH TIỀN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(products) &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                        <div className="counter-product-image">
                          <img src={product?.images[0]?.url} alt="" />
                        </div>
                      </td>
                      <td>{product.name}</td>

                      <td>
                        <div className="d-flex align-items-center gap-10">
                          <select
                            className="select"
                            onChange={(e) =>
                              handleColorChange(product._id, e.target.value)
                            }
                          >
                            <option>Chọn màu</option>
                            {product.colors.map((item, index) => {
                              return (
                                <option value={item.name}>{item.name}</option>
                              );
                            })}
                          </select>
                        </div>
                      </td>

                      <td>
                        <input
                          type="number"
                          value={product.count}
                          onChange={(e) =>
                            handleCountChange(product._id, e.target.value)
                          }
                        />
                      </td>
                      <td>{product.price.toLocaleString()} đ</td>
                      <td className="tw-text-blue-600">
                        {(product.price * product.count).toLocaleString()}đ
                      </td>
                      <td>
                        <button
                          className="counter-delete-btn"
                          onClick={() => handleRemove(product._id)}
                        >
                          <RiDeleteBin6Line className="fs-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {showScanner && (
              <div className="qrscan">
                <QrReader
                  constraints={{ facingMode: "environment" }}
                  onResult={(result, error) => {
                    if (result) {
                      handleScan(result.text);
                    }
                    if (error) {
                      handleError(error);
                    }
                  }}
                />
                <button onClick={() => setShowScanner(false)}>
                  Đóng Camera
                </button>
              </div>
            )}
          </div>
          <div className="counter-order-summary">
            <div className="summary-header d-flex align-items-center gap-10 position-relative">
              <Typeahead
                id="search-orders"
                onChange={(selected) => {
                  if (selected.length > 0) {
                    const selectedCustomerName = selected[0];
                    const selectCustomer = userState.find(
                      (pro) => pro.name === selectedCustomerName
                    );
                    if (selectCustomer) {
                      setSearchTerm1(selectCustomer.name);
                      setCustomers(selectCustomer);
                    }
                  } else {
                    setSearchTerm1("");
                  }
                }}
                options={userState?.map((pro) => pro.name) || []}
                placeholder="🔍 Tìm kiếm hoặc thêm khách hàng..."
                selected={searchResults1}
                onInputChange={(text) => setSearchTerm(text)}
                className="typehead"
              />
              <button
                className="add-customer position-absolute"
                onClick={() => setClick(!click)}
              >
                +
              </button>
              {/* <input type="text" placeholder="Tìm kiếm hoặc thêm khách hàng" className='' /> */}
            </div>
            {customers ? (
              <div className="customer-order d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10 tw-w-96">
                  <h3>{customers.name}</h3>
                  <p>- {customers.phone}</p>
                </div>
                <button onClick={() => setCustomers("")}>x</button>
              </div>
            ) : (
              click && (
                <div className="customer-order d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-10 tw-w-96">
                    <input
                      type="text"
                      placeholder="Nhập tên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="tw-bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="tw-bg-white"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setName("");
                      setPhone("");
                      setClick(!click);
                    }}
                  >
                    x
                  </button>
                </div>
              )
            )}

            <hr />
            <div className="total">
              <p>Tổng tiền:</p>
              {total ? (
                <strong style={{ color: "blue" }}>
                  {total?.toLocaleString()} đ
                </strong>
              ) : (
                <strong style={{ color: "blue" }}>0</strong>
              )}
            </div>
            <div className="total">
              <p>Voucher: </p>
              <button style={{ color: "red" }} onClick={handleShow}>
                Click vào để chọn
              </button>
              <p className="mt-3">Giảm giá voucher:</p>
              {coupon ? (
                <span style={{ "font-weight": "bold" }}>
                  {coupon?.toLocaleString()} %
                </span>
              ) : (
                <span style={{ "font-weight": "bold" }}>0</span>
              )}
            </div>
            {showModal && (
              <VoucherModal
                show={showModal}
                handleClose={handleClose}
                data={couponState}
                setCoupon={setCoupon}
              />
            )}
            <div className="total">
              <p>Khách phải trả:</p>
              {totalAmount ? (
                <strong style={{ color: "blue" }}>
                  {totalAmount?.toLocaleString()} đ
                </strong>
              ) : (
                <strong style={{ color: "blue" }}>0</strong>
              )}
            </div>
            <div className="total">
              <p>Tiền khách đưa:</p>
              <input
                type="text"
                id="numberInput"
                value={formatDisplay(value)}
                onChange={handleChange}
                placeholder="VNĐ"
              />
            </div>
            <div className="total">
              <p>Tiền thừa trả khách:</p>
              {value && change ? (
                <strong>{change?.toLocaleString()} đ</strong>
              ) : (
                <strong>0</strong>
              )}
            </div>
            <div className="counter-payment-method d-flex justify-content-between">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="off"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Tiền mặt
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="on"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Chuyển khoản
                </label>
              </div>
            </div>
            <button className="counter-pay-btn" onClick={createOrder}>
              THANH TOÁN
            </button>
            <button
              className="counter-pay-btn"
              style={{
                background: "green",
                marginTop: "10px",
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? "not-allowed" : "",
              }}
              disabled={isDisabled}
              onClick={printInvoice}
            >
              HOÀN THÀNH
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Counter;
