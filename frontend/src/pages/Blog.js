import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import BlogCard from "../components/BlogCard"
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../features/blogs/blogSlice';
import moment from "moment";
const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blogs?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlog());
  }
  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* <div className="col-3">
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Find by categories
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
            </div> */}
            <div className="col-12">
              <div className="row">
                {
                  blogState?.map((item, index) => {
                    return (
                      <div className="col-6 mb-3 " key={index}>

                        <BlogCard id={item?._id} title={item?.title} description={item?.description}
                          image={item?.image}
                          date={moment(item?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        />
                      </div>
                    )
                  })
                }


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog 