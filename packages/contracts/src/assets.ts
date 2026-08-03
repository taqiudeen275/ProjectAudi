import type {
  ActorRef,
  EntityId,
  Hertz,
  IsoTimestamp,
  Milliseconds,
  ObjectKey,
  Sha256,
} from "./common";

export type AssetId = EntityId<"asset">;
export type AssetVariantId = EntityId<"asset-variant">;

export const ASSET_KINDS = [
  "manuscript",
  "voiceReference",
  "audioSource",
  "generatedAudio",
  "soundEffect",
  "cover",
  "transcript",
  "alignment",
  "waveform",
  "publicationManifest",
  "protectedOfflinePackage",
  "export",
] as const;
export type AssetKind = (typeof ASSET_KINDS)[number];

export type AssetLifecycleState =
  | "uploading"
  | "pendingScan"
  | "quarantined"
  | "available"
  | "blocked"
  | "deleted";

export type AssetOrigin =
  | "uploaded"
  | "synthetic"
  | "cloned"
  | "preset"
  | "generated"
  | "edited"
  | "mixed";

export interface AudioMetadata {
  readonly mediaType: "audio";
  readonly durationMs: Milliseconds;
  readonly sampleRateHz: Hertz;
  readonly channels: 1 | 2;
  readonly codec: string;
  readonly container: string;
  readonly integratedLoudnessLufs?: number;
  readonly truePeakDbtp?: number;
}

export interface ImageMetadata {
  readonly mediaType: "image";
  readonly width: number;
  readonly height: number;
  readonly format: "avif" | "jpeg" | "png" | "webp";
}

export interface TextMetadata {
  readonly mediaType: "text";
  readonly encoding: "utf-8";
  readonly characterCount: number;
  readonly language?: string;
}

export interface BinaryMetadata {
  readonly mediaType: "binary";
  readonly format: string;
}

export type AssetMediaMetadata =
  | AudioMetadata
  | ImageMetadata
  | TextMetadata
  | BinaryMetadata;

export interface Asset {
  readonly id: AssetId;
  readonly workspaceId: EntityId<"workspace">;
  readonly kind: AssetKind;
  readonly state: AssetLifecycleState;
  readonly origin: AssetOrigin;
  readonly objectKey: ObjectKey;
  readonly sha256: Sha256;
  readonly byteLength: number;
  readonly contentType: string;
  readonly metadata: AssetMediaMetadata;
  readonly sourceAssetIds: readonly AssetId[];
  readonly createdAt: IsoTimestamp;
  readonly createdBy: ActorRef;
}

export interface AssetVariant {
  readonly id: AssetVariantId;
  readonly assetId: AssetId;
  readonly purpose: "preview" | "waveform" | "stream" | "offline" | "export";
  readonly objectKey: ObjectKey;
  readonly sha256: Sha256;
  readonly metadata: AssetMediaMetadata;
  readonly createdAt: IsoTimestamp;
}

