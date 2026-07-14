# Ocean Goals

A goal/dream-tracking web app ("Sea Goal Weaver") with an ocean theme — users add goals and track progress toward achieving them.

## Run & Operate

- Workflows (already configured, start automatically):
  - `artifacts/ocean-goals: web` — frontend (React + Vite), served at `/`
  - `artifacts/api-server: API Server` — backend (Express), served at `/api`
  - `artifacts/mockup-sandbox: Component Preview Server` — canvas design sandbox, served at `/__mockup`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (already provisioned)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- Frontend: React + Vite, Tailwind, shadcn/ui, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema currently empty — no tables defined yet)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Frontend app: `artifacts/ocean-goals/src` (currently a single Home page with a goal-input UI; no backend wiring yet)
- Backend routes: `artifacts/api-server/src/routes` (only `/api/healthz` exists so far)
- DB schema: `lib/db/src/schema` (empty — no tables defined)
- OpenAPI contract: `lib/api-spec/openapi.yaml` (only health check defined)
- Netlify-specific build files (`netlify.toml`, `vite.netlify.config.ts`, `build:netlify` script) were kept in `artifacts/ocean-goals/` from the original import but are unused on Replit.

## Architecture decisions

- This project was imported from GitHub already shaped as a pnpm artifacts workspace (matching Replit's multi-artifact template), but its artifacts weren't registered with Replit's workflow/proxy system on import. Registered them by scaffolding fresh artifacts via `createArtifact` (for `ocean-goals`) and directly configuring workflows with the ports/env declared in the pre-existing `.replit-artifact/artifact.toml` files (for `api-server` and `mockup-sandbox`, which have no `createArtifact` artifact type), then restoring the original source files on top.

## Product

- Single-page app where users can add "dream/goal" entries via a text input and "release" them; an ocean-themed visual tracks progress ("X of Y goals achieved"). Goal data isn't yet persisted to the backend/DB — it's UI-only so far.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- The API server and mockup sandbox don't use `createArtifact`'s standard artifact types — they were wired up via `configureWorkflow` directly with the `PORT`/`BASE_PATH` values from their `.replit-artifact/artifact.toml` files.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
