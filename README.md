# Modern E-Commerce Platform

A production-ready e-commerce frontend application built using React, TypeScript, and modern frontend engineering practices.

The application allows users to browse products, view detailed product information, manage cart items, and complete a mock checkout flow with a responsive and polished user experience.

---

# What I Built

The project includes:

- Product listing page
- Product search, filtering, and sorting
- Product details page
- Shopping cart functionality
- Checkout flow
- Responsive design
- Loading and error states
- Cart persistence using localStorage

The focus was on building a scalable frontend architecture while maintaining clean UI/UX and production-oriented engineering practices.

---

---
# What I Would Improve With More Time

Given more time, I would further improve the application in the following areas:

## Product Experience
- Wishlist functionality
- Advanced product filtering and sorting
- Product reviews and ratings
- Product image zoom/gallery improvements
- Infinite scrolling for product listings

## User Experience
- Dark mode support
- Improved accessibility (ARIA attributes, keyboard navigation, screen reader support)
- Enhanced mobile user experience and interactions
- Optimistic UI updates for smoother interactions

## Production Features
- Authentication and user accounts
- Persistent wishlist functionality
- Order history and tracking
- Payment gateway integration
- Backend integration
- Inventory and stock management
- Coupon and discount system

## Developer Experience
- Stricter ESLint and Prettier configurations
- Environment-based configuration management
- Unit and integration testing
- CI/CD pipeline setup
# Tech Stack

## Frontend
- React + Vite
- TypeScript
- Tailwind CSS

## State Management
- React Context API + useReducer

## Server State & Data Fetching
- TanStack Query
- Axios

## UI & Forms
- shadcn/ui
- React Hook Form
- Zod
- Sonner

## Routing
- React Router DOM

## API
- DummyJSON Products API

---

# Key Engineering Decisions

## Why React + Vite?
I chose Vite because it provides a fast and lightweight development experience with minimal configuration and optimized builds.

## Why TypeScript?
TypeScript improves maintainability and developer experience through static typing and better tooling support.

## Why TanStack Query?
TanStack Query was used for server state management because it simplifies:
- data fetching
- caching
- loading/error handling
- async state management

This helped keep API logic clean and scalable.

## Why Context API Instead of Redux?
The application only required lightweight global state management for cart functionality and minimal UI state.

Using Context API with useReducer helped keep the solution simpler while avoiding unnecessary Redux boilerplate.

## Why Tailwind CSS?
Tailwind enabled rapid UI development while maintaining consistent spacing, responsiveness, and reusable styling patterns.

## Why shadcn/ui?
shadcn/ui provided accessible and customizable UI primitives that helped speed up development while maintaining a modern and clean design system.

---

# Architecture & Folder Structure

```bash
src/
 ├── components/
 ├── context/
 ├── hooks/
 ├── layouts/
 ├── pages/
 ├── providers/
 ├── routes/
 ├── services/
 ├── types/
 ├── utils/