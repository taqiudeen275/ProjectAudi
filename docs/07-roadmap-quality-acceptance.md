# Delivery Roadmap, Quality Gates, and Acceptance Plan

**Status:** Approved pre-build delivery baseline

**Launch model:** AudiLink Studio and AudiLink Books become publicly available together

**Planning method:** Milestone and exit-criteria driven; dates follow staffing and benchmark data

## 1. Purpose

This document turns the product, UX, architecture, model, commerce, and safety specifications into an ordered delivery program with objective exit criteria. It does not authorize shortcuts around licensing, ledger integrity, consent, security, or accessibility to meet a date.

The repository now contains the first M1 foundation slice: separate Studio, Books, and Admin surfaces, shared contracts/tokens, and a schema-first control API with protected in-memory development fixtures. Production authentication, persistence, ledgers, workflows, media workers, and migrations are not implemented yet, so the remaining M1 exit criteria still apply.

## 2. Source-of-truth documents

| Area | Source |
|---|---|
| Product scope and requirements | [Product Requirements](01-product-requirements.md) |
| Information architecture and design behavior | [UX and Information Architecture](02-ux-information-architecture.md) |
| Services, data, APIs, deployment, and recovery | [Platform Architecture](03-platform-architecture.md) |
| Engines, licenses, adapters, and benchmarks | [AI Model Strategy](04-ai-model-strategy.md) |
| Plans, credits, coins, royalties, and payouts | [Commerce Specification](05-plans-credits-coins-commerce.md) |
| Consent, rights, moderation, privacy, and provenance | [Trust & Safety](06-trust-safety-publishing.md) |
| Visual system, components, motion, and UI review | [Interface Design System](08-interface-design-system.md) |

If documents conflict, implementation stops until Product and the relevant policy owner publish a versioned resolution. Financial and safety invariants take precedence over a convenience behavior.

## 3. Delivery principles

- Build one transactional control plane and independently scalable compute/media planes.
- Implement manual creator paths before relying on AI assistance.
- Make every AI suggestion reversible and every financial mutation idempotent.
- Qualify exact model revisions rather than coding to marketing names.
- Treat Admin, moderation, accounting, observability, and recovery as launch product—not post-launch tooling.
- Design desktop and phone interactions together; “mobile later” is not compatible with the approved full-editor requirement.
- Use feature flags for safe internal qualification, not to silently omit approved V1 scope at public launch.
- Release public Studio and Books together, while using internal and invite-only environments for progressive validation.

## 4. Milestones

### M0 — Documentation and external launch decisions

Deliver:

- approved linked documentation pack;
- operating-entity and seller/merchant-of-record decision;
- target buyer/seller/payout countries and primary data region;
- payment, tax, KYC, and payout provider shortlist;
- Fish commercial-license decision and contact path;
- exact model/checkpoint qualification backlog;
- initial security/privacy threat model;
- initial cost model and staffing plan.

Exit criteria:

- all documents pass cross-document review;
- no undefined use of “credit,” “coin,” “wallet,” “sale,” “voice,” or “commercial rights”;
- Legal records every unresolved launch gate with owner and due decision;
- Product signs off V1/out-of-scope boundaries;
- Engineering signs off architecture feasibility.

### M1 — Workspace and platform foundation

Deliver:

- Bun workspace with Studio, Books, Admin, shared UI/contracts/config;
- quiet, source-owned shared interface tokens and component behavior, including reduced-motion and border/density budgets;
- modular control API and generated clients;
- centralized authentication and personal workspace tenancy;
- PostgreSQL migrations, RLS, outbox, idempotency, audit, and base ledgers;
- object upload/quarantine/media metadata pipeline;
- workflow orchestration, Redis progress fan-out, SSE, and observability;
- local development stack and deployment pipelines;
- basic Admin RBAC and feature/model registry.

Exit criteria:

- cross-app login/logout/session revocation works;
- cross-tenant tests cannot access data or objects;
- migration from empty database and rollback-safe N-1 deployment pass;
- outbox and idempotency survive duplicate requests/restarts;
- ledger property suite shows zero imbalance;
- traces correlate browser, API, workflow, and worker without raw content.

### M2 — Studio manual production and media core

Deliver:

- project, chapter/scene, character, block, clip, track, and revision model;
- manuscript/audio import and direct authoring;
- manual casting, line editing, variants, timeline, SFX placement, mixing, and mastering;
- autosave, undo/revision recovery, asset library, waveform peaks, and preview;
- WAV, MP3, and chapterized M4B export;
- adaptive desktop and full-feature phone editor;
- standalone transcription and alignment;
- estimate/reserve/settle/release Studio Credit path using a test model.

Exit criteria:

- a creator can complete and export a multi-character book without AI parsing;
- hour-scale and multi-hour render fixtures produce correct chapters and loudness;
- every editor action required on desktop is achievable on a supported phone layout;
- interrupted autosave/reconnect does not lose the last acknowledged revision;
- cancellation and worker failure cannot double charge;
- exported files pass codec, chapter, duration, loudness, and checksum validation.

### M3 — AI assistance and all model adapters

Deliver:

- Voicebox-family adapters for Qwen Base/CustomVoice, LuxTTS, Chatterbox, TADA, and Kokoro;
- Qwen VoiceDesign, Fish, MOSS SFX, Whisper, and Qwen3-0.6B helper adapters;
- model registry, Fast/Balanced/Studio router, and Advanced selector;
- voice enrollment, design, consent authorization, pronunciation/control UI;
- AI manuscript analysis, proposed characters/scenes/casting/tags/SFX;
- golden evaluation harness, model cards, cost reports, and rollback;
- separate interactive and audiobook-batch capacity.

Exit criteria:

- every exact V1 checkpoint passes license, security, safety, quality, cost, and reliability gates;
- Fish commercial agreement is recorded before its production flag can enable;
- unsupported controls are rejected before reservation;
- AI changes are previewable, diffable, individually/batch accepted, and reversible;
- model fallback requires explicit compatibility and user acceptance;
- golden reports are reproducible from pinned containers and fixtures.

### M4 — Books, Reader Coins, and protected playback

Deliver:

- catalog for books, series, seasons/volumes, chapters, and episodes;
- search/filter/detail pages, free units, timed previews, ratings, saves, follows, and sharing;
- library, progress sync, bookmarks, speed, sleep timer, mini/full player;
- Reader Coin packs/lots, expiry, permanent unlocks, bundles, royalty accrual;
- protected streaming and app-managed offline playback;
- imported finished-audio publishing path and immutable release manifests;
- referral and controlled-grant campaigns.

Exit criteria:

- purchased coins never expire and promotional lots expire/spend in the defined order;
- concurrent/duplicate unlocks spend once and grant one permanent entitlement;
- already-owned units are not charged again in a bundle;
- ordinary delisting preserves playback;
- unauthorized/expired playback tokens and offline manifests fail closed;
- playback progress reconciles across browser sessions/devices;
- promotional redemption creates the funded fiat royalty.

### M5 — Marketplace, commerce, publishing, and Admin operations

Deliver:

- voice and SFX listings, search, previews, licenses, acquisition/use;
- in-app Studio Credit usage with fiat creator royalty accrual;
- fiat SFX download licenses;
- plans/subscriptions/top-ups, verified seller splits, earnings, holds, payouts, refunds, disputes;
- automated checks and human review workflow;
- consent verification/revocation, provenance, public AI labels, reports/takedowns/appeals;
- complete Admin modules for users, models, jobs, plans, wallets, coins, referrals, content, cases, finance, payouts, flags, and audits.

Exit criteria:

- Free transactions accrue 40% creator/60% AudiLink and active paid transactions accrue 80%/20%, frozen per transaction;
- duplicate/out-of-order provider events cannot double grant or pay;
- every public/monetized item has automated and human approval;
- every public cloned voice has active verified consent;
- marketplace buyers cannot retrieve voice references/embeddings;
- high-risk Admin actions require MFA, reason, audit, and configured dual approval;
- finance reconciliation matches provider, orders, ledgers, entitlements, earnings, and payouts.

### M6 — Integrated hardening and co-launch

Deliver:

- end-to-end load, security, accessibility, recovery, and abuse testing;
- unit-economics validation and final plan/coin configuration;
- production support playbooks, dashboards, paging, and status communication;
- content moderation staffing/training;
- legal terms/privacy/licenses and app disclosures;
- private alpha and invite beta findings resolved;
- launch and rollback runbooks.

Exit criteria:

- every gate in Sections 7–11 passes;
- no unresolved severity-1/2 security, financial, consent, data-loss, or accessibility defect;
- launch council records a go decision;
- Studio and Books public availability turns on in the same launch window;
- Admin, support, monitoring, moderation, and rollback are already operational.

## 5. Test strategy

### 5.1 Test layers

| Layer | Purpose |
|---|---|
| Unit | Pure entitlement, pricing, parser, permission, state-machine, and media calculations |
| Property/model-based | Ledger balance, lot ordering, concurrent spend, idempotency, revision merges |
| Contract | OpenAPI clients, provider adapters, inference adapters, webhook versions |
| Integration | PostgreSQL/RLS, outbox, workflow, object storage, FFmpeg, auth, payments |
| Golden AI/audio | Content/voice/SFX/transcription quality and performance by exact model |
| End-to-end | Creator, reader, seller, moderator, finance, and admin journeys |
| Accessibility | Automated scans plus keyboard, screen reader, touch, zoom, contrast, reduced motion |
| Security | Threat-model cases, dependency/container scan, authz, object access, abuse, penetration test |
| Load/soak | Preview bursts, long book workflows, playback ranges, SSE, webhooks, ledgers |
| Resilience/DR | Worker death, provider outage, region dependency, restore, replay, model rollback |

Tests use synthetic or explicitly licensed fixtures. Production manuscripts, voices, identity records, and payments are never copied into lower environments.

### 5.2 Required acceptance journeys

#### Creator

1. Sign up once and switch between Studio and Books.
2. Import a manuscript, review AI-proposed chapters/characters, reject selected suggestions, and manually correct casting.
3. Create an authorized clone and a synthetic designed voice.
4. Generate individual lines, compare variants, add an SFX, and complete a mix on desktop and phone.
5. Cancel/retry a job and observe correct credit reservation/refund.
6. Export M4B/MP3/WAV and submit the edition.
7. Resolve review changes and publish without losing the submitted revision.

#### Reader

1. Discover a book/serial and see AI provenance before acquisition.
2. Listen to a timed preview/free episode.
3. Buy coins, unlock one chapter, then buy a bundle without repurchasing it.
4. Stream, cache protected offline, bookmark, change speed, and resume on another session.
5. Rate, save, follow, share, and report content.
6. Retain ordinary-delisted content in the library.

#### Marketplace seller/buyer

1. Submit a verified public voice and an SFX listing.
2. Pass automated and human review.
3. Use the voice/SFX in a Studio project with a visible total credit estimate.
4. Buy an external SFX license in fiat and retrieve only the licensed file.
5. Observe plan-dependent fiat earnings, hold, and payout.
6. Revoke voice consent and verify new synthesis stops while the case handles existing outputs/licenses.

#### Operations

1. Publish a versioned plan/rate/model configuration.
2. Disable/degrade a model and roll back safely.
3. Review content, issue changes, approve, suspend, and process an appeal.
4. Investigate a ledger entry from user action through provider settlement.
5. Apply a dual-approved compensating adjustment.
6. Restore database/object metadata and replay outbox/workflows without duplicates.

## 6. Quantitative launch SLOs

Values are provisional until target infrastructure tests; relaxing them requires recorded approval.

### Reliability

- Control-plane monthly availability target: 99.9%.
- Technically successful generation jobs after one platform retry: at least 98%.
- Posted-ledger imbalance or unexplained reconciliation variance: zero.
- Duplicate charges, unlocks, earnings, or payouts in fault-injection suites: zero.
- Acknowledged project revision loss: zero.

### Performance

- Non-job API p95 latency from the primary region: at or below 500 ms, excluding upload bytes.
- Warm Fast preview p95 time to first usable audio: at or below 10 seconds under launch load.
- Books broadband p95 playback start: at or below 2.5 seconds.
- Editor direct-manipulation response: p95 below 100 ms for supported project-size fixtures.
- Progress updates become visible within two seconds of authoritative state change.

### Audio/model quality

- English TTS WER at or below 5% on the AudiLink clean-narration corpus.
- Hallucinated lexical content below 0.1% of evaluated words.
- Human GA naturalness average at least 4.0/5.
- At least 95% of long-form reviewed segments have no severe identity/timbre shift.
- Published masters meet the approved integrated loudness and true-peak profile.
- Every Beta language has a qualified reviewer, passing report, and visible Beta label.

### Safety/rights

- 100% of public/monetized items complete automated and human review.
- 100% of public cloned voices resolve to active verified consent.
- 100% of public AI audio has visible disclosure and internal provenance.
- Zero payouts while a blocking seller/identity/consent case is active.
- Critical minor-safety/imminent-harm reports enter on-call assessment within one hour.

### Accessibility

- WCAG 2.2 AA automated rules pass with no critical issue.
- All core journeys pass keyboard-only and supported screen-reader review.
- All desktop editor capabilities have a documented and tested touch path.
- Reduced-motion mode removes non-essential motion without hiding status.
- Waveform, color, and audio-only state have text/programmatic equivalents.
- Surface-and-border audits show that visual grouping remains clear without repeated enclosing cards or separators.
- Motion review finds no workflow-blocking animation, unbounded ambient effect, or canvas/WebGL dependency for core content or controls.

### Recovery

- Database recovery point objective: 15 minutes or better.
- Core control-plane recovery time objective: four hours or better.
- Model rollback to the last approved revision: 30 minutes or better.
- Quarterly restore drill reproduces ledger totals, entitlements, publication manifests, and audit history.

### Unit economics

- Every operation has measured cost per accepted unit on target infrastructure.
- No plan/pack is published below its approved contribution-margin floor.
- Target blended paid-plan gross margin is at least 60% under forecast usage.
- Promotional coin budget covers settlement-value royalties at issuance.

## 7. Release gates

### Legal/commercial

- Operating entity and seller/merchant-of-record selected.
- Buyer, seller, and payout countries/currencies approved.
- Payments, tax, KYC, payouts, refunds, digital-content access, and statutory retention approved.
- Fish commercial license signed and recorded.
- Every exact model/weight license approved.
- Terms, privacy, acceptable use, seller terms, consent release, marketplace licenses, and AI disclosure approved.

### Product

- V1 functional requirements pass.
- Deferred features are absent or clearly unavailable, not half-exposed.
- Provisional pricing is replaced or explicitly approved for launch.
- Support, moderation, and finance can operate every user-facing state.

### Engineering

- Architecture/security review complete.
- No unreviewed production migration or moving model dependency.
- Capacity/load tests include preview burst, batch books, playback, webhooks, and Admin.
- Backup/restore, model/provider outage, payment delay, and rollback drills pass.
- Observability covers SLOs, cost, ledgers, content cases, and provider health.

### Security/privacy

- Independent penetration test has no unresolved critical/high issue.
- Tenant/object/admin authorization suites pass.
- Secrets, encryption, upload sandbox, retention, deletion, and incident runbooks verified.
- Data-protection impact and vendor reviews complete where required.

## 8. Environments and rollout

1. **Local:** synthetic fixtures, local services, read-only local model cache.
2. **Development:** shared managed sandbox; no real payouts or production identity evidence.
3. **Staging:** production-like topology, test payment/KYC providers, pinned models, destructive/failure tests.
4. **Internal alpha:** staff accounts; all public actions remain non-public.
5. **Invite beta:** limited verified creators/readers under beta terms; no feature is called GA.
6. **Production dark launch:** deploy and warm systems while public discovery remains off.
7. **Co-launch:** enable Studio and Books public entry points in the same controlled window.

Every stage has separate credentials, storage, ledger namespaces, and analytics. Production data never flows backward.

## 9. Operational readiness

Required runbooks:

- degraded/failed model and capacity exhaustion;
- generation stuck, cancel, retry, and refund;
- object upload/transcode malware or corruption;
- playback/CDN outage;
- duplicate/delayed payment webhook;
- ledger reconciliation alert;
- chargeback, negative recovery, or payout failure;
- unauthorized voice/urgent takedown;
- consent revocation;
- compromised creator/moderator/admin account;
- data deletion/export request;
- backup restore and region/provider outage;
- public status update and post-incident review.

Dashboards must separate user wait time from model runtime, report model/version cost and failure, show financial liabilities and variance, and avoid raw user content.

## 10. Deferred scope controls

The following must not enter V1 without a replacement plan and impact review:

- teams, invitations, seats, or shared organization wallets;
- public developer API;
- native iOS/Android apps;
- audio separation or voice changing;
- comments, social/activity feeds, or direct messages;
- rewarded advertising or social-task coin rewards;
- reader subscription catalog;
- downloadable voice models/references;
- minor or public-figure voice programs;
- multi-region database writes.

Internal interfaces may preserve future compatibility, but no placeholder UI should imply availability.

## 11. Change control

- Each requirement, plan/rate, license, model, policy, API, publication, and artifact manifest has a version.
- Product owns functional scope; Architecture owns service/data contracts; Finance owns ledger/rate policy; Trust & Safety owns consent/moderation; Legal approves external obligations.
- A material change includes currency semantics, revenue share, expiry, commercial rights, identity rules, model license, public disclosure, permanent entitlement, or public launch scope.
- Material changes require cross-document updates and re-running affected acceptance suites.
- Emergency model/content suspension may happen immediately for safety, with retrospective review and recorded rollback/remedy.

## 12. Documentation definition of done

The pre-build pack is complete when:

- all nine Markdown files exist and link correctly;
- terminology and decisions agree across documents;
- primary sources support time-sensitive model/legal claims;
- every external blocker has an owner and launch-gate treatment;
- no application source file was changed during the documentation task;
- Markdown, link, and diff-whitespace checks pass;
- a future engineer can derive system boundaries, data contracts, policies, test cases, and rollout order without inventing product policy.
