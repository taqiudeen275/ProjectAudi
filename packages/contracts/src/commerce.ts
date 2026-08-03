import type {
  BasisPoints,
  EntityId,
  IdempotencyKey,
  IsoCurrencyCode,
  IsoTimestamp,
  MinorUnits,
  Money,
  ReaderCoinDelta,
  ReaderCoins,
  StudioCreditDelta,
  StudioCredits,
} from "./common";
import type { GenerationJobId, CreditReservationId } from "./jobs";
import type { GrantedLicenseId, LicenseVersionId, ListingId } from "./marketplace";
import type {
  ContentUnitId,
  PublicationId,
  PublicationPriceVersionId,
  PublicationReleaseId,
} from "./publications";

export type WalletId = EntityId<"wallet">;
export type LedgerAccountId = EntityId<"ledger-account">;
export type LedgerTransactionId = EntityId<"ledger-transaction">;
export type LedgerEntryId = EntityId<"ledger-entry">;
export type CreditLotId = EntityId<"studio-credit-lot">;
export type ReaderCoinLotId = EntityId<"reader-coin-lot">;
export type EntitlementId = EntityId<"entitlement">;
export type OrderId = EntityId<"order">;
export type OrderItemId = EntityId<"order-item">;
export type CreatorEarningId = EntityId<"creator-earning">;
export type PlanVersionId = EntityId<"plan-version">;
export type RevenueShareVersionId = EntityId<"revenue-share-version">;
export type PayoutId = EntityId<"payout">;

export type Wallet = StudioCreditWallet | ReaderCoinWallet;

export interface StudioCreditWallet {
  readonly id: WalletId;
  readonly ownerWorkspaceId: EntityId<"workspace">;
  readonly unit: "studioCredits";
  readonly available: StudioCredits;
  readonly reserved: StudioCredits;
  readonly updatedAt: IsoTimestamp;
}

export interface ReaderCoinWallet {
  readonly id: WalletId;
  readonly ownerUserId: EntityId<"user">;
  readonly unit: "readerCoins";
  readonly available: ReaderCoins;
  readonly promotionalExpiringSoon: ReaderCoins;
  readonly updatedAt: IsoTimestamp;
}

export type StudioCreditLotSource = "monthlyGrant" | "purchase" | "promotion" | "supportAdjustment";

export interface StudioCreditLot {
  readonly id: CreditLotId;
  readonly walletId: WalletId;
  readonly source: StudioCreditLotSource;
  readonly issued: StudioCredits;
  readonly remaining: StudioCredits;
  /** All Studio Credits roll over under the approved V1 policy. */
  readonly expiresAt: null;
  readonly restrictions: readonly string[];
  readonly sourceTransactionId: LedgerTransactionId;
  readonly createdAt: IsoTimestamp;
}

export interface PurchasedReaderCoinLot {
  readonly id: ReaderCoinLotId;
  readonly walletId: WalletId;
  readonly source: "purchase";
  readonly issued: ReaderCoins;
  readonly remaining: ReaderCoins;
  /** Purchased Reader Coins never expire. */
  readonly expiresAt: null;
  readonly sourceTransactionId: LedgerTransactionId;
  readonly createdAt: IsoTimestamp;
}

export interface PromotionalReaderCoinLot {
  readonly id: ReaderCoinLotId;
  readonly walletId: WalletId;
  readonly source: "referral" | "adminGrant";
  readonly issued: ReaderCoins;
  readonly remaining: ReaderCoins;
  readonly expiresAt: IsoTimestamp;
  readonly campaignId: EntityId<"referral-campaign"> | null;
  readonly sourceTransactionId: LedgerTransactionId;
  readonly createdAt: IsoTimestamp;
}

export type ReaderCoinLot = PurchasedReaderCoinLot | PromotionalReaderCoinLot;

interface LedgerEntryBase {
  readonly id: LedgerEntryId;
  readonly transactionId: LedgerTransactionId;
  readonly accountId: LedgerAccountId;
  readonly memo: string;
  readonly createdAt: IsoTimestamp;
}

