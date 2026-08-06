"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Briefcase, 
  Target, 
  Wrench, 
  FileText, 
  Briefcase as ServicesIcon, 
  Mail 
} from "lucide-react";

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
    icon: ServicesIcon,
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

export function QuickNav() {
  return (
    <section id="quick-nav" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-[#555555]">
            Quick Navigation
          </span>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {quickNavItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              variants={staggerItem}
              className="group relative p-8 rounded-2xl border border-[#1a1a1a] bg-[#050505] transition-all duration-300 hover:border-[#222222] hover:bg-[#080808] hover:shadow-[0_20px_40px_rgba(255,255,255,0.03)]"
            >
              {/* Icon */}
              <motion.div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#000000]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: easings.luxury }}
              >
                <item.icon className="h-6 w-6 text-[#ffffff]" />
              </motion.div>

              {/* Title */}
              <h3 className="mb-1 text-xl font-semibold text-[#ffffff]">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mb-3 text-sm font-medium text-[#666666]">
                {item.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-[#444444] leading-relaxed">
                {item.description}
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="absolute right-6 top-6 h-6 w-6 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[#444444]"
                >
                  →
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
