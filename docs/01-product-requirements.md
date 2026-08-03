# AudiLink V1 Product Requirements

- **Status:** Approved pre-build baseline
- **Working product names:** AudiLink Studio, AudiLink Books, AudiLink Admin
- **Launch posture:** Studio and Books co-launch; Admin is staff-only
- **Primary audience:** Independent creators and global, English-first listeners

## 1. Executive summary

AudiLink is an audio creation and listening platform built around three connected surfaces:

1. **AudiLink Studio** gives independent creators a mobile-complete production environment for AI-assisted and manually controlled audiobook and serial creation, text-to-speech, voice creation, sound-effect generation, standalone transcription, asset management, and an in-product voice/SFX marketplace.
2. **AudiLink Books** gives readers a storefront, permanent unlock library, and protected offline player for free and paid audiobooks and serials.
3. **AudiLink Admin** gives authorized staff the operational controls required to run models, jobs, balances, commerce, publishing, moderation, referrals, payouts, and support safely.

The product is not a one-click autonomous publisher. AI accelerates manuscript structuring, casting, speech, sound, transcription, and mastering, while the creator retains line-level editing, regeneration, timing, and approval control. Studio and Books are separate public applications with a shared account and product switcher. The Studio Marketplace remains part of Studio; Books is a distinct reader experience.

V1 launches globally where legal, payment, payout, model-license, and content-rights requirements have been cleared. The interface and primary support experience are English-first. English audio generation is General Availability. A non-English language may appear only as visibly labeled Beta after it passes the approved language benchmark.

## 2. Vision, promise, and product principles

### 2.1 Vision

Enable an independent creator to turn a written story into expressive, multi-character, release-ready audio, publish it, and reach paying listeners without assembling a traditional studio or losing editorial control.

### 2.2 Product promise

- **For creators:** Move from manuscript to controlled, high-quality audio in one coherent workspace.
- **For voice and sound creators:** Safely list approved voices or SFX and earn fiat income from eligible use.
- **For readers:** Discover, permanently unlock, and listen to original audio stories across devices, including protected offline playback.
- **For operators:** Understand and control every material job, model, balance event, listing, publication, report, and payout.

### 2.3 Principles

1. **AI-assisted, creator-controlled.** Every AI suggestion is inspectable and manually editable. Regeneration is scoped so approved work is not unexpectedly replaced.
2. **Audio is the primary medium.** Waveforms, auditioning, timing, continuity, pronunciation, loudness, and listening state receive first-class treatment.
3. **Original experience, not a visual clone.** Reference screenshots inform workflow coverage only. AudiLink uses a cinematic, precise visual language with purposeful motion and an original information hierarchy.
4. **Mobile is a complete creation surface.** V1 does not ship a read-only or reduced mobile editor. Dense desktop workflows adapt into touch-safe, focused mobile modes.
5. **Rights precede reach.** Consent, upstream licenses, content rights, and provenance must be established before public distribution or monetization.
6. **Balances have one meaning each.** Studio Credits, Reader Coins, and fiat creator earnings never substitute for or convert into one another.
7. **Transactions are immutable facts.** Rates, seller plan status, splits, entitlements, and provenance are frozen at the relevant transaction or job boundary.
8. **Failure is recoverable.** Long-running work is durable, visible, retryable where safe, and financially reconciled.

## 3. Goals and non-goals

### 3.1 V1 goals

- Let a creator write or import a manuscript, structure it into a book or serial, identify and cast narration and characters, generate and regenerate individual lines, place SFX on a timeline, master the result, export it, and submit it to Books.
- Let a verified creator bring one finished external audiobook through Studio's controlled ingest path and submit it without bypassing rights, provenance, audio-quality, or publishing review.
- Provide standalone TTS, Voice Lab, SFX generation, and transcription workflows that feed a reusable Studio asset library.
- Support a reviewed Studio Marketplace for free or royalty-bearing in-app voices and SFX, plus fiat downloadable SFX licenses.
- Let verified creators publish and sell approved audiobooks and serials in Books.
- Let readers explore free content and timed previews, buy Reader Coins, permanently unlock eligible titles, chapters, or episodes, and listen online or through protected PWA offline access.
- Preserve a reliable financial boundary between Studio consumption, Books purchases, and creator payouts.
- Give staff enough Admin control to launch without database intervention for routine operations.
- Establish model, quality, safety, accessibility, reliability, and commercial launch gates before public availability.

### 3.2 V1 non-goals

The following are explicitly deferred:

- Teams, seats, shared workspaces, and real-time multi-user editing
- Public developer API, third-party API keys, webhooks for customers, and an external SDK
- Native iOS, Android, Windows, or macOS applications; V1 uses responsive web applications and a Books PWA
- Audio separation and stem extraction
- Voice changer or live voice conversion
- Social feeds, public comments, direct messages, creator-reader chat, or community groups
- Rewarded advertisements, social-task rewards, or other engagement-for-Coin schemes
- Voice cloning, designed imitation, or voice listing that targets a public figure or minor
- Raw download of paid Books audio by readers
- General-purpose digital rights management for files distributed outside AudiLink
- External publisher bulk ingestion, RSS distribution, podcast hosting, and third-party storefront syndication
- Full digital audio workstation parity, live recording sessions, or arbitrary plugin hosting
- AI-generated books that can publish without creator review, rights attestation, and required human approval
- Guaranteed GA support for any language other than English

## 4. Audiences and jobs to be done

### 4.1 Independent story creator

Examples include authors, narrators, small publishers, audio dramatists, educators, and serial storytellers operating without an enterprise production team.

Primary jobs:

- Turn existing writing into a castable script without losing the original text.
- Create consistent narration and character voices.
- Correct one line, pronunciation, emotion, pause, or timing without rerendering an entire chapter.
- Add atmosphere and effects without leaving the project.
- understand the Studio Credit cost before generation.
- Export a usable master or submit a reviewed release to Books.
- Track publishing status, earnings, and reader response.

### 4.2 Voice or SFX creator

Primary jobs:

- Create or upload an asset with accurate rights and provenance.
- Keep it private or submit it for public Marketplace review.
- Define permitted use and whether an SFX has an external downloadable license.
- See usage, transaction status, holds, refunds, and fiat earnings.
- Respond to verification, moderation, or rights requests.

### 4.3 Reader

Primary jobs:

