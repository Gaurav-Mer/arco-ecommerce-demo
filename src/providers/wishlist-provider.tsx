import { WishlistContextProvider } from "@/context/wishlist/wishlist-context";
import type { ReactNode } from "react";

export function WishlistProvider({ children }: { children: ReactNode }) {
  return <WishlistContextProvider>{children}</WishlistContextProvider>;
}
