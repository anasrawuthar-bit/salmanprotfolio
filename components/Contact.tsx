"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const subjects = [
  { value: "Video Project",   label: "Video Production & Campaign" },
  { value: "Video Editing",   label: "Cinematic Video Editing" },
  { value: "Graphic Design",  label: "Brand / Motion Design" },
  { value: "General Inquiry", label: "General Conversation / Hire" },
];

const contactInfo = [
  { icon: Mail,    label: "Email Directly",    value: "klsalman786@gmail.com", href: "mailto:klsalman786@gmail.com",  color: "text-brand-purple" },
  { icon: Phone,   label: "Phone / WhatsApp",  value: "+91 8848547935",          href: "tel:+91 8848547935",                  color: "text-brand-cyan" },
  { icon: MapPin,  label: "Location",          value: "Kerala, INDIA • Remote Worldwide", href: undefined,                       color: "text-brand-amber" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Video Editing", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [social, setSocial] = useState({ behance: "", instagram: "", youtube: "", linkedin: "" });

  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(d => {
      if (d.social) setSocial(d.social);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "984fae79-60da-409e-938d-10d2637bf65d",
          name: form.name,
          email: form.email,
          subject: `[Portfolio Contact] ${form.subject} from ${form.name}`,
          message: form.message,
          from_name: "Salman Studio Portfolio",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("done");
        setForm({ name: "", email: "", subject: "Video Editing", message: "" });
      } else {
        setError(data.message || "Failed to send message. Please try again.");
        setStatus("idle");
      }
    } catch (err) {
      setError("A network error occurred. Please check your connection and try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-cyan/4 blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left: info ── */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <p className="text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-cyan mb-4">Let's Collaborate</p>
              <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none mb-6">
                START A<br />PROJECT
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                Ready to elevate your visuals? Describe your video editing request, campaign spot, or graphic design project — I usually reply within 24 hours.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <div key={label} className="group flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 group-hover:border-zinc-700 ${color} transition-all duration-300`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-heading font-black uppercase tracking-widest text-zinc-600 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-heading font-bold text-zinc-300 hover:text-zinc-100 transition-colors">{value}</a>
                    ) : (
                      <p className="text-sm font-heading font-bold text-zinc-400">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-zinc-700 border-t border-zinc-900 pt-6">
              © {new Date().getFullYear()} Salman Visuals. All rights reserved.
            </p>

            {/* Social icons */}
            {(social.behance || social.instagram || social.youtube || social.linkedin) && (
              <div className="flex items-center gap-3 flex-wrap">
                {social.behance && (
                  <a href={social.behance} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-[#1769ff]/40 hover:bg-[#1769ff]/10 transition-all duration-300"
                    title="Behance"
                  >
                    <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#1769ff] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.513-1.914-5.513-5.517 0-3.612 2.32-5.484 5.418-5.484 3.037 0 4.824 1.861 5.1 4.635.066.597.095 1.153.095 2.016H15.37c.131 1.612 1.047 2.013 1.9 2.013.84 0 1.41-.47 1.58-1.048h2.876zM11.462 12.204c0-1.338-.683-2.169-1.97-2.169-1.29 0-2.035.832-2.035 2.169H11.462zm-8.462 5.796V6h4.512c2.048 0 4.028.636 4.028 2.919 0 1.162-.525 1.977-1.417 2.52C11.223 11.96 12 12.934 12 14.35 12 16.94 9.9 18 7.573 18H3z"/>
                    </svg>
                    <span className="text-[10px] font-heading font-black text-zinc-500 group-hover:text-[#1769ff] transition-colors uppercase tracking-wider">Behance</span>
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer"
                    className="group p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-[#e1306c]/40 hover:bg-[#e1306c]/10 transition-all duration-300"
                    title="Instagram"
                  >
                    <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#e1306c] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                )}
                {social.youtube && (
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer"
                    className="group p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-[#ff0000]/40 hover:bg-[#ff0000]/10 transition-all duration-300"
                    title="YouTube"
                  >
                    <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#ff0000] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                    className="group p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10 transition-all duration-300"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4 text-zinc-500 group-hover:text-[#0077b5] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ── Right: form ── */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden hover:border-brand-cyan/20 transition-colors duration-500">
              <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-brand-cyan/4 blur-[70px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[10px] font-heading font-black uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                  <input
                    id="name" type="text" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-all text-sm font-heading"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[10px] font-heading font-black uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                  <input
                    id="email" type="email" required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-all text-sm font-heading"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-[10px] font-heading font-black uppercase tracking-widest text-zinc-500 mb-2">Project Type</label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-zinc-200 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-all text-sm font-heading cursor-pointer"
                  >
                    {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-heading font-black uppercase tracking-widest text-zinc-500 mb-2">Project Outline</label>
                  <textarea
                    id="message" required rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your project, timeline, and goals..."
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/30 transition-all text-sm font-heading resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-heading text-center mt-2">{error}</p>
                )}

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status !== "idle"}
                  className="w-full relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-heading font-black uppercase tracking-wider text-sm transition-all duration-400 cursor-pointer overflow-hidden disabled:opacity-60"
                  style={{ background: status === "done" ? "transparent" : "rgba(6,182,212,1)", color: status === "done" ? "#4ade80" : "#03050a" }}
                >
                  {status === "idle" && (
                    <><span>Transmit Brief</span><Send className="w-4 h-4" /></>
                  )}
                  {status === "sending" && (
                    <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  )}
                  {status === "done" && (
                    <><CheckCircle className="w-5 h-5" /><span>Message Dispatched!</span></>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
