"use client";

import { useMemo, useState, type KeyboardEvent } from "react";

import {
  ROLE_PERMISSIONS,
  type AdminRole,
  type ModelFamily,
} from "@audilink/contracts";
import { operationalTone, type MetricDatum } from "@audilink/ui";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";

type NavId =
  | "overview"
  | "review"
  | "generation"
  | "models"
  | "finance"
  | "catalog"
  | "people"
  | "audit";

type QueueFilter = "all" | "urgent" | "trust" | "models" | "finance";
type DetailTab = "models" | "ledgers" | "audit";

type IconName =
  | "grid"
  | "shield"
  | "pulse"
  | "wave"
  | "ledger"
  | "book"
  | "people"
  | "history"
  | "arrow"
  | "check"
  | "clock"
  | "lock";

interface RoleOption {
  readonly id: AdminRole;
  readonly label: string;
  readonly detail: string;
}

interface NavItem {
  readonly id: NavId;
  readonly label: string;
  readonly icon: IconName;
  readonly roles: readonly AdminRole[];
  readonly enabled: boolean;
}

interface QueueItem {
  readonly id: string;
  readonly category: Exclude<QueueFilter, "all" | "urgent">;
  readonly ownerRole: Exclude<AdminRole, "administrator">;
  readonly title: string;
  readonly detail: string;
  readonly signal: string;
  readonly age: string;
  readonly priority: "urgent" | "high" | "normal";
  readonly status: "review" | "pending" | "blocked" | "running";
}

const roleOptions: readonly RoleOption[] = [
  { id: "administrator", label: "Administrator", detail: "Platform-wide visibility" },
  { id: "moderator", label: "Trust & Safety", detail: "Reviews and consent" },
  { id: "finance", label: "Finance", detail: "Ledgers and payouts" },
  { id: "modelOperator", label: "Model operator", detail: "Inference and jobs" },
  { id: "support", label: "Support", detail: "Users and projects" },
];

const navItems: readonly NavItem[] = [
  { id: "overview", label: "Overview", icon: "grid", roles: roleOptions.map((role) => role.id), enabled: true },
  { id: "review", label: "Review queue", icon: "shield", roles: ["moderator", "administrator"], enabled: false },
  { id: "generation", label: "Generation", icon: "pulse", roles: ["modelOperator", "support", "administrator"], enabled: false },
  { id: "models", label: "Model registry", icon: "wave", roles: ["modelOperator", "administrator"], enabled: false },
  { id: "finance", label: "Finance", icon: "ledger", roles: ["finance", "administrator"], enabled: false },
  { id: "catalog", label: "Catalog", icon: "book", roles: ["moderator", "support", "administrator"], enabled: false },
  { id: "people", label: "People & access", icon: "people", roles: ["support", "administrator"], enabled: false },
  { id: "audit", label: "Audit log", icon: "history", roles: roleOptions.map((role) => role.id), enabled: false },
];

const metricsByRole: Readonly<Record<AdminRole, readonly MetricDatum[]>> = {
  administrator: [
    { label: "Availability", value: "99.94%", detail: "Control plane · 24 hours", tone: "positive", trend: "+0.03%" },
    { label: "Needs a decision", value: "18", detail: "4 approaching policy SLA", tone: "caution", trend: "−6 today" },
    { label: "Active work", value: "42", detail: "8 GPU · 34 media jobs", tone: "info", trend: "6.2m p50" },
    { label: "Ledger variance", value: "0", detail: "Across 3 separate ledgers", tone: "positive", trend: "8m ago" },
  ],
  moderator: [
    { label: "Assigned", value: "12", detail: "3 identity or consent", tone: "caution", trend: "−2 today" },
    { label: "Oldest case", value: "2h 14m", detail: "Within the 24-hour target", tone: "positive", trend: "Consent" },
    { label: "Checks passed", value: "93.1%", detail: "Automated review · 24 hours", tone: "info", trend: "+1.4%" },
    { label: "Appeals", value: "2", detail: "No overdue decisions", tone: "neutral", trend: "7-day target" },
  ],
  finance: [
    { label: "Ledger variance", value: "0", detail: "Across 3 separate ledgers", tone: "positive", trend: "8m ago" },
    { label: "Payout holds", value: "3", detail: "2 KYC · 1 consent", tone: "caution", trend: "$412.80" },
    { label: "Pending earnings", value: "$8.4k", detail: "14-day rolling hold", tone: "info", trend: "+6.8%" },
    { label: "Webhook lag", value: "1.2s", detail: "Payment providers · p95", tone: "positive", trend: "Stable" },
  ],
  modelOperator: [
    { label: "Success", value: "98.7%", detail: "Accepted generations · 24 hours", tone: "positive", trend: "+0.6%" },
    { label: "Active work", value: "42", detail: "8 GPU · 34 media jobs", tone: "info", trend: "6.2m p50" },
    { label: "GPU pressure", value: "72%", detail: "Managed primary pool", tone: "positive", trend: "Stable" },
    { label: "Restricted routes", value: "1", detail: "Fish S2-Pro license gate", tone: "caution", trend: "Launch blocker" },
  ],
  support: [
    { label: "Conversations", value: "24", detail: "6 awaiting staff reply", tone: "info", trend: "11m median" },
    { label: "Affected jobs", value: "3", detail: "User-visible failures", tone: "caution", trend: "−4 today" },
    { label: "Session health", value: "99.98%", detail: "Cross-surface auth · 24 hours", tone: "positive", trend: "Stable" },
    { label: "Storage alerts", value: "5", detail: "Accounts at 90% or more", tone: "neutral", trend: "No lockouts" },
  ],
};

