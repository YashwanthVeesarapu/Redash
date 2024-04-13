import { v4 } from "uuid";

const initialState = {
  products: [],
  total: "",
};

function totalPrice(products) {
  if (!Array.isArray(products)) return 0;
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total =
      total + parseInt(products[i].price) * parseInt(products[i].quantity);
  }
  return total;
}

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      payload.id = v4();
      const newCartProducts = [...state.products, payload];
      return {
        products: newCartProducts,
        total: totalPrice(newCartProducts),
      };

    case "CHANGE_QTY":
      const newP = state.products.map((p, i) =>
        p.id === payload.id ? { ...p, quantity: payload.quantity } : p
      );
      return {
        products: newP,
        total: totalPrice(newP),
      };
    case "REMOVE_ITEM":
      const newCartItems = state.products.filter((p) => p.id !== payload);
      return {
        products: newCartItems,
        total: totalPrice(newCartItems),
      };

    case "CLEAR_CART":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default cartReducer;
