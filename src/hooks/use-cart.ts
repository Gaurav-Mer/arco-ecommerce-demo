import { useMemo } from "react";
import { useCartContext } from "@/context/cart/cart-context";
import type { Product } from "@/types";

export function useCart() {
  const { state, dispatch } = useCartContext();

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [state.items]
  );

  function addItem(product: Product) {
    dispatch({ type: "ADD_ITEM", payload: product });
  }

  function removeItem(productId: number) {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }

  function updateQuantity(productId: number, quantity: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}
