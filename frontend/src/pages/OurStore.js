import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import axios from "axios";
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, searchProductSlice } from '../features/products/productSlice';
import Pagination from '../components/Pagination';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { useLocation, useNavigate } from 'react-router-dom';
const OurStore = () => {
  const location = useLocation();
  const message = location.state || {};
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.products?.data);
  const brandState = useSelector(state => state?.brand?.brands?.data);
  const categoryState = useSelector(state => state?.category?.Categories?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [randomProducts, setRandomProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(message.category || "");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (productState?.length > 2) {
      const shuffled = [...productState].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 2));
    } else {
      setRandomProducts(productState);
    }
  }, [productState]);
  useEffect(() => {
    dispatch(getBrands())
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    let category = [];
    let newtags = new Set();
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      category.push(element.category);
      element.tags.forEach((tag) => newtags.add(tag))
    }
    setCategories(category);
    setTags(newtags);
  }, [productState])

  useEffect(() => {
    let newtags = new Set();
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      const parsedTags = JSON.parse(element.tags);
      parsedTags.forEach((tag) => newtags.add(tag))


      setTags(newtags);
    }
  }, [productState]);
  // console.log(tags);
  const productSearch = useSelector(state => state?.product?.search?.data);
  const [productSearch1, setProductSearch1] = useState(productSearch);
  useEffect(() => {
    if (productSearch) {
      setProducts(null);
      setProductSearch1(productSearch);
    }
  }, [productSearch]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [click, setClick] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, limit: 8 });
  const [filters, setFilters] = useState({ sort: "", fields: "" });
  const indexOfLastProduct = currentPage * pagination.limit;
  const indexOfFirstProduct = indexOfLastProduct - pagination.limit;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        ...(filters.sort !== "" && { "sort": filters.sort }),
        ...(minPrice && { "price[gte]": minPrice }),
        ...(maxPrice && { "price[lte]": maxPrice }),
        ...(selectedBrand && selectedBrand.length > 0 && {
          "brand": selectedBrand.join("&brand=")
        }),
        ...(selectedCategory && { "category": selectedCategory }),
      }).toString();
      const finalQuery = query.replace(/%26/g, "&").replace(/%3D/g, "=");
      const response = await axios.get(`http://localhost:5000/v1/api/product?${finalQuery}`);
      setProducts(response.data.data);
      setTotalItems(response.data.data.length);
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (message.category) {
        setSelectedCategory(message.category)
      }
    }, 100)
  }, [message.category])
  useEffect(() => {
    setTimeout(() => {
      if (message.message) {
        setSelectedCategory("");
        dispatch(searchProductSlice(message.message));
      }
      // setSelectedCategory("");
    }, 100)
    setTimeout(() => {
      navigate(location.pathname, { replace: true, state: null });
    }, 800)
  }, [message.message, selectedCategory])
  useEffect(() => {
    if (click === true) {
      fetchProducts();
      setClick(false);
      return;
    }
    else if (selectedBrand) {
      fetchProducts();
      return;
    }
    else if (filters) {
      fetchProducts();
      return;
    }
    else if (selectedCategory) {
      fetchProducts();
      return;
    }
  }, [filters, click, selectedBrand, selectedCategory]);
  console.log(selectedCategory);
  const clearAll = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedTag("");
    setSelectedBrand([]);
    setSelectedCategory("");
    fetchProducts();

  }
  const handleBrandChange = (brand) => {
    setSelectedBrand(prevState => {
      if (prevState.includes(brand)) {
        return prevState.filter(item => item !== brand);
      } else {
        return [...prevState, brand];
      }
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPagination({ ...pagination, page: page });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Đang tải sản phẩm...</div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <>
      <Meta title={"Cửa hàng"} />
      <BreadCrumb title="Cửa hàng" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Danh mục sản phẩm
                </h3>
                <div className=' filter-cat'>
                  <ul className='ps-0'>
                    {
                      categoryState && categoryState?.map((item, index) => {
                        return (
                          <li
                            onClick={() => {
                              setSelectedCategory(item.title); setProductSearch1(null);
                              if (message.message !== null) {
                                navigate(location.pathname, { replace: true, state: null });
                              }
                            }}
                            // className='mb-2' 
                            className={selectedCategory === item.title ? "mb-2 text-red" : "mb-2"}
                            key={index}>{item.title}</li>
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
                    <button className='button-filter form-control' onClick={() => setClick(true)}>
                      ÁP DỤNG
                    </button>
                  </div>

                  {/* <h5 className="sub-title">
                    Đánh giá
                  </h5> */}

                  {/* <div>
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
                  </div> */}
                </div>
              </div>
              {/* <div className='filter-card mb-3'>
                <div class="filter-section">
                  <h3 className="filter-title">
                    Nhãn sản phẩm
                  </h3>
                  <div>
                    <div className="checkbox-group">
                      {
                        tags && [...new Set(tags)]?.map((item, index) => {
                          return (
                            <label key={index} className="">
                              <input type="checkbox"
                                checked={selectedTag === item}
                                onChange={() => setSelectedTag(item)}
                                value="Shopee Mall" />{item}
                            </label>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div> */}

              <div className='filter-card mb-3'>
                <div className="filter-section">
                  <h3 className="filter-title">
                    Thương hiệu
                  </h3>
                  <div class="checkbox-group">
                    {
                      brandState && brandState.map((item, index) => {
                        return (
                          <label key={index} >
                            <input
                              checked={selectedBrand.includes(item.title)}
                              onChange={() => handleBrandChange(item.title)}
                              type="checkbox" value="Shopee Mall" />{item.title}
                          </label>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center mt-3 justify-content-center'>
                <button className='button-filter form-control' onClick={clearAll}>
                  Xóa tất cả
                </button>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Sản phẩm ngẫu nhiên
                </h3>
                <div>
                  {randomProducts && randomProducts.map((item, index) => {
                    return (
                      <div className="random-products d-flex mb-3" key={index}>
                        <div className="w-50">
                          <img src={item?.images[0]?.url} className='img-fluid p-2' alt="watch" />
                        </div>
                        <div className="w-50">
                          <h5 className='mt-2'>{item.name}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={parseInt(item.totalRatings, 10)}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <h5 className='price'>{item.price}<span className='currency'>đ</span></h5>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className='mb-0 d-block' style={{ "width": "100px" }}>Sort By:</p>
                    <div>
                      <select name="sort" onChange={handleFilterChange} value={filters.sort}>
                        <option value="">Sắp xếp</option>
                        <option value="name-asc">Tên A-Z</option>
                        <option value="name-desc">Tên Z-A</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                      </select>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='totalproducts mb-0'>{productSearch1 ? productSearch1.length : products?.length} Sản phẩm</p>
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
                  {currentProducts && currentProducts?.length > 0 ? (
                    <ProductCard data={currentProducts} grid={grid} />
                  )

                    : productSearch1 && productSearch1.length > 0 ? (
                      <ProductCard data={productSearch1} grid={grid} />
                    )
                      : (
                        <p>No product</p>
                      )}

                </div>
              </div>

            </div>
            <div className='d-flex justify-content-end'>
              <Pagination
                totalItems={totalItems}
                limit={pagination.limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurStore