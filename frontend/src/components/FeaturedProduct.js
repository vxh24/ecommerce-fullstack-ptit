import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { getUserProductWishlist } from "../features/user/userSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const FeaturedProduct = (props) => {
  const { grid, title, brand, price, totalRating, id, description, image } =
    props;
  const dispatch = useDispatch();
  let location = useLocation();
  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, []);
  const wishlist = useSelector(
    (state) => state?.auth?.wishlist?.data?.wishlist
  );
  const isWishlisted = wishlist?.some(
    (wishlistItem) => wishlistItem._id === id
  );
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200);
  };
  return (
    <>
      <div className="col-3">
        <Link className="product-card position-relative">
          <div className="wishlis-icon position-absolute">
            <button className="border-0 bg-transparent">
              {isWishlisted ? (
                <AiFillHeart
                  onClick={() => {
                    addToWish(id);
                  }}
                  color="red"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => {
                    addToWish(id);
                  }}
                  color="#333"
                />
              )}
            </button>
          </div>
          <div className="product-image">
            <img
              src={image[0]?.url}
              className="img-fluid mx-auto"
              alt="product image"
            />
            <img
              src={image[0]?.url}
              className="img-fluid"
              alt="product image"
            />
          </div>
          <div className="product-details">
            <h6 className="brand">{brand}</h6>
            <h5 className="product-title">{title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={totalRating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {description}
            </p>
            <p className="price">{price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link>
                <img src="images/prodcompare.svg" alt="compare" />
              </Link>
              <Link to={"/product/" + id}>
                <img src="images/view.svg" alt="view" />
              </Link>
              <Link>
                <img src="images/add-cart.svg" alt="add cart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FeaturedProduct;
