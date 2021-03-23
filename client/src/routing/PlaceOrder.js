import React, { useContext, useEffect } from "react";
import { Row, Col, ListGroup, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/transport.json";
import animationDataorder from "../assets/reactLottie/placeorder.json";
import animationDatapayment from "../assets/reactLottie/payment.json";
import cartContext from "../context/cart/cartContext";
import orderContext from "../context/order/orderContext";
import authContext from "../context/auth/AuthContext";
import Checkout from "../components/CheckoutSection";
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PlaceOrder = (props) => {
  const {
    deliveryAddress,
    paymentOption,
    cartItems,
    totalCost,
    total,
    emptyCart,
  } = useContext(cartContext);
  const { addOrder, orderDetails, order, success, resetAddOrder } = useContext(
    orderContext
  );
  const { userData } = useContext(authContext);
  useEffect(() => {
    if (userData.length === 0) {
      props.history.push("/signin");
    }
    if (deliveryAddress.length === 0) {
      props.history.push("/address");
    }
    if (paymentOption.length === 0) {
      props.history.push("/payment");
    }

    if (success) {
      props.history.push("/order/" + order._id);
      emptyCart();
      resetAddOrder();
    }

    totalCost();
    //eslint-disable-next-line
  }, [deliveryAddress, paymentOption, cartItems, success, order, userData]);

  const deliveryPrice = 40;
  const taxPrice = 0;
  const totalPrice = total + deliveryPrice + taxPrice;

  const placeOrderHandler = () => {
    addOrder({
      orderItems: cartItems,
      delivery_Address: deliveryAddress,
      payment_Option: paymentOption,
      items_Price: total,
      delivery_Price: deliveryPrice,
      tax_Price: taxPrice,
      total_Price: totalPrice,
    });
    emptyCart();
  };

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <>
        <Row>
          <Col md={8}>
            <ListGroup style={{ color: "black", fontFamily: "Roboto" }}>
              <ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h2>Delivery Address </h2>
                </ListGroup.Item>
                <Lottie
                  options={defaultOptions}
                  style={{ width: "26%", height: "auto" }}
                />{" "}
                <p className="mt-3">
                  <span>Address:</span> {deliveryAddress.address},
                  {deliveryAddress.city},{deliveryAddress.country}-
                  {deliveryAddress.postalCode}
                </p>
                <Link to="/address" style={{ textDecoration: "none" }}>
                  <Button
                    type="button"
                    className="btn-block"

                    // onClick={checkoutHandler}
                  >
                    Edit Delivery Address here
                  </Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h2>Payment Option</h2>
                </ListGroup.Item>
                <p className="mt-3">{paymentOption}</p>
                <Link to="/payment" style={{ textDecoration: "none" }}>
                  <Button
                    type="button"
                    className="btn-block"

                    // onClick={checkoutHandler}
                  >
                    Edit Payment Option here
                  </Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <ListGroup.Item>
                  <h2>Order Items</h2>
                </ListGroup.Item>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <ListGroup.Item key={item.id}>
                      {" "}
                      <Row>
                        <Col md={1}>
                          {" "}
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="mb-2"
                            rounded
                          />
                        </Col>
                        <Col md={6} className="my-auto">
                          <Link to={`/products/${item.id}`}>
                            <h6>{item.name}</h6>{" "}
                          </Link>
                        </Col>
                        <Col md={5} className="my-auto">
                          {" "}
                          <h6>
                            {item.quantity} X ₹{item.price}/kg=₹
                            {Math.floor(item.price * item.quantity)}
                          </h6>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                ) : (
                  <>Oh!! Your cart is empty</>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            {cartItems.length > 0 ? (
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
                    <Col md={6}>₹{total ? total : 0}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col md={6}>Delivery Charge</Col>
                    <Col md={6}>₹{deliveryPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col md={6}>Tax Charge</Col>
                    <Col md={6}>₹{taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <Col md={6}>Total</Col>
                    <Col md={6}>₹{totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Col md={12}>
                    <Button
                      type="button"
                      className="btn-block"
                      style={{ fontFamily: "Roboto" }}
                      onClick={placeOrderHandler}
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </>
    </>
  );
};

export default PlaceOrder;
