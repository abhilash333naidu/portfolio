"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { easings, durations } from "@/lib/animations";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeUp({
  children,
  delay = 0,
  duration = durations.slow,
  className = "",
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: easings.luxury,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
