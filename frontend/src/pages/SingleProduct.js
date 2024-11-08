import React, { useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from "../components/ProductCard"
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color"
import { Link, useLocation } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
const SingleProduct = () => {
  const [orderProduct, setorderProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log('text', text)
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div>
                  <img src="https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp" alt="" />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap gap-15">
                <div><img src="https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp" className='img-fluid' alt="" /></div>
                <div><img src="https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp" className='img-fluid' alt="" /></div>
                <div><img src="https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp" className='img-fluid' alt="" /></div>
                <div><img src="https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp" className='img-fluid' alt="" /></div>

              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className='title'>iPhone 16 Pro Max 512GB Chính hãng VN/A</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className='price'> $ 100 </p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className='mb-0 t-review'>(2 reviews)</p>
                  </div>
                  <a href='#review' className='review-btn'>Write a Review</a>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Type:</h3>
                    <p className='product-data'>iphone</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Branch:</h3>
                    <p className='product-data'>Apple</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Category:</h3>
                    <p className='product-data'>Smart Phone</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Tags:</h3>
                    <p className='product-data'>Moblie</p>
                  </div>
                  <div className="d-flex flex-column gap-10 mt-2 mb-3">
                    <h3 className='product-heading'>Size:</h3>
                    <div className="d-flex flex-wrap gap-15 ">
                      <span className="badge border text-dark border-1 bg-white border-secondary">S</span>
                      <span className="badge border text-dark border-1 bg-white border-secondary">M</span>
                      <span className="badge border text-dark border-1 bg-white border-secondary">XL</span>
                      <span className="badge border text-dark border-1 bg-white border-secondary">XXL</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 mt-2 mb-3">
                    <h3 className='product-heading'>Color:</h3>
                    <Color />
                  </div>
                  <div className="d-flex flex-row gap-10 mt-2 mb-3 align-items-center">
                    <h3 className='product-heading'>Quantity:</h3>
                    <div className="">
                      <input type="number" name="" min={1} max={10} className="form-control" style={{ width: "70px" }} id="" />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button className="button border-0">Add to Cart</button>
                      <button className='button signup' >By it now</button>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-15'>
                    <div>
                      <IoGitCompareSharp className='fs-5 me-2' />
                      <a href=''>Add to compare</a>

                    </div>
                    <div>
                      <FaRegHeart className='fs-5 me-2' />
                      <a href=''>Add to wishlis</a>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 my-3">
                    <h3 className='product-heading'>Shipping and Refund</h3>
                    <p className='product-data'>Shipping nhanh chóng và đảm bảo an toàn, giúp sản phẩm đến tay khách hàng trong thời gian ngắn nhất.<br />Chính sách hoàn tiền linh hoạt và minh bạch, hỗ trợ hoàn trả dễ dàng nếu sản phẩm không đạt yêu cầu</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-3">
                    <h3 className='product-heading'>Copy Product Link:</h3>
                    <a href='javascrip:void(0);' onClick={() => { copyToClipboard("https://uscom.vn/wp-content/uploads/2024/09/iPhone-16-Pro-Max-Trang-2.webp"); }}>Click here to copy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Descriotion</h4>
              <div className='bg-white p-3'>

                <p  >
                  Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="review" className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4> Customer Review</h4>
                    <div className='d-flex gap-10 align-items-center'>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className='mb-0'>Base on 2 reviews</p>
                    </div>
                  </div>
                  {orderProduct && (
                    <div>
                      <a href='' className='text-dark text-decoration-underline'>Write a Review</a>
                    </div>
                  )}
                </div>
                <div className="review-form py-4">
                  <h4>Write a review</h4>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div>
                      <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder='Comments'></textarea>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <button className='button border-0'> Submit Review</button>
                    </div>
                  </form>
                </div>
                <div className='reviews mt-4'>
                  <div className="review ">
                    <div className='d-flex gap-10 align-items-center'>
                      <h6 className='mb-0'>abc</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className='mt-3'>Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Our Popular Products
              </h3>
            </div>
            <div className="row">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleProduct