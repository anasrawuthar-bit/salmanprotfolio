"use client";

import { motion } from "framer-motion";

// SVGs for the software logos
const PremiereLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" className="inline-block align-middle select-none">
    <rect width="24" height="24" rx="5" fill="#14002a" stroke="#ea77ff" strokeWidth="1.5"/>
    <text x="50%" y="58%" fill="#ea77ff" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle" dominantBaseline="middle">Pr</text>
  </svg>
);

const IllustratorLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" className="inline-block align-middle select-none">
    <rect width="24" height="24" rx="5" fill="#231200" stroke="#ff9f00" strokeWidth="1.5"/>
    <text x="50%" y="58%" fill="#ff9f00" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle" dominantBaseline="middle">Ai</text>
  </svg>
);

const CapCutLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" className="inline-block align-middle select-none">
    <rect width="24" height="24" rx="5" fill="#0d0d0d" stroke="#ffffff" strokeWidth="1.5"/>
    <g transform="translate(12, 12) scale(0.85)">
      <path d="M-5,-5 L-1,-5 C0.5,-5 1.5,-4 1.5,-2.5 L1.5,-1.5 C1.5,0 -0.5,1 -2,1 L-5,1 C-6.5,1 -7.5,0 -7.5,-1.5 L-7.5,-3.5 C-7.5,-5 -6.5,-5 -5,-5 Z" fill="#ffffff" />
      <path d="M2.5,5 L5,5 C6.5,5 7.5,4 7.5,2.5 L7.5,1.5 C7.5,0 5.5,-1 4,-1 L1,-1 C-0.5,-1 -1.5,0 -1.5,1.5 L-1.5,3.5 C-1.5,5 -0.5,5 2.5,5 Z" fill="#ff003c" />
    </g>
  </svg>
);

const DaVinciLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" className="inline-block align-middle select-none">
    <rect width="24" height="24" rx="5" fill="#020813" stroke="#0055ff" strokeWidth="1.5"/>
    <g transform="translate(12, 12) scale(0.7)">
      <circle cx="0" cy="-4" r="4.5" fill="#ff3333" opacity="0.9" style={{ mixBlendMode: "screen" }}/>
      <circle cx="-3.5" cy="2" r="4.5" fill="#33ff33" opacity="0.9" style={{ mixBlendMode: "screen" }}/>
      <circle cx="3.5" cy="2" r="4.5" fill="#3333ff" opacity="0.9" style={{ mixBlendMode: "screen" }}/>
    </g>
  </svg>
);

const steps = [
  {
    num: "01",
    title: "CREATIVE EDITING",
    description: "Assembling video timelines, pacing cuts, and speed ramping. Transforming raw footage into highly energetic, cohesive, and scroll-stopping digital content tailored for marketing and video reel campaigns.",
    logo: <PremiereLogo />,
    color: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    num: "02",
    title: "LOGO BRANDING",
    description: "Developing visual brand identities, vector logos, style guides, and typography guidelines. Ensuring cohesive branding across digital web channels, prints, and video overlays.",
    logo: <IllustratorLogo />,
    color: "from-amber-500 to-yellow-500",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
  {
    num: "03",
    title: "SOCIAL MEDIA HANDLING",
    description: "Creating, editing, and optimizing short-form content. Crafting viral video hooks, caption overlays, and content strategies specifically tailored to capture attention on TikTok, Instagram, and YouTube.",
    logo: <CapCutLogo />,
    color: "from-rose-500 to-pink-500",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  {
    num: "04",
    title: "SOUND DESIGN",
    description: "Designing high-fidelity video audio tracks. Layering Foley sound effects, ambient tracks, voice enhancements, and transitional audio sweeps to maximize viewer immersion.",
    logo: <PremiereLogo />,
    color: "from-purple-500 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  {
    num: "05",
    title: "COLOR GRADING",
    description: "DaVinci Resolve color balancing, RAW footage correction, and custom LUT mapping. Infusing distinct cinematic tones and colors to establish the brand's aesthetic identity.",
    logo: <DaVinciLogo />,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  }
];

export default function Workflow() {
  return (
    <section className="relative pt-36 pb-32 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Top & Bottom Glowing Dividers */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent" />

      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-xs md:text-sm font-heading font-black uppercase tracking-widest text-brand-cyan mb-3 block">
            03 / Process
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none">
            THE CREATIVE WORKFLOW
          </h2>
        </div>

        {/* Workflow steps container */}
        <div className="relative flex flex-col gap-12 md:gap-16">
          {/* Vertical connecting neon timeline track */}
          <div className="absolute left-[34px] md:left-[52px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-brand-purple via-brand-cyan to-brand-amber/80 opacity-20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex gap-6 md:gap-12 items-start max-w-[800px] mx-auto w-full"
            >
              {/* Left Column: Glowing Node & Number */}
              <div className="relative flex flex-col items-center select-none">
                {/* Outlined text step number in Syne font */}
                <span className="font-display text-5xl md:text-7xl font-black text-transparent -webkit-text-stroke-[1px] -webkit-text-stroke-zinc-800 group-hover:-webkit-text-stroke-brand-purple transition-all duration-500 leading-none group-hover:text-glow-purple">
                  {step.num}
                </span>

                {/* Micro timeline node dot */}
                <div className="absolute -left-1 md:-left-2 bottom-0 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-brand-purple group-hover:bg-brand-purple transition-colors duration-500 shadow-[0_0_10px_rgba(139,92,246,0.3)] z-10" />
              </div>

              {/* Right Column: Content Card */}
              <div className="flex-1 glass-panel rounded-2xl p-6 md:p-8 hover:border-brand-purple/20 transition-all duration-500 group-hover:bg-zinc-900/20">
                <div className="mb-3">
                  <h3 className="font-heading text-lg md:text-2xl font-black text-zinc-300 group-hover:text-zinc-50 group-hover:text-glow-purple transition-all duration-300">
                    {step.title}
                  </h3>
                </div>

                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 text-xs md:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