- Find a book or serial by creator, category, voice, language, length, price, or release status.
- Preview before spending Reader Coins.
- Permanently unlock a full title, chapter, or episode when offered.
- Resume listening across sessions and use a protected offline copy.
- Save titles, follow creators or serials, rate eligible content, and share public links or previews.
- Understand Coin balance, expiry, receipts, and permanent entitlements.

### 4.4 Staff operator

Primary jobs:

- Review consent, rights, safety, quality, listings, and publications.
- Resolve job, balance, entitlement, refund, chargeback, and payout issues without editing records directly.
- Change a future plan, rate card, referral campaign, model route, or feature flag with versioning and audit.
- Stop unsafe content or a failing model quickly.
- Investigate a user or transaction through a complete event trail.

## 5. Product surface model

### 5.1 Shared identity and boundaries

- One account signs a person into Studio and Books.
- Every creator receives one personal Studio workspace in V1.
- Studio owns projects, assets, generation history, Marketplace access, plan entitlements, and Studio Credits.
- Books owns Reader Coins, reader purchases, library entitlements, listening progress, offline copies, ratings, saves, follows, and shares.
- Creator fiat earnings and payouts are commerce-ledger records, not a balance displayed as Credits or Coins.
- A shared product switcher links Studio and Books. It must never imply that balances or navigation are shared.
- Admin is on a separately authorized staff surface with mandatory multi-factor authentication and role-based access.

### 5.2 AudiLink Studio

Required top-level capabilities:

- Home and onboarding
- Projects: audiobooks and serials
- Story editor and timeline
- Text to Speech
- Voice Lab
- Sound Effects
- Transcription
- Asset library and generation history
- Marketplace / Discovery
- Publish and releases
- Plan, Studio Credits, usage, and creator earnings
- Account and workspace settings

### 5.3 AudiLink Books

Required top-level capabilities:

- Home and editorial discovery
- Search and browse
- Book and serial detail
- Free and timed previews
- Reader Coin checkout and receipts
- Library, saves, and follows
- Online and protected offline player
- Ratings and sharing
- Creator pages
- Reader Coin wallet and account settings

### 5.4 AudiLink Admin

Required top-level capabilities:

- Operational overview and alerts
- Accounts, creators, verification, and workspaces
- Consent, rights, moderation, reports, appeals, and takedowns
- Listings, publications, releases, and catalog
- Plans, feature gates, Studio Credits, Reader Coins, referrals, and grants
- Orders, refunds, chargebacks, creator earnings, reserves, and payouts
- Model registry, routes, evaluations, and kill switches
- Jobs, queues, retries, media, and incident controls
- Feature flags, configuration, staff roles, and audit

The route and interaction inventory is defined in [02 — UX Information Architecture](02-ux-information-architecture.md).

## 6. V1 functional requirements

Requirement IDs are stable traceability keys. A requirement can be refined in another document but must not be removed or weakened without updating this PRD.

### 6.1 Shared account and platform behavior

**SHR-01 — Shared account**
Users must be able to register, authenticate, recover access, verify email, manage sessions, and use the same account in Studio and Books. Reader and creator profile data may differ.

**SHR-02 — Explicit product switching**
Authenticated users must be able to switch between Studio and Books from a persistent account control. The destination must preserve the intended deep link when authorized and otherwise open the destination home.

**SHR-03 — Balance separation**
Every balance display and transaction must identify Studio Credits, Reader Coins, or fiat creator earnings by full name, unit, ledger, and surface. Cross-balance conversion is prohibited.

**SHR-04 — Notifications**
The platform must deliver in-product notifications for job completion or failure, publishing and moderation decisions, release availability, expiring promotional Coins, refunds, payout events, and material account-security events. Email is required for security, rights, payout, and final moderation notices. Marketing messages require separate consent.

**SHR-05 — Durable activity history**
Users must have human-readable histories for Studio jobs and Credit events, Books Coin events and unlocks, Marketplace transactions, publishing decisions, and creator earnings. Support-visible identifiers must map to immutable records.

**SHR-06 — Provenance display**
AI-generated or materially AI-modified public audio must always disclose AI provenance. The disclosure must remain present on Marketplace listings, Books detail pages, and relevant player or credits views.

### 6.2 Studio onboarding and asset foundation

**STU-01 — Personal workspace**
The first Studio visit creates or resumes a personal workspace, shows the provisional Free plan, and separates creation setup from seller verification.

**STU-02 — Guided activation**
Onboarding must let a creator choose a first task: create speech, create a voice, generate an SFX, transcribe audio, or start/import a story. It must state when an action will consume Studio Credits.

**STU-03 — Asset library**
Studio must organize voices, SFX, generated clips, imported audio, transcripts, covers, and masters with type, source, ownership, provenance, creation time, project use, review state, and version.

**STU-04 — Generation history**
Creators must be able to filter jobs by feature, project, state, model route, time, and cost; audition successful outputs; inspect quote and settlement; retry eligible failures; and find released reservations or refunds.

### 6.3 Audiobook and serial production

**PRJ-01 — Project types**
A creator must choose audiobook or serial at project creation. Audiobooks contain ordered chapters. Serials contain ordered episodes and can accept later releases. Conversion between types is not supported after the first publication.

**PRJ-02 — Write and import**
Creators must be able to write and paste text directly and import UTF-8 plain-text or DOCX manuscripts. Import must preserve the source as a recoverable version. PDF, scanned/OCR, EPUB, and bulk catalog import are deferred.

**PRJ-03 — AI-assisted structure**
Studio must offer suggestions for title metadata, chapter or episode boundaries, narration/dialogue segmentation, likely speakers, pronunciation candidates, and expressive tags. Suggestions must be reviewable, individually applicable, undoable, and manually replaceable. No suggestion may silently alter the preserved source manuscript.

**PRJ-04 — Manual structure and cast**
Creators must be able to add, remove, rename, reorder, and split chapters/episodes and lines; create character roles; and assign owned or licensed voice assets at project, role, scene, or line level.

**PRJ-05 — Line-level speech controls**
Each speech block must support editable text, speaker, language, pronunciation overrides, pause/timing, supported expressive controls, model route, and generation state. Unsupported controls must be hidden or rejected before a charge.

**PRJ-06 — Scoped generation and regeneration**
Creators must be able to generate a selection, scene, chapter/episode, or queued batch. Regeneration of one block creates a new candidate and leaves the accepted candidate and downstream work intact until the creator explicitly replaces it.

