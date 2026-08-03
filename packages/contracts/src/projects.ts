import type { AssetId } from "./assets";
import type {
  ETag,
  EntityId,
  IsoTimestamp,
  Milliseconds,
  Percentage,
} from "./common";

export type ProjectId = EntityId<"project">;
export type ProjectRevisionId = EntityId<"project-revision">;
export type CharacterId = EntityId<"character">;
export type TrackId = EntityId<"track">;
export type ClipId = EntityId<"clip">;
export type ManuscriptBlockId = EntityId<"manuscript-block">;
export type SceneId = EntityId<"scene">;
export type VoiceVersionId = EntityId<"voice-version">;

export type ProjectKind = "audiobook" | "serial" | "textToSpeech" | "soundDesign";
export type ProjectState = "draft" | "active" | "archived" | "deleted";

export interface Project {
  readonly id: ProjectId;
  readonly workspaceId: EntityId<"workspace">;
  readonly kind: ProjectKind;
  readonly title: string;
  readonly state: ProjectState;
  readonly headRevisionId: ProjectRevisionId | null;
  readonly createdAt: IsoTimestamp;
  readonly updatedAt: IsoTimestamp;
  readonly version: number;
}

export interface ManuscriptBlock {
  readonly id: ManuscriptBlockId;
  readonly order: number;
  readonly kind: "heading" | "narration" | "dialogue" | "direction";
  readonly text: string;
  readonly characterId: CharacterId | null;
  readonly sceneId: SceneId | null;
  readonly sourceRange?: {
    readonly start: number;
    readonly end: number;
  };
}

export interface Scene {
  readonly id: SceneId;
  readonly title: string;
  readonly order: number;
  readonly manuscriptBlockIds: readonly ManuscriptBlockId[];
  readonly notes?: string;
}

export interface Character {
  readonly id: CharacterId;
  readonly name: string;
  readonly description: string;
  readonly color: string;
  readonly voiceVersionId: VoiceVersionId | null;
  readonly pronunciationNotes?: string;
}

export type TrackKind = "dialogue" | "narration" | "soundEffect" | "music" | "ambience";

export interface Track {
  readonly id: TrackId;
  readonly name: string;
  readonly kind: TrackKind;
  readonly order: number;
  readonly gainDb: number;
  readonly muted: boolean;
  readonly solo: boolean;
}

interface ClipBase {
  readonly id: ClipId;
  readonly trackId: TrackId;
  readonly timelineStartMs: Milliseconds;
  readonly durationMs: Milliseconds;
  readonly gainDb: number;
  readonly pan: Percentage;
  readonly fadeInMs: Milliseconds;
  readonly fadeOutMs: Milliseconds;
  readonly locked: boolean;
}

export interface AudioClip extends ClipBase {
  readonly kind: "audio";
  readonly assetId: AssetId;
  readonly sourceInMs: Milliseconds;
  readonly sourceOutMs: Milliseconds;
}

export interface GeneratedClip extends ClipBase {
  readonly kind: "generated";
  readonly selectedTakeAssetId: AssetId;
  readonly availableTakeAssetIds: readonly AssetId[];
  readonly manuscriptBlockId: ManuscriptBlockId | null;
  readonly generationJobId: EntityId<"generation-job">;
}

export interface SilenceClip extends ClipBase {
  readonly kind: "silence";
}

export type Clip = AudioClip | GeneratedClip | SilenceClip;

export interface ChapterMarker {
  readonly id: EntityId<"chapter-marker">;
  readonly title: string;
  readonly timelineStartMs: Milliseconds;
  readonly order: number;
}

export interface ExportSettings {
  readonly formats: readonly ("m4b" | "mp3" | "wav")[];
  readonly sampleRateHz: 44100 | 48000;
  readonly targetLoudnessLufs: number;
  readonly includeChapterMarkers: boolean;
}

export interface ProjectRevisionDocument {
  readonly schemaVersion: 1;
  readonly manuscriptAssetId: AssetId | null;
  readonly manuscriptBlocks: readonly ManuscriptBlock[];
  readonly scenes: readonly Scene[];
  readonly characters: readonly Character[];
  readonly tracks: readonly Track[];
  readonly clips: readonly Clip[];
  readonly chapterMarkers: readonly ChapterMarker[];
  readonly exportSettings: ExportSettings;
}

export interface ProjectRevision {
  readonly id: ProjectRevisionId;
  readonly projectId: ProjectId;
  readonly revisionNumber: number;
  readonly parentRevisionId: ProjectRevisionId | null;
  readonly baseEtag: ETag;
  readonly document: ProjectRevisionDocument;
  readonly createdAt: IsoTimestamp;
  readonly createdById: EntityId<"actor">;
  readonly changeSummary: string;
}

export interface ProjectRevisionRef {
  readonly projectId: ProjectId;
  readonly projectRevisionId: ProjectRevisionId;
  readonly revisionNumber: number;
}
