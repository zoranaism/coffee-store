# ☕ Coffee Store

A small coffee store frontend application built with Angular 21 and Tailwind CSS.

The application allows customers to browse drinks, select toppings, manage their cart, apply promotions and place an order.

It also includes an admin area for creating, editing and deleting drinks and toppings.

The provided backend API was unavailable, so the REST API is simulated locally using an Angular HTTP interceptor.

The implementation focuses not only on the required functionality, but also on **clear UX, accessibility, reusable components, responsive layouts, error handling and maintainable Angular structure**.

---

## Table of Contents

* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Available Commands](#available-commands)
* [Application Features](#application-features)
* [UX and Accessibility](#ux-and-accessibility)
* [Promotions](#promotions)
* [API](#api)
* [Mock Backend](#mock-backend)
* [Project Structure](#project-structure)
* [Architecture](#architecture)
* [State Management](#state-management)
* [Forms and Validation](#forms-and-validation)
* [Error Handling](#error-handling)
* [Admin Area](#admin-area)
* [Testing](#testing)
* [Assumptions](#assumptions)
* [Limitations](#limitations)
* [AI Usage](#ai-usage)
* [What I Would Improve Next](#what-i-would-improve-next)
* [Possible Improvements](#possible-improvements)

---

## Overview

The Coffee Store application has two main areas:

### Customer

Customers can:

* Browse available drinks.
* Select a drink.
* Select one or more toppings.
* Add the configured drink to the cart.
* Increase or decrease item quantities.
* Remove items from the cart.
* See the cart subtotal.
* See applicable promotions.
* See the discount and final total.
* Place an order.
* Receive an order confirmation with an order ID.
* Continue shopping after completing an order.

### Admin

Administrators can:

* Access an admin dashboard.
* View drinks.
* Create drinks.
* Edit drinks.
* Delete drinks.
* View toppings.
* Create toppings.
* Edit toppings.
* Delete toppings.

The admin dashboard provides clear navigation to the drink and topping management areas.

Authentication is intentionally not implemented because it was excluded from the assignment.

---

# Tech Stack

* Angular 21
* TypeScript
* RxJS
* Angular Router
* Angular HttpClient
* Angular Reactive Forms
* Angular Signals
* Tailwind CSS
* Jasmine
* Karma
* VS Code

---

# Getting Started

## Requirements

The project was developed with:

* Node.js 22
* npm 11
* Angular CLI 21

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

---

# Available Commands

## Start development server

```bash
ng serve
```

## Run tests

```bash
npm test -- --watch=false
```

## Build the application

```bash
ng build
```

---

# Application Features

## Customer Shopping Flow

The customer flow is intentionally kept simple:

1. Select a drink.
2. Optionally select toppings.
3. Add the configured item to the cart.
4. Review and modify the cart.
5. Continue to checkout.
6. Place the order.
7. Receive an order confirmation.

The selected drink and toppings are reset after selecting another drink to avoid accidentally carrying configuration between products.

### Cart

The cart supports:

* Quantity changes.
* Removing items.
* Itemized toppings.
* Subtotal calculation.
* Promotion information.
* Discount display.
* Final total.
* Empty-cart states.
* Error recovery.

The cart count is also displayed in the main navigation and is kept in sync through a shared `CartState` service.

### Checkout

The checkout flow provides:

* Order summary.
* Promotion and discount information.
* Final total.
* Order submission.
* Processing state.
* Disabled submission while an order is being placed.
* Error handling without clearing the cart.
* Order confirmation with order ID and total.
* Clear next-step action to continue shopping.

---

# UX and Accessibility

UX and accessibility were treated as part of the implementation rather than as a final layer added afterwards.

### Feedback and system states

The application provides clear feedback for:

* Loading states.
* Empty states.
* Successful actions.
* Failed API requests.
* Order processing.
* Order confirmation.
* Delete confirmation.

This avoids leaving the user uncertain about whether an action succeeded.

### Accessibility

The UI includes:

* Semantic HTML where appropriate.
* Form labels connected to their inputs.
* Fieldsets and legends for related radio-button choices.
* Keyboard-focus styles.
* Visible focus rings.
* Accessible button labels for icon-like controls.
* `aria-label` attributes where the visible text alone does not provide sufficient context.
* `aria-invalid` for invalid form fields.
* `aria-describedby` connecting validation messages to their inputs.
* `role="alert"` for important errors.
* `role="status"` and `aria-live` for dynamic success and processing messages.
* `aria-busy` while an order is being submitted.
* Decorative icons marked with `aria-hidden`.

### Forms

Validation feedback is shown close to the relevant field and includes:

* Required-field validation.
* Minimum name length.
* Positive price validation.
* Visual indication of invalid fields.
* Accessible error descriptions.

### Responsive UI

The layouts use Tailwind responsive utilities so that:

* Navigation remains usable on smaller screens.
* Product and admin cards adapt to available space.
* Form actions stack on smaller screens.
* Content maintains readable widths on larger screens.

### Destructive actions

Deleting a drink or topping requires an explicit confirmation before the API request is made.

After successful deletion, the user receives temporary confirmation feedback.

---

# Reusable UI Components

A small reusable button component was introduced:

```text
src/app/shared/button/
```

The `Button` component supports:

* Primary actions.
* Secondary actions.
* Destructive actions.
* Button types.
* Consistent focus styles.
* Consistent interaction styling.

This keeps common interaction patterns consistent without introducing a large component library for a relatively small application.

---

# Promotions

The application supports the promotion rules defined by the assignment.

### Promotion 1 — Subtotal discount

If the cart subtotal is at least €12:

```text
25% discount
```

### Promotion 2 — Three or more drinks

If the cart contains three or more drinks:

```text
The cheapest drink, including its toppings, is free.
```

### Combining promotions

When both promotions apply, the implementation uses the promotion resulting in the lower final total.

The selected promotion, discount and resulting total are displayed in the cart and checkout summary.

---

# API

The application communicates with the backend through Angular's `HttpClient`.

The service responsible for API communication is:

```text
src/app/services/coffee-store.ts
```

The service provides methods for:

### Drinks

```text
GET    /api/drinks
POST   /api/drinks
PUT    /api/drinks/:id
DELETE /api/drinks/:id
```

### Toppings

```text
GET    /api/toppings
POST   /api/toppings
PUT    /api/toppings/:id
DELETE /api/toppings/:id
```

### Cart

```text
GET    /api/cart/demo-cart
POST   /api/cart/demo-cart/items
PUT    /api/cart/demo-cart/items/:itemId
DELETE /api/cart/demo-cart/items/:itemId
```

### Orders

```text
POST /api/orders
```

The API layer is kept separate from page components so that replacing the mock backend with a real backend requires minimal changes to the UI.

---

# Mock Backend

Because the provided backend was unavailable, an Angular HTTP interceptor simulates the REST API:

```text
src/app/interceptors/mock-api.ts
```

The interceptor handles the relevant API requests locally and returns mock data.

Initial drinks:

| Drink        | Price |
| ------------ | ----: |
| Black Coffee |    €4 |
| Latte        |    €5 |
| Mocha        |    €6 |
| Tea          |    €3 |

Initial toppings:

| Topping         | Price |
| --------------- | ----: |
| Milk coffee     |    €2 |
| Hazelnut syrup  |    €3 |
| Chocolate sauce |    €5 |
| Lemon           |    €2 |

The UI still communicates through `HttpClient`, so the frontend remains structured around the same API contract that would be used with a real backend.

---

# Project Structure

```text
src/app/
│
├── models/
│   ├── cart.model.ts
│   ├── drink.model.ts
│   ├── order.model.ts
│   └── topping.model.ts
│
├── pages/
│   ├── shop/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   ├── admin-drinks/
│   ├── admin-drink-form/
│   ├── admin-toppings/
│   └── admin-topping-form/
│
├── services/
│   ├── coffee-store.ts
│   └── cart-state.ts
│
├── shared/
│   └── button/
│       ├── button.ts
│       ├── button.html
│       └── button.css
│
├── interceptors/
│   └── mock-api.ts
│
├── app.config.ts
├── app.routes.ts
├── app.html
└── app.ts
```

The structure separates:

* Domain models.
* Page-level components.
* Shared UI components.
* API communication.
* Application state.
* Mock backend behaviour.

---

# Architecture

The application follows a relatively lightweight Angular architecture.

### Components

Page components are responsible primarily for:

* Presenting UI.
* Handling user interaction.
* Coordinating services.
* Managing page-specific UI state.

### Services

`CoffeeStore` is responsible for HTTP communication.

`CartState` provides shared cart state between the shop, cart, checkout and application navigation.

### Models

TypeScript interfaces describe the main domain entities:

* `Drink`
* `Topping`
* `Cart`
* `CartItem`
* `Order`

### Routing

Angular Router is used for the main application flows:

```text
/shop
/cart
/checkout

/admin
/admin/drinks
/admin/drinks/new
/admin/drinks/:id/edit
/admin/toppings
/admin/toppings/new
/admin/toppings/:id/edit
```

The admin area has a dedicated dashboard rather than making the global navigation the only entry point to admin functionality.

---

# State Management

The application uses Angular Signals for the shared cart state.

`CartState` stores the current cart and exposes:

```ts
cart
itemCount
```

The item count is derived using a computed signal:

```ts
readonly itemCount = computed(() =>
  this.cart()?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  ) ?? 0
);
```

This allows the application navigation to react automatically when the cart changes.

For this application size, a dedicated state-management library such as NgRx was not necessary. Keeping the state local and focused reduces complexity while still providing a clear shared state boundary.

---

# Forms and Validation

The admin create/edit forms use Angular Reactive Forms.

Drink forms validate:

* Required name.
* Minimum name length.
* Required price.
* Positive price.

Validation is reflected both visually and through accessible form attributes.

For example:

```text
aria-invalid
aria-describedby
```

are used to connect invalid controls with their validation messages.

The same form component supports both create and edit modes, depending on the current route.

---

# Error Handling

API operations include explicit error handling.

Examples include:

### Loading errors

If drinks or toppings cannot be loaded, the user receives an error message with an opportunity to retry.

### Cart errors

If a quantity update or item removal fails, the cart remains available and the user receives an error message with a retry action.

### Add-to-cart errors

A failed add-to-cart request displays an inline error without losing the current product selection.

### Checkout errors

If order creation fails:

* The cart is not cleared.
* The user is informed that the order was not placed.
* The user can retry the order.

### Delete errors

Failed admin delete operations display an error while keeping the item available.

This follows an important principle for transactional flows: **do not destroy local user state when a server operation fails.**

---

# Admin Area

The admin area is divided into three levels:

### Admin dashboard

```text
/admin
```

Provides navigation to:

* Manage Drinks
* Manage Toppings

### Drink management

```text
/admin/drinks
```

Supports:

* Listing drinks.
* Adding drinks.
* Editing drinks.
* Deleting drinks.
* Empty-state handling.
* Loading feedback.
* Error feedback.
* Delete confirmation.

### Topping management

```text
/admin/toppings
```

Supports the same CRUD workflow for toppings.

### Create/edit forms

The same form component handles both creating and editing an entity where appropriate.

This avoids maintaining separate implementations for nearly identical workflows.

---

# Testing

The application includes Angular component tests.

Tests can be run with:

```bash
npm test -- --watch=false
```

The current test suite covers the application's component creation and configured Angular testing environment.

The final implementation passes the complete test suite.

The project was also verified with a production build:

```bash
ng build
```

---

# Assumptions

* The backend API follows the endpoint structure described in the assignment.
* The backend is responsible for the authoritative cart and promotion calculations.
* The frontend displays the promotion and totals returned by the API.
* A demo cart ID is used because authentication and user-specific carts are outside the scope of the assignment.
* Authentication and authorization are intentionally excluded.
* The mock interceptor approximates the backend contract because the real backend was unavailable.

---

# Limitations

This is an assignment-sized application rather than a production-ready coffee store.

Known limitations include:

* No authentication or authorization.
* No persistent user accounts.
* No real backend.
* No payment integration.
* No server-side persistence.
* Mock data is held locally.
* Limited automated test coverage.
* No internationalisation.
* No analytics implementation.
* No image/content management for products.
* No inventory management.

The architecture leaves room for these capabilities to be introduced later without requiring a complete rewrite of the UI.

---

# AI Usage

AI tools were used as a development aid during implementation.

They were used primarily for:

* Exploring Angular APIs and patterns.
* Troubleshooting Angular configuration and testing issues.
* Reviewing accessibility considerations.
* Checking implementation approaches.
* Iterating on UX details and error states.

The application structure, UX decisions and implementation were reviewed and adapted manually to fit the assignment requirements and the intended user experience.

---

# What I Would Improve Next

The implementation was completed within the timeboxed scope of the assignment. Given more time, I would take the next step from a functional assignment implementation towards a more production-ready frontend.

### 1. Create a proper page layout and design system

I would first establish a more deliberate application-wide layout rather than styling each page independently.

This would include:

* A reusable application shell.
* Consistent page containers and spacing.
* Standardised page headers.
* Consistent section layouts.
* A defined typography scale.
* A small set of design tokens.
* Consistent responsive breakpoints.
* Standardised button, input, card and feedback patterns.

This would make the experience feel more cohesive and would make future pages faster to build.

### 2. Expand the reusable component system

The current reusable button component is a starting point.

With more time, I would identify repeated UI patterns and turn them into reusable components, for example:

* `PageHeader`
* `Card`
* `Button`
* `Input`
* `FormField`
* `Alert`
* `LoadingState`
* `EmptyState`
* `ConfirmDialog`
* `Price`
* `ProductCard`
* `QuantityControl`
* `OrderSummary`
* `Toast`
* `Modal`

I would then use these components consistently throughout the application rather than having each page implement its own version of the same pattern.

This would improve consistency, accessibility and maintainability while reducing duplicated markup and styling.

### 3. Establish consistent UX patterns

I would review the complete application as one experience and standardise how similar situations behave.

For example:

* All loading states should follow the same visual pattern.
* All errors should use the same feedback component.
* All destructive actions should use the same confirmation pattern.
* All forms should provide consistent validation feedback.
* All buttons should have consistent sizing and interaction states.
* Success messages should behave consistently across the application.
* Empty states should provide an appropriate next action.

The goal would be to make the interface predictable rather than simply making each individual page work well.

### 4. Cross-browser testing

I would explicitly test the application across the main supported browser environments, including:

* Chrome.
* Firefox.
* Safari.
* Edge.

I would pay particular attention to:

* Form controls.
* Focus behaviour.
* Keyboard navigation.
* Responsive layouts.
* CSS rendering differences.
* Native number inputs.
* Router navigation.
* Accessibility behaviour.

I would also define the browser support target explicitly rather than relying only on the development browser.

### 5. Performance review

I would run a more deliberate performance pass using browser tooling and Lighthouse.

I would look at:

* Initial bundle size.
* Lazy loading and route-level code splitting.
* Change detection behaviour.
* Unnecessary API requests.
* Image optimisation once product imagery exists.
* Rendering large product lists.
* Caching opportunities.
* Network waterfalls.
* Core Web Vitals.

For a larger application, I would also consider lazy-loading the admin area because it is not required for the customer shopping experience.

### 6. Expand automated testing

I would move beyond basic component creation tests and add tests around the application's actual behaviour.

Especially:

* Promotion calculations.
* Cart quantity changes.
* Cart removal.
* Add-to-cart behaviour.
* API error states.
* Checkout success and failure.
* Form validation.
* Admin CRUD flows.
* Shared components.
* Accessibility-critical interactions.

I would also add end-to-end tests for the most important customer journey:

```text
Browse → Configure → Cart → Checkout → Confirmation
```

### 7. Accessibility testing

The current implementation includes accessibility considerations, but I would perform a dedicated accessibility audit.

This would include:

* Keyboard-only navigation.
* Screen-reader testing.
* Automated axe/Lighthouse checks.
* Colour contrast verification.
* Focus management after navigation and dialogs.
* Focus trapping for modal interactions.
* Error announcement testing.
* Reduced-motion considerations.

Accessibility would become part of the development and CI workflow rather than a one-time review.

### 8. Improve responsive behaviour

I would test the actual flows at a wider range of viewport sizes rather than relying primarily on responsive utility classes.

I would specifically review:

* Mobile navigation.
* Product selection.
* Cart quantity controls.
* Checkout summary.
* Admin tables/cards.
* Form layouts.
* Long product names and error messages.

The goal would be to ensure that responsive behaviour is intentionally designed rather than simply technically responsive.

### 9. Improve architecture as the application grows

For the current assignment, the lightweight architecture is sufficient.

If the application grew, I would consider introducing stronger boundaries between:

* Feature areas.
* Shared UI.
* Domain logic.
* API/data access.
* State management.

I would also consider route-level lazy loading and a more formal feature-based folder structure.

I would only introduce something such as NgRx if the application's state complexity actually justified it.

### 10. Introduce a component development environment

If the shared component system grew, I would introduce Storybook.

This would make it easier to:

* Develop components in isolation.
* Document component states.
* Test edge cases visually.
* Review accessibility states.
* Keep a consistent design system.
* Give designers and developers a shared reference.

For the current assignment, I kept the component system intentionally small rather than adding infrastructure that would not provide enough value yet.

### 11. Add quality checks to CI

For a production project, I would add a CI pipeline that automatically runs:

```text
Lint
↓
Unit tests
↓
Production build
↓
Accessibility checks
↓
End-to-end tests
```

This would help prevent regressions as the application and component library grow.

### 12. Monitor real-world performance and behaviour

Once connected to a real backend and deployed, I would also want visibility into real user behaviour.

Depending on the product requirements, this could include:

* Error monitoring.
* Performance monitoring.
* API failure rates.
* Core Web Vitals.
* Analytics around the checkout funnel.
* User drop-off points.

The goal would be to use actual product data to guide future UX and performance improvements rather than relying only on assumptions.

---

# Possible Improvements

If this were developed further, possible next steps would include:

### Backend

* Connect to the real REST API.
* Add authentication and authorization.
* Persist cart and order data.
* Add proper API error codes and validation.
* Add server-side promotion calculation.

### Frontend

* Add product images.
* Add more detailed product configuration.
* Add order history.
* Add responsive mobile navigation.
* Add toast/notification infrastructure for application-wide feedback.
* Add a more comprehensive shared design system.

### Accessibility

* Perform a full WCAG audit.
* Add automated accessibility testing.
* Test with screen readers and keyboard-only navigation.
* Review colour contrast against the final visual design.

### Testing

* Increase component test coverage.
* Add service tests for API behaviour.
* Add tests for promotion scenarios.
* Add tests for form validation.
* Add end-to-end tests for the complete shopping and checkout flows.

### Development workflow

* Add linting and formatting checks to CI.
* Add a CI pipeline for build and test verification.
* Add automated accessibility checks.
* Introduce Storybook if the shared component set grows enough to justify it.

---

# Final Implementation Notes

The implementation intentionally prioritises **clarity over unnecessary complexity**.

For a small Angular application, the focus was on:

Clear component boundaries.
A dedicated API service.
Lightweight shared state using Signals.
Reusable UI primitives.
Accessible forms and interactions.
Clear loading, empty, success and error states.
Responsive layouts.
Safe destructive actions.
Predictable navigation.
Maintainable routing.
Keeping the frontend independent from the mock backend implementation.
Using Signals consistently for component state, particularly with zoneless change detection.
Treating the backend as the source of truth by loading the cart from the API.
Keeping the cart synchronised with the backend after a successful order.
Protecting important business logic, such as calculateCartTotals, with focused automated tests.

The result is intended to demonstrate not only that the required functionality works, but also how the application could be developed and maintained as a real frontend product.
