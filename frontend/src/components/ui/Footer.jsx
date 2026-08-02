import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const gold = "#c9a84c";

const navLinks = [
  "about", "skills", "projects", "experience",
  "learning", "certifications", "github", "contact",
];

const socials = [
  { href: "https://github.com/hashirahmad806",                    Icon: FiGithub,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/hashir-ahmad-25639031b",   Icon: FiLinkedin, label: "LinkedIn" },
  { href: "https://wa.me/923705105561",                           Icon: FaWhatsapp, label: "WhatsApp" },
  { href: "mailto:hashirahmad806@gmail.com",                      Icon: FiMail,     label: "Email"    },
];

const techStack = ["React", "Node.js", "Express", "MongoDB"];

const motionOk = typeof window !== "undefined"
  ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : true;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      style={{ background: "var(--void)", position: "relative", overflow: "hidden" }}
      className="z-10"
    >
      {/* ── Top golden rule with glow ─────────────────────────────── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${gold}50 50%, transparent 100%)` }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 120, background: `radial-gradient(ellipse at top, ${gold}12, transparent 70%)`, pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 pt-20 pb-10">

        {/* ── Main 3-col grid ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12" style={{ borderBottom: "1px solid var(--border)" }}>

          {/* Brand + Tagline */}
          <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            <Link to="hero" smooth className="cursor-pointer select-none">
              <span className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Clash Display','Syne',sans-serif", color: "var(--text)" }}>
                Hashir<span style={{ color: gold }}>.</span>
              </span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text2)", fontFamily: "'Cabinet Grotesk',sans-serif", maxWidth: 260 }}>
              MERN Stack Engineer & UI/UX Designer — crafting premium digital experiences that leave a lasting impression.
            </p>
            {/* Available pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, border: "1px solid rgba(0,229,160,0.2)", background: "rgba(0,229,160,0.05)" }}>
              <motion.div
                animate={motionOk ? { scale: [1, 1.5, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 8px #00e5a0", flexShrink: 0 }}
              />
              <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "#00e5a0", letterSpacing: "0.1em" }}>
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5 items-center md:items-start">
            <h4 style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>
              Navigation
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
              {navLinks.map(l => (
                <Link
                  key={l} to={l} smooth offset={-80}
                  className="capitalize cursor-pointer select-none"
                  style={{ fontSize: 14, color: "var(--text2)", fontFamily: "'Cabinet Grotesk',sans-serif", transition: "color 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.color = gold}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text2)"}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5 items-center md:items-end">
            <h4 style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex items-center justify-center"
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text2)",
                    textDecoration: "none",
                    transition: "all 0.28s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = gold;
                    e.currentTarget.style.borderColor = `${gold}45`;
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = `0 12px 24px -8px ${gold}35`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--text2)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Email CTA */}
            <a
              href="mailto:hashirahmad806@gmail.com"
              style={{
                marginTop: 4,
                padding: "10px 20px",
                borderRadius: 10,
                border: `1px solid ${gold}35`,
                background: `${gold}10`,
                color: gold,
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${gold}20`;
                e.currentTarget.style.borderColor = `${gold}55`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${gold}10`;
                e.currentTarget.style.borderColor = `${gold}35`;
              }}
            >
              hashirahmad806@gmail.com →
            </a>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8">
          {/* Copyright */}
          <p style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 12, color: "var(--text3)", textAlign: "center" }}>
            © {new Date().getFullYear()} Hashir Ahmad. All Rights Reserved.
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 10, border: "1px solid var(--border)", color: "var(--text3)", background: "var(--surface)", transition: "color 0.25s, border-color 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderColor = `${gold}40`; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            title="Back to top"
            whileHover={motionOk ? { y: -4, scale: 1.05 } : {}}
            whileTap={motionOk ? { scale: 0.93 } : {}}
            className="flex items-center gap-2"
            style={{
              padding: "9px 18px", borderRadius: 10,
              border: "1px solid var(--border)", background: "var(--surface)",
              color: "var(--text2)", fontFamily: "JetBrains Mono,monospace",
              fontSize: 11, cursor: "pointer", letterSpacing: "0.08em",
              transition: "color 0.25s, border-color 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderColor = `${gold}40`; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <FiArrowUp size={14} />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
