import { randomUUID } from "node:crypto";
import type { ExperienceMode, GenerationJobKind } from "@audilink/contracts";

export const jobKinds = [
  "textToSpeech",
  "voiceCloneEnrollment",
  "voiceDesign",
  "soundEffect",
  "transcription",
  "alignment",
  "mixMaster",
  "audiobookRender",
  "publicationPackage",
] as const satisfies readonly GenerationJobKind[];
export const jobModes = ["fast", "balanced", "studio", "advanced"] as const satisfies readonly ExperienceMode[];

export type JobKind = GenerationJobKind;
export type JobMode = ExperienceMode;

export type GenerationJob = {
  id: string;
  kind: JobKind;
  mode: JobMode;
  state: { kind: "queued"; queuedAt: string };
  inputSummary: string;
  modelRoute: string;
  estimate: {
    unit: "studio_credit";
    amount: number;
    expiresAt: string;
  };
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export class InMemoryJobStore {
  readonly #jobs = new Map<string, GenerationJob>();

  create(input: {
    kind: JobKind;
    mode: JobMode;
    inputSummary: string;
    requestedUnits: number;
  }): GenerationJob {
    const now = new Date();
    const operationRate: Readonly<Record<JobKind, number>> = {
      textToSpeech: 1,
      voiceCloneEnrollment: 800,
      voiceDesign: 1_200,
      soundEffect: 4,
      transcription: 1,
      alignment: 1,
      mixMaster: 2,
      audiobookRender: 2,
      publicationPackage: 1,
    };
    const modeMultiplier: Readonly<Record<JobMode, number>> = {
      fast: 1,
      balanced: 2,
      studio: 4,
      advanced: 4,
    };
    const estimatedStudioCredits = Math.max(
      1,
      Math.ceil(input.requestedUnits * operationRate[input.kind] * modeMultiplier[input.mode]),
    );
    const job: GenerationJob = {
      id: `job_${randomUUID()}`,
      kind: input.kind,
      mode: input.mode,
      state: { kind: "queued", queuedAt: now.toISOString() },
      inputSummary: input.inputSummary,
      modelRoute: `${input.mode}-route@registry_2026-08-03.1`,
      estimate: {
        unit: "studio_credit",
        amount: estimatedStudioCredits,
        expiresAt: new Date(now.getTime() + 15 * 60 * 1000).toISOString(),
      },
      progress: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
    this.#jobs.set(job.id, job);
    return job;
  }

  get(id: string) {
    return this.#jobs.get(id);
  }

  list() {
    return [...this.#jobs.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  clear() {
    this.#jobs.clear();
  }
}