export interface StudioCreditLedgerEntry extends LedgerEntryBase {
  readonly unit: "studioCredits";
  readonly delta: StudioCreditDelta;
}

export interface ReaderCoinLedgerEntry extends LedgerEntryBase {
  readonly unit: "readerCoins";
  readonly delta: ReaderCoinDelta;
}

export interface FiatLedgerEntry extends LedgerEntryBase {
  readonly unit: "fiat";
  readonly currency: IsoCurrencyCode;
  readonly deltaMinorUnits: MinorUnits;
}

type EntrySet<TEntry> = readonly [TEntry, TEntry, ...TEntry[]];

interface LedgerTransactionBase {
  readonly id: LedgerTransactionId;
  readonly idempotencyKey: IdempotencyKey;
  readonly reason:
    | "issue"
    | "reserve"
    | "settle"
    | "release"
    | "expire"
    | "purchase"
    | "unlock"
    | "earning"
    | "refund"
    | "chargeback"
    | "adjustment"
    | "payout"
    | "reversal";
  readonly reversesTransactionId: LedgerTransactionId | null;
  readonly reference: string;
  readonly postedAt: IsoTimestamp;
  readonly postedById: EntityId<"actor">;
}

export type LedgerTransaction =
  | (LedgerTransactionBase & {
      readonly unit: "studioCredits";
      readonly entries: EntrySet<StudioCreditLedgerEntry>;
    })
  | (LedgerTransactionBase & {
      readonly unit: "readerCoins";
      readonly entries: EntrySet<ReaderCoinLedgerEntry>;
    })
  | (LedgerTransactionBase & {
      readonly unit: "fiat";
      readonly currency: IsoCurrencyCode;
      readonly entries: EntrySet<FiatLedgerEntry>;
    });

export interface CreditLotAllocation {
  readonly lotId: CreditLotId;
  readonly amount: StudioCredits;
}

export interface CreditSettlement {
  readonly generationJobId: GenerationJobId;
  readonly reservationId: CreditReservationId;
  readonly reserved: StudioCredits;
  readonly consumed: StudioCredits;
  readonly released: StudioCredits;
  readonly allocations: readonly CreditLotAllocation[];
  readonly transactionId: LedgerTransactionId;
  readonly settledAt: IsoTimestamp;
}

export interface ReaderCoinLotAllocation {
  readonly lotId: ReaderCoinLotId;
  readonly amount: ReaderCoins;
}

interface ContentOrderItemBase {
  readonly id: OrderItemId;
  readonly publicationId: PublicationId;
  readonly publicationReleaseId: PublicationReleaseId;
  readonly contentUnitId: ContentUnitId | null;
  readonly priceVersionId: PublicationPriceVersionId;
  readonly entitlementId: EntitlementId;
}

export interface ReaderCoinOrderItem extends ContentOrderItemBase {
  readonly coinPrice: ReaderCoins;
}

export interface FreeContentOrderItem extends ContentOrderItemBase {
  readonly coinPrice?: never;
}

export interface ReaderCoinOrder {
  readonly id: OrderId;
  readonly buyerUserId: EntityId<"user">;
  readonly instrument: "readerCoins";
  readonly total: ReaderCoins;
  readonly allocations: readonly ReaderCoinLotAllocation[];
  readonly items: readonly ReaderCoinOrderItem[];
  readonly spendTransactionId: LedgerTransactionId;
  readonly idempotencyKey: IdempotencyKey;
  readonly createdAt: IsoTimestamp;
}

export interface FreeContentOrder {
  readonly id: OrderId;
  readonly buyerUserId: EntityId<"user">;
  readonly instrument: "free";
  readonly items: readonly FreeContentOrderItem[];
  readonly idempotencyKey: IdempotencyKey;
  readonly createdAt: IsoTimestamp;
}

export type ContentOrder = ReaderCoinOrder | FreeContentOrder;

