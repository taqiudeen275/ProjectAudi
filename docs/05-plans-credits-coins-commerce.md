# Plans, Studio Credits, Reader Coins, Commerce, and Royalties

**Status:** Approved policy baseline with provisional prices and quantities

**Effective for implementation:** After operating-entity, tax, and payment-provider approval

**Owners:** Product, Finance, Engineering, Creator Operations, Legal

## 1. Purpose

AudiLink has three economically different units. They must never be collapsed into one ambiguous “balance.”

| Unit | Used for | Purchasable | Cash-out |
|---|---|---:|---:|
| **Studio Credits** | AI generation, transcription, processing, and in-app marketplace usage | Yes | No |
| **Reader Coins** | Permanent AudiLink Books content unlocks | Yes; may also be promotional | No |
| **Fiat creator earnings** | Royalties owed to verified creators | Not a user currency | Yes, after KYC, hold, and threshold |

All balances are derived from immutable double-entry ledger entries. No application table may treat a mutable numeric balance as financial truth.

## 2. Governing principles

- Estimate before committing; reserve before running; settle only accepted work.
- Studio Credits and Reader Coins are non-transferable, closed-loop units.
- All Studio Credits roll over until spent or reversed for fraud/chargeback.
- Purchased Reader Coins never expire. Promotional Reader Coins have a disclosed expiry.
- Permanent content entitlements survive creator delisting except where continued access is legally or safely prohibited.
- Every valid paid or promotional content unlock creates a fiat royalty obligation.
- Creator earnings are fiat liabilities, never “redeemable coins” or “cashable credits.”
- Plan, price, multiplier, split, tax, and license revisions are immutable once used by a transaction.
- The UI must show why an action is unavailable: insufficient balance, plan feature gate, concurrency gate, moderation gate, or provider outage are different states.

## 3. Provisional creator plans

These figures are hypotheses for unit-economics testing, not public commitments. Admin publishes versioned replacements prospectively.

| Capability | Free | Creator | Pro |
|---|---:|---:|---:|
| Working monthly price | $0 | $19 USD equivalent | $59 USD equivalent |
| Monthly Studio Credit grant | 1,000 | 25,000 | 100,000 |
| Rollover | Indefinite | Indefinite | Indefinite |
| Concurrent generation jobs | 1 | 2 | 5 |
| Interactive modes | Fast; selected Balanced trials | Fast and Balanced | Fast, Balanced, Studio, Advanced |
| Maximum single batch job | 10 finished minutes | 60 finished minutes | 240 finished minutes |
| Private voice profiles | 2 | 15 | 75 |
| Active public marketplace listings | 3 | 30 | 200, subject to fair use |
| Included project storage | 5 GB | 100 GB | 500 GB |
| Audiobook/serial publishing | After verification/review | After verification/review | After verification/review |
| External commercial-use rights | Yes, subject to source/model rights | Yes | Yes |
| Creator share of net settlement | 40% | 80% | 80% |
| AudiLink share | 60% | 20% | 20% |
| Priority queue | No | Standard paid priority | Highest standard priority |

All core export formats remain available on every plan so verified Free creators can lawfully publish and sell. Plan differences control capacity, throughput, storage, model access, private voice limits, and revenue share—not ownership of the creator's lawful content.

Enterprise, teams, seats, negotiated SLAs, zero-data-retention contracts, and public API quotas are out of V1.

### 3.1 Plan lifecycle

- Monthly credits are issued as a new immutable lot on successful cycle activation.
- Grants never expire under the approved rollover policy.
- On cancellation, the paid plan remains active through the paid period. Afterwards the account uses Free gates and the Free transaction split, while all remaining credits stay usable.
- Upgrade features apply immediately after verified payment; proration follows the subscription provider's configured policy.
- Downgrade limits do not delete projects or voices. Excess resources become read-only and cannot be expanded until the account returns under the limit or upgrades.
- A seller's revenue-share revision is captured when each sale, coin redemption, or licensed marketplace use occurs. Later plan changes never alter past earnings.
- Existing lawful external outputs keep their commercial-use grant after downgrade or cancellation.

