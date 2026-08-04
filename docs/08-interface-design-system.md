# AudiLink Interface Design System

**Status:** Normative implementation baseline

**Approved:** 2026-08-04

**Applies to:** AudiLink Studio, AudiLink Books, AudiLink Admin, and shared product UI

**Purpose:** Turn the UX direction into concrete visual, component, interaction, motion, accessibility, and review rules. Where this document is more specific than the UX specification, this document governs implementation detail without changing product behavior.

## 1. Design thesis

AudiLink is an audio platform, not a dashboard template. Its interface should feel quiet until audio, direct manipulation, or system state gives it a reason to move.

The system uses **quiet hierarchy**:

1. Establish importance with composition, whitespace, typography, and proximity.
2. Use a tonal surface when content forms a distinct interaction layer.
3. Use a separator when two regions need a semantic boundary.
4. Use an outline only for focus, selection, validation, or a control that needs a visible affordance.
5. Use shadow or glow only to express elevation or an active audio state.

This order is mandatory. A border, card, badge, or animation is not a substitute for hierarchy.

## 2. Product character

### 2.1 Shared language

- Deep neutral fields let voice, cover art, waveform, and active state carry meaning.
- Typography is calm and highly legible. Large type creates editorial or product emphasis; small uppercase labels are rare and never used for paragraphs.
- Controls use direct labels. Icon-only controls are reserved for familiar transport or spatial actions and always have accessible names.
- Geometry is precise but not rigid: compact controls, softly rounded working surfaces, fully rounded pills only for compact filters, tags, and segmented choices.
- Accent color identifies focus and intent, not decoration. Status colors retain their ordinary meanings and are never reused as brand accents.

### 2.2 Surface-specific expression

| Surface | Character | Dominant content | Accent behavior |
|---|---|---|---|
| Studio | Quiet precision | The current script, voice, effect, transcript, or timeline | Cool signal color for tools; warm color for human voice and publish intent |
| Books | Editorial warmth | The current title, cover, story, or listening session | Cover-derived atmosphere behind contrast-safe text and controls |
| Admin | Quiet operations | The exception, decision, or investigation requiring attention | Status-led; brand accent stays subordinate to risk |

Studio's public landing page may be more expressive than its workspace. Books may be more cinematic than Studio. Admin must never borrow marketing spectacle.

## 3. Density and disclosure

### 3.1 Action budget

At each viewport level:

- one action is visually primary;
- no more than one secondary action sits beside it;
- two or three contextual actions may remain visible when they are used repeatedly;
- the rest move into a clearly labeled inspector, disclosure, or overflow menu;
- destructive actions are separated from frequent actions and never rely on color alone.

The budget applies to headers, cards, toolbars, rows, and empty states. A page with several equally prominent actions has not made a product decision.

### 3.2 Surface and border budget

- Page sections have no enclosing card by default.
- Repeated items use rhythm, alignment, and selected-state tone before row borders.
- A card is appropriate for a selected object, independently actionable media item, temporary overlay, checkout/license decision, or genuinely separate scroll context.
- Nested cards are prohibited except when an overlay or inspector sits above a working surface.
- Neutral hairlines use the lowest contrast that still communicates the boundary. Avoid full rectangles when one edge or a tonal shift is sufficient.
- Hover may add a tonal fill. It must not make a previously invisible essential action discoverable only with a pointer.
- Focus rings are never removed and do not count against the border budget.

### 3.3 Progressive disclosure

Advanced controls appear at the point they become useful:

- model selection, seed, sampling, and engine-specific parameters live in Advanced mode;
- clip timing, pronunciation, and processing controls live in the selected block or Inspector;
- Books acquisition terms appear before an unlock, while listening controls appear in the player;
- Admin investigation evidence expands from an exception row rather than occupying every row by default;
- plan, balance, provenance, and consent states remain visible whenever they materially affect the next action.

Disclosure never hides a required warning, current charge, ownership scope, AI provenance, consent restriction, or destructive consequence.

## 4. Layout rules

### 4.1 Studio landing

- Public `/` is an invitation to create, not the production dashboard.
- The first viewport contains one concise promise, one primary start action, one secondary exploration action, and one bounded interactive audio demonstration.
- Product proof unfolds as a short narrative rather than a grid of feature cards.
- Canvas or WebGL enhancement is restricted to one nonessential hero region and must leave the complete message and actions usable before it loads.

### 4.2 Studio workspace

- `/studio` opens on a focused creation home, with five creation paths available without presenting five equally heavy panels.
- Desktop uses a stable rail or compact header plus one dominant canvas. Contextual panels appear only for the selected object.
- The audiobook editor may expose Script, Cast, Timeline, and Inspector together only at widths where each remains legible. Otherwise it uses focus modes with preserved context and state.
- Phone layouts use touch-optimized Script, Cast, Timeline, and Inspector modes. Desktop functionality is not dropped; it is sequenced.
- Persistent job and save state remain visible but visually quiet until intervention is required.

