# AudiLink Control API

This is the first executable control-plane slice. It establishes the versioned Fastify/OpenAPI boundary, correlation IDs, request validation, idempotent local-fixture job creation, SSE progress framing, model-registry visibility, and strictly separate Studio Credit and Reader Coin wallet responses.

The repositories are intentionally in-memory at this milestone. They are seams for PostgreSQL, the transactional outbox, immutable ledgers, and Temporal workflows; they are not production persistence. Job and wallet fixture routes do not exist unless `AUDILINK_ENABLE_LOCAL_FIXTURES=true` and require `AUDILINK_FIXTURE_TOKEN` on every request. Their server-computed estimate is test data, not a wallet reservation or billable quote.

## Commands

```bash
bun run dev
bun run typecheck
bun run test
bun run build
```

The API listens on `127.0.0.1:4100` by default. OpenAPI JSON is at `/openapi.json` and the local reference UI is at `/reference`.
