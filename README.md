# Modern E-Commerce Platform

A production-ready e-commerce frontend application built using React, TypeScript, and modern frontend engineering practices.

The application allows users to browse products, search and filter by category and price range, manage a wishlist and cart, complete a checkout flow with order confirmation, and experience a responsive, polished UI.

---

# What I Built

The project includes:

- Product listing page with hero section
- Product search, filtering (category + price range), and sorting
- Product details page with image gallery and related products
- Shopping cart with quantity controls and persistence
- Wishlist feature with localStorage persistence
- Complete checkout flow with form validation
- Order confirmation page with order summary
- Responsive design (mobile-first)
- Loading and error states throughout
- Code-split routes with React.lazy + Suspense

The focus was on building a scalable frontend architecture while maintaining clean UI/UX and production-oriented engineering practices.

---

# Performance Decisions

Performance was treated as a first-class concern, not an afterthought:

## Memoization Strategy
- **`React.memo` on `ProductCard` and `CartItem`**: the product grid re-renders on every filter change; without memoization each card would re-render even if its data didn't change. `memo` prevents this.
- **`useMemo` in `useCart`**: `totalItems` and `totalPrice` are derived values recalculated only when `items` changes — not on every parent render.
- **`useMemo` in `useProducts`**: the price range filter is applied as a client-side transform on cached API data. The query key intentionally excludes `priceRange` so that moving the slider never triggers a new network request.

## Debouncing
- **Search input**: 500 ms debounce prevents an API call on every keystroke.
- **Price range slider**: 300 ms debounce prevents context updates on every pixel of drag — the UI updates immediately but the filter only propagates when the user stops moving.

## Caching
- TanStack Query caches product responses with a 5-minute stale time. Switching categories and back doesn't refetch; navigating between product detail pages reuses cached data.

## Code Splitting
- All pages are loaded with `React.lazy()` and wrapped in `Suspense` boundaries, so only the code for the current route is fetched on initial load.

## Image Loading
- Product images use `loading="lazy"` so only visible images are fetched on page load.

---

# Key Engineering Decisions

## Why React + Vite?
Vite provides a fast development experience and optimised production builds with minimal configuration.

## Why TypeScript?
Static typing catches integration errors early — especially important across context → hook → component boundaries — and improves IDE tooling throughout.

## Why TanStack Query?
Simplifies async state: caching, deduplication, loading/error states, and stale-while-revalidate behaviour are handled out of the box, keeping component code clean.

## Why Context API + useReducer Instead of Redux?
The app has two pieces of global client state: cart and wishlist. Both follow the same reducer pattern. Redux would add ceremony without benefit at this scale; the pattern is still predictable and easy to trace.

## Why Client-Side Price Filtering?
DummyJSON doesn't support server-side price range queries. Rather than re-fetching on every slider move, the price range is applied as a `useMemo` transform on the already-cached response. This gives instant feedback with zero extra network cost.

## Why Tailwind + shadcn/ui?
Tailwind enables consistent, responsive styling with no runtime overhead. shadcn/ui provides accessible Radix UI primitives that match the design system without locking into a component library's opinionated styles.

---

# Architecture & Folder Structure

```bash
src/
 ├── api/            # Axios instance + interceptors
 ├── components/
 │   ├── cart/       # CartItem, CartSummary
 │   ├── navbar/     # Sticky header with cart + wishlist badges
 │   ├── products/   # ProductCard (memoized), ProductGrid, ProductFiltersBar, RangeSlider
 │   └── ui/         # shadcn/ui primitives + RangeSlider
 ├── context/
 │   ├── cart/       # CartContext, cartReducer, CartAction types
 │   └── wishlist/   # WishlistContext, wishlistReducer, WishlistAction types
 ├── hooks/          # use-cart, use-wishlist, use-products (with client-side price filter), use-debounce
 ├── layouts/        # MainLayout (navbar + outlet + footer)
 ├── pages/          # HomePage, ProductDetailsPage, CartPage, CheckoutPage,
 │                   # OrderConfirmationPage, WishlistPage
 ├── providers/      # CartProvider, WishlistProvider, QueryProvider
 ├── routes/         # Code-split route definitions
 ├── services/       # product.service.ts (API calls)
 ├── types/          # Product, Cart, Wishlist, Order type definitions
 └── utils/          # formatPrice, formatRating, formatDiscount
```

---

# Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| State (client) | Context API + useReducer |
| State (server) | TanStack Query v5 |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM v7 |
| Notifications | Sonner |
| API | DummyJSON Products API |

---

# What I Would Add With More Time

- **Authentication & user accounts** — login/signup, profile, persisted order history
- **Real payment gateway** — Stripe integration with proper error handling
- **Unit + integration tests** — Jest + React Testing Library for hooks and reducers; Playwright for E2E checkout flow
- **Infinite scroll** — `useInfiniteQuery` replacing the current full-fetch approach
- **Product reviews** — user-submitted star ratings with optimistic updates
- **CI/CD** — GitHub Actions for lint, typecheck, and build on every PR
