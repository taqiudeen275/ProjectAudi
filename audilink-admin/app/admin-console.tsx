"use client";

import { useMemo, useState } from "react";

import {
  ROLE_PERMISSIONS,
  type AdminRole,
  type ModelFamily,
} from "@audilink/contracts";
import {
  operationalTone,
  type MetricDatum,
  type NavigationItem,
} from "@audilink/ui";

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

type IconName =
  | "grid"
  | "shield"
  | "pulse"
  | "wave"
  | "ledger"
  | "book"
  | "people"
  | "history"
  | "search"
  | "bell"
  | "arrow"
  | "check"
  | "clock"
  | "lock";

interface RoleOption {
  readonly id: AdminRole;
  readonly label: string;
  readonly detail: string;
}

interface NavItem extends NavigationItem<NavId> {
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
  { id: "review", label: "Review queue", icon: "shield", badge: "18", roles: ["moderator", "administrator"], enabled: false },
  { id: "generation", label: "Generation", icon: "pulse", badge: "42", roles: ["modelOperator", "support", "administrator"], enabled: false },
  { id: "models", label: "Model registry", icon: "wave", roles: ["modelOperator", "administrator"], enabled: false },
  { id: "finance", label: "Finance", icon: "ledger", badge: "3", roles: ["finance", "administrator"], enabled: false },
  { id: "catalog", label: "Catalog", icon: "book", roles: ["moderator", "support", "administrator"], enabled: false },
  { id: "people", label: "People & access", icon: "people", roles: ["support", "administrator"], enabled: false },
  { id: "audit", label: "Audit log", icon: "history", roles: roleOptions.map((role) => role.id), enabled: false },
];

const metricsByRole: Readonly<Record<AdminRole, readonly MetricDatum[]>> = {
  administrator: [
    { label: "Platform health", value: "99.94%", detail: "Control-plane availability", tone: "positive", trend: "+0.03%" },
    { label: "Open reviews", value: "18", detail: "4 nearing policy SLA", tone: "caution", trend: "−6 today" },
    { label: "Active jobs", value: "42", detail: "8 GPU · 34 media", tone: "info", trend: "6.2m p50" },
    { label: "Cross-ledger variance", value: "0", detail: "Three separate ledgers reconciled", tone: "positive", trend: "8m ago" },
  ],
  moderator: [
    { label: "Assigned reviews", value: "12", detail: "3 identity or consent", tone: "caution", trend: "−2 today" },
    { label: "Oldest case", value: "2h 14m", detail: "Within 24-hour target", tone: "positive", trend: "Consent queue" },
    { label: "Auto-check pass", value: "93.1%", detail: "Last 24 hours", tone: "info", trend: "+1.4%" },
    { label: "Appeals waiting", value: "2", detail: "7-day review target", tone: "neutral", trend: "No overdue" },
  ],
  finance: [
    { label: "Cross-ledger variance", value: "0", detail: "Three separate ledgers reconciled", tone: "positive", trend: "8m ago" },
    { label: "Payout holds", value: "3", detail: "2 KYC · 1 consent", tone: "caution", trend: "$412.80" },
    { label: "Pending earnings", value: "$8.4k", detail: "14-day rolling hold", tone: "info", trend: "+6.8%" },
    { label: "Webhook lag", value: "1.2s", detail: "Payment providers", tone: "positive", trend: "p95" },
  ],
  modelOperator: [
    { label: "Generation success", value: "98.7%", detail: "Accepted jobs, 24h", tone: "positive", trend: "+0.6%" },
    { label: "Active jobs", value: "42", detail: "8 GPU · 34 media", tone: "info", trend: "6.2m p50" },
    { label: "Queue pressure", value: "0.72×", detail: "Managed GPU capacity", tone: "positive", trend: "Stable" },
    { label: "Restricted routes", value: "1", detail: "Fish S2-Pro license gate", tone: "caution", trend: "Launch blocker" },
  ],
  support: [
    { label: "Open conversations", value: "24", detail: "6 awaiting staff reply", tone: "info", trend: "11m median" },
    { label: "Affected jobs", value: "3", detail: "User-visible failures", tone: "caution", trend: "−4 today" },
    { label: "Session health", value: "99.98%", detail: "Cross-surface auth", tone: "positive", trend: "24h" },
    { label: "Storage alerts", value: "5", detail: "Accounts at 90%+", tone: "neutral", trend: "No lockouts" },
  ],
};

