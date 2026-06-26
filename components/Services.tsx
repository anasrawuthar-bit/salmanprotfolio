"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wand2, Scissors, Layers } from "lucide-react";

const defaultServices = [
  {
    id: 1,
    title: "Video Production & Editing",
    description: "High-impact video editing, professional production, cinematic color grading, sound design, and motion graphics designed to captivate your audience.",
    accent: "#8b5cf6",
    skills: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
  },
  {
    id: 2,
    title: "Social Media Campaigns",
    description: "High-octane pacing, color grading, sound design, and narrative edits optimized for TikTok, Instagram Reels, and YouTube Shorts.",
    accent: "#06b6d4",
    skills: ["Premiere Pro", "CapCut Pro", "After Effects", "Photoshop"],
  },
  {
    id: 3,
    title: "Logo Branding & Design",
    description: "Creative visual identities, vector logos, corporate style guides, typography animations, and high-converting marketing graphics.",
    accent: "#f97316",
    skills: ["Illustrator", "Photoshop", "CorelDRAW"],
  },
];

const iconMap: Record<number, React.FC<any>> = {
  1: Wand2,
  2: Scissors,
  3: Layers,
};

export default function Services() {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        if (d.services && d.services.length > 0) {
          setServicesList(d.services);
        } else {
          setServicesList(defaultServices);
        }
      })
      .catch(() => {
        setServicesList(defaultServices);
      });
  }, []);

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
          {servicesList.map((s, i) => {
            const IconComponent = iconMap[s.id] || Layers;
            const accentColor = s.accent || "#8b5cf6";
            const topBorderBg = `linear-gradient(to right, ${accentColor} 0%, ${accentColor}80 40%, transparent 100%)`;

            return (
              <motion.div
                key={s.id || s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  borderColor: hoveredIdx === i ? `${accentColor}50` : "rgba(39, 39, 42, 0.4)",
                  boxShadow: hoveredIdx === i ? `0 8px 40px ${accentColor}18` : "none",
                }}
                className="group relative rounded-2xl glass-panel p-8 flex flex-col overflow-hidden transition-all duration-500 border"
              >
                {/* Coloured top beam */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-25 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: topBorderBg }}
                />

                {/* Icon */}
                <div
                  className="mb-6 w-11 h-11 rounded-xl bg-zinc-950/70 border flex items-center justify-center transition-all duration-300"
                  style={{
                    color: hoveredIdx === i ? accentColor : "#71717a",
                    borderColor: hoveredIdx === i ? `${accentColor}60` : "rgba(39, 39, 42, 0.4)",
                  }}
                >
                  <IconComponent className="w-5 h-5" />
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
                    {s.skills && s.skills.map((sk: string) => (
                      <span key={sk} className="px-2.5 py-1 rounded-md bg-zinc-950/60 border border-zinc-800/50 text-[10px] font-heading font-bold text-zinc-400">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
