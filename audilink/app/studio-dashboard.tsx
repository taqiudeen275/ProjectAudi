"use client";

import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CreateActionId =
  | "audiobook"
  | "tts"
  | "voice"
  | "sfx"
  | "transcription";

type IconName =
  | "activity"
  | "arrow"
  | "bell"
  | "book"
  | "check"
  | "chevron"
  | "close"
  | "credits"
  | "earnings"
  | "grid"
  | "help"
  | "home"
  | "library"
  | "list"
  | "market"
  | "menu"
  | "more"
  | "pause"
  | "play"
  | "plus"
  | "projects"
  | "publish"
  | "search"
  | "settings"
  | "sound"
  | "spark"
  | "transcript"
  | "upload"
  | "user"
  | "voice"
  | "wave";

export type CreateAction = {
  id: CreateActionId;
  label: string;
  description: string;
  meta: string;
  icon: IconName;
  tone: "story" | "cyan" | "violet" | "amber" | "blue";
};

export type StudioProject = {
  id: string;
  title: string;
  kind:
    | "Audiobook"
    | "Serial"
    | "Speech"
    | "Sound Effect"
    | "Transcription"
    | "Voice";
  detail: string;
  status: string;
  progress: number;
  updated: string;
  duration: string;
  tone: "orchard" | "rain" | "solace" | "night" | "field" | "north";
  waveform: number[];
};

export type StudioJob = {
  id: string;
  title: string;
  project: string;
  phase: string;
  status: "Running" | "Queued" | "Complete";
  progress: number;
  meta: string;
  estimate: string;
};

type StudioDashboardProps = {
  createActions: CreateAction[];
  projects: StudioProject[];
  jobs: StudioJob[];
};

const filters = [
  "All",
  "Audiobook",
  "Serial",
  "Speech",
  "Sound Effect",
  "Transcription",
  "Voice",
] as const;

type ProjectFilter = (typeof filters)[number];

