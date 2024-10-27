import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  LoginPage, SignupPage, HomePage, ProductsPage, BestSellinngPage, EventsPgae, FaqPage, ProductDetailsPage, ProfilePage,
  CheckoutPage,
} from "./routes/Routes.js"
import {
  AdminDashboardPage, AdminDashboardUsers, AdminDashboardSellers, AdminDashboardOrders, AdminDashboardProducts, AdminDashboardEvents, AdminDashboardWithdraw
} from "./routes/AdminRoutes.js"
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
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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