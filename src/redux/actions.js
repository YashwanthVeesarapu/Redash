export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const changeCartQty = (payload, qty) => ({
  type: "CHANGE_QTY",
  payload: payload,
});

export const removeCartItem = (payload) => ({
  type: "REMOVE_ITEM",
  payload: payload,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const updateCheckoutDetails = (payload) => ({
  type: "UPDATE_CHECKOUT",
  payload: payload,
});

export const clearCheckout = () => ({
  type: "CLEAR_CHECKOUT",
});
