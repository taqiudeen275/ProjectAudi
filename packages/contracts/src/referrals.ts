import type { EntityId, IsoTimestamp, Money, ReaderCoins } from "./common";
import type { LedgerTransactionId, ReaderCoinLotId } from "./commerce";

export type ReferralCampaignId = EntityId<"referral-campaign">;
export type ReferralId = EntityId<"referral">;

export interface ReferralCampaign {
  readonly id: ReferralCampaignId;
  readonly name: string;
  readonly state: "draft" | "active" | "paused" | "ended";
  readonly qualifyingEvent: "verifiedSignup" | "firstCoinPackPurchase" | "firstContentUnlock";
  readonly referrerReward: ReaderCoins;
  readonly referredUserReward: ReaderCoins;
  readonly rewardExpiresAfterDays: number;
  readonly fiatLiabilityBudget: Money;
  readonly maxRewardsPerUser: number;
  readonly startsAt: IsoTimestamp;
  readonly endsAt: IsoTimestamp | null;
}

export type ReferralState =
  | { readonly kind: "invited"; readonly invitedAt: IsoTimestamp }
  | { readonly kind: "qualified"; readonly qualifiedAt: IsoTimestamp; readonly qualifyingEventRef: string }
  | { readonly kind: "rewarded"; readonly rewardedAt: IsoTimestamp; readonly rewardLotIds: readonly ReaderCoinLotId[]; readonly transactionId: LedgerTransactionId }
  | { readonly kind: "rejected"; readonly rejectedAt: IsoTimestamp; readonly reasonCode: string }
  | { readonly kind: "reversed"; readonly reversedAt: IsoTimestamp; readonly transactionId: LedgerTransactionId; readonly reasonCode: string };

export interface Referral {
  readonly id: ReferralId;
  readonly campaignId: ReferralCampaignId;
  readonly referrerUserId: EntityId<"user">;
  readonly referredUserId: EntityId<"user">;
  readonly state: ReferralState;
  readonly fraudSignalCodes: readonly string[];
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}
