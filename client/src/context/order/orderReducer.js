import {
  ADD_ORDER_ITEMS,
  ADD_ORDER_ERROR,
  GET_ORDER_ERROR,
  GET_ORDER,
  UPDATED_ORDER_TO_SUCCESS,
  UPDATE_ERROR,
  GET_OPTIONS,
  GET_OPTIONS_ERROR,
  GET_MY_ORDERS,
  GET_MY_ORDERS_ERROR,
  RESET_ADD_ORDER,
  ORDER_CONTEXT_LOADING
} from "../types";

const OrderReducer = (state, action) => {
  switch (action.type) {
    case ADD_ORDER_ITEMS:
      return {
        ...state,
        order: action.payload,
        success: true,
      };
    case ADD_ORDER_ERROR:
    case GET_ORDER_ERROR:
    case GET_OPTIONS_ERROR:
    case GET_MY_ORDERS_ERROR:

      return {
        ...state,
        error: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_OPTIONS:
      return {
        ...state,
        razorpayOptions: action.payload,
      };
    case GET_MY_ORDERS:
      return {
        ...state,
        myorders: [...action.payload],
        success:true
      };
    case RESET_ADD_ORDER:
      return {
        ...state,
        order: null,
        success: false,
      };
  
    default:
      return state;
  }
};

export default OrderReducer;