const queueItems: readonly QueueItem[] = [
  {
    id: "REV-1048",
    category: "trust",
    ownerRole: "moderator",
    title: "Public voice consent mismatch",
    detail: "Voice · “Calm coastal narrator”",
    signal: "Identity comparison requires human decision",
    age: "18m",
    priority: "urgent",
    status: "review",
  },
  {
    id: "FIN-0281",
    category: "finance",
    ownerRole: "finance",
    title: "Payout blocked by active consent case",
    detail: "Creator payout · GHS settlement",
    signal: "Hold is policy-linked; no ledger mutation",
    age: "41m",
    priority: "high",
    status: "blocked",
  },
  {
    id: "JOB-7624",
    category: "models",
    ownerRole: "modelOperator",
    title: "TADA 3B batch exceeded latency target",
    detail: "Audiobook render · Attempt 2",
    signal: "12 completed segments are reusable",
    age: "1h",
    priority: "high",
    status: "running",
  },
  {
    id: "REV-1044",
    category: "trust",
    ownerRole: "moderator",
    title: "Serial release awaiting quality review",
    detail: "Publication · 9 episodes",
    signal: "Automated checks passed 31 of 32 rules",
    age: "2h",
    priority: "normal",
    status: "pending",
  },
  {
    id: "FIN-0278",
    category: "finance",
    ownerRole: "finance",
    title: "Reader Coin promotion near budget cap",
    detail: "Referral campaign · Launch cohort B",
    signal: "92% of funded fiat liability allocated",
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
  { unit: "Studio Credits", issued: "126.4M", activity: "3.82M settled", variance: "0", state: "reconciled" },
  { unit: "Reader Coins", issued: "2.18M", activity: "94.6K redeemed", variance: "0", state: "reconciled" },
  { unit: "Fiat liabilities", issued: "$48.2K", activity: "$8.4K pending", variance: "0", state: "reconciled" },
] as const;

const auditEvents = [
  { initials: "NM", actor: "Naa Mensah", action: "Approved publication release", target: "PUB-0284", time: "8m ago", tone: "positive" as const },
  { initials: "SK", actor: "Sam K.", action: "Requested second approval", target: "FIN-0281", time: "21m ago", tone: "caution" as const },
  { initials: "OP", actor: "Model operator", action: "Paused TADA 3B Studio route", target: "ROUTE-014", time: "34m ago", tone: "info" as const },
  { initials: "SY", actor: "System", action: "Completed ledger reconciliation", target: "REC-8840", time: "42m ago", tone: "neutral" as const },
] as const;

function Icon({ name }: { readonly name: IconName }) {
  const paths: Readonly<Record<IconName, React.ReactNode>> = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    shield: <><path d="M12 3 20 6v5c0 5.2-3.2 8.5-8 10-4.8-1.5-8-4.8-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    pulse: <path d="M3 12h4l2.2-6 4.1 12 2.2-6H21"/>,
    wave: <><path d="M4 14V10"/><path d="M8 18V6"/><path d="M12 21V3"/><path d="M16 17V7"/><path d="M20 14v-4"/></>,
    ledger: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M14 15.5a4.5 4.5 0 0 1 6.5 4"/></>,
    history: <><path d="M4 5v5h5"/><path d="M5.4 16.5A8 8 0 1 0 4 10"/><path d="M12 7v5l3 2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function StatusPill({ status }: { readonly status: string }) {
  const tone = operationalTone(status);
  return <span className={`status-pill tone-${tone}`}><span className="status-dot" />{status}</span>;
}

function MetricCard({ metric, index }: { readonly metric: MetricDatum; readonly index: number }) {
  const sparkHeights = [36, 52, 44, 68, 59, 76, 66, 84];
  return (
    <article className="metric-card" style={{ "--delay": `${index * 45}ms` } as React.CSSProperties}>
      <div className="metric-heading">
        <span>{metric.label}</span>
        <span className={`metric-signal tone-${metric.tone}`} />
      </div>
      <strong>{metric.value}</strong>
      <div className="metric-footer">
        <span>{metric.detail}</span>
        <span className="metric-trend">{metric.trend}</span>
      </div>
      <div className={`spark tone-${metric.tone}`} aria-hidden="true">
        {sparkHeights.map((height, sparkIndex) => (
          <span key={sparkIndex} style={{ height: `${Math.max(18, height - index * 4 + (sparkIndex % 2) * 4)}%` }} />
        ))}
      </div>
    </article>
  );
}

export function AdminConsole() {
  const [activeRole, setActiveRole] = useState<AdminRole>("administrator");
  const [activeSection, setActiveSection] = useState<NavId>("overview");
  const [queueFilter, setQueueFilter] = useState<QueueFilter>("all");

  const roleMeta = roleOptions.find((role) => role.id === activeRole) ?? roleOptions[0];
  const visibleNav = navItems.filter((item) => item.roles.includes(activeRole));
  const metrics = metricsByRole[activeRole];
  const filteredQueue = useMemo(() => {
    return queueItems.filter((item) => {
      const roleMatch = activeRole === "administrator" || item.ownerRole === activeRole;
      const filterMatch = queueFilter === "all"
        || (queueFilter === "urgent" && item.priority === "urgent")
        || item.category === queueFilter;
      return roleMatch && filterMatch;
    });
  }, [activeRole, queueFilter]);

  const changeRole = (nextRole: AdminRole) => {
    setActiveRole(nextRole);
    setActiveSection("overview");
    setQueueFilter("all");
  };

  return (
    <div className="admin-shell">
      <a className="skip-link" href="#main-content">Skip to operations</a>

      <aside className="sidebar">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><strong>AudiLink</strong><small>ADMIN</small></span>
        </div>

        <div className="environment-chip"><span />Non-production preview</div>

        <nav className="primary-nav" aria-label="Admin sections">
          <p>WORKSPACE</p>
          {visibleNav.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "nav-item active" : "nav-item"}
              onClick={() => setActiveSection(item.id)}
              type="button"
              disabled={!item.enabled}
              aria-label={item.enabled ? item.label : `${item.label} (planned section)`}
              title={item.enabled ? item.label : "Planned section — not available in this preview"}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.badge ? <em>{item.badge}</em> : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="security-card">
          <span className="security-icon"><Icon name="lock" /></span>
          <div><strong>MFA verified</strong><small>Step-up available</small></div>
          <span className="security-check"><Icon name="check" /></span>
        </div>
        <button className="profile-button" type="button" disabled aria-label="Account menu (not available in this preview)">
          <span className="avatar">AO</span>
          <span><strong>Admin Operator</strong><small>{roleMeta?.label}</small></span>
          <span className="profile-more">•••</span>
        </button>
      </aside>

      <main id="main-content" className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Operations</span><b>/</b><strong>{navItems.find((item) => item.id === activeSection)?.label ?? "Overview"}</strong></div>
          <div className="top-actions">
            <button className="search-button" type="button" disabled aria-label="Search records (not available in this preview)"><Icon name="search" /><span>Search records</span><kbd>⌘ K</kbd></button>
            <button className="icon-button" type="button" disabled aria-label="Notifications (not available in this preview)"><Icon name="bell" /><span /></button>
          </div>
        </header>

        <div className="content-wrap">
          <section className="page-intro" aria-labelledby="overview-title">
            <div>
              <div className="eyebrow"><span />CONTROL PLANE · SCENARIO DATA</div>
              <h1 id="overview-title">Good morning, operator.</h1>
              <p>A single view of platform health, review pressure, model capacity, and financial integrity.</p>
            </div>
            <div className="role-picker">
              <label htmlFor="role-scope">Preview role scope</label>
              <select id="role-scope" aria-describedby="role-scope-detail" value={activeRole} onChange={(event) => changeRole(event.target.value as AdminRole)}>
                {roleOptions.map((role) => <option key={role.id} value={role.id}>{role.label}</option>)}
              </select>
              <small id="role-scope-detail">{ROLE_PERMISSIONS[activeRole].length} permissions · {roleMeta?.detail}</small>
            </div>
          </section>

          <section className="system-strip" aria-label="System status">
            <div className="system-status"><span className="live-orbit"><i /></span><strong>All core systems nominal</strong><small>Last fixture snapshot 14 seconds ago</small></div>
            <div className="system-facts">
              <span><i />API <strong>84 ms</strong></span>
              <span><i />Workflows <strong>42 active</strong></span>
              <span><i />Primary region <strong>healthy</strong></span>
              <button type="button" disabled aria-label="Open health view (not available in this preview)">Open health view <Icon name="arrow" /></button>
            </div>
          </section>

          <section className="metric-grid" aria-live="polite" aria-label={`${roleMeta?.label} metrics`}>
            {metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
          </section>

          <div className="operations-grid">
            <section className="panel queue-panel">
              <div className="panel-header">
                <div><span className="section-kicker">DECISION QUEUE</span><h2>Needs attention</h2></div>
                <button className="text-button" type="button" disabled aria-label="Open full queue (not available in this preview)">Open full queue <Icon name="arrow" /></button>
              </div>
              <div className="filter-row" role="group" aria-label="Filter decision queue">
                {(["all", "urgent", "trust", "models", "finance"] as const).map((filter) => (
                  <button key={filter} className={queueFilter === filter ? "filter active" : "filter"} type="button" aria-pressed={queueFilter === filter} onClick={() => setQueueFilter(filter)}>
                    {filter === "trust" ? "Trust & safety" : filter}
                  </button>
                ))}
              </div>
              <div className="queue-list">
                {filteredQueue.length ? filteredQueue.map((item) => (
                  <button className="queue-row" type="button" key={item.id} disabled aria-label={`${item.id}: ${item.title}. Details are not available in this preview.`}>
                    <span className={`priority-mark priority-${item.priority}`} />
                    <span className="queue-main"><strong>{item.title}</strong><small>{item.detail}</small><em>{item.signal}</em></span>
                    <span className="queue-meta"><StatusPill status={item.status} /><small><Icon name="clock" />{item.age}</small><b>{item.id}</b></span>
                    <span className="row-arrow"><Icon name="arrow" /></span>
                  </button>
                )) : (
                  <div className="empty-state"><Icon name="check" /><strong>Nothing waiting in this scope</strong><span>Try another queue filter or role.</span></div>
                )}
              </div>
            </section>

            <section className="panel model-panel">
              <div className="panel-header compact">
                <div><span className="section-kicker">INFERENCE</span><h2>Model routes</h2></div>
                <button className="icon-button small" type="button" disabled aria-label="Open model registry (not available in this preview)"><Icon name="arrow" /></button>
              </div>
              <div className="capacity-dial">
                <div className="dial"><span><strong>72</strong><small>%</small></span></div>
                <div><strong>GPU capacity</strong><small>Managed pool · primary region</small><em>11 of 16 slots warm</em></div>
              </div>
              <div className="model-list">
                {modelHealth.map((model) => (
                  <div className="model-row" key={model.family}>
                    <span className={`model-glyph tone-${operationalTone(model.health)}`}><Icon name="wave" /></span>
                    <span><strong>{model.name}</strong><small>{model.route}</small></span>
                    <span className="model-state"><StatusPill status={model.health} /><small>{model.metric}</small></span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bottom-grid">
            <section className="panel ledger-panel">
              <div className="panel-header">
                <div><span className="section-kicker">FINANCIAL INTEGRITY</span><h2>Ledger reconciliation</h2></div>
                <div className="reconcile-state"><span /><strong>Balanced</strong><small>Run REC-8840</small></div>
              </div>
              <div className="ledger-table" role="table" aria-label="Ledger reconciliation summary">
                <div className="table-head" role="row"><span role="columnheader">Unit</span><span role="columnheader">Total liability</span><span role="columnheader">Recent activity</span><span role="columnheader">Variance</span><span role="columnheader">State</span></div>
                {reconciliationRows.map((row) => (
                  <div className="table-row" role="row" key={row.unit}>
                    <strong role="cell"><span className="unit-mark" />{row.unit}</strong><span role="cell">{row.issued}</span><span role="cell">{row.activity}</span><span role="cell" className="mono">{row.variance}</span><span role="cell"><StatusPill status={row.state} /></span>
                  </div>
                ))}
              </div>
              <p className="invariant-note"><Icon name="lock" /><span>Entries are immutable. Corrections require a reasoned compensating transaction; high-risk adjustments require dual approval.</span></p>
            </section>

            <section className="panel audit-panel">
              <div className="panel-header compact">
                <div><span className="section-kicker">ACCOUNTABILITY</span><h2>Audit activity</h2></div>
                <button className="text-button" type="button" disabled aria-label="View all audit activity (not available in this preview)">View all <Icon name="arrow" /></button>
              </div>
              <div className="audit-list">
                {auditEvents.map((event) => (
                  <div className="audit-row" key={`${event.target}-${event.time}`}>
                    <span className={`audit-avatar tone-${event.tone}`}>{event.initials}</span>
                    <span><strong>{event.action}</strong><small>{event.actor} · <b>{event.target}</b></small></span>
                    <time>{event.time}</time>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="console-footer">
            <span>Non-production preview · Scenario fixture only</span>
            <span>Contract <strong>v1</strong> · Primary region · UTC 08:42:16</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