interface EntitlementBase {
  readonly id: EntitlementId;
  readonly ownerUserId: EntityId<"user">;
  readonly state: "active" | "blocked" | "revoked";
  readonly grantedAt: IsoTimestamp;
  readonly revokedAt: IsoTimestamp | null;
  readonly acceptedTermsVersion: string;
}

export type Entitlement =
  | (EntitlementBase & {
      readonly kind: "publication";
      readonly publicationId: PublicationId;
      readonly releaseId: PublicationReleaseId;
      readonly contentUnitId: ContentUnitId | null;
      readonly acquisition: "free" | "readerCoins";
      readonly permanent: true;
    })
  | (EntitlementBase & {
      readonly kind: "voiceStudioUsage";
      readonly listingId: ListingId;
      readonly licenseVersionId: LicenseVersionId;
      readonly grantedLicenseId: GrantedLicenseId;
    })
  | (EntitlementBase & {
      readonly kind: "soundEffectStudioUsage";
      readonly listingId: ListingId;
      readonly licenseVersionId: LicenseVersionId;
      readonly grantedLicenseId: GrantedLicenseId;
    })
  | (EntitlementBase & {
      readonly kind: "soundEffectStandaloneDownload";
      readonly listingId: ListingId;
      readonly licenseVersionId: LicenseVersionId;
      readonly grantedLicenseId: GrantedLicenseId;
      readonly fiatOrderId: OrderId;
    });

export type SellerPlanCode = "free" | "creator" | "pro";

export interface RevenueShareSnapshot {
  readonly versionId: RevenueShareVersionId;
  readonly sellerPlanCode: SellerPlanCode;
  readonly creatorShareBps: BasisPoints;
  readonly platformShareBps: BasisPoints;
}

export type EarningSource =
  | { readonly kind: "readerCoinRedemption"; readonly orderItemId: OrderItemId; readonly coins: ReaderCoins }
  | { readonly kind: "voiceStudioUse"; readonly listingId: ListingId; readonly generationJobId: GenerationJobId }
  | { readonly kind: "soundEffectStudioUse"; readonly listingId: ListingId; readonly generationJobId: GenerationJobId }
  | { readonly kind: "soundEffectDownload"; readonly listingId: ListingId; readonly fiatOrderId: OrderId };

export interface CreatorEarning {
  readonly id: CreatorEarningId;
  readonly creatorId: EntityId<"user">;
  readonly source: EarningSource;
  readonly grossRoyaltyBase: Money;
  readonly creatorAmount: Money;
  readonly platformAmount: Money;
  readonly revenueShare: RevenueShareSnapshot;
  readonly taxWithheld: Money | null;
  readonly state: "pending" | "available" | "payoutPending" | "paid" | "reversed" | "disputed";
  readonly holdUntil: IsoTimestamp;
  readonly payoutId: PayoutId | null;
  readonly ledgerTransactionId: LedgerTransactionId;
  readonly createdAt: IsoTimestamp;
}

export interface PlanLimits {
  readonly monthlyStudioCreditGrant: StudioCredits;
  readonly concurrentGenerationJobs: number;
  readonly modes: readonly ("fast" | "balanced" | "studio" | "advanced")[];
  readonly maxSingleBatchFinishedMinutes: number;
  readonly privateVoiceProfiles: number;
  readonly activePublicListings: number;
  readonly storageGb: number;
  readonly publishingAfterVerification: true;
  readonly externalCommercialUseRights: true;
  readonly coreExportFormats: readonly ["m4b", "mp3", "wav"];
}

export interface PlanVersion {
  readonly id: PlanVersionId;
  readonly code: SellerPlanCode;
  readonly version: number;
  readonly monthlyPrice: Money;
  readonly limits: PlanLimits;
  readonly revenueShare: RevenueShareSnapshot;
  readonly effectiveFrom: IsoTimestamp;
  readonly effectiveUntil: IsoTimestamp | null;
  readonly provisional: boolean;
}

type ProvisionalPlanDefinition = {
  readonly monthlyPriceMinorUnitsUsd: MinorUnits;
  readonly limits: PlanLimits;
  readonly creatorShareBps: BasisPoints;
  readonly platformShareBps: BasisPoints;
};

