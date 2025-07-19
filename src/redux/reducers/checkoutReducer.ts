// This file was renamed from .js to .ts as part of the TypeScript migration.
// Please add type annotations as needed.

interface CheckoutState {
  shipping: {};
  contact: {};
  orderItems: never[];
  total: string;
  uid: string;
}

const initialState: CheckoutState = {
  shipping: {},
  contact: {},
  orderItems: [],
  total: "",
  uid: "",
};

const checkoutReducer = (state = initialState, action: any): CheckoutState => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_CHECKOUT":
      return {
        shipping: payload.shipping ? payload.shipping : state.shipping || {},
        contact: payload.contact ? payload.contact : state.contact || {},
        orderItems: payload.orderItems
          ? payload.orderItems
          : state.orderItems || [],
        uid: payload.uid ? payload.uid : state.uid || "",
        total: payload.total ? payload.total : state.total || "",
      };

    case "CLEAR_CHECKOUT":
      return {
        ...initialState,
      };
    default:
      return {
        shipping: state.shipping || {},
        contact: state.contact || {},
        orderItems: state.orderItems || [],
        total: state.total || "",
        uid: state.uid || "",
      };
  }
};

export default checkoutReducer;
