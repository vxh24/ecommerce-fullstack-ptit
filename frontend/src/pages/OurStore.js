import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { Helmet } from "react-helmet";
import Meta from '../components/Meta';
const OurStore = () => {
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Shop" />
    </>
  )
}

export default OurStore