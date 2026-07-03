import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
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
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: "easeOut" },
  }),
};

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

function SkillPill({ Icon, label }, i) {
  return (
    <motion.span
      key={label}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
      whileHover={{ y: -2, scale: 1.03 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-1.5 text-sm text-neutral-700 dark:text-neutral-200 shadow-sm"
    >
      <Icon size={15} className="text-neutral-500 dark:text-neutral-400" />
      {label}
    </motion.span>
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
    { Icon: FaGithub, label: "GitHub", href: "https://github.com/Shivam10yadav/" },
    { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shivam10yadav/" },
    { Icon: FaTwitter, label: "X", href: "https://x.com/Y80Shivam" },
    { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/shivam05_10/" },
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
  // ---- Replace everything below with your real details ----

  const name = "Shivam Yadav";
  const role = "Full Stack Developer";
  const tagline =
    "I design and build fast, scalable, and user-centric web applications with a strong focus on clean architecture, responsive interfaces, and exceptional user experience.";

  const skills = [
    { Icon: FaReact, label: "React" },
    { Icon: SiJavascript, label: "JavaScript" },
    { Icon: FaHtml5, label: "HTML & CSS" },
    { Icon: SiTailwindcss, label: "Tailwind CSS" },
    { Icon: FaNodeJs, label: "Node.js" },
    { Icon: FaPython, label: "Python" },
    { Icon: SiMysql, label: "MySQL" },
    { Icon: SiRedux, label: "Redux" },
    { Icon: SiGit, label: "Git" },
    { Icon: SiGithub, label: "Github" },
    { Icon: FaServer, label: "REST APIs" },
    { Icon: SiMongodb, label: "MongoDB" },
    { Icon: SiExpress, label: "Express.Js" },
    { Icon: SiSecurityscorecard, label: "Jwt Authentication " },
    { Icon: SiFramer, label: "Framer-Motion " },
    { Icon: SiFirebase, label: "Firebase " },
    { Icon: SiVercel, label: "Vercel " },
    { Icon: SiRender, label: "Render " },
    { Icon: SiAxios, label: "Axios " },
    { Icon: SiSocketdotio, label: "Socket.Io " },
    { Icon: SiReactrouter, label: "React Router " },
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
    {
      icon: FaCode,
      title: "VS Code",
      description: "Primary code editor",
    },
    {
      icon: SiGit,
      title: "Git",
      description: "Version control",
    },
    {
      icon: SiGithub,
      title: "GitHub",
      description: "Code hosting",
    },
    {
      icon: SiPostman,
      title: "Postman",
      description: "API testing",
    },
    {
      icon: SiFigma,
      title: "Figma",
      description: "UI inspiration",
    },
    {
      icon: SiMongodb,
      title: "MongoDB Compass",
      description: "Database management",
    },
    {
      icon: SiVercel,
      title: "Vercel",
      description: "Frontend deployment",
    },
    {
      icon: SiRender,
      title: "Render",
      description: "Backend hosting",
    },
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
      {/* dot pattern  */}
      <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 dark:opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            maskImage:
              "linear-gradient(to bottom, black 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 45%, transparent 100%)",
          }}
        />
      </div>
      <ScrollProgress />

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero / Main */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12"
        >
          {/* Left Content */}
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs font-medium px-3 py-1 mb-4"
            ></motion.span>

            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight flex text-neutral-900 dark:text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelectorAll("span").forEach((s) => {
                  s.style.transform = "scale(1)";
                });
              }}
            >
              {`Hi, I'm ${name}`.split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.4, fontWeight: 900 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <p className="text-neutral-700 dark:text-neutral-300 font-medium text-lg mt-3">
              {role}
            </p>

            <p className="text-neutral-500 dark:text-neutral-400 mt-5 max-w-lg leading-relaxed">
              {tagline}
            </p>

            <div className="flex gap-3 mt-8">
              <a
                href="#projects"
                className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium px-6 py-3"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium px-6 py-3"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative shrink-0">
            <div
              className="absolute -inset-6 rounded-full opacity-30 blur-xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(96,165,250,0.5), transparent 70%)",
              }}
            />

            <div className="relative shrink-0">
              <div
                className="absolute -inset-3 rounded-full opacity-30 blur-lg"
                style={{
                  background:
                    "radial-gradient(circle, rgba(96,165,250,0.5), transparent 70%)",
                }}
              />

              <div className="relative h-60 w-60 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-800">
                <img
                  src="/profile.jpeg"
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resume */}
        <Section id="resume" title="Resume" index={1}>
          <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-7">
            {/* Mini document preview */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, rotate: -1 }}
              className="relative shrink-0 block"
            >
              {/* stacked paper effect */}
              <div className="absolute top-2 left-2 w-32 h-44 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />
              <div className="absolute top-1 left-1 w-32 h-44 rounded-lg bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700" />

              <div className="relative w-32 h-44 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm p-3 overflow-hidden">
                {/* fake header */}
                <div className="h-2.5 w-14 rounded-full bg-neutral-800 dark:bg-neutral-200 mb-1.5" />
                <div className="h-1.5 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700 mb-3" />

                {/* fake lines of text */}
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
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s, i) => SkillPill(s, i))}
          </div>
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
                {/* Image */}
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

    {/* Timeline */}
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
        {/* Dot */}
        <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xl">
          <span className="text-sm font-bold">
            {item.year.slice(2)}
          </span>
        </div>

        {/* Card */}
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

    {/* Timeline */}
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
        {/* Icon Circle */}
        <motion.div
          whileHover={{
            scale: 1.15,
            rotate: 8,
          }}
          className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full
          bg-neutral-900 text-white
          dark:bg-white dark:text-neutral-900
          shadow-xl"
        >
          <step.icon size={24} />
        </motion.div>

        {/* Card */}
        <motion.div
          whileHover={{
            y: -8,
            scale: 1.01,
          }}
          transition={{ type: "spring", stiffness: 250 }}
          className="relative flex-1 overflow-hidden rounded-3xl
          border border-neutral-200 dark:border-neutral-800
          bg-white/70 dark:bg-neutral-900/70
          backdrop-blur-xl
          p-8 shadow-sm transition-all"
        >
          {/* Huge Watermark */}
          <span
            className="absolute right-6 top-2 text-7xl font-black
            text-neutral-100 dark:text-neutral-800 select-none"
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

          {/* Progress Line */}
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
  subtitle="Technologies I use to design, build, test and deploy modern web applications."
  index={6}
