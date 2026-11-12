"use client";

import * as React from "react";

/* ---------------------------------------------------------------------------
 * JourneyMetro — Unobstructed Floating Modal Edition (Single-file, React)
 *
 *   <Journey journey={journey} />     // journey = [{ year, title, description }]
 *
 * - The entire transit track and train remain completely unblocked and visible.
 * - Clicking any station opens a sleek modal card positioned in the corner or
 *   centered overlay without blocking the active route canvas.
 * - Includes 2-car articulated train, spring physics, keyboard navigation,
 *   and autoplay progress indicator.
 * ------------------------------------------------------------------------- */

const TAGS = ["Foundations", "Full-Stack", "Production", "Launch"];
const GLYPHS = ["</>", "{ }", "▲", "✦"];
const COLORS = [
  ["#e5262c", "#7a0f14"],
  ["#f97316", "#7c2d12"],
  ["#8b5cf6", "#3b1d8a"],
  ["#10b981", "#064e3b"],
];
const PORTRAIT_BELOW = 640;

const cx = (...c) => c.filter(Boolean).join(" ");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const clip = (s, m) => (s.length > m ? s.slice(0, m - 1) + "…" : s);

function cover(year, glyph, [from, to], index) {
  const esc = glyph.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const stn = `STN-${String(index + 1).padStart(2, "0")}`;
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">' +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>` +
    `<pattern id="p" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="1"/></pattern>` +
    `</defs>` +
    '<rect width="640" height="400" fill="url(#g)"/>' +
    '<rect width="640" height="400" fill="url(#p)"/>' +
    '<path d="M-40 340 L180 340 L340 180 L680 180" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="18" stroke-linecap="round"/>' +
    `<text x="320" y="265" text-anchor="middle" font-family="Arial Black, Helvetica, sans-serif" font-size="180" font-weight="900" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="3">${year}</text>` +
    `<text x="38" y="84" font-family="Menlo, Consolas, monospace" font-size="44" font-weight="700" fill="#fff" fill-opacity=".92">${esc}</text>` +
    `<rect x="488" y="46" width="114" height="34" rx="17" fill="#000" fill-opacity=".28"/>` +
    `<text x="545" y="68" text-anchor="middle" font-family="Menlo, Consolas, monospace" font-size="16" font-weight="700" letter-spacing="1.5" fill="#fff" fill-opacity=".92">${stn}</text>` +
    "</svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Roomy geometry
function geometry(portrait, n) {
  if (!portrait) {
    return { w: 1400, h: 480, pts: [[100, 380], [500, 380], [780, 130], [1300, 130]] };
  }
  const h = 320 + Math.max(n, 2) * 120;
  return { w: 440, h, pts: [[90, 80], [90, h * 0.28], [210, h * 0.28 + 120], [210, h - 120]] };
}

function roundedPath(pts, cut = 64) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i];
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i + 1];
    const l1 = Math.hypot(px - ax, py - ay);
    const l2 = Math.hypot(bx - px, by - py);
    const c = Math.min(cut, l1 / 2, l2 / 2);
    const sx = px - ((px - ax) / l1) * c;
    const sy = py - ((py - ay) / l1) * c;
    const ex = px + ((bx - px) / l2) * c;
    const ey = py + ((by - py) / l2) * c;
    d += ` L${sx.toFixed(1)} ${sy.toFixed(1)} Q${px} ${py} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last[0]} ${last[1]}`;
}

