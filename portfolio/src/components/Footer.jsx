import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const name = "SHIVAM YADAV".split("");

  return (
    <footer className="relative overflow-hidden bg-[#0D1F1E] text-white py-32">
      {/* Subtle glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/10 via-emerald-400/10 to-blue-400/10 blur-[180px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top Line */}
        <div className="mb-16 flex items-center justify-between border-b border-white/10 pb-6">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">
            Available for Opportunities
          </p>

          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            Back to Top
            <FaArrowUp size={12} />
          </motion.a>
        </div>

        {/* Huge Name */}
        <div className="overflow-hidden">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="flex justify-center text-[clamp(4rem,15vw,14rem)] font-black uppercase leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {name.map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    y: 180,
                    opacity: 0,
                    letterSpacing: "0.45em",
                  },
                  show: {
                    y: 0,
                    opacity: 1,
                    letterSpacing: "-0.08em",
                  },
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Bottom */}
        <div className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-medium">
              shivam10yadav05@gmail.com
            </p>

            <p className="mt-2 max-w-md text-white/50">
              Full Stack Developer building scalable web applications with
              React, Node.js, Express, MongoDB and Next.js.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Shivam10yadav/"
              className="text-white/50 transition hover:text-white"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://www.linkedin.com/in/shivam10yadav/"
              className="text-white/50 transition hover:text-white"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="/resume.pdf"
              className="rounded-full border border-white/15 px-5 py-2 text-sm hover:border-white hover:bg-white hover:text-[#0D1F1E] transition"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-white/35">
          © {new Date().getFullYear()} Shivam Yadav. Crafted with React,
          Tailwind CSS & Framer Motion.
        </div>
      </div>
    </footer>
  );
}