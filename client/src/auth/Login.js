import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";
// import "../App.css";
const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loadingPage, setLoadingPage] = useState(false);
  const {
    loading,
    clearErrors,
    loginUser,
    error,
    isAuthenticated,
    userData,
  } = useContext(AuthContext);

  const { setAlert, alerts } = useContext(AlertContext);

  const { email, password } = user;
  useEffect(() => {
    if (error === "Invalid email or password") {
      setAlert(error, "white", "red");
      clearErrors();
    }

    if (error === "Your email is not verified, Please verify") {
      setAlert(error, "white", "red");
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error]);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userData.length !== 0) {
      props.history.push(redirect);
    }

    //eslint-disable-next-line
  }, [userData]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setLoadingPage(true);
    if (email === "" || password === "") {
      setAlert("Fields cannot be empty", "white", "red");
      clearErrors();
    setLoadingPage(false);
    } else {
      loginUser({ email, password });
    setLoadingPage(false);
    }
  };
  return (
    <div
      className="form-container"
      style={{ textAlign: "left", color: "black" }}
    >
      <h2 style={{ color: "black" }}>Sign In</h2>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loadingPage ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> Login<span className="sr-only">Loading...</span>
            </>
          ) : (
            <>Login</>
          )}
        </Button>
      </Form>
      <p
        style={{ textAlign: "left", color: "black", fontFamily: "Roboto" }}
        className="mt-3"
      >
        New Customer?{" "}
        <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
          Register here
        </Link>
      </p>
    </div>
  );
};
export default Login;
