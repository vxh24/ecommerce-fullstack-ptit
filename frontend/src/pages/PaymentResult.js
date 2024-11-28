import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { IoIosCheckmarkCircle } from "react-icons/io";
const PaymentResult = () => {
  return (
    <>
      <Meta title={"Payment Result"} />
      <BreadCrumb title="Payment Result" />
      <div className="main-payment-result">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 mb-3">
              <div className='payment-result text-center'>
                <h1>Kết quả thanh toán</h1>
                <IoIosCheckmarkCircle className=' payment-icon' />
                <p>Thanh toán thành công</p>
                <div className='d-flex justify-content-center'>
                  <table className="payment-table">
                    <tbody>
                      <tr>
                        <td><strong> Mã giao dịch của bạn là</strong></td>
                        <td>2545345353453</td>
                      </tr>
                      <tr>
                        <td><strong>Số tiền thanh toán</strong></td>
                        <td>Moe</td>
                      </tr>
                      <tr>
                        <td><strong>Ngân hàng</strong></td>
                        <td>Dooley</td>
                      </tr>
                      <tr>
                        <td><strong>Ngày giao dịch</strong></td>
                        <td>Dooley</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentResult