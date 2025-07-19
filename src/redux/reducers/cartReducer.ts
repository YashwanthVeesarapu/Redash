// This file was renamed from .js to .ts as part of the TypeScript migration.
// Please add type annotations as needed.
// ...existing code...
import { v4 } from "uuid";

const initialState = {
  products: [] as any[],
  total: "",
};

function totalPrice(products: any): string {
  if (!Array.isArray(products)) return "0";
  let total = 0;

  for (let i = 0; i < products.length; i++) {
    total =
      total + parseInt(products[i].price) * parseInt(products[i].quantity);
  }
  return total.toString();
}

const cartReducer = (
  state = initialState,
  action: any
): {
  products: any[];
  total: string;
} => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      payload.id = v4();
      const newCartProducts: any[] = [...state.products, payload];
      return {
        products: newCartProducts,
        total: totalPrice(newCartProducts),
      };

    case "CHANGE_QTY":
      const newP: any[] = state.products.map((p: any, i: number) =>
        p.id === payload.id ? { ...p, quantity: payload.quantity } : p
      );
      return {
        products: newP,
        total: totalPrice(newP),
      };
    case "REMOVE_ITEM":
      const newCartItems: any[] = state.products.filter(
        (p: any) => p.id !== payload
      );
      return {
        products: newCartItems,
        total: totalPrice(newCartItems),
      };

    case "CLEAR_CART":
      return {
        ...initialState,
      };

    default:
      return {
        products: state.products,
        total: state.total,
      };
  }
};

export default cartReducer;
