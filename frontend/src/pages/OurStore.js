
import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import { getAllColors } from '../features/color/colorSlice';
import { toast } from 'react-toastify';
const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.products?.data);
  const dispatch = useDispatch();
  const [brands, setBrand] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  // console.log(sortedProducts);
  const [filertags, setFilerTags] = useState([]);
  const [filerbrands, setFilerBrands] = useState([]);
  const [minPrice, setMinPrice] = useState([]);
  const [maxPrice, setMaxPrice] = useState([]);
  const colors = useSelector(state => state?.color?.colors?.data);
  useEffect(() => {
    getProducts();
    getColors();
  }, []);
  const getColors = () => {
    dispatch(getAllColors());
  }
  useEffect(() => {
    let newbrands = [];
    let category = [];
    let newtags = new Set();
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newbrands.push(element.brand);
      category.push(element.category);
      element.tags.forEach((tag) => newtags.add(tag))
    }
    setBrand(newbrands);
    setCategories(category);
    setTags(newtags);
  }, [productState])
  const getProducts = () => {
    dispatch(getAllProducts());
  }
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    let sorted = [...productState];

    if (sortValue === "price-ascending") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    }
    else if (sortValue === "price-descending") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    }
    else if (sortValue === "created-ascending") {
      sorted = sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    else if (sortValue === "created-descending") {
      sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    else if (sortValue === "title-ascending") {
      sorted = sorted.sort((a, b) => a.title - b.title);
    }
    else if (sortValue === "title-descending") {
      sorted = sorted.sort((a, b) => b.title - a.title);
    }
    setSortedProducts(sorted);
  };
  const handlePriceFilter = () => {
    if (minPrice === "" && maxPrice === "") {
      toast.info("Vui lòng điền khoảng giá phù hợp")
    }
    else {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;

      const filteredProducts = productState?.filter((product) => {
        return product.price >= min && product.price <= max;
      });
      setFilterProducts(filteredProducts);
    }
  };
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
                  Danh mục sản phẩm
                </h3>
                <div>
                  <ul className='ps-0'>
                    {
                      categories && [...new Set(categories)]?.map((item, index) => {
                        return (
                          <li className='mb-2' key={index}>{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Lọc theo
                </h3>
                <div>

                  <h5 className="sub-title">
                    Giá
                  </h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating">
                      <input type="number" className="form-control" id="floatingInput" placeholder="from"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input type="number" className="form-control" id="floatingInput1" placeholder="to"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <div className='d-flex align-items-center mt-3 justify-content-center'>
                    <button className='button-filter form-control' onClick={handlePriceFilter}>
                      ÁP DỤNG
                    </button>
                  </div>

                  <h5 className="sub-title">
                    Đánh giá
                  </h5>

                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={5}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <ReactStars
                      count={5}
                      size={24}
                      value={2}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <ReactStars
                      count={5}
                      size={24}
                      value={1}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Nhãn sản phẩm
                </h3>
                <div>
                  <div className="product-tags d-flex align-items-center flex-wrap gap-10">
                    {
                      tags && [...new Set(tags)]?.map((item, index) => {
                        return (
                          <span onClick={() => setFilerTags(item)} className="text-capitalize badge bg-light text-secondary py-2 px-3 rounded-3" key={index} >{item}</span>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Thương hiệu
                </h3>
                <div>
                  <div className="product-tags d-flex align-items-center flex-wrap gap-10">
                    {
                      brands && [...new Set(brands)]?.map((item, index) => {
                        return (
                          <span onClick={() => setFilerBrands(item)} className="text-capitalize badge bg-light text-secondary py-2 px-3 rounded-3" key={index} >{item}</span>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Sản phẩm ngẫu nhiên
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
                        value={3}
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
                    <select name="manual" id="" className="form-control form-select"
                      onChange={handleSortChange}
                    >
                      <option value="manual">Tất cả</option>
                      <option value="best-selilng">
                        Bán chạy
                      </option>
                      <option value="title-ascending">Theo thứ tự, A-Z</option>
                      <option value="title-descending">Theo thứ tự, Z-A</option>
                      <option value="price-ascending">Giá, thấp đến cao</option>
                      <option value="price-descending">Giá, cao đến thấp</option>
                      <option value="created-ascending">Date, old to new</option>
                      <option value="created-descending" >Date, new to old</option>
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
                  {/* {!sortedProducts &&
                    <ProductCard data={productState} grid={grid} />
                  }
                  <ProductCard data={sortedProducts ? sortedProducts : productState} grid={grid} /> */}
                  {
                    sortedProducts && sortedProducts.length > 0 ? (
                      <ProductCard data={sortedProducts} grid={grid} />
                    ) : filterProducts && filterProducts.length > 0 ? (
                      <ProductCard data={filterProducts} grid={grid} />
                    ) : productState && productState.length > 0 ? (
                      <ProductCard data={productState} grid={grid} />
                    ) : (
                      <p>No products found</p>
                    )
                  }

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