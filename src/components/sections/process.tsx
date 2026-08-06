"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { Search, GitFork, Shield, Rocket } from "lucide-react";

const processSteps = [
  {
    id: "research",
    number: "01",
    title: "Research & Requirements",
    description: "Define QTPP, CQAs, CPPs. Stakeholder alignment and comprehensive risk assessment.",
    icon: Search,
  },
  {
    id: "design",
    number: "02",
    title: "Systems Design & Integration",
    description: "Equipment specification, FAT/SAT planning, multi-disciplinary coordination.",
    icon: GitFork,
  },
  {
    id: "validation",
    number: "03",
    title: "Validation & Compliance",
    description: "IQ/OQ/PQ execution, regulatory documentation, audit readiness.",
    icon: Shield,
  },
  {
    id: "commissioning",
    number: "04",
    title: "Commissioning & Handover",
    description: "Operational readiness, training delivery, knowledge transfer.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            My Workflow
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Horizontal Connecting Line - hidden on mobile */}
          <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-[#2a2a2a]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={staggerItem}
                className="relative"
              >
                {/* Step Number Circle */}
                <motion.div
                  className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full border-2 sm:border-4 border-[#0a0a0a] bg-[#1a1a1a] z-10"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easings.luxury }}
                >
                  <div className="absolute inset-2 sm:inset-3 rounded-full bg-[#141414]" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-[#ffffff]">
                    {step.number}
                  </span>
                </motion.div>

                {/* Content Card */}
                <div className="mt-8 sm:mt-10 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-[#2a2a2a] bg-[#141414]">
                  {/* Icon */}
                  <div className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#0a0a0a]">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ffffff]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-[#ffffff] mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
