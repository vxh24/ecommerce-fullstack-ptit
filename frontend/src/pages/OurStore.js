
import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { Helmet } from "react-helmet";
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
const OurStore = () => {
  const [grid, setGrid] = useState(4);
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Shop" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Shop by categories
                </h3>
                <div>
                  <ul className='ps-0'>
                    <li className='mb-2'>Watch</li>
                    <li className='mb-2'>TV</li>
                    <li className='mb-2'>Camera</li>
                    <li className='mb-2'>Laptop</li>
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Filter By
                </h3>
                <div>
                  <h5 className="sub-title">
                    Availabity
                  </h5>
                  <div>
                    <div className="form-check">
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className='form-check-label' htmlFor="">
                        In stock (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className='form-check-label' htmlFor="">
                        Out of stock (0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">
                    Price
                  </h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating">
                      <input type="email" class="form-control" id="floatingInput" placeholder="from" />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input type="email" class="form-control" id="floatingInput1" placeholder="to" />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">
                    Color
                  </h5>

                  <div>
                    <Color />
                  </div>
                  <h5 className="sub-title">
                    Size
                  </h5>
                  <div>
                    <div className="form-check">
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id="color-1"
                      />
                      <label className='form-check-label' htmlFor="color-1">
                        S (1)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input'
                        type="checkbox"
                        value=""
                        id="color-2"
                      />
                      <label className='form-check-label' htmlFor="color-2">
                        M (1)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Product Tags
                </h3>
                <div>
                  <div className="product-tags d-flex align-items-center flex-wrap gap-10">
                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">Headphone</span>
                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">Laptop</span>
                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">Mobie</span>
                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">Camera</span>
                    <span className="badge bg-light text-secondary py-2 px-3 rounded-3">TV</span>
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Random Products
                </h3>
                <div>
                  <div className="random-products d-flex mb-3">
                    <div className="w-50">
                      <img src="images/watch.jpg" className='img-fluid' alt="watch" />
                    </div>
                    <div className="w-50">
                      <h5>TWS Tai Nghe Bluetooth Không Dây M10 Bluetooth</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$100</b>
                    </div>
                  </div>
                  <div className="random-products d-flex">
                    <div className="w-50">
                      <img src="images/watch.jpg" className='img-fluid' alt="watch" />
                    </div>
                    <div className="w-50">
                      <h5>TWS Tai Nghe Bluetooth Không Dây M10 Bluetooth</h5>
                      <ReactStars
                        count={5}
                        size={24}
                        value="3"
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <b>$100</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className='mb-0 d-block' style={{ "width": "100px" }}>Sort By:</p>
                    <select name="" id="" className="form-control form-select">
                      <option value="manual">Featured</option>
                      <option value="best-selilng" selected="selected">
                        Best Selling
                      </option>
                      <option value="title-ascending">Alphabetically, A-Z</option>
                      <option value="title-descending">Alphabetically, Z-A</option>
                      <option value="price-ascending">Price, low to hight</option>
                      <option value="price-ascending">Price, hight to low</option>
                      <option value="created-ascending">Date, old to new</option>
                      <option value="created-ascending">Date, new to old</option>
                    </select>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='totalproducts mb-0'>21 Products</p>
                    <div className="d-flex align-items-center gap-10 grid">
                      <img onClick={() => { setGrid(3); }} src="images/gr4.svg" className="d-block img-fluid" alt="grid" />
                      <img onClick={() => { setGrid(4); }} src="images/gr3.svg" className="d-block img-fluid" alt="grid" />
                      <img onClick={() => { setGrid(6); }} src="images/gr2.svg" className="d-block img-fluid" alt="grid" />
                      <img onClick={() => { setGrid(12); }} src="images/gr.svg" className="d-block img-fluid" alt="grid" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard grid={grid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurStore