import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const principles = [
  {
    title: "Architecture before features",
    description:
      "I settle the data model, roles, and boundaries first. Features built on a clean foundation ship faster and break less.",
    proof: "QueueLess",
    proofText:
      "Multi-tenant by design, so every organization's queues stay isolated from the start.",
  },
  {
    title: "Secure by default",
    description:
      "Authentication, authorization, and validation belong in the first commit, not in a patch after launch.",
    proof: "All three platforms",
    proofText:
      "JWT authentication and protected routes across every product I've shipped.",
  },
  {
    title: "Ship, then refine",
    description:
      "A deployed product teaches more than a perfect local build. I release early and improve against real usage.",
    proof: "Reverto",
    proofText:
      "Live with real users, which exposed edge cases no tutorial ever would.",
  },
  {
    title: "Details are the product",
    description:
      "Spacing, motion, and empty states are what make software feel trustworthy. Polish is part of the engineering.",
    proof: "This portfolio",
    proofText:
      "Responsive layouts and restrained motion, built to feel calm rather than loud.",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Principles() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.section
      id="principles"
      className="mt-14"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2
        className="text-xl font-semibold text-neutral-900 dark:text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span className="mr-2 align-middle font-mono text-xs tracking-widest text-neutral-400 dark:text-neutral-500">
          05 /
        </span>
        Principles
      </h2>
      <p className="mb-8 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        How I think about building software, and where it shows up in my work.
      </p>

      <div ref={ref} className="relative">
        {/* track + scroll-driven fill */}
        <div className="absolute bottom-2 left-[5px] top-2 w-px bg-[#e5e5e5] dark:bg-[#262626]" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-[#0a0a0a] dark:bg-white"
        />

        {principles.map((p, i) => (
          <motion.article
            key={p.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="relative pb-16 pl-10 last:pb-0"
          >
            {/* node */}
            <motion.span
              variants={{
                hidden: { scale: 0, backgroundColor: "#a3a3a3" },
                show: {
                  scale: 1,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-white bg-[#0a0a0a] dark:border-[#0a0a0a] dark:bg-white"
            />

            <motion.span
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1, duration: 0.5 },
                },
              }}
              className="block font-mono text-xs tracking-[0.3em] text-[#737373] dark:text-[#a3a3a3]"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>

            {/* title slides up from a mask */}
            <div className="mt-3 overflow-hidden pb-1">
              <motion.h3
                variants={{
                  hidden: { y: "110%" },
                  show: {
                    y: 0,
                    transition: { delay: 0.15, duration: 0.8, ease },
                  },
                }}
                className="text-3xl font-bold tracking-tight text-[#0a0a0a] dark:text-white sm:text-4xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {p.title}
              </motion.h3>
            </div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.35, duration: 0.7 },
                },
              }}
              className="mt-4 max-w-xl leading-8 text-[#525252] dark:text-[#a3a3a3]"
            >
              {p.description}
            </motion.p>

            {/* proof line draws in, then its text */}
            <div className="mt-6 flex max-w-xl items-start gap-4">
              <motion.span
                variants={{
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { delay: 0.55, duration: 0.7, ease },
                  },
                }}
                className="mt-3 h-px w-8 shrink-0 origin-left bg-[#a3a3a3] dark:bg-[#525252]"
              />
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { delay: 0.8, duration: 0.7 },
                  },
                }}
                className="text-sm leading-6 text-[#737373]"
              >
                <span className="font-medium text-[#0a0a0a] dark:text-white">
                  {p.proof}
                </span>
                <span className="mx-2 text-[#a3a3a3] dark:text-[#525252]">/</span>
                {p.proofText}
              </motion.p>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}