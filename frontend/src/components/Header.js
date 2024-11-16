import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProducts } from '../features/products/productSlice';
// import { getUserCart } from '../features/user/userSlice';
import { AiOutlineHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
const Header = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  const authState = useSelector(state => state?.auth);
  const [paginate, setPaginate] = useState(true);
  const dispatch = useDispatch();
  const productState = useSelector(state => state?.product?.products?.data);
  const [productOpt, setProductOpt] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let data = []
    let category = new Set();
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
      category.add(element?.category);

    }
    setProductOpt(data);
    setCategories([...category]);
  }, [productState]);
  // useEffect(() => {
  //   dispatch(getUserCart());
  // }, [])
  const userCartState = useSelector(state => state?.auth?.cartUser?.data);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.products?.length; index++) {
      sum = sum + (Number(userCartState.products[index].count) * Number(userCartState.products[index].price));
      setTotal(sum);
    }
    // setTimeout(() => {
    //   dispatch(getUserCart());
    // }, 200)
  }, [userCartState]);
  // console.log(userCartState);
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className='text-white mb-0'>Free ship</p>
            </div>
            <div className="col-6">
              <p className='text-end text-white mb-0'>Hotline: <a className='text-white' href='tel: +98362943381'>+98362943381</a></p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h1><Link className="text-white">ECommer.</Link></h1>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  options={productOpt}
                  onChange={(selected) => {
                    navigate(`product/${selected[0]?.prod}`)
                    dispatch(getAProducts(selected[0]?.prod))
                  }}
                  paginate={paginate}
                  labelKey={"name"}
                  placeholder="Search for Product here..."
                />
                <span className="input-group-text p-3" id="basic-addon2"><BsSearch className="fs-6" /></span>
              </div>

            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center gap-30 justify-content-end">
                <div>
                  <Link to="wishlist" className="d-flex align-items-center gap-10 text-white">
                    <AiOutlineHeart className='fs-2' />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null ? "/login" : ""} className="d-flex align-items-center gap-10 text-white">
                    <CgProfile className='fs-2' />
                    {
                      authState?.user === null ? <p className="mb-0">
                        Log in
                      </p> :
                        <>
                          <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                              {authState?.user?.user?.name.toUpperCase()}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <li><Link className="dropdown-item" type="button" to="/profile">Profile</Link></li>
                              <li><Link className="dropdown-item" type="button" to="/my-orders">My Orders</Link></li>
                              <li><button onClick={handleLogout} className=" dropdown-item" type="button">Logout</button></li>
                            </ul>
                          </div>
                        </>
                    }
                  </Link>
                </div>
                <div class="cart-icon-container">
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                    <GiShoppingCart className='fs-1' />
                    {/* <div className="d-flex flex-column gap-10"> */}
                    <span className="cart-badge bg-white text-dark">{userCartState?.products?.length ? userCartState?.products?.length : 0}</span>
                    {/* </div> */}
                  </Link>
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
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div className="">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <BiCategory className='fs-3' />
                      <span className='me-5 d-inline-block'> Shop Categories </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      {
                        categories && categories?.map((item, index) => {
                          return (
                            <li key={index}><Link className="dropdown-item text-white" to="">{item}</Link></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="div d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header