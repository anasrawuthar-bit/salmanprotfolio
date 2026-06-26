"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, MapPin, Briefcase, Wrench } from "lucide-react";

/* ─── Brand-accurate software SVG logos ──────────── */
const Logos: Record<string, React.FC> = {
  AfterEffects: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#00005b"/>
      <text x="50%" y="56%" fill="#9999ff" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Ae</text>
    </svg>
  ),
  Premiere: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#2a0040"/>
      <text x="50%" y="56%" fill="#e575ff" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Pr</text>
    </svg>
  ),
  DaVinci: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#030f1c"/>
      <circle cx="20" cy="16" r="6" fill="#ff4444" opacity="0.9" style={{mixBlendMode:"screen"}}/>
      <circle cx="14" cy="26" r="6" fill="#44ff44" opacity="0.9" style={{mixBlendMode:"screen"}}/>
      <circle cx="26" cy="26" r="6" fill="#4444ff" opacity="0.9" style={{mixBlendMode:"screen"}}/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#1e1e1e"/>
      <text x="50%" y="56%" fill="#0acf83" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Fi</text>
    </svg>
  ),
  Blender: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#1a0a00"/>
      <text x="50%" y="56%" fill="#ff9000" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Bl</text>
    </svg>
  ),
  Photoshop: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#001b33"/>
      <text x="50%" y="56%" fill="#31a8ff" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Ps</text>
    </svg>
  ),
  Illustrator: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#2d1a00"/>
      <text x="50%" y="56%" fill="#ff9a00" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Ai</text>
    </svg>
  ),
  CorelDRAW: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#021c0e"/>
      <g transform="translate(8, 8)">
        <path d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536.072 4.145 3.847 11.191 6.397 13.455 0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0Zm2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013 2.547-2.264 6.324-9.31 6.396-13.455-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0Zm-1.38.019a1.088 1.088 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984.268-4.677-.688-7.674-2.219-8.501a1.088 1.088 0 0 0-.555-.144ZM7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2.503.457-5.777-6.548-6.386-12.699-.291-2.323.39-4.9 2.986-6.66Zm9.966 0c2.595 1.76 3.276 4.337 2.985 6.66-.608 6.151-6.888 13.156-6.386 12.699 1.398-1.205 6.103-6.88 6.987-12.2.888-5.316-3.586-7.159-3.586-7.159Zm-6.815 20.78L10.647 24h2.599l.488-2.154h-3.566Z" fill="#00b050"/>
      </g>
    </svg>
  ),
  InDesign: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#1c0028"/>
      <text x="50%" y="56%" fill="#ff3db2" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Id</text>
    </svg>
  ),
};

const defaultSoftwares = [
  { id: 1, name: "After Effects",  cat: "Motion",   level: "Expert" },
  { id: 2, name: "Premiere Pro",   cat: "Video Editing",   level: "Expert" },
  { id: 3, name: "DaVinci Resolve",cat: "Color / Grade",   level: "Expert" },
  { id: 4, name: "Figma",          cat: "UI/UX Design",    level: "Advanced" },
  { id: 5, name: "Blender",        cat: "3D Modelling",    level: "Intermediate" },
  { id: 6, name: "Photoshop",      cat: "Graphic Design",  level: "Expert" },
  { id: 7, name: "Illustrator",    cat: "Vector Design",   level: "Expert" },
  { id: 8, name: "CorelDRAW",      cat: "Vector / Print",  level: "Advanced" },
  { id: 9, name: "InDesign",       cat: "Print / Layout",  level: "Intermediate" },
];

const defaultSkills = [
  { id: 1, name: "CREATIVE DESIGN",       pct: 95 },
  { id: 2, name: "VIDEO EDITING",         pct: 90 },
  { id: 3, name: "LOGO BRANDING",         pct: 92 },
  { id: 4, name: "SOCIAL MEDIA HANDLING", pct: 88 },
];

const brandStyles: Record<string, { Logo: React.FC; hover: string }> = {
  "After Effects": { Logo: Logos.AfterEffects, hover: "hover:border-[#9999ff]/40 hover:shadow-[0_0_24px_rgba(153,153,255,0.12)]" },
  "Premiere Pro": { Logo: Logos.Premiere, hover: "hover:border-[#e575ff]/40 hover:shadow-[0_0_24px_rgba(229,117,255,0.12)]" },
  "DaVinci Resolve": { Logo: Logos.DaVinci, hover: "hover:border-[#4444ff]/40 hover:shadow-[0_0_24px_rgba(68,68,255,0.12)]" },
  "Figma": { Logo: Logos.Figma, hover: "hover:border-[#0acf83]/40 hover:shadow-[0_0_24px_rgba(10,207,131,0.12)]" },
  "Blender": { Logo: Logos.Blender, hover: "hover:border-[#ff9000]/40 hover:shadow-[0_0_24px_rgba(255,144,0,0.12)]" },
  "Photoshop": { Logo: Logos.Photoshop, hover: "hover:border-[#31a8ff]/40 hover:shadow-[0_0_24px_rgba(49,168,255,0.12)]" },
  "Illustrator": { Logo: Logos.Illustrator, hover: "hover:border-[#ff9a00]/40 hover:shadow-[0_0_24px_rgba(255,154,0,0.12)]" },
  "CorelDRAW": { Logo: Logos.CorelDRAW, hover: "hover:border-[#00b050]/40 hover:shadow-[0_0_24px_rgba(0,176,80,0.12)]" },
  "InDesign": { Logo: Logos.InDesign, hover: "hover:border-[#ff3db2]/40 hover:shadow-[0_0_24px_rgba(255,61,178,0.12)]" },
};

