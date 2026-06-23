"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, MoveHorizontal } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  return (
    <section className="relative py-24 bg-dark-bg px-4 md:px-8 border-t border-dark-border overflow-hidden">
      {/* Background glow spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-purple mb-3 block">
            VFX breakdown
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-100 mb-4 tracking-tight">
            INTERACTIVE COMPOSITING SLIDER
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed">
            Drag the handle to slide between the **raw green screen footage plate** and Salman's **final color-graded VFX composite**.
          </p>
        </div>

        {/* Before/After Container */}
        <div
          ref={containerRef}
          data-cursor="DRAG"
          className="relative aspect-square md:aspect-video w-full rounded-2xl overflow-hidden border border-dark-border bg-zinc-950 shadow-[0_0_40px_rgba(6,182,212,0.1)] select-none cursor-ew-resize"
          onMouseMove={(e) => {
            if (isDragging) handleMove(e.clientX);
          }}
          onTouchMove={(e) => {
            if (isDragging) handleMove(e.touches[0].clientX);
          }}
        >
          {/* After image (Space background, full size) */}
          <img
            src="/vfx_after.png"
            alt="Completed VFX shot"
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-bold text-brand-cyan flex items-center gap-1.5 pointer-events-none shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            FINAL VFX COMPOSITE
          </div>

          {/* Before image (Green screen, cropped based on slider position) */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/vfx_before.png"
              alt="Raw Green Screen Footage"
              className="absolute top-0 left-0 w-full h-full object-cover max-w-none pointer-events-none"
              style={{
                width: containerRef.current ? containerRef.current.offsetWidth : "100%",
                height: containerRef.current ? containerRef.current.offsetHeight : "100%"
              }}
            />
          </div>
          <div
            className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-zinc-800 text-xs font-bold text-zinc-400 pointer-events-none shadow-md"
            style={{ opacity: sliderPosition > 15 ? 1 : 0, transition: "opacity 0.2s" }}
          >
            RAW GREEN SCREEN PLATE
          </div>

          {/* Vertical Divider line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Grab handle knob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-cyan hover:bg-brand-purple text-zinc-950 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] border-2 border-zinc-950 transition-colors duration-200">
              <MoveHorizontal className="w-5 h-5 text-zinc-950 stroke-[2.5px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
