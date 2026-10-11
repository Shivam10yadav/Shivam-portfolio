

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/* ---------------------------------------------------------------------------
 * NotFound — minimal monochrome 404.
 *
 *   React Router:  <Route path="*" element={<NotFound />} />
 *   Next.js:       save as app/not-found.jsx and `export { default } from ...`
 *
 * The "0" is an eye. Its pupil follows your cursor (on touch screens, with no
 * mouse, it glances around by itself). A soft grey spotlight trails the
 * pointer, the digits rise into place, and the page shows the address that
 * wasn't found. Black on white, flipping in dark mode. No router dependency —
 * links are plain anchors.
 * ------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];
const DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" };

const digit = {
  hidden: { y: "105%" },
  show: { y: 0, transition: { duration: 0.9, ease: EASE } },
};

function Eye({ reduce }) {
  const ringRef = useRef(null);
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const x = useSpring(tx, { stiffness: 170, damping: 16 });
  const y = useSpring(ty, { stiffness: 170, damping: 16 });
  const lastMove = useRef(0);

  useEffect(() => {
    if (reduce) return;

    const look = (px, py) => {
      const r = ringRef.current?.getBoundingClientRect();
      if (!r) return;
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 260);
      tx.set((dx / d) * k * r.width * 0.2);
      ty.set((dy / d) * k * r.height * 0.2);
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      lastMove.current = performance.now();
      look(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove);

    // no mouse movement for a while (or touch device): glance around
    const id = setInterval(() => {
      if (performance.now() - lastMove.current < 3000) return;
      const r = ringRef.current?.getBoundingClientRect();
      if (!r) return;
      const a = Math.random() * Math.PI * 2;
      const m = Math.random() < 0.25 ? 0 : 1;
      tx.set(Math.cos(a) * r.width * 0.2 * m);
      ty.set(Math.sin(a) * r.height * 0.2 * m);
    }, 1400);

    return () => {
      window.removeEventListener("pointermove", onMove);
      clearInterval(id);
    };
  }, [reduce, tx, ty]);

  return (
    <span className="inline-block overflow-hidden px-[0.04em] align-bottom">
      <motion.span variants={digit} className="block">
        <span
          ref={ringRef}
          aria-hidden="true"
          className="relative flex h-[0.74em] w-[0.6em] items-center justify-center rounded-[50%] border-[0.1em] border-current"
        >
          <motion.span
            style={{ x, y }}
            className="block h-[0.17em] w-[0.17em] rounded-full bg-current"
          />
        </span>
      </motion.span>
    </span>
  );
}

export default function NotFound({ homeHref = "/" }) {
  const reduce = !!useReducedMotion();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  // soft spotlight that trails the pointer
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(128,128,128,0.16), transparent 70%)`;

  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <main
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-6 text-neutral-900 dark:bg-neutral-950 dark:text-white"
    >
      <motion.div aria-hidden="true" style={{ background: glow }} className="pointer-events-none absolute inset-0" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } } }}
        className="relative flex flex-col items-center text-center"
      >
        <h1 className="sr-only">404 — page not found</h1>

        {/* 4 0 4 */}
        <div
          aria-hidden="true"
          className="flex items-end gap-[0.06em] font-black leading-[0.8] tracking-tighter text-[clamp(7rem,30vw,22rem)]"
          style={DISPLAY}
        >
          <span className="overflow-hidden pb-[0.04em]">
            <motion.span variants={digit} className="block">4</motion.span>
          </span>
          <Eye reduce={reduce} />
          <span className="overflow-hidden pb-[0.04em]">
            <motion.span variants={digit} className="block">4</motion.span>
          </span>
        </div>

        {/* line that draws under the number */}
        <motion.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
          className="mt-8 block h-px w-24 origin-center bg-current opacity-40"
        />

        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          className="mt-8 text-xl font-medium tracking-tight sm:text-2xl"
          style={DISPLAY}
        >
          This page wandered off.
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          className="mt-3 max-w-xs break-all text-sm text-neutral-500 dark:text-neutral-400 sm:max-w-md"
        >
          {path ? <span>{path} isn&apos;t here.</span> : <span>The address you followed isn&apos;t here.</span>}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm"
        >
          <a
            href={homeHref}
            className="group inline-flex items-center gap-3 rounded-full border border-neutral-900 px-6 py-3 font-medium transition-colors hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900"
          >
            Back to home
            <span className="block h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
          </a>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
          >
            Go back
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}