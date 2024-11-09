import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { forgotPass } from '../features/user/userSlice';
const ForgotSchema = yup.object({
  email: yup.string().nullable().email("Email should be valid").required("Email Address is Required"),
});
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotSchema,
    onSubmit: (values) => {
      dispatch(forgotPass(values));
    },
  });
  return (
    <>
      <Meta title={"ForgotPassword"} />
      <BreadCrumb title="ForgotPassword" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className='text-center mb-3'>Reset Your Password</h3>
                <p className='text-center mb-3 fs-13'>We will send you an email to reset password</p>
                <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-column gap-30'>
                  <div>
                    <input type="email" name="email" className="form-control" placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")} />

                  </div>
                  <div className="error">
                    {
                      formik.touched.email && formik.errors.email
                    }
                  </div>
                  <div>
                    <div className="mt-1 d-flex justify-content-center gap-15 align-items-center flex-column">
                      <button className="button border-0" type='submit' >Submit</button>
                      <Link to="/login">Cancel</Link>
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

export default ForgotPassword