const credits = (value: number) => value as StudioCredits;
const bps = (value: number) => value as BasisPoints;
const usdMinor = (value: string) => value as MinorUnits;

export const PROVISIONAL_PLAN_CATALOG = {
  free: {
    monthlyPriceMinorUnitsUsd: usdMinor("0"),
    limits: {
      monthlyStudioCreditGrant: credits(1_000),
      concurrentGenerationJobs: 1,
      modes: ["fast", "balanced"],
      maxSingleBatchFinishedMinutes: 10,
      privateVoiceProfiles: 2,
      activePublicListings: 3,
      storageGb: 5,
      publishingAfterVerification: true,
      externalCommercialUseRights: true,
      coreExportFormats: ["m4b", "mp3", "wav"],
    },
    creatorShareBps: bps(4_000),
    platformShareBps: bps(6_000),
  },
  creator: {
    monthlyPriceMinorUnitsUsd: usdMinor("1900"),
    limits: {
      monthlyStudioCreditGrant: credits(25_000),
      concurrentGenerationJobs: 2,
      modes: ["fast", "balanced"],
      maxSingleBatchFinishedMinutes: 60,
      privateVoiceProfiles: 15,
      activePublicListings: 30,
      storageGb: 100,
      publishingAfterVerification: true,
      externalCommercialUseRights: true,
      coreExportFormats: ["m4b", "mp3", "wav"],
    },
    creatorShareBps: bps(8_000),
    platformShareBps: bps(2_000),
  },
  pro: {
    monthlyPriceMinorUnitsUsd: usdMinor("5900"),
    limits: {
      monthlyStudioCreditGrant: credits(100_000),
      concurrentGenerationJobs: 5,
      modes: ["fast", "balanced", "studio", "advanced"],
      maxSingleBatchFinishedMinutes: 240,
      privateVoiceProfiles: 75,
      activePublicListings: 200,
      storageGb: 500,
      publishingAfterVerification: true,
      externalCommercialUseRights: true,
      coreExportFormats: ["m4b", "mp3", "wav"],
    },
    creatorShareBps: bps(8_000),
    platformShareBps: bps(2_000),
  },
} as const satisfies Record<SellerPlanCode, ProvisionalPlanDefinition>;

export type CreditRateRule =
  | { readonly operation: "fastTts"; readonly basis: "acceptedOutputMinute"; readonly credits: StudioCredits }
  | { readonly operation: "balancedTts"; readonly basis: "acceptedOutputMinute"; readonly credits: StudioCredits }
  | { readonly operation: "studioTts"; readonly basis: "acceptedOutputMinute"; readonly credits: StudioCredits }
  | { readonly operation: "generatedSfx"; readonly basis: "acceptedOutputMinute"; readonly credits: StudioCredits }
  | { readonly operation: "transcription"; readonly basis: "acceptedInputMinute"; readonly credits: StudioCredits }
  | { readonly operation: "mixMaster"; readonly basis: "renderedProgramMinute"; readonly credits: StudioCredits }
  | { readonly operation: "instantClone"; readonly basis: "operation"; readonly credits: StudioCredits }
  | { readonly operation: "designedVoice"; readonly basis: "operation"; readonly credits: StudioCredits };

export const PROVISIONAL_STUDIO_CREDIT_RATES: readonly CreditRateRule[] = [
  { operation: "fastTts", basis: "acceptedOutputMinute", credits: credits(100) },
  { operation: "balancedTts", basis: "acceptedOutputMinute", credits: credits(200) },
  { operation: "studioTts", basis: "acceptedOutputMinute", credits: credits(400) },
  { operation: "generatedSfx", basis: "acceptedOutputMinute", credits: credits(400) },
  { operation: "transcription", basis: "acceptedInputMinute", credits: credits(25) },
  { operation: "mixMaster", basis: "renderedProgramMinute", credits: credits(10) },
  { operation: "instantClone", basis: "operation", credits: credits(200) },
  { operation: "designedVoice", basis: "operation", credits: credits(500) },
] as const;
