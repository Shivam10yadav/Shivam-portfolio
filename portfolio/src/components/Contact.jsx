import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Change this to your real email.
const EMAIL = "you@example.com";

const links = [
  { label: "GitHub", handle: "Shivam10yadav", href: "https://github.com/Shivam10yadav/" },
  { label: "LinkedIn", handle: "shivam10yadav", href: "https://www.linkedin.com/in/shivam10yadav/" },
  { label: "X", handle: "@Y80Shivam", href: "https://x.com/Y80Shivam" },
  { label: "Resume", handle: "PDF", href: "/resume.pdf" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  };

  return (
    <motion.section
      id="contact"
      className="mt-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* animated divider */}
      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 1.1, ease } },
        }}
        className="h-px w-full origin-left bg-[#d4d4d4] dark:bg-[#262626]"
      />

      {/* status + label */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
        }}
        className="mt-10 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.3em] text-[#737373] dark:text-[#a3a3a3]"
      >

        Contact · 
      </motion.div>

      {/* headline, two lines each sliding up from a mask */}
      <h2
        className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] dark:text-white sm:text-6xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {["Let's build something", "worth shipping."].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-1">
            <motion.span
              variants={{
                hidden: { y: "110%" },
                show: {
                  y: 0,
                  transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease },
                },
              }}
              className={
                "block " + (i === 1 ? "text-[#a3a3a3] dark:text-[#525252]" : "")
              }
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.7 } },
        }}
        className="mt-6 max-w-md leading-8 text-[#525252] dark:text-[#a3a3a3]"
      >
        I'm looking for my first developer role. If you have an opportunity, a
        project, or a question, my inbox is open.
      </motion.p>

      {/* email actions */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.7 } },
        }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <motion.a
          href={"mailto:" + EMAIL}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-[#0a0a0a]"
        >
          Say hello
          <FaArrowRight
            size={12}
            className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>

        <motion.button
          type="button"
          onClick={copyEmail}
          whileTap={{ scale: 0.97 }}
          className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-[#d4d4d4] px-6 py-3 font-mono text-xs tracking-wider text-[#525252] transition-colors hover:border-[#0a0a0a] hover:text-[#0a0a0a] dark:border-[#262626] dark:text-[#a3a3a3] dark:hover:border-white dark:hover:text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "email"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? "Copied ✓" : EMAIL}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* links */}
      <div className="mt-16">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.9 + i * 0.08, duration: 0.6, ease },
              },
            }}
            className="group flex items-center justify-between border-t border-[#e5e5e5] py-5 last:border-b dark:border-[#1f1f1f]"
          >
            <span
              className="text-xl font-semibold text-[#0a0a0a] transition-transform duration-500 group-hover:translate-x-2 dark:text-white sm:text-2xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {l.label}
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden font-mono text-xs tracking-wider text-[#737373] sm:inline">
                {l.handle}
              </span>
              <FaArrowRight
                size={14}
                className="-rotate-45 text-[#a3a3a3] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0a0a0a] dark:text-[#525252] dark:group-hover:text-white"
              />
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}