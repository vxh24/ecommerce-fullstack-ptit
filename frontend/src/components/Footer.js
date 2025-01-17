import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { BsSearch, BsLinkedin, BsGithub, BsInstagram, BsYoutube } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt='' />
                <h2 className="mb-0 text-white">Đăng ký để nhận các thông tin</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input type="text" className="form-control py-1" placeholder="Your Email..." aria-label="Your Email..." aria-describedby="basic-addon2" />
                <span className="input-group-text p-2" id="basic-addon2">Đăng ký</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className='text-white mb-4'>Liên hệ chúng tôi</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Demo shop</Link>
                <Link className='text-white py-2 mb-1'>DinhCong, HoangMai, HaNoi</Link>
                <Link className='text-white py-2 mb-1'>VN</Link>
                <Link className='text-white py-2 mb-1'>vxh@gmail.com</Link>
                <div className="social_icons d-flex align-items-center gap-30">
                  <Link className='text-white fs-4' to=''>
                    <BsLinkedin />
                  </Link>
                  <Link className='text-white fs-4' to=''>
                    <BsInstagram />
                  </Link>
                  <Link className='text-white fs-4' to=''>
                    <BsGithub />
                  </Link>
                  <Link className='text-white fs-4' to=''>
                    <BsYoutube />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Thông tin</h4>
              <div className='footer-links d-flex flex-column'>
                <Link to="/privacy-policy" className='text-white py-2 mb-1'>Chính sách bảo mật</Link>
                <Link to="/refund-policy" className='text-white py-2 mb-1'>Chính sách hoàn tiền</Link>
                <Link to="/shipping-policy" className='text-white py-2 mb-1'>Vận chuyển</Link>
                <Link to="/term-and-contion" className='text-white py-2 mb-1'>Điều khoản và điều kiện</Link>
                <Link to="/blogs" className='text-white py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className='text-white mb-4'>Tài khoản</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Về chúng tôi</Link>
                <Link className='text-white py-2 mb-1'>Faq</Link>
                <Link className='text-white py-2 mb-1'>Liên hệ</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className='text-white mb-4'>Liên kết nhanh</h4>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white py-2 mb-1'>Laptops</Link>
                <Link className='text-white py-2 mb-1'>Headphones</Link>
                <Link className='text-white py-2 mb-1'>Tablets</Link>
                <Link className='text-white py-2 mb-1'>Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className='text-center mb-0 text-white'>&copy; {new Date().getFullYear()}; Powered by vxh</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer