import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projectsAPI } from "../../utils/api";

const gold = "#ffdca1";
const dim = "#5a5a72";

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true;

const FALLBACK = [
  {
    _id: "client-1",
    title: "Triostep Dekhyaber",
    category: "fullstack",
    isClient: true,
    clientName: "Triostep Heritage Footwear",
    description:
      "Delivered client e-commerce platform for handcrafted artisan footwear. Features luxury lookbook carousels, dynamic catalog browsing, instant search, responsive cart drawer, and WhatsApp concierge integration.",
    tech: ["Astro", "Tailwind CSS", "JavaScript", "E-Commerce", "Responsive UI"],
    gradient: "linear-gradient(135deg,#c9a84c,#212121)",
    githubUrl: "https://github.com/hashirahmad806/triostepdkhyber",
    liveUrl: "https://triostepdkhyber.vercel.app/",
  },
  {
    _id: "client-2",
    title: "Dr. Hassan Dental Clinic",
    category: "fullstack",
    isClient: true,
    clientName: "Dr. Hassan BDS",
    description:
      "Delivered healthcare & clinical aesthetics platform for Dr. Hassan BDS. Features interactive appointment consultation booking, dental service showcases, smile makeover galleries, and patient consultation workflows.",
    tech: ["React.js", "Tailwind CSS", "Vite", "Framer Motion", "Healthcare UI"],
    gradient: "linear-gradient(135deg,#00c6ff,#0072ff)",
    githubUrl: "https://github.com/hashirahmad806/Hassan_Web",
    liveUrl: "https://hassanbds.info",
  },
  {
    _id: "rag-1",
    title: "Production RAG & Vector Intelligence Pipeline",
    category: "ai",
    description:
      "High-performance Retrieval-Augmented Generation system using LangChain, MongoDB Atlas Vector Search, and OpenAI embeddings with event-driven data ingestion and semantic chunking.",
    tech: ["Python", "LangChain", "MongoDB Vector Search", "OpenAI", "Atlas Triggers"],
    gradient: "linear-gradient(135deg,#0284c7,#1e1b4b)",
    githubUrl: "https://github.com/hashirahmad806/Lang_chain_Learning",
    liveUrl: "https://github.com/hashirahmad806/Lang_chain_Learning",
  },
  {
    _id: "agentic-2",
    title: "AI Codebase Memory & Multi-Agent Graph",
    category: "ai",
    description:
      "Persistent memory graph and dynamic context compaction engine enabling multi-agent autonomous reasoning loops (ReAct) to inspect, plan, and execute over large codebases.",
    tech: ["Python", "LangGraph", "Multi-Agent Swarms", "Vector Store", "Tool Calling"],
    gradient: "linear-gradient(135deg,#6366f1,#a855f7)",
    githubUrl: "https://github.com/hashirahmad806/AI_Codebase_Memory",
    liveUrl: "https://github.com/hashirahmad806/AI_Codebase_Memory",
  },
  {
    _id: "1",
    title: "Intelliwrite-ui",
    category: "frontend",
    description:
      "A sleek, modern writing assistant landing page built with React and Tailwind CSS. Includes hero, features, and pricing sections with a polished futuristic design.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Context API"],
    gradient: "linear-gradient(135deg,#30cfd0,#330867)",
    githubUrl: "https://github.com/hashirahmad806/Intelliwrite-ui",
    liveUrl: "https://intelliwrite-ui.vercel.app",
  },
  {
    _id: "2",
    title: "Blog Platform",
    category: "fullstack",
    description:
      "Full-Stack Blog Platform with secure backend, admin-controlled blog publishing and comments, content creation workflows, and safe file uploads. Scalable, modern, and secure.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Mongoose",
    ],
    gradient: "linear-gradient(135deg,#fa709a,#fee140)",
    githubUrl: "https://github.com/hashirahmad806/Quick-Blogs",
    liveUrl: "https://quick-blogs-i4xh.vercel.app/",
  },
  {
    _id: "3",
    title: "Lumina Academic Assistant",
    category: "fullstack",
    description:
      "Intelligent full-stack educational companion with multimodal capabilities — chat, analyze study resources, and solve problems from uploaded images in real-time via Groq LLM.",
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
    gradient: "linear-gradient(135deg,#f093fb,#f5576c)",
    githubUrl: "https://github.com/hashirahmad806",
    liveUrl: "https://malakand-news.vercel.app/",
  },
  {
    _id: "5",
    title: "ReelNova Movie Web",
    category: "fullstack",
    description:
      "Modern movie discovery web app with real-time search, favorites, Appwrite authentication, analytics tracking, and a sleek responsive UI.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT"],
    gradient: "linear-gradient(135deg,#4facfe,#00f2fe)",
    githubUrl: "https://github.com/hashirahmad806/ReelNova-Movie-Web",
    liveUrl: "https://reel-nova-movie.vercel.app/",
  },
  {
    _id: "6",
    title: "BrewManager Pro",
    category: "fullstack",
    description:
      "Cafe Management Application — MERN stack dine-in order and management system with fluid animations, smooth scrolling, and responsive styling.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    gradient: "linear-gradient(135deg,#43e97b,#38f9d7)",
    githubUrl: "https://github.com/hashirahmad806",
    liveUrl: "https://cafe-management-do4l.vercel.app/",
  },
];


