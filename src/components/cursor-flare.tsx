"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorFlareProps {
  enabled?: boolean;
}

export function CursorFlare({ enabled = true }: CursorFlareProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use motion values for smooth cursor tracking
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for smooth, luxurious following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Secondary trail with more lag
  const trailConfig = { damping: 35, stiffness: 100, mass: 1 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Tertiary glow with even more lag
  const glowConfig = { damping: 45, stiffness: 50, mass: 1.5 };
  const glowX = useSpring(cursorX, glowConfig);
  const glowY = useSpring(cursorY, glowConfig);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!enabled || isMobile) {
      return () => window.removeEventListener("resize", checkMobile);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-interactive]');
      setIsHovering(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", checkMobile);
    };
  }, [enabled, isMobile, cursorX, cursorY, isVisible]);

  // Don't render on mobile or if disabled
  if (isMobile || !enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer ambient glow - largest, most diffuse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: glowX,
          y: glowY,
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 40%, transparent 70%)",
          filter: "blur(60px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* Middle trail glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: trailX,
          y: trailY,
          width: 300,
          height: 300,
          marginLeft: -150,
          marginTop: -150,
          background: "radial-gradient(circle, rgba(244, 208, 63, 0.15) 0%, rgba(212, 175, 55, 0.08) 30%, transparent 60%)",
          filter: "blur(37px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      />

      {/* Primary cursor flare - follows closest */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
          background: "radial-gradient(circle, rgba(255, 223, 100, 0.4) 0%, rgba(212, 175, 55, 0.2) 40%, transparent 70%)",
          filter: "blur(12px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease-out",
        }}
      />

      {/* Inner bright core */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 223, 100, 0.6) 30%, rgba(212, 175, 55, 0.3) 60%, transparent 80%)",
          filter: "blur(3px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.1s ease-out",
          mixBlendMode: "screen",
        }}
      />

      {/* Tiny sharp center dot */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 15,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          width: 9,
          height: 9,
          marginLeft: -4.5,
          marginTop: -4.5,
          background: "white",
          boxShadow: "0 0 15px 3px rgba(255, 223, 100, 0.8), 0 0 30px 6px rgba(212, 175, 55, 0.4)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.1s ease-out",
        }}
      />

      {/* Sparkle ring on hover */}
      <motion.div
        className="absolute rounded-full border"
        animate={{
          scale: isHovering ? [1, 1.5, 1.2] : 0,
          opacity: isHovering ? [0, 0.6, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: isHovering ? Infinity : 0,
          repeatDelay: 0.2,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          width: 75,
          height: 75,
          marginLeft: -37.5,
          marginTop: -37.5,
          borderColor: "rgba(212, 175, 55, 0.5)",
          borderWidth: 1,
        }}
      />
    </div>
  );
}
