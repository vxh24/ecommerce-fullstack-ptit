import React, { useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAProducts, resetState } from "../features/products/productSlice";
import { addToWishlist } from "../features/products/productSlice";
import { getAllColors } from "../features/color/colorSlice";
import { toast } from "react-toastify";
import { AddProdToCart, getUserCart } from "../features/user/userSlice";
import { getAllProducts } from "../features/products/productSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserProductWishlist } from "../features/user/userSlice";
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcNext, FcPrevious } from "react-icons/fc";
import ImageDetails from "../components/ImageDetails";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const productState = useSelector((state) => state?.product?.product?.data);
  const productState1 = useSelector((state) => state?.product);
  const images = productState?.images;
  const getToken = JSON.parse(localStorage.getItem("customer"));
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
    const targetSection = document.getElementById("target-section");
    if (targetSection && rating !== undefined) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    setRating(productState1?.rating?.data);
  }, [productState1, rating]);
  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const [color, setColor] = useState(null);
  const [count, setCount] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const navigate = useNavigate();
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Copied");
  };
  const getProductId = location.pathname.split("/")[2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const wishlist = useSelector(
    (state) => state?.auth?.wishlist?.data?.wishlist
  );
  const recommendProduct = useSelector(
    (state) => state?.product?.product?.recommend
  );
  useEffect(() => {
    dispatch(getAProducts(getProductId));
    getColors();
    dispatch(getUserCart());
    getProducts();
    getWishlist();
  }, []);
  const cartState = useSelector(
    (state) => state?.auth?.cartUser?.cart?.products
  );
  const getWishlist = () => {
    if (getToken?.access_token === undefined) {
      return;
    }
    dispatch(getUserProductWishlist());
  };
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.product?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState]);
  const isWishlisted = wishlist?.some(
    (wishlistItem) => wishlistItem._id === getProductId
  );
  const addToWish = (id) => {
    if (getToken?.access_token === undefined) {
      return;
    }
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200);
  };
  const uploadCart = () => {
    if (getToken?.access_token === undefined) {
      navigate("/login", {
        state: { message: `product/${productState?._id}` },
      });
      return;
    }
    if (productState.quantity <= 0) {
      toast.info("Sản phẩm đã hết hàng");
      return false;
    } else if (color === null) {
      toast.info("Bạn chưa chọn màu");
      return false;
    } else {
      dispatch(AddProdToCart({ _id: productState?._id, count, color: color }));
      setTimeout(() => {
        dispatch(getUserCart());
      }, 700);
    }
  };
  const getColors = () => {
    dispatch(getAllColors());
  };
  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const shareOnFacebook = (productUrl) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl
    )}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
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

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  const [quantity, setQuantity] = useState(null);
  return (
    <>
      <Meta title={productState?.name} />
      <BreadCrumb title={productState?.name} />
      <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-product-image">
                <div
                  className="image-main"
                  onClick={() => openLightbox(currentIndex)}
                >
                  <img src={productState?.images?.[currentIndex]?.url} alt="" />
                </div>
              </div>
              <div className="other-product-images d-flex gap-30">
                <button className="nav-button" onClick={handlePrevious}>
                  <FcPrevious />
                </button>
                {productState?.images?.map((image, index) => (
                  <div className="image-d">
                    <img
                      key={index}
                      src={image.url}
                      alt={`Thumbnail ${index}`}
                      className={`image-detail ${
                        currentIndex === index ? "active" : ""
                      }`}
                      // className="image-d"
                      onClick={() => setCurrentIndex(index)}
                    />
                  </div>
                ))}
                <button className="nav-button" onClick={handleNext}>
                  <FcNext />
                </button>
              </div>
              {isLightboxOpen && (
                <ImageDetails
                  images={productState?.images}
                  currentIndex={currentIndex}
                  onClose={closeLightbox}
                  setCurrentIndex={setCurrentIndex}
                />
              )}
            </div>
            <div className="col-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productState?.name}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">{formatPrice(productState?.price)}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalRatings}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">
                      ({productState?.ratings?.length} reviews)
                    </p>
                  </div>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Thương hiệu:
                    </h3>
                    <p className="product-data">{productState?.brand.title}</p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Danh mục:
                    </h3>
                    <p className="product-data">
                      {productState?.category.title}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-2">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Thẻ:
                    </h3>
                    {tags &&
                      tags.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className="text-capitalize badge bg-light text-secondary py-2 px-3 rounded-3 mb-0"
                          >
                            {item}
                          </p>
                        );
                      })}
                  </div>

                  <div className="d-flex flex-column gap-10 mt-2 mb-3">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Màu sắc:
                    </h3>
                    <div className="d-flex align-items-center flex-wrap gap-10">
                      {productState?.colors?.map((item) => {
                        return (
                          <div
                            className={`${
                              color === item.name
                                ? "color-fix-active"
                                : "color-fix"
                            } `}
                            onClick={() => {
                              setColor(item.name);
                              setQuantity(item.quantity);
                            }}
                          >
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {quantity ? (
                    <div className="d-flex align-items-center gap-10 my-2">
                      <h3
                        className="product-heading"
                        style={{ fontWeight: "bold" }}
                      >
                        Còn lại:
                      </h3>
                      {quantity <= 0 ? (
                        <p className="product-data mb-0"></p>
                      ) : (
                        <p className="product-data mb-0">{quantity}</p>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <div className="d-flex flex-row gap-10 mt-2 mb-3 align-items-center">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Số lượng:
                    </h3>
                    <div className="">
                      <input
                        type="number"
                        name=""
                        min={1}
                        max={quantity}
                        className="form-control"
                        style={{ width: "70px" }}
                        id=""
                        onChange={(e) => setCount(e.target.value)}
                        value={count}
                      />
                    </div>

                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button
                        className="button border-0"
                        onClick={() => {
                          uploadCart();
                        }}
                      >
                        Thêm vào giỏ hàng
                      </button>
                      <button className="button signup">Mua ngay</button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      {isWishlisted ? (
                        <AiFillHeart
                          onClick={() => {
                            addToWish(productState?._id);
                          }}
                          className="fs-5 me-2 cursor-pointer"
                          color={isWishlisted ? "red" : "#333"}
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={() => {
                            addToWish(productState?._id);
                          }}
                          className="fs-5 me-2 cursor-pointer"
                          color={isWishlisted ? "red" : "#333"}
                        />
                      )}
                      <Link>Yêu thích</Link>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-10 my-3">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Giao hàng và trả hàng
                    </h3>
                    <p className="product-data">
                      Shipping nhanh chóng và đảm bảo an toàn, giúp sản phẩm đến
                      tay khách hàng trong thời gian ngắn nhất.
                      <br />
                      Chính sách hoàn tiền linh hoạt và minh bạch, hỗ trợ hoàn
                      trả dễ dàng nếu sản phẩm không đạt yêu cầu
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-10 my-3">
                    <h3
                      className="product-heading"
                      style={{ fontWeight: "bold" }}
                    >
                      Sao chép đường dẫn sản phẩm:
                    </h3>
                    <Link
                      to="javascrip:void(0);"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Click vào đây để copy sản phẩm
                    </Link>

                    <h3 className="product-heading ms-4">Chia sẻ</h3>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        shareOnFacebook(
                          `${window.location.origin}/product/${productState?._id}`
                        );
                      }}
                    >
                      <FaFacebookSquare className="fs-4 text-dark" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 style={{ fontWeight: "bold" }}>Mô tả</h4>
              <div className="bg-white p-3">
                <p
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="review" className="reviews-wrapper home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 style={{ fontWeight: "bold" }}>Đánh giá</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4>Đánh giá của khách hàng</h4>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0">
                        ({productState?.ratings?.length} đánh giá)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="reviews mt-4">
                  {productState &&
                    productState?.ratings?.map((item, index) => {
                      return (
                        <div key={index} className="review ">
                          <div className="d-flex gap-10 align-items-center">
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-3">{item?.comment}</p>
                        </div>
                      );
                    })}
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
              <h3 className="section-heading" style={{ fontWeight: "bold" }}>
                Sản phẩm tương tự
              </h3>
            </div>
            <div className="row">
              {recommendProduct &&
                recommendProduct?.map((item, index) => {
                  const isWishlisted1 = wishlist?.some(
                    (wishlistItem) => wishlistItem._id === item.product._id
                  );
                  return (
                    <div className="col-3" key={index}>
                      <Link className="product-card position-relative">
                        <div className="wishlis-icon position-absolute">
                          <button className="border-0 bg-transparent">
                            {isWishlisted1 ? (
                              <AiFillHeart
                                className="fs-5"
                                onClick={() => {
                                  addToWish(item.product._id);
                                }}
                                color="red"
                              />
                            ) : (
                              <AiOutlineHeart
                                className="fs-5"
                                onClick={() => {
                                  addToWish(item.product._id);
                                }}
                                color="#333"
                              />
                            )}
                          </button>
                        </div>
                        <div className="product-image">
                          <img
                            src={item.product?.images[0]?.url}
                            className="img-fluid mx-auto"
                            alt="product image"
                          />
                          <img
                            src={item.product?.images[1]?.url}
                            className="img-fluid"
                            alt="product image"
                          />
                        </div>
                        <div className="product-details">
                          <h6 className="brand">{item.product.brand.title}</h6>
                          <h5 className="product-title">
                            {item.product.title}
                          </h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item.product.totalRating}
                            edit={true}
                            activeColor="#ffd700"
                          />
                          <p
                            className="description d-block"
                            dangerouslySetInnerHTML={{
                              __html:
                                item.product.description?.substr(0, 40) + "...",
                            }}
                          ></p>
                          <p className="price">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <Link
                              onClick={() => {
                                dispatch(getAProducts(item.product._id));
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              {/* <img src="images/view.svg" alt="view" /> */}
                              <MdOutlineRemoveRedEye className="text-dark fs-5" />
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
