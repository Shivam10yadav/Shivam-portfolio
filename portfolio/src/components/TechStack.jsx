import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaPython,
  FaServer,
  FaShieldAlt,
  FaLaptopCode,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReactrouter,
  SiFramer,
  SiExpress,
  SiSocketdotio,
  SiAxios,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiVercel,
  SiRender,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
} from "react-icons/si";

/**
- Tech Stack "constellation": four clusters, each a hub with its tools in an
- orbit around it. Icons stay minimal black/white at rest and reveal their
- brand colour when you hover. Tiles swell as the pointer gets close (the
- same effect as the dock), neighbours stir, and the link to the hovered tool
- lights up.
 */

// Field coordinate system (every cluster uses it): 100 wide x 66 tall.
const W = 100;
const H = 66;
const CX = 50;
const CY = 33;
const R = 26; // orbit radius

// color: null = keep the theme colour (black / white) on hover.
const GROUPS = [
  {
    title: "Frontend",
    HeadIcon: FaLaptopCode,
    items: [
      { label: "React", Icon: FaReact, color: "#00B7E0" },
      { label: "JavaScript", Icon: SiJavascript, color: "#E5B800" },
      { label: "HTML & CSS", Icon: FaHtml5, color: "#E34F26" },
      { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { label: "Redux", Icon: SiRedux, color: "#764ABC" },
      { label: "React Router", Icon: SiReactrouter, color: "#CA4245" },
      { label: "Framer Motion", Icon: SiFramer, color: "#0055FF" },
    ],
  },
  {
    title: "Backend",
    HeadIcon: FaServer,
    items: [
      { label: "Node.js", Icon: FaNodeJs, color: "#3C873A" },
      { label: "Express.js", Icon: SiExpress, color: "#888888" },
      { label: "Python", Icon: FaPython, color: "#3776AB" },
      { label: "REST APIs", Icon: FaServer, color: "#6366F1" },
      { label: "JWT Authentication", Icon: FaShieldAlt, color: "#0F766E" },
      { label: "Socket.io", Icon: SiSocketdotio, color: "#010101" },
      { label: "Axios", Icon: SiAxios, color: "#5A29E4" },
    ],
  },
  {
    title: "Database & Cloud",
    HeadIcon: FaDatabase,
    items: [
      { label: "MongoDB", Icon: SiMongodb, color: "#13AA52" },
      { label: "MySQL", Icon: SiMysql, color: "#00618A" },
      { label: "Firebase", Icon: SiFirebase, color: "#FFA000" },
      { label: "Vercel", Icon: SiVercel, color: "#000000" },
      { label: "Render", Icon: SiRender, color: "#2BC9A0" },
    ],
  },
  {
    title: "Tools & DevOps",
    HeadIcon: FaCode,
    items: [
      { label: "Git", Icon: SiGit, color: "#F05032" },
      { label: "GitHub", Icon: SiGithub, color: "#181717" },
      { label: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
      { label: "Docker", Icon: SiDocker, color: "#2496ED" },
    ],
  },
];

function Tile({ item, index, pos, size, px, py, isActive, reduced, delay }) {
  const { Icon } = item;
  const brandColor = item.color || "#6366F1";

  // How close the pointer is to this tile (0..1), smoothed with a spring.
  const near = useTransform([px, py], ([x, y]) => {
    if (reduced || !Number.isFinite(x)) return 0;
    const d = Math.hypot(x - pos.x, y - pos.y);
    return Math.max(0, 1 - d / 24) ** 2;
  });
  const swell = useSpring(near, { stiffness: 420, damping: 32, mass: 0.6 });
  const scale = useTransform(swell, (v) => 1 + v * 0.6);
  const lift = useTransform(swell, (v) => -v * 10);
  const z = useTransform(swell, (v) => (v > 0.25 ? 20 : 1));

  return (
    <motion.div
      className="absolute"
      style={{
        left: pos.x + "%",
        top: (pos.y / H) * 100 + "%",
        width: size + "cqw",
        height: size + "cqw",
        marginLeft: -size / 2 + "cqw",
        marginTop: -size / 2 + "cqw",
        zIndex: z,
      }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          delay: delay + index * 0.07,
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
      >
        <motion.div className="h-full w-full" style={{ scale, y: lift }}>
          <motion.div
            className="h-full w-full"
            animate={reduced ? undefined : { y: [0, -4, 0] }}
            transition={{
              duration: 4 + (index % 3) * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          >
            <div
              className={
                "relative grid h-full w-full place-items-center rounded-[26%] border shadow-sm transition-all duration-300 " +
                (isActive
                  ? "border-neutral-900 dark:border-white shadow-md"
                  : "border-neutral-200/60 dark:border-neutral-700/60")
              }
              style={{
                backgroundColor: `${brandColor}15`, // soft colorful tinted background (approx 8-10% opacity)
              }}
            >
              <Icon
                aria-hidden="true"
                style={{
                  width: "52%",
                  height: "52%",
                  color: brandColor,
                  transition: "color .25s",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Label (outside the scaled layers so the text never grows) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 mb-5 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 dark:bg-white dark:text-neutral-900"
        style={{ opacity: isActive ? 1 : 0 }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

function Cluster({ group, delay }) {
  const { title, HeadIcon, items } = group;
  const field = useRef(null);
  const reduced = useReducedMotion() ?? false;
  const px = useMotionValue(Number.POSITIVE_INFINITY);
  const py = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = useState(-1);

  // Hub in the middle, everything else evenly around the orbit.
  const sats = items.length - 1;
  const positions = [
    { x: CX, y: CY },
    ...Array.from({ length: sats }, (_, i) => {
      const a = ((-90 + (i * 360) / sats) * Math.PI) / 180;
      return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
    }),
  ];

  const track = (e) => {
    const el = field.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const y = ((e.clientY - r.top) / r.height) * H;
    px.set(x);
    py.set(y);
    let best = -1;
    let bestD = 11;
    positions.forEach((p, i) => {
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive((prev) => (prev === best ? prev : best));
  };

  const leave = () => {
    px.set(Number.POSITIVE_INFINITY);
    py.set(Number.POSITIVE_INFINITY);
    setActive(-1);
  };

  return (
    <div>
      {/* Cluster label */}
      <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
          <HeadIcon size={14} aria-hidden="true" />
        </span>
        <div>
          <p
            className="text-sm font-semibold leading-tight text-neutral-900 dark:text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </p>
          <p className="text-[11px] leading-tight text-neutral-700 dark:text-neutral-300">
            {items.length} tools · hover to discover
          </p>
        </div>
      </div>

      {/* The orbit field */}
      <div
        ref={field}
        role="list"
        aria-label={title}
        onPointerMove={track}
        onPointerDown={track}
        onPointerLeave={leave}
        onPointerUp={(e) => {
          if (e.pointerType !== "mouse") leave();
        }}
        onPointerCancel={leave}
        className="relative w-full touch-pan-y"
        style={{ aspectRatio: W + " / " + H, containerType: "inline-size" }}
      >
        <svg
          viewBox={"0 0 " + W + " " + H}
          className="pointer-events-none absolute inset-0 h-full w-full text-neutral-900 dark:text-white"
          fill="none"
          aria-hidden="true"
        >
          {/* slow dashed orbit */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            stroke="currentColor"
            strokeOpacity={0.18}
            strokeWidth={1}
            strokeDasharray="1.5 3"
            vectorEffect="non-scaling-stroke"
            style={{ originX: 0.5, originY: 0.5 }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          {/* links from hub to every tool; the hovered one lights up */}
          {positions.slice(1).map((p, i) => {
            const idx = i + 1;
            const lit = active === idx || active === 0;
            return (
              <motion.line
                key={items[idx].label}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, strokeOpacity: 0.16 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                animate={{ strokeOpacity: lit ? 0.6 : 0.16 }}
                transition={{ duration: 0.6, delay: delay + 0.3 }}
              />
            );
          })}
        </svg>

        {items.map((item, i) => (
          <Tile
            key={item.label}
            item={item}
            index={i}
            pos={positions[i]}
            size={i === 0 ? 19 : 13.5}
            px={px}
            py={py}
            isActive={active === i}
            reduced={reduced}
            delay={delay}
          />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);
  return (
    // Breaks out of the narrow column so the four clusters have room.
    <div className="relative left-1/2 w-[min(94vw,64rem)] -translate-x-1/2">
      <div className="relative grid gap-y-10 md:grid-cols-2 md:gap-x-20 lg:gap-x-32">
        {GROUPS.map((g, i) => (
          <Cluster key={g.title} group={g} delay={i * 0.12} />
        ))}

        {/* Centre badge (desktop only) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-dashed border-neutral-400 dark:border-neutral-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <div className="text-center">
            <p
              className="text-4xl font-bold leading-none text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {total}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300">
              technologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}