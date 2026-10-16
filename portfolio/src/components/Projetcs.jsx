import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "QueueLess",
    period: "2026",
    image: "/queueless.png",
    link: "https://queueless.vercel.app",
    github: "#",
    description:
      "A multi-tenant SaaS queue management platform where organizations create digital queues and customers join remotely using QR codes or public links.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
  },
  {
    title: "Reverto",
    period: "2026",
    image: "/reverto.png",
    link: "https://reverto.vercel.app",
    github: "#",
    description:
      "A community-driven lost and found platform for reporting, searching, and recovering lost belongings.",
    tags: ["React", "Node.js", "MongoDB", "Cloudinary", "JWT", "Tailwind CSS"],
  },
  {
    title: "ParkFlow",
    period: "2026",
    image: "/parkflow.png",
    link: "#",
    github: "#",
    description:
      "A smart parking management system for booking parking spaces and managing reservations.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function Projects() {
  return (
    <motion.section
      id="projects"
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
          03 /
        </span>
        Featured Projects
      </h2>
      <p className="mb-5 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Real-world applications I've built.
      </p>

      <div className="relative left-1/2 w-[min(94vw,68rem)] -translate-x-1/2">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="group relative py-14 first:pt-4"
          >
            {/* animated divider */}
            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                show: { scaleX: 1, transition: { duration: 1.1, ease } },
              }}
              className="absolute left-0 top-0 h-px w-full origin-left bg-[#d4d4d4] dark:bg-[#262626]"
            />

            <div
              className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* image */}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="relative block lg:col-span-7"
              >
                <motion.div
                  variants={{
                    hidden: { clipPath: "inset(0 0 100% 0)" },
                    show: {
                      clipPath: "inset(0 0 0% 0)",
                      transition: { duration: 1.1, ease },
                    },
                  }}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#f5f5f5] dark:border-[#1f1f1f] dark:bg-[#111111]"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-[#0a0a0a]/0 transition-colors duration-500 group-hover:bg-[#0a0a0a]/25" />

                  <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-[#0a0a0a] opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <FaArrowRight size={14} className="-rotate-45" />
                  </div>
                </motion.div>
              </a>

              {/* content */}
              <div className="lg:col-span-5">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.6 },
                    },
                  }}
                  className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-[#737373] dark:text-[#a3a3a3]"
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-[#a3a3a3] dark:bg-[#525252]" />
                  <span>{project.period}</span>
                </motion.div>

                {/* title slides up from a mask */}
                <div className="mt-4 overflow-hidden pb-1">
                  <motion.h3
                    variants={{
                      hidden: { y: "110%" },
                      show: {
                        y: 0,
                        transition: { delay: 0.35, duration: 0.9, ease },
                      },
                    }}
                    className="text-5xl font-bold tracking-tight text-[#0a0a0a] dark:text-white sm:text-6xl"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </motion.h3>
                </div>

                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.5, duration: 0.7 },
                    },
                  }}
                  className="mt-5 leading-8 text-[#525252] dark:text-[#a3a3a3]"
                >
                  {project.description}
                </motion.p>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { delay: 0.65, duration: 0.7 } },
                  }}
                  className="mt-6 font-mono text-xs uppercase leading-6 tracking-[0.18em] text-[#737373]"
                >
                  {project.tags.join("  /  ")}
                </motion.p>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.8, duration: 0.6 },
                    },
                  }}
                  className="mt-8 flex items-center gap-8"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] dark:text-white"
                  >
                    <span className="relative">
                      Live Demo
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <FaArrowRight
                      size={11}
                      className="-rotate-45 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                    />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#737373] transition-colors hover:text-[#0a0a0a] dark:text-[#a3a3a3] dark:hover:text-white"
                  >
                    <span className="relative">
                      GitHub
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <FaGithub size={13} />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}

        <div className="h-px w-full bg-[#d4d4d4] dark:bg-[#262626]" />
      </div>
    </motion.section>
  );
}