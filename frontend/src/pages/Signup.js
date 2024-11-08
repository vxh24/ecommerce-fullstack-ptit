import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const signupSchema = yup.object({
  firstname: yup.string().required("First name is Require"),
  lastname: yup.string().required("Last name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  mobile: yup.string().required("Mobie no is Required"),
  password: yup.string().required("Password is Required")
});


const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
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
                    <input type="text" name="firstName" className="form-control" placeholder='First Name'
                      value={formik.values.firstname} onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")} />

                  </div>
                  <div className="error">
                    {
                      formik.touched.firstname && formik.errors.firstname
                    }
                  </div>
                  <div>
                    <input type="text" name='lastname' className="form-control mt-1" placeholder='Last Name'
                      value={formik.values.lastname} onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.lastname && formik.errors.lastname
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
                    <input type="mobile" name='mobile' className="form-control mt-1" placeholder='Mobile'
                      value={formik.values.mobile} onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.mobile && formik.errors.mobile
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