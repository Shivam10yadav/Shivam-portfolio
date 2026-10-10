"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  FaArrowUp,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

/* ---------------------------------------------------------------------------
 * Premium footer — dark hero-name section + a cream "street" where a crowd
 * of little people walk by (canvas + GSAP, from the Skiper crowd-canvas).
 *
 * Needs: framer-motion, gsap, react-icons, Tailwind.
 * Font:  the name uses Space Grotesk (falls back to system sans).
 *
 * Perf notes: the crowd pauses when the footer is off-screen, draws fewer
 * people on small screens, caps pixel-ratio at 2, and shows a still frame
 * when the visitor prefers reduced motion.
 * ------------------------------------------------------------------------- */

const EMAIL = "shivam10yadav05@gmail.com";
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Shivam10yadav/", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivam10yadav/", Icon: FaLinkedin },
  { label: "X", href: "https://x.com/Y80Shivam", Icon: FaTwitter },
  { label: "Instagram", href: "https://www.instagram.com/shivam05_10/", Icon: FaInstagram },
];

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* ------------------------------- crowd canvas ------------------------------ */

function CrowdCanvas({ src, rows = 15, cols = 7 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = gsap.parseEase("power2.in");
    const rand = (a, b) => a + Math.random() * (b - a);

    const stage = { width: 0, height: 0, dpr: 1 };
    const allPeeps = [];
    const available = [];
    const crowd = [];
    const img = new Image();

    let ready = false;
    let visible = true;
    let ticking = false;
    let lastWidth = 0;

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(stage.dpr, stage.dpr);
      for (const p of crowd) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.flip, 1);
        ctx.drawImage(img, p.rect[0], p.rect[1], p.rect[2], p.rect[3], 0, 0, p.width, p.height);
        ctx.restore();
      }
    };

    const setTicker = (on) => {
      if (on && !ticking) {
        gsap.ticker.add(render);
        ticking = true;
      } else if (!on && ticking) {
        gsap.ticker.remove(render);
        ticking = false;
      }
    };

    // put a person just off one edge, at a random depth
    const place = (p) => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const H = stage.height;
      const offsetY = H * (0.18 - 0.5 * ease(Math.random()));
      const startY = H - p.height + offsetY;
      p.flip = dir;
      p.x = dir === 1 ? -p.width : stage.width + p.width;
      p.y = startY;
      p.anchorY = startY;
      return { startY, endX: dir === 1 ? stage.width : 0 };
    };

    const walk = (p, { startY, endX }) => {
      const duration = Math.min(12, 5 + stage.width / 350);
      const tl = gsap.timeline();
      tl.timeScale(rand(0.5, 1.5));
      tl.to(p, { duration, x: endX, ease: "none" }, 0);
      tl.to(
        p,
        {
          duration: 0.25,
          repeat: Math.round(duration / 0.25),
          yoyo: true,
          y: startY - stage.height * 0.035,
        },
        0
      );
      return tl;
    };

    const addPeep = () => {
      if (!available.length) return null;
      const p = available.splice((Math.random() * available.length) | 0, 1)[0];
      const tl = walk(p, place(p));
      tl.eventCallback("onComplete", () => {
        const i = crowd.indexOf(p);
        if (i > -1) crowd.splice(i, 1);
        available.push(p);
        addPeep();
      });
      p.walk = tl;
      crowd.push(p);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return p;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h || !allPeeps.length) return;
      stage.width = w;
      stage.height = h;
      stage.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * stage.dpr);
      canvas.height = Math.round(h * stage.dpr);

      crowd.forEach((p) => p.walk && p.walk.kill());
      crowd.length = 0;
      available.length = 0;
      available.push(...allPeeps);

      // size people relative to the street height, so they look right everywhere
      const scale = (h * 0.55) / allPeeps[0].rect[3];
      allPeeps.forEach((p) => {
        p.width = p.rect[2] * scale;
        p.height = p.rect[3] * scale;
      });

      // packed crowd: every person on desktop, a big (but lighter) crowd on phones
      const target = w < 640 ? Math.min(allPeeps.length, 64) : allPeeps.length;
      for (let i = 0; i < target; i++) {
        const p = addPeep();
        if (p) p.walk.progress(Math.random());
      }

      if (reduced) {
        crowd.forEach((p) => p.walk.pause());
        render();
      } else if (!visible) {
        crowd.forEach((p) => p.walk.paused(true));
      }
    };

    img.onload = () => {
      const rw = img.naturalWidth / rows;
      const rh = img.naturalHeight / cols;
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push({
          rect: [(i % rows) * rw, ((i / rows) | 0) * rh, rw, rh],
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          anchorY: 0,
          flip: 1,
          walk: null,
        });
      }
      ready = true;
      lastWidth = canvas.clientWidth;
      resize();
      if (!reduced) setTicker(visible);
    };
    img.src = src;

    // only rebuild when the width really changes (mobile URL-bar jitter is ignored)
    const ro = new ResizeObserver(() => {
      if (!ready) return;
      const w = canvas.clientWidth;
      if (Math.abs(w - lastWidth) < 2) return;
      lastWidth = w;
      resize();
    });
    ro.observe(canvas);

    // pause everything while the footer is off-screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!ready || reduced) return;
      crowd.forEach((p) => p.walk.paused(!visible));
      setTicker(visible);
    });
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      img.onload = null;
      setTicker(false);
      crowd.forEach((p) => p.walk && p.walk.kill());
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}

/* --------------------------------- footer --------------------------------- */

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function Footer() {
  const words = ["SHIVAM", "YADAV"];
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + EMAIL;
    }
  };

  let letterIndex = 0;

  return (
    <footer id="contact" className="relative text-white">
      {/* ------------------------------ dark section ------------------------------ */}
      <div className="relative overflow-hidden bg-[#0D1F1E]">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/10 via-emerald-400/10 to-blue-400/10 blur-[180px]"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-40 pt-16 md:pb-56 md:pt-24">
          {/* status row */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-xs sm:tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>Available for work</span>
              {time && <span className="hidden text-white/30 sm:inline">· {time} IST</span>}
            </div>

            <motion.a
              href="#top"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="hidden sm:inline">Back to top</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-[#0D1F1E]">
                <FaArrowUp size={12} />
              </span>
            </motion.a>
          </div>

          {/* call to action */}
          <div className="mt-14 md:mt-20">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
              Have a project in mind?
            </p>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={"Copy email address " + EMAIL}
              className="group mt-4 block max-w-full text-left"
            >
              <span
                className="block break-all text-[clamp(1.35rem,5.2vw,3.25rem)] font-medium leading-tight tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                  {EMAIL}
                </span>
              </span>
              <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40 transition-colors group-hover:text-white/70">
                {copied ? "Copied ✓" : "Tap to copy"}
              </span>
            </button>
          </div>

          {/* huge name */}
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            aria-label="Shivam Yadav"
            className="mt-14 flex flex-col items-center font-black uppercase leading-[0.92] md:mt-24 md:flex-row md:justify-center md:gap-[0.28em]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3.5rem, 21vw, 9rem)",
            }}
          >
            <style>{`@media (min-width:768px){.ftr-name{font-size:clamp(4rem,12.5vw,14rem)}}`}</style>
            {words.map((word) => (
              <span key={word} className="ftr-name flex overflow-hidden py-2" aria-hidden="true">
                {word.split("").map((letter) => {
                  const i = letterIndex++;
                  return (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { y: 180, opacity: 0, letterSpacing: "0.45em" },
                        show: { y: 0, opacity: 1, letterSpacing: "-0.06em" },
                      }}
                      transition={{ duration: 1, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block bg-gradient-to-b from-white via-white to-white/25 bg-clip-text text-transparent"
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h2>

          {/* bio + links */}
          <div className="mt-14 flex flex-col gap-10 border-t border-white/10 pt-8 md:mt-20 md:flex-row md:items-start md:justify-between">
            <p className="max-w-md text-white/50">
              Full Stack Developer building scalable web applications with React, Node.js,
              Express, MongoDB and Next.js.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  <span className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
              <a
                href="/resume.pdf"
                className="rounded-full border border-white/15 px-5 py-2 text-sm transition hover:border-white hover:bg-white hover:text-[#0D1F1E]"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- cream "street" with the crowd --------------------- */}
      <div className="relative z-10 -mt-12 rounded-t-[2rem] bg-[#F4F1EA] text-[#0D1F1E] md:-mt-16 md:rounded-t-[3rem]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-10">
          <span className="relative text-[11px] uppercase tracking-[0.3em] text-[#0D1F1E]/45 after:absolute after:left-1/2 after:top-full after:mt-3 after:h-10 after:w-px after:bg-gradient-to-b after:from-transparent after:to-[#0D1F1E]/40 after:content-['']">
            Thanks for stopping by
          </span>
        </div>

        <div className="relative h-[clamp(230px,32vw,380px)] w-full overflow-hidden">
          <CrowdCanvas src={CROWD_SRC} rows={15} cols={7} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#0D1F1E]/10" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-center text-xs text-[#0D1F1E]/50 sm:flex-row sm:text-left">
          <span>© {new Date().getFullYear()} Shivam Yadav. All rights reserved.</span>
          <span>Crafted with React, Tailwind CSS &amp; Framer Motion.</span>
        </div>
      </div>
    </footer>
  );
}