export default function Journey({ journey = [], autoplay = true, interval = 4500 }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wrapRef = React.useRef(null);
  const pathRef = React.useRef(null);
  const progRef = React.useRef(null);
  const glowRef = React.useRef(null);
  const car1Ref = React.useRef(null);
  const car2Ref = React.useRef(null);
  const floatingRef = React.useRef(null);

  const pos = React.useRef(0);
  const vel = React.useRef(0);
  const layoutRef = React.useRef(null);
  const activeRef = React.useRef(0);

  const [portrait, setPortrait] = React.useState(false);
  const [layout, setLayout] = React.useState(null);
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(null);
  const [playing, setPlaying] = React.useState(autoplay);
  const [hold, setHold] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const [reduced, setReduced] = React.useState(false);
  const [inspectIndex, setInspectIndex] = React.useState(null); // null = no floating card open

  const items = React.useMemo(
    () =>
      journey.map((item, i) => ({
        date: item.year,
        title: item.title,
        description: item.description,
        tag: item.tag || TAGS[i % TAGS.length],
        color: item.color || COLORS[i % COLORS.length][0],
        image: item.image || cover(item.year, GLYPHS[i % GLYPHS.length], COLORS[i % COLORS.length], i),
      })),
    [journey],
  );

  const n = items.length;
  const geo = React.useMemo(() => geometry(portrait, n), [portrait, n]);
  const d = React.useMemo(() => roundedPath(geo.pts), [geo]);
  const safe = Math.min(active, Math.max(0, n - 1));
  activeRef.current = safe;
  layoutRef.current = layout;

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useLayoutEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const measure = () => setPortrait(node.clientWidth < PORTRAIT_BELOW);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Measure route
  React.useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || n === 0) return;
    const len = path.getTotalLength();
    const samples = [];
    for (let a = 0; a <= len; a += 8) {
      const p = path.getPointAtLength(a);
      samples.push({ x: p.x, y: p.y });
    }
    const clear = (x, y) => samples.reduce((m, p) => Math.min(m, Math.hypot(p.x - x, p.y - y)), Infinity);
    const padding = Math.min(len * 0.08, 90);
    const usableLen = len - padding * 2;

    const stops = items.map((_, k) => {
      const at = n === 1 ? len / 2 : padding + (usableLen * k) / (n - 1);
      const p = path.getPointAtLength(at);
      return { x: p.x, y: p.y, at };
    });

    const labels = stops.map((s, k) => {
      if (portrait) {
        let mx = s.x;
        samples.forEach((p) => {
          if (Math.abs(p.y - s.y) <= 28 && p.x > mx) mx = p.x;
        });
        return { x: mx + 30, anchor: "start", side: 0 };
      }
      let side = k % 2 === 0 ? -1 : 1;
      if (clear(s.x, s.y + side * 55) < 42 && clear(s.x, s.y - side * 55) > clear(s.x, s.y + side * 55)) side = -side;
      return { x: clamp(s.x, 110, geo.w - 110), anchor: "middle", side };
    });

    layoutRef.current = { len, stops, labels };
    pos.current = stops[Math.min(activeRef.current, n - 1)].at;
    vel.current = 0;
    setLayout({ len, stops, labels });
  }, [d, n, portrait, items, geo.w]);

  const paint = React.useCallback(() => {
    const L = layoutRef.current;
    const path = pathRef.current;
    if (!L || !path) return;

    const placeCar = (el, dist) => {
      if (!el) return;
      const clamped = clamp(dist, 0, L.len);
      const p = path.getPointAtLength(clamped);
      const a = path.getPointAtLength(Math.min(L.len, clamped + 3));
      const b = path.getPointAtLength(Math.max(0, clamped - 3));
      const ang = (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;
      el.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
    };

    const at = pos.current;
    placeCar(car1Ref.current, at);
    placeCar(car2Ref.current, Math.max(0, at - 38));

    const dash = `${at} ${L.len + 20}`;
    if (progRef.current) progRef.current.style.strokeDasharray = dash;
    if (glowRef.current) glowRef.current.style.strokeDasharray = dash;
  }, []);

  React.useLayoutEffect(() => {
    paint();
  }, [layout, paint]);

  // Train physics
  React.useEffect(() => {
    if (!layout) return;
    const target = layout.stops[safe].at;
    if (reduced) {
      pos.current = target;
      vel.current = 0;
      paint();
      return;
    }
    let raf = 0;
    let last = 0;
    const stiffness = 45;
    const damping = 13;

    const frame = (t) => {
      const dt = Math.min(0.04, (t - (last || t)) / 1000);
      last = t;
      const diff = target - pos.current;
      if (Math.abs(diff) < 0.35 && Math.abs(vel.current) < 1) {
        pos.current = target;
        vel.current = 0;
        paint();
        return;
      }
      const accel = diff * stiffness - vel.current * damping;
      vel.current += accel * dt;
      pos.current += vel.current * dt;
      paint();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [layout, safe, reduced, paint]);

  // Autoplay loop
  React.useEffect(() => {
    if (!playing || hold || reduced || !inView || n < 2 || inspectIndex !== null) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), interval);
    return () => window.clearInterval(t);
  }, [playing, hold, reduced, inView, n, interval, inspectIndex]);

  // Floating card entrance animation
  React.useEffect(() => {
    if (inspectIndex === null || reduced || !floatingRef.current) return;
    const a = floatingRef.current.animate(
      [
        { opacity: 0, transform: "translateY(10px) scale(0.97)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 220, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    return () => a.cancel();
  }, [inspectIndex, reduced]);

  if (n === 0) return null;

  const selectStop = (i) => {
    setPlaying(false);
    const clamped = clamp(i, 0, n - 1);
    setActive(clamped);
  };

  const handleKeyDown = (e) => {
    if (inspectIndex !== null) {
      if (e.key === "Escape") setInspectIndex(null);
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      selectStop(safe + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      selectStop(safe - 1);
    }
  };

  const inspectItem = inspectIndex !== null ? items[inspectIndex] : null;

  return (
    <div
      className="w-full text-foreground select-none relative"
      onKeyDown={handleKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
    >
      <div ref={wrapRef} className="mx-auto w-full max-w-[1280px] px-4 sm:px-8">
        {/* Main Bounded Frame — 100% Unobstructed Train & Track View */}
        <div
          className={cx(
            "relative mx-auto w-full overflow-hidden rounded-3xl border border-border bg-card/40 shadow-sm",
            portrait && "max-w-[440px]",
          )}
          style={{ aspectRatio: `${geo.w} / ${geo.h}` }}
        >
          {/* Metro Map SVG */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${geo.w} ${geo.h}`}
            className="absolute inset-0 size-full"
            style={{ color: items[safe].color }}
          >
            <defs>
              <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground" />
              </pattern>
              <radialGradient id={`${uid}-fade`}>
                <stop offset="0.6" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </radialGradient>
              <mask id={`${uid}-mask`}>
                <rect width={geo.w} height={geo.h} fill={`url(#${uid}-fade)`} />
              </mask>
              <linearGradient id={`${uid}-beam`} x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.45" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect width={geo.w} height={geo.h} fill={`url(#${uid}-grid)`} mask={`url(#${uid}-mask)`} opacity="0.06" />

            <path d={d} fill="none" className="stroke-muted" strokeWidth="22" strokeLinecap="round" opacity="0.65" />
            <path ref={pathRef} d={d} fill="none" className="stroke-border" strokeWidth="11" strokeLinecap="round" />
            <path
              d={d}
              fill="none"
              className="stroke-background"
              strokeWidth="2.5"
              strokeDasharray="6 8"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              ref={glowRef}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.22"
              className="transition-colors duration-500"
              style={{ strokeDasharray: "0 9999" }}
            />
            <path
              ref={progRef}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              className="transition-colors duration-500"
              style={{ strokeDasharray: "0 9999" }}
            />

            {/* Stations & Labels */}
            {layout &&
              layout.stops.map((s, k) => {
                const on = k === safe;
                const isHover = k === hovered;
                const reached = k <= safe;
                const lab = layout.labels[k];
                const it = items[k];
                const textCls = on
                  ? "fill-foreground"
                  : isHover
                    ? "fill-foreground/85"
                    : "fill-muted-foreground";

                return (
                  <g key={k} className="transition-opacity duration-300">
                    {isHover && !on && (
                      <circle cx={s.x} cy={s.y} r="22" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.35" />
                    )}

                    {on && !reduced && (
                      <circle
                        cx={s.x}
                        cy={s.y}
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="animate-ping"
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                    )}

                    <circle
                      cx={s.x}
                      cy={s.y}
                      r={on ? 15 : isHover ? 13 : 11}
                      strokeWidth={on ? 6 : 4}
                      className={cx(
                        "fill-background transition-all duration-300",
                        reached || isHover ? "stroke-current" : "stroke-border",
                      )}
                    />

                    {on && <circle cx={s.x} cy={s.y} r="5" fill="currentColor" />}

                    {portrait ? (
                      <g className="transition-transform duration-200" transform={isHover && !on ? "translate(3 0)" : undefined}>
                        <text x={lab.x} y={s.y - 3} fontSize="20" fontWeight="800" className={textCls}>
                          {it.date}
                        </text>
                        <text x={lab.x} y={s.y + 18} fontSize="14.5" fontWeight={on ? 600 : 500} className={textCls}>
                          {clip(it.title, 22)}
                        </text>
                      </g>
                    ) : (
                      <g
                        className="transition-transform duration-200"
                        transform={isHover && !on ? `translate(0 ${lab.side * 2})` : undefined}
                      >
                        <text
                          x={lab.x}
                          y={lab.side < 0 ? s.y - 56 : s.y + 50}
                          textAnchor="middle"
                          fontSize="23"
                          fontWeight="800"
                          className={textCls}
                        >
                          {it.date}
                        </text>
                        <text
                          x={lab.x}
                          y={lab.side < 0 ? s.y - 32 : s.y + 73}
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight={on ? 600 : 500}
                          className={textCls}
                        >
                          {clip(it.title, 28)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

            {/* Articulated Metro Train */}
            {layout && (
              <g>
                <g ref={car2Ref}>
                  <rect
                    x="-15"
                    y="-7.5"
                    width="30"
                    height="15"
                    rx="6.5"
                    className="stroke-background transition-colors duration-500"
                    strokeWidth="2.5"
                    paintOrder="stroke"
                    fill="currentColor"
                    opacity="0.85"
                  />
                  {[-7, 7].map((x) => (
                    <rect key={x} x={x - 3} y="-2.5" width="6" height="5" rx="1.5" className="fill-background" opacity="0.9" />
                  ))}
                </g>

                <g ref={car1Ref}>
                  <polygon points="17,-4 54,-15 54,15 17,4" fill={`url(#${uid}-beam)`} />
                  <rect x="-23" y="-2.5" width="8" height="5" rx="2" fill="currentColor" opacity="0.7" />
                  <rect
                    x="-18"
                    y="-9"
                    width="38"
                    height="18"
                    rx="9"
                    className="stroke-background transition-colors duration-500"
                    strokeWidth="3"
                    paintOrder="stroke"
                    fill="currentColor"
                  />
                  {[-8.5, 2].map((x) => (
                    <rect key={x} x={x - 3} y="-3.5" width="7" height="7" rx="1.8" className="fill-background" />
                  ))}
                  <path d="M10 -4.5 C14.5 -4.5, 16 -2, 16 0 C16 2, 14.5 4.5, 10 4.5 Z" className="fill-background" />
                </g>
              </g>
            )}
          </svg>

          {/* Interactive Checkpoint Click Targets */}
          {layout &&
            layout.stops.map((s, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Inspect ${items[k].title}, ${items[k].date}`}
                onClick={() => {
                  setInspectIndex(k);
                  selectStop(k);
                }}
                onMouseEnter={() => setHovered(k)}
                onMouseLeave={() => setHovered(null)}
                className="absolute size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ left: `${(s.x / geo.w) * 100}%`, top: `${(s.y / geo.h) * 100}%` }}
              />
            ))}

          {/* FLOATING CORNER INSPECT CARD (Unobstructed & Clean) */}
          {inspectIndex !== null && inspectItem && (
            <div
              ref={floatingRef}
              className="absolute right-4 bottom-4 z-30 w-[320px] sm:w-[380px] overflow-hidden rounded-2xl border border-border/90 bg-card/95 text-card-foreground shadow-2xl backdrop-blur-md"
            >
              <div
                className="h-1.5 w-full transition-colors duration-500"
                style={{ backgroundColor: inspectItem.color }}
              />

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold text-white text-xs shadow-sm"
                    style={{ backgroundColor: inspectItem.color }}
                  >
                    <span className="size-1.5 rounded-full bg-white" />
                    {inspectItem.date}
                  </span>
                  <span className="rounded-full border border-border bg-muted/70 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {inspectItem.tag}
                  </span>

                  <button
                    type="button"
                    aria-label="Close card"
                    onClick={() => setInspectIndex(null)}
                    className="ml-auto inline-flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="size-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl bg-muted">
                  <img
                    src={inspectItem.image}
                    alt=""
                    draggable={false}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>

                <h3 className="mt-3 text-lg font-bold tracking-tight">
                  {inspectItem.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {inspectItem.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Stop {inspectIndex + 1} of {n}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={inspectIndex === 0}
                      onClick={() => {
                        const prev = inspectIndex - 1;
                        setInspectIndex(prev);
                        selectStop(prev);
                      }}
                      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-xs shadow-sm hover:bg-muted disabled:opacity-40"
                      title="Previous"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={inspectIndex === n - 1}
                      onClick={() => {
                        const next = inspectIndex + 1;
                        setInspectIndex(next);
                        selectStop(next);
                      }}
                      className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-xs shadow-sm hover:bg-muted disabled:opacity-40"
                      title="Next"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}