## 4. Studio Credit metering

### 4.1 Provisional baseline

The working baseline is **100 Studio Credits per accepted minute of Fast TTS output**. The ledger always uses integers; fractional calculations round up only once at settlement.

| Operation | Working charge |
|---|---:|
| Fast TTS/clone | 100 credits per accepted output minute |
| Balanced TTS/clone | 200 credits per accepted output minute |
| Studio TTS/clone | 400 credits per accepted output minute |
| Generated SFX | 400 credits per accepted output minute, prorated by second |
| Transcription | 25 credits per accepted input minute |
| Mix/master render | 10 credits per rendered program minute |
| New instant-clone profile | 200-credit enrollment operation |
| New designed voice | 500-credit design operation plus audition audio |

An exact model may override its mode's multiplier through a versioned rate card after benchmark results. The user sees the effective rate before confirmation.

Credit rates represent product pricing, not raw GPU seconds. Actual GPU time, provider spend, retries, and egress are internal unit-economics measures.

### 4.2 Estimate, reserve, settle

1. **Estimate:** The API validates plan, capability, content limits, and model availability, then returns a quote ID, maximum credits, rate-card revision, and expiry.
2. **Reserve:** Starting the job atomically moves the quoted maximum from available to reserved. Concurrent requests cannot overspend the same balance.
3. **Run:** The workflow records actual accepted input/output units.
4. **Settle:** A successful job consumes the calculated actual amount and releases the remainder.
5. **Release/refund:** Cancellation before billable work, moderation before inference, provider failure, corrupted output, or a platform-declared unusable result releases the reservation. A partial accepted result settles only accepted units.

Retries caused by AudiLink infrastructure are not separately charged. A creator-requested alternative or regeneration is a new quoted job.

The quote is authoritative during its validity window. A rate change cannot increase an already reserved job.

### 4.3 Credit lot ordering and reversal

- Spend restricted promotional lots first when their restrictions match.
- Then spend the earliest-created unrestricted lot.
- Every settlement records which lots funded it.
- Reversals restore the original lot characteristics.
- Fraud or a payment chargeback may reverse the related unspent purchased lot. If already consumed, the account may enter a restricted negative recovery state; completed lawful creator earnings are handled through the chargeback policy rather than silently deleting unrelated balances.

## 5. Reader Coins

### 5.1 Acquisition

V1 Reader Coins come from:

- purchased coin packs;
- verified referral rewards;
- controlled, Admin-issued launch or support grants.

Rewarded advertisements, social follows/posts, surveys, and open-ended task rewards are deferred.

Purchased and promotional coins remain distinguishable lots. The wallet displays total coins plus the soonest promotional expiry. It spends soonest-expiring eligible promotional coins first, then purchased coins FIFO.

### 5.2 Expiration

- Purchased coins do not expire.
- Each promotional campaign defines an expiry before issuance; the recommended default is 90 days.
- Expiration is an explicit ledger transaction, not deletion.
- Users receive in-product notice at least 14 days and again 48 hours before a promotional lot expires where notification consent permits.
- Admin cannot retroactively shorten an issued lot's expiry.

### 5.3 Content prices and previews

A publication may price:

- the complete standalone book;
- a complete season or volume;
- an individual chapter or episode;
- a remaining-content bundle that excludes units the reader already owns.

Creators choose whole-coin prices within Admin-configured minimum/maximum bounds and suggested ranges. A parent-bundle purchase never charges again for already owned units.

Creators may configure:

- a timed sample;
- one or more fully free chapters/episodes;
- a free introductory volume;
- a future release date.

Preview playback never creates a permanent paid entitlement or creator royalty unless a separate promotional program explicitly says otherwise.

### 5.4 Permanent entitlements

A successful redemption atomically:

1. spends the Reader Coins;
2. creates an immutable order and order item;
3. records the price and royalty-policy revisions;
4. grants the exact permanent entitlement;
5. accrues creator fiat earnings;
6. makes protected streaming/offline playback available.

The entitlement remains after ordinary delisting. Legal takedown, fraud, or serious safety removal may block playback; the case record must state whether replacement, refund, or no-remedy treatment applies.

Reader Coins do not buy Studio assets, Studio Credits, subscriptions, or fiat SFX downloads.

## 6. Reader Coin settlement value

Readers experience a simple coin price, while creators require predictable fiat royalties. Each supported market/currency therefore has a versioned **Reader Coin Settlement Value**.

- Pack prices, taxes, expected processing cost, and discounts must preserve the approved settlement value and platform margin.
- On redemption, gross creator-royalty base equals coins spent multiplied by the recorded settlement value.
- Free-plan sellers receive 40% of that net base; active Creator/Pro sellers receive 80%.
- AudiLink retains the remaining 60% or 20%.
- Promotional-coin redemptions use the same settlement value and are funded by AudiLink's promotion account.
- Actual payment-provider variance belongs to AudiLink and does not make identical content pay a creator differently based on which coin pack a reader bought.

Admin can change the value only prospectively. Each redemption retains the exact version used.

## 7. Marketplace economics

### 7.1 Voices

- Marketplace voices are never downloadable as model weights, embeddings, or reference recordings.
- A listing defines an in-app license surcharge in Studio Credits and a versioned fiat royalty value per accepted use or generated second.
- The creator sees one total Studio Credit estimate: compute plus license surcharge.
- Successful use settles Studio Credits and independently accrues fiat earnings to the voice seller.
- The seller share is 40% on Free or 80% on an active paid plan at transaction time.
- Failed or rejected generation does not create the normal marketplace royalty.

### 7.2 Sound effects

An effect may support:

- in-project use paid with Studio Credits and a fiat royalty accrual; and/or
- a standalone downloadable license purchased in fiat.

Downloadable licenses are versioned, non-exclusive, and permit incorporation into end products under the chosen commercial license. They prohibit resale or redistribution of the raw standalone asset, model training unless separately granted, and misleading claims of authorship. Previously purchased license rights survive ordinary delisting.

### 7.3 Platform-created assets

Admin identifies platform-owned assets separately. Their license surcharge may be zero, but compute charges still apply. AudiLink must not make platform assets appear to have an independent human creator.

## 8. Net revenue and creator earnings

For policy purposes, **net settlement** is the versioned royalty base after applicable transaction taxes, statutory withholdings, refunds, and explicitly disclosed payment-processing treatment. Internal infrastructure cost is not deducted again from a creator's recorded share.

Each earning records:

- creator, listing/publication, and buyer transaction;
- gross/settlement currency and minor-unit amount;
- coins or Studio Credit usage that triggered it;
- seller plan and share revision;
- tax/withholding treatment;
- hold-until date;
- available, held, paid, reversed, or disputed state.

Provisional payout policy:

- creator identity/KYC and payout account must be approved;
- earnings have a 14-day rolling hold;
- payouts are monthly after a $25 USD-equivalent threshold;
- failed payouts return to available earnings;
- chargebacks or refunds before payout reverse held earnings;
- post-payout reversals create a transparent recoverable balance and never rewrite the original transaction.

Exact hold, threshold, countries, currencies, reserves, and tax forms require operating-entity and provider approval.

## 9. Refunds and chargebacks

### Reader Coin packs

- Unused purchased lots may be refunded when required by law or allowed by policy.
- A refund reverses only unspent coins attributable to that purchase.
- Spent packs require case review; the system never creates a silent negative Reader Coin balance.

### Content unlocks

- Duplicate or technically inaccessible purchases are refundable.
- Ordinary consumption refunds follow a published digital-content policy and local law.
- Refunding an unlock revokes the entitlement unless law/support policy grants a different remedy and reverses unpaid creator earnings.
- A legal removal may refund affected users through fiat, coins, or replacement access according to the case decision.

