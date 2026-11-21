"use client";

import * as React from "react";

/* ---------------------------------------------------------------------------
 * Journey — Orbit / Globe edition (single file, plain JSX, no dependencies)
 *
 *   <Journey />                         // uses the built-in data below
 *   <Journey journey={journey} />       // journey = [{ year, title, description, date?, icon? }]
 *
 * - Open on the page: no box, no border, transparent background.
 * - Theme follows your site automatically through CSS: it reacts to a `.dark`
 *   class (or data-theme="dark") on any ancestor, e.g. <html class="dark">.
 *   Force one with theme="dark" | "light"; default is "auto".
 * ------------------------------------------------------------------------- */

/* ------------------------------ Icons & data ------------------------------ */

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ICONS = {
  code: (<Svg><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Svg>),
  layers: (<Svg><path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" /></Svg>),
  rocket: (
    <Svg>
      <path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M12 15 9 12M14 4c3-1.5 6-1 6-1s.5 3-1 6l-6 6-5-5 6-6Z" />
      <circle cx="15" cy="9" r="1" />
    </Svg>
  ),
  server: (
    <Svg>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </Svg>
  ),
  star: (<Svg><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" /></Svg>),
  users: (
    <Svg>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2 .6 3.2 2.3 3.5 5.2" />
    </Svg>
  ),
  shield: (
    <Svg>
      <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  zap: (<Svg><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Svg>),
  book: (<Svg><path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5ZM4 19a2 2 0 0 1 2-2h14" /></Svg>),
  globe: (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
    </Svg>
  ),
};

/* Built-in journey — replace with your own whenever you like. */
export const DEFAULT_JOURNEY = [
  // 2021 — Foundations
  { year: 2021, date: "Jan", title: "Wrote my first line of code", icon: ICONS.code,
    description: "Started with HTML, CSS and vanilla JavaScript — building tiny pages just to see something move on screen." },
  { year: 2021, date: "Jun", title: "Learned the fundamentals", icon: ICONS.book,
    description: "Worked through data structures, Git, and the command line. Learned that debugging is most of the job." },
  { year: 2021, date: "Nov", title: "First portfolio site", icon: ICONS.globe,
    description: "Shipped a hand-built portfolio with a responsive layout and a contact form — my first real deployment." },

  // 2022 — Frameworks
  { year: 2022, date: "Mar", title: "Picked up React", icon: ICONS.layers,
    description: "Moved from DOM scripting to components, props and hooks, and rebuilt old projects the React way." },
  { year: 2022, date: "Sep", title: "Open-source contribution", icon: ICONS.users,
    description: "Landed my first merged pull request: a small accessibility fix that taught me how real review cycles work." },

  // 2023 — Full-Stack
  { year: 2023, date: "Feb", title: "Went full-stack", icon: ICONS.server,
    description: "Built APIs with Node and Postgres, added authentication, and wired up a complete end-to-end product." },
  { year: 2023, date: "Jul", title: "TypeScript everywhere", icon: ICONS.shield,
    description: "Adopted TypeScript across the stack. Fewer runtime surprises, far more confident refactors." },
  { year: 2023, date: "Dec", title: "First freelance client", icon: ICONS.star,
    description: "Delivered a booking platform for a small business — scoping, building, and supporting it after launch." },

  // 2024 — Production
  { year: 2024, date: "Apr", title: "Production at scale", icon: ICONS.zap,
    description: "Joined a product team: CI/CD pipelines, monitoring, caching and performance budgets became daily habits." },
  { year: 2024, date: "Oct", title: "Led a feature end to end", icon: ICONS.users,
    description: "Owned a customer-facing feature from design review to rollout, and mentored two junior developers along the way." },

  // 2025 — Launch
  { year: 2025, date: "May", title: "Launched my own product", icon: ICONS.rocket,
    description: "Took a side project to public launch, collected real feedback, and iterated weekly based on what users did." },
  { year: 2025, date: "Nov", title: "Reached my first 1,000 users", icon: ICONS.star,
    description: "Crossed a thousand active users with zero ad spend, driven by writing, demos and word of mouth." },

  // 2026 — Now
  { year: 2026, date: "Mar", title: "Building with AI", icon: ICONS.zap,
    description: "Integrating LLM features into products and designing the evals, guardrails and UX that make them dependable." },
  { year: 2026, date: "Aug", title: "Speaking & teaching", icon: ICONS.book,
    description: "Giving talks and workshops on modern front-end engineering, and sharing what I've learned in public." },
];

function groupByYear(items) {
  const map = new Map();
  items.forEach((it) => {
    const key = String(it.year);
    if (!map.has(key)) map.set(key, { year: it.year, events: [] });
    map.get(key).events.push({
      date: it.date,
      title: it.title,
      description: it.description,
      icon: it.icon,
    });
  });
  return Array.from(map.values());
}

/* --------------------------------- Styles --------------------------------- */

const STYLE_ID = "orbit-timeline-styles-v2";

// Selector helpers: "dark" = site has .dark / data-theme="dark" on an ancestor
// (unless this instance is forced light), or this instance is forced dark.
const DARK_ROOT =
  '.dark .ot-root:not([data-ot="light"]), [data-theme="dark"] .ot-root:not([data-ot="light"]), .ot-root[data-ot="dark"]';
const dk = (s) =>
  [
    `.dark .ot-root:not([data-ot="light"]) ${s}`,
    `[data-theme="dark"] .ot-root:not([data-ot="light"]) ${s}`,
    `.ot-root[data-ot="dark"] ${s}`,
  ].join(", ");

const CSS = `
@property --ot-k { syntax: '<number>'; inherits: false; initial-value: 1; }
@property --ot-rr { syntax: '<length>'; inherits: false; initial-value: 0px; }
.ot-root, .ot-root *, .ot-root *::before { box-sizing: border-box; }

/* Light (base) */
.ot-root { position: relative; width: 100%; height: 100%; min-height: 360px; overflow: hidden; background: transparent; color: rgb(var(--ot-fg));
  -webkit-tap-highlight-color: transparent; --ot-glow: .6;
  --ot-o1: #ffffff; --ot-o2: #a3a3aa; --ot-o3: #dadadf;
  --ot-ac: #E34C19; --ot-on-ac: #ffffff; --ot-bg: #f7f7f5; --ot-fg: 23,23,26;
  --ot-ig0: rgba(23,23,26,.5); --ot-ig1: rgba(23,23,26,.95); color-scheme: light; }
/* Dark */
${DARK_ROOT} { --ot-o1: #e4e4e8; --ot-o2: #3e3e45; --ot-o3: #96969e; --ot-ac: #FF875B; --ot-on-ac: #111114; --ot-bg: #0f1117; --ot-fg: 255,255,255;
  --ot-ig0: rgba(255,255,255,.95); --ot-ig1: rgba(255,255,255,.4); color-scheme: dark; }

.ot-orbit { position: absolute; left: 50%; top: 50%; border-radius: 50%; pointer-events: none; --ot-rw: 2px; --ot-g0: 0deg; --ot-g1: 0deg;
  transform: translate(-50%, -50%) scale(var(--ot-s, 1)); opacity: var(--ot-o, 1); transition: opacity .5s, transform .9s cubic-bezier(.2,.8,.2,1); }
.ot-orbit > i { position: absolute; inset: 0; border-radius: 50%; display: block; transition: opacity .45s;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - var(--ot-rw)), #000 calc(100% - var(--ot-rw) + .25px), #000 100%),
    conic-gradient(from 0deg, transparent var(--ot-g0), #000 var(--ot-g1), #000 calc(360deg - var(--ot-g1)), transparent calc(360deg - var(--ot-g0)));
  -webkit-mask-composite: source-in;
  mask: radial-gradient(farthest-side, transparent calc(100% - var(--ot-rw)), #000 calc(100% - var(--ot-rw) + .25px), #000 100%),
    conic-gradient(from 0deg, transparent var(--ot-g0), #000 var(--ot-g1), #000 calc(360deg - var(--ot-g1)), transparent calc(360deg - var(--ot-g0)));
  mask-composite: intersect; }
/* orbit lines: light base */
.ot-orbit .ot-ln { background: conic-gradient(from -70deg, rgba(var(--ot-fg), .4), rgba(var(--ot-fg), .55) 25%, rgba(var(--ot-fg), .75) 50%, rgba(var(--ot-fg), .55) 75%, rgba(var(--ot-fg), .4));
  filter: drop-shadow(0 -.5px 0 rgba(255,255,255,.95)) drop-shadow(0 1px 1.5px rgba(0,0,0,.09)); }
.ot-orbit .ot-ac { --ot-rw: 3px; opacity: 0; background: var(--ot-ac); filter: drop-shadow(0 0 3px color-mix(in srgb, var(--ot-ac) 60%, transparent)); }
/* orbit lines: dark */
${dk(".ot-orbit .ot-ln")} { background: conic-gradient(from -70deg, rgba(var(--ot-fg), .85), rgba(var(--ot-fg), .45) 25%, rgba(var(--ot-fg), .28) 50%, rgba(var(--ot-fg), .45) 75%, rgba(var(--ot-fg), .85));
  filter: drop-shadow(0 0 calc(7px * var(--ot-glow)) rgba(var(--ot-fg), .45)); }
${dk(".ot-orbit .ot-ac")} { background: conic-gradient(from -70deg, var(--ot-ac), color-mix(in srgb, var(--ot-ac) 55%, transparent) 25%, color-mix(in srgb, var(--ot-ac) 22%, transparent) 50%, color-mix(in srgb, var(--ot-ac) 55%, transparent) 75%, var(--ot-ac));
  filter: drop-shadow(0 0 calc(9px * var(--ot-glow)) var(--ot-ac)) drop-shadow(0 0 calc(2px * var(--ot-glow)) var(--ot-ac)); }
.ot-orbit.ot-on .ot-ac { opacity: 1; }
.ot-orbit.ot-on .ot-ln { opacity: 0; }
.ot-root.ot-focus .ot-orbit:not(.ot-on) .ot-ln { opacity: .35; }
.ot-orbit.ot-hidden { --ot-s: .2; --ot-o: 0; }

.ot-year { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; cursor: pointer; background: none; border: 0; padding: 2px 4px; margin: 0;
  font: 700 14px/1 var(--ot-year-font); letter-spacing: .12em; font-variant-numeric: lining-nums tabular-nums;
  color: rgba(var(--ot-fg), .92); transition: color .35s, opacity .6s; z-index: 2; }
.ot-year:hover { color: rgba(var(--ot-fg), .9); }
.ot-year:focus-visible, .ot-node:focus-visible, .ot-card button:focus-visible { outline: 2px solid rgba(var(--ot-fg), .6); outline-offset: 2px; }
.ot-year.ot-on { color: var(--ot-ac); text-shadow: 0 0 4px color-mix(in srgb, var(--ot-ac) 35%, transparent); }
.ot-root.ot-focus .ot-year:not(.ot-on) { color: rgba(var(--ot-fg), .5); }
.ot-year.ot-hidden { opacity: 0; }
.ot-root.ot-no-years .ot-year { display: none; }

.ot-core { position: absolute; left: 50%; top: 50%; border-radius: 50%; z-index: 1; animation: ot-breathe 5s ease-in-out infinite; }
.ot-core-fill { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; isolation: isolate; background: var(--ot-o2); }
.ot-blob { position: absolute; width: 70%; height: 70%; border-radius: 50%; filter: blur(calc(var(--ot-cs, 28px) * .14)); will-change: transform; }
.ot-b1 { background: var(--ot-o1); left: -5%; top: -10%; animation: ot-d1 9s ease-in-out infinite; }
.ot-b2 { background: var(--ot-o2); right: -10%; top: 10%; animation: ot-d2 11s ease-in-out infinite; }
.ot-b3 { background: var(--ot-o3); left: 15%; bottom: -15%; animation: ot-d3 8s ease-in-out infinite; }
.ot-b4 { background: #fff; width: 36%; height: 36%; left: 28%; top: 26%; opacity: .18; animation: ot-d4 7s ease-in-out infinite; }
.ot-core-gloss { position: absolute; inset: 0; border-radius: 50%; pointer-events: none; background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.5) 0, rgba(255,255,255,0) 34%); }
.ot-core-shine { position: absolute; left: 18%; top: 9%; width: 40%; height: 26%; border-radius: 50%; transform: rotate(-20deg); filter: blur(1.5px); opacity: .35;
  background: radial-gradient(ellipse at 50% 35%, rgba(255,255,255,.8) 0, rgba(255,255,255,.2) 50%, rgba(255,255,255,0) 75%); }
.ot-emit { position: absolute; left: 50%; top: 50%; width: var(--ot-rr); height: var(--ot-rr); border-radius: 50%; pointer-events: none; z-index: 1;
  transform: translate(-50%, -50%); border: 1px solid rgba(var(--ot-fg), .45); opacity: 0; animation: ot-emit 4.2s cubic-bezier(.25,.6,.35,1) infinite; }
.ot-emit-2 { animation-delay: 1.4s; } .ot-emit-3 { animation-delay: 2.8s; }
@keyframes ot-emit { 0% { --ot-rr: var(--ot-from); opacity: 0; } 30% { opacity: .38; } 75% { opacity: .08; } 100% { --ot-rr: var(--ot-to); opacity: 0; } }
@keyframes ot-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
@keyframes ot-d1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30%, 25%) scale(1.2); } 66% { transform: translate(10%, 45%) scale(.9); } }
@keyframes ot-d2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-35%, 30%) scale(1.1); } 66% { transform: translate(-15%, -10%) scale(1.3); } }
@keyframes ot-d3 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(25%, -40%) scale(1.15); } 66% { transform: translate(-20%, -20%) scale(.95); } }
@keyframes ot-d4 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-25%, -30%) scale(1.3); } }

/* nodes: light base */
.ot-node { position: absolute; left: 0; top: 0; width: 30px; height: 30px; margin: -15px 0 0 -15px; border-radius: 50%; border: 0; padding: 0;
  display: grid; place-items: center; cursor: pointer; z-index: 3; color: rgb(var(--ot-fg));
  --ot-ring: conic-gradient(from -70deg, rgba(var(--ot-fg), .55), rgba(var(--ot-fg), .7) 25%, rgba(var(--ot-fg), .9) 50%, rgba(var(--ot-fg), .7) 75%, rgba(var(--ot-fg), .55));
  background: rgba(255,255,255,.95); -webkit-backdrop-filter: blur(6px) saturate(1.2); backdrop-filter: blur(6px) saturate(1.2);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.95), 0 1px 2px rgba(0,0,0,.05), 0 6px 14px -8px rgba(0,0,0,.14);
  transition: color .3s, opacity .35s, box-shadow .3s, background .3s, --ot-k .3s cubic-bezier(.2,.8,.2,1); }
/* nodes: dark */
${dk(".ot-node")} { color: rgb(var(--ot-fg));
  --ot-ring: conic-gradient(from -70deg, rgba(var(--ot-fg), .95), rgba(var(--ot-fg), .6) 25%, rgba(var(--ot-fg), .45) 50%, rgba(var(--ot-fg), .6) 75%, rgba(var(--ot-fg), .95));
  background: rgba(18, 20, 26, .85); box-shadow: inset 0 1px 0 rgba(255,255,255,.06); }
.ot-node::before { content: ""; position: absolute; inset: 0; border-radius: 50%; pointer-events: none; background: var(--ot-ring); transition: opacity .3s;
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 1.1px), #000 calc(100% - .85px)); mask: radial-gradient(farthest-side, transparent calc(100% - 1.1px), #000 calc(100% - .85px)); }
.ot-node svg { width: 14px; height: 14px; position: relative; stroke: var(--ot-ig); stroke-width: 2; fill: none; }
.ot-node .ot-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; position: relative; }
.ot-node:hover::before { filter: brightness(1.4); }
.ot-root.ot-root .ot-node:hover { color: rgb(var(--ot-fg)); }
/* node states (doubled root class = beats the dark selectors above) */
.ot-root.ot-root .ot-node.ot-on { color: var(--ot-ac); --ot-ring: var(--ot-ac); }
.ot-root.ot-root .ot-node.ot-on svg, .ot-root.ot-root .ot-node.ot-sel svg { stroke: currentColor; }
.ot-root.ot-focus .ot-node:not(.ot-on) { opacity: .55; }
.ot-root.ot-root .ot-node.ot-sel { --ot-k: 1.3; background: var(--ot-ac); color: var(--ot-on-ac); --ot-ring: var(--ot-ac);
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--ot-ac) 12%, transparent), 0 8px 18px -8px color-mix(in srgb, var(--ot-ac) 70%, transparent); }
${dk(".ot-node.ot-sel")} { box-shadow: 0 0 0 6px color-mix(in srgb, var(--ot-ac) 14%, transparent), 0 0 14px color-mix(in srgb, var(--ot-ac) 45%, transparent); }
.ot-root.ot-root .ot-node.ot-hidden { opacity: 0 !important; --ot-k: .4; }

.ot-card { position: absolute; left: 0; top: 0; width: 268px; padding: 16px 16px 14px; border-radius: 14px; z-index: 4; text-align: left;
  background: color-mix(in srgb, var(--ot-bg) 96%, transparent); -webkit-backdrop-filter: blur(16px) saturate(1.3); backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid rgba(var(--ot-fg), .28); box-shadow: 0 24px 60px -24px rgba(0,0,0,.35);
  opacity: 0; transform: translateY(6px) scale(.98); pointer-events: none; transition: opacity .25s, transform .3s cubic-bezier(.2,.8,.2,1); }
.ot-card.ot-open { opacity: 1; transform: none; pointer-events: auto; }
.ot-card-meta { display: flex; justify-content: space-between; gap: 12px; font: 700 11px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--ot-ac); }
.ot-card-meta span:last-child { color: rgba(var(--ot-fg), .7); }
.ot-card-title { margin: 10px 0 6px; font-size: 18px; line-height: 1.25; font-weight: 700; letter-spacing: -.01em; color: rgb(var(--ot-fg)); font-family: var(--ot-year-font); }
.ot-card-text { margin: 0; font-size: 14px; line-height: 1.55; color: rgba(var(--ot-fg), .9); }
.ot-card-nav { display: flex; gap: 6px; margin-top: 14px; }
.ot-card-nav button { appearance: none; flex: 1; border: 1px solid rgba(var(--ot-fg), .14); background: transparent; color: rgba(var(--ot-fg), .75);
  font: inherit; font-size: 12px; font-weight: 600; padding: 6px 8px; border-radius: 8px; cursor: pointer; }
.ot-card-nav button:hover { border-color: var(--ot-ac); color: var(--ot-ac); }
@media (prefers-reduced-motion: reduce) { .ot-core, .ot-core *, .ot-emit { animation: none !important; } .ot-emit { display: none; } }
`;

function useStyles() {
  React.useInsertionEffect?.(() => {
    if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

/* ------------------------------ Orbit timeline ----------------------------- */

function OrbitTimeline({
  data,
  theme = "auto",
  showYears = true,
  speed = 1,
  direction = "same",
  intro = true,
  replayKey = 0,
  yearFont = "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif",
  onSelect,
  className,
  style,
}) {
  useStyles();
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gradId = `ot-ig-${uid}`;

  const flat = React.useMemo(() => {
    const out = [];
    data.forEach((y, yi) => {
      const n = Math.max(1, y.events.length);
      y.events.forEach((_, ei) => out.push({ yi, ei, a0: yi * 1.3 + 0.4 + ei * ((Math.PI * 2) / n) }));
    });
    return out;
  }, [data]);

  const [sel, setSel] = React.useState(-1);
  const [hover, setHover] = React.useState(-1);
  const [shown, setShown] = React.useState(intro ? 0 : data.length);
  const [nodesShown, setNodesShown] = React.useState(intro ? 0 : data.length);

  const root = React.useRef(null);
  const card = React.useRef(null);
  const core = React.useRef(null);
  const orbitEls = React.useRef([]);
  const yearEls = React.useRef([]);
  const nodeEls = React.useRef([]);
  const emitEls = React.useRef([]);

  // Live values read by the animation loop without re-rendering.
  const live = React.useRef({ speed, direction, sel, hover, showYears });
  live.current = { speed, direction, sel, hover, showYears };
  const geo = React.useRef({ w: 0, h: 0, cx: 0, cy: -1, cyBase: 0, cyUp: 0, narrow: false, r: [] });

  const placeY = React.useCallback(() => {
    const g = geo.current;
    orbitEls.current.forEach((el) => { if (el) el.style.top = g.cy + "px"; });
    yearEls.current.forEach((el, i) => { if (el) el.style.top = g.cy - (g.r[i] ?? 0) + "px"; });
    if (core.current) core.current.style.top = g.cy + "px";
    emitEls.current.forEach((el) => { if (el) el.style.top = g.cy + "px"; });
  }, []);

  const placeGaps = React.useCallback(() => {
    const g = geo.current, k = 180 / Math.PI, off = !live.current.showYears;
    orbitEls.current.forEach((el, i) => {
      if (!el) return;
      const r = g.r[i] || 1, hw = (yearEls.current[i]?.offsetWidth ?? 0) / 2;
      el.style.setProperty("--ot-g0", off ? "0deg" : ((hw + 1) / r) * k + "deg");
      el.style.setProperty("--ot-g1", off ? "0deg" : ((hw + 18) / r) * k + "deg");
    });
  }, []);

  const layout = React.useCallback(() => {
    const el = root.current;
    if (!el) return;
    const g = geo.current, w = el.clientWidth, h = el.clientHeight, m = Math.min(w, h), n = data.length;
    g.w = w; g.h = h; g.cx = w / 2; g.cyBase = h / 2; g.cyUp = Math.min(h / 2, w * 0.5 + 24); g.narrow = w < 640;
    if (g.cy < 0) g.cy = g.cyBase;
    const r0 = Math.max(58, m * 0.11), r1 = m * 0.46;
    g.r = data.map((_, i) => (n > 1 ? r0 + ((r1 - r0) * i) / (n - 1) : r1));
    orbitEls.current.forEach((o, i) => { if (o) { o.style.width = o.style.height = g.r[i] * 2 + "px"; } });
    yearEls.current.forEach((y) => { if (y) y.style.left = g.cx + "px"; });
    const cd = Math.round(Math.min(28, (g.r[0] ?? 60) * 0.42));
    if (core.current) {
      core.current.style.width = core.current.style.height = cd + "px";
      core.current.style.margin = `${-cd / 2}px 0 0 ${-cd / 2}px`;
      core.current.style.setProperty("--ot-cs", cd + "px");
    }
    emitEls.current.forEach((e) => {
      if (!e) return;
      e.style.setProperty("--ot-from", cd + 2 + "px");
      e.style.setProperty("--ot-to", (g.r[0] ?? 60) * 2 - 14 + "px");
    });
    placeGaps();
    placeY();
  }, [data, placeGaps, placeY]);

  React.useLayoutEffect(() => {
    layout();
    const ro = new ResizeObserver(layout);
    if (root.current) ro.observe(root.current);
    document.fonts?.ready.then(placeGaps).catch(() => {});
    return () => ro.disconnect();
  }, [layout, placeGaps]);

  React.useEffect(() => { placeGaps(); }, [showYears, placeGaps]);

  // Growth intro: years appear from the centre outward, their events right after.
  React.useEffect(() => {
    if (!intro && replayKey === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSel(-1);
    setShown(0); setNodesShown(0);
    const timers = [];
    data.forEach((_, i) => {
      const at = reduce ? 0 : 200 + i * 230;
      timers.push(window.setTimeout(() => setShown((s) => Math.max(s, i + 1)), at));
      timers.push(window.setTimeout(() => setNodesShown((s) => Math.max(s, i + 1)), at + (reduce ? 0 : 380)));
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replayKey, data.length]);

  // Orbit animation and card placement.
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0, t = 0;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
      const L = live.current, g = geo.current;
      if (L.sel < 0 && L.hover < 0 && !reduce) t += dt * L.speed;
      const ty = g.narrow && L.sel >= 0 ? g.cyUp : g.cyBase;
      if (Math.abs(ty - g.cy) > 0.3) { g.cy += (ty - g.cy) * Math.min(1, dt * 8); placeY(); }
      let sx = 0, sy = 0;
      flat.forEach((f, i) => {
        const el = nodeEls.current[i]; if (!el) return;
        const r = g.r[f.yi] ?? 0, dir = L.direction === "alternate" && f.yi % 2 ? -1 : 1;
        const a = f.a0 + dir * t * ((0.16 * (g.r[0] ?? r)) / (r || 1));
        const x = g.cx + r * Math.cos(a), y = g.cy + r * Math.sin(a);
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(var(--ot-k))`;
        if (i === L.sel) { sx = x; sy = y; }
      });
      const c = card.current;
      if (c && L.sel >= 0) {
        let x, y;
        if (g.narrow) { c.style.width = g.w - 24 + "px"; x = 12; y = g.h - c.offsetHeight - 12; }
        else {
          c.style.width = "";
          const cw = c.offsetWidth, ch = c.offsetHeight;
          x = sx >= g.cx ? sx + 34 : sx - 34 - cw;
          if (x + cw > g.w - 12) x = sx - 34 - cw;
          if (x < 12) x = Math.min(g.w - cw - 12, sx + 34);
          y = Math.max(12, Math.min(g.h - ch - 12, sy - ch / 2));
        }
        c.style.transform = "";
        c.style.left = x + "px"; c.style.top = y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [flat, placeY]);

  const select = React.useCallback((i) => {
    setSel(i);
    if (!onSelect) return;
    if (i < 0) onSelect(null);
    else { const f = flat[i]; onSelect({ year: data[f.yi], event: data[f.yi].events[f.ei], index: i }); }
  }, [flat, data, onSelect]);

  const step = (d) => select((sel + d + flat.length) % flat.length);
  const activeYear = sel >= 0 ? flat[sel]?.yi ?? -1 : hover;
  const current = sel >= 0 ? flat[sel] : null;
  const curYear = current ? data[current.yi] : null;
  const curEvent = current && curYear ? curYear.events[current.ei] : null;
  const pad = (n) => String(n).padStart(2, "0");

  const rootStyle = {
    ...style,
    "--ot-ig": `url(#${gradId})`,
    "--ot-year-font": yearFont,
  };

  return (
    <div
      ref={root}
      data-ot={theme === "auto" ? undefined : theme}
      role="region"
      aria-label="Timeline"
      className={["ot-root", activeYear >= 0 ? "ot-focus" : "", showYears ? "" : "ot-no-years", className].filter(Boolean).join(" ")}
      style={rootStyle}
      onClick={() => select(-1)}
      onKeyDown={(e) => {
        if (sel < 0) return;
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
        else if (e.key === "Escape") select(-1);
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0" style={{ stopColor: "var(--ot-ig0)" }} />
            <stop offset="1" style={{ stopColor: "var(--ot-ig1)" }} />
          </linearGradient>
        </defs>
      </svg>

      {data.map((y, i) => (
        <div
          key={`o${i}`}
          ref={(el) => { orbitEls.current[i] = el; }}
          className={["ot-orbit", i === activeYear ? "ot-on" : "", i >= shown ? "ot-hidden" : ""].join(" ")}
        >
          <i className="ot-ln" />
          <i className="ot-ac" />
        </div>
      ))}

      {data.map((y, i) => (
        <button
          key={`y${i}`}
          type="button"
          ref={(el) => { yearEls.current[i] = el; }}
          className={["ot-year", i === activeYear ? "ot-on" : "", i >= shown ? "ot-hidden" : ""].join(" ")}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          onClick={(e) => { e.stopPropagation(); const first = flat.findIndex((f) => f.yi === i); if (first >= 0) select(first); }}
        >
          {y.year}
        </button>
      ))}

      <i className="ot-emit" ref={(el) => { emitEls.current[0] = el; }} />
      <i className="ot-emit ot-emit-2" ref={(el) => { emitEls.current[1] = el; }} />
      <i className="ot-emit ot-emit-3" ref={(el) => { emitEls.current[2] = el; }} />
      <div className="ot-core" ref={core} aria-hidden="true">
        <div className="ot-core-fill">
          <div className="ot-blob ot-b1" />
          <div className="ot-blob ot-b2" />
          <div className="ot-blob ot-b3" />
          <div className="ot-blob ot-b4" />
        </div>
        <div className="ot-core-gloss" />
        <div className="ot-core-shine" />
      </div>

      {flat.map((f, i) => {
        const y = data[f.yi], ev = y.events[f.ei];
        return (
          <button
            key={`n${i}`}
            type="button"
            ref={(el) => { nodeEls.current[i] = el; }}
            aria-label={`${ev.title}, ${ev.date ? ev.date + " " : ""}${y.year}`}
            aria-pressed={i === sel}
            className={["ot-node", f.yi === activeYear ? "ot-on" : "", i === sel ? "ot-sel" : "", f.yi >= nodesShown ? "ot-hidden" : ""].join(" ")}
            onMouseEnter={() => setHover(f.yi)}
            onMouseLeave={() => setHover(-1)}
            onClick={(e) => { e.stopPropagation(); select(sel === i ? -1 : i); }}
          >
            {ev.icon ?? <span className="ot-dot" />}
          </button>
        );
      })}

      <div
        ref={card}
        role="dialog"
        aria-live="polite"
        aria-hidden={!curEvent}
        className={["ot-card", curEvent ? "ot-open" : ""].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {curEvent && curYear && (
          <>
            <div className="ot-card-meta">
              <span>{curEvent.date ? `${curEvent.date} ${curYear.year}` : curYear.year}</span>
              <span>{pad(sel + 1)} / {pad(flat.length)}</span>
            </div>
            <h4 className="ot-card-title">{curEvent.title}</h4>
            {curEvent.description && <p className="ot-card-text">{curEvent.description}</p>}
            <div className="ot-card-nav">
              <button type="button" onClick={() => step(-1)}>← Prev</button>
              <button type="button" onClick={() => step(1)}>Next →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Journey --------------------------------- */

export default function Journey({
  journey = DEFAULT_JOURNEY,
  theme = "auto", // "auto" follows your site's .dark class; or force "dark" | "light"
  speed = 1,
  direction = "alternate",
  height = "min(86vh, 760px)",
  className,
}) {
  const data = React.useMemo(() => groupByYear(journey), [journey]);
  if (data.length === 0) return null;

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")} style={{ height }}>
      <OrbitTimeline data={data} theme={theme} speed={speed} direction={direction} showYears />
    </div>
  );
}