const FILTERS = ["all", "client", "ai", "fullstack", "frontend", "backend"];

function ProjectCard({ p, i }) {
  const startColor = (() => {
    const match = (p.gradient || '').match(/#[a-fA-F0-9]{3,8}/);
    return match ? match[0] : gold;
  })();

  const handleEnter = (ev) => {
    const el = ev.currentTarget;
    if (motionOk) el.style.transform = 'translateY(-5px)';
    el.style.boxShadow = `0 6px 20px rgba(0,0,0,0.55), 0 18px 48px rgba(0,0,0,0.35), 0 0 0 1px ${startColor}22, 0 0 28px ${startColor}10, inset 0 1px 0 rgba(255,255,255,0.07)`;
    el.style.borderColor = `${startColor}28`;
  };

  const handleLeave = (ev) => {
    const el = ev.currentTarget;
    el.style.transform = 'translateY(0)';
    el.style.boxShadow = 'var(--card-shadow)';
    el.style.borderColor = 'var(--border)';
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        borderRadius: 20,
        border: "1px solid var(--border)",
        background: "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)",
        boxShadow: "var(--card-shadow)",
        overflow: "hidden",
        cursor: "default",
        transition: motionOk 
          ? `box-shadow .35s ease, border-color .35s ease, transform .35s ease`
          : `none`,
      }}
    >
      {/* Visual header */}
      <div
        style={{
          height: 170,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: p.gradient || "rgba(0,0,0,0.2)"
        }}
      >
        {/* Fallback Graphic Behind Microlink Screenshot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            textAlign: "center",
            background: p.gradient,
            opacity: 0.95,
          }}
        >
          <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>
            {p.title}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>
            {p.tech.slice(0, 3).join(' • ')}
          </div>
        </div>

        {/* Top edge glow wash */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 40,
          background: `linear-gradient(180deg, ${startColor}15 0%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {p.liveUrl && !p.liveUrl.includes('github.com') ? (
          <img
            src={`https://api.microlink.io/?url=${encodeURIComponent(p.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
            alt={p.title}
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none'; }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "relative",
              zIndex: 1,
              opacity: 0.88,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.88}
          />
        ) : null}

        {/* Delivered client badge */}
        {p.isClient && (
          <div style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            height: 22, borderRadius: 100,
            background: 'rgba(6, 32, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '0 8px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#34d399',
            fontWeight: 600,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              backgroundColor: '#34d399',
              boxShadow: '0 0 6px #34d399',
              display: 'inline-block',
            }} />
            Delivered Client
          </div>
        )}

        {/* Category text label — replaces emoji badge */}
        <div style={{
          position: 'absolute', bottom: 10, left: 10, zIndex: 2,
          height: 24, borderRadius: 5,
          background: 'rgba(8,8,16,0.72)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 8px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}>
          {p.category}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "JetBrains Mono,monospace",
            fontSize: 10,
            color: startColor,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          <span>{p.category}</span>
          {p.isClient && (
            <span style={{ color: '#34d399', fontSize: 9.5, letterSpacing: '0.08em', fontWeight: 600 }}>
              ✓ Client Delivery
            </span>
          )}
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
            height: 66,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical"
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
            height: 56,
            overflow: "hidden"
          }}
        >
          {p.tech.map((t) => (
            <span
              key={t}
              className="dimensional-pill"
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 10,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { href: p.githubUrl, Icon: FiGithub, label: "Code", primary: false },
            { href: p.liveUrl, Icon: FiExternalLink, label: "Demo", primary: true },
          ].map(({ href, Icon, label, primary }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={primary ? "tactile-btn-primary" : "tactile-btn-secondary"}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 12,
                flex: 1,
                justifyContent: "center",
              }}
              onMouseEnter={e => {
                if (primary) {
                  e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px ${startColor}40, 0 8px 24px rgba(0,0,0,0.25)`
                }
              }}
              onMouseLeave={e => {
                if (primary) {
                  e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px rgba(201,168,76,0.2), 0 4px 16px rgba(0,0,0,0.15)`
                }
              }}
            >
              <Icon size={12} /> {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 1, background: p.gradient, opacity: 0.35 }} />
    </div>
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
        if (r.data?.data && Array.isArray(r.data.data) && r.data.data.length > 0) {
          setProjects(r.data.data);
        }
      })
      .catch((err) => {
        console.warn("Using local fallback projects:", err);
      });
  }, []);

  const shown =
    filter === "all"
      ? projects
      : filter === "client"
        ? projects.filter((p) => p.isClient || p.category === "client")
        : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: "120px 0" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={hRef}
          style={{
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
              marginBottom: 12,
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
          <p style={{ fontSize: 15, color: 'var(--text3)', lineHeight: 1.7, maxWidth: 560, marginBottom: 0 }}>
            A selection of real-world applications — client deliveries, full-stack systems, and product experiments built to production standard.
          </p>
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
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={isActive ? "tactile-btn-primary" : "tactile-btn-secondary"}
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  fontSize: 13,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {f === "all"
                  ? "All Projects"
                  : f === "client"
                    ? "Client Deliveries"
                    : f === "ai"
                      ? "Agentic AI & RAG"
                      : f === "fullstack"
                        ? "Full Stack"
                        : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            );
          })}
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
