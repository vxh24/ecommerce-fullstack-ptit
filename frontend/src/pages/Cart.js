import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
const Cart = () => {
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
              <div className="cart-data py-3 d-flex justify-content-between align-items-center">
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
              </div>
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between">
                <div>
                  <Link to="/product" className="button">Continue Shopping</Link>
                </div>
                <div>
                  <h4>SubTotal: $ 100</h4>
                  <p>s a valid value to be accessible. Provide a valid, </p>
                  <Link to="/checkout" className='button'>Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart 