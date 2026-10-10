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

There is no test runner configured. Vite 7 requires Node 20.19+ or 22.12+.

## Architecture

- React 19 + Vite 7, plain JavaScript (JSX), no TypeScript, no router, no state library, no backend or persistence.
- `src/main.jsx` mounts `<App />` in `StrictMode`. Components live flat in `src/` as `PascalCase.jsx` files, one default-exported function component each.
- `App.jsx` owns the only shared state: the `transactions` array (seeded in-place) plus a module-level `categories` constant. Each child gets just what it needs via props:
  - `Summary` — receives `transactions` and derives total income, expenses, and balance itself.
  - `TransactionForm` — owns its own input state; builds the new transaction and passes it up through `onAdd`, which `App` appends to `transactions`.
  - `TransactionList` — owns the type/category filter state locally and renders the filtered table. Each row's Delete button asks for confirmation (`window.confirm`) and then calls `onDelete(id)`; `App` removes the transaction by `id`.
- Derived values (totals, filtered lists) are computed during render, not stored in state.
- Transactions are `{ id, description, amount, type: "income" | "expense", category, date }`. `amount` must be a **number**; `TransactionForm` converts the input with `Number()` before calling `onAdd`.
- Styles are in `src/App.css` (shared by all components via class names) and `src/index.css` (global).

## Known gotchas

- Some seed data is inconsistent (e.g. "Freelance Work" has `type: "expense"` with category `salary`).
- ESLint `no-unused-vars` ignores identifiers matching `^[A-Z_]`.