### Studio jobs

- Platform failure or unusable output releases/refunds credits.
- A creator simply preferring a valid output does not automatically make it free; they may generate a new quoted variant.

All refunds and manual adjustments require reason codes. High-value or unusual adjustments require dual approval in Admin.

## 10. Entitlement and limit evaluation

Before any restricted action, the central entitlement service evaluates:

- current plan/version and grace state;
- account verification, moderation, and payout status;
- feature availability;
- model/mode access;
- input/output/batch limits;
- concurrent active jobs;
- storage and voice/listing slots;
- balance and lot restrictions;
- publication/license territory where applicable.

Frontends may preview limits, but only the control API authorizes. Limits cannot be implemented solely by hiding UI.

## 11. Admin controls

AudiLink Admin manages, with immutable audit records:

- plan catalog, prices, grants, limits, and effective dates;
- Studio Credit rate cards and model multipliers;
- Reader Coin packs, settlement values, promotion budgets, and expiries;
- referral campaign eligibility and fraud limits;
- creator shares, holds, thresholds, and payout schedules;
- manual credit/coin/fiat adjustments;
- refunds, disputes, chargebacks, and payout exceptions;
- feature flags and model availability;
- dashboards for issued, reserved, settled, expired, refunded, and outstanding liabilities.

No administrator may edit or delete a posted ledger entry. Corrections use compensating entries. Super-admin can publish configuration but cannot bypass dual approval for high-risk financial actions.

## 12. Accounting and technical invariants

- Every posted transaction balances to zero within its currency/unit.
- Studio Credits, Reader Coins, and each ISO fiat currency have separate ledger accounts.
- No floating-point storage is used. Fiat uses signed 64-bit minor units; credits/coins use integer units.
- Idempotency keys cover purchase creation, webhook processing, reservation, settlement, unlock, refund, earning, and payout.
- Provider webhooks are verified, stored once, and processed asynchronously.
- Browser redirects never grant subscriptions, coins, entitlements, or earnings.
- Reconciliation compares provider clearing, bank settlement, internal orders, ledger entries, entitlements, and payouts.
- A daily automated invariant check pages Finance/Engineering on any imbalance; launch requires zero unexplained variance.

## 13. Fraud controls

- Rate-limit free grants, referrals, clone enrollment, previews, and account creation.
- Referral rewards require eligibility checks and a qualifying event; self-referral, device/payment reuse, and referral rings are reviewed.
- Promotion budgets are capped in fiat settlement value, not only coin count.
- Suspicious accounts may be restricted from spending promotional coins, selling, or withdrawing while purchased access remains handled according to law.
- Velocity, duplicate identity, payment risk, impossible listening, and coordinated marketplace-use signals create review cases.
- Automated flags never confiscate fiat earnings or permanent entitlements without a recorded decision and appeal path.

## 14. Reports and launch gates

Before public commerce:

- operating entity and seller/merchant-of-record are approved;
- launch buyer and creator countries are defined;
- payment, subscription, tax, KYC, and payout adapters pass certification;
- terms define Studio Credits, Reader Coins, expiry, refunds, commercial rights, and payout calculation;
- every provisional plan is benchmarked against cost per accepted minute;
- paid plans meet a projected gross-margin floor approved by Finance;
- promotional redemptions are represented as funded fiat liabilities;
- concurrent-spend and duplicate-webhook property tests show no double spend or double payout;
- restore/reconciliation drills reproduce balances and entitlements from the ledger.

## 15. Out of scope for V1

- Reader subscription catalog;
- peer-to-peer coin/credit transfer or gifting;
- user cash-out of coins/credits;
- rewarded ads and social-task rewards;
- teams, shared wallets, seat billing, negotiated enterprise plans;
- creator advances, exclusivity bonuses, auctions, or dynamic royalty pools;
- cryptocurrency or blockchain settlement.
