import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHome,
  FaBook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaSun,
  FaMoon,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDatabase,
  FaServer,
  FaArrowRight,
  FaCloudUploadAlt,
  FaShieldAlt,
  FaLaptopCode,
  FaRocket,
  FaBug,
  FaCode,
  FaPenNib,
  FaLightbulb,
  FaInstagram,
} from "react-icons/fa";
import {
  SiAegisauthenticator,
  SiAuth0,
  SiAxios,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiReactrouter,
  SiRedux,
  SiRender,
  SiSecurityscorecard,
  SiSocketdotio,
  SiSpringsecurity,
  SiTailwindcss,
  SiVercel,
  SiVisualparadigm,
} from "react-icons/si";
import Footer from "./components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: "easeOut" },
  }),
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================================
   CINEMATIC SCROLL HERO (merged from cinematic-hero.tsx)
   - Converted from TSX -> JSX, "@/lib/utils" cn swapped for a local helper,
     theme-aware CSS var (--hero-fg) driven off the existing theme state
     instead of a shadcn/Tailwind design-token setup that this project
     doesn't have. All GSAP timelines / ScrollTrigger pinning / ambient
     mouse-tilt logic kept intact.
   ========================================================================= */

const CINEMATIC_HERO_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--hero-fg) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--hero-fg) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--hero-fg);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--hero-fg) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--hero-fg) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--hero-fg) 0%, color-mix(in srgb, var(--hero-fg) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--hero-fg) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--hero-fg) 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow:
          inset 0 0 0 2px #52525B,
          inset 0 0 0 7px #000,
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow:
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow:
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

function CinematicHero({
  theme = "light",
  brandName = "SHIVAM YADAV",
  tagline1 = "Building products,",
  tagline2 = "one commit at a time.",
  cardHeading = "Full-stack development, redefined.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Shivam</span> designs and ships
      production-grade MERN SaaS apps end-to-end — from schema design and auth
      to deployment on Vercel and Render.
    </>
  ),
  metricValue = 10,
  metricLabel = "Live Projects Shipped",
  ctaHeading = "Let's build something great.",
  ctaDescription = "Actively looking for my first developer role — reach out for opportunities, collaborations, or just to say hi.",
}) {
  const containerRef = useRef(null);
  const mainCardRef = useRef(null);
  const mockupRef = useRef(null);
  const requestRef = useRef(0);

  // Mouse-driven card sheen + phone tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Cinematic pinned scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-sans antialiased"
      style={{ perspective: "1500px", "--hero-fg": theme === "dark" ? "#ffffff" : "#0a0a0a" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CINEMATIC_HERO_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: CTA */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="#projects" className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <FaRocket size={20} className="transition-transform group-hover:scale-110" aria-hidden="true" />
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Take a look at</div>
              <div className="text-xl font-bold leading-none tracking-tight">My Projects</div>
            </div>
          </a>
          <a href="#contact" className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background">
            <FaArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Get in</div>
              <div className="text-xl font-bold leading-none tracking-tight">Touch</div>
            </div>
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The physical deep blue card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {/* Brand name */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            {/* Phone mockup */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>

                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Dashboard</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Shivam.dev</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">SY</div>
                      </div>

                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3B82F6" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-blue-200/50 uppercase tracking-[0.1em] font-bold mt-0.5 text-center px-2">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center mr-3 border border-blue-400/20 shadow-inner">
                            <FaShieldAlt className="w-4 h-4 text-blue-400 drop-shadow-md" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-28 bg-neutral-300 rounded-full mb-2 shadow-inner opacity-60" />
                            <div className="h-1.5 w-16 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20 shadow-inner">
                            <FaCloudUploadAlt className="w-4 h-4 text-emerald-400 drop-shadow-md" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-neutral-300 rounded-full mb-2 shadow-inner opacity-60" />
                            <div className="h-1.5 w-24 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🚀</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">3+ Projects</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Shipped to production</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">MERN Stack</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Full-stack ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card heading / description */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
    >
      <div className="h-full w-full bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400" />
    </motion.div>
  );
}

function SectionIndex({ n }) {
  return (
    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 tracking-widest mr-2 align-middle">
      {String(n).padStart(2, "0")} /
    </span>
  );
}

function Section({ id, title, subtitle, index, children }) {
  return (
    <motion.section
      id={id}
      className="mt-14"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <h2
        className="text-xl font-semibold text-neutral-900 dark:text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {index != null && <SectionIndex n={index} />}
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 mb-5">
          {subtitle}
        </p>
      )}
      {!subtitle && <div className="mb-5" />}
      {children}
    </motion.section>
  );
}

function Row({ logo, color, title, subtitle, period }, i) {
  return (
    <motion.div
      key={title}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      className="flex items-start justify-between gap-4 py-3"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: color }}
        >
          {logo}
        </div>
        <div>
          <p className="font-semibold text-neutral-900 dark:text-white leading-tight">
            {title}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-tight">
            {subtitle}
          </p>
        </div>
      </div>
      <p className="text-sm text-neutral-400 dark:text-neutral-500 whitespace-nowrap pt-2">
        {period}
      </p>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
function SkillPill({ Icon, label }) {
  return (
    <motion.div
      variants={pillVariants}
      whileHover={{
        y: -3,
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.04)",
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center gap-2.5 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0E0E10] px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-colors duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none overflow-hidden cursor-default"
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_75%)] pointer-events-none" />
      {Icon && (
        <Icon
          size={16}
          className="text-neutral-500 dark:text-white/40 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:scale-110 transition-all duration-300 ease-out"
        />
      )}
      <span className="tracking-wide dark:font-light">{label}</span>
    </motion.div>
  );
}

function ProjectCard({
  accent,
  title,
  period,
  link,
  github,
  description,
  tags,
  i,
}) {
  const [pos, setPos] = React.useState({ x: 50, y: 0 });
  const [hovering, setHovering] = React.useState(false);

  return (
    <motion.div
      key={title}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: hovering ? 0.12 : 0,
          background: `radial-gradient(220px circle at ${pos.x}% ${pos.y}%, ${accent}, transparent 70%)`,
        }}
      />
      <div className="h-2" style={{ backgroundColor: accent }} />
      <div className="relative h-32 sm:h-40 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            color: accent,
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium px-3 py-1.5"
            >
              🌐 Live
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium px-3 py-1.5"
            >
              ⌥ Code
            </a>
          )}
        </div>
        <span className="relative text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3
            className="font-semibold text-neutral-900 dark:text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h3>
          <span className="text-neutral-400 dark:text-neutral-500">↗</span>
        </div>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-0.5">
          {period}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 text-neutral-600 dark:text-neutral-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FloatingDock({ theme, toggleTheme }) {
  const links = [
    { Icon: FaHome, label: "Home", href: "#" },
    { Icon: FaBook, label: "Resume", href: "#resume" },
    {
      Icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/Shivam10yadav/",
    },
    {
      Icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shivam10yadav/",
    },
    { Icon: FaTwitter, label: "X", href: "https://x.com/Y80Shivam" },
    {
      Icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/shivam05_10/",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur px-3 py-2 shadow-lg">
        {links.map(({ Icon, label, href }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            whileHover={{ y: -3, scale: 1.08 }}
            className="h-10 w-10 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Icon size={17} />
          </motion.a>
        ))}
        <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1" />

        <motion.button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className="h-10 w-10 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Portfolio({ theme, toggleTheme }) {
  const name = "Shivam Yadav";
  const role = "Full Stack Developer";
  const tagline =
    "I design and build fast, scalable, and user-centric web applications with a strong focus on clean architecture, responsive interfaces, and exceptional user experience.";

  const SKILLS = [
    { Icon: FaReact, label: "React" },
    { Icon: SiJavascript, label: "JavaScript" },
    { Icon: FaHtml5, label: "HTML & CSS" },
    { Icon: SiTailwindcss, label: "Tailwind CSS" },
    { Icon: FaNodeJs, label: "Node.js" },
    { Icon: FaPython, label: "Python" },
    { Icon: SiMysql, label: "MySQL" },
    { Icon: SiRedux, label: "Redux" },
    { Icon: SiGit, label: "Git" },
    { Icon: SiGithub, label: "GitHub" },
    { Icon: SiGithubactions, label: "GitHubActions" },
    { Icon: SiDocker, label: "Docker" },
    { Icon: FaServer, label: "REST APIs" },
    { Icon: SiMongodb, label: "MongoDB" },
    { Icon: SiExpress, label: "Express.js" },
    { Icon: SiSecurityscorecard, label: "JWT Authentication" },
    { Icon: SiFramer, label: "Framer Motion" },
    { Icon: SiFirebase, label: "Firebase" },
    { Icon: SiVercel, label: "Vercel" },
    { Icon: SiRender, label: "Render" },
    { Icon: SiAxios, label: "Axios" },
    { Icon: SiSocketdotio, label: "Socket.io" },
    { Icon: SiReactrouter, label: "React Router" },
  ];

  const projects = [
    {
      accent: "#2563EB",
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
      accent: "#F97316",
      title: "Reverto",
      period: "2026",
      image: "/reverto.png",
      link: "https://reverto.vercel.app",
      github: "#",
      description:
        "A community-driven lost and found platform for reporting, searching, and recovering lost belongings.",
      tags: [
        "React",
        "Node.js",
        "MongoDB",
        "Cloudinary",
        "JWT",
        "Tailwind CSS",
      ],
    },
    {
      accent: "#10B981",
      title: "ParkFlow",
      period: "2026",
      image: "/parkflow.png",
      link: "#",
      github: "#",
      description:
        "A smart parking management system for booking parking spaces and managing reservations.",
      tags: ["React", "Node.Js", "Express.Js", "MongoDB", "Tailwind CSS"],
    },
  ];

  const education = [
    {
      logo: "B",
      color: "#000000",
      title: "Bachelor of Computer Applications (BCA)",
      subtitle: "Pt Chiranji Lal Sharma / Kurekshetra University",
      period: "2023 - 2026",
    },
    {
      logo: "H",
      color: "#808080",
      title: "Higher Secondary (XII)",
      subtitle: "SD Adarsh public School",
      period: "2020 - 2022",
    },
  ];

  const certifications = [
    {
      logo: "✓",
      color: "#10B981",
      title: "JavaScript Algorithms and Data Structures",
      subtitle: "freeCodeCamp",
      period: "2025",
    },
    {
      logo: "✓",
      color: "#6366F1",
      title: "React - The Complete Guide",
      subtitle: "Udemy",
      period: "2025",
    },
    {
      logo: "✓",
      color: "#F97316",
      title: "Programming Fundamentals",
      subtitle: "NPTEL / Coursera",
      period: "2024",
    },
  ];
  const toolbox = [
    { icon: FaCode, title: "VS Code", description: "Primary code editor" },
    { icon: SiGit, title: "Git", description: "Version control" },
    { icon: SiGithub, title: "GitHub", description: "Code hosting" },
    { icon: SiPostman, title: "Postman", description: "API testing" },
    { icon: SiFigma, title: "Figma", description: "UI inspiration" },
    {
      icon: SiMongodb,
      title: "MongoDB Compass",
      description: "Database management",
    },
    { icon: SiVercel, title: "Vercel", description: "Frontend deployment" },
    { icon: SiRender, title: "Render", description: "Backend hosting" },
  ];

  const achievements = [
    {
      icon: FaRocket,
      title: "3+ Production Projects",
      description:
        "Built and deployed full-stack web applications solving real-world problems.",
    },
    {
      icon: FaShieldAlt,
      title: "Authentication Systems",
      description:
        "Implemented secure JWT authentication, authorization, and protected routes.",
    },
    {
      icon: FaLaptopCode,
      title: "Modern UI Development",
      description:
        "Created responsive and interactive interfaces using React, Tailwind CSS, and Framer Motion.",
    },
    {
      icon: FaCloudUploadAlt,
      title: "Cloud Deployment",
      description:
        "Deployed and maintained applications on Vercel and Render with production-ready environments.",
    },
  ];

  const journey = [
    {
      year: "2023",
      title: "Started My Development Journey",
      description:
        "Started my BCA and explored programming fundamentals. Learned HTML, CSS, JavaScript, and built my first responsive web pages while discovering my passion for web development.",
    },
    {
      year: "2024",
      title: "Learning Full-Stack Development",
      description:
        "Focused on React, Node.js, Express, and MongoDB. Built full-stack projects, learned REST APIs, authentication, database design, and strengthened my understanding of modern web development.",
    },
    {
      year: "2025",
      title: "Building & Deploying Real-World Applications",
      description:
        "Shifted from tutorial projects to production-style applications like QueueLess, ParkFlow, and Reverto. Learned deployment using platforms like Vercel and Render, managed environment variables, and improved application performance and scalability.",
    },
    {
      year: "2026",
      title: "Ready for My First Developer Role",
      description:
        "Graduating with a portfolio of deployed full-stack applications, continuously learning system design, performance optimization, and best development practices while actively seeking opportunities as a Software Developer.",
    },
  ];

  const developmentProcess = [
    {
      icon: FaLightbulb,
      title: "Plan",
      description:
        "Understand the problem, gather requirements, and define the project structure.",
    },
    {
      icon: FaPenNib,
      title: "Design",
      description:
        "Create clean UI layouts, reusable components, and a great user experience.",
    },
    {
      icon: FaCode,
      title: "Develop",
      description:
        "Build scalable frontend and backend features using modern web technologies.",
    },
    {
      icon: FaBug,
      title: "Test",
      description:
        "Debug issues, validate functionality, and optimize performance across devices.",
    },
    {
      icon: FaRocket,
      title: "Deploy",
      description:
        "Deploy applications, monitor performance, and continuously improve based on feedback.",
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased overflow-x-hidden transition-colors duration-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <ScrollProgress />

      {/* NEW: Cinematic pinned scroll hero replaces the old static hero */}
      <CinematicHero theme={theme} />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Resume */}
        <Section id="resume" title="Resume" index={1}>
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-7">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, rotate: -1 }}
              className="relative shrink-0 block"
            >
              <div className="absolute top-2 left-2 w-32 h-44 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />
              <div className="absolute top-1 left-1 w-32 h-44 rounded-lg bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700" />

              <div className="relative w-32 h-44 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm p-3 overflow-hidden">
                <div className="h-2.5 w-14 rounded-full bg-neutral-800 dark:bg-neutral-200 mb-1.5" />
                <div className="h-1.5 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700 mb-3" />

                <div className="space-y-1.5">
                  <div className="h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1 w-5/6 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1 w-2/3 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>

                <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-3 mb-1.5" />
                <div className="space-y-1.5">
                  <div className="h-1 w-full rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-1 w-4/5 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                </div>

                <div
                  className="absolute bottom-0 right-0 h-8 w-8 opacity-80"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 50%, #e5e7eb 50%)",
                  }}
                />
              </div>
            </motion.a>

            <div className="flex-1 text-center sm:text-left">
              <h3
                className="font-semibold text-neutral-900 dark:text-white text-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                My Resume
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm">
                A quick one-page summary of my skills, projects, and education —
                view it in your browser or download a copy.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium px-5 py-2.5"
                >
                  Open in new tab <FaArrowRight size={12} />
                </motion.a>

                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium px-5 py-2.5"
                >
                  Download
                </motion.a>
              </div>
            </div>
          </div>
        </Section>

        {/* About */}
        <Section
          id="about"
          title="About"
          subtitle="A little about me and what I enjoy building."
          index={1}
        >
          <div className="max-w-4xl space-y-5 text-lg leading-9 text-neutral-600 dark:text-neutral-400">
            <p>
              I'm a{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                Computer Science graduate
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>{" "}
              passionate about building{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                modern, scalable web applications
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>
              . I enjoy transforming ideas into intuitive digital experiences
              through clean code, responsive interfaces, and thoughtful design.
            </p>

            <p>
              I've built projects like{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                QueueLess
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>
              ,{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                Reverto
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>
              , and{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                ParkFlow
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>
              , strengthening my skills in the MERN stack, REST APIs,
              authentication, and backend architecture. I'm currently seeking
              opportunities where I can{" "}
              <span className="relative inline-block font-medium text-neutral-900 dark:text-white">
                learn, collaborate, and contribute
                <span className="absolute left-0 bottom-1 -z-10 h-2 w-full rounded bg-yellow-200 dark:bg-yellow-500/40" />
              </span>{" "}
              while growing as a full-stack developer.
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills" index={2}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap gap-3 max-w-5xl"
          >
            {SKILLS.map((skill) => (
              <SkillPill
                key={skill.label.trim()}
                Icon={skill.Icon}
                label={skill.label.trim()}
              />
            ))}
          </motion.div>
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          title="Featured Projects"
          subtitle="Real-world applications I've built."
          index={3}
        >
          <div className="space-y-28">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 aspect-video"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">
                      View Project →
                    </span>
                  </div>
                </motion.div>

                <div>
                  <span className="text-sm uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
                    0{i + 1}
                  </span>

                  <h2
                    className="mt-3 text-4xl font-bold text-neutral-900 dark:text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </h2>

                  <p className="mt-6 text-neutral-600 dark:text-neutral-400 leading-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-8 mt-10">
                    <a
                      href={project.link}
                      className="font-medium text-neutral-900 dark:text-white hover:underline"
                    >
                      Live Demo →
                    </a>

                    <a
                      href={project.github}
                      className="font-medium text-neutral-900 dark:text-white hover:underline"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* journey */}
        <Section
          id="journey"
          title="My Journey"
          subtitle="Every year brought new challenges, skills, and milestones."
          index={4}
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent dark:from-neutral-700 dark:via-neutral-800" />

            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex gap-8 pb-16 last:pb-0"
              >
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xl">
                  <span className="text-sm font-bold">
                    {item.year.slice(2)}
                  </span>
                </div>

                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex-1 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7 transition-all duration-300 hover:shadow-2xl"
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-neutral-400">
                    {item.year}
                  </span>

                  <h3
                    className="mt-3 text-2xl font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* process */}
        <Section
          id="process"
          title="Development Process"
          subtitle="How I transform ideas into production-ready applications."
          index={5}
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent dark:from-neutral-700 dark:via-neutral-800" />

            {developmentProcess.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xl"
                >
                  <step.icon size={24} />
                </motion.div>

                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  className="relative flex-1 overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl p-8 shadow-sm transition-all"
                >
                  <span
                    className="absolute right-6 top-2 text-7xl font-black text-neutral-100 dark:text-neutral-800 select-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className="text-2xl font-semibold text-neutral-900 dark:text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-2xl leading-8 text-neutral-500 dark:text-neutral-400">
                    {step.description}
                  </p>

                  <div className="mt-6 h-1 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="h-full bg-neutral-900 dark:bg-white"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* toolbox */}
        <Section
          id="toolbox"
          title="Toolbox"
          subtitle="Technologies I use to design, build, test, and deploy modern web applications."
          index={6}
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4">
            {toolbox.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                animate={{ y: [0, -4, 0] }}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? -2 : 2 }}
                className="group relative flex w-[150px] flex-col items-center rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 backdrop-blur-sm px-4 py-5 text-center shadow-sm transition-all duration-300 hover:border-blue-500/40 dark:hover:border-violet-500/40 hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-violet-500/5"
              >
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:from-blue-500/[0.02] group-hover:to-violet-500/[0.02] group-hover:opacity-100" />

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800/50 transition-colors duration-300 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800">
                  <tool.icon
                    size={22}
                    className="text-neutral-700 dark:text-neutral-300 transition-colors duration-300 group-hover:text-blue-500 dark:group-hover:text-violet-400"
                  />
                </div>

                <h3
                  className="mt-4 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {tool.title}
                </h3>

                <p className="mt-1 text-xs leading-normal text-neutral-400 dark:text-neutral-500">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* education */}
        <Section
          id="education"
          title="Education"
          subtitle="My academic journey."
          index={7}
        >
          <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 space-y-10">
            {education.map((e, i) => (
              <motion.div
                key={e.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative pl-8"
              >
                <div
                  className="absolute -left-[11px] top-2 h-5 w-5 rounded-full border-4 border-white dark:border-neutral-950 shadow"
                  style={{ backgroundColor: e.color }}
                />

                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="text-lg font-semibold text-neutral-900 dark:text-white"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {e.title}
                      </h3>

                      <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                        {e.subtitle}
                      </p>
                    </div>

                    <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                      {e.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* achievements */}
        <Section
          id="achievements"
          title="Highlights"
          subtitle="Highlights from my journey as a developer."
          index={8}
        >
          <div className="space-y-5">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="group flex items-start gap-5 border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 py-2"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 transition-all duration-300 group-hover:scale-110">
                  <a.icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-lg font-semibold text-neutral-900 dark:text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {a.title}
                    </h3>

                    <span className="text-sm text-neutral-400 dark:text-neutral-500">
                      0{i + 1}
                    </span>
                  </div>

                  <p className="mt-2 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* contact */}
        <motion.section
          id="contact"
          className="mt-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-8 py-12 text-center">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let's build something together
              </h2>
              <p className="text-neutral-400 mt-3 max-w-sm mx-auto">
                I'm actively looking for my first developer role. Reach out for
                opportunities, collaborations, or just to say hi.
              </p>

              <motion.a
                href="mailto:you@example.com"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 mt-7 rounded-full bg-white text-neutral-900 text-sm font-semibold px-6 py-3"
              >
                Say hello <FaArrowRight size={13} />
              </motion.a>

              <div className="flex items-center justify-center gap-5 mt-8">
                <a
                  href="https://github.com/Shivam10yadav/"
                  aria-label="GitHub"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shivam10yadav/"
                  aria-label="LinkedIn"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://x.com/Y80Shivam"
                  aria-label="X"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="/resume.pdf"
                  aria-label="Resume"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaBook size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
      <FloatingDock theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}



export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState("light");

  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Portfolio theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}