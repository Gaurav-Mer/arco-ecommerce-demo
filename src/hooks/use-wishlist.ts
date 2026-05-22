import { useMemo } from "react";
import { useWishlistContext } from "@/context/wishlist/wishlist-context";
import type { Product } from "@/types";

export function useWishlist() {
  const { state, dispatch } = useWishlistContext();

  const count = useMemo(() => state.items.length, [state.items]);

  function toggle(product: Product) {
    dispatch({ type: "TOGGLE_ITEM", payload: product });
  }

  function isWishlisted(productId: number): boolean {
    return state.items.some((p) => p.id === productId);
  }

  return {
    items: state.items,
    count,
    toggle,
    isWishlisted,
  };
}
