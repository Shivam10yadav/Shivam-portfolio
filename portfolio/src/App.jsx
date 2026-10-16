import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import WavingPortfolioLanding from "./components/WavingPortfolioLanding";
import GithubActivity from "./components/GithubActivity";
import Dock from "./components/Dock";
import TechStack from "./components/TechStack";
import Journey from "./components/Journey";
import Toolbox from "./components/Toolbox";
import Services from "./components/Toolbox";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Projects from "./components/Projetcs";
import Principles from "./components/Principles";
import Education from "./components/Education";
import Contact from "./components/Contact";



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
      subtitle: "Pt Chiranji Lal Sharma / Kurukshetra University",
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

<div className="relative">
  <WavingPortfolioLanding
    name="Shivam Yadav"
    year="2026"
    roles={["Full Stack Developer", "Open To Work"]}
    lettersLeft={["SHIV", "Y"]}
    giantLetter="A"
    lettersRight={["M", "DAV"]}
    title="Shivam Yadav, Full Stack Developer"
    signature="SHIVAM/YADAV"
    greeting="Hi, I'm Shivam!"
    accent={theme === "dark" ? "#ffffff" : "#0a0a0a"}
    paper={theme === "dark" ? "#0a0a0a" : "#ffffff"}
    ink={theme === "dark" ? "#ffffff" : "#0a0a0a"}
  />

  {/* Hero buttons (desktop and tablet only) */}
  <div className="hidden md:flex absolute bottom-8 right-10 z-10 gap-3">
    <a
      href="#projects"
      className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium px-5 py-2.5 hover:scale-105 transition-transform"
    >
      View Projects
    </a>
    <a
      href="#contact"
      className="rounded-full border border-neutral-900 dark:border-white text-neutral-900 dark:text-white text-sm font-medium px-5 py-2.5 hover:scale-105 transition-transform"
    >
      Contact Me
    </a>
  </div>

  {/* Scroll hint */}
  <div className="hidden md:flex absolute bottom-8 left-10 z-10 items-center gap-2 text-xs tracking-[0.3em] uppercase text-neutral-500 dark:text-neutral-400">
    <span className="animate-bounce">↓</span> Scroll
  </div>
</div>


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
   <About/>

        {/* Skills */}
    {/* Tech Stack */}
<Section
  id="skills"
  title="Tech Stack"
  subtitle="Hover over the icons to explore the tools I work with."
  index={2}
>
  <TechStack />
</Section>

        {/* Projects */}
   <Projects/>

        {/* GitHub activity */}
{/* GitHub activity */}
<Section
  id="github"
  title="GitHub Activity"
  subtitle="A year of consistent building, straight from my GitHub."
>
  <div className="relative left-1/2 w-[min(94vw,68rem)] -translate-x-1/2 my-6">
    <GithubActivity username="Shivam10yadav" />
  </div>
</Section>



        {/* journey */}
      <Section id="journey" title="My Journey" subtitle="Every year brought new challenges, skills, and milestones." index={4}>
  <Journey journey={journey} />
</Section>

        {/* process */}
     <Principles/>

<Section id="toolbox" title="Toolbox" subtitle="..." index={6}>
  <Toolbox toolbox={toolbox} />
</Section>

        {/* education */}
   <Education/>

        {/* achievements */}
     

        {/* contact */}
      <Contact/>
      </div>
      <Footer />
         <Dock theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}



// import Portfolio from "./Portfolio";  // however you already import it


// import Portfolio from "./Portfolio";  // however you already import it

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(media.matches ? "dark" : "light");

  // follow the system theme, including when it changes while the site is open
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // keep your existing effects below this unchanged
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

  return <Portfolio theme={theme} toggleTheme={toggleTheme} />;
}