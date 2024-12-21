import React from 'react'
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './Chat';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfileSlice } from '../features/user/userSlice';
const Layout = () => {
  const dispatch = useDispatch();
  const customer = JSON.parse(localStorage.getItem("customer"));
  useEffect(() => {
    if (customer) {
      dispatch(getProfileSlice())
    }
  }, [])
  return (
    <>
      <Header />
      <Outlet />
      <Chat />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Layout