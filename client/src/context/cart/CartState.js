import React, { useReducer, useEffect } from "react";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";
import axios from "axios";
import {
  CART_ADD_PRODUCT,
  CART_ADD_ERR,
  DELETE_ITEM_FROM_CART,
  TOTAL_COST,
  SAVE_ADDRESS,
  SAVE_PAYMENT_OPTION,
  EMPTY_CART
} from "../types.js";
function CartState(props) {
  const itemsInStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const addressInStorage = localStorage.getItem("deliveryAddress")
    ? JSON.parse(localStorage.getItem("deliveryAddress"))
    : [];
  const paymentInStorage = localStorage.getItem("paymentOption")
    ? JSON.parse(localStorage.getItem("paymentOption"))
    : [];
  const initialState = {
    cartItems: itemsInStorage,
    deliveryAddress: addressInStorage,
    paymentOption: paymentInStorage,
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = async (id, addBool, quantity) => {
    const { data } = await axios.get("/products/" + id);

    await dispatch({
      type: CART_ADD_PRODUCT,
      payload: {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        description: data.description,
        addBool: addBool,
        quantity: quantity ? quantity : 1,
      },
    });
  };

  const deleteItemFromCart = (productId) => {
    dispatch({ type: DELETE_ITEM_FROM_CART, payload: productId });
  };

  const totalCost = () => {
    dispatch({ type: TOTAL_COST });
  };

  const saveAddress = (data) => {
    dispatch({ type: SAVE_ADDRESS, payload: data });
  };
  const savePaymentOption = (data) => {
    dispatch({ type: SAVE_PAYMENT_OPTION, payload: data });
  };
  const emptyCart=()=>{
    dispatch({ type:EMPTY_CART})
  }
  useEffect(
    () => {
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //eslint-disable-next-line
    [state.cartItems]
  );
  useEffect(
    () => {
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(state.deliveryAddress)
      );
    },
    //eslint-disable-next-line
    [state.deliveryAddress]
  );
  useEffect(
    () => {
      localStorage.setItem(
        "paymentOption",
        JSON.stringify(state.paymentOption)
      );
    },
    //eslint-disable-next-line
    [state.paymentOption]
  );
  return (
    <CartContext.Provider
      value={{
        addToCart,
        deleteItemFromCart,
        totalCost,
        saveAddress,
        savePaymentOption,
        emptyCart,
        cartItems: state.cartItems,
        total: state.total,
        deliveryAddress: state.deliveryAddress,
        paymentOption: state.paymentOption,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartState;
