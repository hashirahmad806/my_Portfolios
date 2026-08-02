import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiPaperclip, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { contactAPI } from "../../utils/api";

const gold = "#c9a84c";
const motionOk = typeof window !== "undefined"
  ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : true;

const contactCards = [
  { Icon: FiMail,     label: "Email",     value: "hashirahmad806@gmail.com",            href: "mailto:hashirahmad806@gmail.com", color: "#61DAFB" },
  { Icon: FaWhatsapp, label: "WhatsApp",  value: "+92 370 5105561",                     href: "https://wa.me/923705105561",       color: "#25D366" },
  { Icon: FiLinkedin, label: "LinkedIn",  value: "linkedin.com/in/hashir-ahmad",        href: "https://www.linkedin.com/in/hashir-ahmad-25639031b", color: "#0A66C2" },
  { Icon: FiGithub,   label: "GitHub",    value: "github.com/hashirahmad806",           href: "https://github.com/hashirahmad806",  color: "#c9a84c" },
  { Icon: FiMapPin,   label: "Location",  value: "Pakistan 🇵🇰 — Open to Remote",        href: null,                                 color: "#00E5A0" },
];

const inputBase = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  background: "rgba(0,0,0,0.25)",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)",
  color: "var(--text)",
  fontFamily: "'Cabinet Grotesk',sans-serif",
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

function FloatLabel({ id, label, error, children }) {
  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "JetBrains Mono,monospace",
          fontSize: 10,
          color: error ? "#ef4444" : "var(--text3)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 7,
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 12, color: "#ef4444", marginTop: 5, display: "block" }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
}

