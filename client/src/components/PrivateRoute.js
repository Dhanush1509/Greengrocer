import React,{useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "../context/auth/AuthContext"


const PrivateRoute = ({ component: Component, ...rest }) => {

    const {isAuthenticated,userData,logout}=useContext(authContext)

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated) ? <Component {...props} /> : logout()
      }
    />
  );
};

export default PrivateRoute;
