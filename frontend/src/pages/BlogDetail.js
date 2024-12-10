import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog, getBlog } from "../features/blogs/blogSlice";
import moment from "moment";
import { BiLike, BiDislike } from "react-icons/bi";
const BlogDetail = () => {
  const blogState = useSelector((state) => state?.blog?.singleblog?.data);
  const blogState1 = useSelector((state) => state?.blog?.blogs?.data);
  const firstFourBlogs = blogState1?.slice(0, 3) || [];
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(1800);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDisliked(false);
      }
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      }
      setDisliked(true);
    }
  };
  useEffect(() => {
    getblog();
    dispatch(getAllBlog());
  }, []);
  const getblog = () => {
    dispatch(getBlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-9">
              <div className="single-blog-card">
                <img
                  src={blogState?.image}
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <div className="like-dislike-container">
                  <div className="like-button" onClick={handleLike}>
                    <BiLike className={`icon ${liked ? "active" : ""}`} />
                    <p className="count">{likeCount.toLocaleString()} |</p>
                  </div>
                  <div className="dislike-button" onClick={handleDislike}>
                    <BiDislike className={`icon ${disliked ? "active" : ""}`} />
                  </div>
                </div>
                <h3 className="title">{blogState?.title}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: blogState?.description }}
                ></p>
                <Link to="/blog" className="d-flex align-items-center gap-10">
                  <IoMdArrowBack className="fs-5" /> Trở lại blog
                </Link>
              </div>
            </div>
            <div className="col-3">
              <div className="blog-sidebar border-bottom">
                <p className="bold-text mt-2 ms-2">Bài viết nổi bật</p>
              </div>
              <div className="blog-featured">
                {firstFourBlogs &&
                  firstFourBlogs.map((item, index) => {
                    return (
                      <div
                        className="random-products d-flex mb-3"
                        key={index}
                        onClick={() => {
                          dispatch(getBlog(item._id));
                          navigate(`/blog/${item._id}`);
                        }}
                      >
                        <div className="w-50">
                          <img
                            src={item?.image}
                            className="img-fluid p-2"
                            alt="watch"
                          />
                        </div>
                        <div className="w-50">
                          <h5 className="mt-2">{item.title}</h5>

                          <p>{moment(item?.createdAt).format("DD-MM-YYYY")}</p>
                        </div>
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

export default BlogDetail;
