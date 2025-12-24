# Finka Frontend
Web client for the Finka https://finka.cloud/ - personal financial planning platform. Built with Vue 3 + Vite, Pinia, Tailwind/PrimeVue, and talks to the `finka-rest` API.

## Features
- Auth with JWT, Google sign-in, password reset flows.
- Collaborative projects: budgets, expenses, transfers, analytics.
- Avatar uploads and currency-formatting helpers.
- Charts via ApexCharts and rich UI via PrimeVue theme.

## Quick start (Docker preview)
Docker & Docker Compose required.
```
docker-compose -f docker-compose.preview.yaml up --build -d
```
App runs on http://localhost:5173.

## Run locally
1) Prereqs: Node 20+.  
2) Install deps: `npm install`  
3) Copy `.env` (or `.env.production`) and set API endpoints.  
4) Dev server: `npm run dev` (Vite on port 5173).  
5) Production build: `npm run build`; preview build: `npm run preview`.

## Environment
Frontend expects these variables (see `.env*`):
- `VITE_API_URL` — base REST URL, e.g., `http://localhost:3000/api/v1`
- `VITE_URL` — base asset URL for user uploads, e.g., `http://localhost:3000/`

## Project structure
- `src/services` — API clients (auth/projects/balance/analytics/upload).
- `src/stores` — Pinia stores.
- `src/views` — routed pages; `src/components` shared UI; `src/theme/Finka` for PrimeVue theme.
