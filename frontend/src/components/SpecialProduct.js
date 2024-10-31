import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = () => {
  return (
    <div className='col-6 mb-3'>
      <div className="special-product-card">
        <div className="d-flex justify-content-betweem">
          <div>
            <img src="images/watch.jpg" className='img-fluid' alt="watch" />
          </div>
          <div className='sepcial-product-content'>
            <h5 className='brand'>Havels</h5>
            <h6 className="title">Tai nghe không dây Tai nghe bluetooth....</h6>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price"><span className="red-p">$100.00</span> &nbsp; <strike>$200</strike></p>
            <div className="disconut-till d-flex align-items-center gap-10">
              <p className='mb-0'><b> 5 </b>days</p>
              <div className="d-flex gap-10 align-items-center">
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>:
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>:
                <span className='bagde rounded-circle p-3 bg-danger'>1</span>
              </div>

            </div>
            <div className="prod-count my-3">
              <p>Product: 5</p>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{ "width": "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <Link className='button'>Add To Card</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialProduct