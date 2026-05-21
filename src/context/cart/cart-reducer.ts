import type { CartState } from "@/types";
import type { CartAction } from "./cart-types";

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (i) => i.product.id !== action.payload.productId
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => i.product.id !== action.payload.productId
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.productId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    default:
      return state;
  }
}
