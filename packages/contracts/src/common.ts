declare const brand: unique symbol;

export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [brand]: TBrand;
};

export type EntityId<TEntity extends string> = Brand<string, `id:${TEntity}`>;
export type IsoTimestamp = Brand<string, "iso-timestamp">;
export type IsoDate = Brand<string, "iso-date">;
export type Sha256 = Brand<string, "sha256">;
export type ETag = Brand<string, "etag">;
export type ObjectKey = Brand<string, "object-key">;
export type Cursor = Brand<string, "cursor">;
export type TraceId = Brand<string, "trace-id">;
export type RequestId = Brand<string, "request-id">;
export type IdempotencyKey = Brand<string, "idempotency-key">;
export type SemanticVersion = Brand<string, "semantic-version">;
export type Percentage = Brand<number, "percentage-0-100">;
export type BasisPoints = Brand<number, "basis-points-0-10000">;
export type Milliseconds = Brand<number, "milliseconds">;
export type Seconds = Brand<number, "seconds">;
export type Hertz = Brand<number, "hertz">;

/** Signed decimal integer encoded as a string to preserve 64-bit precision in JSON. */
export type IntegerString = Brand<string, "integer-string">;
export type MinorUnits = Brand<IntegerString, "fiat-minor-units">;
export type IsoCurrencyCode = Brand<string, "iso-4217-currency">;

export interface Money {
  readonly currency: IsoCurrencyCode;
  readonly minorUnits: MinorUnits;
}

/** Non-negative whole-unit Studio Credit quantity. */
export type StudioCredits = Brand<number, "studio-credits">;
/** Signed Studio Credit movement used only by ledger entries. */
export type StudioCreditDelta = Brand<number, "studio-credit-delta">;
/** Non-negative whole-unit Reader Coin quantity. */
export type ReaderCoins = Brand<number, "reader-coins">;
/** Signed Reader Coin movement used only by ledger entries. */
export type ReaderCoinDelta = Brand<number, "reader-coin-delta">;

export const CONTRACT_VERSION = "v1" as const;
export type ContractVersion = typeof CONTRACT_VERSION;

export interface VersionRef {
  readonly id: EntityId<"version">;
  readonly version: number;
}

export interface ActorRef {
  readonly actorId: EntityId<"actor">;
  readonly actorType: "user" | "staff" | "service" | "system";
}

export interface WorkspaceRef {
  readonly workspaceId: EntityId<"workspace">;
}

export interface ResourceRef<TKind extends string = string> {
  readonly kind: TKind;
  readonly id: EntityId<TKind>;
  readonly version?: number;
}

export interface PageInfo {
  readonly nextCursor: Cursor | null;
  readonly hasNextPage: boolean;
}

export interface CursorPage<TItem> {
  readonly items: readonly TItem[];
  readonly pageInfo: PageInfo;
}

export interface ProblemDetails {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly code: string;
  readonly detail: string;
  readonly requestId: RequestId;
  readonly instance?: string;
  readonly fieldErrors?: Readonly<Record<string, readonly string[]>>;
}

export interface CreatedMeta {
  readonly createdAt: IsoTimestamp;
  readonly createdBy: ActorRef;
}

export interface UpdatedMeta extends CreatedMeta {
  readonly updatedAt: IsoTimestamp;
  readonly updatedBy: ActorRef;
}

export type ReviewState =
  | "draft"
  | "submitted"
  | "automatedChecks"
  | "humanReview"
  | "changesRequested"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected"
  | "quarantined"
  | "suspended"
  | "takedownPending"
  | "removed"
  | "appealed"
  | "reinstated";
