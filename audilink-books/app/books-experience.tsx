"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Book, ContinueItem, CoverTone } from "./books-data";

type BooksExperienceProps = {
  featured: Book;
  continueItems: ContinueItem[];
  trending: Book[];
  serials: Book[];
};

type IconName =
  | "arrow"
  | "back15"
  | "bell"
  | "bookmark"
  | "check"
  | "chevron"
  | "close"
  | "coin"
  | "compass"
  | "download"
  | "forward15"
  | "grid"
  | "headphones"
  | "home"
  | "library"
  | "list"
  | "more"
  | "next"
  | "pause"
  | "play"
  | "previous"
  | "search"
  | "sparkles"
  | "user"
  | "volume";

const categories = [
  "All",
  "Fantasy",
  "Mystery",
  "Sci-Fi",
  "Literary",
  "Romance",
] as const;

type Category = (typeof categories)[number];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const content: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    back15: (
      <>
        <path d="M4.9 7.5H9V3.4" />
        <path d="M5.1 7.2a8 8 0 1 1-1 6.5" />
        <path d="M9.2 11.2v5.1" />
        <path d="M12.2 12.1c.4-.7 1.1-1 1.8-1 .9 0 1.7.5 1.7 1.4 0 1.1-.8 1.4-1.6 1.4h-.5 0c1.4-.1 2.4.2 2.4 1.4 0 1-.8 1.7-2 1.7-.9 0-1.6-.4-2-1" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m7 9 5 5 5-5" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    coin: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.3 9.4c.5-.8 1.5-1.3 2.8-1.3 1.6 0 2.8.8 2.8 2 0 3.2-5.8 1.2-5.8 4.3 0 1.1 1.2 1.9 2.9 1.9 1.4 0 2.5-.5 3.1-1.4" />
        <path d="M12 6.4v11.2" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2Z" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    forward15: (
      <>
        <path d="M19.1 7.5H15V3.4" />
        <path d="M18.9 7.2a8 8 0 1 0 1 6.5" />
        <path d="M8.2 11.2v5.1" />
        <path d="M11.2 12.1c.4-.7 1.1-1 1.8-1 .9 0 1.7.5 1.7 1.4 0 1.1-.8 1.4-1.6 1.4h-.5 0c1.4-.1 2.4.2 2.4 1.4 0 1-.8 1.7-2 1.7-.9 0-1.6-.4-2-1" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5Z" />
        <path d="M20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
    library: (
      <>
        <path d="M4 4h5v16H4z" />
        <path d="M10 4h5v16h-5z" />
        <path d="m16 5 4-1 2 15-4 1-2-15Z" />
      </>
    ),
    list: (
      <>
        <path d="M8 6h12" />
        <path d="M8 12h12" />
        <path d="M8 18h12" />
        <path d="M4 6h.01M4 12h.01M4 18h.01" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    next: (
      <>
        <path d="m8 5 8 7-8 7V5Z" />
        <path d="M18 5v14" />
      </>
    ),
    pause: (
      <>
        <path d="M9 6v12" />
        <path d="M15 6v12" />
      </>
    ),
    play: <path d="m9 6 9 6-9 6V6Z" />,
    previous: (
      <>
        <path d="m16 5-8 7 8 7V5Z" />
        <path d="M6 5v14" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
        <path d="m19 13 .6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6L19 13Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    volume: (
      <>
        <path d="M5 10v4h4l5 4V6l-5 4H5Z" />
        <path d="M17 9a4 4 0 0 1 0 6" />
        <path d="M19.5 6.5a8 8 0 0 1 0 11" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        {content[name]}
      </g>
    </svg>
  );
}

function BrandMark() {
  return (
    <span aria-hidden="true" className="brand-mark">
      <svg fill="none" viewBox="0 0 32 32">
        <path d="M5 18.5c2.4 0 2.4-5 4.8-5s2.4 8 4.8 8 2.4-13 4.8-13 2.4 9 4.8 9H27" />
        <path d="M16 4.5a11.5 11.5 0 1 0 0 23 11.5 11.5 0 0 0 0-23Z" />
      </svg>
    </span>
  );
}

function Cover({
  tone,
  title,
  compact = false,
}: {
  tone: CoverTone;
  title: string;
  compact?: boolean;
}) {
  const words = title.split(" ");
  const shortTitle = words.length > 4 ? words.slice(0, 4).join(" ") : title;

  return (
    <div
      aria-hidden="true"
      className={`book-cover cover-${tone}${compact ? " book-cover-compact" : ""}`}
    >
      <span className="cover-kicker">AudiLink original</span>
      <span className="cover-glyph">
        <i />
        <i />
        <i />
      </span>
      <span className="cover-title">{shortTitle}</span>
      <span className="cover-rule" />
    </div>
  );
}

function PriceLabel({ book }: { book: Book }) {
  return (
    <span className={book.price === "free" ? "price price-free" : "price"}>
      {book.price === "free" ? (
        "Free"
      ) : (
        <>
          <Icon name="coin" size={14} />
          {book.price} Reader Coins{book.format === "Serial" ? " · episode" : ""}
        </>
      )}
    </span>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  copy,
  action,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  copy?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {copy ? <p className="section-copy">{copy}</p> : null}
      </div>
      {action ? <div className="section-action">{action}</div> : null}
    </div>
  );
}

function ContinueCard({
  book,
  isActive,
  isPlaying,
  onPlay,
}: {
  book: ContinueItem;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (book: Book, progress: number) => void;
}) {
  const activeAndPlaying = isActive && isPlaying;

  return (
    <article className="continue-card">
      <div className="continue-cover">
        <Cover compact title={book.title} tone={book.cover} />
        <button
          aria-label={`${activeAndPlaying ? "Pause" : "Resume"} ${book.title}`}
          className="cover-play-button"
          onClick={() => onPlay(book, book.progress)}
          type="button"
        >
          <Icon name={activeAndPlaying ? "pause" : "play"} size={20} />
        </button>
      </div>
      <div className="continue-copy">
        <span className="continue-label">Continue listening</span>
        <h3>{book.title}</h3>
        <p>{book.creator}</p>
        <p className="current-unit">{book.currentUnit}</p>
        <div className="card-progress" aria-hidden="true">
          <span style={{ width: `${book.progress}%` }} />
        </div>
        <div className="progress-meta">
          <span>{book.progress}% complete</span>
          <span>{book.remaining}</span>
        </div>
      </div>
    </article>
  );
}

function BookCard({
  book,
  saved,
  isActive,
  isPlaying,
  onSave,
  onPlay,
}: {
  book: Book;
  saved: boolean;
  isActive: boolean;
  isPlaying: boolean;
  onSave: (book: Book) => void;
  onPlay: (book: Book) => void;
}) {
  const activeAndPlaying = isActive && isPlaying;

  return (
    <article className="book-card">
      <div className="book-card-art">
        <Cover title={book.title} tone={book.cover} />
        <button
          aria-label={`${saved ? "Remove" : "Save"} ${book.title} ${
            saved ? "from" : "to"
          } Saved`}
          aria-pressed={saved}
          className={`save-button${saved ? " is-saved" : ""}`}
          onClick={() => onSave(book)}
          type="button"
        >
          <Icon name={saved ? "check" : "bookmark"} size={18} />
        </button>
        <button
          aria-label={`${activeAndPlaying ? "Pause" : "Play preview of"} ${
            book.title
          }`}
          className="card-play-button"
          onClick={() => onPlay(book)}
          type="button"
        >
          <Icon name={activeAndPlaying ? "pause" : "play"} size={22} />
        </button>
      </div>
      <div className="book-card-copy">
        <div className="book-card-topline">
          <span>{book.eyebrow ?? book.category}</span>
          <span>{book.format}</span>
        </div>
        <h3>{book.title}</h3>
        <p className="book-creator">{book.creator}</p>
        {book.episode ? <p className="episode-label">{book.episode}</p> : null}
        <div className="book-card-bottom">
          <PriceLabel book={book} />
          <span className="duration">{book.duration}</span>
        </div>
        <p className="provenance-label">
          <Icon name="sparkles" size={13} />
          {book.provenance}
        </p>
      </div>
    </article>
  );
}

function SerialCard({
  book,
  saved,
  isActive,
  isPlaying,
  onSave,
  onPlay,
}: {
  book: Book;
  saved: boolean;
  isActive: boolean;
  isPlaying: boolean;
  onSave: (book: Book) => void;
  onPlay: (book: Book) => void;
}) {
  const activeAndPlaying = isActive && isPlaying;

  return (
    <article className="serial-card">
      <div className="serial-cover-wrap">
        <Cover compact title={book.title} tone={book.cover} />
      </div>
      <div className="serial-copy">
        <div className="serial-topline">
          <span>{book.eyebrow}</span>
          <button
            aria-label={`${saved ? "Remove" : "Save"} ${book.title} ${
              saved ? "from" : "to"
            } Saved`}
            aria-pressed={saved}
            className={`text-save-button${saved ? " is-saved" : ""}`}
            onClick={() => onSave(book)}
            type="button"
          >
            <Icon name={saved ? "check" : "bookmark"} size={16} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <h3>{book.title}</h3>
        <p className="book-creator">{book.creator}</p>
        <p className="serial-description">{book.description}</p>
        <p className="episode-label">{book.episode}</p>
        <div className="serial-actions">
          <button
            className="small-play-button"
            onClick={() => onPlay(book)}
            type="button"
          >
            <Icon name={activeAndPlaying ? "pause" : "play"} size={17} />
            {activeAndPlaying ? "Pause" : "Preview"}
          </button>
          <PriceLabel book={book} />
        </div>
      </div>
    </article>
  );
}

function UnlockDialog({
  open,
  book,
  balance,
  onClose,
  onConfirm,
}: {
  open: boolean;
  book: Book;
  balance: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const coinPrice = book.price === "free" ? 0 : book.price;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby="unlock-dialog-title"
      className="unlock-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      <div className="dialog-content">
        <div className="dialog-heading">
          <div className="dialog-icon">
            <Icon name="coin" size={24} />
          </div>
          <button
            aria-label="Close unlock confirmation"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <p className="section-eyebrow">Permanent access</p>
        <h2 id="unlock-dialog-title">Unlock {book.title}?</h2>
        <p className="dialog-description">
          The complete audiobook will be added to your Library and remain
          available after ordinary delisting or later price changes.
        </p>

        <div className="unlock-scope">
          <Cover compact title={book.title} tone={book.cover} />
          <div>
            <span>Unlock scope</span>
            <strong>Complete audiobook</strong>
            <small>{book.duration} · all chapters</small>
          </div>
        </div>

        <dl className="coin-breakdown">
          <div>
            <dt>Current balance</dt>
            <dd>{balance} Reader Coins</dd>
          </div>
          <div>
            <dt>Promotional Coins used first</dt>
            <dd>−{coinPrice} Reader Coins</dd>
          </div>
          <div className="coin-result">
            <dt>Balance after unlock</dt>
            <dd>{balance - coinPrice} Reader Coins</dd>
          </div>
        </dl>

        <p className="dialog-note">
          Your promotional balance expires October 14, 2026. Purchased Reader
          Coins never expire.
        </p>

        <div className="dialog-actions">
          <button className="secondary-button" onClick={onClose} type="button">
            Not now
          </button>
          <button className="primary-button" onClick={onConfirm} type="button">
            <Icon name="coin" size={17} />
            Unlock for {coinPrice} Reader Coins
          </button>
        </div>
      </div>
    </dialog>
  );
}

function PersistentPlayer({
  book,
  progress,
  playing,
  speed,
  onProgress,
  onToggle,
  onSeek,
  onSpeed,
}: {
  book: Book;
  progress: number;
  playing: boolean;
  speed: number;
  onProgress: (value: number) => void;
  onToggle: () => void;
  onSeek: (amount: number) => void;
  onSpeed: () => void;
}) {
  const [muted, setMuted] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const totalSeconds = durationToSeconds(book.duration);
  const elapsed = Math.round((progress / 100) * totalSeconds);
  const currentLabel =
    book.episode ??
    ("currentUnit" in book && typeof book.currentUnit === "string"
      ? book.currentUnit
      : "Preview");

  return (
    <aside
      aria-label="Audio player"
      className={`persistent-player${playing ? " is-playing" : ""}`}
    >
      <div className="player-inner">
        <div className="player-book">
          <Cover compact title={book.title} tone={book.cover} />
          <div className="player-title-wrap">
            <span className="player-status">
              {playing ? "Now playing" : "Ready to listen"}
            </span>
            <strong>{book.title}</strong>
            <span>{currentLabel}</span>
          </div>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button
              aria-label="Previous chapter"
              className="player-icon"
              onClick={() => onProgress(Math.max(0, progress - 8))}
              type="button"
            >
              <Icon name="previous" size={19} />
            </button>
            <button
              aria-label="Go back 15 seconds"
              className="player-icon player-seek-button"
              onClick={() => onSeek(-15)}
              type="button"
            >
              <Icon name="back15" size={21} />
            </button>
            <button
              aria-label={playing ? "Pause" : "Play"}
              className="player-play"
              onClick={onToggle}
              type="button"
            >
              <Icon name={playing ? "pause" : "play"} size={22} />
            </button>
            <button
              aria-label="Go forward 15 seconds"
              className="player-icon player-seek-button"
              onClick={() => onSeek(15)}
              type="button"
            >
              <Icon name="forward15" size={21} />
            </button>
            <button
              aria-label="Next chapter"
              className="player-icon"
              onClick={() => onProgress(Math.min(100, progress + 8))}
              type="button"
            >
              <Icon name="next" size={19} />
            </button>
          </div>
          <div className="player-timeline">
            <span>{formatClock(elapsed)}</span>
            <input
              aria-label={`Playback position, ${Math.round(progress)} percent`}
              max="100"
              min="0"
              onChange={(event) => onProgress(Number(event.target.value))}
              step="0.1"
              style={{
                background: `linear-gradient(to right, var(--amber) 0%, var(--amber) ${progress}%, var(--track) ${progress}%, var(--track) 100%)`,
              }}
              type="range"
              value={progress}
            />
            <span>−{formatClock(Math.max(totalSeconds - elapsed, 0))}</span>
          </div>
        </div>

        <div className="player-extras">
          <div aria-hidden="true" className="mini-waveform">
            {[7, 13, 9, 18, 12, 21, 10, 16, 8, 14].map((height, index) => (
              <i key={index} style={{ height }} />
            ))}
          </div>
          <button
            aria-label={`Playback speed ${speed} times. Change speed`}
            className="speed-button"
            onClick={onSpeed}
            type="button"
          >
            {speed}×
          </button>
          <button
            aria-label={muted ? "Unmute" : "Mute"}
            aria-pressed={muted}
            className={`player-icon${muted ? " is-muted" : ""}`}
            onClick={() => setMuted((current) => !current)}
            type="button"
          >
            <Icon name="volume" size={20} />
          </button>
          <button
            aria-controls="player-queue"
            aria-expanded={queueOpen}
            aria-label="Open chapter queue"
            className="player-icon"
            onClick={() => setQueueOpen((current) => !current)}
            type="button"
          >
            <Icon name="list" size={20} />
          </button>
          {queueOpen ? (
            <div className="player-queue" id="player-queue">
              <span>Up next</span>
              <strong>{book.format === "Serial" ? "Next episode" : "Next chapter"}</strong>
              <small>Continue {book.title}</small>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}

function durationToSeconds(duration: string) {
  const hours = Number(duration.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(duration.match(/(\d+)m/)?.[1] ?? 30);
  return Math.max(hours * 3600 + minutes * 60, 60);
}

function formatClock(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function BooksExperience({
  featured,
  continueItems,
  trending,
  serials,
}: BooksExperienceProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [savedIds, setSavedIds] = useState(() => new Set(["quiet-bells"]));
  const [activeBook, setActiveBook] = useState<Book>(continueItems[0]);
  const [playing, setPlaying] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(continueItems[0].progress);
  const progressRef = useRef(continueItems[0].progress);
  const [speed, setSpeed] = useState(1);
  const [readerCoins, setReaderCoins] = useState(240);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [featuredUnlocked, setFeaturedUnlocked] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const allBooks = useMemo(() => {
    const unique = new Map<string, Book>();
    [featured, ...continueItems, ...trending, ...serials].forEach((book) =>
      unique.set(book.id, book),
    );
    return [...unique.values()];
  }, [continueItems, featured, serials, trending]);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return allBooks.filter((book) => {
      const searchable = [
        book.title,
        book.creator,
        book.category,
        book.cast,
        book.description,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return searchable.includes(normalizedQuery);
    });
  }, [allBooks, normalizedQuery]);

  const filteredTrending =
    category === "All"
      ? trending
      : trending.filter((book) => book.category === category);
  const filteredSerials =
    category === "All"
      ? serials
      : serials.filter((book) => book.category === category);

  useEffect(() => {
    progressRef.current = playerProgress;
  }, [playerProgress]);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");

      if (event.key === "/" && !isEditing) {
        event.preventDefault();
        document.getElementById("catalog-search")?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const duration = durationToSeconds(activeBook.duration);
    const interval = window.setInterval(() => {
      const nextProgress = Math.min(
        progressRef.current + (100 / duration) * speed,
        100,
      );
      progressRef.current = nextProgress;
      setPlayerProgress(nextProgress);

      if (nextProgress >= 100) {
        setPlaying(false);
        setAnnouncement(`${activeBook.title} finished.`);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [activeBook.duration, activeBook.title, playing, speed]);

  function handlePlay(book: Book, initialProgress = 0) {
    if (activeBook.id === book.id) {
      setPlaying((current) => !current);
      setAnnouncement(`${playing ? "Paused" : "Playing"} ${book.title}.`);
      return;
    }

    setActiveBook(book);
    setPlayerProgress(initialProgress);
    setPlaying(true);
    setAnnouncement(`Playing preview of ${book.title}.`);
  }

  function handleSave(book: Book) {
    setSavedIds((current) => {
      const next = new Set(current);
      const wasSaved = next.has(book.id);
      if (wasSaved) next.delete(book.id);
      else next.add(book.id);
      setAnnouncement(
        `${book.title} ${wasSaved ? "removed from" : "added to"} Saved.`,
      );
      return next;
    });
  }

  function handleUnlock() {
    const price = featured.price;
    if (price === "free" || featuredUnlocked) return;
    setReaderCoins((current) => current - price);
    setFeaturedUnlocked(true);
    setUnlockOpen(false);
    setAnnouncement(
      `${featured.title} unlocked and added to your Library. ${
        readerCoins - price
      } Reader Coins remain.`,
    );
  }

  function handlePlayerSeek(seconds: number) {
    const duration = durationToSeconds(activeBook.duration);
    const delta = (seconds / duration) * 100;
    setPlayerProgress((current) => Math.max(0, Math.min(100, current + delta)));
  }

  function cycleSpeed() {
    const speeds = [1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(speed);
    const next = speeds[(currentIndex + 1) % speeds.length];
    setSpeed(next);
    setAnnouncement(`Playback speed ${next} times.`);
  }

  const cardProps = (book: Book) => ({
    book,
    isActive: activeBook.id === book.id,
    isPlaying: playing,
    onPlay: handlePlay,
    onSave: handleSave,
    saved: savedIds.has(book.id),
  });

  return (
    <div className="books-app" id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="books-header">
        <div className="header-inner">
          <a aria-label="AudiLink Books home" className="brand" href="#top">
            <BrandMark />
            <span className="brand-name">AudiLink</span>
            <span className="surface-name">Books</span>
          </a>

          <nav aria-label="Primary navigation" className="desktop-nav">
            <a aria-current="page" href="#discover">
              Discover
            </a>
            <a href="#browse">Browse</a>
            <a href="#continue-listening">Library</a>
            <a href="#new-serials">Serials</a>
          </nav>

          <form
            className="header-search"
            onSubmit={(event) => {
              event.preventDefault();
              setAnnouncement(
                normalizedQuery
                  ? `${searchResults.length} search results found.`
                  : "Type a title, creator, cast, or category to search.",
              );
            }}
            role="search"
          >
            <Icon name="search" size={19} />
            <label className="sr-only" htmlFor="catalog-search">
              Search AudiLink Books
            </label>
            <input
              autoComplete="off"
              id="catalog-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stories, creators, casts…"
              type="search"
              value={query}
            />
            {query ? (
              <button
                aria-label="Clear search"
                className="search-clear"
                onClick={() => {
                  setQuery("");
                  setAnnouncement("Search cleared.");
                }}
                type="button"
              >
                <Icon name="close" size={17} />
              </button>
            ) : (
              <kbd aria-label="Keyboard shortcut, slash">/</kbd>
            )}
          </form>

          <div className="header-actions">
            <button
              aria-label={`${readerCoins} Reader Coins. Open wallet`}
              className="coin-balance"
              onClick={() =>
                setAnnouncement(
                  `Reader Coin balance: ${readerCoins}. 20 promotional Reader Coins expire October 14, 2026.`,
                )
              }
              type="button"
            >
              <span className="coin-disc">
                <Icon name="coin" size={17} />
              </span>
              <span className="coin-copy">
                <strong>{readerCoins}</strong>
                <small>Reader Coins</small>
              </span>
            </button>
            <button
              aria-label="Notifications"
              className="icon-button header-icon-button"
              onClick={() => setAnnouncement("You’re all caught up. No new notifications.")}
              type="button"
            >
              <Icon name="bell" size={19} />
            </button>
            <button
              aria-label="Open account menu"
              className="avatar-button"
              onClick={() => setAnnouncement("Signed in as Ada Dede.")}
              type="button"
            >
              AD
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section aria-labelledby="featured-title" className="hero" id="discover">
          <div aria-hidden="true" className="hero-wash" />
          <div className="hero-content">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span /> {featured.eyebrow}
              </p>
              <h1 id="featured-title">{featured.title}</h1>
              <p className="hero-description">{featured.description}</p>
              <p className="hero-byline">
                By <strong>{featured.creator}</strong>
                <span aria-hidden="true">·</span>
                Performed by {featured.cast}
              </p>
              <div className="hero-meta" aria-label="Book details">
                <span>{featured.duration}</span>
                <span>Complete book</span>
                <span>English · GA</span>
                <span className="provenance-chip">
                  <Icon name="sparkles" size={13} />
                  {featured.provenance}
                </span>
              </div>
              <div className="hero-actions">
                <button
                  className="hero-play-button"
                  onClick={() => handlePlay(featured)}
                  type="button"
                >
                  <span className="hero-play-icon">
                    <Icon
                      name={activeBook.id === featured.id && playing ? "pause" : "play"}
                      size={21}
                    />
                  </span>
                  {activeBook.id === featured.id && playing
                    ? "Pause preview"
                    : "Listen to preview"}
                </button>
                {featuredUnlocked ? (
                  <button
                    className="unlock-button is-unlocked"
                    onClick={() => handlePlay(featured)}
                    type="button"
                  >
                    <Icon name="check" size={18} />
                    In your Library · Play
                  </button>
                ) : (
                  <button
                    className="unlock-button"
                    onClick={() => setUnlockOpen(true)}
                    type="button"
                  >
                    <Icon name="coin" size={18} />
                    Unlock for {featured.price} Reader Coins
                  </button>
                )}
                <button
                  aria-label={`${savedIds.has(featured.id) ? "Remove" : "Save"} ${
                    featured.title
                  } ${savedIds.has(featured.id) ? "from" : "to"} Saved`}
                  aria-pressed={savedIds.has(featured.id)}
                  className={`hero-save-button${
                    savedIds.has(featured.id) ? " is-saved" : ""
                  }`}
                  onClick={() => handleSave(featured)}
                  type="button"
                >
                  <Icon
                    name={savedIds.has(featured.id) ? "check" : "bookmark"}
                    size={19}
                  />
                  <span>{savedIds.has(featured.id) ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>

            <div className="hero-art">
              <div aria-hidden="true" className="hero-orbit hero-orbit-one" />
              <div aria-hidden="true" className="hero-orbit hero-orbit-two" />
              <div className="hero-cover-wrap">
                <Cover title={featured.title} tone={featured.cover} />
                <span aria-hidden="true" className="book-pages" />
              </div>
              <div className="hero-review">
                <span className="review-stars" aria-label="Rated 4.8 out of 5">
                  ★★★★★
                </span>
                <blockquote>
                  “A luminous ensemble performance—made for listening after dark.”
                </blockquote>
                <cite>Editors’ listening room</cite>
              </div>
            </div>
          </div>
        </section>

        <div className="content-shell">
          <section
            aria-labelledby="continue-title"
            className="content-section continue-section"
            id="continue-listening"
          >
            <SectionHeading
              action={
                <a className="text-link" href="#continue-listening">
                  Open Library <Icon name="arrow" size={17} />
                </a>
              }
              eyebrow="Your library"
              id="continue-title"
              title="Continue listening"
            />
            <div className="continue-grid">
              {continueItems.map((book) => (
                <ContinueCard
                  book={book}
                  isActive={activeBook.id === book.id}
                  isPlaying={playing}
                  key={book.id}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </section>

          <section
            aria-labelledby="browse-title"
            className="content-section browse-section"
            id="browse"
          >
            <SectionHeading
              copy="Human stories, full-cast worlds, and new voices—selected for the way they sound."
              eyebrow="Curated discovery"
              id="browse-title"
              title="Find your next world"
            />
            <div aria-label="Filter stories by category" className="category-row">
              {categories.map((item) => (
                <button
                  aria-pressed={category === item}
                  className={category === item ? "is-active" : ""}
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setQuery("");
                    setAnnouncement(
                      item === "All"
                        ? "Showing all categories."
                        : `Showing ${item} stories.`,
                    );
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {normalizedQuery ? (
            <section aria-labelledby="search-results-title" className="content-section">
              <SectionHeading
                eyebrow="Search"
                id="search-results-title"
                title={`${searchResults.length} ${
                  searchResults.length === 1 ? "result" : "results"
                } for “${query.trim()}”`}
              />
              {searchResults.length ? (
                <div className="book-grid search-grid">
                  {searchResults.map((book) => (
                    <BookCard key={book.id} {...cardProps(book)} />
                  ))}
                </div>
              ) : (
                <div className="empty-search">
                  <span className="empty-search-icon">
                    <Icon name="search" size={28} />
                  </span>
                  <h3>No stories found</h3>
                  <p>
                    Try a title, creator, cast member, or a broader category.
                    Your search is still here to edit.
                  </p>
                  <button className="secondary-button" onClick={() => setQuery("")} type="button">
                    Clear search
                  </button>
                </div>
              )}
            </section>
          ) : (
            <>
              <section aria-labelledby="trending-title" className="content-section">
                <SectionHeading
                  action={
                    <span className="results-count">
                      {filteredTrending.length} selected
                    </span>
                  }
                  eyebrow="What listeners love"
                  id="trending-title"
                  title={category === "All" ? "Trending now" : `Trending in ${category}`}
                />
                {filteredTrending.length ? (
                  <div className="book-grid">
                    {filteredTrending.map((book) => (
                      <BookCard key={book.id} {...cardProps(book)} />
                    ))}
                  </div>
                ) : (
                  <div className="inline-empty">
                    <p>No {category} titles are trending in this collection yet.</p>
                    <button onClick={() => setCategory("All")} type="button">
                      Show every category
                    </button>
                  </div>
                )}
              </section>

              <section
                aria-labelledby="new-serials-title"
                className="content-section serials-section"
                id="new-serials"
              >
                <SectionHeading
                  copy="Follow a story while it unfolds. Every new episode is reviewed before release."
                  eyebrow="Fresh episodes"
                  id="new-serials-title"
                  title="New & returning serials"
                />
                {filteredSerials.length ? (
                  <div className="serial-grid">
                    {filteredSerials.map((book) => (
                      <SerialCard key={book.id} {...cardProps(book)} />
                    ))}
                  </div>
                ) : (
                  <div className="inline-empty">
                    <p>No {category} serials are in this week’s selection.</p>
                    <button onClick={() => setCategory("All")} type="button">
                      Show all serials
                    </button>
                  </div>
                )}
              </section>
            </>
          )}

          <section aria-label="Your AudiLink Books library" className="library-banner">
            <div className="library-banner-icon">
              <Icon name="library" size={28} />
            </div>
            <div>
              <p className="section-eyebrow">Always yours to return to</p>
              <h2>Your stories, one place, every device.</h2>
              <p>
                Keep progress, bookmarks, and protected offline listening together
                across your AudiLink Books library.
              </p>
            </div>
            <a className="library-link" href="#continue-listening">
              View my Library
              <span>{savedIds.size + 5} titles</span>
              <Icon name="arrow" size={19} />
            </a>
          </section>
        </div>
      </main>

      <footer className="books-footer">
        <div>
          <BrandMark />
          <span>AudiLink Books</span>
        </div>
        <p>Stories deserve to be heard.</p>
        <nav aria-label="Footer navigation">
          <a href="#discover">About</a>
          <a href="#discover">Accessibility</a>
          <a href="#discover">Creator terms</a>
        </nav>
      </footer>

      <PersistentPlayer
        book={activeBook}
        onProgress={setPlayerProgress}
        onSeek={handlePlayerSeek}
        onSpeed={cycleSpeed}
        onToggle={() => {
          setPlaying((current) => !current);
          setAnnouncement(`${playing ? "Paused" : "Playing"} ${activeBook.title}.`);
        }}
        playing={playing}
        progress={playerProgress}
        speed={speed}
      />

      <nav aria-label="Mobile navigation" className="mobile-nav">
        <a aria-current="page" href="#discover">
          <Icon name="home" size={20} />
          <span>Discover</span>
        </a>
        <a href="#browse">
          <Icon name="compass" size={20} />
          <span>Browse</span>
        </a>
        <a href="#continue-listening">
          <Icon name="library" size={20} />
          <span>Library</span>
        </a>
        <a href="#new-serials">
          <Icon name="download" size={20} />
          <span>Downloads</span>
        </a>
        <button
          onClick={() => setAnnouncement("More includes Saved, Following, Creators, Wallet, and Settings.")}
          type="button"
        >
          <Icon name="more" size={20} />
          <span>More</span>
        </button>
      </nav>

      <UnlockDialog
        balance={readerCoins}
        book={featured}
        onClose={() => setUnlockOpen(false)}
        onConfirm={handleUnlock}
        open={unlockOpen}
      />

      <div aria-atomic="true" aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
