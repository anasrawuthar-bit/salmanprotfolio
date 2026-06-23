"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // Auto-run animation frame loops in modern versions of lenis
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
