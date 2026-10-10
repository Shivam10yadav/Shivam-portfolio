import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaBook,
  FaGithub,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaTwitter,
} from "react-icons/fa";

/* ---------------------------------------------------------------------------
 * Dock — everything in one file.
 * Usage:  <Dock theme={theme} toggleTheme={toggleTheme} />
 *
 * Desktop: unchanged (magnifying dock).
 * Phone / touch (<= 640px wide or coarse pointer): a slim, flat pill —
 * smaller icons, no magnify, no hover tooltips, safe-area aware, and it can
 * never be wider than the screen.
 * ------------------------------------------------------------------------- */

// desktop
const BASE_SIZE = 40; // icon size when the mouse is far away
const MAGNIFICATION = 72; // icon size when the mouse is right on it
const DISTANCE = 120; // how far the magnify effect reaches (px)
const PANEL_HEIGHT = 64;
// mobile
const M_BASE_SIZE = 34;
const M_PANEL_HEIGHT = 48;

const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const COMPACT_QUERY = "(max-width: 640px), (pointer: coarse)";

const DockContext = createContext(null);

function useDock() {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("DockBar parts must be used inside <DockBar>");
  return ctx;
}

function useCompact() {
  const [compact, setCompact] = useState(
    () => typeof window !== "undefined" && window.matchMedia(COMPACT_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}

function DockBar({ children, className = "", compact }) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const base = compact ? M_BASE_SIZE : BASE_SIZE;
  const mag = compact ? M_BASE_SIZE : MAGNIFICATION;
  const panel = compact ? M_PANEL_HEIGHT : PANEL_HEIGHT;

  // outer wrapper grows upward while hovering so magnified icons have room
  const maxHeight = useMemo(
    () => (compact ? M_PANEL_HEIGHT : Math.max(128, MAGNIFICATION + MAGNIFICATION / 2 + 4)),
    [compact]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panel, maxHeight]);
  const height = useSpring(heightRow, SPRING);

  const ctx = useMemo(
    () => ({ mouseX, compact, base, mag }),
    [mouseX, compact, base, mag]
  );

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="mx-2 flex max-w-full items-end"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          if (compact) return;
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        style={{ height: panel }}
        className={`mx-auto flex w-fit max-w-full items-end ${
          compact ? "gap-1.5 px-3 pb-[7px]" : "gap-3 px-4 pb-3"
        } ${className}`}
        role="toolbar"
        aria-label="Quick links"
      >
        <DockContext.Provider value={ctx}>{children}</DockContext.Provider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, href, onClick, label }) {
  const ref = useRef(null);
  const { mouseX, compact, base, mag } = useDock();
  const isHovered = useMotionValue(0);

  // distance between the mouse and the center of this item
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-DISTANCE, 0, DISTANCE],
    [base, mag, base]
  );
  const width = useSpring(widthTransform, SPRING);

  const Comp = href ? motion.a : motion.button;
  const extra = href
    ? {
        href,
        ...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
      }
    : { type: "button", onClick };

  return (
    <Comp
      ref={ref}
      aria-label={label}
      style={{ width }}
      onHoverStart={() => !compact && isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => !compact && isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      whileTap={compact ? { scale: 0.88 } : undefined}
      className={`relative inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 ${
        compact
          ? "bg-transparent active:bg-neutral-200/70 dark:active:bg-neutral-700/60"
          : "bg-neutral-100 dark:bg-neutral-800"
      }`}
      {...extra}
    >
      {/* DockLabel / DockIcon receive width + isHovered from here */}
      {Children.map(children, (child) =>
        cloneElement(child, { width, isHovered })
      )}
    </Comp>
  );
}

function DockLabel({ children, isHovered }) {
  const { compact } = useDock();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (v) => setVisible(v === 1));
    return () => unsubscribe();
  }, [isHovered]);

  // no hover tooltips on touch screens (they'd stick after a tap)
  if (compact) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ x: "-50%" }}
          role="tooltip"
          className="pointer-events-none absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, width }) {
  const { compact } = useDock();
  // desktop: icon is half the bubble; mobile: a bit larger since the bubble is smaller
  const ratio = compact ? 0.56 : 0.5;
  const iconWidth = useTransform(width, (val) => val * ratio);
  return (
    <motion.div
      style={{ width: iconWidth }}
      className="flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ the actual dock ---------------------------- */

const LINKS = [
  { Icon: FaHome, label: "Home", href: "#" },
  { Icon: FaBook, label: "Resume", href: "#resume" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Shivam10yadav/" },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shivam10yadav/",
  },
  { Icon: FaTwitter, label: "X", href: "https://x.com/Y80Shivam" },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/shivam05_10/",
  },
];

export default function Dock({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const compact = useCompact();

  return (
    // full-width fixed strip so framer's transforms never fight a tailwind translate
    <div
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
      style={{ bottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pointer-events-auto max-w-full"
      >
        <DockBar
          compact={compact}
          className={`rounded-full border border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90 ${
            compact ? "shadow-md" : "shadow-lg"
          }`}
        >
          {LINKS.map(({ Icon, label, href }) => (
            <DockItem key={label} href={href} label={label}>
              <DockLabel>{label}</DockLabel>
              <DockIcon>
                <Icon className="h-full w-full" />
              </DockIcon>
            </DockItem>
          ))}

          <div
            className={`w-px shrink-0 bg-neutral-200 dark:bg-neutral-700 ${
              compact ? "mb-[9px] h-4" : "mb-2 h-6"
            }`}
          />

          <DockItem onClick={toggleTheme} label="Toggle theme">
            <DockLabel>{isDark ? "Light mode" : "Dark mode"}</DockLabel>
            <DockIcon>
              {isDark ? (
                <FaSun className="h-full w-full" />
              ) : (
                <FaMoon className="h-full w-full" />
              )}
            </DockIcon>
          </DockItem>
        </DockBar>
      </motion.div>
    </div>
  );
}