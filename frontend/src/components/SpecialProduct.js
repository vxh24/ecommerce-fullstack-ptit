import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, price, totalRating, sold, quantity, id, image } = props;
  return (
    <div className='col-6 mb-3'>
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src={image[0].url} className='img-fluid' alt="watch" />
          </div>
          <div className='sepcial-product-content'>
            <h5 className='brand'>{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={totalRating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price"><span className="red-p">$100.00</span> &nbsp; <strike>${price}</strike></p>
            <div className="disconut-till d-flex align-items-center gap-10">
              <p className='mb-0'><b> 5 </b>days</p>
              <div className="d-flex gap-10 align-items-center">
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>:
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>:
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>
              </div>

            </div>
            <div className="prod-count my-3">
              <p>Product: {quantity}</p>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ width: `${(sold / (sold + quantity)) * 100}%` }}
                  aria-valuenow={sold} aria-valuemin={quantity} aria-valuemax={sold + quantity}></div>
              </div>
            </div>
            <Link className='button' to={"/product/" + id}>View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialProduct