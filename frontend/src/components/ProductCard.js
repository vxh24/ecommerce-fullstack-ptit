import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserProductWishlist } from '../features/user/userSlice';
const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const wishlist = useSelector(state => state?.auth?.wishlist?.data?.wishlist);
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 100)
  }
  return (
    <>
      {data?.map((item, index) => {
        const isWishlisted = wishlist?.some(wishlistItem => wishlistItem._id === item._id);
        return (
          <div key={index}
            className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}>
            <Link className="product-card position-relative">
              <div className="wishlis-icon position-absolute">
                <button className='border-0 bg-transparent'>
                  {isWishlisted ? (
                    <AiFillHeart onClick={() => { addToWish(item?._id) }} color="red" />
                  ) : (
                    <AiOutlineHeart onClick={() => { addToWish(item?._id) }} color="#333" />
                  )}
                </button>
              </div>
              <div className="product-image">
                <img src="images/watch.jpg" className='img-fluid mx-auto' alt="product image" />
                <img src="images/watch1.jpg" className='img-fluid' alt="product image" />
              </div>
              <div className="product-details">
                <h6 className='brand'>{item.brand}</h6>
                <h5 className="product-title">{item.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item.totalRatings}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>{item?.description}
                </p>
                <p className='price'>${item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
                  <Link to={"/product/" + item?._id}><img src="images/view.svg" alt="view" /></Link>
                  <Link><img src="images/add-cart.svg" alt="add cart" /></Link>

                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default ProductCard