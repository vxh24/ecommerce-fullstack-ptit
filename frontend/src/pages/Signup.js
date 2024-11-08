import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import { createUser } from '../features/user/userSlice';

const signupSchema = yup.object({
  name: yup.string().required("First name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Mobie no is Required"),
=======
import { registerUser } from '../features/user/userSlice';

const signupSchema = yup.object({
  firstname: yup.string().required("First name is Require"),
  lastname: yup.string().required("Last name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  mobile: yup.string().required("Mobie no is Required"),
>>>>>>> 252030fac666786ed9459a57f357ff2005782f30
  password: yup.string().required("Password is Required")
});


const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      // lastname: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(createUser(values));
    },
  });
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className='text-center mb-3'>Create Account</h3>
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input type="text" name="name" className="form-control" placeholder='First Name'
                      value={formik.values.name} onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")} />

                  </div>
                  <div className="error">
                    {
                      formik.touched.name && formik.errors.name
                    }
                  </div>
                  <div>
                    <input type="email" name='email' className="form-control mt-1" placeholder='Email'
                      value={formik.values.email} onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.email && formik.errors.email
                    }
                  </div>
                  <div>
                    <input type="mobile" name='phone' className="form-control mt-1" placeholder='Mobile'
                      value={formik.values.phone} onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.phone && formik.errors.phone
                    }
                  </div>
                  <div>
                    <input type="password" name='password' className="form-control mt-1" placeholder='Password'
                      value={formik.values.password} onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.password && formik.errors.password
                    }
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup