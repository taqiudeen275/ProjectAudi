# UX Information Architecture and Interaction Specification

**Status:** Approved product-design baseline; quiet-interface revision approved 2026-08-04

**Applies to:** Studio, Books, and Admin responsive web applications

**Purpose:** Define the product boundaries, navigation, interaction behavior, responsive adaptation, and design acceptance criteria before UI implementation.

## 1. Experience model

AudiLink is one platform expressed through three purpose-built surfaces:

1. **AudiLink Studio** is the creator SaaS for audiobook and serial production, text to speech, voice creation, sound-effect creation, transcription, asset management, and the voice/effect Marketplace.
2. **AudiLink Books** is the consumer storefront, personal library, protected download manager, and player for free and paid audiobooks and serials.
3. **AudiLink Admin** is the staff-only operations surface for moderation, support, catalog, generation/model operations, plans, referrals, and commerce.

These surfaces share identity and platform data, but they do not share one oversized navigation tree. Each has its own task-focused shell and can be entered directly.

### 1.1 Experience principles

- **Audio is visible and controllable.** Waveforms, speaker identity, timing, generation state, and cost are legible wherever audio is created or played.
- **AI proposes; people direct.** AI may accelerate a workflow, but accepted, edited, and locked human choices remain authoritative.
- **Simple first, precision on demand.** New users can complete a guided flow; advanced editing is progressively disclosed without becoming a separate product.
- **Quiet by default.** Each view gives one task the strongest visual weight. Spacing, typography, tone, and motion establish hierarchy before borders, cards, or decoration are introduced.
- **Every expensive action is predictable.** The UI identifies the resource being spent, gives a preflight estimate, and records the final transaction.
- **Long work survives navigation and failure.** Generation, export, publishing, purchases, and downloads are durable jobs with recoverable state.
- **Mobile is adaptive, not reduced.** Every feature is available on touch devices; dense desktop workspaces become focused screens, sheets, and dedicated editors.
- **Cinematic, then precise.** The product may feel immersive, but controls, hierarchy, contrast, and feedback remain exact.

## 2. Shared account, ownership, and product switching

### 2.1 One identity, explicit ownership

A person signs in once and may be a listener, creator, marketplace seller, or staff member at the same time. The first Studio entry creates one personal workspace; the same ownership UI can expose future shared workspaces without changing the meaning of existing records.

| Object | Owner | Visible in |
| --- | --- | --- |
| Profile, preferences, accessibility settings, locale | Personal account | Studio and Books |
| Reader Coin wallet and Reader Coin transaction history | Personal account | Books only |
| Purchased/free audiobooks, listening progress, bookmarks, downloads | Personal account | Books |
| Studio plan, Studio Credits, projects, generation history | Personal workspace in V1; active workspace when shared workspaces ship | Studio |
| Created and acquired voices/effects | Selected Studio workspace | Studio |
| Marketplace consideration | Studio Credits for generation/use, fiat for an eligible standalone SFX download, or free entitlement | Studio Marketplace |
| Marketplace asset license destination | Selected Studio workspace | Studio Assets |
| Seller earnings and payout balance | Verified seller account | Studio seller area; never presented as Reader Coins or Studio Credits |
| Staff permissions and audit trail | Internal role | Admin |

Every Studio screen shows the active workspace. Any Marketplace license confirmation states `License to: [workspace]` and the applicable free, Studio Credit usage, or standalone fiat terms. A personal Studio workspace is created for a creator who has no workspace. Licenses are not silently moved when the user changes workspaces.

### 2.2 Product switcher

- The brand/product control in the global header opens a switcher containing **Studio** and **Books** only.
- Switching products preserves authentication, locale, theme, accessibility preferences, and the last visited location in each product.
- Cross-product actions use contextual deep links:
  - `Use in Studio` opens the Studio workspace/project picker for an acquired voice or effect.
  - `View in Books` opens the live store page for a published audiobook or serial.
  - `Create with Studio` moves a listener into Studio onboarding without replacing their Books library.
- If the target action requires a workspace, entitlement, or purchase, the target product resolves it after navigation and retains the original intent.
- The switcher is always keyboard accessible and reachable within two interactions on mobile.
- Admin is intentionally absent from the consumer/creator product switcher. Authorized staff enter its separate protected URL and complete staff-role plus step-up authentication as required.

### 2.3 Shared global utilities

Studio and Books share the visual placement—not necessarily the same contents—of account, notifications, help, theme, and product switching. Studio additionally exposes its active workspace and Studio Credit balance. Books exposes the personal Reader Coin balance and persistent player. Reader Coins never appear as a Marketplace payment option.

Notifications cover job completion/failure, publishing and moderation decisions, new followed releases, expiring promotional Reader Coins, refunds, payout events, and material security events. Each notification names its product/context and deep-links to the durable record. Marketing consent is separate from operational notification preferences.

### 2.4 Authentication and profile behavior

- Signed-out Studio and Books pages use the same identity flow and return to the original authorized deep link after sign-in, email verification, recovery, or session challenge.
- Creator and reader presentation data are separate profiles under the account; changing a public creator name does not overwrite reader preferences or authentication identity.
- Account settings cover profile, email/security, active sessions, notification consent, locale, theme, accessibility, data/privacy requests, and sign-out-all-devices.
- Studio creator/seller verification is a contextual workflow, not a requirement to read Books or create a first private asset. A restriction identifies the affected product capability rather than presenting the whole account as generically broken.
- Admin authentication is a separate staff-authorized entry with MFA and step-up; a normal Studio/Books session never grants Admin access.

## 3. Studio information architecture

### 3.1 Primary navigation

| Destination | Contents and primary actions |
| --- | --- |
| **Home** | Onboarding, recent projects, continue work, active jobs, recent assets, Studio Credit status, and plan-limit warnings |
| **Projects** | All projects with filters for Audiobook, Serial, Speech, Transcription, and Sound Effect; drafts, archived projects, and templates |
| **Create** | Audiobook/Serial Studio, Text to Speech, Voice Lab, Sound Effects, and Transcription |
| **Assets** | My Voices, My Effects, imported and generated audio, transcripts, cover artwork, mastered exports, acquired Marketplace items, favorites, collections, provenance, and license details |
| **Marketplace** | Voice discovery, effect discovery, creators, saved items, in-app licenses, fiat SFX purchases, seller listings, and seller earnings |
| **Publish & Releases** | Draft submissions, validation, moderation decisions, scheduled/live audiobook and serial releases, immutable versions, corrections, delisting state, and `View in Books` |
| **Activity** | Durable generation/export jobs; filters for tool, project, state, model route, time, and cost; generation history, notifications, failures, retries, quote/settlement, reservation release/refund, and downloadable outputs |
| **Usage & Plan** | Studio Credit balance and ledger, usage by project/tool/model, feature quotas, current plan, billing, invoices, and upgrade paths |
| **Earnings** | Fiat creator earnings, frozen plan/share per transaction, hold/available state, payout setup, payout history, disputes, and tax/provider notices |
| **Workspace** | Workspace profile, project defaults, and workspace settings; members, roles, and invitations appear only when shared workspaces are released |
| **Help** | Searchable documentation, tutorials, keyboard shortcuts, support, service status, and feedback |

The desktop shell uses a labeled, collapsible navigation rail grouped as **Work** (Home, Projects, Create), **Library & Publish** (Assets, Marketplace, Publish & Releases), **Operations** (Activity, Usage & Plan, Earnings), and **Settings** (Workspace, Help). It must not rely on an unexplained icon-only rail. Search/command access, the active workspace identity, active jobs, Studio Credits, notifications, help, and account controls live in the header. V1 names the personal workspace without presenting a fake multi-workspace selector; switching appears only when shared workspaces ship. Compact Studio navigation uses **Home**, **Projects**, **Create**, **Assets**, and **More**; More exposes every other destination and active-job/balance shortcuts.

### 3.2 Create entry points

The Create landing page offers five equal, clearly described paths rather than opening the last-used tool without context:

- **Audiobook/Serial Studio:** build a multi-character audiobook or ongoing episode-based production from a manuscript or blank project.
- **Text to Speech:** create short- or long-form speech with one or more speakers.
- **Voice Lab:** create a voice by approved cloning or text-guided voice design, then manage privacy and Marketplace readiness.
- **Sound Effects:** generate effect variants from a prompt, audition them, and save or publish an asset.
- **Transcription:** turn owned/authorized audio into a timed, editable transcript with speaker labels where supported.

Recent tool and model choices may be suggested, but compatibility and entitlement checks run again for every new job.

## 4. Audiobook and Serial Studio

The same production workspace supports finite audiobooks and ongoing serials. An audiobook outline is organized into chapters; a serial outline is organized into episodes and may continue after the first release. UI nouns change with project type, while casting, generation, editing, mastering, safety, and accessibility behavior remains consistent. Project type is chosen at creation; conversion between audiobook and serial is unavailable after the first publication.

### 4.1 Project stages

A story project has five persistent stages. Users may move between them at any time; unresolved requirements are badges, not hidden blockers.

1. **Script:** import, write, divide, label, and direct the manuscript while retaining an unchanged source view for AI/manual comparison.
2. **Cast:** manage characters, narrator, voices, alternates, pronunciation, and voice rights.
3. **Produce:** generate takes and arrange narration, dialogue, effects, ambience, and music.
4. **Review:** listen continuously, compare takes, resolve warnings, add chapter/episode markers, and approve the master.
5. **Publish:** complete book/serial metadata, cover, sample, release scope, price/free status, rights declarations, and store submission.

The project header contains title, stage navigation, save/sync status, undo/redo, active jobs, preview, and export/publish actions. Collaborator presence appears when shared workspaces are released. Destructive actions are in an overflow menu and require a named confirmation.

### 4.2 Desktop workspace

At wide widths, the default **Script view** uses:

- a left outline for parts, chapters, scenes, and validation counts;
- a central ordered script canvas made of editable scene and line blocks;
- a contextual right inspector for the selected line, scene, character, voice, cue, or clip; and
- a collapsible bottom timeline/player for timing and mix work.

The **Timeline view** promotes the multitrack editor to the primary canvas while retaining a collapsible script/outline. The two views edit the same project state; users do not manually synchronize them.

### 4.3 Script and manual editing behavior

- Script content is organized as chapter → scene → line/cue. Users can add, split, merge, duplicate, reorder, and delete each supported level.
- Every spoken line shows speaker, assigned voice, direction tags, generation status, selected take, duration, and warning state.
- Users can manually assign speakers and voices, edit text, add pronunciation entries, insert pauses, set model-supported delivery controls, and add SFX/ambience/music cues.
- Model-specific controls appear only when supported. Unsupported settings are never accepted and silently ignored.
- A voice assignment can be set at project, character, scene, or line scope. The inspector states inheritance and the effective value.
- Users may lock text, speaker assignment, voice, pronunciation, direction, cue timing, or an approved take. AI and batch operations skip locked properties and report the skipped count.
- Generation is non-destructive. New takes are variants; the approved take stays active until another is explicitly selected.
- Take comparison supports rapid A/B playback, waveform and duration comparison, clear model/settings/cost provenance, accepted and rejected take history, and an explicit `Use this take` action.
- The timeline supports separate narration/dialogue, SFX/ambience, and music tracks; clip move, trim, split, fade, gain, mute/solo, snapping, and marker operations; and a list-based numeric alternative to every drag gesture.
- Project history exposes recent autosave checkpoints and named versions. Restore creates a new current version so the previous state and any published immutable revision remain inspectable.
- Autosave never blocks editing. The header distinguishes **Saving**, **Saved**, **Offline—changes on this device**, **Syncing**, and **Conflict needs review**.
- Connection loss preserves local unsynced work until reconnection or explicit recovery/export where supported; it does not promise that a creator can start or continue a complete Studio workflow offline.

### 4.4 AI-assisted production contract

AI assistance is available through scoped actions and an optional project assistant. It may:

- propose chapter and scene divisions;
- detect narrator and character candidates;
- propose speaker-to-line assignments and a cast shortlist;
- suggest pronunciations, performance directions, pauses, ambience, and sound effects;
- flag continuity, clipping, silence, missing audio, inconsistent voices, and pacing issues;
- draft store metadata and a production checklist; and
- prepare a generation plan with duration and Studio Credit estimates.

AI output follows these rules:

1. The user chooses scope—line, selection, scene, chapter, or project—before an action runs.
2. Structural or content changes are previewed as suggestions and are not committed until accepted.
3. Suggestions have **Pending**, **Accepted**, **Edited**, **Dismissed**, and **Stale** states. Accepted suggestions become ordinary editable project data.
4. The UI shows why a suggestion is being made and what it will change; it does not present model reasoning as certainty.
5. Manual edits and locks win. Re-running AI never overwrites them without an explicit replace confirmation.
6. Batch acceptance provides a count, exclusions, estimated Studio Credits when generation is involved, and undo for metadata/script changes.
7. Generated audio cannot be undone by deleting history; it can be deselected or archived using normal version controls, with the charge retained in the ledger. An output referenced by a published release cannot be deleted.
8. Voice cloning and public voice use require the applicable consent, identity, and license checks before generation or publication.

### 4.5 Generation, review, and publishing

- A line can be previewed or queued individually. Multi-selection can queue a scene, chapter/episode, missing lines, stale lines, or the complete release scope.
- Before queuing, the confirmation identifies model, number of clips, estimated audio duration, estimated Studio Credits, current balance, post-job estimate, and any plan quota.
- Accepted quotes are locked for that job. A job is not partially generated because another job changed the balance; it moves to **Action needed—balance changed** before work starts.
- Partial batch success retains completed clips, identifies failed clips, charges only according to the platform charging policy, and offers `Retry failed` without regenerating successful work.
- A terminal technical/policy failure before usable output releases the reservation and settles no generation charge. AudiLink infrastructure retries create no second charge; a creator-requested alternative/regeneration is a new quoted job.
- If a required release/refund remains pending for 60 seconds after terminal failure/cancellation, the UI changes to **Reconciliation delayed**, keeps the amount visible, supplies a support/reference ID, and alerts operations.
- Continuous review plays across scene and chapter/episode boundaries and records review position separately from the listener-facing store progress.
- Preview and final masters use the accepted timeline and surface loudness, clipping, silence, missing-boundary, and mastering-setting results before export or publication.
- Publish validation groups blockers by Script, Cast, Audio, Rights, Metadata, Store, and Accessibility. Each blocker links to the exact object that needs attention.
- Submission creates a durable moderation job with **Draft**, **Needs attention**, **Submitted**, **Automated checks**, **Human review**, **Changes requested**, **Rejected**, **Approved**, **Scheduled**, **Published**, **Suspended**, **Under appeal**, **Reinstated**, and **Unpublished** states.
- Verification and human review—not a paid Studio plan—control publishing eligibility. A verified Free-plan creator can submit and sell an eligible release.

### 4.6 Full mobile feature parity

No Audiobook/Serial Studio action is desktop-only. Mobile achieves parity by separating simultaneous desktop panels into task-focused views:

- The project home summarizes stages, warnings, jobs, and recent position.
- Script is a virtualized list of scene/line cards with a chapter/episode selector sheet, multi-select mode, and sticky transport.
- Selecting a line opens a full-height inspector sheet with text, cast, voice, direction, pronunciation, takes, and generation actions.
- Cast uses a card/list view with a full-screen character editor and voice audition queue.
- Timeline opens as a dedicated full-screen touch editor. It supports pinch zoom, drag, trim handles, snapping, and scrub, while always providing visible nudge, time-entry, move-to-track, split, fade, and gain controls.
- Portrait orientation provides all operations through track/clip lists and numeric controls; landscape increases timeline workspace but is never required.
- Review and Publish are dedicated screens with the same validations and decisions as desktop.
- Long-press is a shortcut only. Every long-press or gesture action has a visible menu or button equivalent.
- Queued work continues when the app is backgrounded. Returning to the project restores selection, scroll/time position, open stage, and unsent local edits.

## 5. Other Studio creation workflows

### 5.1 Text to Speech

1. Enter or import text and optionally divide it into speaker blocks.
2. Assign one or more owned/licensed voices; audition before generation.
3. Apply inline performance, pause, and pronunciation controls with a visible structured editor—not raw undocumented tag syntax alone.
4. Choose a compatible model or accept the recommended model with the compatibility reason shown.
5. Review the Studio Credit estimate, generate variants, compare, save to Assets, add to a project, or export.

The input remains available after failure or plan gating. History is secondary to the active composition, not a competing tab that hides settings.

### 5.2 Voice Lab

Voice Lab begins with an explicit method choice:

- **Voice design:** describe a fictional/original voice and refine generated candidates.
- **Voice clone:** upload or record required samples, complete consent/identity steps, pass quality checks, and generate a private test.

Before capture, Voice Lab explains the requested consent scope and requires an affirmative rights attestation. Public figures, minors, deceased-person targets, and people unable to consent are prohibited clone/design identity targets in V1; the blocked state explains policy and offers an appeal/report route where appropriate rather than a plan upgrade.

New real-person clones are private by default. The workflow then covers sample guidance, cleanup warnings, processing status, candidate comparison, name/metadata, privacy, workspace access, allowed usage, and Marketplace readiness. Consent state is visible as **Draft**, **Pending verification**, **Active**, **Restricted**, **Revoked**, **Expired**, or **Superseded**. Moving from private testing to shared, public, monetized, or publication-linked use is a separate verified-consent flow with automated checks and human approval. Locked methods state the required plan, consent, or verification; the UI never makes a locked card look selectable or exposes private evidence to Marketplace users.

### 5.3 Sound Effects

Sound Effects provides prompt, duration/range, variation count, and supported style/technical controls; a clear Studio Credit estimate; an asynchronous variant set; waveform/list preview; trim/fade/loop metadata; and Save to Assets, Add to Project, Download, or List on Marketplace actions. Discovery results and generated results are visually and semantically separate.

### 5.4 Transcription

Transcription accepts owned or authorized audio, displays format/duration and the Studio Credit quote before upload processing, and creates a durable job. The result uses a timed segment editor with confidence/warning state, speaker labels where supported, playback-follow mode, search/replace, split/merge, manual correction, and export/add-to-project actions. Language labels use **GA** only for English at launch; any benchmark-qualified additional language is visibly labeled **Beta**. Unsupported-language and poor-audio states retain the upload and explain the available next action.

## 6. Marketplace information architecture and commerce UX

### 6.1 Marketplace structure

Marketplace lives inside Studio and contains:

- **Discover:** editorial collections, trending, new, and personalized recommendations;
- **Voices:** search/filter by language, style, range, use case, creator, model compatibility, license, price, and verification;
- **Sound Effects:** search/filter by category, duration, loopability, technical properties, creator, license, and price;
- **Creators:** verified seller pages and catalog;
- **Saved:** favorites and collections;
- **Licenses & purchases:** accepted in-app licenses, fiat SFX receipts, license destination, version/update state, and `Use in project`;
- **Sell:** drafts, submitted listings, changes requested, live listings, analytics, earnings, and payouts.

### 6.2 Asset detail and acquisition

Every asset detail includes an immediate accessible preview; title and creator; type-specific metadata; supported language/model/format; verification and provenance indicators; commercial-use and redistribution summary; full license link; price or **Free** label; version/update history; report action; and target-workspace compatibility.

Voice listings grant in-app Studio use only: they never imply that buyers receive voice weights, embeddings, reference recordings, or a downloadable clone package. SFX details distinguish in-app use from a separately offered downloadable license.

- Free items use `Add to [workspace]` and still require acceptance of the license.
- A Studio usage license states that subsequent generation/rendering consumes Studio Credits and links to the applicable usage rate before `Add to [workspace]`. The eventual job quote presents one total containing compute plus the listing's license surcharge, with an expandable breakdown.
- An eligible standalone SFX download uses `Buy download for [ISO currency price]`; checkout states the deliverable, license, taxes/fees, and refund terms. Reader Coins are never offered.
- An owned/licensed item uses `Use in project` and does not continue to show an acquisition-primary action.
- Insufficient Studio Credits blocks the generation/use action, not license browsing or a standalone fiat download, and shows the exact shortfall or usage estimate.
- An incompatible plan or model shows the compatibility issue separately from ownership and preserves purchase/save intent.
- Acquisition success adds the item to Assets, presents `Use now`, and provides a receipt without forcing immediate navigation.

### 6.3 Seller workflow

A seller creates a listing from an eligible workspace asset, supplies preview and metadata, chooses an allowed launch license (free, Studio usage, or eligible standalone SFX fiat download), sets any permitted fiat price, reviews license terms, completes required consent/provenance declarations, and submits for moderation. Listing state is explicit: **Draft**, **Incomplete**, **Submitted**, **Automated checks**, **Human review**, **Changes requested**, **Rejected**, **Approved**, **Live**, **Suspended**, **Under appeal**, **Reinstated**, or **Removed**. Earnings and monetary payout balances are never represented by the Reader Coin or Studio Credit icon.

## 7. Books information architecture

### 7.1 Primary navigation

| Destination | Contents and primary actions |
| --- | --- |
| **Discover** | Continue Listening, editorial shelves, featured releases, full-cast picks, free books, and personalized recommendations |
| **Browse** | Category, creator/voice, language and GA/Beta status, format, duration, release recency, serial completion status, age/maturity, free/paid, full-cast/single-narrator, and accessibility filters |
| **Search** | Titles, authors, narrators/voice cast, series, creators, and categories with recent and suggested queries |
| **Library** | Owned/free books, in-progress, finished, series, and custom collections |
| **Downloads** | Download queue, downloaded books, storage use, quality settings, and repair/remove actions |
| **Saved** | Wishlist and saved samples |
| **Following** | Followed creators and serials, release notifications, and follow management |
| **Creators** | Public creator/publisher pages, catalog, biography, verified/public provenance labels, follow, and report |

The Books header contains product switcher, search, Reader Coin wallet, notifications, and account. Compact Books navigation uses **Discover**, **Browse**, **Library**, **Downloads**, and **More**; More contains Saved, Following, Creators, Reader Coin Wallet, and settings. A persistent mini-player appears once playback starts and remains available across discovery, library, and detail pages. It does not cover navigation or purchase controls.

### 7.2 Store and acquisition

- Shelves are cover-led but expose title, author, price/free status, duration, and progress without requiring hover.
- A title detail page includes cover, synopsis, author/publisher, narrator and cast, language with GA/Beta label, runtime, book/serial and completion status, chapters or episodes, release information, sample, content advisories, accessibility notes, visible AI provenance, rating, price/free status, share, follow where applicable, and license/territory availability.
- Samples never autoplay. Sample state is unmistakable and cannot advance into paid chapters.
- A free title/chapter/episode uses `Add free to Library`. A paid offer uses Reader Coins only and shows the exact permanent unlock scope: complete book, season/volume, chapter/episode, or remaining-content bundle. A parent/bundle price excludes units already owned.
- Before `Unlock for N Reader Coins`, checkout shows total balance, the purchased and promotional lots that will fund the unlock, the soonest-expiring amount, resulting balance, immutable offer/price scope, and receipt/refund-policy link.
- Insufficient Reader Coins shows the exact shortfall, `Get Reader Coins`, and `Save for later`; it never mentions Studio Credits or a Studio plan.
- Purchase success adds the entitlement immediately, changes the primary action to `Play`, and offers `Download` without losing the current store context.
- Region, rights, or age restrictions explain the specific reason and safe next action; they are not rendered as a generic purchase failure.
- A permanent unlock remains in Library after ordinary delisting or price changes. If law, substantiated rights action, fraud remediation, or account security restricts access, the Library state identifies the case and applicable replacement/refund/support path.

### 7.3 Library and player

The full player contains cover/art direction, title/author, chapter or episode title, elapsed/remaining time, scrubber, previous/next chapter or episode, 15-second seek, play/pause, speed, volume where applicable, sleep timer, queue, bookmarks, download state, output/device control where supported, AI/cloned/synthetic provenance and contributor credits, report, and an optional synchronized transcript with speaker labels. Transcript availability and review status are stated rather than leaving an empty tab or implying an unreviewed transcript is human-verified. First play surfaces relevant disclosure without repeatedly interrupting later listening.

- Playback progress saves locally immediately and syncs to the account when online.
- Another-device progress never silently jumps an active session. On a new resume, Books deterministically selects the most recent valid progress event, identifies its device/time, and offers `Resume here` or `Keep this device's position`; that explicit choice becomes the next progress event.
- Bookmarks work offline and join the sync queue.
- Playback errors retain position and offer retry, switch quality, use download, or report depending on the cause.
- Removing a download does not remove the book from Library, progress, or bookmarks.
- A qualifying listener may keep one mutable title-level rating from the player completion state or Library. V1 has no written comments, DMs, or social feed.
- Share creates a link to public metadata or an eligible preview only; it never exposes protected audio.

### 7.4 Offline and download states

Books supports protected offline playback for entitled downloaded items. The download is an app-managed, access-controlled PWA copy, not a user-exportable paid media file. Each item exposes one of these states with text and icon—not color alone:

- **Not downloaded**
- **Queued**
- **Waiting for Wi-Fi**
- **Downloading N%**
- **Paused**
- **Downloaded** with size/quality
- **Update available**
- **Verification needed** when the protected-cache lease needs an online entitlement check; the file is retained while the UI asks the entitled reader to reconnect
- **Insufficient storage** with storage-management action
- **Download failed** with retry and diagnostic detail
- **Repair needed** when local files fail integrity checks
- **Offline saving unavailable** when the current browser/device cannot provide the protected cache, with supported-browser guidance and continued online playback

When offline, downloaded books remain playable while their protected-cache lease permits and all unavailable streaming actions say `Connect to stream or download this book first`. Store shelves may show the last cached view but identify stale/offline data. Reader Coin unlocks, fiat Reader Coin-pack purchases, account changes, and new downloads require a connection and preserve the user's pending intent. Protected copies are isolated by account; an account switch never exposes another reader's cache. Download quality, Wi-Fi-only behavior, queue order, and per-book removal are available on every supported viewport.

## 8. Admin information architecture

Admin is a separate protected shell. It is not linked for ordinary users and must enforce role-based field and action visibility. Its compact navigation uses **Overview**, **Queues**, **Search**, and **More**; role-authorized destinations remain reachable through More and global search.

| Destination | Contents |
| --- | --- |
| **Overview** | Platform health, moderation queues, generation failures, commerce exceptions, support load, and incident banners |
| **Users & Workspaces** | Accounts, verification, roles, workspaces, memberships, entitlements, restrictions, and support context |
| **Catalog** | Audiobooks, serials, episodes, voices, sound effects, creators, metadata, availability, versions, and takedowns |
| **Moderation** | Voice consent/identity, rights and provenance, listing/book review, user reports, appeals, and decision queues |
| **Generation Ops** | Jobs, queue latency, failure diagnostics, safety outcomes, cancel/retry, artifact quarantine, and charge/refund state |
| **Model Ops** | Model registry/routes, license gates, evaluations/benchmark status, capacity, staged rollout, emergency kill switches, rollback, and incident state |
| **Commerce** | Reader Coin ledger, fiat purchases, refunds, chargebacks, Marketplace transactions, seller earnings, and payouts |
| **Plans & Entitlements** | Plan definitions, feature gates, quotas, Studio Credit grants/adjustments, promotions, and account exceptions |
| **Referrals** | Campaigns, qualifying events, promotional Reader Coin grants/expiry, abuse review, and campaign audit |
| **Support** | Case search, customer timeline, safe impersonation/view-as policy, notes, and escalation |
| **Configuration** | Feature flags, catalog taxonomies, regions, content labels, operational messaging, and role-policy configuration |
| **Audit** | Staff-role administration plus immutable record of staff views and mutations with actor, reason, time, before/after, and linked case |

Support, Moderator, Finance, Model Operator, and Administrator roles receive least-privilege navigation. Admin entry requires a staff role plus passkey or TOTP MFA; sensitive/high-impact actions require recent step-up authentication. Sensitive values are masked unless needed. Every financial, entitlement, moderation, impersonation, takedown, or account-restriction mutation requires a reason; high-impact or bulk actions show an impact preview and named confirmation. High-value/unusual financial adjustments require dual approval. Ledger corrections use compensating transactions rather than editing history. Tables provide filtering, saved views, export where authorized, and an equally capable mobile card/list representation.

## 9. Key end-to-end workflows

### 9.1 Produce and publish a multi-character audiobook

`New project → import/paste/start blank → AI analysis or manual structure → review chapters/characters → cast voices → audition and lock choices → review generation plan and Studio Credits → generate asynchronously → compare/approve takes → arrange and mix → continuous review → resolve publish validation → set Free or whole-Reader-Coin offer scopes → submit moderation → publish → View in Books`

A user may skip AI analysis and complete the same result manually. Leaving the project at any point retains progress and exposes a precise next action on Home and Projects.

### 9.2 Acquire a Marketplace voice/effect and use it

`Search/filter → preview → inspect compatibility/license → choose destination workspace → accept free/Studio usage license or buy eligible standalone SFX download in fiat → asset/entitlement enters workspace Assets → choose existing/new project → review Studio Credit generation cost → use within compatible tool`

The flow distinguishes purchase ownership, workspace license, model compatibility, Studio plan access, and future generation cost as separate facts.

### 9.3 Acquire and listen to a book

`Discover/search → title detail → follow/save/play sample → add free or confirm Reader Coin unlock scope and lot composition → Play or Download → resume from Library/mini-player → bookmark/change chapter or episode/speed → sync progress → rate after qualifying listening`

An insufficient balance path adds `Get Reader Coins → return to preserved purchase confirmation`. An offline path adds `Download → manage queue/storage → play offline → sync later`.

### 9.4 Create and list a voice/effect

`Voice Lab/Sound Effects → create candidates → review Studio Credit charge → select/edit asset → complete rights/provenance and listing metadata → choose an allowed free/Studio usage/standalone SFX fiat license → submit moderation → address changes or publish → monitor usage and monetary earnings`

### 9.5 Resolve an operational exception

`Admin queue/alert → inspect linked account/job/transaction/content → review evidence and audit history → take role-authorized action with reason → notify affected user where required → record outcome and any refund/entitlement change`

## 10. Money, Reader Coins, Studio Credits, and plan limits

The interface uses four non-interchangeable concepts:

| Concept | Purpose | Required label and treatment |
| --- | --- | --- |
| **Studio Credits** | Metered AI generation and processing within the active workspace | Always written as `Studio Credits`; waveform/spark icon; workspace balance and ledger |
| **Reader Coins** | Personal purchase currency accepted only to permanently unlock an eligible book, chapter, or serial episode | Always written as `Reader Coins`; coin icon; Books wallet and transaction history; never shown as Studio or Marketplace tender |
| **Plan entitlement/feature quota** | Determines whether a tool/model/feature is available and may impose a non-credit usage limit | Named plan/feature and reset period; never represented as a balance |
| **Money/payout balance** | Fiat Studio plans/Credit packs, Reader Coin packs, standalone SFX downloads, and seller earnings/payouts | ISO currency symbol/code; never uses Reader Coin or Studio Credit iconography |

### 10.1 Required balance behavior

- Header balances include the resource name at least once in the accessible label and never show only an ambiguous icon and number.
- Generation CTAs read `Generate · est. N Studio Credits` whenever a reliable estimate exists. The confirmation shows balance before and estimated balance after.
- A queued job distinguishes available Studio Credits from its maximum reserved Studio Credits. Settlement shows actual use and releases the unused reservation; failed/cancelled/partially completed jobs show charge, release, and refund state explicitly.
- Eligible Books unlock CTAs read `Unlock for N Reader Coins`; confirmations show exact scope, spending lots, and balance before/after. Reader Coins never appear in Studio or Marketplace checkout.
- Fiat CTAs always show the ISO currency price and checkout terms; an eligible standalone SFX download uses fiat even when the same effect can be used inside Studio with Studio Credits.
- **Insufficient Studio Credits** states exact shortfall, job scope, refill/upgrade options, and when plan credits renew.
- **Insufficient Reader Coins** states exact shortfall, Reader Coin acquisition options, and a non-destructive save/return path inside Books.
- **Plan gate** states the unavailable feature/model and which of the Free, Creator, or Pro plans provides it, then offers comparison/upgrade while preserving work.
- **Feature quota reached** states the applicable input/output, batch, storage, voice/listing-slot, or other consumed limit, reset/renewal behavior, and applicable upgrade; buying Studio Credits does not imply that the quota is removed.
- **Concurrency gate** states the current/allowed active job count, provides links to those jobs, and offers `Run when a slot opens` rather than presenting it as insufficient Studio Credits.
- **Moderation/verification gate** states the required review or verification and status; a provider/model outage states availability and retry/alternative route without upselling.
- Included, purchased, and granted Studio Credits display their source and all roll over; ending a paid plan does not erase them, although Free-plan feature/concurrency gates apply.
- A downgrade never deletes projects or voices. Resources above the new limit remain visible/read-only, identify the exceeded limit, and offer delete/archive or upgrade without implying lost ownership.
- The Reader Coin wallet shows total balance plus the soonest promotional expiry. Purchased lots are labeled non-expiring; promotional lots show source and expiry, spend soonest-expiring eligible lots before purchased lots, and link to campaign terms. With notification consent, expiry notices are sent at least 14 days and again 48 hours before expiry. V1 offers no rewarded-ad or social-task Coin program.

## 11. State and failure design

### 11.1 Universal state contract

Every data region and action defines:

- **Initial loading:** structurally accurate skeletons; avoid layout jumps and spinner-only pages.
- **Refreshing:** retain the last good content and show a localized refresh indicator.
- **Empty-first-use:** explain the value, show one primary action, and provide a sample/template only when relevant.
- **Empty-filter/search:** preserve filters/query, report zero results, and offer clear/reset—not creator onboarding.
- **Success:** confirm what changed and expose the most likely next action without trapping the user in a toast.
- **Recoverable error:** plain-language cause, retained input, retry, alternative when available, and expandable technical/reference ID.
- **Permission/entitlement error:** identify active account/workspace and the permission or plan required.
- **Offline:** identify which data is local, what remains usable, and what is queued for sync.
- **Partial data/outage:** preserve usable areas, identify unavailable functions, and link service status where appropriate.

Empty states are required for Projects, Assets, Marketplace saved/licenses/seller listings, Activity, transcription results, usage history, search, Books Library/Saved/Following/Downloads, player bookmarks/transcript, and every Admin queue.

### 11.2 Durable asynchronous jobs

Generation, model processing, import, export, publishing, moderation, purchase, refund, payout, and download operations do not depend on an open modal or browser tab.

- Jobs use the applicable subset of **Draft**, **Validating**, **Queued**, **Waiting for capacity**, **Running**, **Post-processing**, **Partially complete**, **Action needed**, **Succeeded**, **Failed**, **Cancelling**, **Cancelled**, **Refund pending**, and **Refunded**.
- A status includes last update time, scope, progress when knowable, owner/workspace, expected next event, and allowed actions.
- Closing a surface never implies cancellation. Cancellation is an explicit action with charge/refund consequence shown before confirmation.
- Duplicate submission is prevented through disabled/replaced CTAs and idempotent job receipts; refreshing restores the durable job.
- Active jobs appear in context and in Studio Activity/Admin queues. Completion/failure can notify in-app and through user-configured channels.
- Retry defaults to failed work only and states whether it creates a new charge.

Operation-specific state sequences are part of the interaction contract:

| Operation | Required user-visible states and recovery |
| --- | --- |
| **Studio quote/job** | Validating → Quote ready/expired → Reserving → Queued/running/post-processing → Succeeded/partially complete/failed/cancelled → Settled/released/refund pending/refunded; preserve inputs and never ask for duplicate payment while reconciliation is pending |
| **Upload/import/transcription** | Selecting → Uploading/paused → Uploaded → Validating/processing → Ready/partial/failed; resume safe transfers, retain the source, and identify unsupported/corrupt/poor-quality input separately |
| **Reader Coin-pack or fiat SFX checkout** | Order creating → Provider action needed/awaiting confirmation → Verifying payment → Paid/failed/cancelled → Refund pending/refunded/chargeback review; browser return alone never claims success |
| **Reader Coin unlock** | Validating offer/lots → Confirming spend → Granting entitlement → Unlocked; if spend succeeded before entitlement appears, show **Finalizing access**, block repeat purchase, retain receipt ID, and reconcile automatically |
| **Marketplace/publishing review** | Draft → Automated checks → Human review → Changes requested/rejected/approved → Live/suspended/under appeal/reinstated; every decision links to rationale and the permitted next step |
| **Books stream/download/sync** | Authorizing → Buffering/downloading/syncing → Playing/downloaded/synced or actionable network, storage, lease, entitlement, media, or account-session failure; preserve playback position and local pending changes |
| **Creator payout** | Setup/verification needed → Accruing/held/available → Requested/processing/paid → Failed/returned/disputed; always show fiat currency, hold/retry reason, and provider/reference ID |

### 11.3 Conflict and data protection

Unsynced edits are stored locally when possible. A conflict view compares affected fields/clips and offers keep mine, use remote, or duplicate as a recoverable version. The system must never resolve conflicting script/audio edits by silently discarding one side. Destructive actions identify scope, use soft-delete/archive where policy allows, and state recovery duration.

## 12. Responsive behavior

Designs are validated at content-driven breakpoints, with these shared targets:

| Range | Shell and content behavior |
| --- | --- |
| **Compact: 320–639 px** | Bottom navigation for primary destinations, `More` sheet for the rest, single-column content, full-screen task sheets, sticky safe-area-aware primary actions, persistent compact player/transport |
| **Wide mobile: 640–767 px** | Same information model with two-column cards where useful; sheets may use inset width; no functionality added only at this breakpoint |
| **Tablet: 768–1023 px** | Collapsible overlay rail, one primary canvas plus inspector drawer, two-to-three-column discovery grids, touch-optimized tables/cards, detachable player panel |
| **Compact desktop: 1024–1279 px** | Collapsed/pinnable rail, two-pane editor, inspector or outline drawer, timeline below; filters may collapse into a panel |
| **Desktop: 1280–1535 px** | Labeled persistent rail, three-region Studio workspace, persistent contextual inspector, wider tables and discovery grids |
| **Expanded: 1536 px and above** | More timeline/inspector space and larger grids without unbounded line lengths; core canvas uses a readable maximum width where appropriate |

Additional rules:

- Feature parity applies to Studio, Books, Marketplace seller tools, and authorized Admin actions. Adaptation may change sequence and density, not capability.
- Layout responds to available container width, zoom, and text expansion—not device detection alone.
- Navigation, transport, balance, and save/job state never overlap the active editor or player.
- Data tables become labeled cards or horizontally contained grids with column controls; row and bulk actions remain available.
- Hover is enhancement only. All hover previews/actions also work by focus and tap.
- Drag-and-drop always has select/move, reorder buttons, or numeric alternatives.
- Touch targets are at least 44 × 44 CSS px with safe spacing; mobile controls respect notches and browser safe areas.
- The experience remains operable at 200% zoom and with browser text scaling without loss of action or information.

## 13. Visual direction: quiet, cinematic, and precise

### 13.1 Shared brand language

AudiLink uses a restrained **signal-and-stage** visual system: deep tonal fields suggest a recording stage; fine waveform or spectral lines indicate real activity and timing; warm light identifies human voice and story; cool light identifies tooling and system state. The product should feel composed and spacious before it feels technical. Audio-reactive graphics are functional or momentary, not ornamental wallpaper.

- Use a high-legibility contemporary sans for product UI and data. Books may add an editorial display face for titles and campaign moments, never controls or long body copy.
- Prefer a precise grid, moderate radii, generous breathing room, and intentional rectangular controls. Group primarily with alignment, spacing, type, and subtle tonal change. Capsules are reserved for tags, filters, compact state, and segmented choices.
- A section has no enclosing card by default. Add a surface only when it communicates a distinct interaction layer, selected object, temporary overlay, or independently scrolling region. Add a separator only when users need a semantic boundary; never outline every item in a list, metric, or toolbar.
- Each viewport has one dominant task, at most one adjacent secondary action, and a short set of contextual actions. Lower-frequency actions move into disclosure, an inspector, or an overflow menu without becoming undiscoverable.
- Studio defaults to a deep ink/graphite production environment with restrained spectral cyan/violet and warm amber/coral accents. Track colors have redundant labels/icons.
- Studio has a welcoming public landing route separate from its production workspace. The landing may introduce the product through one carefully bounded interactive audio moment; the workspace stays still until work, playback, or system state justifies movement.
- Books uses richer cover-led color, controlled cinematic gradients, warmer reading surfaces, and editorial whitespace while retaining the shared type, spacing, controls, wallet, and player language. A title or active book—not a grid of equal cards—anchors each view.
- Admin is visually sober and decision-forward. Its opening view prioritizes the small set of exceptions that require action; secondary metrics, configuration, and audit detail are progressively disclosed. Status and risk outrank decorative brand moments.
- Light and dark themes both meet contrast requirements. Cover-derived colors pass through contrast-safe overlays rather than styling controls directly.

### 13.2 Interaction character

The product should feel responsive through precise selection states, waveform scrubbing, take transitions, progressive job feedback, and continuity between a book cover and player. Feedback stays close to the object that changed. It should not simulate a physical mixing desk, animate merely because content entered the viewport, or use novelty animation at the expense of clarity.

## 14. Motion and accessibility

WCAG 2.2 AA is a release requirement, not a post-launch enhancement.

### 14.1 Motion

- Motion has one of four jobs: preserve spatial continuity, explain a state change, confirm direct manipulation, or show real progress. If it does none of these, remove it.
- Press, hover, focus, and compact feedback generally use 100–160 ms. State and disclosure transitions use 180–260 ms. A genuine route, sheet, or large workspace transition may use 260–420 ms when continuity would otherwise be lost.
- Direct manipulation may use a critically damped spring. Navigation and status changes use calm easing and do not bounce. Workspace scale stays between 0.98 and 1.02; blur is never the primary transition and does not persist beyond 120 ms.
- Layout and presence transitions keep an object visually connected to its source. Entry staggering is limited to three meaningful groups and no more than 120 ms total. User input can interrupt every animation immediately.
- Waveforms animate only during playback, recording, or meaningful processing state. No perpetual equalizers, parallax, background particles, auto-moving carousels, cursor followers, or ambient loops inside production, reading, or operations views.
- `prefers-reduced-motion` removes nonessential transforms and smooth scrolling, replaces spatial transitions with immediate changes or a crossfade no longer than 100 ms, disables canvas/WebGL ornament, and leaves progress readable as text.
- Canvas/WebGL effects are progressive enhancement for a bounded Studio marketing or campaign moment only. At most one effect may be active in a viewport; it may not sit behind text controls, accept required input, run while offscreen, or appear in the editor, player, checkout, moderation, finance, or configuration surfaces.
- Playback and samples start only after user action. UI sounds are off by default and never replace visible feedback.

### 14.2 Accessibility requirements

- Minimum contrast is 4.5:1 for normal text and 3:1 for large text, meaningful graphics, focus indicators, and control boundaries/states.
- All functions work with keyboard alone. The timeline includes semantic clip/track lists, documented shortcuts, time entry, nudge, reorder, trim, and gain controls.
- Focus is highly visible, follows visual order, returns to its trigger after sheets/dialogs, and is never trapped outside an active modal.
- Landmarks, headings, labels, descriptions, table semantics, and errors are exposed to assistive technology. Icon-only buttons require accessible names and visible tooltips where helpful.
- Queued, running, complete, failed, balance-changed, purchase, download, and save/sync events use appropriately throttled live announcements.
- Waveforms, color, position, and motion are never the sole source of information; time, text status, speaker/track labels, and numeric controls are available.
- Transcripts support speaker labels and keyboard-follow mode when available. Sound effects have meaningful text descriptions. Caption/transcript absence is explicit.
- Product tutorials and public promotional audio/video provide captions or transcripts; no onboarding instruction is conveyed only through sound.
- Forms associate instructions and errors with fields, preserve entered values, and focus the first invalid field only after a submitted validation attempt.
- Authentication, consent, checkout, moderation, and destructive confirmations are understandable without audio.
- The UI supports text expansion, reflow, locale-sensitive number/currency/time, and right-to-left layout when an RTL locale is supported.

## 15. Reference-image guidance

The reference images are feature research, not a visual template.

### 15.1 Patterns to retain conceptually

- Inline performance and audio-direction controls paired with readable text.
- Multi-speaker text blocks and per-line preview/regeneration.
- Chapter navigation, contextual editing, and a timeline for long-form production.
- Searchable voice/effect discovery with immediate waveform/audio preview.
- A clear choice between voice-creation methods.
- Durable generation history, usage ledger, plan summary, and balance visibility.
- Progressive disclosure for advanced model/audio controls.

### 15.2 Patterns that must not be copied

- Fish Audio branding, logo, copy, asset names, iconography, color palette, or illustration treatment.
- Its exact navigation labels/order, icon-only secondary rail, or three-pane dimensions.
- The pale monochrome/cream visual field, black-pill-heavy control language, or capsule treatment on nearly every component.
- The exact floating sound-effect composer, voice-creation modal composition, pricing-card layout, promotional gradient, tables, or credit header.
- Tiny low-contrast text, unlabeled icons, large low-information blank canvases, controls discoverable only on hover, or layouts dependent on desktop width.
- Raw bracket tags as the only way to discover or edit performance directions.
- Any ambiguity between discovery, ownership, generation history, cost estimate, plan access, and actual balance.

A design review must reject a screen if a reasonable observer would identify it as a reskinned Fish Audio screen even when the logo and colors are removed.

## 16. Design acceptance criteria

A design is ready for implementation only when all criteria below are demonstrated in annotated flows or prototypes:

1. Users can switch between Studio and Books without reauthentication or losing return context; Admin remains absent from that switcher and requires its protected staff entry flow.
2. Ownership is explicit for personal Reader Coins/Books and workspace Studio Credits/projects/assets, including Marketplace fiat/free/Studio-use terms and license destination.
3. All top-level IA destinations have default, loading, first-use empty, filtered empty, populated, permission/plan-gated, offline where applicable, and recoverable error designs.
4. A creator can complete the multi-character audiobook workflow manually or with reviewable AI suggestions, and locks/manual edits cannot be silently overwritten.
5. Generation preflight, queue, progress, partial success, cancellation, retry, charge, and refund states are represented without requiring the initiating page to remain open.
6. Reader Coin content unlock, fiat Reader Coin-pack/standalone-SFX purchase, free acquisition, insufficient Reader Coins, insufficient Studio Credits, plan gate, feature quota, incompatibility, and seller payout are visually and verbally distinct.
7. Marketplace details expose preview, compatibility, license, price/free status, creator/provenance, workspace destination, and owned state before use.
8. Books supports book/serial discovery, save/follow/share/rate, sample, free/paid full-title/chapter/episode acquisition, persistent playback, synchronized progress, bookmarks, protected download management, offline playback, storage failure, repair, and reconnect states.
9. Every customer and authorized Admin operation is available at 320 px width without requiring desktop, landscape orientation, hover, drag, or long-press.
10. Responsive designs are reviewed at 320, 375, 640, 768, 1024, 1280, 1440, and 1600 px, plus 200% zoom and text expansion.
11. Keyboard-only and screen-reader walkthroughs complete creation, purchase, playback, and core Admin exception flows; automated and manual contrast checks meet WCAG 2.2 AA.
12. Reduced-motion prototypes remain understandable; samples never autoplay; active audio and processing states have text equivalents.
13. Navigation, sticky controls, timeline/player, sheets, virtual keyboard, and safe areas do not obscure content at any target viewport.
14. Originality review confirms the retained reference patterns are behavioral abstractions and no screen copies Fish Audio composition, component styling, or visual hierarchy.
15. First-use Studio onboarding creates/resumes the personal workspace, shows the provisional Free plan and Studio Credit balance, offers all five first tasks, identifies chargeable steps, and keeps optional seller verification separate.
16. English is labeled GA and only benchmark-approved additional languages receive a visible Beta label across creation, output, Marketplace, Books, and player details.
17. Cinematic assets and transitions do not block the Books mobile LCP target of 2.5 seconds at the 75th percentile or playback-start targets of 1 second cached and 3 seconds uncached at the 95th percentile on the representative profiles.
18. A visual-density review confirms that each viewport has one dominant task, no more than one adjacent secondary action, and no permanently visible control that belongs in contextual disclosure.
19. A surface-and-border audit confirms that cards, separators, shadows, and outlines each communicate a real boundary or state; repeated content is not presented as a wall of independently outlined boxes.
20. Every animation is annotated with its purpose, duration, interruption behavior, and reduced-motion equivalent. Decorative canvas/WebGL is absent from task surfaces and never delays content or input.
21. Layout and presence transitions introduce no cumulative layout shift, preserve focus/scroll intent, and do not make a rapid workflow wait for animation completion.

This document is the UX contract. Detailed commerce policy, model capability, safety policy, and API specifications may refine the data shown, but must preserve these ownership boundaries, user-facing distinctions, state guarantees, accessibility requirements, and full mobile parity.
