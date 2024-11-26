import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoupon } from '../features/counpons/couponSlice';
import moment from "moment";
import { changePassSlice, createAdd, getAddressSlice, removeAddressSlice, updateAddressSlice } from '../features/user/userSlice';
const profileSchema = yup.object({
  name: yup.string().required("Name is Require"),
  email: yup.string().nullable().email("Email should be valid"),
  phone: yup.string().required("Mobie no is Required"),
  address: yup.string().required("address is Required")
});
const ChangeSchema = yup.object({
  password: yup.string()
    .required('Mật khẩu hiện tại là bắt buộc'),
  newpassword: yup.string()
    .required('Mật khẩu mới là bắt buộc')
    .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự')
    .notOneOf([yup.ref('currentPassword'), null], 'Mật khẩu mới phải khác với mật khẩu hiện tại'),
  confpassword: yup.string()
    .required('Xác nhận mật khẩu là bắt buộc')
    .oneOf([yup.ref('newpassword'), null], 'Mật khẩu xác nhận không khớp'),
});
const ProfileContent = ({ active }) => {
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
    // <div className='w-100'>
    <>
      {active === 1 && (
        <>
          <div className="change-card justify-center-between">
            <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
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
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </>
      )}
      {/* </div> */}
      {/* Change Password */}
      {active === 2 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {/* Change Password */}
      {active === 3 && (
        <div>
          <Address />
        </div>
      )}
      {active === 4 && (
        <div>
          <VoucherPage />
        </div>
      )}
    </>
  )
}

