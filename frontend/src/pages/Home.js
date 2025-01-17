import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import PopularProduct from "../components/PopularProduct";
import FeaturedProduct from "../components/FeaturedProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlice";
import { getCategories } from "../features/category/categorySlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllBlog());
    dispatch(getAllProducts());
  }, []);
  const blogState = useSelector((state) => state?.blog?.blogs?.data);
  const firstFourBlogs = blogState?.slice(0, 4) || [];
  const productState = useSelector((state) => state?.product?.products?.data);
  const categoriesState = useSelector(state => state?.category?.Categories?.data)
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <section className="home-wraper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-8">
              <div className="banner">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://img.lazcdn.com/us/domino/2b311bc1-5d74-447c-80fb-58a5959862f0_VN-1976-688.jpg_2200x2200q80.jpg_.avif"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://img.lazcdn.com/us/domino/45a52818-c6fb-4997-abde-537071143f4a_VN-1976-688.jpg_2200x2200q80.jpg_.avif"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://cf.shopee.vn/file/vn-11134258-7ras8-m2t71qmtks6yfb_xxhdpi"
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex flex-wrap gap-10">
                <div className="small-banner-slide">
                  <img
                    className="img-fluid rounded-3 "
                    src="https://cf.shopee.vn/file/vn-11134258-7ras8-m2t79b0ey2t69b_xhdpi"
                    alt=""
                  />
                </div>
                <div className="small-banner-slide">
                  <img
                    className="img-fluid rounded-3"
                    src="https://cf.shopee.vn/file/vn-11134258-7ras8-m2t7b9inro5i8e_xhdpi"
                    alt=""
                  />
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
                <div className="d-flex align-items-center gap-20">
                  <img src="images/service.png" alt="" />
                  <div>
                    <h6 style={{ fontWeight: "bold" }}>Miễn phí ship</h6>
                    <p className="mb-0">Tất cả đơn hàng trên 100k</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="" />
                  <div>
                    <h6 style={{ fontWeight: "bold" }}>
                      Ưu đãi bất ngờ hằng ngày
                    </h6>
                    <p className="mb-0">Tiết kiệm tới 25%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="" />
                  <div>
                    <h6 style={{ fontWeight: "bold" }}>Hỗ trợ 24/7</h6>
                    <p className="mb-0">Mua sắm thông minh</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="" />
                  <div>
                    <h6 style={{ fontWeight: "bold" }}>Giá cả phải chăng</h6>
                    <p className="mb-0">Nhận giá gốc từ nơi sản xuất </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="" />
                  <div>
                    <h6 style={{ fontWeight: "bold" }}>Thanh toán an toàn</h6>
                    <p className="mb-0">Thanh toán 100% giá trị sản phẩm</p>
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
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[0]?.title : ""}</h6>
                  </div>
                  <img src="https://www.techone.vn/wp-content/uploads/2024/09/vang.jpg" alt="camera" className="category-img" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[1]?.title : ""}</h6>
                  </div>
                  <img src="https://soundpeatsvietnam.com/wp-content/uploads/2023/05/gofree.jpg" alt="camera" className="category-img" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[2]?.title : ""}</h6>
                  </div>
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/e/venu3s_of_5000-01.png" alt="camera" className="category-img" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[3]?.title : ""}</h6>
                  </div>
                  <img src="https://surfaceviet.vn/wp-content/uploads/2024/05/Surface-Laptop-7-Platinum-13.8-inch.jpg" alt="camera" className="category-img" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[4]?.title : ""}</h6>
                  </div>
                  <img src="https://benhvienlaptop.com/wp-content/uploads/2024/06/Sac-Macbook-USB-C-510x510-3.jpg" alt="camera" className="category-img" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>{categoriesState ? categoriesState[5]?.title : ""}</h6>
                  </div>
                  <img src="https://imagedelivery.net/ZeGtsGSjuQe1P3UP_zk3fQ/c06fd9d1-bc40-49ab-76c0-3a282e806400/storedata" alt="camera" className="category-img" />
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
              <h3 className="section-heading" style={{ fontWeight: "bold" }}>
                Sản phẩm nổi bật
              </h3>
            </div>
            <div className="row">
              {productState &&
                productState?.map((item, index) => {
                  const parsedTags = JSON.parse(item.tags);
                  if (parsedTags.includes("featured")) {
                    return (
                      <FeaturedProduct
                        key={index}
                        title={item?.name}
                        brand={item?.brand.title}
                        price={formatPrice(item?.price)}
                        totalRating={item?.totalRatings.toString()}
                        sold={item?.sold}
                        quantity={item?.quantity}
                        description={item?.description}
                        id={item?._id}
                        image={item?.images}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading" style={{ fontWeight: "bold" }}>
                Sản phẩm đặc biệt
              </h3>
            </div>
          </div>
          <div className="row">
            {productState &&
              productState?.map((item, index) => {
                const parsedTags = JSON.parse(item.tags);
                if (parsedTags.includes("special")) {
                  return (
                    <SpecialProduct
                      key={index}
                      title={item?.name}
                      brand={item?.brand.title}
                      price={item?.price}
                      totalRating={item?.totalRatings.toString()}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      id={item?._id}
                      image={item?.images}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>
      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading" style={{ fontWeight: "bold" }}>
                Sản phẩm phổ biến
              </h3>
            </div>
            <div className="row">
              {productState &&
                productState?.map((item, index) => {
                  const parsedTags = JSON.parse(item.tags);
                  if (parsedTags.includes("popular")) {
                    return (
                      <PopularProduct
                        key={index}
                        title={item?.name}
                        brand={item?.brand.title}
                        price={item?.price}
                        totalRating={item?.totalRatings.toString()}
                        sold={item?.sold}
                        quantity={item?.quantity}
                        description={item?.description}
                        id={item?._id}
                        image={item?.images}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
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
              <h3 className="section-heading" style={{ fontWeight: "bold" }}>
                Blog mới nhất
              </h3>
            </div>
          </div>
          <div className="row">
            {firstFourBlogs?.map((item, index) => {
              return (
                <div className="col-3 " key={index}>
                  <BlogCard
                    id={item?._id}
                    title={item?.title}
                    description={item?.description}
                    image={item?.image}
                    createdAt={moment(item?.createdAt).format(
                      "DD-MM-YYYY"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
