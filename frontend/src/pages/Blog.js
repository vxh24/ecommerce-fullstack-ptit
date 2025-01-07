import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, getAllBlogCat } from "../features/blogs/blogSlice";
import moment from "moment";
const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blogs?.data);
  const dispatch = useDispatch();
  const [selectBlog, setSelectedBlog] = useState("");
  const blogCatState = useSelector((state) => state?.blog?.blogcat?.data);
  useEffect(() => {
    dispatch(getAllBlog());
    dispatch(getAllBlogCat());
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedBlog(category);
    if (category) {
      dispatch(getAllBlog({ category }));
    } else {
      dispatch(getAllBlog());
    }
  };

  return (
    <>
      <Meta title={"Danh sách bài viết"} />
      <BreadCrumb title="Bài viết" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Danh mục blog</h3>
                <div className=" filter-cat mb-3">
                  <ul className="ps-0">
                    {blogCatState &&
                      blogCatState?.map((item, index) => {
                        return (
                          <li
                            onClick={() => handleCategorySelect(item.title)}
                            className={
                              selectBlog === item.title
                                ? "mb-2 text-red"
                                : "mb-2"
                            }
                            key={index}
                          >
                            {item.title}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogState?.map((item, index) => {
                  return (
                    <div className="col-6 mb-3 " key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.image}
                        date={moment(item?.createdAt).format("DD-MM-YYYY")}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
