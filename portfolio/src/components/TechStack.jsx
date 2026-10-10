import React from "react";
import { ToolDock, ToolDockTile } from "./ToolDock";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaPython,
  FaServer,
  FaShieldAlt,
  FaLaptopCode,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiReactrouter,
  SiFramer,
  SiExpress,
  SiSocketdotio,
  SiAxios,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiVercel,
  SiRender,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
} from "react-icons/si";

// One coloured app-icon tile: background colour + logo colour.
const tile = (Icon, bg, fg = "#ffffff") => (
  <ToolDockTile style={{ backgroundColor: bg }}>
    <Icon
      aria-hidden="true"
      style={{ color: fg, width: "54%", height: "54%" }}
    />
  </ToolDockTile>
);

// Your full tech stack, grouped into 4 rounded cards.
const GROUPS = [
  {
    title: "Frontend",
    note: "Interfaces & animation",
    HeadIcon: FaLaptopCode,
    items: [
      { label: "React", icon: tile(FaReact, "#20232A", "#61DAFB") },
      { label: "JavaScript", icon: tile(SiJavascript, "#F7DF1E", "#111111") },
      { label: "HTML & CSS", icon: tile(FaHtml5, "#E34F26") },
      { label: "Tailwind CSS", icon: tile(SiTailwindcss, "#0F172A", "#38BDF8") },
      { label: "Redux", icon: tile(SiRedux, "#764ABC") },
      { label: "React Router", icon: tile(SiReactrouter, "#CA4245") },
      { label: "Framer Motion", icon: tile(SiFramer, "#0055FF") },
    ],
  },
  {
    title: "Backend",
    note: "Servers & APIs",
    HeadIcon: FaServer,
    items: [
      { label: "Node.js", icon: tile(FaNodeJs, "#3C873A") },
      { label: "Express.js", icon: tile(SiExpress, "#111111") },
      { label: "Python", icon: tile(FaPython, "#306998", "#FFD43B") },
      { label: "REST APIs", icon: tile(FaServer, "#6366F1") },
      { label: "JWT Authentication", icon: tile(FaShieldAlt, "#0F766E") },
      { label: "Socket.io", icon: tile(SiSocketdotio, "#010101") },
      { label: "Axios", icon: tile(SiAxios, "#5A29E4") },
    ],
  },
  {
    title: "Database & Cloud",
    note: "Data & hosting",
    HeadIcon: FaDatabase,
    items: [
      { label: "MongoDB", icon: tile(SiMongodb, "#13AA52") },
      { label: "MySQL", icon: tile(SiMysql, "#00618A") },
      { label: "Firebase", icon: tile(SiFirebase, "#2B2B2B", "#FFCA28") },
      { label: "Vercel", icon: tile(SiVercel, "#000000") },
      { label: "Render", icon: tile(SiRender, "#0B0B0B", "#46E3B7") },
    ],
  },
  {
    title: "Tools & DevOps",
    note: "Workflow & delivery",
    HeadIcon: FaCode,
    items: [
      { label: "Git", icon: tile(SiGit, "#F05032") },
      { label: "GitHub", icon: tile(SiGithub, "#181717") },
      { label: "GitHub Actions", icon: tile(SiGithubactions, "#2088FF") },
      { label: "Docker", icon: tile(SiDocker, "#2496ED") },
    ],
  },
];

export default function TechStack() {
  return (
    // Breaks out of the narrow column so the 2 x 2 cards have room.
    <div className="relative left-1/2 w-[min(94vw,56rem)] -translate-x-1/2">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {GROUPS.map(({ title, note, HeadIcon, items }) => (
          <div
            key={title}
            className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                <HeadIcon size={16} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3
                  className="text-base font-semibold leading-tight text-neutral-900 dark:text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-xs leading-tight text-neutral-700 dark:text-neutral-300">
                  {note}
                </p>
              </div>
            </div>

            <ToolDock items={items} label={title} size={56} />
          </div>
        ))}
      </div>
    </div>
  );
}