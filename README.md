# Expense Tracker

Expense Tracker is a personal-finance dashboard built to help users understand their income, expenses, savings behavior, and financial goals in one place. The project began as a React learning exercise, and this modernization pass focuses on turning it into a more credible, portfolio-ready product.

## Features

- Income, expense, and savings transaction tracking
- User-scoped Firebase persistence with authenticated data access
- Protected application routes for authenticated users
- Financial summary model with consistent balance logic
- Budget and goal calculations derived from real transactions
- Transaction filtering and validation utilities
- Responsive dashboard layout and route-based app shell
- Testing around the core financial engine and validation logic

## Screenshots

Add screenshots here as the UI is expanded and finalized for portfolio use.

## Tech Stack

- React 18
- Vite
- Firebase Auth, Firestore, Storage
- React Router
- Tailwind CSS
- Framer Motion
- Vitest
- Recharts / Chart.js

## Architecture

This project uses a layered approach:

- public site pages for landing, tools, and informational content
- auth-aware routing using a reusable guard pattern
- a central financial model utility for derived calculations
- Firebase-backed persistence scoped to the authenticated UID
- UI pages and components built around a single coherent app shell

## Authentication

Authentication is handled through Firebase Auth. Protected routes redirect unauthenticated users to the login flow, while signed-in users are redirected away from auth pages automatically.

## Data Model

The business logic expects a consistent transaction structure:

- id
- type
- amount
- category
- date
- note
- createdAt
- updatedAt

Financial summaries are derived from transactions rather than duplicated into multiple state values. This keeps the balance, savings rate, and budget math consistent throughout the product.

## Testing

The project includes a real Vitest setup focused on the core financial engine. Tests cover:

- summary calculations
- savings normalization
- budget thresholds
- goal progress

## Security

- Data is scoped by UID
- Firebase access is tied to the authenticated user context
- Secrets are kept in environment variables and should never be committed to source control
- Client-facing error messages avoid exposing raw Firebase internals

## Getting Started

1. Clone the repository.
2. Install dependencies:
   npm install
3. Create a .env file with your Firebase configuration values.
4. Start the app:
   npm run dev

## Environment Variables

Example:

VITE_F_API_KEY=your-api-key
VITE_F_AUTHDOMAIN=your-project.firebaseapp.com
VITE_F_PROJECTID=your-project-id
VITE_F_STORAGEBUCKET=your-project.appspot.com
VITE_F_MESSAGINGSENDERID=your-sender-id
VITE_F_APPID=your-app-id
VITE_F_MEASUREMENTID=your-measurement-id
VITE_F_DATABASEURL=https://your-project-default-rtdb.firebaseio.com
VITE_RECAPTCHA_SITE_KEY=optional-site-key

## Development

Use the Vite development server for local iteration, and keep the business logic in reusable utilities rather than embedding it in component code.

## Running Tests

npm test

## Build

npm run build

## Deployment

The project is configured for Vite-based deployment and can be deployed to static hosting services or Firebase Hosting with the appropriate config.

## Project Structure

src/
  App.jsx
  backend/
  Components/
  Pages/
  utils/
  test/

## Future Improvements

- complete the full dashboard, transactions, analytics, and budgeting flows
- add user-created categories and budget management
- finish a full transaction CRUD experience with validation and empty states
- expand the analytics engine with date-range comparisons and deterministic insight generation
- add end-to-end user workflow tests for login, add/edit/delete transaction, and budgeting behavior

## Engineering Notes

The main modernization decision was to establish a mathematically consistent financial model before expanding the UI. The project preserves the original purpose and visual identity, but replaces the earlier prototype patterns with a clearer route architecture, user-scoped data handling, and a test-first foundation for product logic.
