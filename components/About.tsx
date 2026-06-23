"use client";

import { motion } from "framer-motion";
import { Terminal, MapPin, Briefcase } from "lucide-react";

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
  Nuke: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#0a1f0c"/>
      <text x="50%" y="56%" fill="#5aff6a" fontFamily="sans-serif" fontWeight="900" fontSize="16" textAnchor="middle" dominantBaseline="middle">Nuke</text>
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
      <rect width="40" height="40" rx="8" fill="#1c0000"/>
      <text x="50%" y="40%" fill="#ff3c00" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle" dominantBaseline="middle">CDR</text>
      <circle cx="20" cy="28" r="5" fill="none" stroke="#ff3c00" strokeWidth="2"/>
      <circle cx="20" cy="28" r="2" fill="#ff3c00"/>
    </svg>
  ),
  InDesign: () => (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <rect width="40" height="40" rx="8" fill="#1c0028"/>
      <text x="50%" y="56%" fill="#ff3db2" fontFamily="sans-serif" fontWeight="900" fontSize="18" textAnchor="middle" dominantBaseline="middle">Id</text>
    </svg>
  ),
};

const softwares = [
  { name: "After Effects",  cat: "VFX / Motion",   level: "Expert",       Logo: Logos.AfterEffects, hover: "hover:border-[#9999ff]/40 hover:shadow-[0_0_24px_rgba(153,153,255,0.12)]" },
  { name: "Premiere Pro",   cat: "Video Editing",   level: "Expert",       Logo: Logos.Premiere,     hover: "hover:border-[#e575ff]/40 hover:shadow-[0_0_24px_rgba(229,117,255,0.12)]" },
  { name: "DaVinci Resolve",cat: "Color / Grade",   level: "Expert",       Logo: Logos.DaVinci,      hover: "hover:border-[#4444ff]/40 hover:shadow-[0_0_24px_rgba(68,68,255,0.12)]" },
  { name: "Nuke",           cat: "Compositing",     level: "Advanced",     Logo: Logos.Nuke,         hover: "hover:border-[#5aff6a]/40 hover:shadow-[0_0_24px_rgba(90,255,106,0.12)]" },
  { name: "Blender",        cat: "3D Modelling",    level: "Intermediate", Logo: Logos.Blender,      hover: "hover:border-[#ff9000]/40 hover:shadow-[0_0_24px_rgba(255,144,0,0.12)]" },
  { name: "Photoshop",      cat: "Graphic Design",  level: "Expert",       Logo: Logos.Photoshop,    hover: "hover:border-[#31a8ff]/40 hover:shadow-[0_0_24px_rgba(49,168,255,0.12)]" },
  { name: "Illustrator",    cat: "Vector Design",   level: "Expert",       Logo: Logos.Illustrator,  hover: "hover:border-[#ff9a00]/40 hover:shadow-[0_0_24px_rgba(255,154,0,0.12)]" },
  { name: "CorelDRAW",      cat: "Vector / Print",  level: "Advanced",     Logo: Logos.CorelDRAW,    hover: "hover:border-[#ff3c00]/40 hover:shadow-[0_0_24px_rgba(255,60,0,0.12)]" },
  { name: "InDesign",       cat: "Print / Layout",  level: "Intermediate", Logo: Logos.InDesign,     hover: "hover:border-[#ff3db2]/40 hover:shadow-[0_0_24px_rgba(255,61,178,0.12)]" },
];

const skills = [
  { name: "CREATIVE DESIGN",       pct: 95, from: "from-brand-purple", to: "to-violet-400" },
  { name: "VIDEO EDITING",         pct: 90, from: "from-brand-cyan",   to: "to-sky-400" },
  { name: "LOGO BRANDING",         pct: 92, from: "from-brand-amber",  to: "to-yellow-400" },
  { name: "SOCIAL MEDIA HANDLING", pct: 88, from: "from-pink-500",     to: "to-rose-400" },
];

export default function About() {
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
                <p className="text-xs text-brand-cyan font-heading font-bold tracking-wider">Creative VFX Artist & Designer</p>
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
                I am a professional designer, video editor, and VFX artist with over three years of dedicated industry experience — turning creative visual ideas into polished, high-impact realities.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                My work spans complete visual campaigns, including social media ad spots, rotoscoping, CG compositing, and professional DaVinci colour grading. Whether launching high-energy marketing campaigns or editing cinematic clips, I craft visually outstanding experiences.
              </p>
            </motion.div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((sk, i) => (
                <motion.div
                  key={sk.name}
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
                      className={`h-full bg-gradient-to-r ${sk.from} ${sk.to} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
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
            {softwares.map((sw, i) => (
              <motion.div
                key={sw.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 rounded-2xl glass-panel text-center flex flex-col items-center gap-3 transition-all duration-300 cursor-default ${sw.hover}`}
              >
                <sw.Logo />
                <div>
                  <p className="text-xs font-heading font-black text-zinc-200">{sw.name}</p>
                  <p className="text-[9px] font-heading font-bold text-zinc-600 uppercase tracking-wider mt-0.5">{sw.cat}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-zinc-950/70 border border-zinc-900 text-[9px] font-heading font-bold text-brand-cyan">
                  {sw.level}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
