import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb'
const Order = () => {
  return (
    <>
      <Meta title={"Order"} />
      <BreadCrumb title="Order" />
      <div className="order-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-3">
                  <h5>
                    OrderId
                  </h5>
                </div>
                <div className="col-3">
                  <h5>
                    Total Amount
                  </h5>
                </div>
                <div className="col-3">
                  <h5>
                    Total Amount after Discount
                  </h5>
                </div>
                <div className="col-3">
                  <h5>
                    Status
                  </h5>
                </div>

              </div>

            </div>
            <div className="col-12 mt-3">
              <div className="row">
                <div className="col-3">
                  <p>
                    OrderId
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    Total Amount
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    Total Amount after Discount
                  </p>
                </div>
                <div className="col-3">
                  <p>
                    Status
                  </p>
                </div>
                <div className="col-12">
                  <div className="row bg-secondary p-3">
                    <div className="col-3">
                      <p>
                        OrderId
                      </p>
                    </div>
                    <div className="col-3">
                      <p>
                        Total Amount
                      </p>
                    </div>
                    <div className="col-3">
                      <p>
                        Total Amount after Discount
                      </p>
                    </div>
                    <div className="col-3">
                      <p>
                        Status
                      </p>
                    </div>

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

export default Order