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
            <div className="col-12">
              <div className="row">
                {
                  blogState?.map((item, index) => {
                    return (
                      <div className="col-6 mb-3 " key={index}>

                        <BlogCard id={item?._id} title={item?.title} description={item?.description}
                          image={item?.image}
                          date={moment(item?.createdAt).format('DD-MM-YYYY')}
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