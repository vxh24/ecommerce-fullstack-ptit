import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from "react-router-dom";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { cashOrderUser, getUserCart } from '../features/user/userSlice';
const Checkout = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector(state => state?.auth?.cartUser?.data);
  const [totalAmount, setTotalAmount] = useState(null);

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
  return (
    <>
      <Meta title={"Checkout"} />
      <BreadCrumb title="Checkout" />
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h5 className="website-name">ECommerce PTIT</h5>
                <nav style={{ "--bs-breadcrumb-divider": " '>';" }} aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link className='text-dark total-price' to="cart">Cart</Link></li>
                    <li class="breadcrumb-item active total-price" aria-current="page">Information</li>
                    <li class="breadcrumb-item active total-price" aria-current="page">Shipping</li>
                    <li class="breadcrumb-item active total-price" aria-current="page">Payment</li>
                  </ol>
                </nav>
                <h4 className='title total'>Contact Information</h4>
                <p className='user-details'>vxh, (vxh24@gmail.com)</p>
                <h4 className='mb-3'>Shipping Address</h4>
                <form action="" className='d-flex flex-wrap gap-15 justify-content-between'>
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
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className='border-bottom py-4'>
                {
                  userCartState?.products && userCartState?.products?.map((item, index) => {
                    return (
                      <div key={index} className='d-flex mb-2 gap-15 align-items-center justify-content-between'>
                        <div className='w-75 d-flex gap-10' >
                          <div className='w-25 position-relative'>
                            <span style={{ top: "-15px", right: "-4px" }} className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>{item?.count}</span>
                            <img src="images/watch.jpg" className='img-fluid' alt="" />
                          </div>
                          <div>
                            <h5 className="total">{item?.product?.title}</h5>
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
              <div className='border-bottom py-4'>
                <div className='d-flex align-items-center justify-content-between'>
                  <p className='total'>SubTotal:</p>
                  <p className='total-price'>$ {totalAmount}</p>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                  <p className='mb-0 total'>Shipping:</p>
                  <p className='mb-0 total-price'>$ 15</p>
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between border-bottom py-4' >
                <h4 className='total'>Total:</h4>
                <h5 className='total-price'>$ 100</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;