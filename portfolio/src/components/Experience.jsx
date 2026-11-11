
import React from "react";
import { motion } from "framer-motion";

const experience = {
  period: "2025 — Present",
  role: "Application Support ",
  company: "Xtreme Softech",
  location: "Gurugram",

  description:
    "Keeping applications reliable through production monitoring, troubleshooting, automation and software testing.",

  work: [
    "Production & server monitoring",
    "Java / PHP log analysis",
    "Application troubleshooting",
    "UiPath bot execution & monitoring",
    "Functional testing & bug reporting",
    "API, database & integration checks",
    "SSL and infrastructure monitoring",
    "Technical documentation & reporting",
  ],

  tools: [
    "SQL",
    "Linux",
    "Java",
    "PHP",
    "MongoDB",
    "IIS",
    "Nginx",
    "UiPath",
    "Postman",
    "Git",
  ],
};

const ease = [0.22, 1, 0.36, 1];

export default function Experience() {
  return (
    <section id="experience" className="mt-20 sm:mt-24">

      {/* Heading */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Experience<span className="text-[#F15A24]">.</span>
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            A little about what I do.
          </p>
        </div>

        <span className="hidden font-mono text-xs text-neutral-500 sm:block">
          01 — PRESENT
        </span>
      </div>

      {/* Experience Card */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease }}
        className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 hover:border-[#F15A24]/50 dark:border-neutral-800 dark:bg-neutral-950"
      >

        {/* Decorative accent */}
        <div className="absolute right-0 top-0 h-1 w-24 rounded-bl-full bg-[#F15A24] transition-all duration-500 group-hover:w-40" />

        <div className="p-5 sm:p-8 lg:p-10">

          {/* Role details */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#F15A24]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#E34C19] dark:text-[#FF875B]">
                  {experience.period}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Currently working
                </span>
              </div>

              <h3
                className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {experience.role}
              </h3>

              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {experience.company}
                <span className="mx-2 text-[#F15A24]">✳</span>
                {experience.location}
              </p>
            </div>

            {/* Decorative graphic */}
            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-4xl text-[#F15A24] transition-transform duration-500 group-hover:rotate-6 dark:border-neutral-800 dark:bg-neutral-900 sm:flex">
              <span>⌘</span>
            </div>

          </div>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-[15px]">
            {experience.description}
          </p>

          {/* Work areas */}
          <div className="mt-9">
            <h4 className="mb-5 text-sm font-semibold text-neutral-900 dark:text-white">
              What I work on
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {experience.work.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.045,
                    ease,
                  }}
                  className="flex items-center gap-3 rounded-lg border border-neutral-100 px-3 py-3 transition-all duration-200 hover:border-[#F15A24]/40 hover:bg-[#F15A24]/[0.04] dark:border-neutral-800 dark:hover:bg-[#F15A24]/[0.05]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#F15A24]/10 text-xs font-bold text-[#E34C19] dark:text-[#FF875B]">
                    ↗
                  </span>

                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </span>
                </motion.div>
              ))}

            </div>
          </div>

          {/* Tools */}
          <div className="mt-9 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Tools & Technologies
              </h4>
              <span className="text-xs text-neutral-400">
                Technical stack
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {experience.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all duration-200 hover:border-[#F15A24] hover:text-[#E34C19] dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-[#FF875B]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>
      </motion.article>
    </section>
  );
}
