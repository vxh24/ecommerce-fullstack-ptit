import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAdd, getAddressSlice } from "../features/user/userSlice";
const AddAddressForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    commune: "",
    specificAddress: "",
    isDefault: false,
  });
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`, {
          params: { province_code: selectedProvince },
        })
        .then((response) => setDistricts(response.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`, {
          params: { district_code: selectedDistrict },
        })
        .then((response) => setWards(response.data))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  }, [selectedDistrict]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAdd(formData));
    setTimeout(() => {
      dispatch(getAddressSlice());
    }, 300);
    onClose(); // Close the form modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="mb-3">Địa chỉ mới</h2>
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
            <select
              name="city"
              onChange={(e) => {
                const selectedCityId = e.target.value;
                const selectedCityName = provinces?.data?.find(
                  (province) => province.id === selectedCityId
                )?.name;
                setSelectedProvince(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  city: selectedCityName || "",
                }));
              }}
              required
            >
              <option>Tỉnh/Thành phố</option>
              {provinces?.data.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
            <select
              name="district"
              onChange={(e) => {
                const selectedDistrictId = e.target.value;
                const selectedDistrictName = districts?.data?.find(
                  (district) => district.id === selectedDistrictId
                )?.name;
                setSelectedDistrict(selectedDistrictId);
                setFormData((prev) => ({
                  ...prev,
                  district: selectedDistrictName || "",
                }));
              }}
              required
              disabled={!selectedProvince}
            >
              <option value="">Quận/Huyện</option>
              {districts?.data.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <select
              name="ward"
              onChange={(e) => {
                const selectedWardId = e.target.value;
                const selectedWardsName = wards?.data?.find(
                  (ward) => ward.id === selectedWardId
                )?.name;
                setSelectedWard(selectedWardId);
                setFormData((prev) => ({
                  ...prev,
                  commune: selectedWardsName || "",
                }));
              }}
              required
              disabled={!selectedDistrict}
            >
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

export default AddAddressForm;
