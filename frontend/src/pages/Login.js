import React from 'react'
import Meta from '../components/Meta';
import { GoogleOAuthProvider } from '@react-oauth/google';
import BreadCrumb from '../components/BreadCrumb'
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { googlelogin, handleLogin } from '../features/user/userSlice';
import { GoogleLogin } from '@react-oauth/google';
const clientId = '354282151928-io0qjv0qkn919lnf89efelaja0fp0njn.apps.googleusercontent.com';
// import axios from "axios";
const LoginSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid").required("Email Address is Required"),
  password: yup.string().required("Password is Required")
});
const Login = () => {
  const authState = useSelector(state => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(handleLogin(values));
      navigate("/");
    },
  });
  const handleSuccess = async (credentialResponse) => {
    try {
      dispatch(googlelogin({ token: credentialResponse.credential }));
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }
  const handleError = () => {
    alert("Login Failled")
  }
  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className='text-center mb-3'>Login</h3>
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <div>
                    <input type="email" name="email" className="form-control" placeholder='Email'
                      value={formik.values.email} onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")} />

                  </div>
                  <div className="error">
                    {
                      formik.touched.email && formik.errors.email
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
                    <Link to="/forgot-password" className='mb-3'>Forgot Password?</Link>
                    <GoogleLogin
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center mb-3">
                      <button className="button border-0">Login</button>
                      <Link className='button signup' to="/sign-up" >Sign Up</Link>
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

export default Login