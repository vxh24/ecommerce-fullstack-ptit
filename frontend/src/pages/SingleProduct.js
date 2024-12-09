import React, { useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getAProducts, RatingProduct, resetState } from '../features/products/productSlice';
import { addToWishlist } from '../features/products/productSlice';
import { getAllColors } from '../features/color/colorSlice';
import { toast } from "react-toastify"
import { AddProdToCart, getUserCart } from '../features/user/userSlice';
import { getAllProducts } from '../features/products/productSlice';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserProductWishlist } from '../features/user/userSlice';
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReactImageZoom from 'react-image-zoom';
const SingleProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productState = useSelector(state => state?.product?.product?.data);
  const productState1 = useSelector(state => state?.product);
  const images = productState?.images;
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [location.pathname, dispatch]);

  const [rating, setRating] = useState(productState1?.rating?.data);
  useEffect(() => {
    const targetSection = document.getElementById('target-section');
    if (targetSection && rating !== undefined) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    setRating(productState1?.rating?.data);
  }, [productState1, rating])
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };
  const [color, setColor] = useState(null);
  const [count, setCount] = useState(1);
  const [orderProduct, setorderProduct] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const navigate = useNavigate();
  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.success("Copied")
  }
  const getProductId = location.pathname.split("/")[2];
  const colorIds = useSelector(state => state?.product?.product?.data?.colors);
  const colors = useSelector(state => state?.color?.colors?.data);
  const matchedColors = colors?.filter((color) => colorIds?.includes(color?._id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[currentIndex]?.url
  };
  const wishlist = useSelector(state => state?.auth?.wishlist?.data?.wishlist);
  const recommendProduct = useSelector(state => state?.product?.product?.recommend);
  useEffect(() => {
    dispatch(getAProducts(getProductId));
    getColors();
    dispatch(getUserCart())
    getProducts();
    getWishlist();
  }, [])
  const cartState = useSelector(state => state?.auth?.cartUser?.cart?.products);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.product?._id) {
        setAlreadyAdded(true);
      }

    }
  }, [cartState])
  const isWishlisted = wishlist?.some(wishlistItem => wishlistItem._id === getProductId);
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200)
  }
  const uploadCart = () => {
    if (productState.quantity <= 0) {
      toast.info("Sản phẩm đã hết hàng")
      return false;
    }
    else if (color === null) {
      toast.info("Bạn chưa chọn màu")
      return false;
    }
    else {
      dispatch(AddProdToCart({ _id: productState?._id, count, color_id: color }))
      setTimeout(() => {
        // navigate("/cart");
        dispatch(getUserCart())
      }, 300)

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
      toast.info("Vui lòng chọn số sao");
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

  const shareOnFacebook = (productUrl) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  };
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (productState?.tags) {
      try {
        const parsedTags = JSON.parse(productState.tags);
        setTags(Array.isArray(parsedTags) ? parsedTags : []);
      } catch (error) {
        console.error("Error parsing tags:", error.message);
        setTags([]);
      }
    } else {
      setTags([]);
    }
  }, [productState]);

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={productState?.name} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div >
                  {productState?.images?.[currentIndex]?.url && (
                    <ReactImageZoom
                      {...props}
                    />
                  )}
                </div>
              </div>
              <div className="other-product-images d-flex  gap-15">
                <button className="nav-button" onClick={handlePrevious}><FcPrevious /></button>
                {productState?.images?.map((image, index) => (
                  <div>
                    <img
                      key={index}
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`img-fluid ${currentIndex === image.url ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)}
                    />
                  </div>
                ))}
                <button className="nav-button" onClick={handleNext}><FcNext /></button>

              </div>
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className='title'>{productState?.name}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className='price'> <span className='currency'>đ</span> {productState?.price} </p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalRatings}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className='mb-0 t-review'>({productState?.ratings?.length} reviews)</p>
                  </div>
                  {/* <a href='#review' className='review-btn'>Viết một đánh giá</a> */}
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Loại:</h3>
                    <p className='product-data'>iphone</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Nhãn hàng:</h3>
                    <p className='product-data'>{productState?.brand}</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Danh mục:</h3>
                    <p className='product-data'>{productState?.category}</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Thẻ:</h3>
                    {
                      tags && tags.map((item, index) => {
                        return (
                          <p key={index} className='text-capitalize badge bg-light text-secondary py-2 px-3 rounded-3 mb-0'>{item}</p>
                        )
                      })
                    }
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3 className='product-heading'>Số lượng:</h3>
                    {productState?.quantity <= 0 ? (
                      <p className='product-data'>Hết hàng</p>
                    ) : (
                      <p className='product-data'>{productState?.quantity}</p>
                    )}
                  </div>
                  {
                    alreadyAdded === false && <>
                      <div className="d-flex flex-column gap-10 mt-2 mb-3">
                        <h3 className='product-heading'>Màu sắc:</h3>
                        <Color setColor={setColor} colorData={matchedColors} />
                      </div>
                    </>
                  }
                  <div className="d-flex flex-row gap-10 mt-2 mb-3 align-items-center">
                    {
                      alreadyAdded === false && <>
                        <h3 className='product-heading'>Số lượng:</h3>
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
                        {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
                      </button>
                      <button className='button signup'  >Mua ngay</button>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-15'>
                    <div >
                      {
                        isWishlisted ? (
                          <AiFillHeart onClick={() => { addToWish(productState?._id) }} className='fs-5 me-2' color={isWishlisted ? "red" : "#333"} />
                        ) :
                          (
                            <AiOutlineHeart onClick={() => { addToWish(productState?._id) }} className='fs-5 me-2' color={isWishlisted ? "red" : "#333"} />
                          )
                      }
                      <Link >Yêu thích</Link>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 my-3">
                    <h3 className='product-heading'>Shipping and Refund</h3>
                    <p className='product-data'>Shipping nhanh chóng và đảm bảo an toàn, giúp sản phẩm đến tay khách hàng trong thời gian ngắn nhất.<br />Chính sách hoàn tiền linh hoạt và minh bạch, hỗ trợ hoàn trả dễ dàng nếu sản phẩm không đạt yêu cầu</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-3">
                    <h3 className='product-heading'>Copy Product Link:</h3>
                    <Link to='javascrip:void(0);' onClick={() => {
                      copyToClipboard(window.location.href);
                    }}>Click vào đây để copy sản phẩm</Link>

                    <h3 className='product-heading ms-4'>Chia sẻ</h3>
                    <Link onClick={(e) => { e.preventDefault(); shareOnFacebook(`${window.location.origin}/product/${productState?._id}`) }}><FaFacebookSquare className='fs-4 text-dark' /></Link>
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
              <h4>Mô tả</h4>
              <div className='bg-white p-3'>

                <p dangerouslySetInnerHTML={{ __html: productState?.description }} >
                  {/* {productState?.description} */}
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
              <h3>Đánh giá</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4> Đánh giá của khách hàng</h4>
                    <div className='d-flex gap-10 align-items-center'>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className='mb-0'>({productState?.ratings?.length} đánh giá)</p>
                    </div>
                  </div>
                  {orderProduct && (
                    <div>
                      <a href='' className='text-dark text-decoration-underline'>Viết một đánh giá</a>
                    </div>
                  )}
                </div>
                {/* <div className="review-form py-4">
                  <h4>Viết một đánh giá</h4>

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
                  <div id="target-section">
                    <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder='Viết đánh giá ở đây'
                      onChange={(e) => {
                        SetComment(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className='d-flex justify-content-end mt-3'>
                    <button onClick={addToRatingProduct} className='button border-0' type='button'>Đánh giá</button>
                  </div>

                </div> */}
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
                Sản phẩm tương tự
              </h3>
            </div>
            <div className="row">
              {
                recommendProduct && recommendProduct?.map((item, index) => {
                  const isWishlisted1 = wishlist?.some(wishlistItem => wishlistItem._id === item.product._id);
                  return (
                    <div
                      className="col-3" key={index}>
                      <Link className="product-card position-relative">
                        <div className="wishlis-icon position-absolute">
                          <button className='border-0 bg-transparent'>
                            {isWishlisted1 ? (
                              <AiFillHeart className='fs-4' onClick={() => { addToWish(item.product._id) }} color="red" />
                            ) : (
                              <AiOutlineHeart className='fs-4' onClick={() => { addToWish(item.product._id) }} color="#333" />
                            )}
                          </button>
                        </div>
                        <div className="product-image">
                          <img src={item.product?.images[0]?.url} className='img-fluid mx-auto' alt="product image" />
                          <img src={item.product?.images[1]?.url} className='img-fluid' alt="product image" />
                        </div>
                        <div className="product-details">
                          <h6 className='brand'>{item.product.brand}</h6>
                          <h5 className="product-title">{item.product.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item.product.totalRating}
                            edit={true}
                            activeColor="#ffd700"
                          />
                          <p className="description d-block" dangerouslySetInnerHTML={{ __html: item.product.description?.substr(0, 40) + "...", }}>
                          </p>
                          <p className='price'>${item.product.price}</p>
                        </div>
                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <Link onClick={() => {
                              dispatch(getAProducts(item.product._id));
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                              });
                            }}
                            >
                              {/* <img src="images/view.svg" alt="view" /> */}
                              <MdOutlineRemoveRedEye className='text-dark fs-4' />
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )

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