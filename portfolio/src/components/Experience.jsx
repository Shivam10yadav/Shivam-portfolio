import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaJava, FaWindows, FaDatabase } from "react-icons/fa";
import {
  SiLinux,
  SiNginx,
  SiPhp,
  SiMongodb,
  SiPostman,
  SiGit,
  SiUipath,
} from "react-icons/si";
import { Activity, Search, Bot, ClipboardCheck } from "lucide-react";

const START = new Date(2026, 7, 1); // Aug 2026
const ACCENT = "#F15A24";
const ease = [0.22, 1, 0.36, 1];

const TECH = {
  SQL: { Icon: FaDatabase, color: "#336791" },
  Linux: { Icon: SiLinux, color: "#FCC624" },
  Java: { Icon: FaJava, color: "#ED8B00" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  IIS: { Icon: FaWindows, color: "#0078D4" },
  Nginx: { Icon: SiNginx, color: "#009639" },
  UiPath: { Icon: SiUipath, color: "#FA4616" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  Git: { Icon: SiGit, color: "#F05032" },
};

const experience = {
  start: "Aug 2026",
  end: "Present",
  role: "Application Support Engineer",
  company: "Xtreme Softech",
  location: "Gurugram, India",
  summary:
    "I keep business-critical applications running smoothly: watching production and servers, tracing problems to the root cause through Java and PHP logs, database queries and API responses, and bridging users and developers with clear bug reports, tested fixes and documentation.",
  areas: [
    {
      title: "Monitoring & Reliability",
      Icon: Activity,
      text: "Production, server, SSL, IIS and Nginx health checks.",
      tools: ["Linux", "IIS", "Nginx"],
    },
    {
      title: "Troubleshooting & Analysis",
      Icon: Search,
      text: "Java and PHP log analysis, API, database and integration checks.",
      tools: ["Java", "PHP", "SQL", "MongoDB", "Postman"],
    },
    {
      title: "Automation",
      Icon: Bot,
      text: "UiPath bot execution, monitoring, failure review and re-runs.",
      tools: ["UiPath", "Linux"],
    },
    {
      title: "Quality & Documentation",
      Icon: ClipboardCheck,
      text: "Functional testing, bug reporting and technical documentation.",
      tools: ["Git", "Postman"],
    },
  ],
  tools: Object.keys(TECH),
};

function getDuration() {
  const now = new Date();
  const months =
    (now.getFullYear() - START.getFullYear()) * 12 +
    (now.getMonth() - START.getMonth());
  if (months < 1) return "Just started";
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

function TechIcon({ name, size = 16, colored = false, className = "" }) {
  const entry = TECH[name];
  if (!entry) return null;
  const { Icon, color } = entry;
  return (
    <Icon
      size={size}
      aria-hidden="true"
      className={className}
      style={colored ? { color } : undefined}
    />
  );
}

export default function Experience() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);

  const activeTools = useMemo(
    () => (hovered !== null ? experience.areas[hovered].tools : null),
    [hovered]
  );

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section id="experience" className="w-full py-16 sm:py-24">
      {/* Eyebrow */}
      <motion.div {...reveal()}>
        <div className="flex items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>Experience</span>
          <span>
            {experience.start} &mdash; {experience.end} ({getDuration()})
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-neutral-200 dark:bg-neutral-800" />
      </motion.div>

      {/* Masthead */}
      <motion.div {...reveal(0.05)} className="mt-8 sm:mt-10">
        <h2
          className="text-4xl font-bold leading-[1.06] tracking-tight text-neutral-900 dark:text-white sm:text-6xl"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {experience.role}
          <span style={{ color: ACCENT }}>.</span>
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-base sm:text-lg">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {experience.company}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span className="text-neutral-500">{experience.location}</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            On the support desk
          </span>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.p
        {...reveal(0.1)}
        className="mt-8 max-w-3xl text-base leading-8 text-neutral-700 dark:text-neutral-300 sm:text-lg"
      >
        {experience.summary}
      </motion.p>

      {/* Core focus */}
      <div
        onMouseLeave={() => setHovered(null)}
        className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800"
      >
        {experience.areas.map((area, i) => {
          const isActive = hovered === i;
          const isDimmed = hovered !== null && !isActive;
          const AreaIcon = area.Icon;

          return (
            <div
              key={area.title}
              tabIndex={0}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className={`grid items-center gap-3 py-5 outline-none transition-opacity duration-300 lg:grid-cols-12 lg:gap-6 ${
                isDimmed ? "opacity-40" : "opacity-100"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors lg:col-span-1 ${
                  isActive
                    ? "border-[#F15A24] text-[#F15A24]"
                    : "border-neutral-200 text-neutral-400 dark:border-neutral-800"
                }`}
              >
                <AreaIcon size={17} aria-hidden="true" />
              </span>

              <h3
                className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-xl lg:col-span-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {area.title}
              </h3>

              <p className="text-sm text-neutral-500 dark:text-neutral-400 lg:col-span-5">
                {area.text}
              </p>

              <div className="flex flex-wrap gap-3 lg:col-span-2 lg:justify-end">
                {area.tools.map((t) => (
                  <span key={t} title={t} className="text-neutral-400">
                    <TechIcon name={t} size={18} colored={isActive} />
                    <span className="sr-only">{t}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="font-mono text-xs text-neutral-500">Stack</span>
        {experience.tools.map((tool) => {
          const isHighlighted = activeTools?.includes(tool);
          const isMuted = activeTools && !isHighlighted;
          return (
            <span
              key={tool}
              style={{ "--c": TECH[tool].color }}
              className={`group flex cursor-default items-center gap-2 font-mono text-sm transition-opacity duration-200 ${
                isMuted ? "opacity-30" : "opacity-100"
              } ${
                isHighlighted
                  ? "font-semibold text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <TechIcon
                name={tool}
                size={16}
                colored={isHighlighted}
                className="transition-colors group-hover:text-[color:var(--c)]"
              />
              {tool}
            </span>
          );
        })}
      </div>
    </section>
  );
}