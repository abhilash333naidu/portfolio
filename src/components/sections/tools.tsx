"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";

const tools = [
  { name: "CATIA", category: "Design & Analysis" },
  { name: "FEA", category: "Design & Analysis" },
  { name: "FMEA", category: "Design & Analysis" },
  { name: "Electromagnetic Analysis", category: "Design & Analysis" },
  { name: "GMP", category: "Regulatory" },
  { name: "cGMP", category: "Regulatory" },
  { name: "TGA", category: "Regulatory" },
  { name: "FDA", category: "Regulatory" },
  { name: "Technology Transfer", category: "Process & Systems" },
  { name: "DOE", category: "Process & Systems" },
  { name: "Risk Analysis", category: "Process & Systems" },
  { name: "Validation (IQ/OQ/PQ)", category: "Process & Systems" },
  { name: "Python", category: "Programming" },
  { name: "PLC Fundamentals", category: "Programming" },
  { name: "CS50", category: "Programming" },
];

export function Tools() {
  return (
    <section id="tools" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#888888]">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            Tools & Technologies
          </h2>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#2a2a2a] bg-[#141414] flex flex-col items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#161616] hover:shadow-[0_8px_24px_rgba(255,255,255,0.05)]"
              whileHover={{ scale: 1.02 }}
            >
              {/* Tool Name */}
              <h3 className="text-xs sm:text-base font-semibold text-[#ffffff] text-center">
                {tool.name}
              </h3>

              {/* Category */}
              <span className="text-[10px] sm:text-xs text-[#666666] text-center">
                {tool.category}
              </span>

              {/* Shiny Accent on Hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#ffffff]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
