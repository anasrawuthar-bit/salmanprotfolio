"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const cursorDotRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Raw GPU positioning for the inner dot (no transition lag)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    // Event listeners to change cursor states based on hovered element attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]");

      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute("data-cursor") || "";
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-cyan pointer-events-none"
      />

      {/* Trailing Ring */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovered ? (hoverText ? 70 : 50) : 32,
          height: isHovered ? (hoverText ? 70 : 50) : 32,
          borderColor: isHovered ? "#8b5cf6" : "#06b6d4",
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.1)" : "rgba(6, 182, 212, 0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="fixed top-0 left-0 rounded-full border-[1.5px] border-brand-cyan flex items-center justify-center text-[10px] font-black tracking-widest text-zinc-100 uppercase pointer-events-none"
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] text-brand-cyan"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
