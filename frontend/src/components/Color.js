import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllColors } from '../features/color/colorSlice';
const Color = (props) => {
  const { colorData, setColor } = props;
  return (
    <>
      <ul className='colors ps-0'>
        {
          colorData && colorData?.map((item, index) => {
            return (
              <li onClick={() => setColor(item?.title)} style={{ backgroundColor: item?.title }} key={index}></li>
            )
          })
        }
      </ul>
    </>
  )
}

export default Color