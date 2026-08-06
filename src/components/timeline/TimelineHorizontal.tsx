"use client";

import { TimelineNode } from "./TimelineNode";
import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

interface TimelineHorizontalProps {
  experiences: Array<{
    id: string;
    company: string;
    role: string;
    period: string;
  }>;
}

export function TimelineHorizontal({ experiences }: TimelineHorizontalProps) {
  return (
    <motion.div
      className="timeline-horizontal"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easings.luxury }}
    >
      {/* Years Header */}
      <div className="flex justify-between mb-6 px-4">
        <span className="text-xs font-medium text-[#888888]">2016</span>
        <span className="text-xs font-medium text-[#888888]">2017</span>
        <span className="text-xs font-medium text-[#888888]">2018</span>
        <span className="text-xs font-medium text-[#888888]">2020</span>
        <span className="text-xs font-medium text-[#888888]">2022</span>
        <span className="text-xs font-medium text-[#d4af37]">Present</span>
      </div>

      {/* Main Timeline Container */}
      <div className="relative h-40 mb-8">
        {/* Horizontal Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#2a2a2a]" />
        
        {/* Timeline Nodes */}
        {experiences.map((exp, index) => (
          <TimelineNode
            key={exp.id}
            company={exp.company}
            role={exp.role}
            period={exp.period}
            position={index}
            isCurrent={index === experiences.length - 1}
          />
        ))}
      </div>

      {/* Mobile Scroll Indicator - Hidden by default, shown on mobile via CSS */}
      <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2">
        <div className="w-4 h-8 bg-gradient-to-r from-transparent via-[#888888] to-transparent opacity-0" />
      </div>
    </motion.div>
  );
}