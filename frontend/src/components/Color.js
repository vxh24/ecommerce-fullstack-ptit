import React, { useState } from 'react';

const Color = (props) => {
  const { colorData, setColor } = props;
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setColor(color);
  };

  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            const isSelected = selectedColor === item?._id;

            return (
              <>
                <li
                  key={index}
                  onClick={() => handleColorClick(item?._id)}
                  style={{
                    backgroundColor: item?.title,
                    border: isSelected ? '3px solid #007bff' : 'none',
                    borderRadius: '50%',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: isSelected ? '0 0 15px rgba(0, 123, 255, 0.6)' : 'none',
                  }}
                  className="color-item"
                ></li>
              </>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
