import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from "../components/ProductCard";
import SpecialProduct from '../components/SpecialProduct';
import PopularProduct from "../components/PopularProduct";
import FeaturedProduct from "../components/FeaturedProduct";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../features/blogs/blogSlice';
import moment from "moment";
import { getAllProducts } from '../features/products/productSlice';
const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blogs?.data);
  const productState = useSelector((state) => state?.product?.products?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(productState[0].tags);
  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlog());
  }
  const getProducts = () => {
    dispatch(getAllProducts());
  }
  return (
    <>
      <section className="home-wraper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img src="/images/main-banner-1.jpg" className="img-fluid rounded-3" alt="main banner" />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.0 or $41.0</p>
                  <Link className='button'>BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="div d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img src="/images/catbanner-01.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.0 <br />or $41.0</p>

                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="/images/catbanner-02.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.0 <br /> or $41.0</p>

                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="/images/catbanner-03.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.0 <br /> or $41.0</p>

                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img src="/images/catbanner-04.jpg" className="img-fluid rounded-3" alt="main banner" />
                  <div className="small-banner-content position-absolute">
                    <h4>SUPERCHARGED FOR PROS</h4>
                    <h5>iPad S13+ Pro.</h5>
                    <p>From $999.0 <br /> or $41.0</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="servies d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service.png" alt="" />
                  <div>
                    <h6>Free Shiping</h6>
                    <p className='mb-0'>From all order over $100</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-02.png" alt="" />
                  <div>
                    <h6>Daily Surprise Offer</h6>
                    <p className='mb-0'>Save up to 25% off</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-03.png" alt="" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className='mb-0'>Shop with an expert</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-04.png" alt="" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className='mb-0'>Get factory direct price</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-15'>
                  <img src="images/service-05.png" alt="" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p className='mb-0'>100% Product Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex align-items-center justify-content-between flex-wrap">
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/tv.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/headphone.jpg" alt="camera" />
                </div>
                <div className='d-flex gap align-items-center'>
                  <div>
                    <h6>Cameras</h6>
                    <p>10 items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Feature Collection
              </h3>
            </div>
            <div className="row">
              {
                productState && productState?.map((item, index) => {
                  if (item?.tags[0] === "featured") {
                    return (
                      < FeaturedProduct key={index} title={item?.title} brand={item?.brand}
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
      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img src="images/famous.webp" className='img-fluid' alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $200/mo. for 24mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img src="images/famous.webp" className='img-fluid' alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $200/mo. for 24mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img src="images/famous.webp" className='img-fluid' alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $200/mo. for 24mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img src="images/famous.webp" className='img-fluid' alt="famous" />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $200/mo. for 24mo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='special-wrapper py-5 home-wrapper-2'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Special Products
              </h3>
            </div>
          </div>
          <div className="row">
            {
              productState && productState?.map((item, index) => {
                if (item?.tags[0] === "special") {
                  return (
                    < SpecialProduct key={index} title={item?.title} brand={item?.brand}
                      price={item?.price} totalRating={item?.totalRatings.toString()}
                      sold={item?.sold} quantity={item?.quantity} id={item?._id}
                    />
                  )
                }

              })
            }
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
                productState && productState?.map((item, index) => {
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
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className='mx-4 w-25'>
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">
                Our Latest Blog
              </h3>
            </div>
          </div>
          <div className="row">
            {
              blogState?.map((item, index) => {
                return (
                  <div className="col-3 " key={index}>

                    <BlogCard id={item?._id} title={item?.title} description={item?.description}
                      image={item?.image}
                      date={moment(item?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Home