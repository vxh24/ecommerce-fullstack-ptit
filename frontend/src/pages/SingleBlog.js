import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard"
import { IoMdArrowBack } from "react-icons/io";
const SingleBlog = () => {
  return (
    <>
      <Meta title={"Single Blog"} />
      <BreadCrumb title="Single Blog" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">

                <h3 className="title">A beautifull Sunday Morning</h3>
                <img src="images/blog-1.jpg" className='img-fluid w-100 my-4' alt="blog" />
                <p>Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng</p>
                <Link to="/blog" className='d-flex align-items-center gap-10'><IoMdArrowBack className='fs-5' /> Go Back to Blogs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlog