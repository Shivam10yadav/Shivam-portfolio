

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

/* ---------------------------------------------------------------------------
 * Toolbox — "spotlight index" layout (replaces the grid of small cards).
 *
 *   <Section id="toolbox" title="Toolbox" subtitle="..." index={6}>
 *     <Toolbox toolbox={toolbox} />
 *   </Section>
 *
 * `toolbox` = [{ title, description, icon }]  (same data you already have)
 *
 * Every tool is a big word in one flowing line of type. One tool is "in the
 * spotlight": it is full-strength with an underline that fills like a timer,
 * and a preview panel shows its icon and description. The spotlight moves on
 * its own every few seconds, and jumps to whatever you hover, focus or tap.
 *
 * Phones: preview on top, words below (they wrap naturally). Reduced motion:
 * no auto-advance, no spinning.
 * ------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];
const DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" };
const INTERVAL = 2800; // ms each tool stays in the spotlight

export default function Toolbox({ toolbox = [], accent = "#e5262c" }) {
  const rootRef = useRef(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(rootRef, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const auto = inView && !hovering && !reduce && toolbox.length > 1;

  // advance the spotlight; restarts whenever the active tool changes
  useEffect(() => {
    if (!auto) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % toolbox.length), INTERVAL);
    return () => clearTimeout(id);
  }, [auto, active, toolbox.length]);

  const tool = toolbox[active];
  if (!tool) return null;
  const Icon = tool.icon;

  return (
    <div
      ref={rootRef}
      className="mx-auto grid max-w-6xl items-start gap-10 px-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16"
    >
      {/* preview */}
      <div className="md:sticky md:top-32">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 md:p-10">
          {/* soft accent wash that follows the spotlight */}
          <motion.div
            aria-hidden="true"
            key={"wash" + active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
            style={{ backgroundColor: accent + "1f" }}
          />

          <div className="relative flex h-28 w-28 items-center justify-center">
            {/* one slow dashed ring — the only ambient motion */}
            <motion.svg
              viewBox="0 0 112 112"
              aria-hidden="true"
              className="absolute inset-0"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              <circle
                cx="56"
                cy="56"
                r="54"
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                strokeDasharray="3 9"
                strokeLinecap="round"
              />
            </motion.svg>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tool.title}
                initial={reduce ? false : { scale: 0.5, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { scale: 0.5, rotate: 25, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="text-neutral-900 dark:text-white"
              >
                {Icon ? <Icon size={52} /> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-8 min-h-[7.5rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tool.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <h3 className="text-3xl font-semibold tracking-tight" style={DISPLAY}>
                  {tool.title}
                </h3>
                <p className="mt-3 max-w-sm leading-7 text-neutral-500 dark:text-neutral-400">
                  {tool.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* the index of tools */}
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.045 } } }}
        onPointerLeave={() => setHovering(false)}
        className="flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4"
      >
        {toolbox.map((t, i) => {
          const on = i === active;
          return (
            <motion.li
              key={t.title}
              variants={{ hidden: {}, show: {} }}
              className="list-none"
            >
              <motion.button
                type="button"
                aria-pressed={on}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setHovering(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ opacity: on ? 1 : 0.3 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative block cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
                style={{ "--tw-ring-color": accent }}
              >
                <span className="block overflow-hidden pb-2">
                  <motion.span
                    variants={{
                      hidden: { y: "110%" },
                      show: { y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                    className="block text-3xl font-semibold leading-none tracking-tight sm:text-4xl md:text-5xl"
                    style={DISPLAY}
                  >
                    {t.title}
                  </motion.span>
                </span>

                {/* underline that fills like a timer while this tool is in the spotlight */}
                {on && (
                  <motion.span
                    key={"line" + active + (auto ? "a" : "m")}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: auto ? INTERVAL / 1000 : 0.4, ease: auto ? "linear" : EASE }}
                    className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}