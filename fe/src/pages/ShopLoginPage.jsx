import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopLogin from "../components/Shop/ShopLogin.jsx";

const ShopLoginPage = () => {
  return (
    <div>
      <ShopLogin />
    </div>
  )
}

export default ShopLoginPage