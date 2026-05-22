import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/lib/api/axios-interceptor";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "@/providers/query-provider.tsx";
import { CartProvider } from "@/providers/cart-provider.tsx";
import { WishlistProvider } from "@/providers/wishlist-provider.tsx";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components/helper/scroll-to-top.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <ScrollToTop />
            <Toaster richColors position="top-right" />
          </WishlistProvider>
        </CartProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
