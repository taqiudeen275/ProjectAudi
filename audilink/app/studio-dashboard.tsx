"use client";

import type { ProjectKind } from "@audilink/contracts";
import { productSurfaces } from "@audilink/ui";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CreateActionId = "audiobook" | "tts" | "voice" | "sfx" | "transcription";

type IconName =
  | "arrow"
  | "bell"
  | "book"
  | "check"
  | "chevron"
  | "close"
  | "credits"
  | "menu"
  | "more"
  | "pause"
  | "play"
  | "plus"
  | "search"
  | "sound"
  | "spark"
  | "transcript"
  | "upload"
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

const projectKindLabels = {
  audiobook: "Audiobook",
  serial: "Serial",
  textToSpeech: "Speech",
  soundDesign: "Sound Effect",
} as const satisfies Record<ProjectKind, string>;

export type StudioProject = {
  id: string;
  title: string;
  kind: (typeof projectKindLabels)[ProjectKind] | "Transcription" | "Voice";
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
  createActions: [CreateAction, ...CreateAction[]];
  projects: StudioProject[];
  jobs: StudioJob[];
};

const filters = ["All", ...Object.values(projectKindLabels), "Transcription", "Voice"] as const;
type ProjectFilter = (typeof filters)[number];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width={size} height={size}>
      {name === "arrow" ? <path {...line} d="M5 12h14m-5-5 5 5-5 5" /> : null}
      {name === "bell" ? (
        <><path {...line} d="M6 9a6 6 0 0 1 12 0c0 6.5 3 7 3 7H3s3-.5 3-7Z" /><path {...line} d="M10 20h4" /></>
      ) : null}
      {name === "book" ? (
        <><path {...line} d="M4 4.5h10a3 3 0 0 1 3 3V20H7a3 3 0 0 1-3-3V4.5Z" /><path {...line} d="M7 4.5V17a3 3 0 0 0 3 3M17 8h3v12h-3" /></>
      ) : null}
      {name === "check" ? <path {...line} d="m5 12 4 4L19 6" /> : null}
      {name === "chevron" ? <path {...line} d="m8 10 4 4 4-4" /> : null}
      {name === "close" ? <path {...line} d="M6 6l12 12M18 6 6 18" /> : null}
      {name === "credits" ? (
        <><path {...line} d="M4 8.5A4.5 4.5 0 0 1 8.5 4H18a2 2 0 0 1 2 2v13H8.5A4.5 4.5 0 0 1 4 14.5v-6Z" /><path {...line} d="M4 9h13v6H4m13-3h.01" /></>
      ) : null}
      {name === "menu" ? <path {...line} d="M4 8h16M4 16h16" /> : null}
      {name === "more" ? <><circle cx="5" cy="12" r="1.2" fill="currentColor" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /><circle cx="19" cy="12" r="1.2" fill="currentColor" /></> : null}
      {name === "pause" ? <path {...line} d="M9 7v10M15 7v10" /> : null}
      {name === "play" ? <path d="m9 7 8 5-8 5V7Z" fill="currentColor" /> : null}
      {name === "plus" ? <path {...line} d="M12 5v14M5 12h14" /> : null}
      {name === "search" ? <><circle {...line} cx="10.5" cy="10.5" r="6.5" /><path {...line} d="m15.5 15.5 5 5" /></> : null}
      {name === "sound" ? <><path {...line} d="M4 14h3l5 4V6l-5 4H4v4Z" /><path {...line} d="M16 9a4.5 4.5 0 0 1 0 6m2.5-8.5a8 8 0 0 1 0 11" /></> : null}
      {name === "spark" ? <><path {...line} d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" /><path {...line} d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></> : null}
      {name === "transcript" ? <><path {...line} d="M6 3h9l4 4v14H6V3Z" /><path {...line} d="M15 3v5h4M9 12h7M9 16h7" /></> : null}
      {name === "upload" ? <><path {...line} d="M12 16V4m-5 5 5-5 5 5" /><path {...line} d="M5 17v3h14v-3" /></> : null}
      {name === "voice" ? <><rect {...line} x="9" y="3" width="6" height="12" rx="3" /><path {...line} d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" /></> : null}
      {name === "wave" ? <path {...line} d="M3 12h2l2-6 3 12 3-14 3 12 2-7 2 3h1" /> : null}
    </svg>
  );
}

