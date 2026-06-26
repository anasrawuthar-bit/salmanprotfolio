"use client";

const items = [
  "MOTION GRAPHICS",
  "CINEMATIC VIDEO EDITING",
  "LOGO BRANDING",
  "MARKETING CAMPAIGNS",
  "VIDEO PRODUCTION",
  "COLOR GRADING",
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[#040406] border-y border-zinc-900 py-6 relative z-10 select-none">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#040406] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#040406] to-transparent z-10" />

      <div className="flex w-max animate-marquee">
        {[1, 2].map((track) => (
          <div key={track} className="flex items-center gap-8 pr-8">
            {items.map((item, i) => (
              <div key={`${track}-${i}`} className="flex items-center gap-8">
                <span className="font-display text-2xl md:text-5xl font-black tracking-tight text-stroke-zinc uppercase whitespace-nowrap cursor-default">
                  {item}
                </span>
                <span className="text-brand-purple/50 text-lg md:text-3xl font-black leading-none">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
