export const productSurfaces = {
  studio: {
    name: "AudiLink Studio",
    character: "Quiet precision for creative work",
    accent: "#a7f36b",
  },
  books: {
    name: "AudiLink Books",
    character: "Editorial warmth for listening",
    accent: "#f5b56b",
  },
  admin: {
    name: "AudiLink Admin",
    character: "Quiet operational focus",
    accent: "#72d9ca",
  },
} as const;

export const sharedColorTokens = {
  canvas: "#080b0d",
  surface: "#0e1316",
  surfaceRaised: "#151b1f",
  surfaceSubtle: "#1a2125",
  separator: "#283136",
  text: "#f4f7f5",
  textMuted: "#9aa4a5",
  focus: "#72d9ca",
  positive: "#a7f36b",
  caution: "#ffbf69",
  danger: "#ff7262",
  info: "#7aaeff",
  // Compatibility aliases. Prefer the semantic roles above in new UI.
  ink: "#080b0d",
  panel: "#0e1316",
  panelRaised: "#151b1f",
  line: "#283136",
  signal: "#72d9ca",
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
  control: "0.625rem",
  surface: "1.125rem",
  small: "0.625rem",
  medium: "0.875rem",
  large: "1.125rem",
  pill: "999px",
} as const;

export const sharedMotionTokens = {
  duration: {
    instant: 0,
    feedback: 140,
    state: 220,
    view: 340,
    reduced: 80,
  },
  easing: {
    standard: [0.22, 1, 0.36, 1],
    enter: [0.16, 1, 0.3, 1],
    exit: [0.7, 0, 0.84, 0],
  },
  directManipulation: {
    type: "spring",
    stiffness: 420,
    damping: 38,
    mass: 0.8,
  },
  maxWorkspaceScaleDelta: 0.02,
  maxEntranceStaggerMs: 120,
} as const;

export const interfacePrinciples = {
  dominantTasksPerViewport: 1,
  adjacentSecondaryActions: 1,
  defaultSectionSurface: false,
  maxActiveCanvasEffects: 1,
  minimumTouchTargetPx: 44,
  reducedMotionCanvasEnabled: false,
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
