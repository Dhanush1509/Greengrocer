import React from "react";
import {
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  GET_USERS_COUNT,
  GET_USER_BY_ID,
  GET_USER_BY_ID_ERROR,
  UPDATE_USER_BY_ADMIN_ERROR,
  DELETE_USER_BY_ADMIN_ERROR,
  UPDATE_USER_BY_ADMIN,
  DELETE_USER_BY_ADMIN,
  CLEAR_ADMIN_MESSAGE,
  GET_ALL_ORDERS_FOR_ADMIN,
  GET_ALL_ORDERS_FOR_ADMIN_ERROR,
  UPDATE_ORDER_TO_DELIVERED,
  UPDATE_ORDER_TO_DELIVERED_ERROR,
  ORDER_LIST_LOADING,
  GET_ALL_PRODUCTS_FOR_ADMIN,
  GET_ALL_PRODUCTS_FOR_ADMIN_ERROR,
  DELETE_PRODUCT_BY_ADMIN,
  DELETE_PRODUCT_BY_ADMIN_ERROR,
  UPDATE_PRODUCT_BY_ADMIN,
  UPDATE_PRODUCT_BY_ADMIN_ERROR,
  ADD_PRODUCT_BY_ADMIN,ADD_PRODUCT_BY_ADMIN_ERROR
} from "../types";
//Why when I pass whole data as action.payload it is not accepting
const AdminReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        orderListLoading: false,
      };
    case GET_ALL_PRODUCTS_FOR_ADMIN:
      return {
        ...state,
        productsForAdmin: [...action.payload],
        orderListLoading: false,
      };
    case DELETE_PRODUCT_BY_ADMIN:
      return {
        ...state,
        success: true,
        orderListLoading: false,
      };
    case GET_ALL_USERS_ERROR:
    case GET_USER_BY_ID_ERROR:
    case DELETE_USER_BY_ADMIN_ERROR:
    case UPDATE_USER_BY_ADMIN_ERROR:
    case GET_ALL_ORDERS_FOR_ADMIN_ERROR:
    case GET_ALL_PRODUCTS_FOR_ADMIN_ERROR:
    case UPDATE_ORDER_TO_DELIVERED_ERROR:
    case DELETE_PRODUCT_BY_ADMIN_ERROR:
    case UPDATE_PRODUCT_BY_ADMIN_ERROR:
      case ADD_PRODUCT_BY_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_USER_BY_ADMIN:
      return {
        ...state,
        userDetailsForAdmin: action.payload.userUpdate,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetailsForAdmin: action.payload.user,
        orderDetailsOfUserForAdmin: action.payload.orders,
        orderListLoading: false,
      };
    case UPDATE_ORDER_TO_DELIVERED:
      return {
        ...state,
        adminOrder: action.payload,
        orderListLoading: false,
      };
    case DELETE_USER_BY_ADMIN:
      return {
        ...state,
        adminMessage: action.payload,
        userDetailsForAdmin: null,
        orderListLoading: false,
      };
    case GET_USERS_COUNT:
      return {
        ...state,
        usersCount: action.payload.length,
        orderListLoading: false,
      };
    case GET_ALL_ORDERS_FOR_ADMIN:
      let deliveredItemsCount = 0,
        pendingDeliveredItemsCount = 0,
        orderPaymentsCount = 0;
      action.payload.map((order) => {
        if (order.isDelivered) deliveredItemsCount++;
        else if (!order.isDelivered) pendingDeliveredItemsCount++;
        if (order.isPaid) {
          orderPaymentsCount += order.totalPrice;
        }
      });
      return {
        ...state,
        adminOrders: [...action.payload],
        ordersCount: action.payload.length,
        paymentsCount: orderPaymentsCount,
        deliveredItemsCount: deliveredItemsCount,
        pendingDeliveredItemsCount: pendingDeliveredItemsCount,
        orderListLoading: false,
      };
    case CLEAR_ADMIN_MESSAGE:
      return {
        ...state,
        adminMessage: null,
        userDetailsForAdmin: null,
        orderListLoading: false,
      };
    case ORDER_LIST_LOADING:
      return {
        ...state,
        orderListLoading: true,
        success: false,
      };
    case UPDATE_PRODUCT_BY_ADMIN:
      return {
        ...state,
        orderListLoading: false,
        adminMessage:action.payload.message,
      };
      case ADD_PRODUCT_BY_ADMIN:
        return{
          ...state,
          adminMessage:action.payload.message,
          orderListLoading:false
        }
    default:
      return state;
  }
};

export default AdminReducer;
