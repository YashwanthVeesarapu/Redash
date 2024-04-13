const initialState = {
  shipping: {},
  contact: {},
  orderItems: [],
  email: "",
  total: "",
};

const checkoutReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_CHECKOUT":
      return {
        shipping: payload.shipping ? payload.shipping : state.shipping,
        contact: payload.contact ? payload.contact : state.contact,
        orderItems: payload.orderItems ? payload.orderItems : state.orderItems,
        uid: payload.uid ? payload.uid : state.uid,
        total: payload.total ? payload.total : state.total,
      };

    case "CLEAR_CHECKOUT":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
