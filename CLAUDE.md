# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, which get fixed incrementally. Expect to refactor and clean up rather than preserve existing patterns.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Serve the production build
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test runner configured.

## Architecture

- React 19 + Vite 7, plain JavaScript (JSX), no TypeScript, no router, no state library, no backend or persistence.
- `src/main.jsx` mounts `<App />` in `StrictMode`.
- The entire app lives in one component, `src/App.jsx`: seed transaction data, form state, filter state, derived totals (income / expenses / balance), the add-transaction form, and the filtered transactions table. Styles are in `src/App.css` (component) and `src/index.css` (global).
- Transactions are `{ id, description, amount, type: "income" | "expense", category, date }`. Categories are a hardcoded array in `App.jsx`, shared by the form and the category filter.

## Known gotchas

- `amount` is stored as a **string** (both in seed data and from the number input), but totals are computed with `reduce((sum, t) => sum + t.amount, 0)`, so they concatenate strings instead of summing numbers.
- Some seed data is inconsistent (e.g. "Freelance Work" has `type: "expense"` with category `salary`).
- ESLint `no-unused-vars` ignores identifiers matching `^[A-Z_]`.
