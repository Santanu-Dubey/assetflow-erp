# AssetFlow ERP

AssetFlow is an enterprise asset and resource management system. This repository is scaffolded for Features 2-6: dashboard, organization setup, asset registration, allocation and transfer, and resource booking.

## Phase 1 Scope

- React, TypeScript, Vite, TailwindCSS frontend foundation
- Express, TypeScript backend foundation
- Feature-isolated module folders
- Mocked authenticated user boundary
- Role middleware ready for real authentication later
- Shared UI primitives, app layout, routing, theme, and API client

## Local Development

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to the backend on `http://localhost:4000`.

## Next Phase

Phase 2 should add the Prisma PostgreSQL schema, migrations, and seed data for departments, employees, categories, assets, allocation, transfer requests, bookings, maintenance, notifications, and audit logs.
