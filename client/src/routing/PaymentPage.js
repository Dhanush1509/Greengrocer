import React, { useContext, useEffect, useState } from "react";
import CheckoutSection from "../components/CheckoutSection";
import { Form, Button, Col } from "react-bootstrap";
import CartContext from "../context/cart/cartContext";
import authContext from "../context/auth/AuthContext";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/payment.json";
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PaymentPage = (props) => {
  const { deliveryAddress, savePaymentOption } = useContext(CartContext);
  const { userData } = useContext(authContext);
  const [paymentOption, setPaymentOption] = useState("Razorpay");
  useEffect(() => {
    if (userData.length === 0) {
      props.history.push("/signin?redirect=payment");
    }
    if (!deliveryAddress) {
      props.history.push("/address");
    }
    //eslint-disable-next-line
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    savePaymentOption(paymentOption);
    props.history.push("/placeorder");
  };
  const onChange = (e) => {
    setPaymentOption(e.target.value);
  };
  return (
    <>
      <CheckoutSection step1 step2 step3 />

      <div
        className="form-container"
        style={{ textAlign: "left", color: "black" }}
      >
        {" "}
        <h1 style={{ color: "black" }}>Payment Option</h1>
        <Lottie
          options={defaultOptions}
          style={{ width: "60%", height: "auto" }}
        />
        <Form onSubmit={onSubmit}>
          <Form.Label>Select Option</Form.Label>

          <Form.Check
            label="Razorpay"
            type="radio"
            id="Razorpay"
            name="paymentOption"
            value="Razorpay"
            checked
            onChange={onChange}
          ></Form.Check>

          <Button variant="primary" type="submit" className="mt-2">
            Continue
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PaymentPage;
