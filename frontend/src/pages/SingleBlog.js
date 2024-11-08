import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation } from "react-router-dom";
import BlogCard from "../components/BlogCard"
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../features/blogs/blogSlice';
const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleblog?.data);
  // console.log(blogState);
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  useEffect(() => {
    getblog();
  }, []);
  const getblog = () => {
    dispatch(getBlog(getBlogId));
  }
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">

                <h3 className="title">{blogState?.title}</h3>
                <img src={blogState?.image} className='img-fluid w-100 my-4' alt="blog" />
                <p>{blogState?.description}</p>
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