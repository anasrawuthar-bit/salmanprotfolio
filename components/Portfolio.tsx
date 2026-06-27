"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, ImageIcon, Layers, Grid, LayoutList, Maximize2 } from "lucide-react";

interface GalleryProject {
  id: number;
  category: string;
  companyName: string;
  description: string;
  coverImage: string;
  images: string[];
}

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
export default function Portfolio() {
  const [categories, setCategories] = useState<string[]>([]);
  const [projects, setProjects]     = useState<GalleryProject[]>([]);

  /* view: "categories" shows cards, "projects" shows overlay of projects in selected category */
  const [view, setView]             = useState<"categories" | "projects">("categories");
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(null);
  const [lightbox, setLightbox]     = useState<number | null>(null); // Index of image in activeProject.images

  /* layoutMode: "grid" (masonry), "flow-wide" (centered stack), "flow-full" (full width stack) */
  const [layoutMode, setLayoutMode] = useState<"grid" | "flow-wide" | "flow-full">("grid");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        const g = d.gallery ?? { categories: [], projects: [] };
        setCategories(g.categories ?? []);
        setProjects(g.projects ?? []);
      })
      .catch(() => {});
  }, []);

  const catProjects = projects.filter((p) => p.category === selectedCat);

  /* ── Lightbox navigation ── */
  const prev = useCallback(() => {
    if (!activeProject) return;
    const len = activeProject.images.length;
    setLightbox((i) => (i === null ? null : (i - 1 + len) % len));
  }, [activeProject]);

  const next = useCallback(() => {
    if (!activeProject) return;
    const len = activeProject.images.length;
    setLightbox((i) => (i === null ? null : (i + 1) % len));
  }, [activeProject]);

  // Lock body scroll when overlay or project view is open
  useEffect(() => {
    if (view === "projects" || activeProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [view, activeProject]);

  // Handle keyboard events (Escape to close, arrows for lightbox)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) {
          setLightbox(null);
        } else if (activeProject !== null) {
          setActiveProject(null);
        } else if (view === "projects") {
          backToCategories();
        }
      }
      if (lightbox !== null && activeProject) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft")  prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, view, activeProject, next, prev]);

  /* Open a category overlay */
  function openCategory(cat: string) {
    setSelectedCat(cat);
    setView("projects");
    setActiveProject(null);
    setLightbox(null);
  }

  // Go back
  function backToCategories() {
    setView("categories");
    setSelectedCat("");
    setActiveProject(null);
    setLightbox(null);
  }

  return (
    <section id="portfolio" className="relative py-28 bg-[#070709] px-4 md:px-8 border-t border-dark-border overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <div className="mb-14">
          <span className="text-xs font-heading font-black uppercase tracking-widest text-brand-cyan mb-3 block">
            Creative Works
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-100 tracking-tight leading-none">
            PORTFOLIO
          </h2>
          <p className="text-zinc-500 text-sm font-sans mt-4 max-w-md">
            Select a category to explore client case studies and design projects.
          </p>
        </div>

        {/* ── Category Cards View ── */}
        <div>
          {categories.length === 0 ? (
            <div className="py-32 text-center border-2 border-dashed border-zinc-800/60 rounded-3xl">
              <Layers className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-650 font-heading font-bold text-xs uppercase tracking-widest">
                No categories yet — configure projects in the admin panel
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat, i) => {
                const projectsInCat = projects.filter((p) => p.category === cat);
                const count = projectsInCat.length;
                const cover = projectsInCat[0]?.coverImage || projectsInCat[0]?.images?.[0] || "";

                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openCategory(cat)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-zinc-800/60 hover:border-brand-purple/50 bg-zinc-950 transition-all duration-400 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] hover:-translate-y-1"
                  >
                    {/* Category cover thumbnail */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900/40">
                      {cover ? (
                        <img
                          src={cover}
                          alt={cat}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out select-none"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                          <ImageIcon className="w-10 h-10 text-zinc-800" />
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Centered view indicator on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-purple/90 backdrop-blur-sm shadow-[0_0_24px_rgba(139,92,246,0.5)]">
                          <ZoomIn className="w-4 h-4 text-white" />
                          <span className="text-xs font-heading font-black text-white uppercase tracking-wider">Explore</span>
                        </div>
                      </div>

                      {/* Project count badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] font-heading font-black text-zinc-300 uppercase tracking-wider">
                        {count} {count === 1 ? "project" : "projects"}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-black text-base md:text-lg text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                          {cat}
                        </h3>
                        <p className="text-zinc-550 text-[11px] font-heading mt-0.5">
                          {count} company case stud{count === 1 ? "y" : "ies"}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-800 group-hover:border-brand-purple/50 flex items-center justify-center transition-all group-hover:bg-brand-purple/10">
                        <ChevronRight className="w-4 h-4 text-zinc-650 group-hover:text-brand-purple transition-colors group-hover:translate-x-0.5 duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Fullscreen Category Projects List Overlay ── */}
      <AnimatePresence>
        {view === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#070709] overflow-y-auto"
            data-lenis-prevent
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/5 blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 relative z-10 pb-24">
              {/* Back Button */}
              <button
                onClick={backToCategories}
                className="inline-flex items-center gap-2 text-zinc-505 hover:text-brand-cyan text-xs font-heading font-black uppercase tracking-wider mb-6 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Categories
              </button>

              <div className="border-b border-zinc-900 pb-8 mb-12">
                <span className="text-[10px] font-heading font-black uppercase tracking-widest text-brand-cyan block mb-1">
                  Category
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-none uppercase">
                  {selectedCat}
                </h2>
              </div>

              {catProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {catProjects.map((proj, i) => {
                    const photosCount = proj.images?.length ?? 0;
                    return (
                      <motion.div
                        key={proj.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        onClick={() => setActiveProject(proj)}
                        className="group cursor-pointer rounded-2xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/30 overflow-hidden transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900/60">
                            {proj.coverImage ? (
                              <img
                                src={proj.coverImage}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-zinc-950">
                                <ImageIcon className="w-8 h-8 text-zinc-800" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/45 transition-colors duration-300" />
                            
                            {/* Hover zoom icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="px-4 py-2 rounded-full bg-brand-cyan text-black font-heading font-black text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                View Case Study
                              </div>
                            </div>

                            <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[8px] font-heading font-bold text-zinc-400 uppercase tracking-widest">
                              {photosCount} image{photosCount !== 1 ? "s" : ""}
                            </span>
                          </div>

                          <div className="p-5">
                            <h4 className="font-display font-black text-lg text-zinc-250 tracking-tight group-hover:text-white transition-colors">
                              {proj.companyName}
                            </h4>
                            <p className="text-zinc-550 text-xs font-sans mt-2 line-clamp-3 leading-relaxed">
                              {proj.description || "No description provided."}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-3 border-t border-zinc-900/50 flex items-center justify-between text-zinc-650 group-hover:text-brand-cyan transition-colors">
                          <span className="text-[9px] font-heading font-black uppercase tracking-widest">Read Showcase</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-24 text-center border border-dashed border-zinc-900 rounded-2xl">
                  <ImageIcon className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
                  <p className="text-zinc-655 font-heading font-bold text-xs uppercase tracking-widest">No projects in this category yet</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={backToCategories}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-50 group flex items-center justify-center p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 shadow-[0_0_24px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nested Fullscreen Project Detail View ── */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-45 bg-[#050507] overflow-y-auto"
            data-lenis-prevent
          >
            {/* Header Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-cyan/5 blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 relative z-10 pb-32">
              {/* Back Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="inline-flex items-center gap-2 text-zinc-505 hover:text-brand-cyan text-xs font-heading font-black uppercase tracking-wider mb-6 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to {selectedCat}
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-zinc-900 pb-10 mb-12">
                <div className="lg:col-span-2">
                  <span className="text-[10px] font-heading font-black uppercase tracking-widest text-brand-purple block mb-1">
                    Project Case Study
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-tight">
                    {activeProject.companyName}
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base font-sans mt-4 leading-relaxed max-w-3xl whitespace-pre-line">
                    {activeProject.description || "No description provided."}
                  </p>
                </div>

                <div className="flex flex-col lg:items-end justify-end gap-4">
                  {/* Layout selector */}
                  {activeProject.images?.length > 0 && (
                    <div>
                      <span className="text-[9px] font-heading font-bold text-zinc-650 uppercase tracking-widest block mb-2 lg:text-right">
                        Layout Options
                      </span>
                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-900 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <button
                          onClick={() => setLayoutMode("grid")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            layoutMode === "grid"
                              ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                          title="Grid Layout"
                        >
                          <Grid className="w-3 h-3" />
                          <span>Grid</span>
                        </button>
                        <button
                          onClick={() => setLayoutMode("flow-wide")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            layoutMode === "flow-wide"
                              ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                          title="Wide List Flow"
                        >
                          <LayoutList className="w-3 h-3" />
                          <span>Wide</span>
                        </button>
                        <button
                          onClick={() => setLayoutMode("flow-full")}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                            layoutMode === "flow-full"
                              ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                              : "text-zinc-500 hover:text-zinc-300"
                          }`}
                          title="Full Width Flow"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Full</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="lg:text-right">
                    <span className="text-[9px] font-heading font-bold text-zinc-650 uppercase tracking-widest block mb-0.5">
                      Gallery Size
                    </span>
                    <span className="text-sm font-display font-black text-zinc-400">
                      {activeProject.images?.length ?? 0} photo{(activeProject.images?.length ?? 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gallery content */}
              <div className={`relative z-10 ${layoutMode === "flow-full" ? "w-full" : ""}`}>
                {activeProject.images && activeProject.images.length > 0 ? (
                  <>
                    {/* Grid Layout (Masonry-like Columns) */}
                    {layoutMode === "grid" && (
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                        {activeProject.images.map((img, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: idx * 0.035 }}
                            className="break-inside-avoid mb-3 md:mb-4 cursor-pointer group relative overflow-hidden rounded-xl border border-zinc-900 hover:border-zinc-800 transition-colors"
                            onClick={() => setLightbox(idx)}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full block rounded-xl group-hover:scale-[1.03] transition-transform duration-500 select-none"
                              draggable={false}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="p-2 rounded-full bg-black/60 border border-zinc-850">
                                <ZoomIn className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Centered Wide List Flow */}
                    {layoutMode === "flow-wide" && (
                      <div className="flex flex-col gap-6 md:gap-10 max-w-5xl mx-auto">
                        {activeProject.images.map((img, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="cursor-pointer group relative overflow-hidden rounded-2xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/20"
                            onClick={() => setLightbox(idx)}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-auto block rounded-2xl group-hover:scale-[1.01] transition-transform duration-500 select-none"
                              draggable={false}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-sm border border-zinc-850 text-white flex items-center gap-1.5">
                                <ZoomIn className="w-3.5 h-3.5 text-brand-cyan" />
                                <span className="text-[10px] font-heading font-black uppercase tracking-wider">Expand Photo</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Full-Bleed Stack Flow */}
                    {layoutMode === "flow-full" && (
                      <div className="flex flex-col w-full">
                        {activeProject.images.map((img, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="cursor-pointer group relative overflow-hidden w-full"
                            onClick={() => setLightbox(idx)}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-auto block select-none"
                              draggable={false}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="px-4 py-2.5 rounded-full bg-black/70 backdrop-blur-sm border border-zinc-850 text-white flex items-center gap-1.5">
                                <ZoomIn className="w-3.5 h-3.5 text-brand-cyan" />
                                <span className="text-[10px] font-heading font-black uppercase tracking-wider">Expand Photo</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-24 text-center border border-dashed border-zinc-900 rounded-2xl">
                    <ImageIcon className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
                    <p className="text-zinc-655 font-heading font-bold text-xs uppercase tracking-widest">No images in this project showcase</p>
                  </div>
                )}
              </div>
            </div>

            {/* Close button to go back to category projects list */}
            <button
              onClick={() => setActiveProject(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-50 group flex items-center justify-center p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 shadow-[0_0_24px_rgba(0,0,0,0.5)] transition-all cursor-pointer"
              title="Close Case Study (Esc)"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && activeProject && activeProject.images[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/96 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter + info details */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 text-[9px] font-heading font-black uppercase tracking-wider">
              <span className="text-brand-cyan">{selectedCat}</span>
              <span className="w-px h-3 bg-zinc-800" />
              <span className="text-zinc-300 truncate max-w-44">{activeProject.companyName}</span>
              <span className="w-px h-3 bg-zinc-800" />
              <span className="text-zinc-450">
                {lightbox + 1} / {activeProject.images.length}
              </span>
            </div>

            {/* Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              src={activeProject.images[lightbox]}
              alt=""
              className="max-w-[88vw] max-h-[88vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] select-none"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Prev / Next controls */}
            {activeProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-800 hover:border-zinc-600"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer border border-zinc-800 hover:border-zinc-600"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
