import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { ResetPassWord } from '../features/user/userSlice';
const ResetSchema = yup.object({
  password: yup.string().required("Password is Required"),
  confpassword: yup.string().required("Password is Required")
});
const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confpassword: "",
    },
    validationSchema: ResetSchema,
    onSubmit: (values) => {
      dispatch(ResetPassWord({ token: getToken, password: values.password }));
      navigate("/login");
    },
  });
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className='text-center mb-3'>Reset Password</h3>
                <form onSubmit={formik.handleSubmit} action="" className='d-flex flex-column gap-15'>
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
                    <input type="password" name='confpassword' className="form-control mt-1" placeholder='Confirm Password'
                      value={formik.values.confpassword} onChange={formik.handleChange("confpassword")}
                      onBlur={formik.handleBlur("confpassword")} />
                  </div>
                  <div className="error">
                    {
                      formik.touched.confpassword && formik.errors.confpassword
                    }
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">OK</button>
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

export default ResetPassword