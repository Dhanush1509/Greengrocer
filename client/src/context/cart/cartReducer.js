import {
  CART_ADD_PRODUCT,
  DELETE_ITEM_FROM_CART,
  TOTAL_COST,
  SAVE_ADDRESS,
  SAVE_PAYMENT_OPTION,
  EMPTY_CART
} from "../types.js";

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.id === action.payload.id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === action.payload.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
      case EMPTY_CART:
          localStorage.removeItem("cartItems");
        return{
          ...state,cartItems:[]
        }
      
    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };
    case TOTAL_COST:
      let m=0;
      state.cartItems.map(
        (i) => (m = m + (i.price * i.quantity))
      );
      return { ...state, total: m };
    case SAVE_ADDRESS:
    console.log(action.payload)
      return {
        ...state,
        deliveryAddress:action.payload
      };
      case SAVE_PAYMENT_OPTION:
return{
  ...state,
  paymentOption:action.payload
}
    default:
      return state;
  }
};
export default cartReducer;
