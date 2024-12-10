import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from "react-router-dom";
import { RiCoupon3Line } from "react-icons/ri";
import { FcShipped } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { applyCouponSlice, cashOrderUser, getAddressSlice, getUserCart, momoOrderUser, paymentMoMoSlice } from '../features/user/userSlice';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import VoucherModal from '../components/VoucherModal';
import { getAllCoupon } from '../features/counpons/couponSlice';
import AddAddressForm from '../components/AddAddressForm';
const Checkout = () => {
  const authState = useSelector(state => state?.auth);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCartState = useSelector(state => state?.auth?.cartUser?.cart);
  const productState = useSelector((state) => state?.product?.products?.data);
  const [totalAmount, setTotalAmount] = useState(null);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [payment, setpayment] = useState(1);
  const [totalcoupon, setTotalcoupoon] = useState(false);
  const [shipping, setShipping] = useState(50000);
  const [coupon, setCoupon] = useState();
  const [couponN, setCouponN] = useState();
  const [totalpayment, setTotalpayment] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressSelect, setAddressSelect] = useState(null);
  const [getAddress, setGetAddress] = useState(null);
  const addressState = useSelector(state => state?.auth?.address?.data?.address);
  const couponState = useSelector(state => state?.coupon?.coupons?.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payurl, setPayurl] = useState(authState?.momo?.data?.payUrl);
  useEffect(() => {
    if (addressSelect !== null) {


      const fullAddress = `${addressSelect.specificAddress}, ${addressSelect.commune}, ${addressSelect.district}, ${addressSelect.city}`;
      setGetAddress(fullAddress);
    }
    else {
      const fullAddress = `${address?.specificAddress}, ${address?.commune}, ${address?.district}, ${address?.city}`;
      setGetAddress(fullAddress);
    }
  }, [addressSelect, address])
  useEffect(() => {
    let sum = Number(totalAmount) * Number(coupon) / 100;
    setTotalcoupoon(sum);
  }, [coupon])
  useEffect(() => {
    if (coupon) {
      let sum = Number(totalAmount) - Number(totalAmount) * Number(coupon) / 100 + Number(shipping);
      setTotalpayment(sum);
    }
    else {
      let sum = Number(totalAmount) + Number(shipping);
      setTotalpayment(sum);
    }
  }, [coupon, shipping, totalAmount])
  useEffect(() => {
    dispatch(getAddressSlice());
    dispatch(getAllCoupon());
    dispatch(getUserCart());
  }, [])
  useEffect(() => {
    let Address = addressState?.find((item) => item.isDefault === true);
    setAddress(Address)
  }, [addressState, address])
  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(getUserCart())
    // }, 200)
    dispatch(getUserCart());
  }, [])
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.products?.length; index++) {
      sum = sum + (Number(userCartState.products[index].count) * userCartState.products[index].price)
      setTotalAmount(sum);
    }
  }, [userCartState])
  const createOrder = () => {
    if (payment === 1) {
      dispatch(cashOrderUser({ totalAmount: totalpayment, orderAddress: getAddress }));
      setTimeout(() => {
        dispatch(getUserCart())
        navigate("/my-orders");
      }, 500)
    }
    if (payment === 2) {
      dispatch(paymentMoMoSlice({ totalAmount: totalpayment, orderAddress: getAddress }));
    }
  }
  useEffect(() => {
    if (authState.user === null && authState.isSuccess !== true) {
      navigate("/login");
    }
    if (payurl !== undefined) {
      window.location.href = authState.momo.data.payUrl;
    }
    setPayurl(authState?.momo?.data?.payUrl);
  }, [authState, payurl])
  const handleAddressChange = (address) => {
    setAddressSelect(address);
  };
  return (
    <>
      <Meta title={"Thanh toán"} />
      <BreadCrumb title="Thanh toán" />
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <div className='d-flex align-items-center gap-10 justify-content-between'>
                  <div className='d-flex align-items-center gap-10'>
                    <FaMapMarkerAlt />
                    <p className='mb-0 bold-text'>Địa chỉ nhận hàng</p>
                  </div>
                  <div className='d-flex gap-10'>
                    <button onClick={() => setIsModalOpen(true)} className='button-checkout'>+Thêm địa chỉ mới</button>
                    {isModalOpen && <AddAddressForm onClose={() => setIsModalOpen(false)} />}
                    <button onClick={() => setClick(true)} className='button-checkout1'>Thay đổi</button>

                  </div>
                </div>
                {
                  addressSelect ? (
                    <div className="d-flex flex-column gap-15 mb-3">
                      <div className="address-item" key={addressSelect?._id}>
                        <div className="address-details">

                          <strong className="address-name">
                            {addressSelect?.name && addressSelect?.name.charAt(0).toUpperCase() + addressSelect?.name.slice(1)}
                          </strong>
                          <span className="address-phone">- {addressSelect?.phone}</span>
                          <p className="address">{addressSelect?.specificAddress}<br />{addressSelect?.commune}, {addressSelect?.district}, {addressSelect?.city}</p>
                          <div className='d-flex align-items-center'>
                            {
                              addressSelect?.isDefault && (
                                <p className='isdefault text-center'>
                                  Mặc định
                                </p>
                              )
                            }
                          </div>


                        </div>
                      </div>

                    </div>
                  )
                    :
                    (
                      <div className="d-flex flex-column gap-15 mb-3">
                        <div className="address-item" key={address?._id}>
                          <div className="address-details">

                            <strong className="address-name">
                              {address?.name && address?.name.charAt(0).toUpperCase() + address?.name.slice(1)}
                            </strong>
                            <span className="address-phone">- {address?.phone}</span>
                            <p className="address">{address?.specificAddress}<br />{address?.commune}, {address?.district}, {address?.city}</p>
                            <div className='d-flex align-items-center'>
                              {
                                address?.isDefault && (
                                  <p className='isdefault text-center'>
                                    Mặc định
                                  </p>
                                )
                              }
                            </div>


                          </div>
                        </div>

                      </div>
                    )
                }

                {
                  click && (
                    <div className="d-flex flex-column gap-15 py-3 ps-3 bg-white mb-4">
                      {addressState?.slice() // Tạo một bản sao
                        .sort((a, b) => b.isDefault - a.isDefault)?.map((address) => (

                          <div className="form-check">
                            <input value={address} onChange={() => handleAddressChange(address)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                              checked={address._id === addressSelect?._id}
                            />
                            <label className="form-check-label" for="flexRadioDefault2">
                              {address?.name && address?.name.charAt(0).toUpperCase() + address?.name.slice(1)}- {address.phone}, {address.specificAddress}, {address.commune}, {address.district}, {address.city}
                            </label>
                          </div>
                        ))}
                      <div className='w-30'>
                        <button onClick={() => setClick(false)} className='button-checkout1 text-dark'>Đóng</button>
                      </div>


                    </div>
                  )
                }
                <div className='d-flex justify-content-between border-bottom'>
                  <div className='d-flex gap-10'>
                    <FcShipped className='fs-3' />
                    <p className='mb-0 bold-text'>Đơn vị vận chuyển</p>
                  </div>
                  <div className='mb-3'>
                    <div className="form-check mb-3">
                      <input value="50000" onChange={(e) => { setShipping(e.target.value) }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Hỏa tốc - đ50.000
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input value="30000" onChange={(e) => { setShipping(e.target.value) }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Giao hàng nhanh - đ30.000
                      </label>
                    </div>
                    <div className="form-check">
                      <input value="20000" onChange={(e) => { setShipping(e.target.value) }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Giao hàng tiết kiệm - đ20.000
                      </label>
                    </div>
                  </div>
                </div>
                <div className='mt-3 d-flex gap-30 mb-3 py-3'>
                  <div className='d-flex align-items-center gap-10 '>
                    <RiCoupon3Line className='text-red fs-3' />
                    <p className='mb-0'>Voucher</p>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0 voucher' onClick={handleShow}>Chọn hoặc nhập mã</p>
                  </div>
                  {
                    coupon && (
                      <div className='d-flex align-items-center gap-10'>
                        <p className='mb-0 text-red bold-text'>{couponN}</p>
                      </div>
                    )
                  }
                  <VoucherModal show={showModal} handleClose={handleClose} data={couponState} setCoupon={setCoupon} setCouponN={setCouponN} />
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className=' py-4'>
                {
                  userCartState?.products && userCartState?.products?.map((item, index) => {
                    const product = productState?.find(productItem => productItem?._id === item?.product);
                    return (
                      <div key={index} className='d-flex mb-2 gap-15 align-items-center justify-content-between border-bottom mb-3'>
                        <div className='w-75 d-flex gap-10' >
                          <div className='w-25 position-relative'>
                            <span style={{ top: "-15px", right: "-4px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.count}</span>
                            <img src={product?.images[0]?.url} className='img-fluid' alt="" />
                          </div>
                          <div>
                            <h5 className="total">{product?.name}</h5>
                            <p className="d-flex gap-15">Màu sắc:
                              <ul className='colors ps-0'>
                                <li style={{ backgroundColor: item?.color?.title }}></li>
                              </ul>
                            </p>
                          </div>
                        </div>
                        <div>
                          <h5 className='total-price'>{item?.price * item?.count}<span className='currency'>đ</span></h5>
                        </div>
                      </div>
                    )
                  })
                }

              </div>
            </div>
            <div className='col-12 border-top bg-white'>
              <div className='d-flex mt-3 justify-content-between mb-3 border-bottom'>
                <div className='d-flex gap-15'>
                  <div>
                    <p className='bold-text mb-0'>Phương thức thanh toán</p>
                  </div>
                  <div className=''>
                    <div className='gap-15 d-flex align-items-center checkout-pay mb-2'>
                      <button onClick={() => setClick1(true)} className={click1 ? "click1" : ""}>
                        Thanh toán online
                      </button>
                      <button onClick={() => { setClick1(false); setpayment(1) }} className={click1 ? "" : "click1"}>
                        Thanh toán khi nhận hàng
                      </button>
                    </div>
                    {
                      click1 && (
                        <div className='gap-15 d-flex align-items-center checkout-pay mb-3'>
                          <button onClick={() => { setClick2(true); setpayment(2) }} className={click2 ? "click2" : ""}>
                            Thanh toán Momo
                          </button>
                          <button onClick={() => { setClick2(false); setpayment(3) }} className={click2 ? "" : "click2"}>
                            Thanh toán Vnpay
                          </button>
                        </div>
                      )
                    }

                  </div>
                </div>
                <div className='ps-3'>
                  <div className='d-flex gap-10 align-items-center mb-2'>
                    <strong>Tổng tiền hàng:</strong> <p className='price mb-0'>{totalAmount}<span className='currency'>đ</span></p>
                  </div>
                  <div className='d-flex gap-10 align-items-center mb-2'>
                    <strong>Tổng giảm giá:</strong> <p className='price mb-0'>{coupon ? totalcoupon : 0}<span className='currency'>đ</span></p>
                  </div>
                  <div className='d-flex gap-10 align-items-center mb-2'>
                    <strong>Tổng phí vận chuyển:</strong> <p className='price mb-0'>{shipping}<span className='currency'>đ</span></p>
                  </div>
                  <p className='price'><strong>Tổng thanh toán:</strong> {totalpayment}<span className='currency'>đ</span></p>
                </div>
              </div>
              <div className='d-flex justify-content-between py-3'>
                <Link to="/product" className='d-flex text-dark align-items-center'><MdOutlineKeyboardReturn className='me-2' />Trở lại</Link>
                <button className='button border-0' onClick={createOrder}>
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;