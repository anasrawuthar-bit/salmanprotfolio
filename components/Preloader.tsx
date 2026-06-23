"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["S", "A", "L", "M", "A", "N"];
const DURATION_MS = 3800;

const STATUSES = [
  { at: 0,  text: "INITIALIZING CREATIVE ENVIRONMENT..." },
  { at: 25, text: "COMPILING VFX PLATES & 3D MODELS..."  },
  { at: 55, text: "CALIBRATING COLOR SPACES & LUTS..."   },
  { at: 85, text: "EXPORTING MASTER COMPOSITE..."        },
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  // Refs for direct DOM updates — bypasses React re-render batching
  const counterRef  = useRef<HTMLSpanElement>(null);
  const statusRef   = useRef<HTMLSpanElement>(null);
  const letterRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const dismissed   = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    try { sessionStorage.setItem("preloader-done", "1"); } catch (_) {}
    setVisible(false);
  };

  useEffect(() => {
    // Skip if already played this session
    try {
      if (sessionStorage.getItem("preloader-done")) { setVisible(false); return; }
    } catch (_) {}

    let start: number | null = null;
    let raf: number;

    const tick = (ts: number) => {
      if (dismissed.current) return;
      if (!start) start = ts;

      const elapsed = ts - start;
      const pct = Math.min(Math.floor((elapsed / DURATION_MS) * 100), 100);

      // ── Direct DOM: percentage counter ──
      if (counterRef.current) counterRef.current.textContent = `${pct}%`;

      // ── Direct DOM: letter highlights ──
      const active = Math.min(Math.floor((pct / 100) * LETTERS.length), LETTERS.length - 1);
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i <= active) {
          el.style.color = "#f4f4f5";
          el.style.textShadow = "0 0 20px rgba(139,92,246,0.4)";
          el.style.transform = "scale(1.1)";
        } else {
          el.style.color = "rgba(39,39,42,0.25)";
          el.style.textShadow = "none";
          el.style.transform = "scale(1)";
        }
      });

      // ── Direct DOM: status text ──
      if (statusRef.current) {
        let label = STATUSES[0].text;
        for (const s of STATUSES) { if (pct >= s.at) label = s.text; }
        statusRef.current.textContent = label;
      }

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
      // dismiss is handled by the setTimeout below
    };

    raf = requestAnimationFrame(tick);

    // Primary dismiss — fires after animation completes
    const primary = setTimeout(dismiss, DURATION_MS + 500);
    // Hard failsafe — absolute max 7 s
    const failsafe = setTimeout(dismiss, 7000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(primary);
      clearTimeout(failsafe);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070709] text-zinc-100 select-none overflow-hidden"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-purple to-transparent animate-scanline" />
          </div>

          {/* Ambient glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[320px] h-[320px] rounded-full bg-brand-cyan/20 blur-[100px] pointer-events-none"
          />

          <div className="relative w-full max-w-[440px] px-8 flex flex-col items-center gap-10">

            {/* ── Letters row ── */}
            <div className="relative w-full h-28 flex items-end justify-center border-b border-zinc-800/40 pb-4">
              <div className="flex justify-between w-full">
                {LETTERS.map((l, i) => (
                  <span
                    key={i}
                    ref={el => { letterRefs.current[i] = el; }}
                    style={{
                      color: "rgba(39,39,42,0.25)",
                      transition: "color 0.25s, text-shadow 0.25s, transform 0.25s",
                      display: "inline-block",
                    }}
                    className="font-display text-5xl md:text-7xl font-black"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Progress info ── */}
            <div className="w-full flex flex-col items-center gap-3">

              {/* Percentage — updated via ref */}
              <span
                ref={counterRef}
                className="font-heading font-black text-sm tracking-widest text-zinc-300"
              >
                0%
              </span>

              {/* CSS-driven progress bar — cannot be blocked by JS */}
              <div className="w-56 h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                <div className="preloader-bar h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
              </div>

              {/* Status — updated via ref */}
              <span
                ref={statusRef}
                className="font-heading text-[10px] font-bold tracking-wider uppercase text-brand-cyan text-center"
              >
                INITIALIZING CREATIVE ENVIRONMENT...
              </span>

              <span className="font-heading text-[9px] font-semibold tracking-widest uppercase text-zinc-600">
                CREATIVE STUDIO SUITE v1.2
              </span>

            </div>
          </div>

          {/* Skip button — always works regardless of animation state */}
          <button
            onClick={dismiss}
            className="absolute bottom-8 px-5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[10px] font-heading font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 hover:border-zinc-600 transition-all duration-200 cursor-pointer z-50"
          >
            Skip Intro
          </button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
