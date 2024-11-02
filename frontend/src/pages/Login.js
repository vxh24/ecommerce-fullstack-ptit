import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { Link } from "react-router-dom";
const Login = () => {
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
                <form action="" className='d-flex flex-column gap-30'>
                  <div>
                    <input type="email" name="email" className="form-control" placeholder='Email' />

                  </div>
                  <div>
                    <input type="password" name='password' className="form-control mt-1" placeholder='Password' />
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