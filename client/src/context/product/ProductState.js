import React, { useReducer } from "react";
import axios from "axios";
import ProductContext from "./productContext";
import productReducer from "./productReducer";
import {
  GET_PRODUCTS,
  PRODUCTS_ERR,
  GET_PRODUCT,
  PRODUCT_ERR,
  CLEAR_PRODUCT_ERRORS,
  GET_PRODUCT_RESET,
  LOADING_PRODUCTS,
  GET_PRODUCTS_RESET,
} from "../types.js";
const ProductState = (props) => {
  const initialState = {
    products: [],
    error: null,
    product: null,
    page: null,
    totalPages: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(productReducer, initialState);
  const getProducts = async (keyword = "", number = "") => {
    try {
      dispatch({ type: LOADING_PRODUCTS });
      const { data } = await axios.get(
        `/products?keyword=${keyword}&productpage=${number}`
      );
      dispatch({ type: GET_PRODUCTS, payload: data });
    } catch (err) {
      dispatch({
        type: PRODUCTS_ERR,
        payload: err.response.data.message,
      });
    }
  };
  const getProduct = async (id) => {
    try {
      dispatch({ type: LOADING_PRODUCTS });
      const { data } = await axios.get(`/products/${id}`);
      dispatch({ type: GET_PRODUCT, payload: data });
      // dispatch({ type: GET_PRODUCT_RESET})
    } catch (err) {
      dispatch({
        type: PRODUCT_ERR,
        payload: err.response.data.message,
      });
    }
  };
  const clearProductErrors = () => {
    dispatch({ type: CLEAR_PRODUCT_ERRORS });
  };
  const getProductReset = () => {
    dispatch({ type: GET_PRODUCT_RESET });
  };
  const getProductsReset = () => {
    dispatch({ type: GET_PRODUCTS_RESET });
  };
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        error: state.error,
        product: state.product,
        getProducts,
        getProduct,
        clearProductErrors,
        getProductReset,
        getProductsReset,
        page: state.page,
        totalPages: state.totalPages,
        loading: state.loading,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
