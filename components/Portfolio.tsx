"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, X } from "lucide-react";

interface Project {
  id: number; title: string; category: string; client: string;
  software: string[]; videoUrl: string; thumbnail: string; description: string;
}

export default function Portfolio() {
  const [projects, setProjects]     = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo]   = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        setProjects(d.portfolio ?? []);
        setCategories(["All", ...(d.categories ?? [])]);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = projects.filter((project) =>
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <section id="portfolio" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[350px] bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="text-xs md:text-sm font-heading font-black uppercase tracking-widest text-brand-cyan mb-3 block">
              Recent Works
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none">
              PORTFOLIO SHOWCASE
            </h2>
          </div>

          {/* Premium Pill tabs category selector */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0 bg-zinc-950/80 border border-zinc-800/60 p-1.5 rounded-xl relative z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative px-5 py-2.5 rounded-lg text-xs md:text-sm font-heading font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-colors duration-300 cursor-pointer"
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-purple rounded-lg -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className={activeCategory === category ? "text-zinc-100" : ""}>
                  {category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-dark-border shadow-lg flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  {/* Image */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Glass Color Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Play / View Overlay action details */}
                  <div
                    data-cursor={project.videoUrl ? "PLAY" : "VIEW"}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                  >
                    {project.videoUrl ? (
                      <button
                        onClick={() => setSelectedVideo(project.videoUrl)}
                        className="p-3.5 rounded-full bg-brand-purple text-zinc-100 hover:scale-110 shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-transform duration-300 cursor-pointer"
                        title="Watch project reel"
                      >
                        <Play className="w-5 h-5 fill-current text-white" />
                      </button>
                    ) : (
                      <div className="p-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100" title="Graphic design work">
                        <Eye className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content details info */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] uppercase font-heading font-black tracking-widest text-brand-cyan mb-2 block">
                      {project.category} &bull; {project.client}
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading font-black text-zinc-100 mb-3 leading-tight group-hover:text-brand-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Software used badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/40 mt-auto">
                    {project.software.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/60 text-[9px] font-heading font-semibold text-zinc-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(139,92,246,0.25)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                data-cursor="CLOSE"
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-zinc-400 hover:text-white hover:bg-black/80 transition-all duration-200 cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player */}
              <iframe
                src={`${selectedVideo}?autoplay=1&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Project Video Player"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