export default function Contact() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", honey: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) { setFile(null); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error("File exceeds 5MB limit."); return; }
    const ext = f.name.split(".").pop().toLowerCase();
    if (!["pdf","doc","docx","png","jpg","jpeg"].includes(ext)) { toast.error("Invalid file type."); return; }
    setFile(f);
    setErrors((p) => ({ ...p, file: null }));
  };

  const fieldStyle = (id, hasError) => ({
    ...inputBase,
    borderColor: hasError ? "#ef4444" : focused === id ? "rgba(201,168,76,0.45)" : "rgba(255,255,255,0.07)",
    boxShadow: focused === id
      ? "inset 0 2px 4px rgba(0,0,0,0.4), 0 0 0 3px rgba(201,168,76,0.08)"
      : "inset 0 2px 4px rgba(0,0,0,0.4)",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("email", form.email.trim());
      fd.append("message", form.message.trim());
      if (form.honey) fd.append("honey", form.honey);
      if (file) fd.append("file", file);
      await contactAPI.send(fd);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "", honey: "" });
      setFile(null);
      toast.success("Message sent! I'll reply soon 🚀");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: "120px 0", background: "var(--void)", position: "relative", overflow: "hidden" }}>
      {/* Background ambient glow */}
      <div style={{ position: "absolute", top: "20%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${gold}08, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(97,218,251,0.05), transparent 70%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity .7s, transform .7s", marginBottom: 64 }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 28, height: 1, background: gold }} />
            <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: gold, letterSpacing: "0.25em", textTransform: "uppercase" }}>Get In Touch</span>
          </div>
          <h2 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text)" }}>
            Let&apos;s{" "}
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: gold }}>build together</em>
          </h2>

          {/* Availability badge */}
          <motion.div
            initial={motionOk ? { opacity: 0, y: 8 } : {}}
            animate={motionOk ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 20, padding: "10px 18px", borderRadius: 999, border: "1px solid rgba(0,229,160,0.2)", background: "rgba(0,229,160,0.05)" }}
          >
            <motion.div
              animate={motionOk ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 8px #00e5a0" }}
            />
            <span style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 11, color: "#00e5a0", letterSpacing: "0.08em" }}>
              Available for Internships, Freelance & Full-Time Opportunities
            </span>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* LEFT: Info + Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--text2)", fontFamily: "'Instrument Serif',serif", fontStyle: "italic" }}>
              Have a project in mind or looking for a dedicated MERN Stack Developer? I&apos;m just a message away — let&apos;s create something remarkable together.
            </p>

            <div className="flex flex-col gap-3">
              {contactCards.map(({ Icon, label, value, href, color }) => {
                const card = (
                  <motion.div
                    whileHover={motionOk ? { y: -4, borderColor: `${color}30` } : {}}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 14,
                      border: "1px solid var(--border)",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08)), var(--surface)",
                      boxShadow: "var(--card-shadow)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      cursor: href ? "pointer" : "default",
                      textDecoration: "none",
                    }}
                    onHoverStart={el => { if (el?.currentTarget) el.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}18`; }}
                  >
                    {/* Icon chip */}
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: `${color}18`, border: `1px solid ${color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "JetBrains Mono,monospace", fontSize: 9, color: "var(--text3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{value}</div>
                    </div>
                    {href && <div style={{ marginLeft: "auto", color: "var(--text3)", fontSize: 12 }}>→</div>}
                  </motion.div>
                );
                return href ? (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    {card}
                  </a>
                ) : <div key={label}>{card}</div>;
              })}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-3">
            <div style={{ padding: "clamp(24px,4vw,40px)", borderRadius: 24, border: "1px solid var(--border)", background: "linear-gradient(145deg, rgba(255,255,255,0.025), rgba(0,0,0,0.06)), var(--surface)", boxShadow: "var(--card-shadow)", position: "relative" }}>
              {/* Top edge glow */}
              <div style={{ position: "absolute", top: 0, left: 32, right: 32, height: 1, background: `linear-gradient(90deg, transparent, ${gold}25, transparent)`, pointerEvents: "none" }} />

              <h3 style={{ fontFamily: "'Clash Display','Syne',sans-serif", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 28 }}>Send a Message</h3>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ padding: 40, textAlign: "center", borderRadius: 18, border: "1px solid rgba(0,229,160,0.2)", background: "rgba(0,229,160,0.05)" }}
                  >
                    <motion.div animate={motionOk ? { scale: [0, 1.2, 1] } : {}} transition={{ duration: 0.5 }} style={{ display: "inline-block", marginBottom: 16 }}>
                      <FiCheckCircle size={52} style={{ color: "#00e5a0" }} />
                    </motion.div>
                    <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>Message Sent!</div>
                    <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>Thanks for reaching out! I&apos;ll get back to you as soon as possible.</p>
                    <button onClick={() => setSent(false)} style={{ marginTop: 24, padding: "10px 24px", borderRadius: 10, border: `1px solid ${gold}40`, background: `${gold}10`, color: gold, fontFamily: "JetBrains Mono,monospace", fontSize: 12, cursor: "pointer", letterSpacing: "0.1em" }}>
                      Send Another →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 18 }}
                    noValidate
                  >
                    {/* Honeypot */}
                    <div style={{ display: "none" }} aria-hidden="true">
                      <input type="text" name="honey" value={form.honey} onChange={onChange} tabIndex="-1" autoComplete="off" />
                    </div>

                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FloatLabel id="name" label="Your Name" error={errors.name}>
                        <input id="name" type="text" name="name" value={form.name} onChange={onChange}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          placeholder="Hashir Ahmad"
                          style={fieldStyle("name", errors.name)} />
                      </FloatLabel>
                      <FloatLabel id="email" label="Email Address" error={errors.email}>
                        <input id="email" type="email" name="email" value={form.email} onChange={onChange}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          placeholder="you@example.com"
                          style={fieldStyle("email", errors.email)} />
                      </FloatLabel>
                    </div>

                    {/* Subject */}
                    <FloatLabel id="subject" label="Subject (Optional)" error={null}>
                      <input id="subject" type="text" name="subject" value={form.subject} onChange={onChange}
                        onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                        placeholder="Project Inquiry / Collaboration / Full-Time Role"
                        style={fieldStyle("subject", false)} />
                    </FloatLabel>

                    {/* Message */}
                    <FloatLabel id="message" label="Message" error={errors.message}>
                      <textarea id="message" name="message" value={form.message} onChange={onChange}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        placeholder="Hi Hashir, I'd love to discuss a project…"
                        rows={5}
                        style={{ ...fieldStyle("message", errors.message), resize: "none" }} />
                    </FloatLabel>

                    {/* File Upload */}
                    <div>
                      <label style={{ display: "block", fontFamily: "JetBrains Mono,monospace", fontSize: 10, color: "var(--text3)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 7 }}>
                        Attachment (Optional)
                      </label>
                      <div
                        style={{ position: "relative", padding: "20px 18px", borderRadius: 12, background: "rgba(0,0,0,0.2)", border: errors.file ? "1px dashed #ef4444" : file ? `1px dashed ${gold}50` : "1px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "border-color 0.3s" }}
                        onMouseEnter={e => { if (!errors.file) e.currentTarget.style.borderColor = `${gold}40`; }}
                        onMouseLeave={e => { if (!errors.file && !file) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                      >
                        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }} />
                        <FiPaperclip size={18} style={{ color: file ? "#00e5a0" : gold, flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: file ? "var(--text)" : "var(--text2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {file ? file.name : "Choose a spec, brief or document..."}
                          </p>
                          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>
                            {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, DOC, PNG, JPG — Max 5MB"}
                          </p>
                        </div>
                        {file && (
                          <button type="button" onClick={e => { e.preventDefault(); e.stopPropagation(); setFile(null); }}
                            style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "4px 8px", zIndex: 10, flexShrink: 0 }}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileTap={motionOk ? { scale: 0.97 } : {}}
                      whileHover={motionOk ? { scale: 1.01 } : {}}
                      className="tactile-btn-primary"
                      style={{ width: "100%", padding: "15px 24px", justifyContent: "center", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1 }}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            style={{ width: 18, height: 18, border: "2.5px solid rgba(8,8,16,.3)", borderTopColor: "#080810", borderRadius: "50%", marginRight: 8 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                          />
                          Sending…
                        </>
                      ) : (
                        <><FiSend size={16} style={{ marginRight: 8 }} /> Send Message</>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
