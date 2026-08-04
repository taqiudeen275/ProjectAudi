"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import Ripple from "../components/canvasui/Ripple";

const voices = [
  {
    id: "mara",
    name: "Mara",
    role: "Narrator",
    line: "The orchard remembered every season, even the ones we tried to forget.",
    bars: [18, 31, 44, 27, 52, 37, 21, 46, 58, 33, 48, 26, 55, 40, 23, 49, 61, 34, 45, 28, 51, 38, 19, 43],
  },
  {
    id: "elias",
    name: "Elias",
    role: "Character",
    line: "If the gate opens tonight, promise me you will not follow the light.",
    bars: [26, 43, 29, 54, 36, 47, 22, 59, 41, 31, 52, 24, 45, 63, 32, 50, 27, 56, 39, 21, 48, 34, 57, 28],
  },
  {
    id: "room",
    name: "Glasshouse",
    role: "Ambience",
    line: "Rain on glass · distant leaves · a low wooden room tone",
    bars: [12, 24, 18, 35, 29, 16, 31, 22, 38, 27, 14, 33, 20, 41, 25, 17, 36, 23, 30, 19, 39, 26, 15, 32],
  },
] as const;

const capabilities = [
  {
    number: "01",
    title: "Shape the story",
    copy: "Bring a manuscript or begin with a blank page. Detect scenes and speakers, then keep, change, or ignore every suggestion.",
    detail: "Script · cast · chapters",
  },
  {
    number: "02",
    title: "Direct the performance",
    copy: "Cast distinct voices, compare expressive takes, and regenerate a single line without disturbing the choices around it.",
    detail: "Voices · takes · pronunciation",
  },
  {
    number: "03",
    title: "Finish with control",
    copy: "Place effects, balance the timeline, master long-form audio, and prepare clean releases for listening everywhere.",
    detail: "Timeline · mastering · export",
  },
] as const;

function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M5 12h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlayIcon({ playing }: { playing: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
      {playing ? (
        <path d="M9 7v10M15 7v10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      ) : (
        <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
      )}
    </svg>
  );
}

function AudioStudy() {
  const [selected, setSelected] = useState<(typeof voices)[number]["id"]>("mara");
  const [playing, setPlaying] = useState(false);
  const voice = voices.find((item) => item.id === selected) ?? voices[0];
  const shouldReduceMotion = useReducedMotion();

  const study = (
    <div className="audio-study">
      <div className="audio-study-topline">
        <span>Scene 07</span>
        <span>Interactive preview</span>
      </div>

      <div className="audio-study-copy">
        <p>{voice.role}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={voice.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            “{voice.line}”
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="audio-transport">
        <motion.button
          type="button"
          className="study-play"
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.94 }}
          onClick={() => setPlaying((current) => !current)}
          aria-label={`${playing ? "Pause" : "Play"} ${voice.name} preview`}
          aria-pressed={playing}
        >
          <PlayIcon playing={playing} />
        </motion.button>
        <div className={`study-wave${playing ? " is-playing" : ""}`} aria-hidden="true">
          {voice.bars.map((height, index) => (
            <motion.i
              key={`${voice.id}-${index}`}
              animate={{
                height: playing ? height : Math.max(8, Math.round(height * 0.42)),
                opacity: playing ? (index < 14 ? 1 : 0.46) : 0.4,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.32,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.008, 0.12),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
        <span className="study-time">00:18</span>
      </div>

      <div className="voice-switcher" aria-label="Preview layer">
        {voices.map((item) => (
          <button
            type="button"
            className={item.id === selected ? "is-selected" : ""}
            key={item.id}
            aria-pressed={item.id === selected}
            onClick={() => {
              setSelected(item.id);
              setPlaying(false);
            }}
          >
            <span>{item.name}</span>
            <small>{item.role}</small>
          </button>
        ))}
      </div>

      <p className="study-note" aria-live="polite">
        {playing ? `${voice.name} preview selected. Visual playback only.` : "Choose a layer, then preview the direction."}
      </p>
    </div>
  );

  return (
    <Ripple
      className="ripple-study"
      amplitude={0.14}
      decay={1.7}
      dispersion={0.03}
      interval={0}
      refraction={9}
      rings={2}
      shine={0.18}
      speed={0.52}
      trigger="click"
      wavelength={150}
    >
      {study}
    </Ripple>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.24 },
    transition: { duration: shouldReduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="landing-shell">
      <a className="skip-link" href="#landing-content">
        Skip to content
      </a>

      <motion.header
        className="landing-header"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link className="landing-brand" href="/" aria-label="AudiLink Studio home">
          <SignalMark />
          <span>AudiLink</span>
          <small>Studio</small>
        </Link>

        <nav className="landing-nav" aria-label="Public navigation">
          <a href="#workflow">Workflow</a>
          <a href="#principles">Why AudiLink</a>
          <Link href="/studio">Studio preview</Link>
        </nav>

        <Link className="landing-open-link" href="/studio">
          Open Studio <Arrow size={16} />
        </Link>

        <button
          className="landing-menu-button"
          type="button"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="landing-mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              id="landing-mobile-menu"
              className="landing-mobile-menu"
              aria-label="Mobile public navigation"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setMenuOpen(false);
              }}
            >
              <a href="#workflow" onClick={() => setMenuOpen(false)} autoFocus>
                Workflow
              </a>
              <a href="#principles" onClick={() => setMenuOpen(false)}>
                Why AudiLink
              </a>
              <Link href="/studio" onClick={() => setMenuOpen(false)}>
                Open Studio <Arrow size={16} />
              </Link>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <main id="landing-content">
        <section className="landing-hero" aria-labelledby="landing-title">
          <motion.div
            className="landing-hero-copy"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="landing-eyebrow">The audio studio for stories</p>
            <h1 id="landing-title">
              Direct every voice.
              <span>Keep every choice.</span>
            </h1>
            <p className="landing-lead">
              AudiLink brings script, cast, sound, and mastering into one calm workspace—so AI can accelerate the work without taking over the direction.
            </p>
            <div className="landing-actions">
              <motion.div whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}>
                <Link className="landing-primary" href="/studio">
                  Open Studio <Arrow />
                </Link>
              </motion.div>
              <a className="landing-secondary" href="#workflow">
                See the workflow
              </a>
            </div>
            <p className="landing-assurance">Foundation preview · English generation candidate · no chargeable actions</p>
          </motion.div>

          <motion.div
            className="landing-visual"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.75, delay: shouldReduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <AudioStudy />
          </motion.div>
        </section>

        <motion.section className="landing-statement" {...reveal}>
          <p>One continuous creative path</p>
          <h2>From the first line to the final listen.</h2>
          <span>No black-box production. Suggestions stay visible, editable, and reversible.</span>
        </motion.section>

        <section className="capability-section" id="workflow" aria-labelledby="workflow-title">
          <motion.div className="capability-heading" {...reveal}>
            <p className="landing-eyebrow">A quieter workflow</p>
            <h2 id="workflow-title">Complex production, revealed only when you need it.</h2>
          </motion.div>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <motion.article
                key={capability.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.52, delay: shouldReduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="capability-number">{capability.number}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.copy}</p>
                </div>
                <small>{capability.detail}</small>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section className="principle-section" id="principles" {...reveal}>
          <div>
            <p className="landing-eyebrow">Built around authorship</p>
            <h2>AI proposes. You direct.</h2>
          </div>
          <div className="principle-copy">
            <p>
              Keep a take, lock a line, change a cast, or work entirely by hand. AudiLink is designed to preserve intent across every revision.
            </p>
            <dl>
              <div>
                <dt>Reversible</dt>
                <dd>Every assisted change remains reviewable.</dd>
              </div>
              <div>
                <dt>Transparent</dt>
                <dd>Credit estimates appear before generation.</dd>
              </div>
              <div>
                <dt>Responsible</dt>
                <dd>Voice provenance and consent travel with the work.</dd>
              </div>
            </dl>
          </div>
        </motion.section>

        <motion.section className="landing-cta" {...reveal}>
          <div>
            <p className="landing-eyebrow">Begin with one scene</p>
            <h2>Make the first listen feel intentional.</h2>
          </div>
          <Link className="landing-primary" href="/studio">
            Enter the Studio <Arrow />
          </Link>
        </motion.section>
      </main>

      <footer className="landing-footer">
        <Link className="landing-brand" href="/">
          <SignalMark />
          <span>AudiLink</span>
          <small>Studio</small>
        </Link>
        <p>Audio creation with human direction.</p>
        <span>Product foundation · 2026</span>
      </footer>
    </div>
  );
}
