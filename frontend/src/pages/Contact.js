import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
import { IoHomeOutline } from "react-icons/io5";
import { IoMdCall, IoMdInformationCircleOutline, IoIosMail } from "react-icons/io";
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { createQuery } from "../features/contact/contactSlice"
const contactSchema = yup.object({
  name: yup.string().required("Name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Mobie no is Required"),
  comment: yup.string().required("Comment is Required")
});

const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <Meta title={"Liên hệ"} />
      <BreadCrumb title="Liên hệ chúng tôi" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14163.589951757775!2d105.81840269830751!3d20.983889590464564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acf587927d3f%3A0x407ca203a0891b89!2zxJDhu4tuaCBDw7RuZywgSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1730450116406!5m2!1svi!2s" width="600" height="450" className="border-0 w-100" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Liên hệ</h3>
                  <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                    <div>
                      <input type="text" className="form-control" placeholder="Tên"
                        name="name" onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                        value={formik.values.name}
                      />
                    </div>
                    <div className="error">
                      {
                        formik.touched.name && formik.errors.name
                      }
                    </div>
                    <div>
                      <input type="email" className="form-control" placeholder="Emai"
                        name="email" onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}
                      />
                    </div>
                    <div className="error">
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </div>
                    <div>
                      <input type="tel" className="form-control" placeholder="Số điện thoại"
                        name="phone" onChange={formik.handleChange("phone")}
                        onBlur={formik.handleBlur("phone")}
                        value={formik.values.phone}
                      />
                    </div>
                    <div className="error">
                      {
                        formik.touched.phone && formik.errors.phone
                      }
                    </div>
                    <div>
                      <textarea name="comment" id="" className="w-100 form-control" cols="30" rows="4" placeholder='Bình luận'
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                        value={formik.values.comment}
                      ></textarea>
                      <div className="error">
                        {
                          formik.touched.comment && formik.errors.comment
                        }
                      </div>
                    </div>
                    <div>
                      <button className='button border-0'> Gửi đi</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Hãy liên lạc với chúng tôi</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-2 d-flex gap-15 align-items-center'>
                        <IoHomeOutline className='fs-5' />
                        <address className='mb-0'>Dinh Cong,Hoang Mai,Ha Noi</address>
                      </li>
                      <li className='mb-2 d-flex gap-15 align-items-center'>
                        <IoMdCall className='fs-5' />
                        <a href="tel:+84 343343434">84 343343434</a>
                      </li>
                      <li className='mb-2 d-flex gap-15 align-items-center'>
                        <IoIosMail className='fs-5' />
                        <a href="mailto:admin@gmail.com">admin@gmail.com</a>
                      </li>
                      <li className='mb-2 d-flex gap-15 align-items-center'>
                        <IoMdInformationCircleOutline className='fs-5' />
                        <p className="mb-0">Thứ hai - Thứ 7 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact