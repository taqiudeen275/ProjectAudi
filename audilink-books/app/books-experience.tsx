"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Book, ContinueItem } from "./books-data";

type BooksExperienceProps = {
  featured: Book;
  continueItems: ContinueItem[];
  trending: Book[];
  serials: Book[];
};

type IconName =
  | "arrow"
  | "back15"
  | "bookmark"
  | "check"
  | "chevron"
  | "close"
  | "coin"
  | "forward15"
  | "headphones"
  | "pause"
  | "play"
  | "search"
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
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    back15: (
      <>
        <path d="M5 7.5h4V3.6" />
        <path d="M5.2 7.2a8 8 0 1 1-1 6.5" />
        <path d="M9.4 11.2v5.2M12.3 12.2c.4-.7 1.1-1 1.8-1 .9 0 1.7.5 1.7 1.4 0 1.1-.8 1.4-2.1 1.4 1.5-.1 2.4.3 2.4 1.4 0 1-.8 1.7-2 1.7-.9 0-1.6-.4-2-1" />
      </>
    ),
    bookmark: <path d="M6.5 3.5h11v17l-5.5-3.7-5.5 3.7v-17Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    coin: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.2 9.5c.6-.9 1.6-1.4 2.9-1.4 1.7 0 2.8.8 2.8 2.1 0 3.1-5.8 1.1-5.8 4.2 0 1.2 1.2 2 2.9 2 1.4 0 2.6-.5 3.2-1.5M12 6.4v11.2" />
      </>
    ),
    forward15: (
      <>
        <path d="M19 7.5h-4V3.6" />
        <path d="M18.8 7.2a8 8 0 1 0 1 6.5" />
        <path d="M8.4 11.2v5.2M11.3 12.2c.4-.7 1.1-1 1.8-1 .9 0 1.7.5 1.7 1.4 0 1.1-.8 1.4-2.1 1.4 1.5-.1 2.4.3 2.4 1.4 0 1-.8 1.7-2 1.7-.9 0-1.6-.4-2-1" />
      </>
    ),
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" />
      </>
    ),
    pause: (
      <>
        <path d="M9 6v12" />
        <path d="M15 6v12" />
      </>
    ),
    play: <path d="m9 6 9 6-9 6V6Z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4.5 4.5" />
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
        <path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11" />
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
        strokeWidth="1.75"
      >
        {paths[name]}
      </g>
    </svg>
  );
}

function BrandMark() {
  return (
    <span aria-hidden="true" className="brand-mark">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Cover({
  book,
  compact = false,
}: {
  book: Pick<Book, "cover" | "title" | "format">;
  compact?: boolean;
}) {
  return (
    <div
      aria-label={`${book.title} cover`}
      className={`book-cover cover-${book.cover}${compact ? " book-cover-compact" : ""}`}
      role="img"
    >
      <span className="cover-kicker">AudiLink original</span>
      <span className="cover-glyph" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <strong className="cover-title">{book.title}</strong>
      <span className="cover-rule">{book.format === "Serial" ? "An audio serial" : "An audio story"}</span>
    </div>
  );
}

function ProvenanceBadge({ book, compact = false }: { book: Book; compact?: boolean }) {
  const disclosure = book.provenance.disclosures.length
    ? ` Disclosures: ${book.provenance.disclosures.join(", ")}.`
    : " No AI narration disclosures.";

  return (
    <span
      aria-label={`${book.provenance.label}.${disclosure}`}
      className={`provenance-label${compact ? " provenance-label-compact" : ""}`}
      data-narration={book.provenance.narration}
      title={`${book.provenance.label}.${disclosure}`}
    >
      <span aria-hidden="true" />
      {book.provenance.label}
    </span>
  );
}

function Price({ book }: { book: Book }) {
  if (book.price === "free") {
    return <span className="story-price price-free">Free</span>;
  }

  return (
    <span className="story-price">
      <Icon name="coin" size={13} />
      {book.price}
    </span>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  copy,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  copy?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {copy ? <p className="section-copy">{copy}</p> : null}
      </div>
      {children ? <div className="section-tools">{children}</div> : null}
    </div>
  );
}

function ResumeCard({
  item,
  onPlay,
}: {
  item: ContinueItem;
  onPlay: (book: Book) => void;
}) {
  return (
    <article className="resume-card">
      <button
        aria-label={`Resume ${item.title}`}
        className="resume-cover-button"
        onClick={() => onPlay(item)}
        type="button"
      >
        <Cover book={item} compact />
        <span className="cover-play"><Icon name="play" size={17} /></span>
      </button>
      <div className="resume-copy">
        <p className="resume-label">Continue · {item.remaining}</p>
        <h3>{item.title}</h3>
        <p>{item.currentUnit}</p>
        <ProvenanceBadge book={item} compact />
        <div
          aria-label={`${item.progress}% complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={item.progress}
          className="resume-progress"
          role="progressbar"
        >
          <span style={{ width: `${item.progress}%` }} />
        </div>
      </div>
      <button
        aria-label={`Resume ${item.title}`}
        className="quiet-icon-button resume-action"
        onClick={() => onPlay(item)}
        type="button"
      >
        <Icon name="play" size={18} />
      </button>
    </article>
  );
}

function StoryCard({
  book,
  saved,
  onPlay,
  onSave,
  onUnlock,
}: {
  book: Book;
  saved: boolean;
  onPlay: (book: Book) => void;
  onSave: (book: Book) => void;
  onUnlock: (book: Book) => void;
}) {
  return (
    <motion.article className="story-card" layout>
      <div className="story-art">
        <Cover book={book} />
        <button
          aria-label={`Play ${book.price === "free" ? "" : "a preview of "}${book.title}`}
          className="story-play"
          onClick={() => onPlay(book)}
          type="button"
        >
          <Icon name="play" size={20} />
        </button>
        <button
          aria-label={`${saved ? "Remove" : "Save"} ${book.title}`}
          aria-pressed={saved}
          className="story-save"
          data-saved={saved}
          onClick={() => onSave(book)}
          type="button"
        >
          <Icon name={saved ? "check" : "bookmark"} size={17} />
        </button>
      </div>
      <div className="story-copy">
        <div className="story-kicker">
          <span>{book.eyebrow ?? book.category}</span>
          <span>{book.duration}</span>
        </div>
        <h3>{book.title}</h3>
        <p className="story-creator">by {book.creator}</p>
        <ProvenanceBadge book={book} compact />
        <div className="story-bottom">
          <button
            className="price-action"
            onClick={() => (book.price === "free" ? onPlay(book) : onUnlock(book))}
            type="button"
          >
            <Price book={book} />
            <span>{book.price === "free" ? "Listen" : "Unlock"}</span>
          </button>
          <button className="preview-link" onClick={() => onPlay(book)} type="button">
            {book.price === "free" ? "Play" : `${Math.floor(book.previewDurationSeconds / 60)} min preview`}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function UnlockDialog({
  book,
  balance,
  onClose,
  onPreviewCheckout,
}: {
  book: Book | null;
  balance: number;
  onClose: () => void;
  onPreviewCheckout: (book: Book) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (book && !dialog.open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!book && dialog.open) {
      dialog.close();
    }
  }, [book]);

  const dismiss = () => dialogRef.current?.close();
  const price = book && book.price !== "free" ? book.price : 0;
  const canAfford = price <= balance;
  const shortfall = Math.max(0, price - balance);

  return (
    <dialog
      aria-labelledby="unlock-title"
      className="unlock-dialog"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
      onClose={() => {
        onClose();
        window.requestAnimationFrame(() => previousFocusRef.current?.focus());
      }}
      ref={dialogRef}
    >
      {book ? (
        <div className="dialog-content">
          <button autoFocus aria-label="Close unlock preview" className="dialog-close" onClick={dismiss} type="button">
            <Icon name="close" size={19} />
          </button>
          <p className="eyebrow">Interaction preview</p>
          <h2 id="unlock-title">Preview the Reader Coin flow</h2>
          <p className="dialog-description">
            See how a permanent unlock will work without charging coins or creating an entitlement.
          </p>
          <div className="dialog-book">
            <Cover book={book} compact />
            <div>
              <strong>{book.title}</strong>
              <span>Complete {book.format.toLowerCase()} · permanent production unlock</span>
              <ProvenanceBadge book={book} compact />
            </div>
          </div>
          <dl className="coin-summary">
            <div><dt>Your balance</dt><dd>{balance} coins</dd></div>
            <div><dt>Illustrative price</dt><dd>{price} coins</dd></div>
            <div className={canAfford ? "coin-result" : "coin-shortfall"}>
              <dt>{canAfford ? "Balance after a real purchase" : "Shortfall"}</dt>
              <dd>{canAfford ? Math.max(0, balance - price) : shortfall} coins</dd>
            </div>
          </dl>
          <p className="dialog-safety">
            Production checkout must settle the Reader Coin ledger on the server before issuing a permanent entitlement. This preview does neither.
          </p>
          <div className="dialog-actions">
            <button className="text-button" onClick={dismiss} type="button">Not now</button>
            <button
              className="primary-button"
              disabled={!canAfford}
              onClick={() => {
                onPreviewCheckout(book);
                dismiss();
              }}
              type="button"
            >
              {canAfford ? "Preview purchase flow" : `Need ${shortfall} more coins`}
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

function durationToSeconds(duration: string) {
  const hours = Number(duration.match(/(\d+)h/)?.[1] ?? 0);
  const minutes = Number(duration.match(/(\d+)m/)?.[1] ?? 0);
  return Math.max(60, hours * 3600 + minutes * 60);
}

function formatClock(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const remainingSeconds = safeSeconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`
    : `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function PersistentPlayer({
  book,
  isPlaying,
  isPreview,
  muted,
  progress,
  speed,
  total,
  onPlayPause,
  onSeek,
  onSkip,
  onSpeed,
  onToggleMute,
}: {
  book: Book;
  isPlaying: boolean;
  isPreview: boolean;
  muted: boolean;
  progress: number;
  speed: number;
  total: number;
  onPlayPause: () => void;
  onSeek: (value: number) => void;
  onSkip: (seconds: number) => void;
  onSpeed: () => void;
  onToggleMute: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      aria-label="Audio player"
      className="persistent-player"
      exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="player-inner">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="player-story"
            exit={{ opacity: 0, y: -5 }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }}
            key={book.id}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <Cover book={book} compact />
            <div>
              <span className="player-mode">{isPreview ? "Timed preview" : "In your library"}</span>
              <strong>{book.title}</strong>
              <span>{book.provenance.label}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="player-transport">
          <div className="player-buttons">
            <button aria-label="Back 15 seconds" onClick={() => onSkip(-15)} type="button"><Icon name="back15" size={21} /></button>
            <button aria-label={isPlaying ? "Pause" : "Play"} className="player-play" onClick={onPlayPause} type="button">
              <Icon name={isPlaying ? "pause" : "play"} size={21} />
            </button>
            <button aria-label="Forward 15 seconds" onClick={() => onSkip(15)} type="button"><Icon name="forward15" size={21} /></button>
          </div>
          <div className="player-scrub">
            <span>{formatClock(progress)}</span>
            <input
              aria-label={isPreview ? "Preview position" : "Playback position"}
              aria-valuetext={`${formatClock(progress)} of ${formatClock(total)}`}
              max={Math.max(1, total)}
              min={0}
              onChange={(event) => onSeek(Number(event.target.value))}
              step={1}
              type="range"
              value={Math.min(progress, total)}
            />
            <span>{formatClock(total)}</span>
          </div>
        </div>

        <div className="player-extras">
          {isPreview ? <span className="preview-lock">Preview limit</span> : null}
          <button aria-label={`Playback speed ${speed} times`} onClick={onSpeed} type="button">{speed}×</button>
          <button aria-label={muted ? "Unmute" : "Mute"} aria-pressed={muted} onClick={onToggleMute} type="button">
            <Icon name="volume" size={19} />
            {muted ? <span className="muted-slash" /> : null}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

export default function BooksExperience({
  featured,
  continueItems,
  trending,
  serials,
}: BooksExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const searchRef = useRef<HTMLInputElement>(null);
  const readerCoinBalance = 42;
  const initialBook = continueItems[0] ?? featured;
  const initialDuration = durationToSeconds(initialBook.duration);
  const initialResumeItem = continueItems.find((item) => item.id === initialBook.id);
  const initialProgress = initialResumeItem
    ? initialDuration * (initialResumeItem.progress / 100)
    : 0;

  const [activeBook, setActiveBook] = useState<Book>(initialBook);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [serialIndex, setSerialIndex] = useState(0);
  const [unlockBook, setUnlockBook] = useState<Book | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const hasEntitlement = (book: Book) =>
    book.price === "free" || continueItems.some((item) => item.id === book.id);
  const fullDuration = durationToSeconds(activeBook.duration);
  const isPreview = !hasEntitlement(activeBook);
  const playbackLimit = isPreview
    ? Math.min(activeBook.previewDurationSeconds, fullDuration)
    : fullDuration;

  const allDiscoverable = useMemo(() => {
    const byId = new Map<string, Book>();
    [...trending, ...serials].forEach((book) => byId.set(book.id, book));
    return [...byId.values()];
  }, [serials, trending]);

  const filteredStories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return allDiscoverable.filter((book) => {
      const categoryMatch = category === "All" || book.category === category;
      const searchMatch = !normalized || [book.title, book.creator, book.category, book.description]
        .some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && searchMatch;
    });
  }, [allDiscoverable, category, query]);

  const isFiltering = query.trim().length > 0 || category !== "All";
  const curatedStories = isFiltering
    ? filteredStories
    : trending.slice(0, showAll ? trending.length : 4);
  const activeSerial = serials.length > 0
    ? serials[Math.min(serialIndex, serials.length - 1)]
    : null;

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = current + speed;
        if (next >= playbackLimit) {
          setIsPlaying(false);
          setAnnouncement(
            isPreview
              ? `The timed preview of ${activeBook.title} has ended. Unlocking is only available through the no-charge interaction preview.`
              : `You reached the end of ${activeBook.title}.`,
          );
          return playbackLimit;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [activeBook.title, isPlaying, isPreview, playbackLimit, speed]);

  const playBook = (book: Book) => {
    const nextFullDuration = durationToSeconds(book.duration);
    const nextIsPreview = !hasEntitlement(book);
    const nextLimit = nextIsPreview
      ? Math.min(book.previewDurationSeconds, nextFullDuration)
      : nextFullDuration;
    if (book.id !== activeBook.id) {
      const resumeItem = continueItems.find((item) => item.id === book.id);
      setActiveBook(book);
      setProgress(resumeItem ? nextFullDuration * (resumeItem.progress / 100) : 0);
    } else if (progress >= nextLimit) {
      setProgress(0);
    }
    setPlayerVisible(true);
    setIsPlaying(true);
    setAnnouncement(
      nextIsPreview
        ? `Playing a hard-limited ${Math.floor(nextLimit / 60)} minute preview of ${book.title}.`
        : `Playing ${book.title}.`,
    );
  };

  const toggleSave = (book: Book) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(book.id)) next.delete(book.id);
      else next.add(book.id);
      setAnnouncement(`${book.title} ${next.has(book.id) ? "saved" : "removed from saved stories"}.`);
      return next;
    });
  };

  const requestUnlock = (book: Book) => {
    if (book.price === "free") {
      playBook(book);
      setAnnouncement(`${book.title} is free to listen to. No Reader Coins are needed.`);
      return;
    }
    setUnlockBook(book);
  };

  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: "easeOut" as const };

  return (
    <MotionConfig reducedMotion="user">
      <div className="books-app" id="top">
        <a className="skip-link" href="#main-content">Skip to stories</a>
        <p aria-live="polite" className="sr-only">{announcement}</p>

        <header className="books-header">
          <div className="header-inner">
            <a aria-label="AudiLink Books home" className="brand" href="#top">
              <BrandMark />
              <span><strong>AudiLink</strong><small>Books</small></span>
            </a>
            <nav aria-label="Primary navigation" className="desktop-nav">
              <a aria-current="page" href="#discover">Discover</a>
              <a href="#continue">Library</a>
              <a href="#serials">Serials</a>
            </nav>
            <div className="header-actions">
              <button
                aria-expanded={searchOpen}
                aria-label={searchOpen ? "Close search" : "Search stories"}
                className="header-icon"
                onClick={() => setSearchOpen((current) => !current)}
                type="button"
              >
                <Icon name={searchOpen ? "close" : "search"} size={19} />
              </button>
              <button
                aria-label={`${readerCoinBalance} Reader Coins. Transaction history is planned.`}
                className="coin-balance"
                onClick={() => setAnnouncement("Reader Coin history is planned for the account milestone.")}
                type="button"
              >
                <Icon name="coin" size={16} />
                <strong>{readerCoinBalance}</strong>
                <span>Reader Coins</span>
              </button>
              <button aria-label="Account controls, planned" className="header-icon account-button" disabled title="Account controls are planned" type="button">
                <Icon name="user" size={18} />
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {searchOpen ? (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                className="header-search-panel"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={revealTransition}
              >
                <label htmlFor="story-search"><Icon name="search" size={18} /><span className="sr-only">Search stories</span></label>
                <input
                  id="story-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title, creator, or feeling…"
                  ref={searchRef}
                  type="search"
                  value={query}
                />
                {query ? <button onClick={() => setQuery("")} type="button">Clear</button> : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </header>

        <main id="main-content">
          <section aria-labelledby="featured-title" className="hero" id="discover">
            <div aria-hidden="true" className="hero-glow" />
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="hero-copy"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              transition={revealTransition}
            >
              <p className="hero-eyebrow"><span />{featured.eyebrow}</p>
              <h1 id="featured-title">{featured.title}</h1>
              <p className="hero-description">{featured.description}</p>
              <p className="hero-byline">Written by <strong>{featured.creator}</strong> · Performed by {featured.cast}</p>
              <div className="hero-meta">
                <span>{featured.category}</span><span>{featured.duration}</span><span>Full cast</span>
              </div>
              <ProvenanceBadge book={featured} />
              <div className="hero-actions">
                <button className="primary-button" onClick={() => playBook(featured)} type="button">
                  <Icon name="play" size={18} />Preview story
                </button>
                <button className="soft-button" onClick={() => requestUnlock(featured)} type="button">
                  {featured.price === "free" ? "Listen free" : <>Unlock · <Icon name="coin" size={14} /> {featured.price}</>}
                </button>
                <button
                  aria-label={`${saved.has(featured.id) ? "Remove" : "Save"} ${featured.title}`}
                  aria-pressed={saved.has(featured.id)}
                  className="save-text-button"
                  onClick={() => toggleSave(featured)}
                  type="button"
                >
                  <Icon name={saved.has(featured.id) ? "check" : "bookmark"} size={17} />
                  {saved.has(featured.id) ? "Saved" : "Save"}
                </button>
              </div>
            </motion.div>
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="hero-art"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.08 }}
            >
              <div className="hero-cover-shadow" />
              <Cover book={featured} />
              <p><span>Listeners say</span>“A world you can hear breathing.”</p>
            </motion.div>
          </section>

          <div className="content-shell">
            <section aria-labelledby="continue-title" className="content-section resume-section" id="continue">
              <SectionHeading id="continue-title" eyebrow="Your library" title="Pick up where you left off" />
              {continueItems.length > 0 ? (
                <div className="resume-row">
                  {continueItems.slice(0, 2).map((item) => <ResumeCard item={item} key={item.id} onPlay={playBook} />)}
                </div>
              ) : (
                <p className="empty-library">Your listening history will appear here after you start a free title or unlock a story.</p>
              )}
            </section>

            <section aria-labelledby="curated-title" className="content-section curated-section">
              <SectionHeading
                copy="A small weekly edit—chosen for voice, atmosphere, and the stories that stay after the final line."
                eyebrow={isFiltering ? "Discover" : "The weekly edit"}
                id="curated-title"
                title={isFiltering ? `${filteredStories.length} matching ${filteredStories.length === 1 ? "story" : "stories"}` : "Listen to something remarkable"}
              >
                <button
                  aria-expanded={filtersOpen}
                  className="tool-button"
                  onClick={() => setFiltersOpen((current) => !current)}
                  type="button"
                >
                  Genres <Icon name="chevron" size={16} />
                </button>
                <button className="tool-button" onClick={() => setSearchOpen(true)} type="button"><Icon name="search" size={16} /> Search</button>
              </SectionHeading>

              <AnimatePresence initial={false}>
                {filtersOpen ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="category-row"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={revealTransition}
                  >
                    {categories.map((item) => (
                      <button
                        aria-pressed={category === item}
                        className={category === item ? "is-active" : ""}
                        key={item}
                        onClick={() => setCategory(item)}
                        type="button"
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {curatedStories.length > 0 ? (
                <motion.div className="story-grid" layout>
                  <AnimatePresence initial={false}>
                    {curatedStories.map((book) => (
                      <StoryCard
                        book={book}
                        key={book.id}
                        onPlay={playBook}
                        onSave={toggleSave}
                        onUnlock={requestUnlock}
                        saved={saved.has(book.id)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="empty-results"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  transition={revealTransition}
                >
                  <p className="eyebrow">No match this time</p>
                  <h3>Try a wider shelf.</h3>
                  <p>Clear the search or choose another genre.</p>
                  <button className="text-button" onClick={() => { setQuery(""); setCategory("All"); }} type="button">Reset discovery</button>
                </motion.div>
              )}

              {!isFiltering && trending.length > 4 ? (
                <button aria-expanded={showAll} className="reveal-button" onClick={() => setShowAll((current) => !current)} type="button">
                  {showAll ? "Show the shorter edit" : `Reveal ${trending.length - 4} more`}
                  <Icon name="arrow" size={16} />
                </button>
              ) : null}
            </section>

            {activeSerial ? (
              <section aria-labelledby="serial-title" className="content-section serial-section" id="serials">
                <SectionHeading eyebrow="Made for episodic listening" title="A serial to follow" />
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    animate={{ opacity: 1, x: 0 }}
                    className="serial-spotlight"
                    exit={{ opacity: 0, x: -14 }}
                    initial={{ opacity: 0, x: 14 }}
                    key={activeSerial.id}
                    transition={revealTransition}
                  >
                    <div className="serial-art"><Cover book={activeSerial} /></div>
                    <div className="serial-copy">
                      <p className="eyebrow">{activeSerial.eyebrow}</p>
                      <h3 id="serial-title">{activeSerial.title}</h3>
                      <p className="serial-episode">{activeSerial.episode} · {activeSerial.duration}</p>
                      <p className="serial-description">{activeSerial.description}</p>
                      <p className="serial-byline">Created by {activeSerial.creator} · {activeSerial.cast}</p>
                      <ProvenanceBadge book={activeSerial} />
                      <div className="serial-actions">
                        <button className="primary-button" onClick={() => playBook(activeSerial)} type="button"><Icon name="play" size={17} />Listen now</button>
                        <button className="soft-button" onClick={() => requestUnlock(activeSerial)} type="button">
                          {activeSerial.price === "free" ? "Free episode" : <><Icon name="coin" size={14} /> {activeSerial.price} coins</>}
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
                {serials.length > 1 ? (
                  <div aria-label="Choose a serial" className="serial-switcher" role="group">
                    {serials.map((serial, index) => (
                      <button
                        aria-label={`Show ${serial.title}`}
                        aria-pressed={serialIndex === index}
                        key={serial.id}
                        onClick={() => setSerialIndex(index)}
                        type="button"
                      ><span />{String(index + 1).padStart(2, "0")} · {serial.title}</button>
                    ))}
                  </div>
                ) : null}
              </section>
            ) : null}

            <section aria-labelledby="library-note-title" className="library-note">
              <div>
                <p className="eyebrow">Your listening, kept simple</p>
                <h2 id="library-note-title">Stories stay unlocked once purchased.</h2>
              </div>
              <p>Paid audio streams securely in AudiLink. App-managed offline listening is part of the product roadmap; raw paid files are never exposed.</p>
            </section>
          </div>
        </main>

        <footer className="books-footer">
          <div className="footer-brand"><BrandMark /><span><strong>AudiLink Books</strong><small>Stories deserve to be heard.</small></span></div>
          <p>Independent stories, thoughtfully performed.</p>
          <div aria-label="Planned destinations" className="footer-planned">
            {['About', 'Creator program', 'Help'].map((label) => <button disabled key={label} title={`${label} is planned`} type="button">{label}<span>Planned</span></button>)}
          </div>
        </footer>

        <UnlockDialog
          balance={readerCoinBalance}
          book={unlockBook}
          onClose={() => setUnlockBook(null)}
          onPreviewCheckout={(book) => setAnnouncement(`Purchase flow previewed for ${book.title}. No Reader Coins were charged and no entitlement was created.`)}
        />

        <AnimatePresence initial={false}>
          {playerVisible ? (
            <PersistentPlayer
              book={activeBook}
              isPlaying={isPlaying}
              isPreview={isPreview}
              muted={muted}
              onPlayPause={() => {
                if (progress >= playbackLimit) setProgress(0);
                setIsPlaying((current) => !current);
              }}
              onSeek={(value) => setProgress(Math.min(Math.max(0, value), playbackLimit))}
              onSkip={(seconds) => setProgress((current) => Math.min(playbackLimit, Math.max(0, current + seconds)))}
              onSpeed={() => setSpeed((current) => current === 1 ? 1.25 : current === 1.25 ? 1.5 : 1)}
              onToggleMute={() => setMuted((current) => !current)}
              progress={progress}
              speed={speed}
              total={playbackLimit}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
