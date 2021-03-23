import React, { useState,useContext,useEffect } from "react";
import {Form,Button,Spinner} from "react-bootstrap";
import {Link} from 'react-router-dom'

import AuthContext from "../context/auth/AuthContext";
import AlertContext from "../context/alert/AlertContext";
// import "../App.css";
const Register = (props) => {
   
  const { loading,clearErrors, registerUser, error, isAuthenticated,userData,message,clearMessages } = useContext(
    AuthContext
  );

  const { setAlert, alerts } = useContext(AlertContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const [localLoading,setLocalLoading]=useState(false);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  useEffect(() => {
    if (error === "User already exists") {
      setAlert(error, "white", "red");
      clearErrors();
    }
    if(message){
    if(message.substring(0,14)==="A verification"){
      props.history.push("/user/confirm")
      clearMessages()
    }
  }
 
    //eslint-disable-next-line
  }, [error,message]);
  
     const redirect = props.location.search
       ? props.location.search.split("=")[1]
       : "/";
  //  useEffect(() => {
  //    if (userData.length !== 0) {
  //      props.history.push(redirect);
  //    }

     //eslint-disable-next-line
  //  }, [userData]);
   
    const onSubmit = (e) => {
      e.preventDefault();
      if (email === "" || password === ""||password2===""||name === "") {
        setAlert("Fields cannot be empty", "white", "red");
        clearErrors();
      }else if(password!==password2){
          setAlert("Passwords did not match", "white", "red");
          clearErrors();
      }
       else {
         setLocalLoading(true)
        registerUser({name, email, password });
      
      }
    };
  return (
    <div
      className="form-container"
      style={{ textAlign: "left", color: "black" }}
    >
      <h2 style={{ color: "black" }}>Sign Up</h2>
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
        <Form.Group controlId="formGroupEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
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
          {localLoading ? (
            <>
              Submit&nbsp;
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </Form>
      <p
        style={{ textAlign: "left", color: "black", fontFamily: "Roboto" }}
        className="mt-3"
      >
        Have an account?
        <Link to={redirect ? `/signin?redirect=${redirect}` : "/signin"}>
          Login here
        </Link>
      </p>
    </div>
  );
};
export default Register;

