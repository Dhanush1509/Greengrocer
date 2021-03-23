import React, { useEffect, useContext, useState } from "react";
import OrderContext from "../context/order/orderContext";
import authContext from "../context/auth/AuthContext";
import cartContext from "../context/cart/cartContext";
import logo from "../assets/images/image.png";
import setAuth from "../utils/setAuthToken";
import axios from "axios";
import Lottie from "react-lottie";
import animationData1 from "../assets/reactLottie/paymentSuccessful.json";
import animationData2 from "../assets/reactLottie/paymentFailed.json";
import Loader from "../layout/Spinner"
import {
  Card,
  ListGroup,
  Row,
  Col,
  Image,
  Button,
  Container,
  Badge,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();
let displayPaymentSuccess = "block";
const defaultOptions1 = {
  loop: false,
  autoplay: true,
  animationData: animationData1,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Order = (props) => {
  const {
    getOrder,
    order,
    updateOrderToSuccess,
    getOptions,
    razorpayOptions,
  } = useContext(OrderContext);
  const { userData } = useContext(authContext);
  const { emptyCart } = useContext(cartContext);
  useEffect(() => {
    if(userData.length === 0){
      props.history.push("/signin")
    }
    else{
    getOrder(props.match.params.id);
    }
    //eslint-disable-next-line
  },[order]);

  const [razorpayLoading, setRazorpayLoading] = useState(false);
  const handleTrack=()=>{
props.history.push(`/order/${order._id}/track`)
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        setRazorpayLoading((prev) => !prev);
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    setRazorpayLoading((prev) => !prev);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setAuth(userData.token);
    const result = await axios.post("/orders/razorpay/generateid", {
      amount: order.totalPrice,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Greengrocer",
      description: "Testing mode",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderIdOfCurrent: order._id,
        };
        // console.log(data);
        setAuth(userData.token);
        const result = await axios.post("/orders/payment/success", data);
        getOrder(props.match.params.id);
      },
      prefill: {
        name: "Singamsetty Munidhanush",
        email: "s.munidhanush15@gmail.com",
        contact: "9390007409",
      },
      notes: {
        address: "Kallur, Chittor district",
      },
      theme: {
        color: "#56cc9d",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      {order ? (
        <>
          <>
            <p
              style={{
                fontSize: "3vw",
                color: "black",
                textAlign: "left",
                fontFamily: "RocknRoll One",
              }}
            >
              Order ID:{order._id.toUpperCase()}{" "}
              {order.isPaid ? (
              <></>
              ) : (
                <></>
              )}
            </p>
            <Row>
              <Col md={8}>
                <ListGroup style={{ color: "black", fontFamily: "Roboto" }}>
                  <ListGroup.Item>
                    <ListGroup.Item>
                      <h2>Order details</h2>
                    </ListGroup.Item>
                    <ListGroup>
                      <ListGroup.Item>
                        <p style={{ textAlign: "left" }} className="mt-3">
                          <span>Name:</span>
                          {order.user.name}
                        </p>
                        <p style={{ textAlign: "left" }} className="mt-3">
                          <span>Email:</span>
                          <a
                            className="orderanchor"
                            href={`mailto:${order.user.email}`}
                          >
                            {order.user.email}
                          </a>
                        </p>

                        <p style={{ textAlign: "left" }}>
                          <span>Address:</span> {order.deliveryAddress.address},
                          {order.deliveryAddress.city},
                          {order.deliveryAddress.country}-
                          {order.deliveryAddress.postalCode}
                        </p>
                        <p style={{ textAlign: "left" }}>
                          {" "}
                          <span>Delivery Status:</span>{" "}
                          {order.isDelivered ? (
                            <Badge
                              variant="success"
                              className="p-2"
                              style={{ fontFamily: "RocknRoll One" }}
                            >
                              You order has been delivered
                            </Badge>
                          ) : (
                            <Badge
                              variant="danger"
                              style={{
                                backgroundColor: "red",
                                fontFamily: "RocknRoll One",
                              }}
                              className="p-2"
                            >
                              You order has not been delivered
                            </Badge>
                          )}
                        </p>
                        <p style={{ textAlign: "left" }}>
                          Payment Option: {order.paymentOption}
                        </p>
                        <p style={{ textAlign: "left" }}>
                          {" "}
                          <span>Payment Status:</span>{" "}
                          {order.isPaid ? (
                            <Badge
                              variant="success"
                              className="p-2"
                              style={{ fontFamily: "RocknRoll One" }}
                            >
                              Payment done
                            </Badge>
                          ) : (
                            <Badge
                              variant="danger"
                              style={{ backgroundColor: "red" }}
                              className="p-2"
                            >
                              Payment not done
                            </Badge>
                          )}
                        </p>
                      </ListGroup.Item>
                    </ListGroup>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {" "}
                    <ListGroup.Item>
                      <h2>Order Items</h2>
                    </ListGroup.Item>
                    {order.orderedItemsData.map((item) => (
                      <ListGroup.Item key={item._id}>
                        {" "}
                        <Row>
                          <Col md={1}>
                            {" "}
                            <Image
                              src={item.id.image}
                              alt={item.id.name}
                              className="mb-2"
                              rounded
                            />
                          </Col>
                          <Col md={6} className="my-auto">
                            <Link to={`/products/${item.id._id}`}>
                              <h6>{item.id.name}</h6>{" "}
                            </Link>
                          </Col>
                          <Col md={5} className="my-auto">
                            {" "}
                            <h6>
                              {item.quantity} X ₹{item.id.price}/kg=₹
                              {Math.floor(item.id.price * item.quantity)}
                            </h6>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <ListGroup style={{ color: "black", fontFamily: "Roboto" }}>
                  <ListGroup.Item>
                    <Col md={12}>
                      <ListGroup.Item>
                        <h2>Order Summary</h2>
                      </ListGroup.Item>
                    </Col>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {" "}
                      <Col md={6}>Items Cost</Col>
                      <Col md={6}>₹{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {" "}
                      <Col md={6}>Delivery Charge</Col>
                      <Col md={6}>₹{order.deliveryPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {" "}
                      <Col md={6}>Tax Charge</Col>
                      <Col md={6}>₹{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {" "}
                      <Col md={6}>Total</Col>
                      <Col md={6}>₹{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Col md={12}>
                      {" "}
                      {razorpayLoading ? (
                        <Button
                          type="button"
                          className="btn-block"
                          style={{ fontFamily: "Roboto" }}
                        >
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="btn-block"
                          style={{ fontFamily: "Roboto" }}
                          onClick={displayRazorpay}
                          disabled={order.isPaid}
                        >
                          {order.isPaid ? (
                            order.isDelivered ? (
                              <>Payment & Delivery Successful</>
                            ) : (
                              <>Processing delivery🚚</>
                            )
                          ) : (
                            <>Pay here</>
                          )}
                        </Button>
                      )}

                      {order.isPaid?( <Button
                          type="button"
                          className="btn-block"
                          style={{ fontFamily: "Roboto" }}
                onClick={handleTrack}
                        
                        >Track your order here</Button>):(<></>)}
                    </Col>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        </>
      ) : (
      <Loader />
      )}
    </div>
  );
};

export default Order;
