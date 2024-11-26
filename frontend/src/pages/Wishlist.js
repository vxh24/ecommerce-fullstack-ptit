import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';
const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = () => {
    dispatch(getUserProductWishlist());
  }
  const wishlistState = useSelector((state) => state?.auth?.wishlist?.data?.wishlist);
  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200)
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            {wishlistState?.length === 0 && (
              <div className='text-center fs-3'> No Data</div>
            )}
            {
              wishlistState?.map((item, index) => {
                return (
                  <div className="col-3" key={index}>
                    <div className="wishlist-card position-relative">
                      <img onClick={(e) => { removeFromWishlist(item?._id) }} src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                      <div className="wishlist-card-image">
                        <img src="images/watch.jpg" className='img-fluid w-100' alt="watch" />
                        <div className='py-3 px-3'>
                          <h5 className="title">{item?.title}</h5>
                          <h6 className="price mb-3 mt-3">$ {item?.price}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Wishlist