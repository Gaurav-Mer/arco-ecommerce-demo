import type { WishlistState } from "@/types/wishlist";
import type { WishlistAction } from "./wishlist-types";

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.some((p) => p.id === action.payload.id);
      return {
        items: exists
          ? state.items.filter((p) => p.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    }
    case "CLEAR_WISHLIST":
      return { items: [] };
    default:
      return state;
  }
}
