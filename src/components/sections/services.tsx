"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Settings, 
  GitBranch, 
  ShieldCheck, 
  DraftingCompass 
} from "lucide-react";

const services = [
  {
    id: "engineering-management",
    title: "Engineering Management & Systems Integration",
    description: "End-to-end program delivery, multi-disciplinary team leadership, requirements traceability & design control for complex systems.",
    icon: Settings,
  },
  {
    id: "technology-transfer",
    title: "Technology Transfer & Validation",
    description: "Global-to-local technology transfer, IQ/OQ/PQ validation lifecycle, QTPP, CQA, CPP alignment for regulated industries.",
    icon: GitBranch,
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory Compliance & Quality",
    description: "TGA/FDA/EU audit readiness, GMP/cGMP compliance, deviation management & CAPA processes.",
    icon: ShieldCheck,
  },
  {
    id: "mechanical-design",
    title: "Mechanical Design & Analysis",
    description: "CATIA 3D modeling, FEA & electromagnetic analysis, CNC systems & precision engineering for safety-critical applications.",
    icon: DraftingCompass,
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            What I Offer
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={staggerItem}
              className="group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-[#2a2a2a] bg-[#141414] transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#161616] hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
            >
              {/* Icon */}
              <motion.div
                className="mb-4 sm:mb-6 inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#0a0a0a]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: easings.luxury }}
              >
                <service.icon className="h-5 w-5 sm:h-7 sm:w-7 text-[#ffffff]" />
              </motion.div>

              {/* Title */}
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-[#ffffff] leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                {service.description}
              </p>

              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#ffffff]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
