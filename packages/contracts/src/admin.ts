import type {
  ActorRef,
  EntityId,
  IdempotencyKey,
  IsoTimestamp,
  RequestId,
  ResourceRef,
} from "./common";

export const ADMIN_ROLES = [
  "support",
  "moderator",
  "finance",
  "modelOperator",
  "administrator",
] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ADMIN_PERMISSIONS = [
  "users:read",
  "projects:read",
  "moderation:read",
  "moderation:decide",
  "models:read",
  "models:operate",
  "jobs:read",
  "jobs:operate",
  "finance:read",
  "finance:adjust",
  "payouts:operate",
  "plans:publish",
  "audit:read",
  "roles:manage",
] as const;
export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Readonly<Record<AdminRole, readonly AdminPermission[]>> = {
  support: ["users:read", "projects:read", "jobs:read", "audit:read"],
  moderator: ["users:read", "projects:read", "moderation:read", "moderation:decide", "audit:read"],
  finance: ["users:read", "finance:read", "finance:adjust", "payouts:operate", "audit:read"],
  modelOperator: ["models:read", "models:operate", "jobs:read", "jobs:operate", "audit:read"],
  administrator: ADMIN_PERMISSIONS,
};

export interface StaffSessionContext {
  readonly staffId: EntityId<"staff">;
  readonly roles: readonly AdminRole[];
  readonly permissions: readonly AdminPermission[];
  readonly mfa: "passkey" | "totp";
  readonly authenticatedAt: IsoTimestamp;
  readonly stepUpAt: IsoTimestamp | null;
  readonly expiresAt: IsoTimestamp;
}

export type AdminActionKind =
  | "moderationDecision"
  | "modelEnablementChange"
  | "generationRetry"
  | "generationCancellation"
  | "artifactQuarantine"
  | "compensatingLedgerTransaction"
  | "refund"
  | "payoutHold"
  | "planPublication"
  | "roleChange"
  | "takedown";

export interface AdminActionRequest {
  readonly idempotencyKey: IdempotencyKey;
  readonly kind: AdminActionKind;
  readonly target: ResourceRef;
  readonly reasonCode: string;
  readonly rationale: string;
}

/** Server-derived security context. Never accept these fields from an Admin HTTP body. */
export interface AdminActionContext {
  readonly requestedBy: ActorRef;
  readonly stepUpVerifiedAt: IsoTimestamp | null;
  readonly secondApproverId: EntityId<"staff"> | null;
}

export type AdminActionState =
  | { readonly kind: "requested"; readonly requestedAt: IsoTimestamp }
  | { readonly kind: "awaitingSecondApproval"; readonly requestedAt: IsoTimestamp; readonly expiresAt: IsoTimestamp }
  | { readonly kind: "approved"; readonly approvedAt: IsoTimestamp; readonly approverId: EntityId<"staff"> }
  | { readonly kind: "executed"; readonly executedAt: IsoTimestamp; readonly resultRef: string }
  | { readonly kind: "rejected"; readonly rejectedAt: IsoTimestamp; readonly reason: string }
  | { readonly kind: "failed"; readonly failedAt: IsoTimestamp; readonly errorCode: string };

export interface AdminAction {
  readonly id: EntityId<"admin-action">;
  readonly request: AdminActionRequest;
  readonly context: AdminActionContext;
  readonly state: AdminActionState;
}

export interface AdminAuditEvent {
  readonly id: EntityId<"admin-audit-event">;
  readonly sequence: number;
  readonly requestId: RequestId;
  readonly actor: ActorRef;
  readonly roles: readonly AdminRole[];
  readonly action: string;
  readonly target: ResourceRef;
  readonly reasonCode: string | null;
  readonly before: Readonly<Record<string, unknown>> | null;
  readonly after: Readonly<Record<string, unknown>> | null;
  readonly ipAddressHash: string;
  readonly userAgentHash: string;
  readonly occurredAt: IsoTimestamp;
}
