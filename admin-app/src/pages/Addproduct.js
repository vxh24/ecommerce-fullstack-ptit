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
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import { createProducts, resetState } from "../features/product/productSlice";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  tags: yup
    .array()
    .min(1, "At least one tag is required")
    .of(yup.string())
    .required("Tag is Required"),
  colors: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  useEffect(() => {
    if (click === true) {
      navigate("/admin/list-product");
    }
  }, [click])
  const brandState = useSelector((state) => state.brand.brands.data);
  const catState = useSelector((state) => state.pCategory.pCategories.data);
  const colorState = useSelector((state) => state.color.colors.data);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  if (Array.isArray(colorState)) {
    colorState.forEach((i) => {
      coloropt.push({
        label: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: i.title,
                marginRight: "10px",
                borderRadius: "50%",
              }}
            ></div>
            {i.title}
          </div>
        ),
        value: i._id,
      });
    });
  }

  const formik = useFormik({
    initialValues: {
      images: [],
      title: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      colors: "",
      quantity: "",
      tags: "",
    },
    validationSchema: schema,
    onSubmit: () => {
      const formData = new FormData();

      formData.append("title", formik.values.title);
      formData.append("description", formik.values.description);
      formData.append("price", formik.values.price);
      formData.append("category", formik.values.category);
      formData.append("brand", formik.values.brand);
      formData.append("quantity", formik.values.quantity);
      formData.append("colors", JSON.stringify(formik.values.colors));
      formData.append("tags", JSON.stringify(formik.values.tags));

      images.forEach((image) => {
        formData.append("images", image);
      });

      dispatch(createProducts(formData));
      formik.resetForm();
      setColors([]);
      setImages([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleColors = (e) => {
    setColors(e);
    formik.setFieldValue("colors", e);
  };

  const [images, setImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);

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
          src={URL.createObjectURL(image)}
          width="200px"
          height="200px"
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
    <div>
      <div className="product-list d-flex justify-content-between">
        <h3 className="mb-2 title">Add Product</h3>
        <button onClick={() => setClick(true)}>x Hủy</button>
      </div>
      <div className="d-flex gap-10">
        <div className="add-product">
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-2 flex-column"
          >
            <div className="d-flex gap-2 mb-0">
              Product Images: <p>(Select up to 5 images)</p>
            </div>

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
                Choose files
              </label>

              <div
                className="mt-2"
                style={{ color: "green", fontWeight: "bold", fontSize: "15px" }}
              >
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : "No file chosen"}
              </div>
            </div>
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <div>
              <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <CustomInput
              type="number"
              label="Enter Product Price"
              name="price"
              onChng={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>

            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              className="form-control py-3 mb-2"
            >
              <option value="">Select Brand</option>
              {Array.isArray(brandState) &&
                brandState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>

            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              className="form-control py-3 mb-2"
              id=""
            >
              <option value="">Select Category</option>
              {Array.isArray(catState) &&
                catState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>

            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select Tags"
              value={formik.values.tags}
              onChange={(value) => formik.setFieldValue("tags", value)}
              options={[
                { label: "Featured", value: "featured" },
                { label: "Popular", value: "popular" },
                { label: "Special", value: "special" },
              ]}
            />
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>

            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select colors"
              value={formik.values.colors}
              onChange={handleColors}
              options={coloropt}
            />
            <div className="error">
              {formik.touched.colors && formik.errors.colors}
            </div>
            <CustomInput
              type="number"
              label="Enter Product Quantity"
              name="quantity"
              onChng={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>

            <button
              className="btn btn-success border-0 rounded-3 my-4"
              type="submit"
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="img-product">
          <div className=" d-flex flex-wrap justify-content-center gap-3">{getImages()}</div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
