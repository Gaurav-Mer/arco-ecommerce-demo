import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { CartState } from "@/types";
import { cartReducer } from "./cart-reducer";
import type { CartAction } from "./cart-types";

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CART_STORAGE_KEY = "ecommerce-cart";

function getInitialState(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartState) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartContextProvider");
  return ctx;
}
