"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { smoothScrollConfig } from "@/lib/animations";

export function useSmoothScroll(): void {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: smoothScrollConfig.duration,
      easing: smoothScrollConfig.easing,
      orientation: smoothScrollConfig.orientation,
      gestureOrientation: smoothScrollConfig.gestureOrientation,
      smoothWheel: smoothScrollConfig.smoothWheel,
      wheelMultiplier: smoothScrollConfig.wheelMultiplier,
      touchMultiplier: smoothScrollConfig.touchMultiplier,
    });

    lenisRef.current = lenis;

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
