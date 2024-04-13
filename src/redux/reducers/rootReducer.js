import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
