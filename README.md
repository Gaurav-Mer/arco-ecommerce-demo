# Modern E-Commerce Platform

A production-ready e-commerce frontend application built as part of a frontend engineering assignment using React, TypeScript, and modern frontend development practices.

The application allows users to browse products, search and filter products, manage cart and wishlist items, complete a checkout flow, and view an order confirmation page — all within a responsive and polished user experience.

The primary focus of this project was to build a scalable, maintainable, and user-friendly frontend application while demonstrating clean architecture, reusable components, responsive design, and modern state management practices.

---

# Features / What I Built

- Product listing page with responsive product grid
- Product search with debounced API calls
- Product filtering by category and price range
- Product sorting functionality
- Product details page with related products
- Shopping cart with quantity management
- Wishlist functionality with persistence
- Complete checkout flow with form validation
- Order confirmation page
- Responsive mobile-first UI
- Loading, empty, and error states
- Lazy loaded routes using `React.lazy` and `Suspense`

---

# Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Client State | Context API + useReducer |
| Server State | TanStack Query v5 |
| HTTP Client | Axios |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM |
| Notifications | Sonner |
| API | DummyJSON Products API |

---

# Key Engineering Decisions

## Why React + Vite?
Vite provides a fast development experience, fast HMR, and optimized production builds with minimal configuration.

## Why TypeScript?
TypeScript improves maintainability and catches integration errors early, especially across hooks, reducers, and shared components.

## Why TanStack Query?
TanStack Query was used to manage async server state including caching, loading states, stale data handling, and request deduplication.

## Why Context API + useReducer?
The application only required lightweight global state management for cart and wishlist functionality. Context + reducer provided predictable state updates without introducing unnecessary Redux boilerplate.

## Why Client-Side Price Filtering?
The API used for this assignment does not support server-side price range filtering. The price filtering is therefore applied on cached product data using memoization to avoid unnecessary network requests.

## Why Tailwind CSS + shadcn/ui?
Tailwind enabled fast and consistent UI development while shadcn/ui provided accessible and reusable UI primitives.

---

# Performance Optimizations

- Debounced search input to reduce unnecessary API calls
- Memoized product cards to avoid unnecessary re-renders
- Cached API responses using TanStack Query
- Lazy loaded routes using React Suspense
- Lazy loaded product images using `loading="lazy"`

---

# What I Would Improve With More Time

- Authentication and user accounts
- Real payment gateway integration (Stripe)
- Order history and user profile management
- Infinite scrolling with `useInfiniteQuery`
- Product reviews and ratings
- Better accessibility and keyboard navigation
- Unit and integration tests
- Skeleton loading states
- Dark mode support
- Backend integration with real inventory management

---

# Notes

This project was intentionally built with a scalable frontend architecture and production-oriented engineering practices in mind while keeping the implementation lightweight and maintainable for the scope of the assignment.

# Architecture & Folder Structure

```bash
src/
 ├── api/            # Axios instance + interceptors
 ├── components/     # Reusable UI and feature components
 ├── context/        # Cart and wishlist state management
 ├── hooks/          # Custom hooks
 ├── layouts/        # Shared layouts
 ├── pages/          # Application pages
 ├── providers/      # App providers
 ├── routes/         # Route configuration
 ├── services/       # API service layer
 ├── types/          # Shared TypeScript types
 └── utils/          # Utility/helper functions
 