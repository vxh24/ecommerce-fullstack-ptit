import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductfromCart,
  getUserCart,
  updatecountCart,
} from "../features/user/userSlice";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { getAllProducts } from "../features/products/productSlice";
import { toast } from "react-toastify";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const userCartState = useSelector((state) => state?.auth?.cartUser?.cart);
  const productState = useSelector((state) => state.product.products.data);
  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);
  const deleteproduct = (id, color) => {
    dispatch(deleteProductfromCart({ productId: id, color }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 600);
  };
  const updatecount = (id, color, newquantity) => {
    dispatch(
      updatecountCart({
        productId: id,
        color: color,
        newQuantity: newquantity,
      })
    );
    setTimeout(() => {
      dispatch(getUserCart());
    }, 600);
  };
  useEffect(() => {
    if (authState.user === null && authState.isSuccess !== true) {
      navigate("/login");
    }
  }, [authState]);
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Sản phẩm</h4>
                <h4 className="cart-col-2">Giá</h4>
                <h4 className="cart-col-3">Số lượng</h4>
                <h4 className="cart-col-4">Thành tiền</h4>
              </div>
              {userCartState?.products &&
                userCartState?.products?.map((item, index) => {
                  const product = productState?.find(
                    (productItem) => productItem?._id === item?.product._id
                  );
                  const quantity = product?.colors.find(
                    (quan) => quan.name === item.color
                  );
                  return (
                    <div
                      key={index}
                      className="cart-data py-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex justify-content-between align-items-center">
                        <div className="w-25">
                          <img
                            src={item?.product?.images[0]?.url}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="w-75 cart-title">
                          <p>{item.product?.name}</p>
                          <p className="d-flex gap-15 mb-0">
                            Màu sắc:
                            <ul className="colors ps-0">
                              <li>{item.color}</li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">{formatPrice(item?.price)}</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max=""
                            className="form-control"
                            style={{ width: "70px" }}
                            id=""
                            value={item?.count}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (newQuantity > quantity.quantity) {
                                toast.info(
                                  "Số lượng vượt quá số lượng hàng có sẵn!"
                                );
                              } else {
                                updatecount(
                                  item.product._id,
                                  item.color,
                                  newQuantity
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="cursor-pointer">
                          <MdDelete
                            onClick={(e) => {
                              deleteproduct(item?.product._id, item?.color);
                            }}
                            className="text-danger fs-4"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">
                          {formatPrice(item?.price * item?.count)}
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-end mb-3">
                <div>
                  <h4 className="price">
                    Tổng tiền:{" "}
                    {userCartState?.cartTotal
                      ? formatPrice(userCartState?.cartTotal)
                      : formatPrice(0)}
                  </h4>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link to="/product" className="text-dark">
                  <MdOutlineKeyboardReturn className="me-2" />
                  Tiếp tục mua sắm
                </Link>
                {userCartState?.cartTotal ? (
                  <Link to="/checkout" className="button">
                    Thanh toán
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
