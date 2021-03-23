import React, { useReducer, useEffect, useContext } from "react";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import setAuth from "../../utils/setAuthToken";
import {
  ADD_ORDER_ITEMS,
  ADD_ORDER_ERROR,
  GET_ORDER,
  GET_ORDER_ERROR,
  UPDATED_ORDER_TO_SUCCESS,
  UPDATE_ERROR,
  GET_OPTIONS,
  GET_OPTIONS_ERROR,
  GET_MY_ORDERS,
  GET_MY_ORDERS_ERROR,
  RESET_ADD_ORDER,
  UPDATE_ORDER_TO_DELIVERED,
  UPDATE_ORDER_TO_DELIVERED_ERROR,
  ORDER_CONTEXT_LOADING
} from "../types.js";
const initialState = {
  error: null,
  orderDetails: null,
  success: false,
  order: null,
  razorpayOptions: null,
  myorders:[],
  orderContextLoading:false
};
function OrderState(props) {
  const { userData } = useContext(AuthContext);
  const [state, dispatch] = useReducer(OrderReducer, initialState);
  const addOrder = async (orderData) => {
    if (userData.token) {
      setAuth(userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(orderData);
      const { data } = await axios.post("/orders/addorder", orderData, config);
      dispatch({
        type: ADD_ORDER_ITEMS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ADD_ORDER_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const getOrder = async (orderId) => {
    if (userData.token) {
      setAuth(userData.token);
    }

    try {
      const { data } = await axios.get(`/orders/getorder/${orderId}`);
      dispatch({
        type: GET_ORDER,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: GET_ORDER_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getOptions = async (totalPrice) => {
  
    if (userData.token) {
      setAuth(userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/orders/razorpay/generateid",
        totalPrice,
        config
      );
    
      dispatch({
        type: GET_OPTIONS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: GET_OPTIONS_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const updateOrderToSuccess = async (formData) => {
    if (userData.token) {
      setAuth(userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(
        "/orders/payment/success",
        formData,
        config
      );
      dispatch({
        type: UPDATED_ORDER_TO_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const getMyOrders=async ()=>{
      if (userData.token) {
        setAuth(userData.token);
      }

      try {
        const { data } = await axios.get(
          "/orders/myorders",
        );
      
        dispatch({
          type: GET_MY_ORDERS,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type:GET_MY_ORDERS_ERROR,
          payload: err.response.data.message,
        });
      }
  }
  const resetAddOrder=() => {
    dispatch({type:RESET_ADD_ORDER})
  }
 
  
  return (
    <OrderContext.Provider
      value={{
        addOrder,
        resetAddOrder,
        getOrder,
        getOptions,
        getMyOrders,
        error: state.error,
        orderDetails: state.orderDetails,
        order: state.order,
        razorpayOptions: state.razorpayOptions,
        success: state.success,
        myorders: state.myorders,
        updateOrderToSuccess,
       
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}

export default OrderState;
