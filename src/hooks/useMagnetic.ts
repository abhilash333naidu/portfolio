"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { magneticConfig } from "@/lib/animations";

interface MagneticPosition {
  x: number;
  y: number;
}

export function useMagnetic<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  position: MagneticPosition;
} {
  const ref = useRef<T | null>(null);
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < magneticConfig.radius) {
        const strength =
          (1 - distance / magneticConfig.radius) * magneticConfig.strength;
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = (): void => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { ref, position };
}
