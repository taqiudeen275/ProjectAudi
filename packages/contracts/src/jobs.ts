import type { AssetId } from "./assets";
import type {
  EntityId,
  IdempotencyKey,
  IsoTimestamp,
  Milliseconds,
  ObjectKey,
  Sha256,
  StudioCredits,
  TraceId,
} from "./common";
import type { ModelCapability, ModelManifestId, RateCardVersionId } from "./models";
import type { ProjectRevisionRef, VoiceVersionId } from "./projects";

export type GenerationJobId = EntityId<"generation-job">;
export type GenerationAttemptId = EntityId<"generation-attempt">;
export type CreditQuoteId = EntityId<"credit-quote">;
export type CreditReservationId = EntityId<"credit-reservation">;

export type GenerationJobKind =
  | "textToSpeech"
  | "voiceCloneEnrollment"
  | "voiceDesign"
  | "soundEffect"
  | "transcription"
  | "alignment"
  | "mixMaster"
  | "audiobookRender"
  | "publicationPackage";

export type GenerationStage =
  | "validating"
  | "waitingForCapacity"
  | "preparingModel"
  | "generating"
  | "aligning"
  | "mixing"
  | "mastering"
  | "qualityCheck"
  | "packaging"
  | "finalizing";

export interface JobProgress {
  readonly stage: GenerationStage;
  readonly completedUnits: number;
  readonly totalUnits: number | null;
  readonly percent: number | null;
  readonly message: string;
  readonly updatedAt: IsoTimestamp;
}

export type GenerationJobState =
  | { readonly kind: "queued"; readonly queuedAt: IsoTimestamp }
  | { readonly kind: "dispatching"; readonly startedAt: IsoTimestamp }
  | { readonly kind: "running"; readonly startedAt: IsoTimestamp; readonly progress: JobProgress }
  | { readonly kind: "postProcessing"; readonly startedAt: IsoTimestamp; readonly progress: JobProgress }
  | { readonly kind: "succeeded"; readonly completedAt: IsoTimestamp; readonly outputAssetIds: readonly AssetId[] }
  | { readonly kind: "failed"; readonly completedAt: IsoTimestamp; readonly errorCode: string; readonly retryable: boolean }
  | { readonly kind: "cancelled"; readonly completedAt: IsoTimestamp; readonly cancelledById: EntityId<"actor"> };

export interface StudioCreditQuote {
  readonly id: CreditQuoteId;
  readonly workspaceId: EntityId<"workspace">;
  readonly operation: GenerationJobKind;
  readonly maximumCredits: StudioCredits;
  readonly rateCardVersionId: RateCardVersionId;
  readonly expiresAt: IsoTimestamp;
  readonly assumptions: Readonly<Record<string, string | number | boolean>>;
}

export type CreditReservationState =
  | { readonly kind: "reserved"; readonly reservedAt: IsoTimestamp; readonly amount: StudioCredits }
  | { readonly kind: "settled"; readonly settledAt: IsoTimestamp; readonly reserved: StudioCredits; readonly consumed: StudioCredits }
  | { readonly kind: "released"; readonly releasedAt: IsoTimestamp; readonly reserved: StudioCredits; readonly reason: string };

export interface GenerationJob {
  readonly id: GenerationJobId;
  readonly workspaceId: EntityId<"workspace">;
  readonly projectRevision: ProjectRevisionRef | null;
  readonly kind: GenerationJobKind;
  readonly capability: ModelCapability;
  readonly modelManifestId: ModelManifestId;
  readonly voiceVersionId: VoiceVersionId | null;
  readonly quoteId: CreditQuoteId;
  readonly reservationId: CreditReservationId;
  readonly reservationState: CreditReservationState;
  readonly idempotencyKey: IdempotencyKey;
  readonly currentAttempt: number;
  readonly state: GenerationJobState;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface GenerationAttempt {
  readonly id: GenerationAttemptId;
  readonly jobId: GenerationJobId;
  readonly attempt: number;
  readonly modelManifestId: ModelManifestId;
  readonly workerId: string;
  readonly startedAt: IsoTimestamp;
  readonly heartbeatAt: IsoTimestamp;
  readonly completedAt: IsoTimestamp | null;
}

interface JobEventBase {
  readonly jobId: GenerationJobId;
  readonly eventId: string;
  readonly occurredAt: IsoTimestamp;
}

export type GenerationJobEvent =
  | (JobEventBase & { readonly type: "snapshot"; readonly job: GenerationJob })
  | (JobEventBase & { readonly type: "progress"; readonly progress: JobProgress })
  | (JobEventBase & { readonly type: "artifact"; readonly assetId: AssetId; readonly purpose: "preview" | "final" })
  | (JobEventBase & { readonly type: "terminal"; readonly state: Extract<GenerationJobState, { kind: "succeeded" | "failed" | "cancelled" }> })
  | (JobEventBase & { readonly type: "heartbeat" });

export const JOB_EVENT_TYPES = ["snapshot", "progress", "artifact", "terminal", "heartbeat"] as const;

export interface ModelAdapterRequest {
  readonly jobId: GenerationJobId;
  readonly workspaceId: EntityId<"workspace">;
  readonly projectRevision: ProjectRevisionRef | null;
  readonly modelManifestId: ModelManifestId;
  readonly textAssetId: AssetId | null;
  readonly voiceVersionId: VoiceVersionId | null;
  readonly referenceAssetIds: readonly AssetId[];
  readonly languageTag: string;
  readonly seed: number | null;
  readonly controls: Readonly<Record<string, string | number | boolean>>;
  readonly output: {
    readonly format: "wav" | "flac";
    readonly sampleRateHz: number;
    readonly channels: 1 | 2;
  };
  readonly traceId: TraceId;
}

export interface ModelAdapterResult {
  readonly jobId: GenerationJobId;
  readonly objectKey: ObjectKey;
  readonly sha256: Sha256;
  readonly durationMs: Milliseconds;
  readonly sampleRateHz: number;
  readonly channels: 1 | 2;
  readonly format: "wav" | "flac";
  readonly alignmentAssetId: AssetId | null;
  readonly integratedLoudnessLufs: number;
  readonly truePeakDbtp: number;
  readonly modelManifestId: ModelManifestId;
  readonly inferenceParameters: Readonly<Record<string, string | number | boolean>>;
  readonly safetyFlags: readonly string[];
  readonly provenanceFlags: readonly string[];
  readonly billableUnits: number;
}
