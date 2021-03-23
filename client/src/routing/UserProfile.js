import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";
import Lottie from "react-lottie";
import animationData from "../assets/reactLottie/profile.json";
import { Row, Col, Container, ListGroup, Form, Button } from "react-bootstrap";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import {Link} from 'react-router-dom'
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function UserProfile(props) {
  const {
    getUser,
    userDetails,
    userData,
    updateUser,
    error,
    clearErrors,
    logout
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  let email1;
  if (userDetails) {
    email1 = userDetails.email;
  }
  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  useEffect(() => {
    if (error === "User already exists") {
      if (email1 !== email) {
        setAlert(error, "white", "red");
      }
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    if (userData.length === 0) {
      props.history.push("/signin");
    } else {
      if (!user) {
        getUser();
      } else {
        setUser({
          name: userDetails.name,
          email: userDetails.email,
          password: "",
          password2: "",
        });
      }
    }
    //eslint-disable-next-line
  }, [userDetails]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords did not match", "white", "red");
      clearErrors();
    }
   else{ updateUser({
      name,
      email,
      password,
    });
  }
  };
  return userDetails ? (
    <>
      <Row style={{ color: "black", fontFamily: "Roboto" }}>
        <Col lg={3} sm={12}>
          <Col>
            <Lottie
              options={defaultOptions}
              style={{ width: "50%", height: "auto" }}
            />
            Hello {userDetails.name}
          </Col>

          <Row className="mt-3" style={{ textAlign: "left" }}>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  <AccountCircleIcon
                    className="mr-2"
                    style={{ color: "#003699" }}
                  />
                  <span style={{ color: "#003699" }}> Edit profile</span>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => props.history.push("/myorders")}
                >
                  <CheckBoxOutlineBlankIcon
                    className="mr-2"
                    style={{ color: "#dc3545" }} //26a745
                  />
                  My orders
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => props.history.push("/wishlist")}
                >
                  <FavoriteIcon className="mr-2" style={{ color: "#dc3545" }} />
                  My wishlist
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => props.history.push("/cart")}
                >
                  <ShoppingCartOutlinedIcon
                    className="mr-2"
                    style={{ color: "#003699" }}
                  />{" "}
                  Your cart
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => logout()}
                >
                  <ExitToAppIcon
                    className="mr-2"
                    style={{ color: "#003699" }}
                  />{" "}
                  Log out
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Col>
        <Col lg={9} sm={12}>
          <div
            class="form-container"
            style={{ textAlign: "left", color: "black", margin: "none" }}
          >
            <h2 style={{ color: "black" }}>Edit profile</h2>

            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  maxLength="30"
                />
              </Form.Group>
              
              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength="6"
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword1">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  minLength="6"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Edit Profile
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  ) : (
    <h1>Loading......</h1>
  );
}

export default UserProfile;
// <Lottie
//   options={defaultOptions}
//   style={{ width: "40%", height: "auto" }}
// />{" "}
