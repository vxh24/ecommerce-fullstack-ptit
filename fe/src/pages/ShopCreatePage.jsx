import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopCreate from "../components/Shop/ShopCreate.jsx";

const ShopCreatePage = () => {
  return (
    <div>
      <ShopCreate />
    </div>
  )
}

export default ShopCreatePage