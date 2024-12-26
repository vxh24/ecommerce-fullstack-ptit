import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserProductWishlist } from "../features/user/userSlice";
const ProductCard = (props) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const wishlist = useSelector(
    (state) => state?.auth?.wishlist?.data?.wishlist
  );
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  };
  const addToWish = (id) => {
    if (authState.user === null && authState.isSuccess !== true) {
      navigate("/login");
    }
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <>
      {data?.map((item, index) => {
        const isWishlisted = wishlist?.some(
          (wishlistItem) => wishlistItem._id === item._id
        );
        return (
          <div
            key={index}
            className={`${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            }`}
          >
            <Link className="product-card position-relative">
              <div className="wishlis-icon position-absolute">
                <button className="border-0 bg-transparent">
                  {isWishlisted ? (
                    <AiFillHeart
                      onClick={() => {
                        addToWish(item?._id);
                      }}
                      color="red"
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => {
                        addToWish(item?._id);
                      }}
                      color="#333"
                    />
                  )}
                </button>
              </div>
              <div className="product-image">
                <img
                  src={item?.images[0]?.url}
                  className={` ${grid === 12 ? "" : "img-fluid mx-auto"}`}
                  alt="product image"
                />
                <img
                  src={item?.images[0]?.url}
                  className={` ${grid === 12 ? "" : "img-fluid"}`}
                  alt="product image"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item.brand.title}</h6>
                <h5 className="product-title">{item.name}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={parseInt(item.totalRatings, 10)}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: item?.description?.substr(0, 500) + "...",
                  }}
                ></p>
                <p className="price">{formatPrice(item.price)}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link to={"/product/" + item?._id}>
                    <img src="images/view.svg" alt="view" />
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