const queueItems: readonly QueueItem[] = [
  {
    id: "REV-1048",
    category: "trust",
    ownerRole: "moderator",
    title: "Public voice consent mismatch",
    detail: "Voice · Calm coastal narrator",
    signal: "Identity comparison requires a human decision before this voice can be listed.",
    age: "18m",
    priority: "urgent",
    status: "review",
  },
  {
    id: "FIN-0281",
    category: "finance",
    ownerRole: "finance",
    title: "Payout held by an active consent case",
    detail: "Creator payout · GHS settlement",
    signal: "The hold is policy-linked; no ledger mutation has been made.",
    age: "41m",
    priority: "high",
    status: "blocked",
  },
  {
    id: "JOB-7624",
    category: "models",
    ownerRole: "modelOperator",
    title: "TADA 3B exceeded its latency target",
    detail: "Audiobook render · Attempt 2",
    signal: "Twelve completed segments are reusable if the job is retried.",
    age: "1h",
    priority: "high",
    status: "running",
  },
  {
    id: "REV-1044",
    category: "trust",
    ownerRole: "moderator",
    title: "Serial release needs quality review",
    detail: "Publication · 9 episodes",
    signal: "Automated checks passed 31 of 32 policy and quality rules.",
    age: "2h",
    priority: "normal",
    status: "pending",
  },
  {
    id: "FIN-0278",
    category: "finance",
    ownerRole: "finance",
    title: "Reader Coin promotion is near its cap",
    detail: "Referral campaign · Launch cohort B",
    signal: "Ninety-two percent of its funded fiat liability is allocated.",
    age: "3h",
    priority: "normal",
    status: "pending",
  },
];

const modelHealth: readonly {
  family: ModelFamily;
  name: string;
  route: string;
  health: "healthy" | "warning" | "blocked";
  metric: string;
}[] = [
  { family: "qwen3TtsBase06b", name: "Qwen3-TTS 0.6B", route: "Fast · English candidate", health: "warning", metric: "Evaluating" },
  { family: "luxTts", name: "LuxTTS", route: "Fast · English candidate", health: "warning", metric: "Evaluating" },
  { family: "tada3b", name: "TADA 3B", route: "Studio · Language candidates pending", health: "warning", metric: "Evaluating" },
  { family: "fishS2Pro", name: "Fish S2-Pro", route: "Commercial route", health: "blocked", metric: "License gate" },
];

const reconciliationRows = [
  { unit: "Studio Credits", liability: "126.4M issued", activity: "3.82M settled", variance: "0" },
  { unit: "Reader Coins", liability: "2.18M issued", activity: "94.6K redeemed", variance: "0" },
  { unit: "Fiat earnings", liability: "$48.2K liability", activity: "$8.4K pending", variance: "0" },
] as const;

const auditEvents = [
  { initials: "NM", actor: "Naa Mensah", action: "Approved publication release", target: "PUB-0284", time: "8m ago" },
  { initials: "SK", actor: "Sam K.", action: "Requested second approval", target: "FIN-0281", time: "21m ago" },
  { initials: "OP", actor: "Model operator", action: "Paused TADA 3B Studio route", target: "ROUTE-014", time: "34m ago" },
  { initials: "SY", actor: "System", action: "Completed ledger reconciliation", target: "REC-8840", time: "42m ago" },
] as const;