const navGroups: Array<{
  label: string;
  items: Array<{ label: string; href: string; icon: IconName; active?: boolean }>;
}> = [
  {
    label: "Work",
    items: [
      { label: "Home", href: "#top", icon: "home", active: true },
      { label: "Projects", href: "#projects", icon: "projects" },
      { label: "Create", href: "#create", icon: "plus" },
    ],
  },
  {
    label: "Library & publish",
    items: [
      { label: "Assets", href: "#assets", icon: "library" },
      { label: "Marketplace", href: "#marketplace", icon: "market" },
      { label: "Publish & releases", href: "#publish", icon: "publish" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Activity", href: "#activity", icon: "activity" },
      { label: "Usage & plan", href: "#credits", icon: "credits" },
      { label: "Earnings", href: "#earnings", icon: "earnings" },
    ],
  },
];

function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth,
  };

  const paths: Record<IconName, React.ReactNode> = {
    activity: (
      <>
        <path {...common} d="M4 18V9m5 9V5m5 13v-7m5 7V3" />
        <path {...common} d="M2.5 21h19" />
      </>
    ),
    arrow: <path {...common} d="M5 12h14m-5-5 5 5-5 5" />,
    bell: (
      <>
        <path {...common} d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z" />
        <path {...common} d="M10 20h4" />
      </>
    ),
    book: (
      <>
        <path {...common} d="M4 4.5h10a3 3 0 0 1 3 3V20H7a3 3 0 0 1-3-3V4.5Z" />
        <path {...common} d="M7 4.5V17a3 3 0 0 0 3 3" />
        <path {...common} d="M17 8h3v12h-3" />
      </>
    ),
    check: <path {...common} d="m5 12 4 4L19 6" />,
    chevron: <path {...common} d="m8 10 4 4 4-4" />,
    close: <path {...common} d="M6 6l12 12M18 6 6 18" />,
    credits: (
      <>
        <path {...common} d="M4 8.5A4.5 4.5 0 0 1 8.5 4H18a2 2 0 0 1 2 2v13H8.5A4.5 4.5 0 0 1 4 14.5v-6Z" />
        <path {...common} d="M4 9h13v6H4m13-3h.01" />
      </>
    ),
    earnings: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-3 .8-3 2s1.1 1.8 3.2 2.3c2 .5 2.8 1.2 2.8 2.4 0 1.3-1.2 2.3-3.2 2.3-1.4 0-2.7-.5-3.6-1.3M12 5.5v13" />
      </>
    ),
    grid: (
      <>
        <rect {...common} x="4" y="4" width="6" height="6" rx="1" />
        <rect {...common} x="14" y="4" width="6" height="6" rx="1" />
        <rect {...common} x="4" y="14" width="6" height="6" rx="1" />
        <rect {...common} x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    help: (
      <>
        <circle {...common} cx="12" cy="12" r="9" />
        <path {...common} d="M9.7 9a2.4 2.4 0 0 1 4.6.9c0 2-2.3 2-2.3 4M12 17.5h.01" />
      </>
    ),
    home: (
      <>
        <path {...common} d="m3 10 9-7 9 7" />
        <path {...common} d="M5.5 9v11h13V9M9 20v-6h6v6" />
      </>
    ),
    library: (
      <>
        <rect {...common} x="3" y="4" width="5" height="16" rx="1" />
        <rect {...common} x="9.5" y="4" width="5" height="16" rx="1" />
        <path {...common} d="m16 5 4-1 2 15-4 1-2-15Z" />
      </>
    ),
    list: (
      <>
        <path {...common} d="M9 6h12M9 12h12M9 18h12" />
        <path {...common} d="M4 6h.01M4 12h.01M4 18h.01" />
      </>
    ),
    market: (
      <>
        <path {...common} d="M4 9h16l-2-5H6L4 9Z" />
        <path {...common} d="M5 9v11h14V9M9 20v-6h6v6" />
        <path {...common} d="M4 9a3 3 0 0 0 5 2 3 3 0 0 0 6 0 3 3 0 0 0 5-2" />
      </>
    ),
    menu: <path {...common} d="M4 7h16M4 12h16M4 17h16" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
      </>
    ),
    pause: (
      <>
        <path {...common} d="M9 7v10M15 7v10" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />,
    plus: <path {...common} d="M12 5v14M5 12h14" />,
    projects: (
      <>
        <path {...common} d="M3 7h7l2 2h9v11H3V7Z" />
        <path {...common} d="M3 7V4h7l2 3" />
      </>
    ),
    publish: (
      <>
        <path {...common} d="M12 16V3m-5 5 5-5 5 5" />
        <path {...common} d="M5 13v7h14v-7" />
      </>
    ),
    search: (
      <>
        <circle {...common} cx="10.5" cy="10.5" r="6.5" />
        <path {...common} d="m15.5 15.5 5 5" />
      </>
    ),
    settings: (
      <>
        <circle {...common} cx="12" cy="12" r="3" />
        <path {...common} d="M19 13.5v-3l-2-.6a7 7 0 0 0-.7-1.7l1-1.8-2.1-2.1-1.8 1a7 7 0 0 0-1.7-.7L11 2.5H8l-.6 2.1a7 7 0 0 0-1.7.7l-1.8-1-2.1 2.1 1 1.8a7 7 0 0 0-.7 1.7L0 10.5v3l2.1.6a7 7 0 0 0 .7 1.7l-1 1.8 2.1 2.1 1.8-1a7 7 0 0 0 1.7.7l.6 2.1h3l.6-2.1a7 7 0 0 0 1.7-.7l1.8 1 2.1-2.1-1-1.8a7 7 0 0 0 .7-1.7l2.1-.6Z" transform="translate(2) scale(.83)" />
      </>
    ),
    sound: (
      <>
        <path {...common} d="M4 14h3l5 4V6L7 10H4v4Z" />
        <path {...common} d="M16 9a4.5 4.5 0 0 1 0 6m2.5-8.5a8 8 0 0 1 0 11" />
      </>
    ),
    spark: (
      <>
        <path {...common} d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" />
        <path {...common} d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    transcript: (
      <>
        <path {...common} d="M6 3h9l4 4v14H6V3Z" />
        <path {...common} d="M15 3v5h4M9 12h7M9 16h7" />
      </>
    ),
    upload: (
      <>
        <path {...common} d="M12 16V4m-5 5 5-5 5 5" />
        <path {...common} d="M5 17v3h14v-3" />
      </>
    ),
    user: (
      <>
        <circle {...common} cx="12" cy="8" r="4" />
        <path {...common} d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    voice: (
      <>
        <rect {...common} x="9" y="3" width="6" height="12" rx="3" />
        <path {...common} d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
      </>
    ),
    wave: <path {...common} d="M3 12h2l2-6 3 12 3-14 3 12 2-7 2 3h1" />,
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

function Brand() {
  return (
    <div className="brand-lockup" aria-label="AudiLink Studio">
      <span className="brand-signal" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="brand-name">
        AudiLink <small>Studio</small>
      </span>
    </div>
  );
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="primary-navigation" aria-label="Studio">
      {navGroups.map((group) => (
        <div className="nav-group" key={group.label}>
          <p className="nav-group-label">{group.label}</p>
          {group.items.map((item) => (
            <a
              className={`nav-item${item.active ? " is-active" : ""}`}
              href={item.href}
              key={item.label}
              onClick={onNavigate}
              aria-current={item.active ? "page" : undefined}
            >
              <span className="nav-icon">
                <Icon name={item.icon} size={19} />
              </span>
              <span>{item.label}</span>
              {item.label === "Activity" ? (
                <span className="nav-count" aria-label="2 active jobs">
                  2
                </span>
              ) : null}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}

function Sidebar() {
  return (
    <aside className="desktop-sidebar">
      <div className="sidebar-brand">
        <Brand />
      </div>
      <Navigation />
      <div className="sidebar-bottom">
        <a className="nav-item" href="#settings">
          <span className="nav-icon">
            <Icon name="settings" size={19} />
          </span>
          <span>Workspace</span>
        </a>
        <a className="nav-item" href="#help">
          <span className="nav-icon">
            <Icon name="help" size={19} />
          </span>
          <span>Help & shortcuts</span>
        </a>
        <button className="profile-card" type="button">
          <span className="profile-avatar" aria-hidden="true">
            AT
          </span>
          <span className="profile-copy">
            <strong>Atarq</strong>
            <small>Personal workspace</small>
          </span>
          <Icon name="chevron" size={16} />
        </button>
      </div>
    </aside>
  );
}

function Waveform({
  bars,
  active = false,
  compact = false,
}: {
  bars: number[];
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <span
      className={`waveform${active ? " is-playing" : ""}${compact ? " is-compact" : ""}`}
      aria-hidden="true"
    >
      {bars.map((height, index) => (
        <i key={`${height}-${index}`} style={{ height }} />
      ))}
    </span>
  );
}

function ProjectCard({
  project,
  playing,
  onPlay,
  onOpen,
}: {
  project: StudioProject;
  playing: boolean;
  onPlay: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="project-card">
      <div className={`project-art project-art--${project.tone}`}>
        <div className="project-art-topline">
          <span>{project.kind}</span>
          <button
            className="icon-button project-more"
            type="button"
            aria-label={`More actions for ${project.title}`}
          >
            <Icon name="more" size={18} />
          </button>
        </div>
        <div className="project-monogram" aria-hidden="true">
          {project.title
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")}
        </div>
        <div className="project-audio">
          <button
            className="play-button"
            type="button"
            onClick={onPlay}
            aria-label={`${playing ? "Pause" : "Play"} preview of ${project.title}`}
            aria-pressed={playing}
          >
            <Icon name={playing ? "pause" : "play"} size={18} />
          </button>
          <Waveform bars={project.waveform} active={playing} />
          <span>{project.duration}</span>
        </div>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <div>
            <h3>{project.title}</h3>
            <p>{project.detail}</p>
          </div>
          <span className={`status-dot status-dot--${project.progress === 100 ? "ready" : "active"}`}>
            {project.status}
          </span>
        </div>
        {project.progress < 100 ? (
          <div className="project-progress" aria-label={`${project.progress}% complete`}>
            <span style={{ width: `${project.progress}%` }} />
          </div>
        ) : null}
        <div className="project-footer">
          <span>Edited {project.updated}</span>
          <button type="button" className="text-button" onClick={onOpen}>
            Open project <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

function QuickActionCard({
  action,
  onClick,
}: {
  action: CreateAction;
  onClick: () => void;
}) {
  return (
    <button
      className={`quick-action quick-action--${action.tone}`}
      type="button"
      onClick={onClick}
    >
      <span className="quick-action-icon">
        <Icon name={action.icon} size={22} />
      </span>
      <span className="quick-action-copy">
        <strong>{action.label}</strong>
        <small>{action.description}</small>
      </span>
      <span className="quick-action-meta">{action.meta}</span>
      <span className="quick-action-arrow" aria-hidden="true">
        <Icon name="arrow" size={17} />
      </span>
    </button>
  );
}

function JobCard({
  job,
  cancelling,
  onCancel,
  onOpen,
}: {
  job: StudioJob;
  cancelling: boolean;
  onCancel: () => void;
  onOpen: () => void;
}) {
  const status = cancelling ? "Cancelling" : job.status;
  const isActive = job.status === "Running" && !cancelling;

  return (
    <article className="job-card">
      <div className="job-topline">
        <span className={`job-state job-state--${status.toLowerCase()}`}>
          {isActive ? <i aria-hidden="true" /> : null}
          {status}
        </span>
        <span>{job.estimate}</span>
      </div>
      <h3>{job.title}</h3>
      <p>{job.project}</p>
      <div className={`job-progress${isActive ? " is-active" : ""}`}>
        <span style={{ width: `${cancelling ? job.progress : Math.max(job.progress, 6)}%` }} />
      </div>
      <div className="job-detail">
        <span>{cancelling ? "Finishing current safe step" : job.phase}</span>
        <span>{job.meta}</span>
      </div>
      <div className="job-actions">
        {job.status === "Running" && !cancelling ? (
          <button type="button" className="text-button is-muted" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        {job.status === "Complete" ? (
          <button type="button" className="text-button" onClick={onOpen}>
            Open results <Icon name="arrow" size={15} />
          </button>
        ) : null}
        {job.status === "Queued" ? (
          <button type="button" className="text-button is-muted" onClick={onCancel}>
            Leave queue
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default function StudioDashboard({
  createActions,
  projects,
  jobs,
}: StudioDashboardProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedCreate, setSelectedCreate] = useState<CreateActionId>("audiobook");
  const [projectName, setProjectName] = useState("");
  const [startMethod, setStartMethod] = useState<"blank" | "import">("blank");
  const [cancelledJobs, setCancelledJobs] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const selectedAction =
    createActions.find((action) => action.id === selectedCreate) ?? createActions[0];

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesType = filter === "All" || project.kind === filter;
      const matchesSearch =
        !query ||
        `${project.title} ${project.kind} ${project.detail} ${project.status}`
          .toLocaleLowerCase()
          .includes(query);
      return matchesType && matchesSearch;
    });
  }, [filter, projects, search]);

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.getAttribute("contenteditable") === "true";

      if (event.key === "/" && !editing && !createOpen) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape" && mobileNavOpen) {
        setMobileNavOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [createOpen, mobileNavOpen]);

  useEffect(() => {
    if (!createOpen) return;

    document.body.classList.add("has-overlay");
    dialogCloseRef.current?.focus();

    const handleDialogKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setCreateOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleDialogKey);
    return () => {
      window.removeEventListener("keydown", handleDialogKey);
      document.body.classList.remove("has-overlay");
      previousFocusRef.current?.focus();
    };
  }, [createOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    document.body.classList.add("has-overlay");
    return () => document.body.classList.remove("has-overlay");
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const openCreate = (id: CreateActionId) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setSelectedCreate(id);
    setProjectName("");
    setStartMethod("blank");
    setMobileNavOpen(false);
    setCreateOpen(true);
  };

  const closeCreate = () => setCreateOpen(false);

  const submitCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = projectName.trim() || `Untitled ${selectedAction.label}`;
    setNotice(`${title} is ready for its first setup step.`);
    closeCreate();
  };

  const handleProjectKeyDown = (event: ReactKeyboardEvent, project: StudioProject) => {
    if (event.key === "Enter") {
      setNotice(`${project.title} selected. Editor routing is the next milestone.`);
    }
  };

  return (
    <>
      <div
        className="studio-shell"
        id="top"
        inert={mobileNavOpen || createOpen ? true : undefined}
      >
        <Sidebar />

        <div className="workspace-shell">
          <header className="mobile-header">
            <button
              ref={menuButtonRef}
              className="icon-button"
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open Studio navigation"
              aria-expanded={mobileNavOpen}
            >
              <Icon name="menu" size={22} />
            </button>
            <Brand />
            <button
              className="mobile-credit"
              type="button"
              onClick={() => document.querySelector("#credits")?.scrollIntoView()}
              aria-label="824 Studio Credits available"
            >
              <Icon name="spark" size={15} /> 824
            </button>
          </header>

          <header className="desktop-topbar">
            <div className="topbar-context">
              <span>Personal workspace</span>
              <strong>Creator home</strong>
            </div>
            <label className="global-search" htmlFor="global-project-search">
              <Icon name="search" size={18} />
              <input
                ref={searchRef}
                id="global-project-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects and assets"
                aria-keyshortcuts="/"
              />
              <kbd aria-hidden="true">/</kbd>
            </label>
            <div className="topbar-actions">
              <button
                className="credit-chip"
                type="button"
                onClick={() => document.querySelector("#credits")?.scrollIntoView()}
                aria-label="Free plan, 824 Studio Credits available"
              >
                <span className="credit-chip-icon">
                  <Icon name="spark" size={16} />
                </span>
                <span>
                  <small>Studio Credits</small>
                  <strong>824</strong>
                </span>
                <span className="plan-label">Free</span>
              </button>
              <button
                className="icon-button notification-button"
                type="button"
                aria-label="Notifications, 1 new"
                onClick={() => setNotice("You’re caught up. One render is still running.")}
              >
                <Icon name="bell" size={20} />
                <i aria-hidden="true" />
              </button>
              <button className="avatar-button" type="button" aria-label="Open account menu">
                AT
              </button>
            </div>
          </header>

          <main className="dashboard">
            <section className="hero-panel" aria-labelledby="studio-heading">
              <div className="hero-copy">
                <p className="eyebrow">
                  <span /> Your studio is in sync
                </p>
                <h1 id="studio-heading">Make the story sound alive.</h1>
                <p className="hero-description">
                  Build a cast, shape every take, and move from manuscript to master in one
                  precise audio workspace.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary-button"
                    type="button"
                    onClick={() => openCreate("audiobook")}
                  >
                    <Icon name="plus" size={18} /> Start a project
                  </button>
                  <a className="secondary-button" href="#projects">
                    Continue recent work <Icon name="arrow" size={17} />
                  </a>
                </div>
              </div>
              <div className="hero-stage" aria-hidden="true">
                <div className="stage-orbit stage-orbit--one" />
                <div className="stage-orbit stage-orbit--two" />
                <div className="stage-core">
                  <span>Current scene</span>
                  <strong>07</strong>
                  <small>Glasshouse arrival</small>
                </div>
                <Waveform
                  bars={[9, 16, 27, 19, 34, 23, 13, 31, 21, 38, 18, 28, 11, 24, 35, 20, 29, 15, 26, 18, 32, 12]}
                  compact
                />
                <span className="stage-note stage-note--cast">6 voices cast</span>
                <span className="stage-note stage-note--takes">3 takes ready</span>
              </div>
            </section>

            <section className="quick-create-section" id="create" aria-labelledby="quick-heading">
              <div className="section-heading compact-heading">
                <div>
                  <p className="section-kicker">Create</p>
                  <h2 id="quick-heading">Start with a signal</h2>
                </div>
                <p>Every chargeable action shows a Studio Credit estimate before it runs.</p>
              </div>
              <div className="quick-action-grid">
                {createActions.map((action) => (
                  <QuickActionCard
                    action={action}
                    key={action.id}
                    onClick={() => openCreate(action.id)}
                  />
                ))}
              </div>
            </section>

            <div className="dashboard-grid">
              <section className="projects-section" id="projects" aria-labelledby="projects-heading">
                <div className="section-heading">
                  <div>
                    <p className="section-kicker">Workspace</p>
                    <h2 id="projects-heading">Recent projects</h2>
                    <p>Pick up exactly where you left off.</p>
                  </div>
                  <button
                    className="secondary-button section-action"
                    type="button"
                    onClick={() => openCreate("audiobook")}
                  >
                    <Icon name="plus" size={17} /> New project
                  </button>
                </div>

                <div className="project-toolbar">
                  <div className="filter-scroll" aria-label="Filter projects by type">
                    {filters.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`filter-button${filter === item ? " is-selected" : ""}`}
                        onClick={() => setFilter(item)}
                        aria-pressed={filter === item}
                      >
                        {item === "Sound Effect" ? "Effects" : item}
                      </button>
                    ))}
                  </div>
                  <div className="project-toolbar-end">
                    <label className="project-search" htmlFor="project-search">
                      <span className="sr-only">Search recent projects</span>
                      <Icon name="search" size={17} />
                      <input
                        id="project-search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search projects"
                      />
                    </label>
                    <div className="view-switch" aria-label="Project view">
                      <button
                        type="button"
                        className={view === "grid" ? "is-selected" : ""}
                        onClick={() => setView("grid")}
                        aria-label="Grid view"
                        aria-pressed={view === "grid"}
                      >
                        <Icon name="grid" size={17} />
                      </button>
                      <button
                        type="button"
                        className={view === "list" ? "is-selected" : ""}
                        onClick={() => setView("list")}
                        aria-label="List view"
                        aria-pressed={view === "list"}
                      >
                        <Icon name="list" size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <p className="results-summary" aria-live="polite">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
                  {filter !== "All" ? ` · ${filter}` : ""}
                </p>

                {filteredProjects.length ? (
                  <div className={`project-grid project-grid--${view}`}>
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        onKeyDown={(event) => handleProjectKeyDown(event, project)}
                      >
                        <ProjectCard
                          project={project}
                          playing={playingId === project.id}
                          onPlay={() =>
                            setPlayingId((current) =>
                              current === project.id ? null : project.id,
                            )
                          }
                          onOpen={() =>
                            setNotice(
                              `${project.title} selected. The full editor arrives in the next milestone.`,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-projects">
                    <span>
                      <Icon name="search" size={24} />
                    </span>
                    <h3>No projects match this view</h3>
                    <p>Your projects are still here. Clear the search or show every type.</p>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        setSearch("");
                        setFilter("All");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </section>

              <aside className="dashboard-rail" aria-label="Studio status">
                <section className="rail-panel activity-panel" id="activity" aria-labelledby="jobs-heading">
                  <div className="rail-heading">
                    <div>
                      <p className="section-kicker">Activity</p>
                      <h2 id="jobs-heading">Jobs</h2>
                    </div>
                    <a href="#activity-log">View all</a>
                  </div>
                  <div className="jobs-list">
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        cancelling={cancelledJobs.includes(job.id)}
                        onCancel={() => {
                          setCancelledJobs((current) => [...current, job.id]);
                          setNotice(
                            job.status === "Queued"
                              ? `${job.title} will leave the queue without a charge.`
                              : `Cancellation requested for ${job.title}. Completed work will be reconciled.`,
                          );
                        }}
                        onOpen={() => setNotice(`${job.title} results are ready to review.`)}
                      />
                    ))}
                  </div>
                </section>

                <section className="rail-panel credits-panel" id="credits" aria-labelledby="credits-heading">
                  <div className="credits-topline">
                    <span className="plan-badge">Free plan</span>
                    <a href="#usage">Usage</a>
                  </div>
                  <div className="credits-main">
                    <div
                      className="credit-meter"
                      style={{
                        background:
                          "conic-gradient(var(--accent-cyan) 0 82.4%, rgba(255,255,255,.09) 82.4% 100%)",
                      }}
                      role="img"
                      aria-label="824 Studio Credits available from the current balance"
                    >
                      <span>
                        <Icon name="spark" size={19} />
                      </span>
                    </div>
                    <div>
                      <p>Studio Credits</p>
                      <h2 id="credits-heading">
                        <span className="sr-only">Studio Credits: </span>824
                      </h2>
                      <span>available now</span>
                    </div>
                  </div>
                  <div className="credit-ledger-preview">
                    <div>
                      <span>Reserved</span>
                      <strong>96</strong>
                    </div>
                    <div>
                      <span>Settled this grant</span>
                      <strong>80</strong>
                    </div>
                  </div>
                  <div className="grant-note">
                    <Icon name="check" size={16} />
                    <span>
                      Credits roll over
                      <small>Next 1,000-credit grant · Sep 1</small>
                    </span>
                  </div>
                  <button
                    className="upgrade-button"
                    type="button"
                    onClick={() => setNotice("Plan comparison will open here in the billing milestone.")}
                  >
                    Compare plans <Icon name="arrow" size={16} />
                  </button>
                </section>

                <section className="rail-panel tip-panel">
                  <span className="tip-icon">
                    <Icon name="spark" size={18} />
                  </span>
                  <div>
                    <p>Studio note</p>
                    <h3>Lock the lines you love.</h3>
                    <span>Accepted takes stay untouched when you regenerate nearby dialogue.</span>
                  </div>
                </section>
              </aside>
            </div>
          </main>
        </div>

        <nav className="mobile-bottom-nav" aria-label="Primary mobile navigation">
          <a href="#top" className="is-active" aria-current="page">
            <Icon name="home" size={20} />
            <span>Home</span>
          </a>
          <a href="#projects">
            <Icon name="projects" size={20} />
            <span>Projects</span>
          </a>
          <button type="button" className="mobile-create-button" onClick={() => openCreate("audiobook")}>
            <span>
              <Icon name="plus" size={22} />
            </span>
            <small>Create</small>
          </button>
          <a href="#assets">
            <Icon name="library" size={20} />
            <span>Assets</span>
          </a>
          <button type="button" onClick={() => setMobileNavOpen(true)}>
            <Icon name="menu" size={20} />
            <span>More</span>
          </button>
        </nav>
      </div>

      {mobileNavOpen ? (
        <div className="mobile-drawer-layer">
          <button
            className="drawer-backdrop"
            type="button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close Studio navigation"
            tabIndex={-1}
          />
          <aside className="mobile-drawer" aria-label="Studio menu">
            <div className="drawer-heading">
              <Brand />
              <button
                className="icon-button"
                type="button"
                onClick={() => {
                  setMobileNavOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close Studio navigation"
                autoFocus
              >
                <Icon name="close" size={21} />
              </button>
            </div>
            <Navigation onNavigate={() => setMobileNavOpen(false)} />
            <div className="drawer-account">
              <span className="profile-avatar">AT</span>
              <span>
                <strong>Atarq</strong>
                <small>Free plan · 824 Studio Credits</small>
              </span>
            </div>
          </aside>
        </div>
      ) : null}

      {createOpen ? (
        <div className="create-layer">
          <button
            className="create-backdrop"
            type="button"
            onClick={closeCreate}
            aria-label="Close create panel"
            tabIndex={-1}
          />
          <div
            className="create-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-panel-title"
            aria-describedby="create-panel-description"
            ref={dialogRef}
          >
            <div className="create-panel-header">
              <div>
                <p className="section-kicker">New creation</p>
                <h2 id="create-panel-title">Choose your starting signal</h2>
                <p id="create-panel-description">
                  You can move between tools later without losing your source work.
                </p>
              </div>
              <button
                ref={dialogCloseRef}
                className="icon-button"
                type="button"
                onClick={closeCreate}
                aria-label="Close create panel"
              >
                <Icon name="close" size={21} />
              </button>
            </div>

            <div className="create-type-list" aria-label="Creation type">
              {createActions.map((action) => (
                <button
                  type="button"
                  key={action.id}
                  className={`create-type create-type--${action.tone}${
                    selectedCreate === action.id ? " is-selected" : ""
                  }`}
                  onClick={() => setSelectedCreate(action.id)}
                  aria-pressed={selectedCreate === action.id}
                >
                  <span>
                    <Icon name={action.icon} size={19} />
                  </span>
                  <strong>{action.label}</strong>
                  {selectedCreate === action.id ? <Icon name="check" size={17} /> : null}
                </button>
              ))}
            </div>

            <form className="create-form" onSubmit={submitCreate}>
              <div className="selected-create-summary">
                <span className={`quick-action-icon quick-action-icon--${selectedAction.tone}`}>
                  <Icon name={selectedAction.icon} size={23} />
                </span>
                <div>
                  <h3>{selectedAction.label}</h3>
                  <p>{selectedAction.description}</p>
                </div>
              </div>

              <label className="field-label" htmlFor="creation-name">
                Working title
                <input
                  id="creation-name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder={`Untitled ${selectedAction.label}`}
                  autoComplete="off"
                />
                <small>You can rename this at any time.</small>
              </label>

              <fieldset className="start-methods">
                <legend>How would you like to begin?</legend>
                <button
                  className={startMethod === "blank" ? "is-selected" : ""}
                  type="button"
                  onClick={() => setStartMethod("blank")}
                  aria-pressed={startMethod === "blank"}
                >
                  <span>
                    <Icon name="plus" size={20} />
                  </span>
                  <strong>Start fresh</strong>
                  <small>Open a clean, editable workspace.</small>
                  {startMethod === "blank" ? <Icon name="check" size={17} /> : null}
                </button>
                <button
                  className={startMethod === "import" ? "is-selected" : ""}
                  type="button"
                  onClick={() => setStartMethod("import")}
                  aria-pressed={startMethod === "import"}
                >
                  <span>
                    <Icon name="upload" size={20} />
                  </span>
                  <strong>Bring a source</strong>
                  <small>
                    {selectedCreate === "audiobook"
                      ? "Import a TXT or DOCX manuscript."
                      : selectedCreate === "transcription"
                        ? "Choose owned audio or video."
                        : "Upload an eligible source file."}
                  </small>
                  {startMethod === "import" ? <Icon name="check" size={17} /> : null}
                </button>
              </fieldset>

              <div className="create-assurance">
                <Icon name={selectedCreate === "voice" ? "voice" : "credits"} size={19} />
                <p>
                  {selectedCreate === "voice"
                    ? "Real-person voices begin private and require identity, consent, and capture checks."
                    : "No Studio Credits are reserved now. You’ll review a clear estimate before any generation runs."}
                </p>
              </div>

              <div className="create-form-actions">
                <button className="secondary-button" type="button" onClick={closeCreate}>
                  Cancel
                </button>
                <button className="primary-button" type="submit">
                  Continue to setup <Icon name="arrow" size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className={`toast${notice ? " is-visible" : ""}`} role="status" aria-live="polite">
        <span>
          <Icon name="check" size={17} />
        </span>
        <p>{notice ?? ""}</p>
        {notice ? (
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification">
            <Icon name="close" size={17} />
          </button>
        ) : null}
      </div>
    </>
  );
}
