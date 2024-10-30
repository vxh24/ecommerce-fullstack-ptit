import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom"
const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  console.log(location);
  return (
    <>
      <div className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
        <Link to=":id" className="product-card position-relative">
          <div className="wishlis-icon position-absolute">
            <Link><img src="images/wish.svg" alt="wish" /></Link>
          </div>
          <div className="product-image">
            <img src="images/watch.jpg" className='img-fluid' alt="product image" />
            <img src="images/watch1.jpg" className='img-fluid' alt="product image" />
          </div>
          <div className="product-details">
            <h6 className='brand'>Havels</h6>
            <h5 className="product-title">Tai nghe không dây Tai nghe bluetooth Mini Tws pro4 In-Ear cho Android</h5>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid == 12 ? "d-block" : "d-none"}`}>Kết nối lần đầu: Bật tai nghe Bluetooth: chạm vào 2 tai nghe trong khoảng 3 giây để kích hoạt cả 2 tai nghe cùng lúc. Đặt hai tai nghe cạnh nhau để chúng có thể ghép nối.
              - Sau đó nhập danh sách Bluetooth, tìm kết nối và kết nối</p>
            <p className='price'>$5000</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
              <Link><img src="images/view.svg" alt="view" /></Link>
              <Link><img src="images/add-cart.svg" alt="add cart" /></Link>

            </div>
          </div>
        </Link>
      </div>
      <div className={`${location.pathname == "/product" ? `gr-${grid}` : "col-3"}`}>
        <Link className="product-card position-relative">
          <div className="wishlis-icon position-absolute">
            <Link><img src="images/wish.svg" alt="wish" /></Link>
          </div>
          <div className="product-image">
            <img src="images/watch.jpg" className='img-fluid' alt="product image" />
            <img src="images/watch1.jpg" className='img-fluid' alt="product image" />
          </div>
          <div className="product-details">
            <h6 className='brand'>Havels</h6>
            <h5 className="product-title">Tai nghe không dây Tai nghe bluetooth Mini Tws pro4 In-Ear cho Android</h5>
            <ReactStars
              count={5}
              size={24}
              value="3"
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid == 12 ? "d-block" : "d-none"}`}>Kết nối lần đầu: Bật tai nghe Bluetooth: chạm vào 2 tai nghe trong khoảng 3 giây để kích hoạt cả 2 tai nghe cùng lúc. Đặt hai tai nghe cạnh nhau để chúng có thể ghép nối.
              - Sau đó nhập danh sách Bluetooth, tìm kết nối và kết nối</p>
            <p className='price'>$5000</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link><img src="images/prodcompare.svg" alt="compare" /></Link>
              <Link><img src="images/view.svg" alt="view" /></Link>
              <Link><img src="images/add-cart.svg" alt="add cart" /></Link>

            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ProductCard