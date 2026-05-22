import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import { Skeleton } from "@/components/ui/skeleton";
import FilterProvider from "@/providers/filter-provider";

const HomePage = lazy(() =>
  import("@/pages/home-page").then((m) => ({ default: m.HomePage }))
);
const ProductDetailsPage = lazy(() =>
  import("@/pages/product-details-page").then((m) => ({
    default: m.ProductDetailsPage,
  }))
);
const CartPage = lazy(() =>
  import("@/pages/cart-page").then((m) => ({ default: m.CartPage }))
);
const CheckoutPage = lazy(() =>
  import("@/pages/checkout-page").then((m) => ({ default: m.CheckoutPage }))
);
const OrderConfirmationPage = lazy(() =>
  import("@/pages/order-confirmation-page").then((m) => ({
    default: m.OrderConfirmationPage,
  }))
);
const WishlistPage = lazy(() =>
  import("@/pages/wishlist-page").then((m) => ({ default: m.WishlistPage }))
);

function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <FilterProvider>
                <HomePage />
              </FilterProvider>
            </Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <ProductDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<PageFallback />}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<PageFallback />}>
              <CheckoutPage />
            </Suspense>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <Suspense fallback={<PageFallback />}>
              <OrderConfirmationPage />
            </Suspense>
          }
        />
        <Route
          path="/wishlist"
          element={
            <Suspense fallback={<PageFallback />}>
              <WishlistPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
