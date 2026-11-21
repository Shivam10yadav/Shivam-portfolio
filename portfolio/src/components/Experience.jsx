import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const START = new Date(2026, 7, 1); // Aug 2026

const experience = {
  start: "Aug 2026",
  end: "Present",
  role: "Application Support Engineer",
  company: "Xtreme Softech",
  location: "Gurugram, India",

  summary: [
    "I keep business-critical applications running smoothly. My day-to-day is watching production and servers, catching problems early, and tracing them to the root cause through Java and PHP logs, database queries and API responses, so issues are fixed once instead of repeatedly.",
    "I also act as the bridge between users and developers: reproducing bugs, testing fixes before release, running UiPath automations, and writing clear documentation so the next incident is faster to resolve.",
  ],

  areas: [
    {
      title: "Monitoring & Reliability",
      text: "Staying ahead of outages instead of reacting to them.",
      items: [
        "Production & server monitoring",
        "SSL and infrastructure monitoring",
        "IIS and Nginx health checks",
      ],
    },
    {
      title: "Troubleshooting & Analysis",
      text: "Finding the real cause, not just the symptom.",
      items: [
        "Java / PHP log analysis",
        "Application troubleshooting",
        "API, database & integration checks",
      ],
    },
    {
      title: "Automation",
      text: "Removing repetitive manual work from operations.",
      items: ["UiPath bot execution & monitoring", "Failure review & re-runs"],
    },
    {
      title: "Quality & Documentation",
      text: "Making sure fixes hold and knowledge is shared.",
      items: [
        "Functional testing & bug reporting",
        "Technical documentation & reporting",
      ],
    },
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

function getDuration() {
  const now = new Date();
  let months =
    (now.getFullYear() - START.getFullYear()) * 12 +
    (now.getMonth() - START.getMonth());
  if (months < 1) return "Just started";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export default function Experience() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section id="experience" className="mt-20 sm:mt-28">
      {/* Heading */}
      <motion.div {...reveal()} className="mb-10 sm:mb-14">
        <div className="flex items-end justify-between gap-4">
          <h2
            className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Experience<span className="text-[#F15A24]">.</span>
          </h2>
          <span className="hidden pb-1 font-mono text-xs uppercase tracking-widest text-neutral-500 sm:block">
            {experience.start} &ndash; {experience.end}
          </span>
        </div>

        {/* Animated rule */}
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          style={{ transformOrigin: "left" }}
          className="mt-5 h-px w-full bg-gradient-to-r from-[#F15A24] via-neutral-300 to-transparent dark:via-neutral-800"
        />
      </motion.div>

      <article className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: role meta (sticky on desktop) */}
        <motion.aside
          {...reveal(0.05)}
          className="lg:col-span-4"
        >
          <div className="lg:sticky lg:top-24">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#E34C19] dark:text-[#FF875B]">
              {experience.start} &ndash; {experience.end}
            </p>
            <p className="mt-1 font-mono text-xs text-neutral-500">
              {getDuration()}
            </p>

            <h3
              className="mt-5 text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-3xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {experience.role}
            </h3>

            <p className="mt-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              {experience.company}
            </p>
            <p className="text-sm text-neutral-500">{experience.location}</p>
          </div>
        </motion.aside>

        {/* Right: content */}
        <div className="lg:col-span-8">
          {/* Summary */}
          <motion.div {...reveal(0.1)} className="space-y-4">
            {experience.summary.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-base leading-8 text-neutral-800 dark:text-neutral-200 sm:text-lg"
                    : "text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-[15px]"
                }
              >
                {p}
              </p>
            ))}
          </motion.div>

          {/* Focus areas */}
          <div className="mt-12">
            <h4 className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              What I work on
            </h4>

            <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {experience.areas.map((area, index) => (
                <motion.div
                  key={area.title}
                  {...(reduce
                    ? {}
                    : {
                        initial: { opacity: 0, y: 16 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.3 },
                        transition: { duration: 0.55, delay: index * 0.06, ease },
                      })}
                  className="group relative grid gap-3 py-6 transition-colors duration-300 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  {/* hover wash */}
                  <span className="pointer-events-none absolute inset-0 -mx-3 rounded-lg bg-[#F15A24]/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-mx-4" />

                  <span className="relative font-mono text-sm text-neutral-400 transition-colors duration-300 group-hover:text-[#F15A24]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <h5 className="text-base font-semibold text-neutral-900 dark:text-white">
                      {area.title}
                    </h5>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {area.text}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {area.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-neutral-700 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-neutral-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mt-12">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
              Tools &amp; Technologies
            </h4>

            <motion.ul
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-wrap gap-2"
            >
              {experience.tools.map((tool) => (
                <motion.li
                  key={tool}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                  }}
                  whileHover={reduce ? undefined : { y: -2 }}
                  className="cursor-default rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors duration-200 hover:border-[#F15A24] hover:text-[#E34C19] dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-[#FF875B]"
                >
                  {tool}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </article>
    </section>
  );
}