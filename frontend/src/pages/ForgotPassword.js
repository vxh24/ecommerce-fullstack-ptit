import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { forgotPass } from "../features/user/userSlice";
const ForgotSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Vui lòng nhập email hợp lệ")
    .required("Vui lòng nhập địa chỉ email"),
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
      <Meta title={"Quên mật khẩu"} />
      <BreadCrumb title="Quên mật khẩu" />
      <div className="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>
                <p className="text-center mb-3 fs-13">
                  Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex flex-column gap-30"
                >
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
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
                    <div className="mt-1 d-flex justify-content-center gap-15 align-items-center flex-column">
                      <button className="button border-0" type="submit">
                        Hoàn thành
                      </button>
                      <Link to="/login">Quay lại</Link>
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

export default ForgotPassword;
