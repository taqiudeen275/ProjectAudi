# AudiLink Admin

AudiLink Admin is the separately deployed, staff-only operations surface. This milestone is an explicitly non-production interface preview: it uses typed scenario fixtures, does not perform privileged mutations, and is marked `noindex` until authenticated control-API reads and actions replace the fixtures.

## Interface direction

The overview is a quiet, role-scoped decision cockpit. It keeps the health summary typographic, makes the decision queue the primary focus, and reveals model routes, the three separate ledgers, or the immutable audit trail one layer at a time. Disabled navigation identifies future sections without implying that they are available.

Motion is deliberately restrained. Motion 12 preserves continuity when the role, queue filter, selected record, or operational-detail tab changes; it does not run ornamental loops or long staggers. Both Motion's user preference handling and the CSS `prefers-reduced-motion` fallback honor reduced-motion settings.

## Run locally

From the workspace root:

```bash
bun run --cwd audilink-admin dev
```

The development server uses port 3002 by default.

## Validate

```bash
bun run --cwd audilink-admin lint
bun run --cwd audilink-admin typecheck
bun run --cwd audilink-admin build
```
