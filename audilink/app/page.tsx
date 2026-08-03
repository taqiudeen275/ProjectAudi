import StudioDashboard, {
  type CreateAction,
  type StudioJob,
  type StudioProject,
} from "./studio-dashboard";

const createActions: CreateAction[] = [
  {
    id: "audiobook",
    label: "Audiobook",
    description: "Shape a manuscript into a cast, timeline, and master.",
    meta: "Long-form studio",
    icon: "book",
    tone: "story",
  },
  {
    id: "tts",
    label: "Text to Speech",
    description: "Turn a script into expressive, editable takes.",
    meta: "Fastest first output",
    icon: "wave",
    tone: "cyan",
  },
  {
    id: "voice",
    label: "Voice Lab",
    description: "Design a synthetic voice or start a consented capture.",
    meta: "Private by default",
    icon: "spark",
    tone: "violet",
  },
  {
    id: "sfx",
    label: "Sound Effects",
    description: "Create textured effects, ambience, and transitions.",
    meta: "Generate variants",
    icon: "sound",
    tone: "amber",
  },
  {
    id: "transcription",
    label: "Transcription",
    description: "Make timestamped, editable text from owned audio.",
    meta: "TXT, SRT & VTT",
    icon: "transcript",
    tone: "blue",
  },
];

const projects: StudioProject[] = [
  {
    id: "glass-orchard",
    title: "The Glass Orchard",
    kind: "Audiobook",
    detail: "Chapter 7 of 18",
    status: "In production",
    progress: 38,
    updated: "18 min ago",
    duration: "02:16",
    tone: "orchard",
    waveform: [4, 9, 14, 22, 12, 18, 28, 19, 9, 15, 24, 30, 18, 11, 21, 14, 25, 18],
  },
  {
    id: "city-beneath-rain",
    title: "A City Beneath Rain",
    kind: "Serial",
    detail: "Season 1 · 5 episodes",
    status: "Mixing",
    progress: 72,
    updated: "Yesterday",
    duration: "01:42",
    tone: "rain",
    waveform: [8, 15, 23, 10, 17, 29, 20, 26, 12, 19, 31, 22, 14, 24, 17, 27, 13, 20],
  },
  {
    id: "solace-launch",
    title: "Solace launch narration",
    kind: "Speech",
    detail: "3 accepted takes",
    status: "Ready",
    progress: 100,
    updated: "2 days ago",
    duration: "00:48",
    tone: "solace",
    waveform: [6, 18, 10, 24, 14, 29, 18, 11, 26, 16, 30, 13, 21, 9, 25, 17, 28, 12],
  },
  {
    id: "night-train",
    title: "Night train ambience",
    kind: "Sound Effect",
    detail: "4 generated variants",
    status: "Review takes",
    progress: 100,
    updated: "Jul 29",
    duration: "00:32",
    tone: "night",
    waveform: [9, 12, 18, 27, 21, 14, 23, 31, 17, 25, 11, 19, 28, 15, 22, 29, 13, 20],
  },
  {
    id: "field-notes",
    title: "Field notes interview",
    kind: "Transcription",
    detail: "42 timed segments",
    status: "Needs review",
    progress: 86,
    updated: "Jul 27",
    duration: "12:08",
    tone: "field",
    waveform: [13, 25, 16, 30, 11, 22, 18, 28, 14, 20, 27, 9, 24, 16, 29, 12, 21, 18],
  },
  {
    id: "north-star",
    title: "North Star character set",
    kind: "Voice",
    detail: "2 private voices",
    status: "Capture complete",
    progress: 100,
    updated: "Jul 24",
    duration: "00:21",
    tone: "north",
    waveform: [7, 14, 26, 18, 10, 28, 20, 15, 30, 12, 23, 17, 27, 9, 21, 25, 13, 19],
  },
];

const jobs: StudioJob[] = [
  {
    id: "job-chapter-seven",
    title: "Chapter 7 · Final render",
    project: "The Glass Orchard",
    phase: "Rendering dialogue",
    status: "Running",
    progress: 68,
    meta: "18 of 26 scenes",
    estimate: "~8 min left",
  },
  {
    id: "job-voice-scan",
    title: "Voice consistency scan",
    project: "A City Beneath Rain",
    phase: "Waiting for capacity",
    status: "Queued",
    progress: 0,
    meta: "Position 2 in queue",
    estimate: "Starts soon",
  },
  {
    id: "job-station",
    title: "Midnight station variants",
    project: "Night train ambience",
    phase: "4 variants ready",
    status: "Complete",
    progress: 100,
    meta: "Settled · 36 Studio Credits",
    estimate: "Open results",
  },
];

export default function Home() {
  return (
    <StudioDashboard
      createActions={createActions}
      projects={projects}
      jobs={jobs}
    />
  );
}
