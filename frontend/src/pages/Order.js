import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderUser } from '../features/user/userSlice';
import moment from "moment";
import {
  AiOutlineEye,
} from "react-icons/ai";
import OrderDetailCard from '../components/OrderDetailCard';
const Order = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusCounts, setStatusCounts] = useState({});
  const orderState = useSelector(state => state?.auth?.orders?.data);
  useEffect(() => {
    if (orderState?.length > 0) {
      setStatus(orderState);
    }
  }, [orderState]);
  useEffect(() => {
    dispatch(getOrderUser());
  }, [])
  const handleOpenOrderDetail = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCloseOrderDetail = () => {
    setOpen(false);
    setSelectedOrder(null);
  };
  const [activeTab, setActiveTab] = useState(0);
  const status = ["Tất cả", "Chờ xác nhận", "Chờ lấy hàng", "Chờ giao hàng", "Hoàn thành", "Đã hủy"];
  useEffect(() => {
    if (orderState?.length > 0) {
      const counts = orderState.reduce((acc, order) => {
        acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
        return acc;
      }, {});
      // counts['Tất cả'] = orderState.length;
      setStatusCounts(counts);

      setStatus(orderState);
    }
  }, [orderState]);

  const [filterstatus, setStatus] = useState([]);
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (status[index] === "Tất cả") {
      setStatus(orderState);
    } else {
      setStatus(
        orderState?.filter((order) => order.orderStatus === status[index])
      );
    }
  };
  return (
    <>
      <Meta title={"Order"} />
      <BreadCrumb title="Order" />
      <div className="order-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div style={{ "margin-left": "0" }} className='tabs d-flex justify-content-center '>
                {
                  status.map((item, index) => (
                    <div key={index} className="tab-container">
                      <button
                        className={activeTab === index ? "tab active" : "tab"}
                        onClick={() => handleTabChange(index)}
                      >
                        {item}
                        <span className={statusCounts[item] ? "statusCount" : ""}>
                          {statusCounts[item]}
                        </span>
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-12 mt-3">
              <table class="table caption-top">
                <thead>
                  <tr>
                    <th scope="col" className='col-3'>OrderID</th>
                    <th scope="col" className='col-2'>Total Amount</th>
                    <th scope="col" className='col-3'>Order date </th>
                    <th scope="col" className='col-3'>Status</th>
                    <th scope="col" className='col-1'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filterstatus && filterstatus?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item?._id}</th>
                          <td className='mb-3'>{item?.paymentIndent?.amount}  </td>
                          <td>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                          <td>{item?.orderStatus}</td>
                          <td>
                            <div className='d-flex align-items-center justify-content-between gap-10'>
                              <AiOutlineEye
                                size={22}
                                className="cursor-pointer absolute right-2 top-14"
                                onClick={() => handleOpenOrderDetail(item)}
                                color="#333"
                                title="Quick view"
                              />
                            </div>
                          </td>

                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        open && selectedOrder && (
          <div className="model-container">
            <div className="model-content">
              <button className="close-model" onClick={handleCloseOrderDetail}>✖</button>
              <OrderDetailCard order={selectedOrder} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default Order