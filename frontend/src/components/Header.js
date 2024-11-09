import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProducts } from '../features/products/productSlice';
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
  const navigate = useNavigate();
  useEffect(() => {
    let data = []
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });

    }
    setProductOpt(data);
  }, [productState]);
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
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link to="/compare-product" className="d-flex align-items-center gap-10 text-white">
                    <img src="images/compare.svg" alt="" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to="wishlist" className="d-flex align-items-center gap-10 text-white">
                    <img src="images/wishlist.svg" alt="" />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null ? "/login" : "/profile"} className="d-flex align-items-center gap-10 text-white">
                    <img src="images/user.svg" alt="" />
                    {
                      authState?.user === null ? <p className="mb-0">
                        Log in
                      </p> :
                        <p className="mb-0">
                          {authState?.user?.user?.name.toUpperCase()}
                        </p>
                    }
                  </Link>
                </div>
                <div>
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                    <img src="images/cart.svg" alt="" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$ 5000</p>
                    </div>
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
                      <img src="images/menu.svg" />
                      <span className='me-5 d-inline-block'> Shop Categories </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="div d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <button onClick={handleLogout} className="border border-0 bg-transparent text-white text-uppercase" type="button">Logout</button>
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