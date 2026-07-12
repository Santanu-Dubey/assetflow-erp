# AssetFlow ERP

AssetFlow is an enterprise asset and resource management system. This repository is scaffolded for every non-authentication feature in the master prompt: dashboard, organization setup, assets, allocation, booking, maintenance, audits, notifications, reports, settings, activity logs, and profile preferences.

## Phase 1 Scope

- React, TypeScript, Vite, TailwindCSS frontend foundation
- Express, TypeScript backend foundation
- Feature-isolated module folders for Features 2-13
- Mocked authenticated user boundary
- Role middleware ready for real authentication later
- Shared UI primitives, app layout, routing, theme switching, command palette, and API client
- Lazy-loaded routes for performance-ready module expansion
- Backend route registration for every feature module under `/api/v1`

## Local Development

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to the backend on `http://localhost:4000`.

## Next Phase

Phase 2 should add the Prisma PostgreSQL schema, migrations, and seed data for departments, employees, categories, assets, allocation, transfer requests, bookings, maintenance, audit cycles, notifications, reports, settings, activity logs, and profile preferences.
