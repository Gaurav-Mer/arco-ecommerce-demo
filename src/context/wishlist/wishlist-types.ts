import type { Product } from "@/types";

export type WishlistAction =
  | { type: "TOGGLE_ITEM"; payload: Product }
  | { type: "CLEAR_WISHLIST" };