const VoucherPage = () => {
  const couponState = useSelector(state => state?.coupon?.coupons?.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCoupon());
  }, []);
  // const getCoupons = () => {
  //   dispatch(getAllCounpon());
  // }

  // Danh sách các danh mục (tabs)
  const categories = ["Tất cả", "Shopee", "Shop", "Nạp thẻ & Dịch vụ"];
  const [activeTab, setActiveTab] = useState(0); // Tab đang chọn
  // const [vouchers, setVouchers] = useState([]); // Danh sách voucher
  const [filteredVouchers, setFilteredVouchers] = useState([]); // Voucher hiển thị

  // Xử lý khi đổi tab
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (categories[index] === "Tất cả") {
      setFilteredVouchers(couponState);
    } else {
      setFilteredVouchers(
        couponState.filter((voucher) => voucher.category === categories[index])
      );
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="tabs">
        {categories?.map((category, index) => (
          <button
            key={index}
            className={activeTab === index ? "tab active" : "tab"}
            onClick={() => handleTabChange(index)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách voucher */}
      <div className="voucher-list">
        {filteredVouchers.map((voucher) => (
          <div key={voucher.id} className="voucher-card">
            <div className="voucher-header">
              <span className="voucher-title">{voucher.name}</span>
              <span className="voucher-discount">Giảm {voucher.discount}%</span>
            </div>
            {/* <p>Đơn Tối Thiểu: {voucher.minOrder}</p> */}
            <p>Có hiệu lực đến: {moment(voucher.expiry).format('DD/MM/YYYY')}</p>
            <button className="use-later">Dùng Sau</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChangePassword = () => {
  // const getToken = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      confpassword: "",
    },
    validationSchema: ChangeSchema,
    onSubmit: (values) => {
      dispatch(changePassSlice({ password: values.confpassword }));
      // navigate("/login");
    },
  });
  return (
    <>
      <div className="">
        <div className="change-card">
          <h3 className='text-center mb-3'>Change Password</h3>
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
              <input type="password" name='newpassword' className="form-control mt-1" placeholder='New Password'
                value={formik.values.newpassword} onChange={formik.handleChange("newpassword")}
                onBlur={formik.handleBlur("newpassword")} />
            </div>
            <div className="error">
              {
                formik.touched.newpassword && formik.errors.newpassword
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
                <button className="button border-0">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const Address = () => {
  const addressState = useSelector(state => state?.auth?.address?.data?.address);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddressSlice());
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [address, setAddress] = useState(null);
  const handleSetDefault = (id) => {
    // setAddresses((prev) =>
    //   prev.map((addr) =>
    //     addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
    //   )
    // );
  };

  const handleDelete = (id) => {
    dispatch(removeAddressSlice(id));
    setTimeout(() => {
      dispatch(getAddressSlice());
    }, 200);
  };

  return (
    <div className="address-container">
      <div className="header">
        <h2>Địa chỉ của tôi</h2>
        <button onClick={() => setIsModalOpen(true)} className="add-button">+Thêm địa chỉ mới</button>
        {isModalOpen && <AddAddressForm onClose={() => setIsModalOpen(false)} />}
      </div>
      <div className="d-flex flex-column gap-15">
        {addressState?.slice() // Tạo một bản sao
          .sort((a, b) => b.isDefault - a.isDefault)?.map((address) => (

            <div className="address-item" key={address._id}>
              <div className="address-details">

                <strong className="address-name">{address.name}</strong>
                <span className="address-phone">- {address.phone}</span>
                <p className="address">{address.specificAddress}<br />{address.commune}, {address.district}, {address.city}</p>
                {
                  address.isDefault && (
                    <p className='isdefault text-center'>
                      Mặc định
                    </p>
                  )
                }

              </div>
              <div className="address-actions">
                <button onClick={() => { setIsModalUpdate(true); setAddress(address) }} className="update-button">Cập nhật</button>

                {
                  !address.isDefault && (
                    <button className="delete-button" onClick={() => handleDelete(address._id)}>
                      Xóa
                    </button>
                  )
                }

                <button
                  className={`default-button ${address.isDefault ? 'active' : ''}`}
                  onClick={() => handleSetDefault(address.id)}
                >
                  Thiết lập mặc định
                </button>
              </div>
            </div>
          ))}
      </div>
      {isModalUpdate && <UpdateAddressForm onClose={() => setIsModalUpdate(false)} data={address} />}
    </div>
  );
}

const AddAddressForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    commune: '',
    specificAddress: '',
    isDefault: false,
  });
  console.log(formData);
  useEffect(() => {
    axios.get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`, {
        params: { province_code: selectedProvince }
      })
        .then((response) => setDistricts(response.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`, {
        params: { district_code: selectedDistrict }
      })
        .then((response) => setWards(response.data))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [selectedDistrict]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdd(formData));
    setTimeout(() => {
      dispatch(getAddressSlice());
    }, 200);
    onClose(); // Close the form modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='mb-3'>Địa chỉ mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="city" onChange={(e) => {
              const selectedCityId = e.target.value;
              const selectedCityName = provinces?.data?.find(
                (province) => province.id === selectedCityId
              )?.name;
              setSelectedProvince(e.target.value)
              setFormData((prev) => ({
                ...prev,
                city: selectedCityName || '',
              }));
            }} required>
              <option >Tỉnh/Thành phố</option>
              {provinces?.data.map((province) => (
                <option key={province.id} value={province.id} >
                  {province.name}
                </option>
              ))}
            </select>
            <select name="district" onChange={(e) => {
              const selectedDistrictId = e.target.value;
              const selectedDistrictName = districts?.data?.find(
                (district) => district.id === selectedDistrictId
              )?.name;
              setSelectedDistrict(selectedDistrictId);
              setFormData((prev) => ({
                ...prev,
                district: selectedDistrictName || '',
              }));
            }}
              required
              disabled={!selectedProvince}>
              <option value="">Quận/Huyện</option>
              {districts?.data.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <select name="ward" onChange={(e) => {
              const selectedWardId = e.target.value;
              const selectedWardsName = wards?.data?.find(
                (ward) => ward.id === selectedWardId
              )?.name;
              setSelectedWard(selectedWardId);
              setFormData((prev) => ({
                ...prev,
                commune: selectedWardsName || '',
              }));
            }}

              required
              disabled={!selectedDistrict}>
              <option value="">Phường/Xã</option>
              {wards?.data.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="specificAddress"
              placeholder="Địa chỉ cụ thể"
              value={formData.specificAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              Đặt làm địa chỉ mặc định
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="cancel-button" onClick={onClose}>
              Trở Lại
            </button>
            <button type="submit" className="submit-button">
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const UpdateAddressForm = ({ onClose, data }) => {
  const address = data;
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [selectedProvince, setSelectedProvince] = useState(address.city);
  const [selectedDistrict, setSelectedDistrict] = useState(address.district);
  const [selectedWard, setSelectedWard] = useState(address.commune);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    district: '',
    commune: '',
    specificAddress: '',
    isDefault: address.isDefault,
    id: address._id,
    // name: address.name,
    // phone: address.phone,
    // city: address.city,
    // district: address.district,
    // commune: address.commune,
    // specificAddress: address.specificAddress,
    // isDefault: address.isDefault,
  });
  console.log(formData);
  useEffect(() => {
    axios.get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`, {
        params: { province_code: selectedProvince }
      })
        .then((response) => setDistricts(response.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`, {
        params: { district_code: selectedDistrict }
      })
        .then((response) => setWards(response.data))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [selectedDistrict]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAddressSlice(

      formData

    ));
    setTimeout(() => {
      dispatch(getAddressSlice());
    }, 200);
    onClose(); // Close the form modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='mb-3'>Địa chỉ mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="input-group rounded">
            <input value={"abc"} type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          </div> */}
          <div className="form-group">
            <select name="city" onChange={(e) => {
              const selectedCityId = e.target.value;
              const selectedCityName = provinces?.data?.find(
                (province) => province.id === selectedCityId
              )?.name;
              setSelectedProvince(e.target.value)
              setFormData((prev) => ({
                ...prev,
                city: selectedCityName || '',
              }));
            }} required>

              <option>{selectedProvince}</option>
              {provinces?.data.map((province) => (
                <option key={province.id} value={province.id} >
                  {province.name}
                </option>
              ))}
            </select>
            <select name="district" onChange={(e) => {
              const selectedDistrictId = e.target.value;
              const selectedDistrictName = districts?.data?.find(
                (district) => district.id === selectedDistrictId
              )?.name;
              setSelectedDistrict(selectedDistrictId);
              setFormData((prev) => ({
                ...prev,
                district: selectedDistrictName || '',
              }));
            }}
              required
              disabled={!selectedProvince}>
              {
                selectedProvince === address.city ? (
                  <option value="">{address.district}</option>
                ) : (
                  <option value="">Quận/Huyện</option>
                )
              }

              {districts?.data.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <select name="ward" onChange={(e) => {
              const selectedWardId = e.target.value;
              const selectedWardsName = wards?.data?.find(
                (ward) => ward.id === selectedWardId
              )?.name;
              setSelectedWard(selectedWardId);
              setFormData((prev) => ({
                ...prev,
                commune: selectedWardsName || '',
              }));
            }}

              required
              disabled={!selectedDistrict}>
              {
                selectedDistrict === address.district && selectedProvince === address.city ? (
                  <option >{address.commune}</option>
                ) : (
                  <option >Phường/Xã</option>
                )
              }
              {wards?.data.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="specificAddress"
              placeholder="Địa chỉ cụ thể"
              value={formData.specificAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              Đặt làm địa chỉ mặc định
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="cancel-button" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="submit-button">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileContent;