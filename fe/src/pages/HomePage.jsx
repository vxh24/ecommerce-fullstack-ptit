import React from 'react'
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import FeatureProduct from "../components/Route/FeatureProduct/FeatureProduct.jsx";
import Events from "../components/Events/Events.jsx";
import Sponsored from "../components/Route/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeatureProduct />
      <Sponsored />
      <Footer />
    </div>
  )
}

export default HomePage;