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
  const [totalAmount, setTotalAmount] = useState(null);
  useEffect(() => {
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.products?.length; index++) {
      sum =
        sum +
        Number(userCartState.products[index].count) *
        userCartState.products[index].price;
      setTotalAmount(sum);
    }
    setTimeout(() => {
      setTotalAmount(sum);
    }, 200);
  }, [userCartState]);
  const deleteproduct = (id, color) => {
    dispatch(deleteProductfromCart({ productId: id, color }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  const updatecount = (id, color, newquantity) => {
    dispatch(
      updatecountCart({ productId: id, color, newQuantity: newquantity })
    );
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  useEffect(() => {
    if (authState.user === null && authState.isSuccess !== true) {
      navigate("/login");
    }
  }, [authState]);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <div className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                <h4 className="cart-col-1">Sản phẩm</h4>
                <h4 className="cart-col-2">Giá</h4>
                <h4 className="cart-col-3">Số lượng</h4>
                <h4 className="cart-col-4">Tổng</h4>
              </div>
              {userCartState?.products &&
                userCartState?.products?.map((item, index) => {
                  const product = productState?.find(
                    (productItem) => productItem?._id === item?.product
                  );
                  return (
                    <div
                      key={index}
                      className="cart-data py-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="cart-col-1 gap-15 d-flex justify-content-between align-items-center">
                        <div className="w-25">
                          <img
                            src={product?.images[0]?.url}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="w-75">
                          <p>{product?.name}</p>
                          <p className="d-flex gap-15">Màu sắc:
                            <ul className='colors ps-0'>
                              <li style={{ backgroundColor: item?.color.title }}></li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">đ{item?.price}</h5>
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
                              if (newQuantity > product.quantity) {
                                toast.info(
                                  "Số lượng vượt quá số lượng hàng có sẵn!"
                                );
                              } else {
                                updatecount(
                                  item.product,
                                  item.color,
                                  newQuantity
                                );
                              }
                            }}
                          />
                        </div>
                        <div>
                          <MdDelete
                            onClick={(e) => {
                              deleteproduct(item?.product, item?.color);
                            }}
                            className="text-danger fs-4"
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price"> đ{item?.price * item?.count}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="col-12 py-2 mt-4">
              {(totalAmount !== null || totalAmount !== 0) && (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <div>
                      <h4>Tổng tiền: đ{totalAmount}</h4>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/product" className="text-dark">
                      <MdOutlineKeyboardReturn className="me-2" />
                      Tiếp tục mua sắm
                    </Link>
                    {totalAmount !== 0 ? (
                      <Link to="/checkout" className="button">
                        Thanh toán
                      </Link>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