### 4.3 Books

- Discovery is cover-led and editorial, with one featured story or listening continuation anchoring the viewport.
- Shelves are horizontal or compact lists with restrained metadata, not dense bordered catalogs.
- Reader Coin state is available from the account area and acquisition moment; it does not compete with every title.
- The persistent player is visually connected to the active title and remains compact until expanded.
- AI provenance is visible before acquisition without being styled as a promotional badge.

### 4.4 Admin

- The opening view is a decision queue, not a wall of KPIs.
- A compact health summary may precede the queue, but only anomalous or decision-relevant metrics receive strong emphasis.
- Secondary operational domains use tabs, search, and contextual detail. Dense data is available without being presented simultaneously.
- Tables use whitespace, column alignment, sticky headings when needed, and restrained row states. On phones they become labeled records without dropping actions.
- Sensitive actions expose actor, reason, impact, and approval requirements before confirmation.

## 5. Token system

Applications consume semantic tokens and may map them to local CSS variables. Components do not import literal brand colors for ordinary states.

### 5.1 Color roles

| Token role | Meaning |
|---|---|
| `canvas` | App background and deepest field |
| `surface` | Working region that needs tonal separation |
| `surface-raised` | Sheet, menu, player, or selected working layer |
| `surface-subtle` | Hover, selected row, quiet grouped content |
| `separator` | Low-contrast semantic boundary |
| `text` | Primary readable content |
| `text-muted` | Secondary metadata that remains legible |
| `focus` | Keyboard focus and selected interactive state |
| `positive`, `caution`, `danger`, `info` | Status only |

Product accents are separate semantic inputs. A product accent does not replace status color or create body-text color below contrast requirements.

### 5.2 Space and type

- Base spacing follows a 4 px scale, with 12, 16, 24, 32, 48, and 64 px doing most compositional work.
- Dense control clusters may use 8 px gaps. Major regions use at least 24 px and usually 32–64 px.
- Body text defaults to 16 px on public and Books surfaces. Operational metadata may reach 13–14 px when contrast and text expansion remain safe.
- Line length is approximately 45–75 characters for narrative and explanatory content.
- Numeric balance, timing, and ledger data use tabular figures.

### 5.3 Radius and elevation

- Compact controls: 10–12 px.
- Working surfaces and sheets: 16–20 px.
- Pills: 999 px, only for the approved compact roles.
- Elevation is expressed by a small tonal step first. Shadow is reserved for overlays, the persistent player, and direct-manipulation lift.

## 6. Components

