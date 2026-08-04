# AudiLink Books

AudiLink Books is the listener-facing surface for discovering audiobooks and serials, resuming a library title, and previewing the future Reader Coin purchase flow. This milestone is an editorial product shell: catalog records come from `app/books-data.ts` and no production identity, commerce, entitlement, or media service is connected yet.

## Interaction safety

- The Reader Coin dialog is explicitly a no-charge interaction preview. It never mutates a wallet and never creates an entitlement.
- Paid titles stop at their declared `previewDurationSeconds`; seeking and skip controls are clamped to that limit.
- Seeded continue-listening titles represent existing library access. Free titles play without a coin prompt.
- Narration provenance is structured on every book and remains visible in featured, shelf, serial, and player-adjacent experiences.
- Production checkout must settle the server ledger before issuing a permanent entitlement. Protected streaming and offline playback are not implemented by this UI preview.

## Experience and motion

The home follows a calm editorial hierarchy: one featured story, a compact resume row, a deliberately short weekly edit, and one serial spotlight. Search, genres, and additional shelf items are progressively disclosed. Motion is limited to state continuity—search/filter reveal, shelf layout, serial replacement, and active-player changes—using the installed Motion package. Motion respects the operating-system reduced-motion preference, with CSS and component-level fallbacks.

## Run locally

From the workspace root:

```bash
bun install
bun run dev:books
```

Or from this directory:

```bash
bun run dev
```

The app runs at [http://localhost:3001](http://localhost:3001).

## Validate

```bash
bun run lint
bun run typecheck
bun run build
```
