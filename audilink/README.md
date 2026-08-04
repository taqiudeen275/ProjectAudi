# AudiLink Studio

The Studio surface of AudiLink. It currently contains two deliberately different experiences:

- `/` — the public Studio landing page, with an interactive visual-only audio study and a restrained Canvas UI Ripple enhancement.
- `/studio` — a local-fixture workspace preview for resuming projects, entering each of the five creation flows, and inspecting jobs and Studio Credits.

The workspace is not connected to authentication, billing, model inference, or durable storage yet. UI messages label those scenarios honestly; interacting with them cannot generate audio or charge credits.

## Interaction principles

- Motion is used for state, layout, and gesture continuity—not ambient decoration.
- `prefers-reduced-motion` removes Motion transitions and prevents the Ripple WebGL instance from starting.
- Ripple is nonessential: content remains ordinary interactive HTML when the experimental canvas path or WebGL is unavailable, and rendering pauses while off-screen.
- Keyboard focus is trapped and restored for modal and mobile navigation surfaces.

See [`components/canvasui/NOTICE.md`](components/canvasui/NOTICE.md) for the copied Canvas UI component’s provenance and license terms.

## Run locally

From the repository root:

```powershell
bun run dev:studio
```

Or from this directory:

```powershell
bun run dev
```

Open `http://localhost:3000` for the landing page or `http://localhost:3000/studio` for the workspace preview.

## Validate

```powershell
bun run lint
bun run typecheck
bun run build
```

Next.js 16 guidance in `node_modules/next/dist/docs/` is authoritative for framework behavior in this app.
