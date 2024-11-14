import React, { useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from "../components/ProductCard"
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getAProducts, RatingProduct } from '../features/products/productSlice';
import { addToWishlist } from '../features/products/productSlice';
import { getAllColors } from '../features/color/colorSlice';
import { toast } from "react-toastify"
import { AddProdToCart, getUserCart } from '../features/user/userSlice';
import { getAllProducts } from '../features/products/productSlice';
import PopularProduct from "../components/PopularProduct";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserProductWishlist } from '../features/user/userSlice';
const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [count, setCount] = useState(1);
  const [orderProduct, setorderProduct] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
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
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.product?.data);
  const colorIds = useSelector(state => state?.product?.product?.data?.color);
  const colors = useSelector(state => state?.color?.colors?.data);
  const matchedColors = colors?.filter((color) => colorIds?.includes(color?._id)) || [];
  const cartState = useSelector(state => state?.auth?.cartUser?.data?.products);
  const popularproductState = useSelector((state) => state?.product?.products?.data);
  const wishlist = useSelector(state => state?.auth?.wishlist?.data?.wishlist);
  useEffect(() => {
    dispatch(getAProducts(getProductId));
    getColors();
    dispatch(getUserCart())
    getProducts();
    getWishlist();
  }, [])
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.product?._id) {
        setAlreadyAdded(true);
      }

    }
  })
  useEffect(() => {
    for (let index = 0; index < wishlist?.length; index++) {
      if (wishlist[index]?._id === getProductId) {
        setClick(true);
      }
      else {
        setClick(false);
      }

    }
  }, [wishlist])
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 100)
  }
  const uploadCart = () => {
    if (color === null) {
      toast.error("Please choose Color")
      return false;
    }
    else {
      dispatch(AddProdToCart({ _id: productState?._id, count, color }))
      navigate("/cart");
    }
  }

  const getColors = () => {
    dispatch(getAllColors());
  }
  const getProducts = () => {
    dispatch(getAllProducts());
  }
  const [star, setStar] = useState(null);
  const [comment, SetComment] = useState(null);
  const addToRatingProduct = () => {
    if (star === null) {
      toast.info("Mấy sao?");
      return false;
    }
    else if (comment === null) {
      toast.info("No comment?");
      return false;
    }
    else {
      dispatch(RatingProduct({ star: star, comment: comment, productId: getProductId }))
      setTimeout(() => {
        dispatch(getAProducts(getProductId));
      }, 100)
    }
    return false;
  }
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.title} />
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
                  <h3 className='title'>{productState?.title}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className='price'> $ {productState?.price} </p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalRatings}
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
                    <p className='product-data'>{productState?.brand}</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Category:</h3>
                    <p className='product-data'>{productState?.category}</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Tags:</h3>
                    <p className='product-data'>{productState?.tags}</p>
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
                  {
                    alreadyAdded === false && <>
                      <div className="d-flex flex-column gap-10 mt-2 mb-3">
                        <h3 className='product-heading'>Color:</h3>
                        <Color setColor={setColor} colorData={matchedColors} />
                      </div>
                    </>
                  }
                  <div className="d-flex flex-row gap-10 mt-2 mb-3 align-items-center">
                    {
                      alreadyAdded === false && <>
                        <h3 className='product-heading'>Quantity:</h3>
                        <div className="">
                          <input type="number" name="" min={1} max={productState?.quantity} className="form-control" style={{ width: "70px" }} id=""
                            onChange={(e) => setCount(e.target.value)}
                            value={count}
                          />
                        </div>
                      </>
                    }
                    <div className={alreadyAdded ? "d-flex align-items-center gap-30 ms-0" : "d-flex align-items-center gap-30 ms-5"}>
                      <button className="button border-0" onClick={() => { alreadyAdded ? navigate("/cart") : uploadCart() }}>
                        {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                      </button>
                      <button className='button signup'  >By it now</button>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-15'>
                    <div>
                      <IoGitCompareSharp className='fs-5 me-2' />
                      <a href=''>Add to compare</a>

                    </div>
                    <div >
                      {
                        click ? (
                          <AiFillHeart onClick={() => { addToWish(productState?._id) }} className='fs-5 me-2' color={click ? "red" : "#333"} />
                        ) :
                          (
                            <AiOutlineHeart onClick={() => { addToWish(productState?._id) }} className='fs-5 me-2' color={click ? "red" : "#333"} />
                          )
                      }
                      <Link >Add to wishlis</Link>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 my-3">
                    <h3 className='product-heading'>Shipping and Refund</h3>
                    <p className='product-data'>Shipping nhanh chóng và đảm bảo an toàn, giúp sản phẩm đến tay khách hàng trong thời gian ngắn nhất.<br />Chính sách hoàn tiền linh hoạt và minh bạch, hỗ trợ hoàn trả dễ dàng nếu sản phẩm không đạt yêu cầu</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-3">
                    <h3 className='product-heading'>Copy Product Link:</h3>
                    <a href='javascrip:void(0);' onClick={() => { copyToClipboard(window.location.href); }}>Click here to copy</a>
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
                  {productState?.description}
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

                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                  </div>
                  <div>
                    <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder='Comments'
                      onChange={(e) => {
                        SetComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className='d-flex justify-content-end mt-3'>
                    <button onClick={addToRatingProduct} className='button border-0' type='button'> Submit Review</button>
                  </div>

                </div>
                <div className='reviews mt-4'>
                  {
                    productState && productState?.ratings?.map((item, index) => {
                      return (
                        <div key={index} className="review ">
                          <div className='d-flex gap-10 align-items-center'>

                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className='mt-3'>{item?.comment}</p>
                        </div>
                      )
                    })
                  }
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
              {
                popularproductState && popularproductState?.map((item, index) => {
                  if (item?.tags[0] === "popular") {
                    return (
                      < PopularProduct key={index} title={item?.title} brand={item?.brand}
                        price={item?.price} totalRating={item?.totalRatings.toString()}
                        sold={item?.sold} quantity={item?.quantity} description={item?.description}
                        id={item?._id}
                      />
                    )
                  }

                })
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SingleProduct