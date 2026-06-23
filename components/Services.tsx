"use client";

import { motion } from "framer-motion";
import { Wand2, Scissors, Layers } from "lucide-react";

const services = [
  {
    title: "VFX & Video Production",
    description: "Photorealistic CGI integration, green-screen keying, environment extensions, rotoscoping, and full RED/ARRI camera workflows.",
    icon: Wand2,
    accent: "#8b5cf6",
    topBorder: "bg-gradient-to-r from-brand-purple via-violet-400 to-transparent",
    glow: "group-hover:shadow-[0_8px_40px_rgba(139,92,246,0.18)]",
    skills: ["Nuke", "Blender", "After Effects", "Red/Arri"],
  },
  {
    title: "Social Media Campaigns",
    description: "High-octane pacing, colour grading, sound design, and narrative edits optimised for TikTok, Instagram Reels, and YouTube Shorts.",
    icon: Scissors,
    accent: "#06b6d4",
    topBorder: "bg-gradient-to-r from-brand-cyan via-sky-400 to-transparent",
    glow: "group-hover:shadow-[0_8px_40px_rgba(6,182,212,0.18)]",
    skills: ["Premiere Pro", "DaVinci Resolve", "CapCut Pro", "Strategy"],
  },
  {
    title: "Logo Branding & Design",
    description: "Creative visual identities, vector logos, corporate style guides, typography animations, and high-converting marketing graphics.",
    icon: Layers,
    accent: "#f97316",
    topBorder: "bg-gradient-to-r from-brand-amber via-amber-400 to-transparent",
    glow: "group-hover:shadow-[0_8px_40px_rgba(249,115,22,0.18)]",
    skills: ["Illustrator", "Photoshop", "After Effects", "Strategy"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/6 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block text-[11px] font-heading font-black uppercase tracking-[0.25em] text-brand-cyan mb-4"
          >
            02 / Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none"
          >
            EXPERTISE THAT WOWS
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-2xl glass-panel p-8 flex flex-col overflow-hidden transition-all duration-500 ${s.glow}`}
            >
              {/* Coloured top beam */}
              <div className={`absolute top-0 left-0 w-full h-[2px] ${s.topBorder} opacity-25 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Icon */}
              <div className="mb-6 w-11 h-11 rounded-xl bg-zinc-950/70 border border-zinc-800/60 flex items-center justify-center text-zinc-400 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-all duration-300">
                <s.icon className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-heading font-black text-zinc-100 mb-3 tracking-tight leading-tight">
                {s.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-sans">
                {s.description}
              </p>

              {/* Toolkit tags */}
              <div className="border-t border-zinc-800/40 pt-5">
                <p className="text-[9px] font-heading font-black uppercase tracking-[0.2em] text-zinc-600 mb-3">Toolkit</p>
                <div className="flex flex-wrap gap-2">
                  {s.skills.map((sk) => (
                    <span key={sk} className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-800/50 text-[10px] font-heading font-bold text-zinc-400">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
