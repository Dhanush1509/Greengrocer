import {
  GET_PRODUCTS,
  PRODUCT_ERR,
  PRODUCTS_ERR,
  GET_PRODUCT,
  GET_PRODUCT_RESET,
  CLEAR_PRODUCT_ERRORS,
  GET_PRODUCTS_RESET,
  LOADING_PRODUCTS,
} from "../types.js";

const productReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        totalPages: action.payload.pages,
        loading: false,
      };
    case PRODUCTS_ERR:
    case PRODUCT_ERR:
      return {
        ...state,
        products: [],
        product: null,
        error: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
        // state.products.filter(product=>product._id===action.payload.id)
      };
    case CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        error: null,
      };
    case GET_PRODUCT_RESET:
      return {
        ...state,
        product: null,
      };
    case GET_PRODUCTS_RESET:
      return {
        ...state,
        products: null,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default productReducer;
