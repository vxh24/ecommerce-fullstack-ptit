import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { GoDeviceCameraVideo } from "react-icons/go";
const ProductReview = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
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

  const handleSubmit = () => {
    const reviewData = {
      rating,
      reviewText,
      images,
      videos,
    };
    console.log("Submitted Review:", reviewData);
    alert("Đánh giá đã được gửi!");
  };

  return (
    <div className="review-modal">
      <h2>Đánh Giá Sản Phẩm</h2>
      <div className="product-info gap-15">
        <img
          src="https://via.placeholder.com/100"
          alt="product"
          className=".product-image-review"
        />
        <p>{product?.title}</p>
      </div>

      <div className="rating-section d-flex align-items-center">
        <h4 className="fs-5 mb-0">Chất lượng sản phẩm</h4>
        <div className="stars ms-4">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  style={{ display: "none" }}
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                <FaStar
                  size={30}
                  color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <span>{rating === 5 ? "Tuyệt vời" : ""}</span>
      </div>

      <div className="review-input">
        <textarea
          rows="4"
          placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <div className="upload-section">
        <div className="d-flex gap-15 mt-3">
          <div className="upload-data file btn btn-lg btn-primary d-flex align-items-center gap-10">
            <CiCamera className="" /><p className="mb-0">Thêm hình ảnh</p>
            <input type="file" name="file" />
          </div>
          <div className="upload-data file btn btn-lg btn-primary d-flex align-items-center gap-10">
            <GoDeviceCameraVideo className="" /><p className="mb-0">Thêm video</p>
            <input type="file" name="file" />
          </div>
        </div>
      </div>


      <div className="d-flex justify-content-end">
        <button className="btn btn-submit button my-3" onClick={handleSubmit}>
          Hoàn Thành
        </button>
      </div>
    </div>
  );
};

export default ProductReview;
