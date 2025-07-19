// This file was renamed from .js to .ts as part of the TypeScript migration.
// Please add type annotations as needed.
// ...existing code...
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
