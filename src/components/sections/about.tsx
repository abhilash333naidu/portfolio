"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { Download } from "lucide-react";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "$800M+", label: "Capital Projects" },
  { number: "10+", label: "Teams Led" },
  { number: "0", label: "Major Findings" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#666666]">
            About Me
          </span>
        </FadeUp>

        <TextReveal
          text="Systems Engineer Delivering Complex Programs"
          className="mb-6 sm:mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#ffffff]"
          delay={0.2}
        />

        <FadeUp delay={0.4}>
          <p className="mb-6 text-base sm:text-lg text-[#888888] leading-relaxed">
            A distinguished engineering manager with 10+ years of progressive experience delivering safety-critical, 
            capital-intensive programs across GMP-regulated pharmaceutical manufacturing and precision 
            engineering. Expert in systems engineering, technology transfer, and regulatory 
            compliance.
          </p>
        </FadeUp>

        <FadeUp delay={0.6}>
          <p className="mb-6 text-base sm:text-lg text-[#555555] leading-relaxed">
            Career progression spans mechanical design and CNC systems, through laser process 
            engineering, to regulated pharmaceutical manufacturing, technology transfer, and major 
            capital project delivery. Currently contributing to Project Banksia, a landmark 
            $800M sovereign manufacturing investment.
          </p>
        </FadeUp>

        <FadeUp delay={0.8}>
          <p className="mb-8 sm:mb-10 text-base sm:text-lg text-[#555555] leading-relaxed">
            Core strengths include multi-site technology transfer, process definition and validation, 
            regulatory audit preparedness (TGA/FDA/EU), and end-to-end commissioning 
            of production systems. Now seeking to apply expertise to Defence sector capability 
            acquisition and sustainment programs.
          </p>
        </FadeUp>

        <FadeUp delay={1.0}>
          <motion.a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#e5e5e5] via-[#666666] to-[#e5e5e5] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-[#000000] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.08)]"
            style={{ backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            Download Resume
          </motion.a>
        </FadeUp>

        {/* Detailed Stats Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center p-3 sm:p-4 rounded-xl bg-[#050505] border border-[#1a1a1a]"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#ffffff] mb-1">
                {stat.number}
              </div>
              <div className="text-xs text-[#444444]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
