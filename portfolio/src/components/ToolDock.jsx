import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Fixed per position, so the row leans the same way on every render. */
const TILT = [-7, 5, -4, 8, -6, 4, -8, 6, -3, 7, -5, 6];
/** How many tile widths either side of the pointer still swell. */
const REACH = 1.2;
/** How far a fully swollen tile rises, in tile heights. */
const LIFT = 0.19;
/** Quick to settle, with no wobble. */
const SPRING = { stiffness: 520, damping: 40, mass: 0.5 };

/** How swollen tile `k` is with the pointer at `x`, from 0 to 1. */
function swellAt({ centers, width }, k, x) {
  const center = centers[k];
  if (!Number.isFinite(x) || center === undefined || !width) return 0;
  return Math.max(0, 1 - Math.abs(x - center) / width / REACH) ** 2;
}

/** The tiles deal themselves in, left to right, the first time the row is in view. */
const deal = {
  hidden: { opacity: 0, y: 12, scale: 0.94, filter: "blur(3px)" },
  shown: ({ index, still }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: still
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
    transitionEnd: { filter: "none" },
  }),
};

const DockTile = React.memo(function DockTile({
  item,
  index,
  count,
  pointer,
  layout,
  still,
  overlap,
  magnification,
  tilt,
}) {
  const lean = tilt ? TILT[index % TILT.length] : 0;
  const room = Math.max(0, overlap + magnification / 2);

  const near = useTransform(pointer, (x) =>
    still ? 0 : swellAt(layout.current, index, x)
  );
  const push = useTransform(pointer, (x) => {
    if (still) return 0;
    const { centers, width } = layout.current;
    let shift = 0;
    for (let k = 0; k < centers.length; k++) {
      if (k !== index) {
        shift += swellAt(layout.current, k, x) * (k < index ? 1 : -1);
      }
    }
    return shift * width * room;
  });

  const swell = useSpring(near, SPRING);
  const x = useSpring(push, SPRING);
  const scale = useTransform(swell, (v) => 1 + v * magnification);
  const y = useTransform(swell, (v) => -v * LIFT * layout.current.width);
  const rotate = useTransform(swell, (v) => lean * (1 - v));

  return (
    <motion.li
      data-slot="tool-dock-item"
      custom={{ index, still }}
      variants={deal}
      className="pointer-events-none relative flex"
      style={{
        zIndex: count - index,
        marginLeft:
          index === 0 ? 0 : `calc(var(--tool-dock-size) * ${-overlap})`,
      }}
    >
      <motion.div
        role="img"
        aria-label={item.label}
        style={{
          x,
          y,
          scale,
          rotate,
          width: "var(--tool-dock-size)",
          height: "var(--tool-dock-size)",
        }}
        className="origin-bottom will-change-transform select-none"
      >
        {item.icon}
      </motion.div>
    </motion.li>
  );
});

/**
 * An overlapping, tilted row of tiles that swells around the pointer, with
 * one label that glides to whichever tile is nearest.
 *
 * Props: items [{ label, icon }], size, overlap, magnification, tilt, label, className
 */
export function ToolDock({
  items,
  size = 56,
  overlap = 0.12,
  magnification = 0.28,
  tilt = true,
  label = "Tools",
  className,
  ...props
}) {
  const rail = React.useRef(null);
  const layout = React.useRef({ centers: [], width: 0 });
  const still = useReducedMotion() ?? false;
  const pointer = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = React.useState(null);
  const current = React.useRef(null);
  const [glide, setGlide] = React.useState(false);
  const [at, setAt] = React.useState(0);
  const [text, setText] = React.useState(items[0]?.label ?? "");

  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => {
      const slots = [...el.children];
      layout.current = {
        centers: slots.map((li) => li.offsetLeft + li.offsetWidth / 2),
        width: slots[0]?.offsetWidth ?? 0,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  const track = (clientX) => {
    const el = rail.current;
    if (!el) return;
    const x = clientX - el.getBoundingClientRect().left;
    pointer.set(x);
    const { centers } = layout.current;
    if (centers.length === 0) return;
    let nearest = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(x - centers[i]) < Math.abs(x - centers[nearest])) nearest = i;
    }
    if (nearest === current.current) return;
    setGlide(current.current !== null);
    current.current = nearest;
    setActive(nearest);
    setText(items[nearest].label);
    setAt(centers[nearest]);
  };

  const release = () => {
    pointer.set(Number.POSITIVE_INFINITY);
    current.current = null;
    setActive(null);
  };

  const span =
    1 +
    (items.length - 1) * (1 - overlap) +
    2 * Math.max(0, overlap + magnification / 2);
  const rise = LIFT + magnification;

  return (
    <div
      data-slot="tool-dock"
      className={cn("flex w-full justify-center", className)}
      style={{ containerType: "inline-size" }}
      {...props}
    >
      <div
        className="relative w-fit"
        style={{
          "--tool-dock-size": `min(${size}px, calc((100cqw - 1rem) / ${span}))`,
          "--tool-dock-rise": rise,
          paddingTop:
            "calc(var(--tool-dock-size) * var(--tool-dock-rise) + 2.75rem)",
        }}
      >
        <span
          aria-hidden
          data-slot="tool-dock-tooltip"
          data-state={active === null ? "closed" : "open"}
          className={cn(
            "pointer-events-none absolute left-0 z-50 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-[13px] font-medium text-neutral-900 shadow-sm opacity-0 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white motion-reduce:transition-none",
            glide
              ? "transition-[translate,opacity] duration-300"
              : "transition-opacity duration-200"
          )}
          style={{
            translate: `calc(${at}px - 50%) 0`,
            bottom:
              "calc(var(--tool-dock-size) * (1 + var(--tool-dock-rise)) + 0.625rem)",
          }}
        >
          {text}
          <span
            style={{ width: 9, height: 9 }}
            className="absolute -bottom-[5px] left-1/2 -ml-[4.5px] rotate-45 rounded-br-[2px] border-r border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
          />
        </span>

        <motion.ul
          ref={rail}
          role="list"
          aria-label={label}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          onPointerMove={(event) => track(event.clientX)}
          onPointerDown={(event) => track(event.clientX)}
          onPointerLeave={release}
          onPointerUp={(event) => {
            if (event.pointerType !== "mouse") release();
          }}
          onPointerCancel={release}
          className="relative flex w-fit touch-pan-y m-0 p-0 list-none"
        >
          {items.map((item, index) => (
            <DockTile
              key={item.label}
              item={item}
              index={index}
              count={items.length}
              pointer={pointer}
              layout={layout}
              still={still}
              overlap={overlap}
              magnification={magnification}
              tilt={tilt}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

/**
 * An app-icon tile for a logo: a rounded square with a soft lift, a top
 * highlight and a hairline edge. Set its colour with `className`.
 */
export function ToolDockTile({ className, children, style, ...props }) {
  return (
    <div
      data-slot="tool-dock-tile"
      style={{ width: "100%", height: "100%", ...style }}
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[23%] bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.08),0_1px_1.5px_rgb(0_0_0/0.16),0_0_0.5px_rgb(0_0_0/0.12)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/15 after:to-transparent after:shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14),inset_0_1px_0_rgb(255_255_255/0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ToolDock;