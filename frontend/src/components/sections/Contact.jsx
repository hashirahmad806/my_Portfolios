import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend, FiPaperclip } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { contactAPI } from "../../utils/api";

const gold = "#c9a84c";
const muted = "#9090a8";
const dim = "#5a5a72";

const motionOk = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true;

const contactInfo = [
  {
    Icon: FiMail,
    label: "Email",
    value: "hashirahmad806@gmail.com",
    href: "mailto:hashirahmad806@gmail.com",
  },
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+92 370 5105561",
    href: "https://wa.me/923705105561",
  },
  {
    Icon: FiGithub,
    label: "GitHub",
    value: "github.com/hashirahmad806",
    href: "https://github.com/hashirahmad806",
  },
  {
    Icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/hashir-ahmad",
    href: "https://www.linkedin.com/in/hashir-ahmad-25639031b",
  },
  {
    Icon: FiMapPin,
    label: "Location",
    value: "Pakistan 🇵🇰 — Open to Remote",
    href: null,
  },
];

const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  background: "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 100%)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.02)",
  color: "var(--text)",
  fontFamily: "'Cabinet Grotesk',sans-serif",
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

export default function Contact() {
  const { ref, visible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "", honey: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setErrors((prev) => ({ ...prev, file: null }));
      return;
    }

    // Client-side validations
    const maxLimit = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxLimit) {
      setErrors((prev) => ({ ...prev, file: "File size exceeds 5MB limit." }));
      toast.error("File size exceeds 5MB limit.");
      setFile(null);
      return;
    }

    const allowedExts = ["pdf", "doc", "docx", "png", "jpg", "jpeg"];
    const ext = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedExts.includes(ext)) {
      setErrors((prev) => ({ ...prev, file: "Allowed file types: .pdf, .doc, .docx, .png, .jpg" }));
      toast.error("Invalid file type. Allowed: .pdf, .doc, .docx, .png, .jpg");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: null }));
  };

  const onFocus = (e) => {
    e.target.style.borderColor = "rgba(201,168,76,0.4)";
    e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.4), 0 0 0 3px rgba(201,168,76,0.07)";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.06)";
    e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.02)";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setErrors({});

    let localErrors = {};
    if (!form.name.trim()) localErrors.name = "Name is required.";
    if (!form.email.trim()) {
      localErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      localErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) localErrors.message = "Message is required.";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      toast.error("Please resolve validation errors.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("message", form.message.trim());
      if (form.honey) {
        formData.append("honey", form.honey);
      }
      if (file) {
        formData.append("file", file);
      }

      await contactAPI.send(formData);
      setSent(true);
      setForm({ name: "", email: "", message: "", honey: "" });
      setFile(null);
      toast.success("Message sent! I'll be in touch soon 🚀");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status === 429
          ? "Too many messages. Please try again later."
          : err?.response?.status >= 500
            ? "Server error. Please try again."
            : "Failed to send message. Please email me directly.");
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      style={{ padding: "120px 0", background: "var(--void)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .7s,transform .7s",
            marginBottom: 56,
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
              Get In Touch
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
            Let's{" "}
            <em
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: gold,
              }}
            >
              build together
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2">
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--text2)",
                fontStyle: "italic",
                fontFamily: "'Instrument Serif',serif",
                marginBottom: 32,
              }}
            >
              Have a project in mind? Looking for a dedicated MERN Stack
              Developer? I'm available for full-time roles, freelance & exciting
              collaborations.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {contactInfo.map(({ Icon, label, value, href }) => {
                const inner = (
                  <div
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,168,76,.28)";
                      if (motionOk) e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 6px 16px rgba(0,0,0,0.4), 0 0 16px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.07)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "var(--card-shadow)";
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 18px",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      background: "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)",
                      boxShadow: "var(--card-shadow)",
                      transition: "all .3s ease",
                    }}
                  >
                    <div
                      className="frosted-icon-chip"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: "rgba(201,168,76,0.12)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        fontSize: 15,
                        boxShadow: `inset 0 1px 3px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.22)`,
                      }}
                    >
                      <Icon size={15} style={{ color: gold }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "JetBrains Mono,monospace",
                          fontSize: 10,
                          color: "var(--text3)",
                          letterSpacing: "0.1em",
                          marginBottom: 2,
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--text)",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}

              {/* Available now pill */}
              <div
                style={{
                  marginTop: 8,
                  padding: "14px 18px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,229,160,.15)",
                  background: "rgba(0,229,160,.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#00e5a0",
                      boxShadow: "0 0 8px #00e5a0",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: 10,
                      color: "#00e5a0",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Available Now
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text2)" }}>
                  Open to full-time roles, freelance & exciting collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <div
              style={{
                padding: 36,
                borderRadius: 24,
                border: "1px solid var(--border)",
                background: "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 100%), var(--surface)",
                boxShadow: "var(--card-shadow)",
                position: "relative",
              }}
            >
              {/* Subtle top edge highlight */}
              <div style={{
                position: 'absolute', top: 0, left: 24, right: 24,
                height: 1, background: `linear-gradient(90deg, transparent, ${gold}25, transparent)`,
                pointerEvents: 'none',
              }} />
              <h3
                style={{
                  fontFamily: "'Clash Display','Syne',sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--text)",
                  marginBottom: 28,
                }}
              >
                Send a Message
              </h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: 32,
                    textAlign: "center",
                    borderRadius: 16,
                    border: "1px solid rgba(0,229,160,.2)",
                    background: "rgba(0,229,160,.05)",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                  <div
                    style={{
                      fontFamily: "'Clash Display',sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: 10,
                    }}
                  >
                    Message Sent!
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text2)" }}>
                    Thanks for reaching out! I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                  noValidate
                >
                  {/* Honeypot field (hidden from screen readers & visual users) */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="honey"
                      value={form.honey}
                      onChange={onChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  {[
                    {
                      id: "name",
                      label: "Your Name",
                      type: "text",
                      ph: "Hashir Ahmad",
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      type: "email",
                      ph: "hashir@example.com",
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "JetBrains Mono,monospace",
                          fontSize: 11,
                          color: "var(--text3)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          marginBottom: 8,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.id}
                        value={form[f.id]}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        placeholder={f.ph}
                        style={{
                          ...inputStyle,
                          borderColor: errors[f.id] ? "#ef4444" : "rgba(255,255,255,0.06)",
                        }}
                      />
                      {errors[f.id] && (
                        <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                          {errors[f.id]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 11,
                        color: "var(--text3)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      placeholder="Hi Hashir, I'd love to discuss a project…"
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "none",
                        borderColor: errors.message ? "#ef4444" : "rgba(255,255,255,0.06)",
                      }}
                    />
                    {errors.message && (
                      <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* File Upload Component */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 11,
                        color: "var(--text3)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      Attachment (Optional)
                    </label>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        padding: "24px 18px",
                        borderRadius: 12,
                        background: "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 100%)",
                        border: errors.file ? "1px dashed #ef4444" : "1px dashed rgba(255,255,255,0.1)",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.02)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!errors.file) {
                          e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!errors.file) {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        }
                      }}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                      />
                      <FiPaperclip size={18} style={{ color: file ? "#00e5a0" : gold }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: file ? "#e5e2e3" : "var(--text2)" }}>
                          {file ? file.name : "Choose a spec, brief or document..."}
                        </p>
                        <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>
                          {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, DOC, DOCX, PNG, JPG (Max 5MB)"}
                        </p>
                      </div>
                      {file && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFile(null);
                            setErrors((prev) => ({ ...prev, file: null }));
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#ef4444",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: "4px 8px",
                            zIndex: 10,
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {errors.file && (
                      <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                        {errors.file}
                      </span>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={motionOk ? { scale: 0.97 } : {}}
                    className="tactile-btn-primary"
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      justifyContent: "center",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          style={{
                            width: 18,
                            height: 18,
                            border: "2.5px solid rgba(8,8,16,.3)",
                            borderTopColor: "#080810",
                            borderRadius: "50%",
                            marginRight: 8,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend size={16} style={{ marginRight: 8 }} /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
