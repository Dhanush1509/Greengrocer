import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckoutSection from "../components/CheckoutSection";
import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";
import CartContext from "../context/cart/cartContext";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/truck.json";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// import "../App.css";
const AddressPage = (props) => {
  const { loading, clearErrors, error,  userData } = useContext(
    AuthContext
  );
  const { saveAddress, deliveryAddress } = useContext(CartContext);

  const { setAlert, alerts } = useContext(AlertContext);
  const [delivery, setDelivery] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const { address, city, postalCode, country } = delivery;
  const onChange = (e) =>
    setDelivery({ ...delivery, [e.target.name]: e.target.value });

  useEffect(() => {
    if (userData.length===0) {
      props.history.push("/signin?redirect=address");
    }
    if (deliveryAddress) {
      setDelivery({
        address: deliveryAddress.address,
        city: deliveryAddress.city,
        postalCode: deliveryAddress.postalCode,
        country: deliveryAddress.country,
      });
    }

    //eslint-disable-next-line
  }, [userData, deliveryAddress]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (address === "" || city === "" || postalCode === "" || country === "") {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    } else {
      saveAddress({ address, city, postalCode, country });
      props.history.push("/payment");
    }
  };
  return (
    <>
      <CheckoutSection step1 step2 />
      <div
        className="form-container mb-1"
        style={{ textAlign: "left", color: "black" }}
      >
        <h1 style={{ color: "black" }}>Delivery Address</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Delivery address"
              name="address"
              value={address}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              value={postalCode}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={onChange}
            />
          </Form.Group>{" "}
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Form>{" "}
        <Lottie
          options={defaultOptions}
          style={{ width: "60%", height: "auto" }}
        />
      </div>
    </>
  );
};
export default AddressPage;