**PRJ-07 — Audition and candidate choice**
Generated candidates must be auditionable in context. The selected take, rejected takes, generation provenance, and cost must remain inspectable. Deleting a candidate used in a published release is prohibited.

**PRJ-08 — Timeline**
Every project must have a synchronized timeline for ordered speech and SFX/ambience placement. Creators must be able to trim eligible clips, move and snap items, set fades and gain, control overlaps, inspect duration, zoom, and play from a selected point.

**PRJ-09 — Mobile-complete editing**
Every desktop production capability in PRJ-02 through PRJ-08 must have an adaptive touch workflow. Mobile may use focused panels, drawers, paged timelines, and selection modes, but it may not become view-only or omit a V1 edit.

**PRJ-10 — Autosave and version recovery**
Text, cast, timeline, settings, and accepted takes must autosave with visible status. A creator must be able to restore a recent project version after an accidental destructive edit. Offline Studio editing is not promised; connection loss must preserve local unsynced work until reconnection or explicit export.

**PRJ-11 — Mastering**
Studio must render a preview master and a final master using the accepted timeline, with consistent loudness, clipping protection, chapter/episode boundaries, and recorded mastering settings. Quality thresholds and reference measurements are specified in [07 — Roadmap, Quality, and Acceptance](07-roadmap-quality-acceptance.md).

**PRJ-12 — Export**
Creators must be able to export chapter/episode or full-project WAV and MP3 files and a chapter-aware M4B for complete audiobook projects. These core formats remain available on Free, Creator, and Pro; plans may still gate model quality, batch size, concurrency, storage, and other capacity. A chargeable master/export job shows its own Credit quote. Every export records source project version and provenance.

**PRJ-13 — Publish handoff**
An eligible master can be submitted from Studio to Books with catalog metadata, cover, credits, pricing, preview, rights attestations, and AI disclosure. A verified creator may upload one finished external audiobook through Studio; Studio must validate the media, capture ownership and provenance, create a versioned imported-master asset, and apply the same quality and publishing review as a Studio-rendered master. V1 public publishing always passes through Studio and review. Open or bulk publisher catalog ingestion, RSS ingestion, and any bypass around Studio are deferred.

### 6.4 Standalone Text to Speech

**TTS-01 — Expressive synthesis**
Creators must be able to enter or paste text, select one or more eligible voices, divide text into speaker blocks, apply model-supported expressive controls, preview the Credit quote, and generate speech.

**TTS-02 — Transparent capability controls**
The UI must expose product-facing capability and quality/speed choices rather than requiring knowledge of raw model names. Advanced provenance may show the resolved model after generation.

**TTS-03 — Results and reuse**
Successful candidates must support audition, comparison, renaming, download subject to plan, saving to the asset library, and insertion into an eligible project.

**TTS-04 — Limits**
Text length, batch size, concurrency, output quality, private asset capacity, and export permissions are plan or route gates shown before generation.

### 6.5 Voice Lab

**VOC-01 — Voice creation modes**
Voice Lab must support approved synthetic voice design and consented real-person voice creation where a qualified model route exists. Availability is capability-, language-, risk-, and plan-gated.

**VOC-02 — Consent tiers**
Real-person voices require tiered evidence:

- Synthetic designs that do not imitate an identifiable real person require provenance and similarity screening.
- A private self-voice requires account identity verification, liveness or prescribed capture, and an explicit permitted-use grant.
- A third-party or professional voice requires verification of the voice owner and submitter, an explicit contractual grant covering intended uses, and enhanced human review.
- Public Marketplace eligibility always requires automated checks and human approval.

Public-figure or minor identity targeting—by clone, designed imitation, or listing—is prohibited in V1 at every tier.

**VOC-03 — Capture quality**
The workflow must accept supported recording or upload inputs, perform preflight checks, explain correctable issues, and avoid charging the creation job until mandatory inputs pass validation.

**VOC-04 — Privacy and visibility**
New real-person voice assets are private by default. A private voice cannot become discoverable through a share link. Marketplace submission is a separate, explicit reviewed action.

**VOC-05 — Voice use constraints**
Each voice must carry allowed languages, compatible routes, consent scope, commercial restrictions, listing state, and revocation/suspension status. Jobs must enforce these controls before reserving Credits.

**VOC-06 — No voice export**
Voice weights, embeddings, clone packages, and clean reference recordings must never be exposed to Marketplace users. Listing access authorizes in-app synthesis only.

The evidence, similarity, review, takedown, and appeal rules are normative in [06 — Trust, Safety, and Publishing](06-trust-safety-publishing.md).

### 6.6 Sound Effects

**SFX-01 — Prompted generation**
Creators must be able to describe an SFX, choose supported duration and variation controls, receive a Credit quote, generate candidates, and audition them without leaving the page.

**SFX-02 — Asset use**
An owned or licensed SFX can be saved, tagged, trimmed where permitted, inserted into a project timeline, and traced to its source and license.

**SFX-03 — Discovery**
Marketplace SFX must be searchable and filterable by category, duration, license, price mode, creator, and recency/popularity signals that are resistant to self-inflation.

**SFX-04 — Export boundary**
Studio Credit-funded in-app use does not automatically grant a standalone file license. An SFX can be downloaded for external use only when the creator owns it or has acquired the separately displayed fiat downloadable license and the plan permits export.

### 6.7 Standalone transcription

**TRN-01 — Transcription job**
Creators must be able to upload a supported audio/video file or select an owned audio asset, choose an approved language, receive a Credit quote, and run a standalone transcription job.

**TRN-02 — Transcript outputs**
Successful jobs must provide editable timestamped text and export to TXT, SRT, and VTT. Speaker labels may be suggested where the route supports them but remain manually editable.

**TRN-03 — Reuse and provenance**
A transcript can be stored as an asset or copied into a project manuscript. It must retain its source media, route/model version, and edit history.

Audio separation and voice changing are not part of this workflow or V1.

### 6.8 Jobs and Studio Credit behavior

**JOB-01 — Estimate before work**
Every chargeable job must show a Credit quote before confirmation. The quote identifies the feature, rate-card version, billable basis, expected output, maximum reservation, plan gate, and material variables.

**JOB-02 — Reserve, settle, release**
On confirmation, Studio reserves at most the quoted maximum. Successful work settles only the approved billable amount and releases the remainder. A terminal technical or policy failure settles no generation charge and releases the reservation. A user cancellation settles only explicitly disclosed completed billable work.

**JOB-03 — Durable states**
Jobs use durable states including draft, quoted, blocked, queued, running, awaiting user action, succeeded, failed, cancelled, and expired. A state transition, retry, output, and balance event must be idempotent and auditable.

**JOB-04 — Progress and control**
The UI must show queue/running state, meaningful progress or phase, safe cancellation availability, and expected next action. Navigating away must not lose a running job.

**JOB-05 — Retry semantics**
System retry must not create a second charge or duplicated accepted output. A user-requested new generation requires a new quote and job.

**JOB-06 — Cancellation and plan change**
All Studio Credits roll over. Remaining Credits stay in the workspace after subscription cancellation or downgrade, while current Free-plan feature, batch-size, route, concurrency, and storage gates apply. Core export formats and previously granted lawful commercial-use rights remain available.

### 6.9 Studio Marketplace

**MKT-01 — Marketplace location**
Voice and SFX Discovery is part of Studio. Books navigation and Reader Coins must not appear as Marketplace purchase methods.

**MKT-02 — Seller eligibility**
Any verified creator may submit an eligible voice or SFX. Selling requires payout readiness and all applicable identity, consent, rights, tax, and risk checks.

**MKT-03 — Listing lifecycle**
Listings move through draft, submitted, automated review, human review, approved/scheduled, live, changes requested, suspended, delisted, or rejected states. Material changes to identity, source, voice representation, audio, license, or price require a new review/version.

**MKT-04 — Voice use**
An approved voice listing provides in-app synthesis access only. Each use consumes Studio Credits under the shown quote. Free listings have no creator royalty component; royalty-bearing listings include the versioned creator-use component in the quote. Buyers never download voice weights or clone artifacts.

**MKT-05 — SFX use**
An approved SFX can be offered free or royalty-bearing for in-app Studio use funded by Studio Credits. The seller may separately offer a fiat downloadable license with explicit external-use terms.

**MKT-06 — Earnings**
Eligible Marketplace use produces a fiat-denominated creator earning under the transaction's frozen rate, net calculation, and seller split. Users cannot cash out Studio Credits, and sellers never receive buyer Credits.

**MKT-07 — Preview safety**
Previews must be sufficient to evaluate an asset but protected against exposing voice reference material, clone reconstruction inputs, or an unlicensed high-quality SFX file.

**MKT-08 — Reporting and continuity**
Users can report a listing or output derived from it. Suspension blocks new use. Existing project and commercial-use handling follows the frozen license and legal/takedown policy rather than silently removing an asset.

### 6.10 Books publishing and catalog

**PUB-01 — Verified publishing**
Any verified creator can submit an eligible book or serial release. A paid Studio plan is not required to sell.

**PUB-02 — Required submission**
A submission must include an eligible Studio-rendered or Studio-ingested master, title, description, creator and contributor credits, category, language, cover, content advisories, AI provenance, rights attestations, free/paid choice, offered unlock units, Coin prices where paid, and preview configuration.

**PUB-03 — Review**
All public Books publications, whether free or paid, require automated screening and human approval before going live. A reviewer must be able to audition the master, inspect provenance and rights evidence, and request changes without destroying the submitted version.

**PUB-04 — Books and serials**
A book is a finite title with ordered chapters. A serial is an ongoing title with ordered episodes and follow notifications. New serial episodes are separately reviewed releases under the existing title.

**PUB-05 — Versioning**
Published audio and commercial terms are immutable per release/transaction. Corrections create a new release version. Existing entitlements must resolve to an allowed version according to the publishing and rights policy.

**PUB-06 — Delisting**
Ordinary creator delisting prevents new unlocks but does not expire purchased entitlements. Legal, safety, fraud, or rights orders may suspend delivery under the documented exception and support-remedy process.

### 6.11 Books discovery, purchase, library, and player

**BKS-01 — Discovery**
Readers must be able to browse editorial collections and search/filter public books and serials by title, creator, category, language status, free/paid, format, duration, completion status, and release recency.

**BKS-02 — Detail and trust**
A title page must show description, creator, contributors, book/serial status, chapter/episode list, duration, language and GA/Beta label, content advisories, AI provenance, rating summary, price options, preview, and license/access terms.

**BKS-03 — Free and timed previews**
Publishers can designate content as free and configure an approved fixed or timed preview. Preview listening does not create a paid entitlement and may not expose the entire paid unit.

**BKS-04 — Reader Coin checkout**
Paid offers use Reader Coins only. Before confirmation, Books must show the exact title/chapter/episode being unlocked, Coin price, available lots, any expiring promotional amount, and resulting balance.

**BKS-05 — Coin lots and spend order**
Purchased Coin lots never expire. Promotional Coins come only from approved referral programs or Admin grants, may expire under displayed terms, and are spent before purchased lots. Within the same class, the earliest-expiring eligible lot is spent first.

**BKS-06 — Permanent entitlement**
A successful unlock creates a permanent, non-transferable library entitlement to the specified title, chapter, or episode. It survives ordinary delisting, seller plan changes, later price changes, and Coin expiry.

**BKS-07 — Library**
The library must distinguish owned/unlocked content, free content added by the reader, downloaded/offline items, in-progress titles, completed titles, saved items, and followed creators/serials.

**BKS-08 — Playback**
The player must support play/pause, seek, previous/next chapter or episode, playback speed, volume, sleep timer, chapter list, progress synchronization, resume, and accessible keyboard/touch controls. Progress must reconcile deterministically across devices.

**BKS-09 — Protected offline PWA**
An entitled reader can save eligible paid audio into an access-controlled, app-managed offline cache. The app must revalidate entitlement when practical, handle storage limits and expiry of the cache lease gracefully, and restore playback position. It must not expose a raw paid file.

**BKS-10 — Ratings, saves, follows, shares**
Eligible readers can submit one mutable rating per title after the configured listening threshold, privately save a title, follow a creator or serial, and share a public detail or preview link. Comments, DMs, and social feeds are absent.

**BKS-11 — Serial updates**
Followers receive an in-product notification for an approved new episode. A new paid episode is not automatically unlocked unless it is covered by an explicit previously purchased offer.

**BKS-12 — Receipts and support**
Readers can inspect Coin purchase receipts, unlock transactions, promotional grants/expiry, refunds, and entitlement status, and can reference a transaction in a support request.

### 6.12 Plans and commercial rights

**PLN-01 — Provisional plans**
Studio launches with Admin-configurable Free, Creator, and Pro plan definitions. Exact public prices, included Credit quantities, concurrency, feature limits, and promotional offers are provisional until commercial approval.

