import React, { useEffect, useState } from 'react'
import { GoHome } from "react-icons/go";
import { Link } from 'react-router-dom';
import { BsQrCodeScan } from "react-icons/bs";
import { ToastContainer } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getUsers } from '../features/customers/customerSlice';
import { getCoupons } from '../features/coupon/couponSlice';
import VoucherModal from '../components/VoucherModal';
import { AddProdToCart, cashOrderUser, deleteProductfromCart, paymentMoMoSlice, updatecountCart } from '../features/cart/CartSlice';
import { toast } from 'react-toastify';
const Counter = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
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
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const updatedProducts = selectedProducts.map((product) => {
      if (product._id === productId) {
        const co = product.colors.find((item) => item.title === product.selectedColor)
        dispatch(deleteProductfromCart({ productId: product._id, color: co._id }))
      }
      return product;
    });
    selectedProducts = selectedProducts.filter(product => product._id !== productId);

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    setProducts(selectedProducts);
  };
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getCoupons());
  }, []);
  const productState = useSelector((state) => state.product.products.data);
  const userState = useSelector((state) => state.customer.customers.data);
  const couponState = useSelector((state) => state.coupon.coupons.data)
  const cartState = useSelector((state) => state.cart)
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
    const storedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    setProducts(storedProducts);
  }, []);
  const handleAddProduct = (selectedProduct) => {
    let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    if (!selectedProducts.find(product => product._id === selectedProduct._id)) {
      const updatedProduct = {
        ...selectedProduct,
        selectedColor: "",
        count: 1,
      };
      selectedProducts.push(updatedProduct);
      localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      setProducts(selectedProducts);
    }
  };
  const handleColorChange = (productId, color) => {
    const storedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts1 = storedProducts.map((product) => {
      if (product._id === productId && product.selectedColor) {
        const co = product.colors.find((item) => item.title === product.selectedColor)
        dispatch(deleteProductfromCart({ productId: product._id, color: co._id }))
      }
      return product;
    });
    const updatedProducts = storedProducts.map((product) => {
      if (product._id === productId) {
        product["selectedColor"] = color;
        const co = product.colors.find((item) => item.title === color)
        dispatch(AddProdToCart({ _id: product._id, count: product.count, color_id: co._id }))
      }
      return product;
    });

    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

  }
  const handleCountChange = (productId, newCount) => {
    const storedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    const updatedProducts = storedProducts.map((product) => {
      if (product._id === productId) {
        product["count"] = newCount;
        const co = product.colors.find((item) => item.title === product.selectedColor)
        dispatch(updatecountCart({ productId: product._id, newQuantity: newCount, colorId: co._id }))
      }
      return product;
    });
    localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

  }
  console.log(total);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < products.length; index++) {
      sum = sum + Number(products[index].price * products[index].count);
      setTotal(sum);
    }
  }, [products])
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    if (coupon) {
      let sum =
        Number(total) -
        (Number(total) * Number(coupon)) / 100
      setTotalAmount(sum);
    }
    else {
      let sum = Number(total)
      setTotalAmount(sum);
    }
  }, [total, coupon])
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
    }
    else {
      setChange(null)
    }
  }, [totalAmount, value])
  const createOrder = () => {
    if (value === "" && payment === "off") {
      toast.info("Vui lòng nhập tiền khách đưa")
      console.log("Vui lòng nhập tiền khách đưa");
      return;
    }
    if (payment === "off") {
      dispatch(
        cashOrderUser({ totalAmount: totalAmount, orderAddress: "Trực tiếp" })
      );
    }
    if (payment === "on") {
      dispatch(
        paymentMoMoSlice({
          totalAmount: totalAmount,
          orderAddress: "",
        })
      );
    }
  };
  useEffect(() => {
    if (payurl !== undefined) {
      window.location.href = cartState.momo.data.payUrl;
    }
    setPayurl(cartState?.momo?.data?.payUrl);
  }, [cartState, payurl]);
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
      <div className="counter-container">
        {/* Header */}
        <div className="counter-header">
          <div className='w-50 d-flex align-items-center gap-10'>
            <Typeahead
              id="search-orders"
              onChange={(selected) => {
                if (selected.length > 0) {
                  const selectedProductName = selected[0];
                  const selectedProduct = productState.find(
                    (pro) => pro.name === selectedProductName
                  );
                  if (selectedProduct) {
                    setSearchTerm(selectedProduct.name);
                    handleAddProduct(selectedProduct);
                  }
                } else {
                  setSearchTerm("");
                }
              }}
              options={productState?.map((pro) => pro.name) || []}
              placeholder="🔍 Tìm kiếm sản phẩm..."
              selected={searchResults}
              onInputChange={(text) => setSearchTerm(text)}
              className="typehead"
            />
            <Link to="/admin"><GoHome className='fs-3' /></Link>
            <button><BsQrCodeScan className='fs-4 text-dark' /></button>
          </div>

        </div>

        {/* Main Content */}
        <div className="counter-main">
          {/* Product List */}
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
                {Array.isArray(products) && products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>
                      <div className="counter-product-image">
                        <img src={product.images[0].url} alt="" />
                      </div>
                    </td>
                    <td>{product.name}</td>

                    <td>
                      <div className='d-flex align-items-center gap-10'>
                        <select className="select"
                          onChange={(e) => handleColorChange(product._id, e.target.value)}
                        >
                          {product.colors.map((item, index) => {
                            return (
                              <option value={item.title} style={{ background: item.title }}></option>
                            )
                          })}

                        </select>
                        <span style={{ backgroundColor: product.selectedColor, display: 'inline-block', width: '30px', height: '30px', border: '1px solid #ccc', borderRadius: "50%" }}>
                        </span>
                      </div>
                    </td>

                    {/* <td>{product.selectedColor}</td> */}
                    < td >
                      <input type="number" value={product.count} onChange={(e) => handleCountChange(product._id, e.target.value)} />
                    </td>
                    <td>{product.price.toLocaleString()} đ</td>
                    <td className='tw-text-blue-600'>
                      {/* {product.total.toLocaleString()}  */}
                      {(product.price * product.count).toLocaleString()}
                      đ</td>
                    <td>
                      <button className="counter-delete-btn" onClick={() => handleRemove(product._id)}>
                        <RiDeleteBin6Line className='fs-3' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Order Summary */}
          <div className="counter-order-summary">
            <div className='summary-header d-flex align-items-center gap-10'>
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
                      // handleAddProduct(selectedProduct);
                      setCustomers(selectCustomer)
                    }
                  } else {
                    setSearchTerm1("");
                  }
                }}
                options={userState?.map((pro) => pro.name) || []}
                placeholder="🔍 Tìm kiếm khách hàng..."
                selected={searchResults1}
                onInputChange={(text) => setSearchTerm(text)}
                className="typehead"
              />
              {/* <input type="text" placeholder="Tìm kiếm hoặc thêm khách hàng" className='' /> */}
            </div>
            {customers && (
              <div className='customer-order d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center gap-10 tw-w-96'>
                  <h3>{customers.name}</h3>
                  <p>- {customers.phone}</p>
                </div>
                <button onClick={() => setCustomers(null)}>x</button>
              </div>
            )}


            <hr />
            <div className='total'>
              <p>Tổng tiền:</p>
              {total ? (<strong style={{ color: "blue" }}>
                {total?.toLocaleString()} đ</strong>) : (<strong style={{ color: "blue" }}>
                  0</strong>)}
            </div>
            <div className='total'>
              <p>Voucher: </p>
              <button style={{ color: "red" }} onClick={handleShow} >Click vào để chọn</button>
              <p className='mt-3'>Giảm giá voucher:</p>
              {coupon ? (<span style={{ "font-weight": "bold" }}>{coupon?.toLocaleString()} %</span>) : (<span style={{ "font-weight": "bold" }}>0</span>)}
            </div>
            {showModal && (
              <VoucherModal
                show={showModal}
                handleClose={handleClose}
                data={couponState}
                setCoupon={setCoupon}
              />
            )}
            <div className='total'>
              <p>Khách phải trả:</p>
              {totalAmount ? (<strong style={{ color: "blue" }}>
                {totalAmount?.toLocaleString()} đ</strong>) : (<strong style={{ color: "blue" }}>
                  0</strong>)}

            </div>
            <div className='total'>
              <p>Tiền khách đưa:</p>
              <input type="text"
                id="numberInput"
                value={formatDisplay(value)}
                onChange={handleChange}
                placeholder="VNĐ"
              />
            </div>
            <div className='total'>
              <p>Tiền thừa trả khách:</p>
              {(value && change) ? (<strong>
                {change?.toLocaleString()} đ</strong>) : (<strong>
                  0</strong>)}
            </div>
            <div className="counter-payment-method d-flex justify-content-between">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="off" onChange={(e) => setPayment(e.target.value)} />
                <label class="form-check-label" for="flexRadioDefault1">
                  Tiền mặt
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="on" onChange={(e) => setPayment(e.target.value)} />
                <label class="form-check-label" for="flexRadioDefault2">
                  Chuyển khoản
                </label>
              </div>
            </div>
            <button className="counter-pay-btn" onClick={createOrder}>THANH TOÁN</button>
          </div>
        </div >
      </div >
    </>
  );
}
export default Counter