# ☕ Coffee Store

A small coffee store frontend application built with Angular 21 and Tailwind CSS.

The application allows customers to browse drinks, select toppings, manage their cart, apply promotions and place an order.

It also includes an admin area for creating, editing and deleting drinks and toppings.

The provided backend API was unavailable, so the REST API is simulated locally using an Angular HTTP interceptor.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Application Features](#application-features)
- [Promotions](#promotions)
- [API](#api)
- [Mock Backend](#mock-backend)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Forms and Validation](#forms-and-validation)
- [Error Handling](#error-handling)
- [Admin Area](#admin-area)
- [Testing](#testing)
- [Assumptions](#assumptions)
- [Limitations](#limitations)
- [AI Usage](#ai-usage)
- [Possible Improvements](#possible-improvements)

---

## Overview

The Coffee Store application has two main areas:

### Customer

Customers can:

- Browse available drinks.
- Select a drink.
- Select one or more toppings.
- Add the configured drink to the cart.
- Increase or decrease item quantities.
- Remove items from the cart.
- See the cart subtotal.
- See applicable promotions.
- See the discount and final total.
- Place an order.
- Receive an order confirmation with an order ID.

### Admin

Administrators can:

- View drinks.
- Create drinks.
- Edit drinks.
- Delete drinks.
- View toppings.
- Create toppings.
- Edit toppings.
- Delete toppings.

Authentication is intentionally not implemented because it was excluded from the assignment.

---

# Tech Stack

- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
- Angular Reactive Forms
- Angular Signals
- Tailwind CSS
- Jasmine
- Karma
- VS Code

---

# Getting Started

## Requirements

The project was developed with:

- Node.js 22
- npm 11
- Angular CLI 21

## Install dependencies

```bash
npm install