>
  <div className="flex flex-wrap justify-center gap-5">
    {toolbox.map((tool, i) => (
      <motion.div
        key={tool.title}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: i * 0.08,
          duration: 0.5,
        }}
        animate={{
          y: [0, -6, 0],
        }}
        whileHover={{
          scale: 1.08,
          rotate: i % 2 === 0 ? -4 : 4,
          y: -10,
        }}
        transition={{
          y: {
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className={`group relative flex w-[170px] flex-col items-center rounded-3xl border
        border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        px-6 py-7 shadow-sm transition-all hover:shadow-xl
        ${
          i % 3 === 1
            ? "mt-8"
            : i % 3 === 2
            ? "mt-16"
            : ""
        }`}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-cyan-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-blue-500/10 group-hover:via-violet-500/10 group-hover:to-cyan-500/10 group-hover:opacity-100" />

        {/* Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
          <tool.icon
            size={30}
            className="text-neutral-900 dark:text-white"
          />
        </div>

        {/* Name */}
        <h3
          className="relative mt-5 text-lg font-semibold text-neutral-900 dark:text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {tool.title}
        </h3>

        {/* Description */}
        <p className="relative mt-2 text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
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

        {/* achievments */}
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


{/* conatct */}
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
      <Footer/>
      <FloatingDock theme={theme} toggleTheme={toggleTheme} />
    </div>  
  );
}



const GREETINGS = [
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "⠓⠑⠇⠇⠕", lang: "Braille" },
];

const PER_WORD_MS = 1000;

export function IntroGreeting({ onComplete }) {
  const [index, setIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);

  React.useEffect(() => {
    if (index >= GREETINGS.length - 1) {
      const exitTimer = setTimeout(() => setExiting(true), PER_WORD_MS + 200);
      const doneTimer = setTimeout(
        () => onComplete && onComplete(),
        PER_WORD_MS + 1100,
      );
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(doneTimer);
      };
    }
    const t = setTimeout(() => setIndex((i) => i + 1), PER_WORD_MS);
    return () => clearTimeout(t);
  }, [index, onComplete]);

  const skip = () => {
    setExiting(true);
    setTimeout(() => onComplete && onComplete(), 900);
  };

  const current = GREETINGS[index];
  const letters = current.text.split("");

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.045 } },
    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 40, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 170, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: -24,
      filter: "blur(4px)",
      transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] },
    },
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro-root"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A0A0A] origin-top select-none overflow-hidden"
        >
          {/* Film grain */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none mix-blend-overlay">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          {/* Breathing spotlight */}
          <motion.div
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[36rem] h-[36rem] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)",
            }}
          />

          {/* Corner registration marks */}
          {[
            "top-6 left-6 border-t border-l",
            "top-6 right-6 border-t border-r",
            "bottom-6 left-6 border-b border-l",
            "bottom-6 right-6 border-b border-r",
          ].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-4 h-4 border-[#FAFAF8]/20`} />
          ))}

          {/* Progress tracker */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            {GREETINGS.map((g, i) => (
              <div key={g.lang} className="relative h-[1.5px] w-5 bg-[#FAFAF8]/10 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: i < index ? "100%" : i === index ? "100%" : "0%" }}
                  transition={{ duration: i === index ? PER_WORD_MS / 1000 : 0.2, ease: "linear" }}
                  className="absolute left-0 top-0 h-full bg-[#FAFAF8]/80"
                />
              </div>
            ))}
          </div>

          {/* Typography */}
          <div className="relative h-44 flex flex-col items-center justify-center px-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.text}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-wrap justify-center text-center font-medium tracking-tight"
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={letterVariants}
                    style={{
                      display: "inline-block",
                      fontSize: "clamp(3rem, 10vw, 6.5rem)",
                      fontFamily: "'Space Grotesk', 'Noto Sans', sans-serif",
                    }}
                    className="text-[#FAFAF8] leading-none pb-2"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`lang-${current.lang}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 flex items-center gap-3"
              >
                <span className="w-6 h-px bg-[#FAFAF8]/25" />
                <p className="text-[10px] uppercase font-medium text-[#8A8A8A] tracking-[0.35em]">
                  {current.lang}
                </p>
                <span className="w-6 h-px bg-[#FAFAF8]/25" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skip */}
          <motion.button
            onClick={skip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ opacity: 1, borderColor: "rgba(250,250,248,0.4)" }}
            className="absolute bottom-12 px-5 py-2 text-[11px] font-medium text-[#8A8A8A] hover:text-[#FAFAF8] border border-[#FAFAF8]/15 rounded-full tracking-widest uppercase transition-colors duration-300"
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [theme, setTheme] = React.useState("light");

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
      {showIntro && <IntroGreeting onComplete={() => setShowIntro(false)} />}
      <Portfolio theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}
