import type { AssetId } from "./assets";
import type {
  EntityId,
  Hertz,
  IsoTimestamp,
  SemanticVersion,
  Sha256,
} from "./common";

export type ModelManifestId = EntityId<"model-manifest">;
export type ModelRouteId = EntityId<"model-route">;
export type RateCardVersionId = EntityId<"rate-card-version">;

export const MODEL_FAMILIES = [
  "qwen3TtsBase06b",
  "qwen3TtsBase17b",
  "qwen3TtsCustomVoice06b",
  "qwen3TtsCustomVoice17b",
  "luxTts",
  "chatterboxMultilingual",
  "chatterboxTurbo",
  "tada1b",
  "tada3b",
  "kokoro82m",
  "fishS2Pro",
  "qwenVoiceDesign",
  "mossSoundEffectV2",
  "whisper",
  "qwen3Helper06b",
] as const;
export type ModelFamily = (typeof MODEL_FAMILIES)[number];

export const MODEL_CAPABILITIES = [
  "textToSpeech",
  "voiceCloning",
  "voiceDesign",
  "soundEffectGeneration",
  "transcription",
  "alignment",
  "metadataAssistance",
  "manuscriptAssistance",
] as const;
export type ModelCapability = (typeof MODEL_CAPABILITIES)[number];

export const EXPERIENCE_MODES = ["fast", "balanced", "studio", "advanced"] as const;
export type ExperienceMode = (typeof EXPERIENCE_MODES)[number];

export type ModelControl =
  | "seed"
  | "temperature"
  | "topP"
  | "topK"
  | "speed"
  | "pitch"
  | "energy"
  | "emotion"
  | "styleTags"
  | "language"
  | "speakerReference"
  | "duration";

export type ModelApprovalStatus =
  | "discovered"
  | "licenseReview"
  | "benchmarking"
  | "approvedBeta"
  | "approvedGa"
  | "restricted"
  | "blocked"
  | "retired";

export type CommercialApproval =
  | { readonly status: "approved"; readonly approvedAt: IsoTimestamp; readonly termsRef: string }
  | { readonly status: "nonCommercialOnly"; readonly reason: string }
  | { readonly status: "agreementRequired"; readonly reason: string }
  | { readonly status: "underReview"; readonly reason: string }
  | { readonly status: "prohibited"; readonly reason: string };

export interface ModelLanguageSupport {
  readonly languageTag: string;
  readonly releaseStage: "ga" | "beta" | "internal";
  readonly benchmarkVersion: string;
}

export interface ModelHardwareProfile {
  readonly minimumVramGb: number;
  readonly recommendedVramGb: number;
  readonly hardwareClass: string;
  readonly expectedRealtimeFactor: number;
  readonly maxConcurrencyPerGpu: number;
}

export interface ModelLicenseRecord {
  readonly codeLicense: string;
  readonly weightsLicense: string;
  readonly licenseUrls: readonly string[];
  readonly attributionRequired: boolean;
  readonly commercialApproval: CommercialApproval;
}

export interface ModelManifest {
  readonly id: ModelManifestId;
  readonly schemaVersion: 1;
  readonly family: ModelFamily;
  readonly displayName: string;
  readonly upstreamRepository: string;
  readonly upstreamRevision: string;
  readonly adapterVersion: SemanticVersion;
  readonly containerDigest: Sha256;
  readonly runtime: {
    readonly pythonVersion: string;
    readonly cudaVersion: string | null;
    readonly pytorchVersion: string | null;
  };
  readonly capabilities: readonly ModelCapability[];
  readonly languages: readonly ModelLanguageSupport[];
  readonly supportedControls: readonly ModelControl[];
  readonly outputSampleRatesHz: readonly Hertz[];
  readonly maxContextCharacters: number | null;
  readonly hardware: ModelHardwareProfile;
  readonly license: ModelLicenseRecord;
  readonly benchmarkSuiteVersion: string;
  readonly approvalStatus: ModelApprovalStatus;
  readonly rateCardVersionId: RateCardVersionId;
  readonly provenanceAssetId: AssetId | null;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
}

export interface ModelRoute {
  readonly id: ModelRouteId;
  readonly capability: ModelCapability;
  readonly mode: ExperienceMode;
  readonly modelManifestId: ModelManifestId;
  readonly priority: number;
  readonly enabled: boolean;
  readonly releaseStage: "internal" | "beta" | "ga";
  readonly allowedPlanCodes: readonly ("free" | "creator" | "pro")[];
  readonly languageTags: readonly string[];
  readonly fallbackRouteId: ModelRouteId | null;
  readonly providerPolicy: "selfHostedOnly" | "approvedProviderAllowed";
  readonly effectiveFrom: IsoTimestamp;
  readonly effectiveUntil: IsoTimestamp | null;
}
