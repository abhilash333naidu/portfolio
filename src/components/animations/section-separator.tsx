"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

export function SectionSeparator() {
  return (
    <motion.div
      className="relative flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: easings.luxury }}
    >
      <div className="flex items-center gap-4 w-full max-w-3xl mx-auto">
        {/* Left line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#222222] to-[#222222] flex-1" />
        
        {/* Animated element */}
        <motion.div
          className="relative flex items-center justify-center w-8 h-8"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-1.5 h-1.5 bg-[#ffffff] rounded-sm rotate-45" />
        </motion.div>
        
        {/* Right line */}
        <div className="h-px bg-gradient-to-l from-transparent via-[#222222] to-[#222222] flex-1" />
      </div>
    </motion.div>
  );
}