const FallbackLogo = () => (
  <svg viewBox="0 0 40 40" width="36" height="36" className="mx-auto">
    <rect width="40" height="40" rx="8" fill="#18181b" />
    <path d="M26 14l-6 6M20 20l-4 4M24 12l2 2M14 26l-2-2" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="1.5" fill="#8b5cf6" />
  </svg>
);

const skillsGradients = [
  { from: "from-brand-purple", to: "to-violet-400" },
  { from: "from-brand-cyan",   to: "to-sky-400" },
  { from: "from-brand-amber",  to: "to-yellow-400" },
  { from: "from-pink-500",     to: "to-rose-400" },
];

export default function About() {
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [softwaresList, setSoftwaresList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        if (d.skills && d.skills.length > 0) {
          setSkillsList(d.skills);
        } else {
          setSkillsList(defaultSkills);
        }
        if (d.toolkit && d.toolkit.length > 0) {
          setSoftwaresList(d.toolkit);
        } else {
          setSoftwaresList(defaultSoftwares);
        }
      })
      .catch(() => {
        setSkillsList(defaultSkills);
        setSoftwaresList(defaultSoftwares);
      });
  }, []);
  return (
    <section id="about" className="relative py-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Two-column bio layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Profile card */}
          <div className="lg:col-span-5 flex flex-col items-center gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden max-w-sm border border-zinc-800/60 shadow-[0_0_50px_rgba(6,182,212,0.06)] group"
            >
              {/* Corner nodes */}
              <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4] z-20" />
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_#8b5cf6] z-20" />

              <img
                src="/salman_profile.png"
                alt="Salman Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="text-xl font-display font-black text-zinc-100 uppercase tracking-widest">SALMAN</p>
                <p className="text-xs text-brand-cyan font-heading font-bold tracking-wider">Creative Designer | Video Editor</p>
              </div>
            </motion.div>

            {/* Quick-fact pills */}
            {[
              { icon: MapPin,    label: "Based In",    value: "Kerala, INDIA", color: "text-brand-cyan" },
              { icon: Briefcase, label: "Availability", value: "Immediate / Remote Worldwide", color: "text-brand-purple" },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full max-w-sm flex items-center gap-4 p-4 rounded-2xl glass-panel"
              >
                <div className={`p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-heading font-black uppercase tracking-widest text-zinc-600">{label}</p>
                  <p className="text-sm font-heading font-bold text-zinc-300">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Bio text + skills */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-purple mb-4">01 / Profile</p>
              <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none mb-6">
                BEHIND<br />THE SCREEN
              </h2>
              <p className="text-zinc-200 text-base md:text-lg font-heading font-medium leading-relaxed mb-4">
                I am a visual designer and motion artist with over three years of professional experience — shaping brand identities, crafting campaign visuals, and pushing creative direction from first sketch to final frame.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                My practice spans brand design, typography, and visual storytelling — from social media campaigns and motion graphics to dynamic video editing and cinematic colour grading in DaVinci Resolve. I don't just make things look good; I make them feel intentional.
              </p>
            </motion.div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsList.map((sk, i) => {
                const grad = skillsGradients[i % skillsGradients.length];

                return (
                  <motion.div
                    key={sk.id || sk.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="group p-5 rounded-2xl glass-panel border-glow-hover flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-heading font-black tracking-[0.2em] text-zinc-500 uppercase">{sk.name}</span>
                      <span className="text-base font-heading font-black text-zinc-100">{sk.pct}%</span>
                    </div>
                    <div className="w-full h-[3px] rounded-full bg-zinc-950 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${grad.from} ${grad.to} rounded-full`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Software stack ── */}
        <div className="mt-28 border-t border-zinc-800/40 pt-16">
          <p className="text-center text-[11px] font-heading font-black uppercase tracking-[0.25em] text-zinc-600 mb-4 flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-brand-cyan" />
            Software Arsenal & Stack
          </p>
          <h3 className="text-center text-2xl font-display font-black text-zinc-200 mb-12 tracking-tight">CREATIVE TOOLKIT</h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {softwaresList.map((sw, i) => {
              const style = brandStyles[sw.name] || {
                Logo: FallbackLogo,
                hover: "hover:border-brand-purple/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]"
              };
              const ToolLogo = style.Logo;

              return (
                <motion.div
                  key={sw.id || sw.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`p-5 rounded-2xl glass-panel text-center flex flex-col items-center gap-3 transition-all duration-300 cursor-default ${style.hover}`}
                >
                  <ToolLogo />
                  <div>
                    <p className="text-xs font-heading font-black text-zinc-200">{sw.name}</p>
                    <p className="text-[9px] font-heading font-bold text-zinc-600 uppercase tracking-wider mt-0.5">{sw.cat}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-950/70 border border-zinc-900 text-[9px] font-heading font-bold text-brand-cyan">
                    {sw.level}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