**PLN-02 — Versioned gates**
Plan rules must be versioned with effective dates. A UI must explain both the Credit requirement and any feature gate before an action.

**PLN-03 — Commercial output rights**
All plans may use eligible generated outputs commercially, subject to the creator's rights in all inputs and AudiLink's verified upstream model and asset licenses. A route or asset without commercial clearance must not be offered as commercially usable.

**PLN-04 — Seller split**
For each eligible transaction, the creator/platform split of net transaction proceeds is frozen using the seller's active Studio plan at transaction time:

- Free seller: 40% creator / 60% AudiLink
- Active Creator or Pro seller: 80% creator / 20% AudiLink

Later plan changes do not recompute a completed transaction.

**PLN-05 — Fiat earnings**
Marketplace and Books seller earnings accrue in fiat under the commerce ledger. Reader Coin use and Studio Credit use must be translated to the transaction's recorded monetized basis without transferring Coins or Credits to the seller.

Detailed rates, lot ordering, net proceeds, refunds, reserves, chargebacks, and reconciliation are controlled by [05 — Plans, Credits, Coins, and Commerce](05-plans-credits-coins-commerce.md).

## 7. Core end-to-end journeys

### 7.1 First useful Studio output

1. A user creates an account and enters Studio.
2. Studio creates a personal workspace and shows Free-plan capabilities and Studio Credit balance.
3. The user chooses TTS, Voice Lab, SFX, transcription, or a story starter.
4. Inputs are validated before a charge.
5. Studio shows the Credit quote and any plan gate.
6. Confirmation creates a reservation and durable job.
7. The user can leave the page and receives completion or failure status.
8. On success, Studio settles actual cost, releases unused reservation, and saves the output as an asset.
9. On failure, Studio releases or refunds the charge and offers a safe next step.

### 7.2 Manuscript to mastered chapter

1. The creator starts an audiobook or serial and writes, pastes, or imports a manuscript.
2. Studio preserves the source and proposes structure, speakers, and expressive cues.
3. The creator accepts or edits suggestions, builds a cast, and assigns voices.
4. Studio quotes a selected generation scope.
5. The creator generates speech, auditions candidates, and regenerates only deficient lines.
6. The creator places SFX, adjusts timing and gain, and plays the timeline in context.
7. Studio renders a mastered preview and identifies blocking quality issues.
8. The creator exports or continues to publishing.

### 7.3 Create and publish a voice

1. The creator chooses synthetic design, self-voice, or eligible third-party/professional voice.
2. Studio explains the required consent tier, use limits, and evidence before capture.
3. Inputs pass identity, liveness/capture, quality, similarity, and policy checks.
4. The private voice is created and tested.
5. The verified creator submits a Marketplace listing with rights, price mode, metadata, and previews.
6. Automated screening and a human review occur.
7. If approved, the voice becomes in-app-only and visibly AI-provenanced.
8. Eligible settled use creates auditable fiat seller earnings under the frozen split.

### 7.4 Discover and use a Marketplace asset

1. A creator searches Marketplace and auditions a protected preview.
2. Studio shows license, permitted use, provenance, seller, language/route support, and expected Credit charge.
3. The creator acquires or selects the in-app entitlement and inserts the asset into TTS or a project.
4. The job quote includes compute and any royalty-bearing component.
5. Settlement records buyer usage, asset/listing version, license, seller split, and earnings.
6. For an SFX external download, checkout uses fiat and issues a separate downloadable license entitlement.

### 7.5 Publish a book or serial

1. The verified creator selects an eligible Studio-rendered master or imports one finished external audiobook through Studio, then chooses audiobook or serial publication.
2. The creator completes metadata, cover, content advisories, preview, AI disclosure, rights, offered units, and Coin pricing.
3. Studio validates audio, missing rights, and payout readiness.
4. Automated review runs, followed by human approval.
5. Approved content is scheduled or published in Books as an immutable release.
6. The creator sees listing state, unlocks, refunds, and fiat earnings.
7. A serial creator repeats review for each new episode.

### 7.6 Preview, unlock, and listen

1. A reader finds a title and reviews metadata, advisories, AI disclosure, rating, and preview.
2. The reader chooses a full title, chapter, or episode offer.
3. Books displays the Reader Coin cost and spend composition.
4. Confirmation atomically spends eligible Coin lots and grants a permanent entitlement.
5. The title appears in the library and plays immediately.
6. The reader can save an access-controlled offline copy in the Books PWA.
7. Progress syncs across sessions; the reader can later rate, follow, save, or share.

### 7.7 Moderation and financial correction

1. A report, automated flag, chargeback, job anomaly, or support case creates an Admin work item.
2. The authorized operator sees identity, provenance, consent/rights evidence, related jobs, balances, entitlements, and transaction history.
3. The operator applies a reasoned, role-permitted action such as request changes, suspend, refund, release a reservation, adjust through compensating ledger entries, hold payout, or escalate.
4. High-risk actions require secondary approval where configured.
5. The affected user receives the applicable notice and appeal route.
6. The immutable audit record links the case, evidence, before/after state, and operator.

## 8. Publishing, Marketplace, and Store rules

### 8.1 Eligibility and review

- Any verified creator can sell; a paid plan is not a seller prerequisite.
- Seller verification and listing/publication approval are separate decisions.
- Every public or monetized voice, SFX, book, serial, chapter, and episode requires automated screening and human approval.
- A live listing remains bound to the consent, rights, model, asset, license, preview, and price version that was approved.
- Every public AI-derived asset or publication must disclose AI provenance.

### 8.2 Voice safety

- New real-person voices are private.
- Public figures and minors are prohibited identity targets for cloning, designed imitation, and voice listing in V1.
- Consent is purpose-specific; private testing consent does not imply Marketplace or commercial publishing consent.
- Revocation, death/incapacity, representation disputes, or a credible impersonation report trigger the response defined in the safety policy.
- Voice listing buyers receive in-app use only and never receive reconstructive materials.

### 8.3 Rights and commercial use

- The creator must own or hold sufficient rights to manuscript, performance, voice, SFX, artwork, music, and imported media.
- Importing a finished external audiobook through Studio establishes an asset and review record; it does not establish rights by itself or bypass quality, provenance, moderation, or commercial review.
- AudiLink must hold sufficient upstream rights for every enabled model route and platform-supplied asset.
- “Commercial use included” means the plan does not add a noncommercial restriction; it cannot cure missing upstream or creator rights.
- A downloadable SFX license is separate from in-app use and must display permitted media, territory, term, attribution, redistribution, and prohibited uses before fiat checkout.

### 8.4 Price and entitlement integrity

- Offers may be free or paid.
- Marketplace in-app use consumes Studio Credits. Standalone SFX download uses fiat. Books unlocks use Reader Coins.
- A completed transaction freezes listing version, license, price/rate, net calculation, seller plan, and creator/platform split.
- Ordinary repricing affects future transactions only.
- A paid Books unlock is permanent and does not expire.
- Ordinary delisting stops new acquisition but preserves existing unlocks.

### 8.5 Refunds, disputes, and takedowns

- Technical duplicate or failed jobs receive automated Credit release/refund.
- Coin and fiat refunds follow the versioned commerce policy and must reverse or compensate all affected ledger legs and creator earnings.
- A chargeback can place related creator earnings in reserve or create a negative payable balance under disclosed terms.
- Safety or rights takedown is evaluated independently from financial remedy. A content block must not erase the transaction or audit trail.
- Users receive a reason category and appeal path unless disclosure would create a security, fraud, or legal risk.

## 9. Admin requirements

### 9.1 Access and audit

**ADM-01** Admin requires separate authorization, mandatory MFA, least-privilege roles, session controls, and step-up authentication for payout, balance, model, or staff-access changes.

**ADM-02** Every sensitive action records operator, role, time, reason, case/reference, before/after state, and affected records. Audit events are append-only and exportable for authorized review.

**ADM-03** High-risk actions support separation of duties, including payout release, large balance adjustment, public voice approval, staff-role change, and destructive privacy action.

### 9.2 User, rights, and moderation operations

**ADM-04** Staff can search accounts, profiles, workspaces, verification, consent evidence, rights attestations, devices/sessions, reports, and linked risk signals under policy-based access.

**ADM-05** Review queues support assignment, service-level timers, evidence, internal notes, standardized decisions, requested changes, suspension, delisting, takedown, appeal, and escalation.

**ADM-06** Operators can stop new use while preserving evidence, purchased entitlements, and financial records for adjudication.

### 9.3 Plans and balances

**ADM-07** Authorized staff can schedule versioned Free/Creator/Pro prices, included Credits, feature gates, concurrency, route access, and promotions. A future configuration cannot rewrite a past quote or transaction.

**ADM-08** Studio Credit and Reader Coin changes use reasoned double-entry grants, reservations, settlements, releases, expiry, refunds, or adjustments. Direct balance overwrite is prohibited.

**ADM-09** Referral campaigns define eligibility, grant lot, expiry, abuse controls, budget, start/end, and version. V1 referral or Admin grants are the only promotional Coin sources.

### 9.4 Commerce and payouts

**ADM-10** Staff can inspect fiat charges, Coin purchases, unlocks, Marketplace use, net proceeds, frozen split, creator earnings, reserves, refunds, chargebacks, tax/provider references, and payout status.

**ADM-11** Payout operations require verified destination, available balance, reserve checks, provider status, idempotency, failure recovery, and reconciled ledger entries.

### 9.5 Models and jobs

**ADM-12** Authorized operators can enable, canary, route, pause, or kill a pinned model version by capability and language without deleting historical provenance.

**ADM-13** Job operations expose input references, pinned route/model, workflow phase, queue, attempt, worker, logs, outputs, quote, settlement, and safe retry/cancel controls.

**ADM-14** Feature flags and emergency controls must be scoped, time-bound where appropriate, attributed, reversible, and audited.

## 10. Nonfunctional requirements

### 10.1 Accessibility and inclusive interaction

- Studio, Books, and Admin must meet [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/).
- All interactive functionality must be available by keyboard and touch without hover-only controls.
- Waveforms, timelines, balances, state, and charts require nonvisual equivalents and programmatic labels.
- Motion must communicate state or spatial continuity, remain reasonable, and honor reduced-motion preferences.
- Captions/transcripts must be available for product tutorials and public promotional audio/video.

### 10.2 Responsive and mobile behavior

- Studio feature parity is required on mobile. Complex desktop canvases adapt to task-focused touch views rather than hiding tools.
- Books must install and operate as a PWA for protected offline playback on supported mobile browsers.
- Core flows must work at 360 CSS pixels wide, at 200% zoom, in portrait and landscape where the browser supports rotation.
- Touch targets, scrubbing, drag/drop alternatives, confirmation, and undo must be tested on representative iOS and Android browsers.

### 10.3 Performance

- Public Books discovery and detail pages target a 75th-percentile Largest Contentful Paint of 2.5 seconds or less on the representative mobile test profile.
- Cached player start targets 1 second or less; entitled uncached broadband playback targets a 95th-percentile start of 2.5 seconds or less, excluding a user-blocked network.
- Synchronous editor commands acknowledge locally within 100 milliseconds at the 95th percentile for the supported project-size fixture; durable save state appears within 5 seconds under a healthy connection.
- Long-running jobs never hold a browser request open as their source of truth. The UI shows durable state and can reconnect.
- A model route cannot graduate to GA without measured throughput, queue, latency, failure, and unit-cost envelopes.

### 10.4 Reliability and recovery

- Monthly service objective: 99.9% for authenticated control APIs and 99.95% for already-entitled Books playback/media delivery, excluding documented scheduled maintenance.
- Job workflows, financial writes, and entitlement grants must be idempotent and recoverable after process, worker, or network failure.
- Ledger invariants require balanced entries and zero unexplained reconciliation difference.
- Target recovery point objective is 15 minutes for mutable platform data; target recovery time objective is 4 hours for a regional control-plane failure.
- Project autosave, accepted takes, published releases, consent evidence, transactions, and audit logs require tested backup and restore paths.

### 10.5 Security, privacy, and abuse resistance

- Encrypt data in transit and at rest; isolate workspaces and private assets; use least-privilege service identities and expiring signed media access.
- Protect reference recordings, voice representations, consent evidence, payout data, paid media, and staff audit as high-sensitivity records.
- Admin requires MFA. Sensitive seller, payout, or account changes require step-up verification.
- Support account export, correction, consent withdrawal handling, and deletion subject to legal, safety, transaction, and rights-retention obligations.
- Rate limit and risk-score sign-up, preview, generation, referral, rating, download, and payment actions.
- Security testing must cover tenant isolation, object access, job idempotency, signed media leakage, paid offline cache extraction, referral abuse, balance manipulation, payout diversion, and Admin privilege escalation.

