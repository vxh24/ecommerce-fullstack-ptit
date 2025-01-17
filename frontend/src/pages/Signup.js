import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/user/userSlice";

const signupSchema = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().nullable().email("Vui lòng nhập địa chỉ email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
});

const Signup = () => {
  const authState = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      dispatch(createUser(values));
    },
  });
  useEffect(() => {
    if (authState?.createUser?.data !== undefined) {
      navigate("/login");
    }
  }, [authState]);
  return (
    <>
      <Meta title={"Đăng ký"} />
      <BreadCrumb title="Đăng ký" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3" style={{ fontSize: "25px" }}>
                  Đăng ký
                </h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Tên"
                      value={formik.values.name}
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="form-control mt-1"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <div>
                    <input
                      type="phone"
                      name="phone"
                      className="form-control mt-1"
                      placeholder="Số điện thoại"
                      value={formik.values.phone}
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      className="form-control mt-1"
                      placeholder="Mật khẩu"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0 w-100">Đăng ký</button>
                    </div>
                    <div className="d-flex justify-content-center gap-10 align-items-center mt-3">
                      <h3 className="">Bạn đã có tài khoản?</h3>
                      <Link className="signup" to="/login">
                        <h4>Đăng nhập</h4>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
