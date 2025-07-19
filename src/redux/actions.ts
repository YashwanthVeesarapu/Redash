// This file was renamed from .js to .ts as part of the TypeScript migration.
// Please add type annotations as needed.
// ...existing code...
export const addToCart = (product: any) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const changeCartQty = (payload: any, qty: any) => ({
  type: "CHANGE_QTY",
  payload: payload,
});

export const removeCartItem = (payload: any) => ({
  type: "REMOVE_ITEM",
  payload: payload,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const updateCheckoutDetails = (payload: any) => ({
  type: "UPDATE_CHECKOUT",
  payload: payload,
});

export const clearCheckout = () => ({
  type: "CLEAR_CHECKOUT",
});
