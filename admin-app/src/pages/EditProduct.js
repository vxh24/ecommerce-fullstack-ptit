import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pCategorySlice";
import { Select } from "antd";
import {
  getProductById,
  updateProduct,
} from "../features/product/productSlice";
import "../assets/style.css";
import { useNavigate, useParams } from "react-router-dom";
import ReactImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

let schema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  price: yup.number().required("Giá là bắt buộc"),
  brand: yup.string().required("Thương hiệu là bắt buộc"),
  category: yup.string().required("Danh mục là bắt buộc"),
  tags: yup
    .array()
    .min(1, "Ít nhất một thẻ là bắt buộc")
    .of(yup.string().required("Mỗi thẻ phải là một chuỗi"))
    .required("Thẻ là bắt buộc"),
  colors: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Màu là bắt buộc"),
        quantity: yup
          .number()
          .required("Số lượng là bắt buộc")
          .min(1, "Số lượng phải lớn hơn 0"),
      })
    )
    .required("Colors must be an array."),
});

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getBrands());
    dispatch(getCategories());
  }, []);

  const productState = useSelector((state) => state.product.product?.data);
  const brandState = useSelector((state) => state.brand.brands?.data);
  const catState = useSelector((state) => state.pCategory.pCategories?.data);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const [images, setImages] = useState(productState?.images || []);
  const [fileInputKey, setFileInputKey] = useState(0);
  useEffect(() => {
    if (productState?.images) {
      setImages(productState?.images);
    }
  }, [productState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      images: productState?.images || [],
      name: productState?.name || "",
      description: productState?.description || "",
      price: productState?.price || "",
      category: productState?.category._id || "",
      brand: productState?.brand?._id || "",
      colors: Array.isArray(productState?.colors)
        ? productState.colors
        : [],
      tags: productState?.tags
        ? Array.isArray(productState?.tags)
          ? JSON.parse(productState?.tags)
          : JSON.parse(productState?.tags).split(",")
        : [],
    },
    validationSchema: schema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("name", formik.values.name);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("category", formik.values.category);
      formData.append("brand", formik.values.brand);
      formData.append("colors", JSON.stringify(formik.values.colors));
      formData.append("tags", JSON.stringify(formik.values.tags));

      images.forEach((image) => {
        formData.append("images", image);
      });

      dispatch(updateProduct({ productId: id, productData: formData }));
      toast.success("Cập nhật thành công");
    },
  });
  const onFileUploadHandler = (e) => {
    const newImages = [...e.target.files];
    if (images.length + newImages.length > 5) {
      toast.error("Bạn chỉ có thể tải tối đa 5 hình ảnh.");
    } else {
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const getImages = () =>
    images.map((image, index) => (
      <div key={index} className="position-relative">
        <img
          alt="Preview"
          src={image.url ? image.url : URL.createObjectURL(image)}
          width="200px"
          height="200px"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setLightboxOpen(true);
            setPhotoIndex(index);
          }}
        />
        <button
          onClick={() => removeImage(index)}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: "20px",
            height: "20px",
          }}
        >
          X
        </button>
      </div>
    ));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="title" style={{ fontSize: "18px", fontWeight: "bold" }}>
          Cập nhật sản phẩm
        </h3>
        <button
          onClick={() => {
            navigate("/admin/list-product");
          }}
          className="btn btn-outline-danger"
        >
          Quay lại
        </button>
      </div>

      <div className="row justify-content-between">
        <div className="col-lg-8">
          <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="form-group mb-4">
              <label
                htmlFor="customFile"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                1. Chọn ảnh sản phẩm (tối đa 5 ảnh):
              </label>
              <div className="custom-file d-flex align-items-center gap-2">
                <input
                  key={fileInputKey}
                  id="customFile"
                  className="custom-file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onFileUploadHandler}
                  disabled={images.length >= 5}
                />
                <label htmlFor="customFile" className="custom-file-label">
                  Chọn tập tin
                </label>
              </div>
              <div className="mt-2 text-success font-weight-bold">
                {images.length > 0
                  ? `${images.length} ảnh được tải lên`
                  : "0 ảnh được tải lên"}
              </div>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="name"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                2. Nhập tên sản phẩm:
              </label>
              <CustomInput
                type="text"
                name="name"
                id="name"
                label="Nhập tên..."
                onChng={formik.handleChange("name")}
                onBlr={formik.handleBlur("name")}
                val={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="description"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                3. Nhập mô tả sản phẩm
              </label>
              <ReactQuill
                theme="snow"
                name="description"
                id="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
                className="form-control"
                placeholder="Describe the product..."
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="price"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                4. Nhập giá sản phẩm
              </label>
              <CustomInput
                type="number"
                name="price"
                id="price"
                label="Nhập giá..."
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="error">{formik.errors.price}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="brand"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                5. Chọn thương hiệu:
              </label>
              <select
                name="brand"
                id="brand"
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand}
                className="form-control py-3"
              >
                <option value="">Chọn thương hiệu ...</option>
                {Array.isArray(brandState) &&
                  brandState.map((i, j) => (
                    <option key={j} value={i._id}>
                      {i.title}
                    </option>
                  ))}
              </select>
              {formik.touched.brand && formik.errors.brand && (
                <div className="error">{formik.errors.brand}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="category"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                6. Chọn danh mục:
              </label>
              <select
                name="category"
                id="category"
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
                className="form-control py-3"
              >
                <option value="">Chọn danh mục ...</option>
                {Array.isArray(catState) &&
                  catState.map((i, j) => (
                    <option key={j} value={i._id}>
                      {i.title}
                    </option>
                  ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="error">{formik.errors.category}</div>
              )}
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="tags"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                7. Chọn nhãn:
              </label>
              <Select
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Chọn nhãn..."
                value={formik.values.tags}
                onChange={(value) => formik.setFieldValue("tags", value)}
                options={[
                  { label: "Featured", value: "featured" },
                  { label: "Popular", value: "popular" },
                  { label: "Special", value: "special" },
                ]}
              />
              {formik.touched.tags && formik.errors.tags && (
                <div className="error">{formik.errors.tags}</div>
              )}
            </div>
            <div className="form-group mb-4">
              <label
                htmlFor="tags"
                className="form-label"
                style={{ fontSize: "18px" }}
              >
                8. Thêm màu và nhập số lượng:
              </label>
              {formik.values.colors.map((color, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <input
                    type="text"
                    placeholder="Nhập màu"
                    value={color.name}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `colors[${index}].name`,
                        e.target.value
                      )
                    }
                    style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "white",
                      width: "43%",
                      marginBottom: "10px",
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Nhập số lượng"
                    value={color.quantity || ""}
                    onChange={(e) => {
                      const newQuantity = e.target.value === "" ? "" : Number(e.target.value);  // Chuyển đổi thành số
                      formik.setFieldValue(
                        `colors[${index}].quantity`,
                        newQuantity
                      )
                    }
                    }
                    style={{
                      marginRight: "10px",
                      padding: "10px",
                      background: "white",
                      width: "32%",
                    }}
                  />
                  <span
                    type="button"
                    onClick={() => {
                      const updatedColors = formik.values.colors.filter(
                        (_, i) => i !== index
                      );
                      formik.setFieldValue("colors", updatedColors);
                    }}
                    className="btn btn-danger"
                    style={{ width: "20%" }}
                  >
                    Xóa
                  </span>
                </div>
              ))}
              <span
                type="button"
                onClick={() =>
                  formik.setFieldValue("colors", [
                    ...formik.values.colors,
                    { name: "", quantity: 0 },
                  ])
                }
                className="btn btn-primary"
              >
                Thêm màu
              </span>
            </div>
            <button
              className="btn btn-success border-0 rounded-3 my-4 w-100"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {getImages()}
          </div>
        </div>

        {lightboxOpen && (
          <ReactImageLightbox
            mainSrc={
              images[photoIndex].url
                ? images[photoIndex].url
                : URL.createObjectURL(images[photoIndex])
            }
            nextSrc={
              images[(photoIndex + 1) % images.length].url
                ? images[(photoIndex + 1) % images.length].url
                : URL.createObjectURL(images[(photoIndex + 1) % images.length])
            }
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].url
                ? images[(photoIndex + images.length - 1) % images.length].url
                : URL.createObjectURL(
                  images[(photoIndex + images.length - 1) % images.length]
                )
            }
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
