import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { handleLogin } from '../features/user/userSlice';
const LoginSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid").required("Email Address is Required"),
  password: yup.string().required("Password is Required")
});
const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(handleLogin(values));
      // alert(JSON.stringify(values));
    },
  });
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
                <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-30'>
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
                    <Link to="/forgot-password">Forgot Password</Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
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