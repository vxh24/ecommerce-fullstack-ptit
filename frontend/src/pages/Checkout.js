import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from "react-router-dom";
import { RiCoupon3Line } from "react-icons/ri";
import { FcShipped } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { cashOrderUser, getAddressSlice, getUserCart } from '../features/user/userSlice';
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineKeyboardReturn } from "react-icons/md";
const Checkout = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector(state => state?.auth?.cartUser?.result);
  const productState = useSelector((state) => state?.product?.products?.data);
  const [totalAmount, setTotalAmount] = useState(null);
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [payment, setpayment] = useState(false);
  const [address, setAddress] = useState([]);
  const [addressSelect, setAddressSelect] = useState(null);
  const addressState = useSelector(state => state?.auth?.address?.data?.address);
  useEffect(() => {
    dispatch(getAddressSlice());
  }, [])
  useEffect(() => {
    let Address = addressState?.find((item) => item.isDefault === true);
    setAddress(Address)
  }, [addressState])
  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserCart())
    }, 100)
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
    dispatch(cashOrderUser({ COD: true, couponApplied: false }))
    setTimeout(() => {
      dispatch(getUserCart())
    }, 100)
  }
  const handleAddressChange = (address) => {
    setAddressSelect(address);
  };
  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Checkout" />
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
                    <button className='button-checkout'>+Thêm địa chỉ mới</button>
                    <button onClick={() => setClick(true)} className='button-checkout1'>Thay đổi</button>

                  </div>
                </div>
                {
                  addressSelect ? (
                    <div className="d-flex flex-column gap-15 mb-3">
                      <div className="address-item" key={addressSelect?._id}>
                        <div className="address-details">

                          <strong className="address-name">{addressSelect?.name}</strong>
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

                            <strong className="address-name">{address?.name}</strong>
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
                    <div className="d-flex flex-column gap-15 py-3 ps-3">
                      {addressState?.slice() // Tạo một bản sao
                        .sort((a, b) => b.isDefault - a.isDefault)?.map((address) => (

                          <div className="form-check">
                            <input value={address} onChange={() => handleAddressChange(address)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label className="form-check-label" for="flexRadioDefault2">
                              {address.name}- {address.phone}, {address.specificAddress}, {address.commune}, {address.district}, {address.city}
                            </label>
                          </div>
                        ))}
                      <div className='w-30'>
                        <button onClick={() => setClick(false)} className='button-checkout1 text-dark'>Đóng</button>
                      </div>


                    </div>
                  )
                }
                {/* <form action="" className='d-flex flex-wrap gap-15 justify-content-between'>
                  <div className="w-100">
                    <select className='form-control form-select' name="" id="">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input type="text" className="form-control" placeholder='First Name' />
                  </div>
                  <div className="flex-grow-1">
                    <input type="text" className="form-control" placeholder='Last Name' />
                  </div>
                  <div className="w-100">
                    <input type="text" className="form-control" placeholder='Address' />
                  </div>
                  <div className="w-100">
                    <input type="text" className="form-control" placeholder='Apartment' />
                  </div>
                  <div className='flex-grow-1'>
                    <input type="text" className="form-control" placeholder='City' />
                  </div>
                  <div className='flex-grow-1'>
                    <select className='form-control form-select' name="" id="">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className='flex-grow-1'><input type="text" className="form-control" placeholder='Zip Code' /></div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className='text-dark'><MdOutlineKeyboardReturn className='me-2' />Return To Cart</Link>
                      <Link onClick={createOrder} className='button'>Continue to Shipping </Link>
                    </div>
                  </div>
                </form> */}
                <div className='d-flex justify-content-between border-bottom'>
                  <div className='d-flex gap-10'>
                    <FcShipped className='fs-3' />
                    <p className='mb-0 bold-text'>Đơn vị vận chuyển</p>
                  </div>
                  <div className='mb-3'>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Hỏa tốc - đ50.000
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Giao hàng nhanh - đ30.000
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Giao hàng tiết kiệm - đ20.000
                      </label>
                    </div>
                  </div>
                </div>
                <div className='mt-3 d-flex gap-30 mb-3'>
                  <div className='d-flex align-items-center gap-10'>
                    <RiCoupon3Line className='text-red fs-3' />
                    <p className='mb-0'>Voucher</p>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0 voucher'>Chọn hoặc nhập mã</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className='border-bottom py-4'>
                {
                  userCartState?.products && userCartState?.products?.map((item, index) => {
                    const product = productState?.find(productItem => productItem?._id === item?.product);
                    return (
                      <div key={index} className='d-flex mb-2 gap-15 align-items-center justify-content-between'>
                        <div className='w-75 d-flex gap-10' >
                          <div className='w-25 position-relative'>
                            <span style={{ top: "-15px", right: "-4px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.count}</span>
                            <img src="images/watch.jpg" className='img-fluid' alt="" />
                          </div>
                          <div>
                            <h5 className="total">{product?.title}</h5>
                            <p className='total-price' style={{ backgroundColor: item?.color }} ></p>
                          </div>
                        </div>
                        <div>
                          <h5 className='total-price'>$ {item?.price * item?.count}</h5>
                        </div>
                      </div>
                    )
                  })
                }

              </div>
              <div className=' py-4'>
                <div className='d-flex align-items-center justify-content-between'>
                  <p className='total'>SubTotal:</p>
                  <p className='total-price'>$ {totalAmount}</p>
                </div>
                {/* <div className='d-flex align-items-center justify-content-between'>
                  <p className='mb-0 total'>Shipping:</p>
                  <p className='mb-0 total-price'>$ 15</p>
                </div> */}
              </div>
              {/* <div className='d-flex align-items-center justify-content-between border-bottom py-4' >
                <h4 className='total'>Total:</h4>
                <h5 className='total-price'>$ 100</h5>
              </div> */}
            </div>
            <div className='col-12 border-top bg-white'>
              <div className='d-flex mt-3 gap-15 mb-3 border-bottom'>
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
              <div className='d-flex justify-content-end py-3'>

                <div>
                  <p className='bold-text'>Tổng tiền hàng : đ 2322233</p>
                  <p className='bold-text'>Tổng giảm giá</p>
                  <p className='bold-text'>Tổng phí vận chuyển</p>
                  <p className='bold-text'>Tổng thanh toán</p>
                </div>
              </div>
              <div className='d-flex justify-content-between py-3'>
                <Link to="/product" className='text-dark'><MdOutlineKeyboardReturn className='me-2' />Continue Shopping</Link>
                <button className='button border-0'>
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