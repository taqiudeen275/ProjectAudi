export const productSurfaces = {
  studio: {
    name: "AudiLink Studio",
    character: "Precise creative workstation",
    accent: "#9ff55b",
  },
  books: {
    name: "AudiLink Books",
    character: "Warm cinematic listening",
    accent: "#ffb45a",
  },
  admin: {
    name: "AudiLink Admin",
    character: "Calm operational control",
    accent: "#5ee7d5",
  },
} as const;

export const sharedColorTokens = {
  ink: "#070a0c",
  panel: "#0e1316",
  panelRaised: "#141a1e",
  line: "#263036",
  text: "#f4f7f5",
  textMuted: "#909b9d",
  signal: "#5ee7d5",
  positive: "#9ff55b",
  caution: "#ffbf69",
  danger: "#ff7262",
  info: "#7aaeff",
} as const;

export const sharedSpaceTokens = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
} as const;

export const sharedRadiusTokens = {
  small: "0.5rem",
  medium: "0.75rem",
  large: "1rem",
  pill: "999px",
} as const;

export type StatusTone = "neutral" | "positive" | "caution" | "danger" | "info";

export interface NavigationItem<TId extends string = string> {
  readonly id: TId;
  readonly label: string;
  readonly badge?: string;
}

export interface MetricDatum {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
  readonly tone: StatusTone;
  readonly trend?: string;
}

export function operationalTone(status: string): StatusTone {
  switch (status) {
    case "healthy":
    case "balanced":
    case "approved":
    case "reconciled":
      return "positive";
    case "warning":
    case "attention":
    case "pending":
      return "caution";
    case "critical":
    case "failed":
    case "blocked":
    case "variance":
      return "danger";
    case "running":
    case "review":
      return "info";
    default:
      return "neutral";
  }
}
