import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  LoginPage, SignupPage, HomePage, ProductsPage, BestSellinngPage, EventsPgae, FaqPage, ProductDetailsPage, ProfilePage,
  CheckoutPage, ShopCreatePage, ShopLoginPage, ShopHomePage, BlogPage,

} from "./routes/Routes.js"
import {
  AdminDashboardPage, AdminDashboardUsers, AdminDashboardSellers, AdminDashboardOrders, AdminDashboardProducts, AdminDashboardEvents, AdminDashboardWithdraw
} from "./routes/AdminRoutes.js"
import { ShopDashboardPage, } from "./routes/ShopRoutes.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/best-selling" element={<BestSellinngPage />} />
        <Route path="/events" element={<EventsPgae />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/*shop Routers */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <ShopHomePage />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ShopDashboardPage />
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminDashboardPage />
          }
        />
        <Route
          path="/admin-users"
          element={
            <AdminDashboardUsers />
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <AdminDashboardSellers />
          }
        />
        <Route
          path="/admin-orders"
          element={
            <AdminDashboardOrders />
          }
        />
        <Route
          path="/admin-products"
          element={
            <AdminDashboardProducts />
          }
        />
        <Route
          path="/admin-events"
          element={
            <AdminDashboardEvents />
          }
        />
        <Route
          path="/admin-withdraw-request"
          element={
            <AdminDashboardWithdraw />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;