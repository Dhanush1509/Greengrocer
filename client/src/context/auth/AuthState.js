import React, { useReducer, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuth from "../../utils/setAuthToken";
import {
  LOGIN_ERROR,
  LOGIN_USER,
  CLEAR_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
  GET_USER_ERROR,
  REMOVE_USER_DATA,
  RESEND_LINK,
  RESEND_LINK_ERROR,
  CLEAR_MESSAGE,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_ERROR,
} from "../types.js";
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];
function AuthState(props) {
  const initialState = {
    loading: true,
    isAuthenticated: false,
    error: null,
    message: null,
    userData: userInfoStorage,
    userDetails: {},
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async (formData) => {
    console.log(formData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/users/login", formData, config);
      await dispatch({ type: LOGIN_USER, payload: data });
    } catch (err) {
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.message });
    }
  };
  const confirmation = async (email, token) => {
    try {
      const { data } = await axios.get(`/users/confirmation/${email}/${token}`);
      dispatch({ type: CONFIRM_EMAIL, payload: data });
    } catch (err) {
      dispatch({
        type: CONFIRM_EMAIL_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const resendLink = async (email) => {
    console.log(email);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/resendlink", email, config);

      dispatch({ type: RESEND_LINK, payload: data });
    } catch (err) {
      dispatch({ type: RESEND_LINK_ERROR, payload: err.response.data.message });
    }
  };
  const registerUser = async (formData) => {
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/users/register", formData, config);

      dispatch({ type: REGISTER_USER, payload: data });
    } catch (err) {
      dispatch({ type: REGISTER_ERROR, payload: err.response.data.message });
    }
  };
  const getUser = async () => {
    if (state.userData.token) {
      setAuth(state.userData.token);
    }
    try {
      const { data } = await axios.get("/users/profile");
      console.log(data)
      dispatch({ type: GET_USER, payload: data });
    } catch (err) {
      console.log(err.response.data.message);
      dispatch({ type: GET_USER_ERROR, payload: err.response.data.message });
    }
  };
  const updateUser = async (formData) => {
    if (state.userData.token) {
      setAuth(state.userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put("/users/profile", formData, config);
      dispatch({ type: UPDATE_USER, payload: data });
      getUser();
    } catch (err) {
      dispatch({ type: GET_USER_ERROR, payload: err.response.data.message });
    }
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: LOGOUT_USER });
    document.location.href = "/signin";
  };
  useEffect(
    () => {
      localStorage.setItem("userInfo", JSON.stringify(state.userData));
    },
    //eslint-disable-next-line
    [state.userData]
  );
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERROR });
  };
  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGE });
  };
  const removeUserData = () => {
    dispatch({ type: REMOVE_USER_DATA });
  };
  return (
    <AuthContext.Provider
      value={{
        userDetails: state.userDetails,
        updateUser,
        logout,
        clearErrors,
        loginUser,
        registerUser,
        getUser,
        removeUserData,
        resendLink,
        clearMessages,
        confirmation,
        message: state.message,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
        loading: state.loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
