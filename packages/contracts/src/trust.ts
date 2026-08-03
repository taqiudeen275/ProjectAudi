import type { AssetId } from "./assets";
import type {
  ActorRef,
  EntityId,
  IsoDate,
  IsoTimestamp,
  ResourceRef,
  ReviewState,
  Sha256,
} from "./common";

export type ConsentRecordId = EntityId<"consent-record">;
export type ModerationCaseId = EntityId<"moderation-case">;
export type ModerationDecisionId = EntityId<"moderation-decision">;
export type RightsDeclarationId = EntityId<"rights-declaration">;

export const CONSENT_CLASSES = [
  "designedSyntheticVoice",
  "privateSelfOrAuthorizedClone",
  "verifiedPublicOrCommercialClone",
] as const;
export type ConsentClass = (typeof CONSENT_CLASSES)[number];

export type ConsentScope = "private" | "shared" | "public" | "monetized" | "publication";
export type ConsentState =
  | "draft"
  | "pendingVerification"
  | "active"
  | "restricted"
  | "revoked"
  | "expired"
  | "superseded";

export type ConsentEvidenceType =
  | "selfAttestation"
  | "signedRelease"
  | "recordedRelease"
  | "managedTalentRelease";

export interface ConsentRecord {
  readonly id: ConsentRecordId;
  readonly workspaceId: EntityId<"workspace">;
  readonly consentClass: ConsentClass;
  readonly state: ConsentState;
  readonly representedAdultIdentityRef: string | null;
  readonly verifyingAccountRef: string | null;
  readonly verificationProviderRef: string | null;
  readonly voiceProfileIds: readonly EntityId<"voice-profile">[];
  readonly sampleAssetIds: readonly AssetId[];
  readonly sampleHashes: readonly Sha256[];
  readonly scopes: readonly ConsentScope[];
  readonly commercialUseAllowed: boolean;
  readonly territoryCodes: readonly string[];
  readonly validFrom: IsoDate;
  readonly validUntil: IsoDate | null;
  readonly agreementVersion: string;
  readonly evidenceType: ConsentEvidenceType;
  readonly evidenceAssetIds: readonly AssetId[];
  readonly syntheticDerivativesMayPersist: boolean;
  readonly revocationProcedure: string;
  readonly reviewerId: EntityId<"staff"> | null;
  readonly linkedModerationCaseIds: readonly ModerationCaseId[];
  readonly supersedesConsentRecordId: ConsentRecordId | null;
  readonly createdAt: IsoTimestamp;
  readonly activatedAt: IsoTimestamp | null;
  readonly revokedAt: IsoTimestamp | null;
}

export type ProvenanceOrigin =
  | "uploaded"
  | "synthetic"
  | "cloned"
  | "preset"
  | "generated"
  | "edited"
  | "mixed";

export interface ProvenanceManifest {
  readonly schemaVersion: 1;
  readonly origin: readonly ProvenanceOrigin[];
  readonly representedConsentRecordIds: readonly ConsentRecordId[];
  readonly modelManifestIds: readonly EntityId<"model-manifest">[];
  readonly sourceAssetHashes: readonly Sha256[];
  readonly editManifestAssetId: AssetId | null;
  readonly publisherId: EntityId<"user">;
  readonly reviewedAt: IsoTimestamp | null;
  readonly publishedAt: IsoTimestamp | null;
  readonly disclosures: readonly (
    | "aiNarrated"
    | "verifiedClonedVoices"
    | "syntheticCharacterVoices"
    | "aiGeneratedSoundEffects"
  )[];
  readonly c2paAssetId: AssetId | null;
}

export type ModerationSubjectKind = "voice" | "soundEffect" | "publication" | "user" | "generation" | "report";
export type ModerationSeverity = "low" | "medium" | "high" | "critical";
export type ModerationCaseState =
  | "open"
  | "triage"
  | "awaitingEvidence"
  | "underReview"
  | "changesRequested"
  | "approved"
  | "rejected"
  | "quarantined"
  | "suspended"
  | "takedownPending"
  | "removed"
  | "appealed"
  | "reinstated"
  | "closed";

export type ModerationSignal = {
  readonly code: string;
  readonly source: "automated" | "report" | "reviewer" | "legal" | "security";
  readonly confidence: number | null;
  readonly evidenceAssetIds: readonly AssetId[];
  readonly detail: string;
  readonly createdAt: IsoTimestamp;
};

export interface ModerationDecision {
  readonly id: ModerationDecisionId;
  readonly caseId: ModerationCaseId;
  readonly outcome:
    | "approve"
    | "requestChanges"
    | "labelCorrection"
    | "freezeGeneration"
    | "suspendListing"
    | "holdPayout"
    | "regionalBlock"
    | "remove"
    | "reinstate";
  readonly policyClauseIds: readonly string[];
  readonly rationale: string;
  readonly remediation: string | null;
  readonly appealEligible: boolean;
  readonly geographicRestrictions: readonly string[];
  readonly decidedBy: ActorRef;
  readonly secondApprover: ActorRef | null;
  readonly decidedAt: IsoTimestamp;
}

export interface ModerationCase {
  readonly id: ModerationCaseId;
  readonly subject: ResourceRef<ModerationSubjectKind>;
  readonly state: ModerationCaseState;
  readonly submissionState: ReviewState;
  readonly severity: ModerationSeverity;
  readonly priority: number;
  readonly queue: "identityConsent" | "copyright" | "safety" | "quality" | "fraud" | "general";
  readonly assignedReviewerId: EntityId<"staff"> | null;
  readonly signals: readonly ModerationSignal[];
  readonly decisionIds: readonly ModerationDecisionId[];
  readonly openedAt: IsoTimestamp;
  readonly dueAt: IsoTimestamp;
  readonly closedAt: IsoTimestamp | null;
}

export interface RightsDeclaration {
  readonly id: RightsDeclarationId;
  readonly declarantUserId: EntityId<"user">;
  readonly subject: ResourceRef<"voice" | "soundEffect" | "publication">;
  readonly agreementVersion: string;
  readonly ownsOrControlsSources: boolean;
  readonly audiobookDistributionRights: boolean | null;
  readonly representedVoiceAuthority: boolean | null;
  readonly commercialUseAllowed: boolean;
  readonly territoryCodes: readonly string[];
  readonly publicDomainBasis: string | null;
  readonly aiMateriallyUsed: boolean;
  readonly evidenceAssetIds: readonly AssetId[];
  readonly attestedAt: IsoTimestamp;
}
