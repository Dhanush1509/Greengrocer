import React, { useContext, useEffect } from "react";
import OrderContext from "../context/order/orderContext";
import { Container, Row, Col } from "react-bootstrap";
import authContext from "../context/auth/AuthContext";
import g from "../assets/images/g.png";
import r from "../assets/images/r.png";
import e from "../assets/images/e.png";
import n from "../assets/images/n.png";
import o from "../assets/images/o.png";
import c from "../assets/images/c.png";
const changeDate = (date, add) => {
  if (date) {
    let Year = date.substring(0, 4);
    let Month = date.substring(5, 7);
    let Day;

    if (add) {
      Day = (Number(date.substring(8, 10)) + 1).toString();
    } else {
      Day = date.substring(8, 10);
    }

    let modified = Day + "-" + Month + "-" + Year;

    return modified;
  }
};

const OrderTrack = (props) => {
  const { userData } = useContext(authContext);
  useEffect(() => {
    if (userData.length === 0) {
      props.history.push("/signin");
    } else {
      getOrder(props.match.params.id);
    }

    //eslint-disable-next-line
  }, []);
  const {
    getOrder,
    order,
    updateOrderToSuccess,
    getOptions,
    razorpayOptions,
  } = useContext(OrderContext);
  console.log(props.match.params.id);

  return (
    <div className="mt-5" style={{ color: "black" }}>
      <img src={g} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={r} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={e} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={e} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={n} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={g} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={r} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={o} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={c} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={e} alt="" style={{ width: "96px", height: "auto" }} />
      <img src={r} alt="" style={{ width: "96px", height: "auto" }} />

      {order && order.isPaid ? (
        <section className="root-order-track p-5">
          <Row>
            <Col sm={2}>
              {" "}
              <img
                src="https://image.flaticon.com/icons/svg/970/970514.svg"
                alt=""
              />
            </Col>
            <Col>
              {" "}
              <h4>Tracking Details</h4>
              <h6>Order ID: {order._id}</h6>
            </Col>
          </Row>

          <div className="order-track" style={{ textAlign: "left" }}>
            <div className="order-track-step">
              <div className="order-track-status m-2">
                <span className="order-track-status-dot"></span>
                <span className="order-track-status-line"></span>
              </div>
              <div className="order-track-text">
                <p className="order-track-text-stat">Order Created</p>
                <span className="order-track-text-sub">
                  {changeDate(order.createdAt, false)}
                </span>
              </div>
            </div>
            <div className="order-track-step">
              <div className="order-track-status m-2">
                <span className="order-track-status-dot"></span>
                <span className="order-track-status-line"></span>
              </div>
              <div className="order-track-text">
                <p className="order-track-text-stat">
                  Shipped -Kallur,India-517113
                </p>
                <span className="order-track-text-sub">
                  {changeDate(order.paidAt, false)}
                </span>
              </div>
            </div>
            <div className="order-track-step">
              <div className="order-track-status m-2">
                <span className="order-track-status-dot"></span>
                <span className="order-track-status-line"></span>
              </div>
              <div className="order-track-text">
                <p className="order-track-text-stat">
                  Estimated-
                  {order.deliveryAddress.city},{order.deliveryAddress.country}-
                  {order.deliveryAddress.postalCode}
                </p>
                <span className="order-track-text-sub">
                  {changeDate(order.paidAt, true)}
                </span>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
};

export default OrderTrack;
