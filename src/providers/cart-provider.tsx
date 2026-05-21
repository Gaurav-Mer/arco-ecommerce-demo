import type { ReactNode } from "react";
import { CartContextProvider } from "@/context/cart/cart-context";

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
