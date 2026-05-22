import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { WishlistState } from "@/types/wishlist";
import { wishlistReducer } from "./wishlist-reducer";
import type { WishlistAction } from "./wishlist-types";

interface WishlistContextValue {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

const WISHLIST_STORAGE_KEY = "ecommerce-wishlist";

function getInitialState(): WishlistState {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as WishlistState) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error(
      "useWishlistContext must be used within WishlistContextProvider"
    );
  return ctx;
}
