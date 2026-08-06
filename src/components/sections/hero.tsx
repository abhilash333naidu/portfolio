"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TextReveal } from "@/components/animations/text-reveal";
import { FadeUp } from "@/components/animations/fade-up";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Building2, Calendar, Briefcase, Target, Wrench, FileText, Mail, Download } from "lucide-react";
import { Experience } from "./experience";
import { QuickNav } from "./quick-nav";

export function Hero() {
  const experiences = [
    {
      id: "csl-seqirus",
      company: "CSL Seqirus",
      role: "MS&T Process Engineer / Technology Transfer Lead",
      period: "Jul 2022 - Present",
      description: "Led 10+ cross-functional teams on $800M Project Banksia. Global technology transfer for cell-culture vaccines and antivenom products.",
    },
    {
      id: "life-space",
      company: "Life-Space Group",
      role: "Project Engineer",
      period: "Nov 2021 - Jul 2022",
      description: "Delivered engineering solutions in nutraceutical manufacturing. Led tablet manufacturing and sachet packaging production lines.",
    },
    {
      id: "pharma-tech",
      company: "Australian Pharmaceutical Manufacturers",
      role: "Technical Lead",
      period: "Jul 2020 - Nov 2021",
      description: "Technical delivery ensuring GMP compliance for all pharmaceutical manufacturing processes.",
    },
    {
      id: "pharma-scientist",
      company: "Australian Pharmaceutical Manufacturers",
      role: "Technical Scientist",
      period: "Sep 2018 - Jul 2020",
      description: "Contributed to scientific and technical aspects of pharmaceutical production and process improvement.",
    },
    {
      id: "glass-expansions",
      company: "Glass Expansions",
      role: "Laser Technician",
      period: "Jun 2017 - Aug 2018",
      description: "Laser programming and execution for precision engraving and cutting. Implemented 5S and continuous improvement initiatives.",
    },
    {
      id: "skf",
      company: "SKF Australia Pty Ltd",
      role: "Mechanical Draftsperson",
      period: "Sep 2016 - Jun 2017",
      description: "Drafted and designed large bearing systems for food, oil, and mining sector clients.",
    },
    {
      id: "simplex",
      company: "Simplex CNC Systems",
      role: "Design Engineer",
      period: "Feb 2016 - Aug 2016",
      description: "Spindle design and magnetic bearing integration for CNC systems. Conducted electromagnetic analysis and FEA.",
    },
  ];

  const quickNavItems = [
    {
      id: "experience",
      title: "Experience",
      subtitle: "10+ Years",
      description: "Progressive engineering leadership",
      icon: Briefcase,
      href: "#experience",
      delay: 0.1,
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "6 Major Programs",
      description: "$800M+ in capital projects",
      icon: Target,
      href: "#projects",
      delay: 0.2,
    },
    {
      id: "skills",
      title: "Skills",
      subtitle: "Technical Stack",
      description: "CATIA, FEA, GMP, Validation",
      icon: Wrench,
      href: "#tools",
      delay: 0.3,
    },
    {
      id: "resume",
      title: "Resume",
      subtitle: "Download",
      description: "PDF & ATS versions available",
      icon: FileText,
      href: "#downloads",
      delay: 0.4,
    },
    {
      id: "services",
      title: "Services",
      subtitle: "What I Offer",
      description: "Systems integration & validation",
      icon: Briefcase,
      href: "#services",
      delay: 0.5,
    },
    {
      id: "contact",
      title: "Contact",
      subtitle: "Get in Touch",
      description: "Let's discuss opportunities",
      icon: Mail,
      href: "#contact",
      delay: 0.6,
    },
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "$800M+", label: "Capital Projects" },
    { number: "10+", label: "Teams Led" },
    { number: "0", label: "Major Findings" },
  ];
  return (
    <section id="home" className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#000000] via-[#050505] to-[#000000]">
       
       {/* Noise texture overlay */}
       <div
         className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Headshot, Name, Title and About */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Photo - smaller */}
            <motion.div
              className="relative aspect-[3/4] max-w-xs mx-auto lg:mx-0 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easings.luxury }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.08)"
              }}
            >
              <Image
                src="/abhilash.png"
                alt="Abhilash Naidu Paspulati"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/30 via-transparent to-transparent" />
            </motion.div>

            {/* Name and Title - condensed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easings.luxury, delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#ffffff] mb-3">
                Abhilash Naidu Paspulati
              </h1>
              <h2 className="text-base sm:text-lg font-medium text-[#888888] mb-3">
                Engineering Manager & Systems Engineer
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed mb-4">
                10+ years delivering safety-critical, capital-intensive programs across 
                pharmaceutical manufacturing and regulated industries.
              </p>
              <motion.a
                href="#projects"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e5e5e5] via-[#666666] to-[#e5e5e5] px-5 py-2.5 text-sm font-medium text-[#000000] transition-all duration-300"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>

            {/* About Section - condensed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easings.luxury, delay: 0.4 }}
              className="pt-4 border-t border-[#1a1a1a]"
            >
              <span className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#666666]">
                About Me
              </span>
              
              <h3 className="text-lg font-bold text-[#ffffff] mb-3">
                Systems Engineer Delivering Complex Programs
              </h3>
              
              <p className="mb-3 text-sm text-[#888888] leading-relaxed">
                A distinguished engineering manager with 10+ years of progressive experience delivering safety-critical, 
                capital-intensive programs across GMP-regulated pharmaceutical manufacturing and precision 
                engineering.
              </p>
              
              <p className="mb-3 text-sm text-[#555555] leading-relaxed">
                Career progression spans mechanical design through laser process engineering to major 
                capital project delivery. Currently contributing to Project Banksia, a landmark 
                $800M sovereign manufacturing investment.
              </p>
              
              <p className="mb-4 text-sm text-[#555555] leading-relaxed">
                Core strengths include multi-site technology transfer, process validation, 
                regulatory compliance (TGA/FDA/EMA), and end-to-end commissioning 
                of production systems.
              </p>

              {/* Download Resume Button - smaller */}
              <motion.a
                href="/resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e5e5e5] via-[#666666] to-[#e5e5e5] px-4 py-2.5 text-sm font-medium text-[#000000] transition-all duration-300 mb-4"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                Download Resume
              </motion.a>

              {/* Stats Grid - smaller */}
              <motion.div
                className="grid grid-cols-2 gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: easings.luxury }}
                    className="text-center p-3 rounded-lg bg-[#050505] border border-[#1a1a1a]"
                  >
                    <div className="text-xl font-bold text-[#ffffff] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs text-[#444444]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Split into Top (Experience) and Bottom (QuickNav) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Top Half - Experience */}
            <motion.div
              className="py-4 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: easings.luxury, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-[#ffffff] mb-4">
                Career Journey
              </h3>
              
              {/* Timeline - scrollable on mobile only */}
              <div className="relative space-y-3 max-h-[400px] lg:max-h-none overflow-y-auto lg:overflow-visible custom-scrollbar lg:custom-scrollbar-none pr-2">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-[#2a2a2a]" />
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: easings.luxury }}
                    className="relative pl-12"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-2 top-2 h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-[#1a1a1a]">
                      <div className="absolute inset-1 rounded-full bg-[#ffffff]" />
                    </div>

                    {/* Content Card */}
                    <div className="p-3 rounded-xl border border-[#2a2a2a] bg-[#141414] transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#161616] hover:shadow-[0_4px_12px_rgba(255,255,255,0.03)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-[#888888]" />
                        <h4 className="text-sm font-semibold text-[#ffffff]">
                          {exp.company}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-3 w-3 text-[#666666]" />
                        <p className="text-xs text-[#666666]">
                          {exp.period}
                        </p>
                      </div>
                      <h5 className="text-xs font-medium text-[#a0a0a0] mb-2">
                        {exp.role}
                      </h5>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Half - Quick Nav */}
            <motion.div
              className="py-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easings.luxury, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-[#ffffff] mb-4">
                Quick Navigation
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickNavItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + item.delay, duration: 0.5, ease: easings.luxury }}
                    className="group relative p-3 rounded-xl border border-[#1a1a1a] bg-[#050505] transition-all duration-300 hover:border-[#222222] hover:bg-[#080808] hover:shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
                  >
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#000000]">
                      <item.icon className="h-4 w-4 text-[#ffffff]" />
                    </div>
                    <p className="text-sm font-semibold text-[#ffffff] mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs font-medium text-[#666666] mb-1">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-[#444444] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
