"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Salman is an absolute wizard. He took our green screen studio shots and compiled them into an award-winning cinematic sci-fi commercial. His tracking and lighting integration are flawless.",
    name: "Alex Thorne",
    role: "Director of Photography",
    company: "FilmLab Studios"
  },
  {
    quote: "His attention to detail in DaVinci color grading and Premiere editing is unmatched. The Nike social spot looked incredibly rich and cinematic. Salman's workflow is efficient and highly creative.",
    name: "Marcus Vance",
    role: "Creative Director",
    company: "Run Agency"
  },
  {
    quote: "Absolutely blew our expectations away! His graphic overlay titles, motion typography, and sound design really brought our game intro trailer to life. A true professional through and after.",
    name: "Sarah Lin",
    role: "Lead Producer",
    company: "Pixel Arcade"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 bg-dark-bg px-4 md:px-8 border-t border-dark-border">
      {/* Light glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3 block">
            Endorsements
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-100 tracking-tight">
            CLIENT FEEDBACK
          </h2>
        </div>

        {/* Testimonial slider */}
        <div className="relative rounded-2xl bg-dark-card border border-dark-border p-8 md:p-12 box-glow-purple flex flex-col justify-between min-h-[300px] overflow-hidden">
          <Quote className="w-12 h-12 text-brand-purple/20 absolute top-8 left-8 pointer-events-none" />

          {/* Animating content wrapper */}
          <div className="relative z-10 flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full text-center md:text-left"
              >
                <p className="text-lg md:text-2xl font-medium text-zinc-200 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                <div>
                  <h4 className="text-xl font-bold text-zinc-100">
                    {testimonials[currentIndex].name}
                  </h4>
                  <span className="text-xs md:text-sm text-zinc-400 font-medium">
                    {testimonials[currentIndex].role} &bull; {testimonials[currentIndex].company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center md:justify-end gap-3 mt-8 border-t border-zinc-800/60 pt-6">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg border border-dark-border bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg border border-dark-border bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
