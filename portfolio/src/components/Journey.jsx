

import React, { useRef } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ---------------------------------------------------------------------------
 * Journey — scroll-driven animated timeline.
 *
 * Drop-in for the old block, inside your <Section>:
 *
 *   <Section id="journey" title="My Journey" subtitle="..." index={4}>
 *     <Journey journey={journey} />
 *   </Section>
 *
 * `journey` = [{ year: "2023", title: "...", description: "..." }, ...]
 *
 * What moves:
 *  - the spine fills with colour as you scroll, with a glowing dot riding its tip
 *  - each year node pops in, draws a ring, and pulses while its card is in focus
 *  - cards alternate left / right on desktop (single column on phones), fade in
 *    from blur, reveal their title word by word, and the connector draws in
 *  - a big outlined year drifts behind each card (parallax)
 *  - cards tilt toward the mouse and carry a cursor-following spotlight
 *  - everything calms down for visitors who prefer reduced motion
 * ------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const titleWord = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

function JourneyItem({ item, i, accent, reduce }) {
  const left = i % 2 === 0; // desktop: card on the left, node in the middle
  const rowRef = useRef(null);
  const nodeRef = useRef(null);
  const cardRef = useRef(null);

  // node lights up once the line reaches it; card is "active" while centred
  const reached = useInView(nodeRef, { once: true, margin: "0px 0px -50% 0px" });
  const active = useInView(cardRef, { margin: "-38% 0px -38% 0px" });

  // big year drifts behind the card
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const yearY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);

  // tilt + spotlight
  const rotX = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, ${accent}26, transparent 65%)`;

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x);
    my.set(y);
    rotY.set((x / r.width - 0.5) * 7);
    rotX.set(-(y / r.height - 0.5) * 7);
  };
  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const words = item.title.split(" ");

  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-[64px_1fr] items-start gap-x-5 pb-14 last:pb-0 md:grid-cols-[1fr_64px_1fr] md:gap-x-10 md:pb-24"
    >
      {/* node */}
      <div
        ref={nodeRef}
        className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2"
      >
        <motion.div
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={reached ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl dark:bg-white dark:text-neutral-900"
        >
          {active && !reduce && (
            <span
              className="absolute inset-0 animate-ping rounded-full opacity-40"
              style={{ backgroundColor: accent }}
            />
          )}
          <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: reached ? 1 : 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </svg>
          <span className="relative text-sm font-bold tabular-nums">{item.year.slice(2)}</span>
        </motion.div>
      </div>

      {/* card */}
      <motion.div
        ref={cardRef}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
          show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease: EASE, staggerChildren: 0.06, delayChildren: 0.15 },
          },
        }}
        className={
          "relative col-start-2 row-start-1 min-w-0 " +
          (left ? "md:col-start-1" : "md:col-start-3")
        }
      >
        {/* connector from the node to the card */}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: reduce ? 1 : 0 }}
          animate={{ scaleX: reached ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className={
            "absolute top-8 -left-5 h-px w-5 origin-left md:w-10 " +
            (left ? "md:left-auto md:-right-10 md:origin-right" : "md:-left-10")
          }
          style={{ backgroundColor: accent }}
        />

        {/* outlined year watermark */}
        <motion.span
          aria-hidden="true"
          style={{
            y: yearY,
            WebkitTextStroke: "1.5px " + accent,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          className={
            "pointer-events-none absolute -top-10 select-none text-[clamp(5rem,13vw,9rem)] font-black leading-none text-transparent opacity-[0.16] " +
            (left ? "right-2 md:right-4" : "right-2")
          }
        >
          {item.year}
        </motion.span>

        <motion.div
          whileHover={reduce ? undefined : { y: -6 }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 900,
            borderColor: active ? accent : undefined,
            boxShadow: active ? "0 24px 60px -24px " + accent + "66" : undefined,
          }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-[border-color,box-shadow] duration-500 dark:border-neutral-800 dark:bg-neutral-900 sm:p-7"
        >
          <motion.div
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100"
          />

          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="relative flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">{item.year}</span>
          </motion.div>

          <h3
            className="relative mt-3 flex flex-wrap gap-x-[0.3em] text-2xl font-semibold"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {words.map((w, k) => (
              <span key={k} className="inline-block overflow-hidden pb-1">
                <motion.span variants={titleWord} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </h3>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="relative mt-4 leading-8 text-neutral-500 dark:text-neutral-400"
          >
            {item.description}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Journey({ journey = [], accent = "#e5262c" }) {
  const wrapRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 70%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const dotTop = useTransform(progress, (v) => v * 100 + "%");

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-5xl">
      {/* spine: grey track, coloured fill, glowing dot at the tip */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-8 top-0 z-0 w-px -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800 md:left-1/2"
      >
        <motion.div
          style={{
            scaleY: reduce ? 1 : progress,
            background: "linear-gradient(to bottom, " + accent + ", " + accent + "99)",
          }}
          className="h-full w-full origin-top"
        />
        {!reduce && (
          <motion.span
            style={{ top: dotTop, backgroundColor: accent, boxShadow: "0 0 18px 4px " + accent + "88" }}
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        )}
      </div>

      {journey.map((item, i) => (
        <JourneyItem key={item.year + i} item={item} i={i} accent={accent} reduce={!!reduce} />
      ))}

      {/* end cap */}
      <div className="relative z-10 mt-10 grid grid-cols-[64px_1fr] items-center gap-x-5 md:mt-14 md:grid-cols-[1fr_64px_1fr] md:gap-x-10">
        <div className="col-start-1 flex justify-center md:col-start-2">
          <span className="relative flex h-4 w-4">
            {!reduce && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: accent }}
              />
            )}
            <span className="relative inline-flex h-4 w-4 rounded-full" style={{ backgroundColor: accent }} />
          </span>
        </div>
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="col-start-2 text-xs uppercase tracking-[0.3em] text-neutral-400 md:col-start-3"
        >
          The story continues
        </motion.p>
      </div>
    </div>
  );
}