"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Database, 
  Cloud, 
  Terminal,
  Globe,
  Layers
} from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
    color: "from-accent-blue to-accent-cyan",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Node.js, Python, PostgreSQL, MongoDB, Redis",
    color: "from-accent-purple to-accent-blue",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, Design Systems, Prototyping",
    color: "from-accent-cyan to-accent-purple",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter, Responsive Design",
    color: "from-accent-blue to-accent-purple",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD, Vercel, Kubernetes",
    color: "from-accent-purple to-accent-cyan",
  },
  {
    icon: Terminal,
    title: "Tools & Workflow",
    description: "Git, GitHub, VS Code, Linux, Agile/Scrum",
    color: "from-accent-cyan to-accent-blue",
  },
  {
    icon: Globe,
    title: "Web Performance",
    description: "SEO, Accessibility, Core Web Vitals, Optimization",
    color: "from-accent-blue to-accent-cyan",
  },
  {
    icon: Layers,
    title: "Architecture",
    description: "Microservices, API Design, System Design, Scalability",
    color: "from-accent-purple to-accent-blue",
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 text-center">
          <FadeUp>
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">
              Expertise
            </span>
          </FadeUp>

          <TextReveal
            text="Skills & Technologies"
            className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold"
            delay={0.2}
          />

          <FadeUp delay={0.5} className="mx-auto max-w-2xl">
            <p className="text-body-large text-text-secondary px-4">
              A comprehensive toolkit of modern technologies and methodologies 
              that I use to bring ideas to life.
            </p>
          </FadeUp>
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: easings.luxury } }}
              className="group relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-surface border border-surface-border overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />

              {/* Icon */}
              <div className={`relative mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.color}`}>
                <skill.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative mb-2 text-base sm:text-lg font-semibold text-text-primary">
                {skill.title}
              </h3>
              <p className="relative text-sm text-text-tertiary leading-relaxed">
                {skill.description}
              </p>

              {/* Hover Border Effect */}
              <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500 group-hover:opacity-20 blur-xl -z-10`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
