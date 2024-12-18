import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { GoDeviceCameraVideo } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RatingProduct, resetState } from '../features/products/productSlice';
import { useEffect } from "react";
const ProductReview = ({ product }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(0);
  const [success, setSuccess] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos((prev) => [...prev, ...files]);
  };
  const [star, setStar] = useState(null);
  const [comment, SetComment] = useState(null);
  const handleRatingChange = (value) => {
    setStar(value);
  };
  const addToRatingProduct = () => {
    if (star === null) {
      toast.info("Vui lòng chọn số sao");
      return false;
    }
    else if (comment === null) {
      toast.info("Bình luận không được để trống");
      return false;
    }
    else {
      dispatch(RatingProduct({ star: star, comment: comment, productId: product._id }));
      setSuccess(true);
    }
    return false;
  }

  return (
    <div className="review-modal">
      <h2>Đánh Giá Sản Phẩm</h2>
      <div className="product-info gap-15">
        <img
          src={product.images[0].url}
          alt="product"
          className="product-image-review"
        />
        <p>{product?.name}</p>
      </div>

      <div className="rating-section d-flex align-items-center">
        <h4 className="fs-5 mb-0">Chất lượng sản phẩm</h4>
        <div className="d-flex align-items-center gap-10">
          <div className="stars d-flex align-items-center ms-4">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    style={{ display: "none" }}
                    value={currentRating}
                    onClick={() => handleRatingChange(currentRating)}
                  />
                  <FaStar
                    size={30}
                    color={currentRating <= (hover || star) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          <span className="bold-text" style={{ color: "#FFC107" }}>{star === 5 ? "Tuyệt vời" : ""}</span>
        </div>
      </div>

      <div className="review-input mb-2">
        <textarea
          rows="4"
          placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
          onChange={(e) => {
            SetComment(e.target.value);
          }}
        ></textarea>
      </div>

      {/* <div className="upload-section">
        <div className="d-flex gap-15">
          <div className="upload-data file btn btn-lg btn-primary d-flex align-items-center gap-10">
            <CiCamera className="" /><p className="mb-0">Thêm hình ảnh</p>
            <input type="file" name="file" />
          </div>
          <div className="upload-data file btn btn-lg btn-primary d-flex align-items-center gap-10">
            <GoDeviceCameraVideo className="" /><p className="mb-0">Thêm video</p>
            <input type="file" name="file" />
          </div>
        </div>
      </div> */}


      <div className="d-flex justify-content-end">
        {
          success ? (
            <Link className="btn btn-submit button my-3" to={`/product/${product._id}#target-section`}>
              Xem đánh giá
            </Link>
          ) : (
            <button className="btn btn-submit button my-3" onClick={addToRatingProduct}>
              Đánh giá
            </button>
          )
        }
        {/* <Link className="btn btn-submit button my-3" to={`/product/${product._id}#target-section`}>
          Xem đánh giá
        </Link>
        <button className="btn btn-submit button my-3" onClick={addToRatingProduct}>
          Hoàn Thành
        </button> */}
      </div>
    </div>
  );
};

export default ProductReview;
