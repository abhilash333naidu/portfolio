"use client";

import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

interface TimelineNodeProps {
  company: string;
  role: string;
  period: string;
  position: number;
  isCurrent: boolean;
}

export function TimelineNode({ company, role, period, position, isCurrent }: TimelineNodeProps) {
  return (
    <motion.div
      className="absolute timeline-node"
      style={{ 
        left: `${(position / 6) * 100}%`,
        transform: 'translateX(-50%)'
      }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: position * 0.1, duration: 0.6, ease: easings.luxury }}
      whileHover={{ y: -4 }}
    >
      {/* Company Logo Placeholder */}
      <div className="relative mb-3">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
          isCurrent 
            ? 'bg-[#d4af37] border-[#d4af37] shadow-lg shadow-[#d4af37]/25' 
            : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a] hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)]'
        }`}>
          <span className={`text-sm sm:text-base font-bold transition-colors ${
            isCurrent ? 'text-[#0a0a0a]' : 'text-[#888888]'
          }`}>
            {company.split(' ').map(word => word[0]).join('').toUpperCase()}
          </span>
        </div>
        
        {/* Current Position Pulse */}
        {isCurrent && (
          <motion.div
            className="absolute inset-1 rounded-xl bg-[#d4af37] opacity-0"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      
      {/* Role Details - Always Visible */}
      <div className="text-center w-48 sm:w-56">
        <h4 className={`text-sm sm:text-base font-semibold mb-1 transition-colors ${
          isCurrent ? 'text-[#ffffff]' : 'text-[#ffffff]'
        }`}>
          {company}
        </h4>
        <p className="text-xs sm:text-sm text-[#a0a0a0] mb-2">{role}</p>
        <span className="text-xs font-medium text-[#d4af37]">{period}</span>
      </div>
      
      {/* Node Point on Timeline */}
      <div className={`absolute -bottom-4 left-1/2 w-4 h-4 rounded-full border-2 border-[#0a0a0a] transition-all duration-300 -translate-x-1/2 ${
        isCurrent ? 'bg-[#d4af37] border-[#d4af37]' : 'bg-[#1a1a1a] border-[#2a2a2a]'
      }`}>
        <div className={`absolute inset-1 rounded-full transition-colors ${
          isCurrent ? 'bg-[#d4af37]' : 'bg-[#ffffff]'
        }`} />
      </div>
    </motion.div>
  );
}