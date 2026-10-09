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
 * ------------------------------------------------------------------------- */

const BASE_SIZE = 40; // icon size when the mouse is far away
const MAGNIFICATION = 72; // icon size when the mouse is right on it
const DISTANCE = 120; // how far the magnify effect reaches (px)
const PANEL_HEIGHT = 64;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

const DockContext = createContext(null);

function useDock() {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("DockBar parts must be used inside <DockBar>");
  return ctx;
}

function DockBar({ children, className = "" }) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // outer wrapper grows upward while hovering so magnified icons have room
  const maxHeight = useMemo(
    () => Math.max(128, MAGNIFICATION + MAGNIFICATION / 2 + 4),
    []
  );
  const heightRow = useTransform(isHovered, [0, 1], [PANEL_HEIGHT, maxHeight]);
  const height = useSpring(heightRow, SPRING);

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className="mx-2 flex max-w-full items-end"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        style={{ height: PANEL_HEIGHT }}
        className={`mx-auto flex w-fit items-end gap-3 px-4 pb-3 ${className}`}
        role="toolbar"
        aria-label="Quick links"
      >
        <DockContext.Provider value={{ mouseX }}>
          {children}
        </DockContext.Provider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, href, onClick, label }) {
  const ref = useRef(null);
  const { mouseX } = useDock();
  const isHovered = useMotionValue(0);

  // distance between the mouse and the center of this item
  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFICATION, BASE_SIZE]
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
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className="relative inline-flex aspect-square items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (v) => setVisible(v === 1));
    return () => unsubscribe();
  }, [isHovered]);

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
  // icon is always half the width of its bubble
  const iconWidth = useTransform(width, (val) => val / 2);
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

  return (
    // full-width fixed strip so framer's transforms never fight a tailwind translate
    <div className="pointer-events-none fixed inset-x-0 bottom-2 z-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pointer-events-auto"
      >
        <DockBar className="rounded-full border border-neutral-200 bg-white/90 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90">
          {LINKS.map(({ Icon, label, href }) => (
            <DockItem key={label} href={href} label={label}>
              <DockLabel>{label}</DockLabel>
              <DockIcon>
                <Icon className="h-full w-full" />
              </DockIcon>
            </DockItem>
          ))}

          <div className="mb-2 h-6 w-px bg-neutral-200 dark:bg-neutral-700" />

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