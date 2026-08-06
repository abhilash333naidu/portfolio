"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Footer } from "@/components/layout/footer";
import { Experience } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Tools } from "@/components/sections/tools";
import { Contact } from "@/components/sections/contact";
import { easings } from "@/lib/animations";
import { Download, ChevronDown, ArrowRight, Briefcase, Building2, Shield, Award } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

// Floating Orb Component
function FloatingOrb({ delay, duration, size, color }: { delay: number; duration: number; size: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        opacity: 0.06,
      }}
      initial={{ x: 0, y: 0 }}
      animate={{
        x: [0, 80, -60, 0],
        y: [0, -60, 40, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Character animation for name
function AnimatedName({ text }: { text: string }) {
  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.3 + index * 0.03,
            ease: easings.luxury,
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}

// Word animation for paragraphs
function AnimatedParagraph({ children, delay = 0, className = "" }: { children: string; delay?: number; className?: string }) {
  const words = children.split(" ");
  
  return (
    <p className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.02,
            ease: "easeOut",
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// Shimmer text effect
function ShimmerText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}

// Main Hero Component
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000] px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(30, 25, 15, 0.6) 0%, rgba(0, 0, 0, 1) 60%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} duration={30} size={400} color="radial-gradient(circle, #d4af37 0%, transparent 70%)" />
        <FloatingOrb delay={8} duration={35} size={300} color="radial-gradient(circle, #3b82f6 0%, transparent 70%)" />
        <FloatingOrb delay={16} duration={40} size={350} color="radial-gradient(circle, #d4af37 0%, transparent 70%)" />
      </div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{ opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          
          {/* Left Column - Photo */}
          <motion.div 
            className="w-full lg:w-[40%] flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easings.luxury }}
          >
            {/* Photo Container */}
            <div className="relative">
              {/* Static subtle border */}
              <div className="absolute -inset-[1px] rounded-2xl border border-[#d4af37]/20 pointer-events-none" />

              {/* Light Tracing Effect - Drawing around photo perimeter */}
              <svg
                className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f4d03f" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
                
                {/* Background track (subtle) - traces the rectangular perimeter */}
                <path
                  d="M 8 2 L 92 2 Q 98 2 98 8 L 98 92 Q 98 98 92 98 L 8 98 Q 2 98 2 92 L 2 8 Q 2 2 8 2 Z"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                />
                
                {/* Animated light stroke - travels along the perimeter path */}
                <motion.path
                  d="M 8 2 L 92 2 Q 98 2 98 8 L 98 92 Q 98 98 92 98 L 8 98 Q 2 98 2 92 L 2 8 Q 2 2 8 2 Z"
                  fill="none"
                  stroke="url(#goldStroke)"
                  strokeWidth="4.5"
                  strokeDasharray="10 370"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{
                    strokeDashoffset: [0, -370]
                  }}
                  style={{
                    filter: "drop-shadow(0 0 1.5px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 3px rgba(212, 175, 55, 0.3))"
                  }}
                  transition={{
                    duration: 12.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Second tracer - opposite side (180 degrees) */}
                <motion.path
                  d="M 8 2 L 92 2 Q 98 2 98 8 L 98 92 Q 98 98 92 98 L 8 98 Q 2 98 2 92 L 2 8 Q 2 2 8 2 Z"
                  fill="none"
                  stroke="url(#goldStroke)"
                  strokeWidth="4.5"
                  strokeDasharray="10 370"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: -180 }}
                  animate={{
                    strokeDashoffset: [-180, -550]
                  }}
                  style={{
                    filter: "drop-shadow(0 0 1.5px rgba(212, 175, 55, 0.8)) drop-shadow(0 0 3px rgba(212, 175, 55, 0.3))"
                  }}
                  transition={{
                    duration: 12.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>

              {/* Photo */}
              <motion.div
                className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-2xl overflow-hidden bg-[#000000]"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <Image
                  src="/abhilash.webp"
                  alt="Abhilash Naidu Paspulati"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-[60%] flex flex-col text-center lg:text-left">
            {/* Name */}
            <div className="mb-2">
              <AnimatedName text="Abhilash Naidu Paspulati" />
            </div>

            {/* Title with Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, ease: easings.luxury }}
              className="mb-6"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
                <ShimmerText text="Systems Engineering Manager" />
              </h2>
            </motion.div>

            {/* Professional Summary */}
            <div className="space-y-4 mb-6">
              <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
                Engineering leader with 10+ years delivering safety-critical, capital-intensive systems across GMP-regulated pharmaceutical manufacturing and precision engineering.
              </p>

              <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
                Currently driving Project Banksia, a landmark AUD 800M sovereign manufacturing investment supporting large-scale vaccine and biologics production.
              </p>

              <p className="text-sm sm:text-base text-[#aaaaaa] leading-relaxed">
                Specialist in technology transfer, process validation, regulatory audit readiness (TGA / FDA / EMA), and operational handover of complex production systems.
              </p>
            </div>

            {/* Credentials - Inline with Icons (Non-clickable) */}
            {/* Credentials with Staggered Animation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.5,
                  },
                },
              }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mb-8 text-xs sm:text-sm"
            >
              {/* Credential Item Component */}
              {[
                { icon: Award, text: "$800M Project Banksia" },
                { icon: Building2, text: "GMP Manufacturing" },
                { icon: Briefcase, text: "Technology Transfer" },
                { icon: Shield, text: "Regulatory Compliance" },
              ].map((item, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: easings.luxury,
                      },
                    },
                  }}
                  className="group relative flex items-center gap-1.5 cursor-default"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Icon */}
                  <motion.span
                    animate={{
                      scale: [1, 1.12, 1],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                    className="relative"
                  >
                    {/* Icon Glow on Hover */}
                    <span className="absolute inset-0 rounded-full bg-slate-400/0 blur-md transition-all duration-300 group-hover:bg-slate-400/20" />
                    <item.icon className="w-3.5 h-3.5 text-[#d4af37] relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </motion.span>
                  
                  {/* Text with Gradient Shimmer Sweep */}
                  <span className="relative overflow-hidden">
                    <motion.span
                      className="relative inline-block text-[#555555] transition-colors duration-300 group-hover:text-[#aaaaaa]"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #555555 0%, #aaaaaa 50%, #555555 100%)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      animate={{
                        backgroundPosition: ["200% 0%", "-200% 0%"],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.8,
                      }}
                    >
                      {item.text}
                    </motion.span>
                    {/* Underline that draws in on hover */}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                  </span>
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.3, ease: easings.luxury }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="/resume.pdf"
                download
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] rounded-full text-[#000000] font-semibold text-sm overflow-hidden"
                style={{ backgroundSize: "200% 200%" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.a>

              <motion.a
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        <motion.a
          href="#experience"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative bg-[#000000] pb-20">
        <Hero />

        {/* Quick Navigation - Single Row at Bottom */}
        <motion.nav
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1a1a1a] bg-[#000000]/95 backdrop-blur-xl"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 sm:gap-4 py-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-[#2a2a2a] bg-[#0a0a0a] text-[#888888] text-sm font-medium hover:text-[#ffffff] hover:border-[#3a3a3a] hover:bg-[#141414] transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Full Sections Below */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl border border-[#1a1a1a] bg-[#050505] p-8 sm:p-12 lg:p-16">
            <Experience />
          </div>
        </section>

        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl border border-[#1a1a1a] bg-[#050505] p-8 sm:p-12 lg:p-16">
            <Services />
          </div>
        </section>

        <section id="tools" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto rounded-3xl border border-[#1a1a1a] bg-[#050505] p-8 sm:p-12 lg:p-16">
            <Tools />
          </div>
        </section>

        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto rounded-3xl border border-[#1a1a1a] bg-[#050505] p-8 sm:p-12 lg:p-16">
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
