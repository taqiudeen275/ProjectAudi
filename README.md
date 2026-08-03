# AudiLink

AudiLink is an audio-native platform in active development. This repository contains the first executable foundation for three separately deployable products on one shared platform:

- **AudiLink Studio** — audiobook production, text-to-speech, Voice Lab, sound effects, creator discovery, and Studio Credits.
- **AudiLink Books** — audiobook and serial discovery, permanent Reader Coin unlocks, library, and playback.
- **AudiLink Admin** — role-scoped operational views for jobs, models, ledgers, moderation, and audit history.

The product, architecture, AI-model, commerce, trust-and-safety, and delivery decisions are linked from [the documentation index](docs/README.md).

## Current milestone

This slice establishes the Bun workspace, shared TypeScript contracts and design tokens, responsive product shells, and a schema-first Fastify control API. The UI data and protected `/v1/fixtures/*` API routes are explicitly non-production fixtures; no real credits, coins, entitlements, or earnings are mutated yet.

## Requirements

- Bun 1.3.14 or a compatible newer release
- Node.js 24 or newer for the compiled control API

## Run locally

Install once from the repository root:

```bash
bun install
```

Then run each surface in a separate terminal:

```bash
bun run dev:studio  # http://127.0.0.1:3000
bun run dev:books   # http://127.0.0.1:3001
bun run dev:admin   # http://127.0.0.1:3002
bun run dev:api     # http://127.0.0.1:4100
```

The control API exposes OpenAPI JSON at `/openapi.json` and an interactive reference at `/reference`.

Local job and wallet fixtures are absent by default. To enable them for development, set both `AUDILINK_ENABLE_LOCAL_FIXTURES=true` and a non-empty `AUDILINK_FIXTURE_TOKEN`, then send that token in `x-audilink-fixture-token` on fixture requests.

## Validate

```bash
bun run check
```

The root check runs linting, strict type checks, API tests, and production builds across all workspaces.
