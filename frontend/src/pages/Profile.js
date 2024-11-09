import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
const profileSchema = yup.object({
  name: yup.string().required("Name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Mobie no is Required"),
  address: yup.string().required("address is Required")
});
const Profile = () => {
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
    <>
      <Meta title={"Profile"} />
      <BreadCrumb title="Profile" />
      <div className="profile-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile