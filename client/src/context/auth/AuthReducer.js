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
const authReducer = (state, action) => {
  switch (action.type) {
    case RESEND_LINK:
      return {
        ...state,
        message: action.payload.message,
      };
    case REGISTER_USER:
      return {
        ...state,
        message: action.payload.message,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        userData: action.payload,
        isAuthenticated:true
      };
    case CONFIRM_EMAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    case GET_USER_ERROR:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
    case RESEND_LINK_ERROR:
    case CONFIRM_EMAIL_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: [],
        isAuthenticated:false
      };
    case REMOVE_USER_DATA:
      return {
        ...state,
        userData: [],
      };
    default:
      return state;
  }
};

export default authReducer;
