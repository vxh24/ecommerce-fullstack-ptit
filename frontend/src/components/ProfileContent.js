import React, { useState } from 'react'
import { useFormik } from 'formik';
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
const profileSchema = yup.object({
  name: yup.string().required("Name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Mobie no is Required"),
  address: yup.string().required("address is Required")
});
const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state?.auth?.user?.user)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userState?.name,
      email: userState?.email,
      phone: userState?.name,
      address: userState?.email,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      // dispatch(createUser(values));
    },
  });
  return (
    <div className='w-100'>
      {active === 1 && (
        <>
          <div className="justify-center-between w-100">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Name</label>
                <input name="name" type="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                />
                <div className="error">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Phone</label>
                <input name="phone" type="phone" className="form-control" id="exampleInputPassword1"
                  value={formik.values.phone}
                  onChange={formik.handleChange("phone")}
                  onBlur={formik.handleBlur("phone")}
                />
                <div className="error">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Address</label>
                <input name="address" type="address" className="form-control" id="exampleInputPassword1"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
          {/* <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div> */}
        </>
      )}
    </div>
  )
}

export default ProfileContent