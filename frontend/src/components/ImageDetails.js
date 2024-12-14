import React from "react";

const ImageDetails = ({ images, currentIndex, onClose, setCurrentIndex }) => {
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-detail-overlay">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>

      <div className="image-detail-container">
        <div className="image-detail-main-image">
          <button className="nav-button1 left" onClick={handlePrevious}>
            &#10094;
          </button>
          <img src={images[currentIndex].url} alt="Lightbox" />
          <button className="nav-button1 right" onClick={handleNext}>
            &#10095;
          </button>
        </div>

        <div className="image-detail-thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              className={`image-detail ${currentIndex === index ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