AudiLink follows the source-owned component approach documented by [shadcn/ui](https://ui.shadcn.com/docs): generated source is reviewed and edited in-repository. Components are not consumed as an opaque theme package, and default shadcn composition is not the AudiLink visual language.

### 6.1 Required component anatomy

Every shared interactive component defines:

- default, hover, active, focus-visible, disabled, loading, and error behavior;
- keyboard and touch behavior;
- accessible name, description, and live-announcement needs;
- compact and comfortable density where both are genuinely required;
- reduced-motion behavior;
- which tokens may be overridden by Studio, Books, or Admin.

### 6.2 Core patterns

**Button:** One filled primary style, quiet text/tonal secondary styles, and explicit destructive treatment. Loading retains width and label context.

**Field:** Label and help/error text stay outside the input's value area. The neutral state avoids a heavy outline; focus and error states become unmistakable.

**Tabs/segmented choice:** A tonal track or indicator communicates selection. Do not outline every option.

**Disclosure/inspector:** Opens next to the triggering context on wide screens and as a sheet or focused page on small screens. Focus returns to the trigger.

**Media row:** Cover/avatar, title, essential metadata, and a direct preview action. Secondary metadata and commerce terms reveal without turning the row into a miniature dashboard.

**Status:** Uses a concise word plus icon or shape where useful. Never rely on colored dots alone.

**Toast:** Confirms a completed or recoverable background event. Blocking decisions and errors remain in context rather than disappearing.

**Skeleton/progress:** Matches final geometry and never loops decoratively. Durable work reports a text state and may provide cancel or leave-page guidance.

## 7. Motion system

Motion is implemented with CSS for simple state feedback and [Motion for React](https://motion.dev/docs/react) for presence, layout continuity, and direct manipulation. Use [AnimatePresence](https://motion.dev/docs/react-animate-presence) only when exiting content must remain long enough to explain where it went. Use [`useReducedMotion`](https://motion.dev/docs/react-use-reduced-motion) for behavior that cannot be handled entirely in CSS.

| Intent | Typical duration | Treatment |
|---|---:|---|
| Press, hover, focus | 100–160 ms | Color, opacity, or 1–2 px translation |
| Reveal, tab, selection | 180–260 ms | Opacity plus small spatial continuity |
| Sheet, route, workspace mode | 260–420 ms | Shared geometry or short directional transition |
| Direct manipulation | Input-coupled | Critically damped spring, no bounce |
| Reduced motion | 0–100 ms | Immediate change or opacity crossfade |

Rules:

- Animation starts from the element or context that caused it.
- User input interrupts animation; no workflow waits for an exit flourish.
- Avoid entrance animation for every card, list row, metric, or route load.
- Limit a coordinated entrance to three meaningful groups and 120 ms total stagger.
- Scale in work surfaces stays within 0.98–1.02. Bounce, overshoot, long blur, elastic text, and decorative cursor tracking are prohibited.
- Continuous motion reflects real playback, recording, upload, render, or live progress and stops when that state stops.
- Motion never changes reading order, steals focus, or causes cumulative layout shift.

## 8. Canvas UI policy

[Canvas UI](https://canvasui.dev/) is an optional source of bounded, audio-native visual enhancement. Components are installed as source through its shadcn registry, then reviewed and adapted to AudiLink tokens and lifecycle rules.

Permitted V1 use:

- one subtle Ripple or Grid-style hero treatment on the Studio landing page;
- nonessential campaign or launch art that remains legible and operable without the effect.

Not permitted:

- editor, player, checkout, wallet, moderation, finance, model configuration, or data-table backgrounds;
- more than one active canvas/WebGL scene per viewport;
- an effect behind body copy or controls when it reduces contrast;
- pointer-following effects that obscure focus or create required functionality;
- rendering while offscreen, hidden, in a background tab, or under reduced motion;
- redistribution or resale of Canvas UI component source as a standalone library.

The implementation must preserve explicit cleanup, lazy loading, static fallback, and the upstream license notice. Canvas UI's published license permits commercial product use but restricts redistribution of the components themselves; Legal must verify the pinned component license before release.

## 9. Accessibility and performance

- WCAG 2.2 AA applies to every state, including hover/focus, cover-derived backgrounds, visualizations, and transient overlays.
- Touch targets are at least 44 × 44 CSS px. Hover is enhancement only.
- Focus indicators remain visible even on border-light surfaces.
- Waveform, position, movement, and color always have text or programmatic equivalents.
- 200% zoom, text expansion, 320 px width, safe areas, virtual keyboards, and right-to-left readiness are design-review inputs.
- Canvas/WebGL does not enter the critical rendering path. Public content and primary actions render without it.
- Motion does not delay Largest Contentful Paint, hydration, input readiness, or audio startup.
- Avoid layout animation across very large DOM trees; animate a small wrapper or explicit transform instead.

## 10. Review checklist

A view is ready only when the answer to every applicable question is yes:

1. Is one task clearly dominant without reading every label?
2. Could any card, outline, separator, badge, or shadow be removed with no loss of meaning?
3. Are advanced and rare controls available but out of the primary path?
4. Does each animation have a named purpose, short duration, interruption behavior, and reduced-motion equivalent?
5. Does the interface remain complete when animation and canvas enhancement are disabled?
6. Are balance, cost, entitlement, provenance, consent, and destructive consequences visible at the decision point?
7. Can the same capability be completed at 320 px, with keyboard only, and with touch only?
8. Do loading, empty, offline, partial, failed, gated, and completed states preserve the same hierarchy?
9. Does the result feel authored for AudiLink rather than like unmodified shadcn, Canvas UI, or a reference screenshot?
10. Have performance, contrast, focus, reflow, and layout-shift checks passed on the actual implementation?

## 11. Sources and version discipline

The following implementation research was reviewed on 2026-08-04:

- [shadcn/ui documentation](https://ui.shadcn.com/docs), [theming](https://ui.shadcn.com/docs/theming), and [manual installation](https://ui.shadcn.com/docs/installation/manual) for source ownership and semantic token practice.
- [Canvas UI documentation](https://canvasui.dev/), [component catalog](https://canvasui.dev/components), [Grid](https://canvasui.dev/docs/components/grid), and [Ripple](https://canvasui.dev/docs/components/ripple) for optional canvas effects, installation, accessibility, lifecycle, and licensing notes.
- [Motion for React](https://motion.dev/docs/react), [animation](https://motion.dev/docs/react-animation), [AnimatePresence](https://motion.dev/docs/react-animate-presence), and [useReducedMotion](https://motion.dev/docs/react-use-reduced-motion) for implementation behavior.

Any component registry source, animation library, or canvas effect is pinned in the repository. Upgrading it requires visual regression, keyboard, reduced-motion, performance, and license review. External examples are implementation research, not permission to copy their product composition or brand treatment.
