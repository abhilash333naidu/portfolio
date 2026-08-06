"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function TextReveal({
  text,
  className = "",
  as: Component = "h1",
  delay = 0.3,
}: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const word = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: easings.luxury,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="flex flex-wrap"
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ perspective: "1000px" }}
      >
        {words.map((wordText, index) => (
          <motion.span
            key={index}
            variants={word}
            className="mr-[0.25em] inline-block will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {wordText}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
