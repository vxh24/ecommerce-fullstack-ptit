import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { FaHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { googleLogout } from "@react-oauth/google";
import { getCategories } from "../features/category/categorySlice";
import { getProfileSlice, getUserCart } from "../features/user/userSlice";
const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const profileState = useSelector((state) => state?.auth?.profile?.data);
  const categoryState = useSelector(
    (state) => state?.category?.Categories?.data
  );
  useEffect(() => {
    dispatch(getProfileSlice());
    dispatch(getUserCart());
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    if (!profileState) {
      dispatch(getProfileSlice());
    }
  }, [dispatch, profileState]);
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products?.data);
  const userCartState = useSelector((state) => state?.auth?.cartUser?.cart);
  const [cartlengt, setCartlengt] = useState();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (selectedCategory) {
      // fetchProducts();
      // navigate('/product')
      navigate(location.pathname, { replace: true, state: null });
      navigate("/product", { state: { category: selectedCategory } });
    }
    // fetchProducts();
  }, [selectedCategory]);
  useEffect(() => {
    setCartlengt(userCartState?.products?.length);
  }, [userCartState]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async () => {
    // dispatch(searchProductSlice(searchTerm));
    navigate(location?.pathname, { replace: true, state: null });
    navigate("/product", { state: { message: searchTerm } });
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
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Miễn phí vận chuyển</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel: +98362943381">
                  +98362943381
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h1>
                <Link
                  to="/"
                  className="text-white"
                  style={{ fontSize: "35px", cursor: "pointer" }}
                >
                  PTIT SHOP
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group" style={{ padding: "20px" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  style={{ padding: "10px", width: "400px" }}
                />
                <span
                  onClick={handleSearch}
                  className="input-group-text p-3"
                  id="basic-addon2"
                  role="button"
                >
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center gap-30 justify-content-end">
                <div>
                  <Link
                    to="wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FaHeart className="fs-2 text-red" />
                    <p className="mb-0">
                      Sản phẩm <br /> Yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : ""}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    {profileState?.avatar ? (
                      <img
                        className="avatar"
                        src={profileState?.avatar}
                        alt=""
                      />
                    ) : (
                      <img
                        className="avatar"
                        src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                        alt=""
                      />
                    )}
                    {/* <CgProfile className="fs-2" /> */}
                    {authState?.user === null ? (
                      <p className="mb-0">Đăng nhập</p>
                    ) : (
                      <>
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenu2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {profileState?.name.toUpperCase()}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenu2"
                          >
                            <li>
                              <Link
                                className="dropdown-item"
                                type="button"
                                to="/profile"
                              >
                                Thông tin cá nhân
                              </Link>
                            </li>
                            {profileState?.role === "admin" && (
                              <li>
                                <Link
                                  className="dropdown-item"
                                  type="button"
                                  to="http://localhost:3001/admin"
                                >
                                  Quản lý
                                </Link>
                              </li>
                            )}
                            <li>
                              <Link
                                className="dropdown-item"
                                type="button"
                                to="/my-orders"
                              >
                                Đơn hàng
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={handleLogout}
                                className="dropdown-item"
                                type="button"
                              >
                                Đăng xuất
                              </button>
                            </li>
                          </ul>
                        </div>
                      </>
                    )}
                  </Link>
                </div>
                <div
                  className="cart-icon-container"
                  onMouseEnter={() => setShowCartDropdown(true)}
                  onMouseLeave={() => setShowCartDropdown(false)}
                >
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <div>
                      <GiShoppingCart className="fs-1" />
                      <span
                        className="cart-badge bg-white text-dark"
                        style={{
                          position: "relative",
                          right: "10px",
                          top: "-10px",
                        }}
                      >
                        {cartlengt ? cartlengt : 0}
                      </span>
                    </div>
                    <span style={{ marginLeft: "-15px", fontSize: "16px" }}>
                      Giỏ hàng
                    </span>
                  </Link>
                  {showCartDropdown && (
                    <div className="cart-dropdown">
                      {userCartState?.products?.length > 0 ? (
                        <>
                          <ul className="cart-items">
                            {userCartState?.products?.map((item, index) => {
                              const product = productState?.find(
                                (productItem) =>
                                  productItem?._id === item?.product
                              );
                              return (
                                <li key={index} className="cart-item">
                                  <img
                                    src={item?.product?.images[0]?.url}
                                    alt={item?.product?.name}
                                    className="cart-item-image"
                                  />
                                  <div className="cart-item-info">
                                    <p className="cart-item-name"
                                      dangerouslySetInnerHTML={{ __html: item?.product?.name?.substr(0, 15) + "...", }}
                                    >
                                    </p>
                                    <p className="cart-item-quantity">
                                      Số lượng: {item?.count}
                                    </p>
                                  </div>
                                  <p className="cart-item-price">
                                    {formatPrice(item?.product?.price * item?.count)}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <ul className="cart-items">
                          <p className="text-center mb-0 bold-text">
                            Chưa có sản phẩm
                          </p>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle d-flex gap-10 align-items-center mb-0"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BiCategory className="fs-3" />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Danh mục sản phẩm
                    </span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {categoryState &&
                      categoryState?.map((item, index) => {
                        return (
                          <li key={index} className="mt-0">
                            <button
                              className="dropdown-item text-dark bold-text"
                              onClick={() => setSelectedCategory(item.title)}
                            >
                              {item.title}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/" style={{ fontWeight: "bold" }}>
                      Trang chủ
                    </NavLink>
                    <NavLink to="/product" style={{ fontWeight: "bold" }}>
                      Cửa hàng
                    </NavLink>
                    <NavLink to="/blog" style={{ fontWeight: "bold" }}>
                      Blog
                    </NavLink>
                    <NavLink to="/contact" style={{ fontWeight: "bold" }}>
                      Liên hệ
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
