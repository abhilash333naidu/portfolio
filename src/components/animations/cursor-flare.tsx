"use client";

import { useEffect, useState } from "react";

export function CursorFlare() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Spotlight effect - illuminates area with golden hue */}
      <div
        className="absolute inset-0"
        style={{
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <div
          className="absolute"
          style={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 200, 120, 0.075) 0%, 
              rgba(255, 180, 100, 0.031) 37.5%, 
              transparent 75%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Outer cinematic ambient light - golden tint */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255, 200, 100, 0.05) 0%, rgba(255, 180, 80, 0.019) 35%, transparent 60%)",
          filter: "blur(75px)",
          transition: "opacity 0.4s ease-out",
        }}
      />
      
      {/* Mid layer - warm golden glow */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(255, 190, 90, 0.075) 0%, rgba(255, 170, 70, 0.025) 50%, transparent 75%)",
          filter: "blur(37px)",
        }}
      />
      
      {/* Inner core - warm white center */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "45px",
          height: "45px",
          background: "radial-gradient(circle, rgba(255, 220, 150, 0.10) 0%, rgba(255, 200, 100, 0.038) 60%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
