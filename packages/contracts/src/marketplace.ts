import type { AssetId } from "./assets";
import type {
  EntityId,
  IsoTimestamp,
  Money,
  ReviewState,
  StudioCredits,
} from "./common";
import type { ModelFamily, ModelManifestId } from "./models";
import type { ConsentRecordId } from "./trust";

export type VoiceProfileId = EntityId<"voice-profile">;
export type MarketplaceVoiceVersionId = EntityId<"voice-version">;
export type ListingId = EntityId<"listing">;
export type LicenseVersionId = EntityId<"license-version">;
export type GrantedLicenseId = EntityId<"granted-license">;

export type VoiceOrigin = "designedSynthetic" | "selfClone" | "authorizedClone" | "preset";

export interface VoiceProfile {
  readonly id: VoiceProfileId;
  readonly workspaceId: EntityId<"workspace">;
  readonly name: string;
  readonly description: string;
  readonly origin: VoiceOrigin;
  readonly currentVersionId: MarketplaceVoiceVersionId;
  readonly visibility: "private" | "review" | "public";
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

interface VoiceVersionBase {
  readonly id: MarketplaceVoiceVersionId;
  readonly profileId: VoiceProfileId;
  readonly version: number;
  readonly modelFamily: ModelFamily;
  readonly modelManifestId: ModelManifestId;
  readonly referenceAssetIds: readonly AssetId[];
  readonly derivedManifestAssetId: AssetId;
  readonly languageTags: readonly string[];
  readonly styleTags: readonly string[];
  readonly reviewState: ReviewState;
  readonly revokedAt: IsoTimestamp | null;
  readonly createdAt: IsoTimestamp;
}

/** Clone versions cannot exist without the verified consent record that authorized them. */
export type VoiceVersion =
  | (VoiceVersionBase & {
      readonly origin: "selfClone" | "authorizedClone";
      readonly consentRecordId: ConsentRecordId;
    })
  | (VoiceVersionBase & {
      readonly origin: "designedSynthetic" | "preset";
      readonly consentRecordId: ConsentRecordId | null;
    });

export type LicenseVersion =
  | {
      readonly id: LicenseVersionId;
      readonly kind: "voiceStudioUsage";
      readonly version: number;
      readonly studioCreditSurcharge: StudioCredits;
      readonly royaltyBasis: Money;
      readonly externalCommercialOutputsAllowed: boolean;
      readonly termsAssetId: AssetId;
      readonly effectiveFrom: IsoTimestamp;
    }
  | {
      readonly id: LicenseVersionId;
      readonly kind: "soundEffectStudioUsage";
      readonly version: number;
      readonly studioCreditSurcharge: StudioCredits;
      readonly royaltyBasis: Money;
      readonly externalCommercialOutputsAllowed: boolean;
      readonly termsAssetId: AssetId;
      readonly effectiveFrom: IsoTimestamp;
    }
  | {
      readonly id: LicenseVersionId;
      readonly kind: "soundEffectStandaloneDownload";
      readonly version: number;
      readonly fiatPrice: Money;
      readonly nonExclusive: true;
      readonly rawRedistributionAllowed: false;
      readonly modelTrainingAllowed: false;
      readonly termsAssetId: AssetId;
      readonly effectiveFrom: IsoTimestamp;
    }
  | {
      readonly id: LicenseVersionId;
      readonly kind: "free";
      readonly version: number;
      readonly assetUse: "voiceStudioUsage" | "soundEffectStudioUsage";
      readonly externalCommercialOutputsAllowed: boolean;
      readonly termsAssetId: AssetId;
      readonly effectiveFrom: IsoTimestamp;
    };

interface ListingBase {
  readonly id: ListingId;
  readonly workspaceId: EntityId<"workspace">;
  readonly sellerId: EntityId<"user">;
  readonly title: string;
  readonly description: string;
  readonly previewAssetId: AssetId;
  readonly licenseVersionIds: readonly LicenseVersionId[];
  readonly reviewState: ReviewState;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export type Listing =
  | (ListingBase & {
      readonly kind: "voice";
      readonly voiceVersionId: MarketplaceVoiceVersionId;
      readonly effectAssetId?: never;
    })
  | (ListingBase & {
      readonly kind: "soundEffect";
      readonly voiceVersionId?: never;
      readonly effectAssetId: AssetId;
    });

export interface GrantedLicense {
  readonly id: GrantedLicenseId;
  readonly licenseVersionId: LicenseVersionId;
  readonly listingId: ListingId;
  readonly granteeWorkspaceId: EntityId<"workspace">;
  readonly entitlementId: EntityId<"entitlement">;
  readonly acceptedAt: IsoTimestamp;
  readonly revokedAt: IsoTimestamp | null;
}