const filterLabels: Readonly<Record<QueueFilter, string>> = {
  all: "All",
  urgent: "Urgent",
  trust: "Trust & safety",
  models: "Models",
  finance: "Finance",
};

const detailLabels: Readonly<Record<DetailTab, string>> = {
  models: "Model routes",
  ledgers: "Ledgers",
  audit: "Audit trail",
};

function Icon({ name }: { readonly name: IconName }) {
  const paths: Readonly<Record<IconName, React.ReactNode>> = {
    grid: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
    shield: <><path d="M12 3 20 6v5c0 5.2-3.2 8.5-8 10-4.8-1.5-8-4.8-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    pulse: <path d="M3 12h4l2.2-6 4.1 12 2.2-6H21" />,
    wave: <><path d="M5 14v-4" /><path d="M9 18V6" /><path d="M13 20V4" /><path d="M17 16V8" /><path d="M21 14v-4" /></>,
    ledger: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 15.5a4.5 4.5 0 0 1 6.5 4" /></>,
    history: <><path d="M4 5v5h5" /><path d="M5.4 16.5A8 8 0 1 0 4 10" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function Status({ status }: { readonly status: string }) {
  return (
    <span className={`status tone-${operationalTone(status)}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}

function DetailsPanel({ activeTab }: { readonly activeTab: DetailTab }) {
  if (activeTab === "models") {
    return (
      <div className="model-list">
        <div className="detail-intro">
          <div><strong>Primary pool at 72%</strong><span>11 of 16 GPU slots warm</span></div>
          <p>Every route shown here is internal or a release candidate; no unbenchmarked language is presented as GA.</p>
        </div>
        {modelHealth.map((model) => (
          <div className="model-row" key={model.family}>
            <span className={`model-mark tone-${operationalTone(model.health)}`} aria-hidden="true" />
            <span><strong>{model.name}</strong><small>{model.route}</small></span>
            <span><Status status={model.health} /><small>{model.metric}</small></span>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === "ledgers") {
    return (
      <div className="ledger-view">
        <div className="detail-intro">
          <div><strong>Balanced</strong><span>Reconciliation REC-8840 · 8m ago</span></div>
          <p>Studio Credits, Reader Coins, and fiat earnings are separate ledgers. Their units are never exchanged or combined.</p>
        </div>
        <div className="ledger-table" role="table" aria-label="Ledger reconciliation summary">
          <div className="table-head" role="row">
            <span role="columnheader">Ledger</span><span role="columnheader">Liability</span><span role="columnheader">Recent activity</span><span role="columnheader">Variance</span>
          </div>
          {reconciliationRows.map((row) => (
            <div className="table-row" role="row" key={row.unit}>
              <strong role="cell">{row.unit}</strong><span role="cell">{row.liability}</span><span role="cell">{row.activity}</span><span role="cell" className="variance"><Icon name="check" />{row.variance}</span>
            </div>
          ))}
        </div>
        <p className="invariant-note"><Icon name="lock" />Ledger entries are immutable. Corrections require a reasoned compensating transaction; high-risk adjustments require dual approval.</p>
      </div>
    );
  }

  return (
    <div className="audit-list">
      <div className="detail-intro">
        <div><strong>Immutable activity</strong><span>Most recent first</span></div>
        <p>Every privileged action captures its actor, scope, reason, and resulting record version.</p>
      </div>
      {auditEvents.map((event) => (
        <div className="audit-row" key={`${event.target}-${event.time}`}>
          <span className="audit-avatar" aria-hidden="true">{event.initials}</span>
          <span><strong>{event.action}</strong><small>{event.actor} · <b>{event.target}</b></small></span>
          <time>{event.time}</time>
        </div>
      ))}
    </div>
  );
}

export function AdminConsole() {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState<AdminRole>("administrator");
  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");
  const [selectedQueueId, setSelectedQueueId] = useState(queueItems[0]?.id ?? "");
  const [activeDetail, setActiveDetail] = useState<DetailTab>("models");

  const roleMeta = roleOptions.find((role) => role.id === activeRole) ?? roleOptions[0];
  const visibleNav = navItems.filter((item) => item.roles.includes(activeRole));
  const metrics = metricsByRole[activeRole];
  const scopedQueue = useMemo(
    () => queueItems.filter((item) => activeRole === "administrator" || item.ownerRole === activeRole),
    [activeRole],
  );
  const availableFilters = useMemo(() => {
    const filters: QueueFilter[] = ["all"];
    if (scopedQueue.some((item) => item.priority === "urgent")) filters.push("urgent");
    (["trust", "models", "finance"] as const).forEach((category) => {
      if (scopedQueue.some((item) => item.category === category)) filters.push(category);
    });
    return filters;
  }, [scopedQueue]);
  const filteredQueue = useMemo(
    () => scopedQueue.filter((item) => queueFilter === "all" || (queueFilter === "urgent" ? item.priority === "urgent" : item.category === queueFilter)),
    [queueFilter, scopedQueue],
  );
  const selectedItem = filteredQueue.find((item) => item.id === selectedQueueId) ?? filteredQueue[0];
  const availableDetails = useMemo<readonly DetailTab[]>(() => {
    if (activeRole === "administrator") return ["models", "ledgers", "audit"];
    if (activeRole === "modelOperator") return ["models", "audit"];
    if (activeRole === "finance") return ["ledgers", "audit"];
    return ["audit"];
  }, [activeRole]);

  const enter = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const exit = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 };

  const changeRole = (nextRole: AdminRole) => {
    const nextQueue = queueItems.filter((item) => nextRole === "administrator" || item.ownerRole === nextRole);
    const nextDetails: readonly DetailTab[] = nextRole === "administrator"
      ? ["models", "ledgers", "audit"]
      : nextRole === "modelOperator"
        ? ["models", "audit"]
        : nextRole === "finance"
          ? ["ledgers", "audit"]
          : ["audit"];

    setActiveRole(nextRole);
    setQueueFilter("all");
    setSelectedQueueId(nextQueue[0]?.id ?? "");
    setActiveDetail(nextDetails[0] ?? "audit");
  };

  const changeFilter = (nextFilter: QueueFilter) => {
    const nextItems = scopedQueue.filter((item) => nextFilter === "all" || (nextFilter === "urgent" ? item.priority === "urgent" : item.category === nextFilter));
    setQueueFilter(nextFilter);
    setSelectedQueueId(nextItems[0]?.id ?? "");
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = availableDetails.indexOf(activeDetail);
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? availableDetails.length - 1
        : event.key === "ArrowRight"
          ? (currentIndex + 1) % availableDetails.length
          : (currentIndex - 1 + availableDetails.length) % availableDetails.length;
    const nextTab = availableDetails[nextIndex];
    if (!nextTab) return;
    setActiveDetail(nextTab);
    requestAnimationFrame(() => document.getElementById(`detail-tab-${nextTab}`)?.focus());
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <div className="admin-shell">
        <a className="skip-link" href="#main-content">Skip to operations</a>

        <aside className="sidebar">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span><strong>AudiLink</strong><small>Admin</small></span>
          </div>

          <nav className="primary-nav" aria-label="Admin sections">
            {visibleNav.map((item) => (
              <button
                key={item.id}
                className={item.id === "overview" ? "nav-item active" : "nav-item"}
                type="button"
                disabled={!item.enabled}
                aria-label={item.enabled ? item.label : `${item.label} (planned section)`}
                title={item.enabled ? item.label : "Planned section — unavailable in this preview"}
                aria-current={item.id === "overview" ? "page" : undefined}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === "overview" ? <motion.i layoutId="admin-nav-marker" aria-hidden="true" /> : null}
              </button>
            ))}
          </nav>

          <div className="sidebar-note">
            <span className="preview-dot" aria-hidden="true" />
            <span><strong>Preview environment</strong><small>Scenario data only</small></span>
          </div>
          <div className="operator">
            <span className="avatar">AO</span>
            <span><strong>Admin Operator</strong><small>MFA verified</small></span>
          </div>
        </aside>

        <main id="main-content" className="main-content">
          <header className="topbar">
            <span>Control plane</span>
            <div><span className="live-state"><i aria-hidden="true" />Core systems nominal</span><small>Fixture snapshot · 14s ago</small></div>
          </header>

          <div className="content-wrap">
            <section className="page-intro" aria-labelledby="overview-title">
              <div>
                <span className="eyebrow">Operations overview</span>
                <h1 id="overview-title">See what needs a decision.</h1>
                <p>Health stays quiet until an operator needs context or action.</p>
              </div>
              <label className="role-picker" htmlFor="role-scope">
                <span>Viewing as</span>
                <select id="role-scope" value={activeRole} onChange={(event) => changeRole(event.target.value as AdminRole)}>
                  {roleOptions.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}
                </select>
                <small>{ROLE_PERMISSIONS[activeRole].length} permissions · {roleMeta?.detail}</small>
              </label>
            </section>

            <AnimatePresence mode="wait" initial={false}>
              <motion.section
                className="health-summary"
                key={activeRole}
                aria-live="polite"
                aria-label={`${roleMeta?.label} health summary`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={enter}
                exit={exit}
              >
                {metrics.map((metric, index) => (
                  <article className={index === 0 ? "health-metric primary" : "health-metric"} key={metric.label}>
                    <div><span>{metric.label}</span><i className={`tone-${metric.tone}`} aria-hidden="true" /></div>
                    <strong>{metric.value}</strong>
                    <p>{metric.detail}</p>
                    <small>{metric.trend}</small>
                  </article>
                ))}
              </motion.section>
            </AnimatePresence>

            <section className="decision-section" aria-labelledby="decision-title">
              <div className="section-heading">
                <div><span className="eyebrow">Decision focus</span><h2 id="decision-title">Needs attention</h2></div>
                <p>{scopedQueue.length} items in this role scope</p>
              </div>

              <div className="filter-row" role="group" aria-label="Filter decision queue">
                {availableFilters.map((filter) => (
                  <button key={filter} type="button" aria-pressed={queueFilter === filter} onClick={() => changeFilter(filter)}>
                    {queueFilter === filter ? <motion.span layoutId="queue-filter" aria-hidden="true" /> : null}
                    <b>{filterLabels[filter]}</b>
                  </button>
                ))}
              </div>

              <div className="decision-workspace">
                <div className="queue-list" aria-label="Decision queue">
                  <AnimatePresence initial={false} mode="popLayout">
                    {filteredQueue.map((item) => (
                      <motion.button
                        layout
                        key={item.id}
                        className={selectedItem?.id === item.id ? "queue-row selected" : "queue-row"}
                        type="button"
                        aria-pressed={selectedItem?.id === item.id}
                        onClick={() => setSelectedQueueId(item.id)}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
                        animate={enter}
                        exit={exit}
                      >
                        <span className={`priority priority-${item.priority}`} role="img" aria-label={`${item.priority} priority`} />
                        <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                        <span><Status status={item.status} /><small>{item.age}</small></span>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                  {!filteredQueue.length ? <div className="empty-state"><Icon name="check" /><strong>Nothing waiting here.</strong><span>Choose another filter to inspect the queue.</span></div> : null}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {selectedItem ? (
                    <motion.article
                      className="decision-detail"
                      key={selectedItem.id}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
                    >
                      <div className="detail-topline"><span>{selectedItem.id}</span><Status status={selectedItem.status} /></div>
                      <h3>{selectedItem.title}</h3>
                      <p>{selectedItem.signal}</p>
                      <dl>
                        <div><dt>Owner</dt><dd>{roleOptions.find((role) => role.id === selectedItem.ownerRole)?.label}</dd></div>
                        <div><dt>Waiting</dt><dd>{selectedItem.age}</dd></div>
                        <div><dt>Priority</dt><dd>{selectedItem.priority}</dd></div>
                      </dl>
                      <div className="detail-footer">
                        <span>Scenario record — no production action</span>
                        <button type="button" disabled aria-label="Open record (unavailable in this preview)">Open record <Icon name="arrow" /></button>
                      </div>
                    </motion.article>
                  ) : null}
                </AnimatePresence>
              </div>
            </section>

            <section className="details-section" aria-labelledby="details-title">
              <div className="section-heading compact">
                <div><span className="eyebrow">Operational detail</span><h2 id="details-title">Inspect one layer at a time</h2></div>
              </div>
              <div className="detail-tabs" role="tablist" aria-label="Operational detail" onKeyDown={handleTabKeyDown}>
                {availableDetails.map((tab) => (
                  <button
                    id={`detail-tab-${tab}`}
                    key={tab}
                    type="button"
                    role="tab"
                    tabIndex={activeDetail === tab ? 0 : -1}
                    aria-selected={activeDetail === tab}
                    aria-controls="detail-panel"
                    onClick={() => setActiveDetail(tab)}
                  >
                    {detailLabels[tab]}
                    {activeDetail === tab ? <motion.span layoutId="detail-tab-marker" aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  id="detail-panel"
                  className="detail-panel"
                  role="tabpanel"
                  aria-labelledby={`detail-tab-${activeDetail}`}
                  key={`${activeRole}-${activeDetail}`}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={enter}
                  exit={exit}
                >
                  <DetailsPanel activeTab={activeDetail} />
                </motion.div>
              </AnimatePresence>
            </section>

            <footer className="console-footer">
              <span>Non-production preview · Scenario fixture only</span>
              <span>Contract v1 · Primary region</span>
            </footer>
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
