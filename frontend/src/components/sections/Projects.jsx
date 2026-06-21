import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projectsAPI } from "../../utils/api";

const gold = "#c9a84c";
const dim = "#5a5a72";

const FALLBACK = [
  {
    _id: "1",
    title: "Intelliwrite-ui",
    category: "frontend",
    description:
      "A sleek, modern AI Writing Assistant landing page built with React and Tailwind CSS. Includes hero, features, and pricing sections with a glowing futuristic design..",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Context API"],
    emoji: "⚙️",
    gradient: "linear-gradient(135deg,#30cfd0,#330867)",
    githubUrl: "https://github.com/hashirahmad806/Intelliwrite-ui",
    liveUrl: "https://intelliwrite-ui.vercel.app",
  },
  {
    _id: "2",
    title: "AI Blog Platformar",
    category: "fullstack",
    description:
      "AI-Powered Full-Stack Blog Platform with secure backend, admin-controlled blog publishing and comments, AI-assisted content creation, and safe file uploads. Users can read blogs while admins manage posts and moderation, demonstrating a scalable, modern, and secure web application.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Mongoose",
    ],
    emoji: "✅",
    gradient: "linear-gradient(135deg,#fa709a,#fee140)",
    githubUrl: "https://github.com/hashirahmad806/Quick-Blogs",
    liveUrl: "https://quick-blogs-i4xh.vercel.app/",
  },
  {
    _id: "3",
    title: "Doctor Appointment Website",
    category: "fullstack",
    description:
      "AI Student Assistant is an intelligent, full-stack educational companion designed to empower students. Seamlessly integrated with high-performance LLMs via Groq, it offers multimodal capabilities to chat, analyze study resources, and solve problems from uploaded images in real-time.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Groq",
      "Lenis",
      "Gsap",
    ],
    emoji: "🏥",
    gradient: "linear-gradient(135deg,#667eea,#764ba2)",
    githubUrl: "https://github.com/hashirahmad806/Web_Projectect_Ai_Assistant",
    liveUrl: "https://web-projectect-ai-assistant-x8xz.vercel.app/",
  },
  {
    _id: "4",
    title: "Malakand News Website",
    category: "fullstack",
    description:
      "Dynamic news aggregation platform for the Malakand region with category navigation, breaking news alerts, search functionality & a full CMS.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    emoji: "https://malakand-news.vercel.app/",
    gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
    githubUrl: "https://github.com/hashirahmad806",
    liveUrl: "https://malakand-news.vercel.app/",
  },
  {
    _id: "5",
    title: "ReelNova-Movie-Web",
    category: "fullstack",
    description:
      "RealNova is a modern movie discovery web app built with React and Tailwind CSS. It features real-time search, favorites, Appwrite authentication, analytics tracking, and a sleek responsive UI. Built for film lovers to explore, save, and enjoy curated movie content effortlessly.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT"],
    emoji: "https://reel-nova-movie.vercel.app/",
    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
    githubUrl: "https://github.com/hashirahmad806/ReelNova-Movie-Web",
    liveUrl: "https://reel-nova-movie.vercel.app/",
  },
  {
    _id: "6",
    title: "BrewManager Pro",
    category: "fullstack",
    description:
      "BrewManager Pro  as  Cafe Management Application A modern, highly aesthetic dine-in order and management application built using the MERN stack (MongoDB, Express, React, Node.js). It features fluid animations, smooth scrolling, and responsive styling.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    emoji: "🛒",
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
    githubUrl: "https://github.com/hashirahmad806",
    liveUrl: "https://cafe-management-do4l.vercel.app/",
  },
];

const FILTERS = ["all", "fullstack", "frontend", "backend"];

function ProjectCard({ p, i }) {
  const { ref, visible } = useScrollReveal(0.05);
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, borderColor: "rgba(201,168,76,0.25)" }}
      style={{
        borderRadius: 20,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .6s ease ${i * 0.07}s, transform .6s ease ${i * 0.07}s`,
        boxShadow: "0 0 0 0 transparent",
      }}
    >
      {/* Visual header */}
      {/* <div style={{ height: 170, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: p.gradient, opacity: 0.18 }} />
        <span style={{ fontSize: 56, position: 'relative', zIndex: 1 }}>{p.emoji}</span>
      </div> */}

      {/* Visual header */}
      <div
        style={{
          height: 170,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: p.gradient,
            opacity: 0.18,
          }}
        />

        <img
          src={`https://api.microlink.io/?url=${p.liveUrl}&screenshot=true&meta=false&embed=screenshot.url`}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 10,
            color: gold,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {p.category}
        </div>
        <div
          style={{
            fontFamily: "'Clash Display','Syne',sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {p.title}
        </div>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--text3)",
            marginBottom: 18,
          }}
        >
          {p.description}
        </p>

        {/* Tech chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 20,
          }}
        >
          {p.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 10,
                letterSpacing: "0.04em",
                border: "1px solid var(--border)",
                color: "var(--text3)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { href: p.githubUrl, Icon: FiGithub, label: "Code" },
            { href: p.liveUrl, Icon: FiExternalLink, label: "Demo" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: "1px solid var(--border)",
                color: "var(--text2)",
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,.3)";
                e.currentTarget.style.color = gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text2)";
              }}
            >
              <Icon size={12} /> {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: p.gradient, opacity: 0.35 }} />
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState(FALLBACK);
  const { ref: hRef, visible: hVis } = useScrollReveal();

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((r) => {
        if (r.data?.data?.length) setProjects(r.data.data);
      })
      .catch(() => {
        /* use fallback */
      });
  }, []);

  const shown =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={hRef}
          style={{
            opacity: hVis ? 1 : 0,
            transform: hVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .7s, transform .7s",
            marginBottom: 20,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span
              style={{
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                color: gold,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Clash Display','Syne',sans-serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Featured{" "}
            <em
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: gold,
              }}
            >
              projects
            </em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Cabinet Grotesk',sans-serif",
                border: "1px solid " + (filter === f ? gold : "var(--border)"),
                background: filter === f ? gold : "transparent",
                color: filter === f ? "#080810" : "var(--text2)",
                cursor: "pointer",
                transition: "all .25s",
                textTransform: "capitalize",
              }}
            >
              {f === "all"
                ? "All Projects"
                : f === "fullstack"
                  ? "Full Stack"
                  : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            layout
          >
            {shown.map((p, i) => (
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a
            href="https://github.com/hashirahmad806"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 28px",
              borderRadius: 100,
              border: "1px solid var(--border)",
              color: "var(--text2)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Cabinet Grotesk',sans-serif",
              textDecoration: "none",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,168,76,.35)";
              e.currentTarget.style.color = gold;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text2)";
            }}
          >
            <FiGithub size={16} /> View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
