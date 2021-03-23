import React, { useReducer, useContext } from "react";
import AdminReducer from "./AdminReducer";
import AdminContext from "./AdminContext";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import setAuth from "../../utils/setAuthToken";
import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_USERS_COUNT,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ADMIN,
  UPDATE_USER_BY_ADMIN_ERROR,
  DELETE_USER_BY_ADMIN_ERROR,
  DELETE_USER_BY_ADMIN,
  CLEAR_ADMIN_MESSAGE,
  GET_ALL_ORDERS_FOR_ADMIN,
  GET_ALL_ORDERS_FOR_ADMIN_ERROR,
  UPDATE_ORDER_TO_DELIVERED,
  UPDATE_ORDER_TO_DELIVERED_ERROR,
  ORDER_LIST_LOADING,
  GET_ALL_PRODUCTS_FOR_ADMIN_ERROR,
  GET_ALL_PRODUCTS_FOR_ADMIN,
  DELETE_PRODUCT_BY_ADMIN_ERROR,
  DELETE_PRODUCT_BY_ADMIN,
  UPDATE_PRODUCT_BY_ADMIN_ERROR,
  UPDATE_PRODUCT_BY_ADMIN,
  ADD_PRODUCT_BY_ADMIN,ADD_PRODUCT_BY_ADMIN_ERROR,
} from "../types";
const AdminState = (props) => {
  const { userData } = useContext(AuthContext);
  const initialState = {
    adminProducts: null,
    users: null,
    adminError: null,
    adminMessage: null,
    usersCount: null,
    userDetailsForAdmin: null,
    orderDetailsOfUserForAdmin: null,
    adminOrders: [],
    ordersCount: null,
    pendingDeliveredItemsCount: null,
    deliveredItemsCount: null,
    paymentsCount: null,
    adminOrder: null,
    orderListLoading: false,
    productsForAdmin: [],
    success:false
  };
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const getAllProductsForAdmin = async () => {
    try {
      dispatch({ type: ORDER_LIST_LOADING });
      const { data } = await axios.get(`/products/admin`);
      dispatch({ type: GET_ALL_PRODUCTS_FOR_ADMIN, payload: data });
    } catch (err) {
      dispatch({
        type: GET_ALL_PRODUCTS_FOR_ADMIN_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  const getAllUsers = async () => {
    dispatch({ type: ORDER_LIST_LOADING });
    if (userData.token) {
      setAuth(userData.token);
    }
    try {
      const { data } = await axios.get("/users/");
      dispatch({ type: GET_ALL_USERS, payload: data.users });
      dispatch({ type: GET_USERS_COUNT, payload: data.users });
    } catch (err) {
      dispatch({
        type: GET_ALL_USERS_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const getUserById = async (userId) => {
    dispatch({ type: ORDER_LIST_LOADING });
    if (userData.token) {
      setAuth(userData.token);
    }
    try {
      const { data } = await axios.get(`/users/${userId}`);
      dispatch({ type: GET_USER_BY_ID, payload: data });
    } catch (err) {
      dispatch({ type: GET_USER_BY_ID, payload: err.response.data.message });
    }
  };
  const deleteUserByAdmin = async (userId) => {
    if (userData.token) {
      setAuth(userData.token);
    }
    try {
      const { data } = await axios.delete(`/users/${userId}`);
      dispatch({ type: DELETE_USER_BY_ADMIN, payload: data });
      document.location.href("/admin");
    } catch (err) {
      dispatch({ type: DELETE_USER_BY_ADMIN_ERROR, payload: err.response.data.message });
      
    }
  };
  const updateUserByAdmin = async (userId, formData) => {
    const { name, email, isAdmin, isVerified } = formData;

    if (userData.token) {
      setAuth(userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(`/users/${userId}`, formData, config);
      dispatch({ type: UPDATE_USER_BY_ADMIN, payload: data });
    } catch (err) {
      dispatch({
        type: UPDATE_USER_BY_ADMIN_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const clearAdminMessage = () => {
    dispatch({ type: CLEAR_ADMIN_MESSAGE });
  };
  const getAllOrdersForAdmin = async () => {
    dispatch({ type: ORDER_LIST_LOADING });
    if (userData.token) {
      setAuth(userData.token);
    }
    try {
      const { data } = await axios.get("/orders");
      dispatch({ type: GET_ALL_ORDERS_FOR_ADMIN, payload: data.orders });
    } catch (err) {
      dispatch({
        type: GET_ALL_ORDERS_FOR_ADMIN_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const updateOrderToDelivered = async (Id) => {
    dispatch({ type: ORDER_LIST_LOADING });
    if (userData.token) {
      setAuth(userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(`/orders/${Id}`, {}, config);

      dispatch({
        type: UPDATE_ORDER_TO_DELIVERED,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_ORDER_TO_DELIVERED_ERROR,
        payload: err.response.data.message,
      });
    }
  };
  const deleteProductByAdmin= async (id)=>{
if (userData.token) {
  setAuth(userData.token);
}
dispatch({type:ORDER_LIST_LOADING})
try {
  const { data } = await axios.delete(`/products/admin/${id}`);
  dispatch({ type: DELETE_PRODUCT_BY_ADMIN, payload: data });
} catch (err) {
  dispatch({
    type: DELETE_PRODUCT_BY_ADMIN_ERROR,
    payload: err.response.data.message,
  });
}
  }
const createProductByAdmin = async (formData) => {
  if (userData.token) {
    setAuth(userData.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({ type: ORDER_LIST_LOADING });
    const { data } = await axios.post("/products/admin/addproduct", formData, config);

    dispatch({ type: ADD_PRODUCT_BY_ADMIN, payload: data });
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_BY_ADMIN_ERROR });
  }
};
const updateProductByAdmin = async(formData,id) => {
if (userData.token) {
  setAuth(userData.token);
}
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
  try{
    dispatch({type:ORDER_LIST_LOADING})
const {data}=await axios.put(`/products/admin/${id}`,formData, config)
console.log(data)
dispatch({type:UPDATE_PRODUCT_BY_ADMIN, payload: data})
  }
catch(err){
  dispatch({type:UPDATE_PRODUCT_BY_ADMIN_ERROR})
}
}
  return (
    <AdminContext.Provider
      value={{
        getUserById,
        getAllUsers,
        adminProducts: state.adminProducts,
        users: state.users,
        adminError: state.adminError,
        usersCount: state.usersCount,
        userDetailsForAdmin: state.userDetailsForAdmin,
        adminMessage: state.adminMessage,
        orderDetailsOfUserForAdmin: state.orderDetailsOfUserForAdmin,
        updateUserByAdmin,
        deleteUserByAdmin,
        clearAdminMessage,
        getAllOrdersForAdmin,
        updateOrderToDelivered,
        adminOrders: state.adminOrders,
        ordersCount: state.ordersCount,
        pendingDeliveredItemsCount: state.pendingDeliveredItemsCount,
        deliveredItemsCount: state.deliveredItemsCount,
        paymentsCount: state.paymentsCount,
        orderListLoading: state.orderListLoading,
        adminOrder: state.adminOrder,
        getAllProductsForAdmin,
        productsForAdmin: state.productsForAdmin,
        deleteProductByAdmin,
        success:state.success,
        updateProductByAdmin,
  createProductByAdmin
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminState;
