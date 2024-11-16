import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart } from '../features/user/userSlice';
const Cart = () => {
  const dispatch = useDispatch();
  const userCartState = useSelector(state => state?.auth?.cartUser?.data);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    dispatch(getUserCart())
    setTimeout(() => {
      dispatch(getUserCart())
    }, 300)
  }, [])
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.products?.length; index++) {
      sum = sum + (Number(userCartState.products[index].count) * userCartState.products[index].price)
      setTotalAmount(sum);
    }
  }, [userCartState])
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className='cart-col-1'>Product</h4>
                <h4 className='cart-col-2'>Price</h4>
                <h4 className='cart-col-3'>Quantity</h4>
                <h4 className='cart-col-4'>Total</h4>
              </div>
              {
                userCartState?.products && userCartState?.products?.map((item, index) => {
                  return (
                    <div key={index} className="cart-data py-3 d-flex justify-content-between align-items-center">
                      <div className='cart-col-1 gap-15 d-flex justify-content-between align-items-center'>
                        <div className='w-25'>
                          <img src="images/watch.jpg" className='img-fluid' alt="" />
                        </div>
                        <div className='w-75'>
                          <p>{item?.product?.title}</p>
                          <p className="d-flex gap-15">Color:
                            <ul className='colors ps-0'>
                              <li style={{ backgroundColor: item?.color }}></li>
                            </ul>
                          </p>
                          <p >Size: M</p>

                        </div>
                      </div>
                      <div className='cart-col-2'>
                        <h5 className="price">$ {item?.price}</h5>
                      </div>
                      <div className='cart-col-3 d-flex align-items-center gap-15'>
                        <div className="">
                          <input type="number" name="" min={1} max={10} className="form-control" style={{ width: "70px" }} id=""
                            value={item?.count} />
                        </div>
                        <div>
                          <MdDelete className='text-danger fs-4' />
                        </div>
                      </div>
                      <div className='cart-col-4'>
                        <h5 className="price">$ {item?.price * item?.count}</h5>
                      </div>
                    </div>
                  )
                })
              }
              {/* <div className="cart-data py-3 d-flex justify-content-between align-items-center">
                <div className='cart-col-1 gap-15 d-flex justify-content-between align-items-center'>
                  <div className='w-25'>
                    <img src="images/watch.jpg" className='img-fluid' alt="" />
                  </div>
                  <div className='w-75'>
                    <p>sdhbshd</p>
                    <p >Color: sdsds</p>
                    <p >Size: M</p>

                  </div>
                </div>
                <div className='cart-col-2'>
                  <h5 className="price">$ 100</h5>
                </div>
                <div className='cart-col-3 d-flex align-items-center gap-15'>
                  <div className="">
                    <input type="number" name="" min={1} max={10} className="form-control" style={{ width: "70px" }} id="" />
                  </div>
                  <div>
                    <MdDelete className='text-danger fs-4' />
                  </div>
                </div>
                <div className='cart-col-4'>
                  <h5 className="price">$ 100</h5>
                </div>
              </div> */}
            </div>
            <div className="col-12 py-2 mt-4">
              {
                (totalAmount !== null || totalAmount !== 0) &&

                <div className="d-flex justify-content-between">
                  <div>
                    <Link to="/product" className="button">Continue Shopping</Link>
                  </div>
                  <div>
                    <h4>SubTotal: $ {totalAmount}</h4>
                    <p>s a valid value to be accessible. Provide a valid, </p>
                    <Link to="/checkout" className='button'>Checkout</Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart 