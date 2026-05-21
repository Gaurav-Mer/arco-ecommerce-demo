import type { Product } from "@/types";

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" };