### 10.6 Audio, model, and language quality

- English is the only GA generation language at launch.
- A language is labeled Beta only after it meets the benchmark defined in the AI strategy and acceptance documents. An unbenchmarked language is unavailable, not silently routed.
- Outputs must retain model/version provenance and route settings.
- A route must meet intelligibility, speaker similarity where permitted, expressiveness, artifact, continuity, safety, latency, and cost thresholds for its advertised use.
- Audiobook mastering must meet the documented loudness, peak, continuity, chapter-boundary, and encoding checks before publishing.
- Model fallback must preserve the requested capability and license. A materially different voice/model result requires user notice or a new quote rather than silent substitution.

### 10.7 Observability and supportability

- A correlation path must connect a user action, quote, job, workflow, model worker, media object, ledger entries, entitlement, listing/publication, and payout impact.
- Metrics and alerts cover queues, model health, job success, quote variance, reservations, reconciliation, playback, offline caching, moderation backlog, reports, refunds, chargebacks, payout failure, and access anomalies.
- Users see stable support references, not internal secrets.
- Operational logs must not contain raw manuscript, reference audio, consent documents, payment secrets, or signed media URLs unless explicitly redacted and access-controlled.

## 11. Success metrics

Metrics are segmented by device class, plan, feature, acquisition channel, model route, and language status where privacy thresholds permit.

### 11.1 Creator value

- **First-audio activation:** at least 40% of new Studio users who complete onboarding produce and save one successful usable audio asset within 24 hours.
- **Story activation:** at least 25% of new creators who start a story project produce a mastered first chapter or episode within 7 days.
- **Editorial control:** at least 90% of line regenerations replace only the selected block with no unintended accepted-take or timeline loss; any data-loss incident is a launch-blocking defect until understood.
- **Export success:** at least 99% of valid export jobs complete successfully, excluding user cancellation and policy blocks.

### 11.2 Generation and economics

- **Eligible job success:** at least 98% of accepted, policy-cleared jobs succeed after at most one platform retry, excluding user cancellations.
- **Financial completion:** 99.9% of terminal failed/cancelled jobs release or refund the required Studio Credits within 60 seconds of terminalization; remaining cases alert operations.
- **Quote accuracy:** 95% of successful jobs settle at or below the displayed estimate and within 10% of the estimate when actual-output pricing varies.
- **Reconciliation:** zero unexplained Studio Credit, Reader Coin, fiat, entitlement, or creator-earnings ledger imbalance.
- **Route sustainability:** every GA model route has a non-negative direct contribution margin under the approved rate card and measured production envelope.

### 11.3 Reader value

- **Playback start success:** at least 99.5% of entitled online playback attempts start or return a correct actionable error.
- **Protected offline success:** at least 98% of eligible offline-save attempts complete on the supported test matrix; entitled cached playback succeeds at least 99% of the time before lease revalidation is due.
- **Preview-to-unlock:** initial paid-title benchmark of at least 8% among readers who listen beyond the qualifying preview threshold; the first 30 days establish category baselines.
- **Listening completion:** initial benchmark of at least 35% for unlocked finite titles and 55% for unlocked serial episodes among listeners who start the unit; measure by duration bands.
- **Entitlement integrity:** 100% of completed unlock transactions grant the intended permanent entitlement exactly once.

### 11.4 Marketplace, publishing, and safety

- **Review coverage:** 100% of public or monetized Marketplace listings and Books releases have required automated checks, recorded human approval, rights/provenance evidence, and seller verification where selling applies.
- **Review responsiveness:** 90% of complete submissions receive a decision or actionable change request within two business days at launch staffing.
- **Critical response:** credible imminent-harm, voice-impersonation, child-safety, or active payment-compromise escalations are acknowledged within one hour while staffed; other rights/takedown reports within one business day.
- **Split integrity:** 100% of eligible transactions record the correct frozen 40/60 or 80/20 split and seller plan version.

## 12. Launch gates

Studio and Books may co-launch only when every applicable gate is passed or the gated feature/model/country is disabled.

### 12.1 Product and experience

- All P0 V1 journeys in Section 7 pass on desktop and the representative mobile/touch matrix.
- Studio has full mobile feature parity for every in-scope editor action.
- Books PWA protected offline playback passes entitlement, storage pressure, reconnect, account switch, and revoked-session tests.
- Accessibility audit demonstrates WCAG 2.2 AA with no unresolved critical or serious issue.
- The final design is recognizably AudiLink and does not reproduce Fish Audio branding or screen composition.

### 12.2 Model and audio quality

