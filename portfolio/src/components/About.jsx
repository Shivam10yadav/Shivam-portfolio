

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/* ---------------------------------------------------------------------------
 * About — text that is read into existence as you scroll.
 *
 *   <Section id="about" title="About" subtitle="..." index={1}>
 *     <About />
 *   </Section>
 *
 * Words start faint and light up one by one as the paragraph moves up the
 * screen. Highlighted phrases get a red underline that is drawn word by word
 * right after each word lights up. A hairline on the left fills as you read.
 * Nothing else moves, so the page stays calm.
 *
 * Mark highlights with [[double brackets]]. Edit the copy freely.
 * Needs framer-motion + Tailwind. Reduced motion shows everything at once.
 * ------------------------------------------------------------------------- */

const LEAD =
  "I'm a full-stack developer who builds [[production-grade web products]] end to end, from database design to the final pixel. I care about [[clean architecture]], fast interfaces, and software that holds up under real use, not just in a demo.";

const BODY =
  "I've shipped [[QueueLess]], [[Reverto]], and [[ParkFlow]]: multi-tenant SaaS platforms on the MERN stack, with secure JWT authentication, REST APIs, and deployments on Vercel and Render. Each one taught me something about scale, edge cases, and what real users actually do. I'm now looking for a developer role where I can [[own meaningful work]], learn from strong engineers, and keep raising the bar.";
function parse(str) {
  const out = [];
  str.split(/(\[\[.*?\]\])/).forEach((chunk) => {
    if (!chunk) return;
    const em = chunk.startsWith("[[");
    const text = em ? chunk.slice(2, -2) : chunk;
    const glue = !em && out.length > 0 && !/^\s/.test(text);
    const parts = text.split(/\s+/).filter(Boolean);
    parts.forEach((w, i) => {
      if (glue && i === 0) {
        out[out.length - 1].w += w;
        return;
      }
      out.push({ w, em, end: false });
    });
    if (em && parts.length) out[out.length - 1].end = true;
  });
  return out;
}

function Word({ item, i, n, progress, accent, reduce }) {
  const start = (i / n) * 0.8;
  const lit = start + 0.1;
  const opacity = useTransform(progress, [start, lit], [0.16, 1]);
  const draw = useTransform(progress, [lit, lit + 0.07], [0, 1]);

  return (
    <span className="relative mr-[0.27em] inline-block">
      <motion.span style={reduce ? undefined : { opacity }} className={item.em ? "font-medium" : ""}>
        {item.w}
      </motion.span>
      {item.em && (
        <motion.span
          aria-hidden="true"
          style={{
            scaleX: reduce ? 1 : draw,
            width: item.end ? "100%" : "calc(100% + 0.27em)",
            backgroundColor: accent,
          }}
          className="absolute -bottom-[0.1em] left-0 h-[3px] origin-left rounded-full"
        />
      )}
    </span>
  );
}

function Reveal({ text, className, accent, reduce }) {
  const ref = useRef(null);
  const words = React.useMemo(() => parse(text), [text]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end 0.5"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  return (
    <p ref={ref} className={className}>
      {words.map((item, i) => (
        <Word key={i} item={item} i={i} n={words.length} progress={progress} accent={accent} reduce={reduce} />
      ))}
    </p>
  );
}

export default function About({ lead = LEAD, body = BODY, accent = "#e5262c" }) {
  const reduce = !!useReducedMotion();
  const wrapRef = useRef(null);

  // the hairline fills as you read through the section
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 0.7", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-4xl pl-6 sm:pl-10">
      <div aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-px bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          style={{ scaleY: reduce ? 1 : fill, backgroundColor: accent }}
          className="h-full w-full origin-top"
        />
      </div>

      <Reveal
        text={lead}
        accent={accent}
        reduce={reduce}
        className="text-[clamp(1.45rem,4.4vw,2.6rem)] leading-[1.35] tracking-tight text-neutral-900 dark:text-white"
      />

      <Reveal
        text={body}
        accent={accent}
        reduce={reduce}
        className="mt-10 text-[clamp(1.05rem,2.4vw,1.35rem)] leading-[1.9] text-neutral-600 dark:text-neutral-300 sm:mt-14"
      />
    </div>
  );
}