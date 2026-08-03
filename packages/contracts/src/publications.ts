import type { AssetId } from "./assets";
import type {
  EntityId,
  IsoTimestamp,
  Milliseconds,
  ReaderCoins,
  ReviewState,
  Sha256,
} from "./common";
import type { ProjectRevisionRef } from "./projects";

export type PublicationId = EntityId<"publication">;
export type ContentUnitId = EntityId<"content-unit">;
export type PublicationReleaseId = EntityId<"publication-release">;
export type PublicationPriceVersionId = EntityId<"publication-price-version">;

export type PublicationKind = "standaloneAudiobook" | "bookSeries" | "serial";
export type ContentUnitKind = "book" | "volume" | "season" | "chapter" | "episode";

export interface Publication {
  readonly id: PublicationId;
  readonly workspaceId: EntityId<"workspace">;
  readonly creatorId: EntityId<"user">;
  readonly kind: PublicationKind;
  readonly title: string;
  readonly subtitle: string | null;
  readonly description: string;
  readonly languageTag: string;
  readonly coverAssetId: AssetId;
  readonly currentReleaseId: PublicationReleaseId | null;
  readonly reviewState: ReviewState;
  readonly aiDisclosure: readonly AiDisclosureLabel[];
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface ContentUnit {
  readonly id: ContentUnitId;
  readonly publicationId: PublicationId;
  readonly parentContentUnitId: ContentUnitId | null;
  readonly kind: ContentUnitKind;
  readonly title: string;
  readonly description: string | null;
  readonly order: number;
  readonly durationMs: Milliseconds;
  readonly audioAssetId: AssetId | null;
  readonly previewAssetId: AssetId | null;
  readonly releaseAt: IsoTimestamp | null;
}

export type PublicationPrice =
  | { readonly kind: "free" }
  | { readonly kind: "readerCoins"; readonly amount: ReaderCoins };

export interface PublicationPriceVersion {
  readonly id: PublicationPriceVersionId;
  readonly publicationId: PublicationId;
  readonly contentUnitId: ContentUnitId | null;
  readonly price: PublicationPrice;
  readonly effectiveFrom: IsoTimestamp;
  readonly effectiveUntil: IsoTimestamp | null;
  readonly version: number;
}

export interface ProtectedAudioResource {
  readonly contentUnitId: ContentUnitId;
  readonly streamManifestAssetId: AssetId;
  readonly offlinePackageAssetId: AssetId | null;
  readonly durationMs: Milliseconds;
  readonly sha256: Sha256;
}

export type AiDisclosureLabel =
  | "aiNarrated"
  | "verifiedClonedVoices"
  | "syntheticCharacterVoices"
  | "aiGeneratedSoundEffects";

export interface PublicationManifest {
  readonly schemaVersion: 1;
  readonly publicationId: PublicationId;
  readonly releaseId: PublicationReleaseId;
  readonly orderedContentUnitIds: readonly ContentUnitId[];
  readonly audioResources: readonly ProtectedAudioResource[];
  readonly coverAssetId: AssetId;
  readonly priceVersionIds: readonly PublicationPriceVersionId[];
  readonly aiDisclosure: readonly AiDisclosureLabel[];
  readonly createdAt: IsoTimestamp;
}

export interface PublicationRelease {
  readonly id: PublicationReleaseId;
  readonly publicationId: PublicationId;
  readonly releaseNumber: number;
  readonly sourceProjectRevision: ProjectRevisionRef | null;
  readonly importedFinishedAudio: boolean;
  readonly manifestAssetId: AssetId;
  readonly manifestSha256: Sha256;
  readonly reviewState: ReviewState;
  readonly publishedAt: IsoTimestamp | null;
  readonly createdAt: IsoTimestamp;
}

