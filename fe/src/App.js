import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignupPage, HomePage, ProductsPage, BestSellinngPage, EventsPgae, FaqPage } from "./Routes.js"
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
      </Routes>
    </BrowserRouter>
  )
}

export default App;