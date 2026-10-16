import React from "react";
import { motion } from "framer-motion";

const education = [
  {
    period: "2023 — 2026",
    title: "Bachelor of Computer Applications",
    subtitle: "Pt Chiranji Lal Sharma / Kurukshetra University",
    current: true,
  },
  {
    period: "2020 — 2022",
    title: "Higher Secondary (XII)",
    subtitle: "SD Adarsh Public School",
    current: false,
  },
];

const certifications = [
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2025",
  },
  { title: "React - The Complete Guide", issuer: "Udemy", year: "2025" },
  {
    title: "Programming Fundamentals",
    issuer: "NPTEL / Coursera",
    year: "2024",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Education() {
  return (
    <motion.section
      id="education"
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
          07 /
        </span>
        Education
      </h2>
      <p className="mb-6 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        My academic foundation.
      </p>

      {/* degrees */}
      <div>
        {education.map((e) => (
          <motion.article
            key={e.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="group relative grid gap-2 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
          >
            {/* animated divider */}
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1, ease } },
              }}
              className="absolute left-0 top-0 h-px w-full origin-left bg-[#d4d4d4] dark:bg-[#262626]"
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.15, duration: 0.6 },
                },
              }}
              className="flex items-center gap-2 pt-1 font-mono text-xs tracking-[0.2em] text-[#737373] dark:text-[#a3a3a3]"
            >
              {e.current && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a] opacity-40 dark:bg-white" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0a0a0a] dark:bg-white" />
                </span>
              )}
              {e.period}
            </motion.div>

            <div>
              <div className="overflow-hidden pb-1">
                <motion.h3
                  variants={{
                    hidden: { y: "110%" },
                    show: {
                      y: 0,
                      transition: { delay: 0.2, duration: 0.8, ease },
                    },
                  }}
                  className="text-2xl font-semibold tracking-tight text-[#0a0a0a] transition-transform duration-500 group-hover:translate-x-1 dark:text-white sm:text-3xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {e.title}
                </motion.h3>
              </div>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.7 },
                  },
                }}
                className="mt-2 text-[#525252] dark:text-[#a3a3a3]"
              >
                {e.subtitle}
              </motion.p>
            </div>
          </motion.article>
        ))}
        <div className="h-px w-full bg-[#d4d4d4] dark:bg-[#262626]" />
      </div>

      {/* certifications */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-2 mt-14 font-mono text-xs uppercase tracking-[0.3em] text-[#737373] dark:text-[#a3a3a3]"
      >
        Certifications
      </motion.p>

      <div>
        {certifications.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease }}
            className="group flex items-baseline justify-between gap-4 border-b border-[#e5e5e5] py-4 dark:border-[#1f1f1f]"
          >
            <div className="min-w-0">
              <p className="font-medium text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-1 dark:text-white">
                {c.title}
              </p>
              <p className="mt-0.5 text-sm text-[#737373]">{c.issuer}</p>
            </div>
            <span className="shrink-0 font-mono text-xs tracking-widest text-[#a3a3a3] dark:text-[#525252]">
              {c.year}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}