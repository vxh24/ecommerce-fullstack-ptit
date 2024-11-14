import React from 'react';
import moment from "moment";
const OrderDetailCard = ({ order }) => {
  return (
    <div>
      <h4 className='mb-4'>Order Details</h4>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Total Amount:</strong> {order.paymentIndent.amount}</p>
      <p><strong>Date:</strong> {moment(order.created_at).format('MMMM Do YYYY, h:mm a')}</p>
      <p><strong>Status:</strong> {order.orderStatus}</p>
      <div className="col-12">
        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
          <h4 className='cart-col-1'>Product</h4>
          <h4 className='cart-col-2'>Price</h4>
          <h4 className='cart-col-3'>Quantity</h4>
          <h4 className='cart-col-4'>Total</h4>
        </div>
        {
          order?.products && order?.products?.map((item, index) => {
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

                  </div>
                </div>
                <div className='cart-col-2'>
                  <h5 className="price">$ {item?.product?.price}</h5>
                </div>
                <div className='cart-col-3 d-flex align-items-center gap-15'>
                  <div className="">
                    <h5 className="price">{item?.count}</h5>
                  </div>
                </div>
                <div className='cart-col-4'>
                  <h5 className="price">$ {item?.product?.price * item?.count}</h5>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};


export default OrderDetailCard