function StudioBrand({ compact = false }: { compact?: boolean }) {
  const [productName, surfaceName] = productSurfaces.studio.name.split(" ", 2);
  return (
    <span className={`studio-brand${compact ? " is-compact" : ""}`}>
      <span className="studio-signal" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      <span>{productName}</span>
      <small>{surfaceName}</small>
    </span>
  );
}

function Waveform({ bars, playing = false }: { bars: number[]; playing?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <span className={`workspace-wave${playing ? " is-playing" : ""}`} aria-hidden="true">
      {bars.map((height, index) => (
        <motion.i
          key={`${height}-${index}`}
          animate={{ opacity: playing ? 0.92 : 0.34, scaleY: playing ? 1 : 0.55 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.28, delay: shouldReduceMotion ? 0 : Math.min(index * 0.008, 0.1), ease: [0.22, 1, 0.36, 1] }}
          style={{ height }}
        />
      ))}
    </span>
  );
}

function FocusProject({ project, playing, onPlay, onOpen }: { project: StudioProject; playing: boolean; onPlay: () => void; onOpen: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const initials = project.title.split(" ").slice(0, 2).map((word) => word[0]).join("");
  return (
    <motion.article className="focus-project" layout={!shouldReduceMotion}>
      <div className={`focus-art focus-art--${project.tone}`} aria-hidden="true">
        <span>{initials}</span>
        <small>{project.kind}</small>
      </div>
      <div className="focus-project-body">
        <div className="focus-project-topline">
          <span>{project.status}</span>
          <small>Edited {project.updated}</small>
        </div>
        <h2>{project.title}</h2>
        <p>{project.detail} · Your last edit is ready.</p>
        <div className="focus-transport">
          <motion.button
            type="button"
            className="workspace-play"
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.94 }}
            onClick={onPlay}
            aria-label={`${playing ? "Pause" : "Play"} preview of ${project.title}`}
            aria-pressed={playing}
          >
            <Icon name={playing ? "pause" : "play"} size={20} />
          </motion.button>
          <Waveform bars={project.waveform} playing={playing} />
          <span>{project.duration}</span>
        </div>
        <div className="focus-progress-copy">
          <span>{project.progress}% complete</span>
          <span>{project.progress < 100 ? "Continue chapter" : "Ready to review"}</span>
        </div>
        <div className="focus-progress" role="progressbar" aria-label={`${project.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={project.progress}>
          <motion.span initial={shouldReduceMotion ? false : { width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }} />
        </div>
        <button className="workspace-primary" type="button" onClick={onOpen}>
          Open project <Icon name="arrow" size={17} />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectRow({ project, playing, onPlay, onOpen }: { project: StudioProject; playing: boolean; onPlay: () => void; onOpen: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.article className="project-row" layout={!shouldReduceMotion} initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }} transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}>
      <button className="project-row-play" type="button" onClick={onPlay} aria-label={`${playing ? "Pause" : "Play"} ${project.title}`} aria-pressed={playing}>
        <Icon name={playing ? "pause" : "play"} size={18} />
      </button>
      <div className="project-row-title">
        <h3>{project.title}</h3>
        <p>{project.kind} · {project.detail}</p>
      </div>
      <Waveform bars={project.waveform.slice(0, 12)} playing={playing} />
      <div className="project-row-status">
        <span>{project.status}</span>
        <small>{project.updated}</small>
      </div>
      <button className="project-open" type="button" onClick={onOpen} aria-label={`Open ${project.title}`}>
        <Icon name="arrow" size={18} />
      </button>
    </motion.article>
  );
}

function JobRow({ job, cancelling, onCancel, onOpen }: { job: StudioJob; cancelling: boolean; onCancel: () => void; onOpen: () => void }) {
  const state = cancelling ? "Cancelling" : job.status;
  return (
    <div className="job-row">
      <span className={`job-indicator job-indicator--${job.status.toLowerCase()}`} aria-hidden="true" />
      <div>
        <h3>{job.title}</h3>
        <p>{job.project} · {cancelling ? "Finishing current safe step" : job.phase}</p>
      </div>
      <div className="job-row-meta">
        <span>{state}</span>
        <small>{job.estimate}</small>
      </div>
      <div className="job-progress" role="progressbar" aria-label={`${job.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={job.progress}>
        <span style={{ width: `${Math.max(job.progress, 5)}%` }} />
      </div>
      {job.status === "Complete" ? (
        <button className="workspace-text-button" type="button" onClick={onOpen}>Review</button>
      ) : (
        <button className="workspace-text-button" type="button" disabled={cancelling} onClick={onCancel}>{job.status === "Queued" ? "Leave" : "Cancel"}</button>
      )}
    </div>
  );
}

export default function StudioDashboard({ createActions, projects, jobs }: StudioDashboardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedCreate, setSelectedCreate] = useState<CreateActionId>("audiobook");
  const [projectName, setProjectName] = useState("");
  const [startMethod, setStartMethod] = useState<"blank" | "import">("blank");
  const [showAll, setShowAll] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [cancelledJobs, setCancelledJobs] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const menuPreviousFocusRef = useRef<HTMLElement | null>(null);

  const selectedAction = createActions.find((action) => action.id === selectedCreate) ?? createActions[0];
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesFilter = filter === "All" || project.kind === filter;
      const matchesSearch = !query || `${project.title} ${project.kind} ${project.detail} ${project.status}`.toLocaleLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, projects, search]);
  const visibleProjects = showAll || browseOpen ? filteredProjects : filteredProjects.slice(0, 3);

  const motionTransition = { duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.getAttribute("contenteditable") === "true";
      if (event.key === "/" && !editing && !createOpen) {
        event.preventDefault();
        setBrowseOpen(true);
        requestAnimationFrame(() => document.querySelector<HTMLInputElement>("#studio-project-search")?.focus());
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [createOpen]);

  useEffect(() => {
    if (!createOpen) return;
    document.body.classList.add("has-overlay");
    dialogCloseRef.current?.focus();
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setCreateOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("has-overlay");
      previousFocusRef.current?.focus();
    };
  }, [createOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    document.body.classList.add("has-overlay");
    menuCloseRef.current?.focus();
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { setMobileNavOpen(false); return; }
      if (event.key !== "Tab" || !menuRef.current) return;
      const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.classList.remove("has-overlay");
      menuPreviousFocusRef.current?.focus();
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const openCreate = (id: CreateActionId) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setSelectedCreate(id);
    setCreateOpen(true);
  };

  const submitCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = projectName.trim() || `Untitled ${selectedAction.label}`;
    setCreateOpen(false);
    setProjectName("");
    setNotice(`${name} setup scenario is ready. No generation or billing occurred.`);
  };

  const notifyProject = (project: StudioProject) => setNotice(`${project.title} selected. The full editor arrives in a later milestone.`);
  const focusedProject = projects[0];

  if (!focusedProject) {
    return (
      <main className="workspace-empty-state">
        <StudioBrand />
        <h1>Your workspace is ready.</h1>
        <p>Create the first project to begin.</p>
        <button className="workspace-primary" type="button" onClick={() => openCreate("audiobook")}>New project</button>
      </main>
    );
  }

  return (
    <div className="workspace-shell" id="top">
      <a className="skip-link" href="#studio-main">Skip to Studio workspace</a>

      <header className="workspace-header">
        <Link className="workspace-brand-link" href="/" aria-label="AudiLink Studio public home"><StudioBrand /></Link>
        <nav className="workspace-nav" aria-label="Workspace navigation">
          <a className="is-current" href="#top" aria-current="page">Home</a>
          <a href="#projects">Projects</a>
          <a href="#activity">Activity</a>
        </nav>
        <div className="workspace-header-actions">
          <button className="header-credit" type="button" onClick={() => { setCreditsOpen(true); document.querySelector("#credits")?.scrollIntoView(); }}>
            <Icon name="credits" size={17} /><span>824</span><small>Studio Credits</small>
          </button>
          <button className="quiet-icon-button" type="button" onClick={() => setNotice("No new notifications in this local scenario.")} aria-label="Notifications"><Icon name="bell" size={19} /></button>
          <button className="workspace-avatar" type="button" aria-label="Open account menu, available in a later milestone">AT</button>
          <button
            className="workspace-menu-button"
            type="button"
            aria-label="Open Studio navigation"
            aria-controls="workspace-mobile-menu"
            aria-expanded={mobileNavOpen}
            onClick={(event) => { menuPreviousFocusRef.current = event.currentTarget; setMobileNavOpen(true); }}
          ><Icon name="menu" size={21} /></button>
        </div>
      </header>

      <main className="workspace-main" id="studio-main">
        <div className="scenario-note"><span>Foundation preview</span><p>Local fixture data · no generation or billing</p></div>

        <motion.section className="workspace-intro" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...motionTransition, duration: shouldReduceMotion ? 0 : 0.55 }}>
          <div>
            <p className="workspace-kicker">Personal workspace</p>
            <h1>Pick up where the story paused.</h1>
          </div>
          <button className="workspace-primary" type="button" onClick={() => openCreate("audiobook")}><Icon name="plus" size={18} /> New project</button>
        </motion.section>

        <FocusProject
          project={focusedProject}
          playing={playingId === focusedProject.id}
          onPlay={() => setPlayingId((id) => id === focusedProject.id ? null : focusedProject.id)}
          onOpen={() => notifyProject(focusedProject)}
        />

        <section className="create-strip" id="create" aria-labelledby="create-heading">
          <div className="workspace-section-heading">
            <div><p className="workspace-kicker">Start</p><h2 id="create-heading">What are you making?</h2></div>
            <p>Choose a path. You can move between tools later.</p>
          </div>
          <div className="create-choice-list">
            {createActions.map((action) => (
              <motion.button key={action.id} type="button" className="create-choice" onClick={() => openCreate(action.id)} whileHover={{ y: shouldReduceMotion ? 0 : -3 }} whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}>
                <span className={`create-choice-icon create-choice-icon--${action.tone}`}><Icon name={action.icon} size={20} /></span>
                <span><strong>{action.label}</strong><small>{action.meta}</small></span>
                <Icon name="arrow" size={17} />
              </motion.button>
            ))}
          </div>
        </section>

        <section className="recent-work" id="projects" aria-labelledby="projects-heading">
          <div className="workspace-section-heading projects-heading-row">
            <div><p className="workspace-kicker">Recent work</p><h2 id="projects-heading">Projects</h2></div>
            <button className="workspace-text-button" type="button" aria-expanded={browseOpen} aria-controls="project-browse-tools" onClick={() => setBrowseOpen((open) => !open)}><Icon name="search" size={16} /> {browseOpen ? "Close search" : "Search & filter"}</button>
          </div>

          <AnimatePresence initial={false}>
            {browseOpen ? (
              <motion.div id="project-browse-tools" className="project-browse-tools" initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }} transition={motionTransition}>
                <label><span className="sr-only">Search projects</span><Icon name="search" size={17} /><input id="studio-project-search" type="search" placeholder="Search recent projects" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
                <div className="project-filters" aria-label="Filter project type">
                  {filters.map((item) => <button key={item} type="button" className={filter === item ? "is-selected" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item === "Sound Effect" ? "Effects" : item}</button>)}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="project-list" aria-live="polite">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProjects.map((project) => (
                <ProjectRow key={project.id} project={project} playing={playingId === project.id} onPlay={() => setPlayingId((id) => id === project.id ? null : project.id)} onOpen={() => notifyProject(project)} />
              ))}
            </AnimatePresence>
            {!visibleProjects.length ? <div className="workspace-empty"><p>No projects match this view.</p><button type="button" className="workspace-text-button" onClick={() => { setSearch(""); setFilter("All"); }}>Clear filters</button></div> : null}
          </div>
          {!browseOpen && filteredProjects.length > 3 ? (
            <button className="show-more-projects" type="button" onClick={() => setShowAll((shown) => !shown)} aria-expanded={showAll}>{showAll ? "Show fewer projects" : `Show all ${filteredProjects.length} projects`} <Icon name="chevron" size={16} /></button>
          ) : null}
        </section>

        <section className="workspace-disclosures" aria-label="Workspace status">
          <div className="workspace-disclosure" id="activity">
            <button type="button" aria-expanded={activityOpen} aria-controls="activity-content" onClick={() => setActivityOpen((open) => !open)}>
              <span className="disclosure-icon"><span className="live-dot" />Activity</span>
              <span className="disclosure-summary">2 active jobs</span>
              <Icon name="chevron" size={18} />
            </button>
            <AnimatePresence initial={false}>
              {activityOpen ? (
                <motion.div id="activity-content" className="disclosure-content" initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }} transition={motionTransition}>
                  {jobs.map((job) => <JobRow key={job.id} job={job} cancelling={cancelledJobs.includes(job.id)} onCancel={() => { setCancelledJobs((current) => current.includes(job.id) ? current : [...current, job.id]); setNotice(job.status === "Queued" ? `${job.title} will leave the local queue without a charge.` : `Cancellation requested for ${job.title}. This is a local scenario only.`); }} onOpen={() => setNotice(`${job.title} results selected. This fixture does not contain generated audio.`)} />)}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="workspace-disclosure" id="credits">
            <button type="button" aria-expanded={creditsOpen} aria-controls="credits-content" onClick={() => setCreditsOpen((open) => !open)}>
              <span className="disclosure-icon"><Icon name="credits" size={18} />Studio Credits</span>
              <span className="disclosure-summary">824 available</span>
              <Icon name="chevron" size={18} />
            </button>
            <AnimatePresence initial={false}>
              {creditsOpen ? (
                <motion.div id="credits-content" className="disclosure-content credit-disclosure" initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }} transition={motionTransition}>
                  <div><span>Available</span><strong>824</strong></div><div><span>Reserved</span><strong>96</strong></div><div><span>Settled this grant</span><strong>80</strong></div>
                  <p><Icon name="check" size={16} /> Credits roll over. The next 1,000-credit grant is Sep 1.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div className="workspace-mobile-layer" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: shouldReduceMotion ? 1 : 0 }} transition={motionTransition}>
            <button className="workspace-mobile-backdrop" type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close Studio navigation" tabIndex={-1} />
            <motion.div ref={menuRef} id="workspace-mobile-menu" className="workspace-mobile-menu" role="dialog" aria-modal="true" aria-labelledby="workspace-mobile-title" initial={shouldReduceMotion ? false : { x: "100%" }} animate={{ x: 0 }} exit={{ x: shouldReduceMotion ? 0 : "100%" }} transition={motionTransition}>
              <div><h2 id="workspace-mobile-title"><StudioBrand compact /></h2><button ref={menuCloseRef} className="quiet-icon-button" type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><Icon name="close" size={21} /></button></div>
              <nav aria-label="Mobile Studio navigation"><a href="#top" onClick={() => setMobileNavOpen(false)}>Home</a><a href="#create" onClick={() => setMobileNavOpen(false)}>Create</a><a href="#projects" onClick={() => setMobileNavOpen(false)}>Projects</a><a href="#activity" onClick={() => { setActivityOpen(true); setMobileNavOpen(false); }}>Activity <span>2</span></a></nav>
              <Link href="/">View public Studio site <Icon name="arrow" size={17} /></Link>
              <p>Foundation preview · local fixture data</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {createOpen ? (
          <motion.div className="create-layer" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: shouldReduceMotion ? 1 : 0 }} transition={motionTransition}>
            <button className="create-backdrop" type="button" onClick={() => setCreateOpen(false)} aria-label="Close create panel" tabIndex={-1} />
            <motion.div ref={dialogRef} className="create-panel" role="dialog" aria-modal="true" aria-labelledby="create-panel-title" aria-describedby="create-panel-description" initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.99 }} transition={motionTransition}>
              <div className="create-panel-header">
                <div><p className="workspace-kicker">Setup scenario</p><h2 id="create-panel-title">Start something new</h2><p id="create-panel-description">No Studio Credits are reserved in this foundation preview.</p></div>
                <button ref={dialogCloseRef} className="quiet-icon-button" type="button" onClick={() => setCreateOpen(false)} aria-label="Close create panel"><Icon name="close" size={21} /></button>
              </div>
              <div className="create-type-list" aria-label="Creation type">
                {createActions.map((action) => <button key={action.id} type="button" className={selectedCreate === action.id ? "is-selected" : ""} aria-pressed={selectedCreate === action.id} onClick={() => setSelectedCreate(action.id)}><Icon name={action.icon} size={18} /><span>{action.label}</span></button>)}
              </div>
              <form className="create-form" onSubmit={submitCreate}>
                <div className="selected-create-summary"><span className={`create-choice-icon create-choice-icon--${selectedAction.tone}`}><Icon name={selectedAction.icon} size={22} /></span><div><h3>{selectedAction.label}</h3><p>{selectedAction.description}</p></div></div>
                <label className="field-label" htmlFor="creation-name"><span>Working title</span><input id="creation-name" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder={`Untitled ${selectedAction.label}`} autoComplete="off" /><small>Rename it any time.</small></label>
                <fieldset className="start-methods"><legend>Starting point</legend><button type="button" className={startMethod === "blank" ? "is-selected" : ""} aria-pressed={startMethod === "blank"} onClick={() => setStartMethod("blank")}><Icon name="plus" size={19} /><span><strong>Start fresh</strong><small>Open a clean workspace.</small></span></button><button type="button" className={startMethod === "import" ? "is-selected" : ""} aria-pressed={startMethod === "import"} onClick={() => setStartMethod("import")}><Icon name="upload" size={19} /><span><strong>Bring a source</strong><small>{selectedCreate === "audiobook" ? "Import a TXT or DOCX manuscript." : selectedCreate === "transcription" ? "Choose audio you own." : "Upload an eligible source file."}</small></span></button></fieldset>
                <div className="create-assurance"><Icon name={selectedCreate === "voice" ? "voice" : "credits"} size={19} /><p>{selectedCreate === "voice" ? "Real-person voices begin private and require identity, consent, and capture checks." : "A clear estimate will appear before any future generation runs."}</p></div>
                <div className="create-form-actions"><button className="workspace-secondary" type="button" onClick={() => setCreateOpen(false)}>Cancel</button><button className="workspace-primary" type="submit">Continue to setup <Icon name="arrow" size={17} /></button></div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {notice ? (
          <motion.div className="workspace-toast" role="status" aria-live="polite" initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={motionTransition}>
            <Icon name="check" size={17} /><p>{notice}</p><button type="button" onClick={() => setNotice(null)} aria-label="Dismiss notification"><Icon name="close" size={16} /></button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
