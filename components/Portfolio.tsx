"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, ImageIcon, Layers, Grid, LayoutList, Maximize2 } from "lucide-react";

interface GalleryWork { id: number; category: string; image: string; }

/* ─────────────────────────────────────────────────
}

/* ─────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────── */
export default function Portfolio() {
  const [categories, setCategories] = useState<string[]>([]);
  const [works, setWorks]           = useState<GalleryWork[]>([]);

  /* view: "categories" shows cards, "gallery" shows masonry overlay of selected cat */
  const [view, setView]             = useState<"categories" | "gallery">("categories");
  const [selectedCat, setSelectedCat] = useState<string>("");
  const [lightbox, setLightbox]     = useState<number | null>(null);

  /* layoutMode: "grid" (masonry), "flow-wide" (centered stack), "flow-full" (full width stack) */
  const [layoutMode, setLayoutMode] = useState<"grid" | "flow-wide" | "flow-full">("grid");

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((d) => {
        const g = d.gallery ?? { categories: [], works: [] };
        setCategories(g.categories ?? []);
        setWorks(g.works ?? []);
      })
      .catch(() => {});
  }, []);

  const filtered = works.filter((w) => w.category === selectedCat);

  /* ── Lightbox navigation ── */
  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (view === "gallery") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [view]);

  // Handle keyboard events (Escape to close lightbox or overlay, arrows for lightbox)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) {
          setLightbox(null);
        } else if (view === "gallery") {
          backToCategories();
        }
      }
      if (lightbox !== null) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft")  prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, view, next, prev]);

  /* Open a category overlay */
  function openCategory(cat: string) {
    setSelectedCat(cat);
    setView("gallery");
    setLightbox(null);
  }

  function backToCategories() {
    setView("categories");
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
            Select a category to explore the full collection.
          </p>
        </div>

        {/* ── Category Cards View (Always mounted to preserve scroll offset) ── */}
        <div>
          {categories.length === 0 ? (
            <div className="py-32 text-center border-2 border-dashed border-zinc-800/60 rounded-3xl">
              <Layers className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-600 font-heading font-bold text-xs uppercase tracking-widest">
                No categories yet — upload works from the admin panel
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {categories.map((cat, i) => {
                const catWorks  = works.filter((w) => w.category === cat);
                const images    = catWorks.map((w) => w.image);
                const count     = catWorks.length;

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
                      {images.length > 0 ? (
                        <img
                          src={images[0]}
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

                      {/* Centered play indicator on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-purple/90 backdrop-blur-sm shadow-[0_0_24px_rgba(139,92,246,0.5)]">
                          <ZoomIn className="w-4 h-4 text-white" />
                          <span className="text-xs font-heading font-black text-white uppercase tracking-wider">View All</span>
                        </div>
                      </div>

                      {/* Count badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] font-heading font-black text-zinc-300 uppercase tracking-wider">
                        {count} {count === 1 ? "work" : "works"}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-display font-black text-base md:text-lg text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                          {cat}
                        </h3>
                        {images.length > 0 && (
                          <p className="text-zinc-600 text-[11px] font-heading mt-0.5">
                            {count} image{count !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-800 group-hover:border-brand-purple/50 flex items-center justify-center transition-all group-hover:bg-brand-purple/10">
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-brand-purple transition-colors group-hover:translate-x-0.5 duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Fullscreen Category Works Overlay (Behance-Style) ── */}
      <AnimatePresence>
        {view === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#070709] overflow-y-auto"
            data-lenis-prevent
          >
            {/* Ambient glow inside overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-purple/5 blur-[130px] pointer-events-none" />

            {/* Category Header (always centered and bounded) */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
                <div>
                  <span className="text-[10px] font-heading font-black uppercase tracking-widest text-brand-cyan block mb-1">
                    Category
                  </span>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-100 tracking-tight leading-none">
                    {selectedCat}
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  {/* Layout mode switcher */}
                  {filtered.length > 0 && (
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-900 shadow-[0_0_24px_rgba(0,0,0,0.5)]">
                      <button
                        onClick={() => setLayoutMode("grid")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          layoutMode === "grid"
                            ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Grid View"
                      >
                        <Grid className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Grid</span>
                      </button>
                      <button
                        onClick={() => setLayoutMode("flow-wide")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          layoutMode === "flow-wide"
                            ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Wide Flow"
                      >
                        <LayoutList className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Wide Flow</span>
                      </button>
                      <button
                        onClick={() => setLayoutMode("flow-full")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-heading text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          layoutMode === "flow-full"
                            ? "bg-brand-purple text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                        title="Full Bleed"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Full Bleed</span>
                      </button>
                    </div>
                  )}

                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-heading font-bold text-zinc-600 uppercase tracking-widest block mb-0.5">
                      Total Works
                    </span>
                    <span className="text-lg font-display font-black text-zinc-400">
                      {filtered.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Works Content layout container */}
            <div className={`relative z-10 pb-24 ${layoutMode === "flow-full" ? "w-full" : "max-w-7xl mx-auto px-4 md:px-8"}`}>
              {filtered.length > 0 ? (
                <>
                  {/* Mode 1: Masonry Grid */}
                  {layoutMode === "grid" && (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
                      {filtered.map((work, i) => (
                        <motion.div
                          key={work.id}
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                          className="break-inside-avoid mb-3 md:mb-4 cursor-pointer group relative overflow-hidden rounded-xl border border-zinc-800/40 hover:border-brand-purple/30 transition-colors duration-300"
                          onClick={() => setLightbox(i)}
                        >
                          <img
                            src={work.image}
                            alt=""
                            className="w-full block rounded-xl group-hover:scale-[1.04] transition-transform duration-500 ease-out select-none"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                            <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                              <ZoomIn className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Mode 2: Centered Wide Flow */}
                  {layoutMode === "flow-wide" && (
                    <div className="flex flex-col gap-8 md:gap-12 max-w-5xl mx-auto">
                      {filtered.map((work, i) => (
                        <motion.div
                          key={work.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="cursor-pointer group relative overflow-hidden rounded-2xl border border-zinc-800/40 hover:border-brand-purple/20 transition-colors duration-300 bg-zinc-950/40"
                          onClick={() => setLightbox(i)}
                        >
                          <img
                            src={work.image}
                            alt=""
                            className="w-full h-auto block rounded-2xl group-hover:scale-[1.01] transition-transform duration-500 ease-out select-none"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                            <div className="p-3 rounded-full bg-black/65 backdrop-blur-sm border border-zinc-850 text-white flex items-center gap-2">
                              <ZoomIn className="w-4 h-4 text-brand-cyan" />
                              <span className="text-xs font-heading font-black uppercase tracking-wider">Expand View</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Mode 3: Full-Bleed Flow (Behance Style) */}
                  {layoutMode === "flow-full" && (
                    <div className="flex flex-col w-full">
                      {filtered.map((work, i) => (
                        <motion.div
                          key={work.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="cursor-pointer group relative overflow-hidden w-full bg-zinc-950/10"
                          onClick={() => setLightbox(i)}
                        >
                          <img
                            src={work.image}
                            alt=""
                            className="w-full h-auto block select-none"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="p-3 rounded-full bg-black/65 backdrop-blur-sm border border-zinc-850 text-white flex items-center gap-2">
                              <ZoomIn className="w-4 h-4 text-brand-cyan" />
                              <span className="text-xs font-heading font-black uppercase tracking-wider">Expand View</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-32 text-center border-2 border-dashed border-zinc-800/60 rounded-3xl max-w-7xl mx-auto px-4 md:px-8">
                  <ImageIcon className="w-10 h-10 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-600 font-heading font-bold text-xs uppercase tracking-widest">
                    No works in this category yet
                  </p>
                </div>
              )}
            </div>

            {/* Floating Close Button */}
            <button
              onClick={backToCategories}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-50 group flex items-center justify-center p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 shadow-[0_0_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:scale-105 transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
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

            {/* Counter + category */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/90 backdrop-blur-sm border border-zinc-800">
              <span className="text-[10px] font-heading font-black text-brand-cyan uppercase tracking-widest">{selectedCat}</span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="text-[10px] font-heading font-black text-zinc-400 uppercase tracking-widest">
                {lightbox + 1} / {filtered.length}
              </span>
            </div>

            {/* Image */}
            <motion.img
              key={filtered[lightbox].id}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              src={filtered[lightbox].image}
              alt=""
              className="max-w-[88vw] max-h-[88vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.9)] select-none"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {/* Prev / Next */}
            {filtered.length > 1 && (
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
