# Trust, Safety, Consent, Publishing, and Moderation

**Status:** Approved pre-build policy baseline

**Policy owner:** Trust & Safety

**Required reviewers:** Legal/Privacy, Security, Creator Operations, Product

**Review cadence:** Before launch, quarterly, and after any material law/model/provider change

## 1. Purpose and posture

AudiLink makes realistic speech, cloned voices, synthetic characters, effects, and publishable audio. These capabilities create material risks involving impersonation, fraud, creative rights, biometric-like voice data, minors, deceptive media, and unsafe marketplace content.

AudiLink applies controls at three points:

1. **Prevention/authentication:** establish authority before cloning, listing, or publishing.
2. **Detection/monitoring:** scan requests and outputs, preserve provenance, and review public content.
3. **Post-use response:** accept reports, suspend access, investigate, remediate, and support appeals.

This layered approach aligns with the intervention categories highlighted by the [U.S. Federal Trade Commission's work on voice-cloning harms](https://www.ftc.gov/policy/advocacy-research/tech-at-ftc/2024/04/approaches-address-ai-enabled-voice-cloning) and the lifecycle approach in the [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence).

This document is a product policy and engineering baseline, not jurisdiction-specific legal advice. Launch counsel must map it to every supported buyer, seller, data, and payout jurisdiction.

## 2. Non-negotiable decisions

- Every voice clone requires an affirmative rights attestation.
- A public, shared, monetized, or publication-linked clone requires verified identity plus recorded or signed consent from the represented speaker.
- Public figures and minors may not be cloned, listed, or used as the identity target of a designed voice.
- Synthetic, cloned, or materially AI-manipulated audio is always disclosed to listeners and marketplace users.
- Public or monetized books, serials, voices, and effects require automated checks plus human approval before publication.
- Private content is private by default and is not used for model training without a separate explicit opt-in.
- Marketplace voice artifacts remain inside AudiLink; reference recordings, embeddings, and model packages are never distributed to buyers.
- Rights and licenses are versioned. A buyer retains the version acquired unless a legal/safety order requires a different remedy.
- Moderation and financial actions are auditable and appealable. Posted ledger entries are corrected through compensating entries, never deletion.

## 3. Roles and responsibilities

| Role | Responsibility |
|---|---|
| Creator | Owns or controls submitted text/audio; obtains contributor consent; assigns accurate metadata and disclosure |
| Represented speaker | Grants the specific private/public/monetized voice rights and can exercise revocation rights |
| Publisher | Makes publication rights declarations and accepts responsibility for the edition |
| Reader/buyer | Uses content within granted entitlements/licenses and may report concerns |
| Trust & Safety reviewer | Applies policy, records evidence and rationale, escalates high-risk cases |
| Creator Operations | Validates publishing quality/metadata and communicates remediable issues |
| Finance | Handles seller verification, payout holds, disputes, refunds, and sanctions screening |
| Security/Privacy | Protects recordings, identity evidence, access, retention, and incident response |
| Super-admin | Configures policy/roles but cannot erase audit history or bypass required dual approval |

## 4. Voice-consent classes

### 4.1 Designed synthetic voice

A voice created from a description without intentionally targeting an identifiable person.

Requirements:

- creator confirms the prompt does not seek to imitate a real person;
- automated and human similarity review may be required before public listing;
- listing is labeled “Synthetic designed voice”;
- name, avatar, description, and marketing must not imply endorsement by a real person;
- evidence of convergence on a prohibited public figure or minor blocks publication.

### 4.2 Private self/authorized clone

A clone used only within the creator's private workspace.

Requirements:

- rights attestation naming whether the voice is the creator's own or another adult's;
- source and capture date recorded;
- consent purpose includes private synthesis;
- safety checks and encrypted storage;
- no public sharing, monetization, or publication until upgraded to verified consent.

Self-attestation alone is not enough to make another person's voice public.

### 4.3 Verified public or commercial clone

Required when a voice is listed, shared, monetized, used in a publicly distributed book, or available to another account.

Requirements:

- creator/seller identity verification;
- represented adult speaker identity verification;
- signed or recorded consent that states permitted uses, commercial status, territory/term where relevant, revocation terms, and whether synthetic derivative outputs may persist;
- liveness or equivalent anti-spoof control appropriate to provider risk;
- reviewer comparison of consent speaker and reference sample;
- a verified badge that means consent evidence was reviewed, not that AudiLink endorses the speaker or content;
- renewed verification after material identity, ownership, or agreement change.

Professional studios may submit managed talent releases, but the represented speaker and permitted rights must still be identifiable.

### 4.4 Prohibited identity targets

AudiLink does not accept:

- public officials, candidates, celebrities, widely known creators, executives, or other public figures as clone/design targets;
- any person under 18;
- deceased persons without a separately approved estate/rightsholder program, which is out of V1;
- a person who cannot legally provide consent;
- stolen, secretly recorded, scraped, or deceptively obtained samples;
- attempts to evade checks through accents, misspellings, composite samples, or “parody” labels.

Obvious fictional performance is not an exception to the public-figure/minor target rule.

## 5. Consent lifecycle

ConsentRecord stores:

- represented person and verifying account/provider references;
- permitted voice/profile and sample hashes;
- private, shared, public, monetized, and publication scopes;
- agreement version, evidence type, timestamps, territory/term where used;
- revocation procedure and effect;
- reviewer, status, and linked moderation cases.

States are draft, pending verification, active, restricted, revoked, expired, or superseded.

Before every clone job, listing submission, and publication render, the API resolves an active consent scope. A cached frontend state is never authorization.

### Revocation

- Revocation immediately prevents new synthesis and new acquisitions.
- The voice/listing becomes unavailable while the case is reviewed.
- Reference audio and reusable voice artifacts are deleted or quarantined according to legal hold and security requirements.
- Lawfully published end products and previously granted licenses are evaluated against the signed agreement; they are not silently destroyed.
- AudiLink can delist, mute, replace, refund, or preserve existing access depending on consent terms, safety, law, and buyer rights.
- The speaker and affected creator receive a written outcome and appeal path.

## 6. Content rights and publishing declarations

Before submitting a book, serial, voice, or SFX listing, the publisher declares and, when requested, proves:

- ownership or sufficient license for the manuscript, recording, translation, cover, music, effects, performances, and metadata;
- authority to create and distribute the audiobook/serial edition;
- authority for every represented voice;
- the permitted commercial, territorial, and temporal scope;
- required attribution and third-party restrictions;
- whether content is public domain and the basis for that claim;
- whether AI materially generated or transformed the content.

An imported finished audiobook does not bypass rights, audio-quality, provenance, or moderation review.

AudiLink does not make final rights decisions using Qwen3-0.6B or any automated model. Automation may detect inconsistencies and request evidence; a qualified reviewer decides public/monetized cases.

## 7. Marketplace license policy

### Voice-use license

A marketplace voice license permits synthesis inside AudiLink and incorporation of accepted output into the buyer's lawful end product, subject to the acquired version. It does not permit:

- downloading the reference sample, embedding, adapter, or model artifact;
- reconstructing or extracting the voice;
- impersonation, fraud, endorsement claims, or identity deception;
- sublicensing the standalone voice;
- training another model without a separate explicit grant;
- use beyond the consented/license scope.

### Downloadable SFX license

The default non-exclusive commercial license permits incorporation into a larger end product and reasonable editing. It prohibits:

- resale or redistribution of the substantially standalone file;
- claiming exclusive ownership of a non-exclusive asset;
- model training or dataset inclusion without a separate license;
- unlawful, deceptive, or restricted use.

The exact license text and attribution requirements are versioned and shown before purchase. Ordinary delisting does not revoke a purchased version.

## 8. AI and provenance disclosure

Every public asset and publication stores a provenance manifest describing:

- uploaded, synthetic, cloned, preset, generated, edited, or mixed origin;
- represented speaker/consent reference where applicable;
- exact model and adapter revisions;
- source asset hashes and edit/render manifest;
- publisher, review, and publication timestamps;
- disclosure and machine-readable marking state.

Public UX displays concise labels such as:

- “AI-narrated”
- “Uses verified cloned voices”
- “Synthetic character voices”
- “Includes AI-generated sound effects”

The full details page explains the label without exposing private reference data.

[Article 50 of the EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en) establishes transparency expectations for synthetic audio and deep-fake disclosure, including machine-readable marking where technically feasible. AudiLink adopts disclosure globally as a product baseline rather than attempting to hide it by geography.

Machine-readable provenance should use interoperable standards such as the [C2PA specifications](https://c2pa.org/specifications/specifications/), where audio tooling permits, plus AudiLink's signed internal manifest. A model-native watermark is useful evidence but is never the sole record.

## 9. Prohibited content and conduct

The following cannot be generated, uploaded, listed, sold, or published:

- unauthorized impersonation or deceptive identity claims;
- fraud, scams, phishing, extortion, fabricated evidence, or instructions to evade authentication;
- sexual exploitation or sexualized content involving minors;
- non-consensual sexual or intimate audio;
- credible threats, targeted harassment, or doxxing;
- instructions or content whose primary purpose is facilitating serious illegal harm;
- unlawful hateful content or dehumanizing targeted abuse;
- copyright/trademark/right-of-publicity infringement;
- malicious audio intended to trigger devices, bypass authentication, or deceive safety systems;
- malware, hidden payloads, corrupted media attacks, or abuse of upload/processing infrastructure;
- marketplace spam, stolen/repackaged assets, manipulated reviews, referral fraud, or payout laundering;
- attempts to remove required AI disclosure or provenance from AudiLink-hosted public content.

Fictional violence, horror, mature themes, satire, journalism, education, and artistic work require context-sensitive review and age/content labeling; they are not automatically prohibited. Illegal, non-consensual, identity-deceptive, or exploitative content remains prohibited regardless of artistic framing.

## 10. Submission and review workflow

### States

Draft → Submitted → Automated checks → Human review → Approved → Scheduled/Published

Alternate states:

- Changes requested
- Rejected
- Quarantined
- Suspended
- Takedown pending
- Removed
- Appealed
- Reinstated

### Automated checks

Depending on asset type:

- malware, MIME, codec, duration, and corruption checks;
- metadata stripping/quarantine;
- ASR transcript and text safety classification;
- known/prohibited identity and duplicate-sample signals;
- voice-consent scope resolution;
- copyright/fingerprint and duplicate-listing signals where providers exist;
- clipping, silence, loudness, hallucination, and speech/music leakage checks;
- AI/provenance manifest completeness;
- seller/KYC, payout, plan, and rate-limit state;
- book metadata, chapter order, preview, cover, and file completeness.

Automated approval is not permitted for public/monetized V1 content.

### Human review

Reviewers receive the minimum evidence needed and must record:

- policy clauses applied;
- inspected assets/evidence and automated signals;
- decision and severity;
- required remediation;
- geographic/access restrictions if applicable;
- appeal eligibility;
- second approval for high-severity identity, legal, payout, or permanent-removal decisions.

Reviewers cannot approve their own listings or financial adjustments.

## 11. Reports, takedowns, and appeals

Every public detail page and player offers a report action with categories for identity/consent, copyright, safety, misleading disclosure, quality, fraud, and other.

Service targets:

- credible imminent-harm or minor-safety report: immediate queue, on-call assessment within one hour;
- identity/voice-consent report: restrict new generation promptly and begin assessment within 24 hours;
- complete legal/copyright notice: acknowledge within one business day and route to the defined legal process;
- ordinary policy report: initial assessment within three business days;
- seller appeal: independent review target within seven business days.

Actions are proportional: label correction, preview removal, generation freeze, listing suspension, payment hold, regional block, full takedown, account restriction, or law-enforcement preservation where legally required.

Reporter, creator, speaker, and buyer privacy are protected. The outcome notice describes the result and remedy without exposing unnecessary evidence.

## 12. Privacy and retention

### Principles

- Collect only what is required for authentication, consent, generation, commerce, moderation, and legal obligations.
- State purpose and retention at collection.
- Encrypt sensitive data in transit and at rest.
- Separate public media, protected buyer media, private project media, voice references, and identity evidence.
- Keep identity documents with a qualified verification provider where possible; AudiLink stores references/results instead of document copies.
- Never put manuscripts, raw recordings, identity evidence, presigned URLs, or full prompts in logs, traces, analytics, or workflow history.
- Do not train on user content by default.

These controls reflect data-minimization, purpose-limitation, and storage-limitation principles in [GDPR Article 5](https://eur-lex.europa.eu/eli/reg/2016/679/oj).

### Working retention schedule

| Data | Working retention |
|---|---|
| Private manuscript/original audio | Until user deletes the project/account, subject to recovery window and legal hold |
| Active voice reference | While the voice is active; delete/quarantine after voice deletion or revocation |
| Generated project assets | Until project deletion; published immutable artifact retained while edition/entitlements require it |
| Failed temporary artifacts | Automatic deletion within 7 days unless attached to an active safety incident |
| Identity/KYC evidence | Provider/legal minimum; prefer provider custody |
| Consent agreement and audit proof | Agreement term plus legally approved limitation period |
| Financial ledger/orders/payouts | Statutory accounting/tax period |
| Moderation evidence | Severity-based schedule with legal hold where necessary |
| Security logs | 90 days online plus approved archive, excluding raw content |

Final periods require entity/jurisdiction approval. Deletion creates auditable tombstones and propagates to replicas, caches, and derived reusable artifacts. Backups expire through the documented backup lifecycle rather than ad hoc editing.

## 13. Security controls

- Tenant authorization is enforced in the API and PostgreSQL policies.
- Voice references and consent evidence use envelope encryption with tightly scoped service roles.
- Browser uploads go directly to quarantine storage through short-lived credentials.
- Untrusted media is probed/transcoded in sandboxed workers without broad network or credentials.
- Protected books require short-lived entitlement tokens and signed/offline manifests.
- Secrets and provider keys use managed secret storage and rotation.
- Admin uses phishing-resistant MFA for high-risk roles.
- Financial, consent, model-enable, and takedown actions require reason codes; selected actions require dual control.
- Staff access to private content is just-in-time, case-bound, and audited.
- Security incidents follow containment, evidence preservation, notification assessment, recovery, and post-incident review.

## 14. Seller and payout safety

- Public/monetized sellers complete identity/KYC and supported-country checks.
- Payout-name mismatches, sanctions/provider restrictions, fraud signals, or unresolved consent cases hold withdrawal without erasing earnings.
- A seller's Free or paid revenue share is applied at each transaction and cannot be retroactively changed.
- Ratings, follows, listening, referrals, marketplace usage, and sales are monitored for coordinated manipulation.
- Moderators cannot release their own payout holds; Finance and Trust & Safety maintain separation of duties.

## 15. Reader safety and content labeling

Book and serial pages display:

- age/content advisory;
- AI/cloned/synthetic disclosure;
- cast and creator identity;
- language and Beta-quality notice where applicable;
- free preview and permanent unlock price;
- material license/access limitations;
- report action.

The player preserves disclosure in the title details and first-play context without repeatedly interrupting normal listening. Transcript/character labels are offered when available and do not falsely imply a human-verified transcript unless reviewed.

## 16. Policy tests and metrics

Required tests:

- revoked, expired, wrong-scope, and cross-tenant consent cannot start a job;
- public/minor target fixtures are blocked and escalated;
- private clones cannot be listed or used by another account;
- every public submission reaches a human decision;
- provenance survives regeneration, mixing, export, publication, and protected playback;
- ordinary delisting preserves acquired licenses/entitlements;
- legal/safety removal follows the case-specific remedy;
- reviewer conflicts and unauthorized admin actions are rejected;
- deletion removes reusable voice access and scheduled derived data;
- reports, appeal deadlines, and notification paths work under load.

Launch metrics:

- 100% of public/monetized items have completed automated and human review;
- 100% of cloned public voices resolve to active verified consent;
- 100% of public AI audio carries human-readable disclosure and an internal provenance manifest;
- zero unexplained staff access to private content;
- zero payouts released while a blocking identity/consent case is active;
- report/appeal SLO attainment is measured and visible in Admin.

## 17. Launch gates

- Terms, privacy notice, acceptable-use policy, marketplace licenses, consent release, seller agreement, and takedown/appeal procedure receive counsel approval.
- Operating entity, supported countries, age requirement, KYC/payout provider, data region, and statutory retention are decided.
- Fish and every other model have commercial/license approval.
- Consent verification and revocation work end-to-end.
- Trust & Safety has staffing, training, escalation, on-call, and conflict controls.
- Admin RBAC and immutable audit tests pass.
- Public disclosure and machine-readable provenance are validated on every delivery/export path.
- A table-top exercise covers fraudulent clone, urgent minor-safety report, mass copyright notice, compromised moderator, and model-output incident.

## 18. Deferred programs

- Minor performers;
- public-figure or estate-authorized voices;
- user-to-user messaging and comments;
- creator training-data marketplace;
- voice-model downloads;
- ads and social-task rewards;
- fully automated public publishing;
- jurisdiction-specific exceptions not approved by counsel.