- English GA routes pass the blinded human and automated benchmark for intended use.
- Each Beta language independently passes its Beta threshold and is visibly labeled throughout selection, output, Marketplace, and Books.
- Every enabled model has a pinned source, code/weights version, license evidence, allowed commercial use, redistribution/deployment analysis, hardware envelope, safety controls, and rollback.
- Fish Audio S2 Pro remains disabled in production unless written commercial-use clearance is confirmed from the applicable rights holder and recorded in the model registry. Primary project references are [Fish Speech on GitHub](https://github.com/fishaudio/fish-speech) and [Fish Audio S2 Pro on Hugging Face](https://huggingface.co/fishaudio/s2-pro/tree/main).
- Every “Voicebox-supported” candidate is mapped to an exact upstream project/version and independently cleared; the local model manager label is not license evidence.
- Local weights under the developer Hugging Face cache are testing inputs only and are not production deployment artifacts.

### 12.3 Safety, rights, and privacy

- Tiered voice consent, identity/liveness checks, similarity screening, human review, report, suspension, takedown, and appeal flows are operational.
- Public-figure and minor-voice prohibitions are enforced before generation/listing and tested against evasion cases.
- Rights attestations and AI provenance are present for every public listing and publication.
- Privacy notices, retention schedule, data-subject workflows, consent withdrawal, and sensitive-media access controls have legal and security approval for launch countries.
- Moderation and support staffing, escalation contacts, and service-level dashboards are active.

### 12.4 Commerce and legal

- The operating legal entity and exact launch-country list are approved. “Global” marketing is constrained to supported countries until this gate is complete.
- A payment/payout provider or provider set supports the approved countries, currencies, seller verification, tax handling, refunds, chargebacks, reserves, and payouts. Architecture remains provider-neutral until selection.
- Reader Coin terms, Studio Credit terms, seller agreement, marketplace licenses, downloadable SFX license, Books terms, refund policy, and split/net definitions receive legal approval.
- Double-entry ledgers, idempotent purchase/unlock, reservation/settlement/refund, permanent entitlement, split freezing, earnings, and payout reconciliation pass failure-injection tests.

### 12.5 Security, reliability, and operations

- Independent security review closes all critical/high findings or has an approved launch-blocking disposition.
- Load and soak tests meet the performance, queue, playback, and reliability targets at the approved launch forecast.
- Backup restore, worker failure, workflow replay, model rollback, media-origin outage, provider webhook replay, and regional recovery rehearsals pass.
- Admin least privilege, MFA, secondary approval, audit export, emergency model stop, feature rollback, and incident runbooks are verified.
- Analytics definitions in Section 11 are observable without collecting unnecessary sensitive content.

## 13. Dependencies, constraints, and material risks

| Dependency or risk | Required resolution | Launch impact |
|---|---|---|
| Fish S2 Pro commercial rights | Written clearance and recorded scope, or keep the route disabled | Blocks Fish route, not the whole product if an approved alternative passes |
| “Voicebox” model identity | Map every candidate to exact upstream code, weights, version, and license | Blocks unidentified candidates |
| Payment entity and countries | Select legal entity, launch countries, currency/tax obligations, and provider adapters | Blocks paid Studio, Coins, Marketplace, Books, and payouts in uncleared countries |
| GPU capacity and unit economics | Pin production images, benchmark hardware, reserve capacity, configure queue/admission, and approve rate cards | Blocks affected GA routes |
| Voice verification | Implement approved identity, liveness, consent evidence, similarity, and reviewer process | Blocks real-person Voice Lab and public voices |
| Publishing rights operations | Approve attestations, evidence retention, takedown, appeal, and repeat-infringer response | Blocks public selling |
| PWA media protection | Validate signed delivery, encrypted/access-controlled cache, entitlement revalidation, and account isolation | Blocks paid offline feature |
| Moderation and support staffing | Train roles, queues, escalation, and service levels | Blocks public Marketplace and paid publishing |
| AudiLink design system | Establish original tokens, responsive components, waveform/timeline patterns, motion, and accessibility | Blocks UX acceptance |
| English and Beta benchmarks | Build representative evaluation sets and pass route/language thresholds | Blocks the affected GA/Beta label |

## 14. Model and infrastructure constraints

- Core production models run as AudiLink-owned, pinned deployment artifacts on managed GPU capacity. External model providers may be adapters but are not the only execution path.
- Production routes are versioned and controlled independently from the local development model cache.
- Qwen3 0.6B may be evaluated for bounded local language-assistance tasks such as manuscript structuring or tagging; it must not be represented as a speech model or allowed to publish content autonomously.
- Model identity, exact capability, license, hardware, benchmarks, and promotion rules are specified in [04 — AI Model Strategy](04-ai-model-strategy.md).
- The platform uses durable asynchronous workflows for generation, transcription, mastering, export, review, and commerce side effects; implementation boundaries are specified in [03 — Platform Architecture](03-platform-architecture.md).

## 15. Traceability

### 15.1 Requirement ownership by document

| Requirement area | Primary elaboration |
|---|---|
| Surface boundaries, audiences, V1 scope, goals, core journeys | This PRD |
| SHR, PRJ mobile behavior, Books player states, Admin navigation, empty/error/blocked states | [02 — UX Information Architecture](02-ux-information-architecture.md) |
| Shared identity, jobs, storage, workflows, API, ledgers, media delivery, deployment, observability | [03 — Platform Architecture](03-platform-architecture.md) |
| TTS, Voice Lab, SFX, transcription, manuscript assistant models; route evaluation, licensing, cost and fallback | [04 — AI Model Strategy](04-ai-model-strategy.md) |
| JOB financial semantics, PLN, Studio Credit/Reader Coin lots, Marketplace earnings, Books transactions, refunds and payouts | [05 — Plans, Credits, Coins, and Commerce](05-plans-credits-coins-commerce.md) |
| VOC consent, MKT/PUB review, rights, provenance, reports, takedowns, appeals, privacy | [06 — Trust, Safety, and Publishing](06-trust-safety-publishing.md) |
| Delivery phases, test matrix, audio/language thresholds, metric instrumentation, launch gates and rollout | [07 — Roadmap, Quality, and Acceptance](07-roadmap-quality-acceptance.md) |

### 15.2 Cross-document invariants

Every other document must preserve these invariants:

1. Studio, Books, and Admin are distinct surfaces; Studio and Books co-launch.
2. Marketplace lives in Studio, not Books.
3. V1 targets independent creators and personal workspaces; teams and public APIs are deferred.
4. Mobile Studio has full feature parity through adaptive interaction.
5. English is GA; only independently benchmarked languages are labeled Beta.
6. Studio Credits, Reader Coins, and fiat creator earnings are separate ledgers and never user-convertible.
7. Studio Credits roll over and remain after cancellation, subject to current Free gates.
8. Books unlocks are permanent; purchased Coin lots never expire; promotional/referral lots may expire and spend first.
9. Voice and SFX in-app Marketplace use consumes Studio Credits; standalone SFX download uses fiat; Books uses Reader Coins.
10. Free sellers receive 40% and AudiLink 60%; active paid sellers receive 80% and AudiLink 20%, frozen per transaction.
11. All plans permit commercial use only where creator inputs, Marketplace assets, and upstream models are commercially cleared.
12. Public-figure or minor identity targeting by clone, designed imitation, or listing is prohibited.
13. Public voices and commercial publications require automated screening and human approval.
14. AI provenance is always disclosed on public AI-derived content.
15. Paid Books audio supports protected offline PWA playback but no raw reader download.
16. A verified creator may import a single finished external audiobook through Studio, but open/bulk catalog ingestion and any review bypass are deferred.

## 16. Acceptance of the PRD

The PRD is ready for implementation planning when:

- Every specialized document accepts the cross-document invariants.
- Every V1 requirement is mapped to an owner document and acceptance test.
- Provisional commercial values remain configuration, not hard-coded product truth.
- Model, payment entity/country, legal, and rights unknowns remain visible launch gates.
- Engineering can implement the product without choosing new surface boundaries, balance meanings, seller splits, consent policy, mobile scope, or deferred-feature scope.
