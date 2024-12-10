import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard"
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { dislikeSlice, getAllBlog, getBlog, likeSlice } from '../features/blogs/blogSlice';
import moment from "moment";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleblog?.data);
  const blogState1 = useSelector((state) => state?.blog?.blogs?.data);
  const firstFourBlogs = blogState1?.slice(0, 3) || [];
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = (id) => {
    dispatch(likeSlice({ blogId: id }));
    setTimeout(() => {
      dispatch(getBlog(getBlogId));
    }, 200);
  };

  const handleDislike = (id) => {
    dispatch(dislikeSlice({ blogId: id }));
    setTimeout(() => {
      dispatch(getBlog(getBlogId));
    }, 200)
  };
  useEffect(() => {
    getblog();
    dispatch(getAllBlog());
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
            <div className="col-9">
              <div className="single-blog-card">
                <img src={blogState?.image} className='img-fluid w-100 my-4' alt="blog" />
                <div className="like-dislike-container">
                  <div className="like-button" onClick={() => { handleLike(blogState?._id) }}>
                    <AiFillLike className={`icon ${blogState?.isLiked ? "active" : ""}`} />
                  </div>
                  <div className="dislike-button" onClick={() => { handleDislike(blogState?._id) }}>
                    <AiFillDislike className={`icon ${blogState?.isDisliked ? "active" : ""}`} />
                  </div>
                </div>
                <h3 className="title">{blogState?.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: blogState?.description }}></p>
                <Link to="/blog" className='d-flex align-items-center gap-10'><IoMdArrowBack className='fs-5' /> Trở lại blog</Link>
              </div>
            </div>
            <div className='col-3'>
              <div className='blog-sidebar border-bottom'>
                <p className='bold-text mt-2 ms-2'>Bài viết nổi bật</p>
              </div>
              <div className='blog-featured'>
                {firstFourBlogs && firstFourBlogs.map((item, index) => {
                  return (
                    <div className="random-products d-flex mb-3" key={index} onClick={() => { dispatch(getBlog(item._id)); navigate(`/blog/${item._id}`) }}>
                      <div className="w-50">
                        <img src={item?.image} className='img-fluid p-2' alt="watch" />
                      </div>
                      <div className="w-50">
                        <h5 className='mt-2'>{item.title}</h5>

                        <p>{moment(item?.createdAt).format('DD-MM-YYYY')}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleBlog