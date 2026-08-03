# AudiLink Product and Engineering Documentation

- **Status:** Approved product baseline; M1 implementation in progress
- **Product names:** AudiLink Studio, AudiLink Books, AudiLink Admin
- **Audience:** Product, design, engineering, AI/ML, operations, trust and safety, finance, and launch partners

## Purpose

This directory is the decision baseline for AudiLink V1. AudiLink is one platform presented through three surfaces:

- **AudiLink Studio** is the creator SaaS for audiobook and serial production, text-to-speech, voice creation, sound-effect generation, transcription, asset management, and the in-product voice and sound marketplace.
- **AudiLink Books** is the reader storefront, library, and player for free and paid audiobooks and serials.
- **AudiLink Admin** is the staff-only operating console for users, moderation, commerce, balances, referrals, models, jobs, payouts, feature controls, and audit.

Studio and Books are separate public applications that launch together. They share identity and platform services but have different navigation, balances, permissions, and user goals. Admin is never a public product mode.

The repository currently implements the first foundation slice: the three responsive product shells, shared TypeScript contracts/tokens, and a schema-first control API with opt-in local fixtures. The roadmap remains authoritative for the production capabilities and launch gates that are not yet implemented.

## Document pack

Read the documents in order for full context. A specialized document may add detail to the PRD, but it must not silently reverse a product decision recorded in the PRD.

| Document | Authority and contents |
|---|---|
| [01 — Product Requirements](01-product-requirements.md) | Product vision, audiences, surface boundaries, V1 scope, journeys, functional and nonfunctional requirements, commercial rules, metrics, launch gates, dependencies, and cross-document traceability. This is the product source of truth. |
| [02 — UX Information Architecture](02-ux-information-architecture.md) | Navigation, page and route inventory, end-to-end interaction states, editor behavior, responsive and touch adaptations, accessibility, motion, and cross-surface switching. This is the experience source of truth. |
| [03 — Platform Architecture](03-platform-architecture.md) | Application and service boundaries, control plane, inference and media workers, data stores, ledgers, workflows, deployment, security boundaries, observability, and architectural decisions. This is the technical topology source of truth. |
| [04 — AI Model Strategy](04-ai-model-strategy.md) | Model candidates, licenses, capability matrix, evaluation protocol, routing and fallback, model lifecycle, local testing, production packaging, safety controls, and launch qualification. This is the model-readiness source of truth. |
| [05 — Plans, Credits, Coins, and Commerce](05-plans-credits-coins-commerce.md) | Plan entitlements, Studio Credit accounting, Reader Coin lots, pricing and transaction semantics, marketplace economics, creator earnings, refunds, chargebacks, and reconciliation. This is the monetary and entitlement source of truth. |
| [06 — Trust, Safety, and Publishing](06-trust-safety-publishing.md) | Voice-consent tiers, prohibited content and identities, rights attestations, provenance, automated and human review, publishing states, reports, takedowns, appeals, privacy, and data-handling controls. This is the safety and publishing-policy source of truth. |
| [07 — Roadmap, Quality, and Acceptance](07-roadmap-quality-acceptance.md) | Delivery sequence, acceptance matrix, model and audio quality gates, test strategy, operational readiness, launch gates, rollout, monitoring, and post-launch criteria. This is the execution and release source of truth. |

## Decision and change discipline

1. Product scope changes begin in the PRD and must identify affected requirement IDs.
2. Specialized documents may choose implementation detail within the PRD constraints. When a detail affects another document, both documents must be updated in the same change.
3. A change to a balance, price, rate, split, entitlement, consent tier, or model must be versioned. It must never retroactively alter a completed transaction or remove an earned entitlement.
4. A launch-blocking unknown remains explicitly marked as a launch gate; it must not be converted into an implicit engineering assumption.
5. Examples, mock prices, and reference screenshots are illustrative unless a document labels them as an approved rule. Fish Audio screenshots are workflow references, not a visual design to reproduce.

## Canonical glossary

The following definitions are normative across product copy, schemas, APIs, analytics, support material, and implementation.

### People, identity, and access

**Account**
The shared authentication identity used across Studio and Books. An account can hold both creator and reader profiles. Admin access is a separate staff authorization attached to an account; signing in does not imply Admin access.

**Creator**
An account holder who uses Studio to create, manage, publish, or sell content. V1 is designed for independent creators.

**Reader**
An account holder who discovers, unlocks, saves, follows, rates, and listens to content in Books.

**Verified creator**
A creator who has completed the identity, payout, rights, and risk checks required for selling or public publishing. Verification does not bypass listing review.

**Seller**
A verified creator with at least one commercial marketplace listing or Books publication. Seller plan status is evaluated and frozen at the time of each transaction for revenue-split purposes.

**Staff operator**
An authorized AudiLink employee or contractor using Admin under a least-privilege role. Every sensitive Admin action requires an actor, time, reason, and auditable before/after record.

**Workspace**
The Studio ownership and billing boundary containing projects, assets, jobs, Studio Credits, and plan entitlements. V1 creates one personal workspace for each creator. A workspace is not the reader's Books library. Team workspaces and seats are deferred.

**Profile**
Public or private presentation data associated with an account, such as creator name, avatar, biography, and reader preferences. A profile is not an authentication identity or payout account.

### Product surfaces

**Studio**
The creator application. Studio owns creation workflows, projects, assets, generation jobs, Studio Credits, creator plan gates, the voice/SFX marketplace, and publishing handoff.

**Books**
The reader application. Books owns discovery of audiobooks and serials, previews, Reader Coin checkout, the reader library, follows, ratings, saves, sharing, playback, and protected offline access.

**Admin**
The staff-only operations application. Admin controls and observes the platform but is not a creator or reader workflow.

**Product switcher**
The shared account control that moves an authenticated user between Studio and Books while preserving identity. It does not merge their navigation or balances.

### Creation and media

**Project**
A private, editable Studio working container. Audiobook projects are finite works organized into chapters; serial projects are ongoing works organized into episodes. A project is not purchasable and is not automatically public.

**Manuscript**
The text source inside an audiobook or serial project. It can be written in Studio or imported, then structured and edited manually or with AI assistance.

**Cast**
The set of voice assets assigned to narration, characters, or individual lines within a project.

**Asset**
A reusable item available to a Studio workspace. Asset types include voice assets, SFX assets, imported audio, generated clips, transcripts, cover artwork, and mastered exports. An asset remains private unless it is deliberately submitted as a listing or publication.

**Voice asset**
A consent-backed voice representation and its metadata, compatible model information, usage restrictions, and provenance. It is not a model, raw model weight, public listing, or downloadable voice package.

**SFX asset**
A sound-effect audio object and its metadata, provenance, license, and versions. An SFX asset may be used in a Studio project. A separately purchased downloadable license may also permit export outside AudiLink.

**Model**
A versioned inference implementation consisting of identified weights, code, configuration, capability metadata, and license evidence. A model generates or transforms content. It is not a voice, asset, listing, or output.

**Model route**
The product-facing quality/capability route that resolves to an approved model version and runtime configuration. Routing may change for future jobs but may not change the recorded provenance of an existing output.

**Model adapter**
The versioned interface that translates AudiLink's canonical job request into one exact model/runtime invocation and returns canonical output, usage, provenance, and error data. An adapter is not a model and cannot authorize a charge, consent scope, or publication.

**Job**
A durable asynchronous unit of work such as speech generation, voice creation, SFX generation, transcription, manuscript analysis, mastering, or export. A job has a quote, state, inputs, pinned route/model version, outputs, balance events, retry history, and terminal result.

**Generation**
The execution of a model-backed job. A generation may produce one or more candidate outputs. The word does not describe a credit charge by itself; charging follows quote, reservation, and settlement rules.

**Output**
The immutable media or data result of a successful job. Editing creates a new version or derived output rather than silently changing the source result.

**Master**
Release-ready audio that can be exported by its creator or submitted for Books publication. A master may be rendered from a Studio timeline or imported by a verified creator as a finished external audiobook through Studio's single-title ingest and review path.

**Imported master**
A finished external audiobook uploaded by a verified creator through Studio for one title. It becomes a versioned Studio asset and must pass the same ownership, rights, provenance, audio-quality, moderation, and publishing checks as a Studio-rendered master. It is not open catalog ingestion and receives no review bypass.

**Provenance**
The traceable record of source, creator, consent, model and version, generation parameters, derivation, and review state for an AI-created or AI-modified asset. Public AI-derived content always carries visible AI provenance.

### Publishing and catalog

**Marketplace**
The Discovery area inside Studio for approved voice and SFX listings. It is not the Books storefront. Reader Coins cannot be spent there.

**Listing**
The searchable commercial wrapper around an approved voice asset, SFX asset, book, or serial release. A listing contains seller, preview, price or free status, license, availability, review state, and version. A listing is not the underlying asset or the buyer's entitlement.

**Voice listing**
An approved in-app-only permission to use a listed voice in Studio generation. Buyers never receive voice weights, embeddings, or a raw clone package.

**SFX listing**
An approved sound listing usable inside Studio through Studio Credits. A seller may additionally offer a distinct fiat-priced downloadable license.

**Book**
A finite published audio work presented as a title with ordered chapters. Unlocks may cover the full title or an explicitly offered chapter.

**Serial**
An ongoing published audio work presented as a title with ordered episodes. Readers can follow a serial and unlock the full available title or individual episodes when offered.

**Release**
An immutable, reviewed publication version derived from a project master. Corrections create a new release version; a live buyer entitlement continues to resolve according to the publishing policy.

**Edition**
The immutable creative and packaging manifest for a version of a book or serial: ordered chapters or episodes, audio artifacts, credits, cover, metadata, and provenance. A public release points to one edition. Changing edition content creates a new edition/release rather than overwriting what an existing order referenced.

**Publication**
The Books catalog object that connects a release, creator, descriptive metadata, previews, prices, rights declarations, review state, and reader-facing listing.

**Offer**
The versioned free or Reader Coin-priced scope a reader may acquire, such as a complete title, season/volume, chapter, episode, or remaining-content bundle. An offer is not an entitlement until a successful order grants it.

**Preview**
A free listening allowance that does not create a paid entitlement. A preview may be a fixed excerpt or a timed portion configured under publishing rules.

**Delist**
Remove a listing from new discovery or acquisition. Ordinary delisting does not revoke previously purchased reader entitlements.

**Suspend**
Temporarily block use, sale, publishing, or payout while a safety, rights, fraud, or operational issue is investigated. Suspension is not a final deletion.

### Balances, commerce, and rights

**Plan**
A versioned Studio subscription tier defining included Studio Credits and feature limits. Provisional V1 tiers are Free, Creator, and Pro. Prices and limits remain Admin-configurable until approved for launch.

**Wallet**
The user-facing view of one balance domain and its history. Studio has a workspace Studio Credit wallet; Books has a personal Reader Coin wallet. A wallet is not a mutable balance field and never combines Credits, Coins, or fiat.

**Ledger**
The append-only double-entry accounting record from which balances, obligations, earnings, and reconciliation are derived. Posted entries are corrected through compensating entries, not edited or deleted.

**Balance**
The amount derived from valid ledger entries for one owner, unit, and availability state at a point in time. Displayed or cached balances are not the accounting source of truth.

**Lot**
A traceable issuance group of Studio Credits or Reader Coins with a source, quantity, time, restrictions, and any permitted expiry. Settlement records which lots were consumed so a reversal can restore their original characteristics.

**Entitlement**
The authoritative, ledger-backed right of an account or workspace to use a feature, asset, license, book, chapter, or episode. A receipt or displayed balance is evidence of a transaction; the entitlement is the access decision.

**Feature gate**
A plan- or policy-based capability decision, such as maximum input length, concurrency, model tier, storage, voice capacity, or publishing eligibility. A feature gate does not debit Studio Credits. The WAV, MP3, and chapter-aware M4B core exports remain available on every V1 plan.

**Studio Credit**
A non-cash Studio consumption unit used for model and compute-backed work, including in-app use of marketplace voices and SFX. Studio Credits are held by a Studio workspace, never become Reader Coins, and cannot be paid out to a creator. Included, purchased, and granted Studio Credits all roll over. After a paid plan ends, remaining credits stay in the workspace, but Free-plan feature and concurrency gates apply.

**Rate card**
The versioned rules that convert an eligible Studio action and its measured usage into a Credit quote and settlement, including model-route multipliers and Marketplace surcharges. A job records the effective rate-card version.

**Credit quote**
The versioned estimate shown before a chargeable job. It identifies inputs, route, rate-card version, maximum reservation, and circumstances that can change the final settlement.

**Credit reservation**
A temporary hold that prevents the quoted maximum Studio Credits from being spent twice while a job runs. A reservation is not final consumption.

**Credit settlement**
The final Studio Credit debit after successful work, based on the approved rate rule and actual billable output. Unused reserved credits are released.

**Credit refund or release**
The ledger event returning a settled debit or removing a reservation after failure, cancellation, duplicate execution, or approved support correction. Balances are never repaired by overwriting history.

**Reader Coin**
A Books-only, non-transferable purchase unit used to permanently unlock an offered book, chapter, or episode. Reader Coins cannot fund Studio jobs, Marketplace use, seller payouts, or cash withdrawal.

**Purchased Coin lot**
Reader Coins acquired with fiat. Purchased Coin lots do not expire.

**Reader Coin pack**
A fiat-priced product that issues one or more purchased Reader Coin lots after confirmed payment. Buying a pack does not itself unlock a book.

**Promotional Coin lot**
Reader Coins issued through an approved referral campaign or Admin grant. Promotional lots may expire under the terms displayed at grant time and are spent before purchased lots. V1 has no rewarded-ad or social-task Coin programs.

**Referral reward**
A promotional Reader Coin grant issued only after the versioned referral rules and anti-abuse checks are satisfied. It is not fiat earnings, an affiliate commission, or a social-task reward.

**Permanent unlock**
A Books entitlement created by a completed Coin transaction. It does not expire and survives ordinary delisting, plan changes, and price changes. Access may only be constrained when required by law, a substantiated rights order, fraud remediation, or account security action, with support handling defined by policy.

**Fiat**
Government-issued money handled by a payment or payout provider. In V1, readers may use fiat to acquire Reader Coin packs but unlock paid Books content with Reader Coins; there is no direct fiat book checkout. Fiat also funds Studio plans and Credit packs and eligible standalone SFX licenses. Fiat customer charges, fiat seller earnings, Studio Credits, and Reader Coins are four distinct accounting concepts.

**Creator earnings**
A fiat-denominated payable amount credited to a seller after an eligible transaction and subject to refund, chargeback, reserve, tax, and payout rules. Creator earnings are never stored as Studio Credits or Reader Coins.

**Royalty accrual**
The fiat-denominated creator obligation calculated from an eligible Marketplace use or Books unlock before it becomes available for payout. It records the applicable listing/publication, net basis, settlement-value version, seller plan, and frozen split.

**Net transaction proceeds**
The transaction base to which the creator/platform split applies after the deductions defined in the commerce specification, such as included taxes, payment processing, refunds, and chargebacks. The exact net calculation is recorded with the transaction.

**Creator/platform split**
The frozen allocation of net transaction proceeds. A Free-plan seller receives 40% and AudiLink receives 60%; a seller with an active paid Studio plan receives 80% and AudiLink receives 20%. The qualifying plan and split are captured at transaction time and never recomputed retroactively.

**Payout**
The transfer of available creator earnings to a verified seller through the approved payout provider. A payout does not change Studio Credit or Reader Coin balances.

**Order**
The immutable commercial record of an acquisition. It identifies buyer, seller where applicable, offer/listing version, instrument, price or Coin amount, tax/provider references, frozen split, and resulting entitlement. An order is not the entitlement itself.

**Transaction**
A committed business event such as a Coin pack purchase, Coin redemption, Studio usage settlement, SFX fiat purchase, refund, chargeback, earning accrual, or payout. One transaction may create several balanced ledger entries and one or more entitlements.

**In-app license**
An entitlement to use an approved Marketplace asset inside Studio under its stated terms. It does not grant access to voice weights or a general-purpose file download.

**Downloadable SFX license**
A separately priced fiat license that permits the buyer to download an SFX file and use it outside AudiLink under the displayed terms. It is distinct from Studio Credit-funded in-app use.

**Commercial rights**
The permitted commercial use of a creator's generated output. All Studio plans permit commercial use, subject to the creator owning or licensing all inputs and AudiLink having confirmed the upstream model and asset terms for that route. A plan cannot grant rights that AudiLink or the creator does not possess.

### Safety and reader behavior

**Consent evidence**
The retained proof that a real person's voice may be captured, cloned, used, or listed for the requested purpose. Evidence is tiered by risk and can include identity verification, liveness, prescribed recordings, signed grants, and rightsholder documentation.

**Public figure**
A person treated as publicly prominent under the operational safety policy. V1 prohibits cloning, intentionally designing toward, or listing public-figure voices even when a submitter claims consent.

**Minor voice**
A voice belonging to, cloning, or intentionally designed to imitate a person under the applicable age of majority. V1 prohibits minor identity targeting and listing.

**Automated review**
Machine-assisted screening for policy, rights, identity, quality, and provenance signals. It never makes public or monetized content live by itself.

**Human approval**
A recorded decision by an authorized reviewer after required automated checks. Every public or monetized voice, SFX, book, serial, chapter, or episode requires both automated screening and human approval.

**Rating**
A reader's title-level score after qualifying listening or entitlement. It is not a comment or social post.

**Save**
A private reader bookmark for later discovery. Saving does not create an entitlement.

**Follow**
A subscription to release notifications for a creator or serial. It is not a paid subscription.

**Share**
A link to public Books metadata or an eligible preview. Sharing never exposes protected paid audio.

**Protected offline copy**
An app-managed, access-controlled cache used by the Books PWA for entitled playback without a network connection. It is not a user-exportable paid media file.

## Explicit V1 terminology constraints

- Say **Studio Credits**, never just “credits,” when a Books context could be confused.
- Say **Reader Coins**, never “credits,” “tokens,” or “earnings.”
- Say **creator earnings** or **fiat payout**, never “Coin payout” or “Credit cash-out.”
- Say **voice asset** for a usable voice and **model** for inference software and weights.
- Say **listing** for an offer, **asset** for the underlying creator object, and **entitlement** for the buyer's acquired right.
- Say **book chapter** and **serial episode** unless a commercial offer intentionally groups them.
- Say **AI-assisted and manually editable**; AudiLink does not promise fully autonomous publishing.
- Say **Beta language** only after that language has passed the documented benchmark and is visibly labeled. English is the only GA launch language.
