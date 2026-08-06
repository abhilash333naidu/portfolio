"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { easings } from "@/lib/animations";
import { ArrowRight } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
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
            Featured Projects
          </span>
          <TextReveal
            text="Major Programs & Case Studies"
            className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#ffffff]"
            delay={0.2}
          />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={`/projects/${project.id}`}
              className={`
                group relative overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#141414]
                transition-all duration-300 hover:border-[#3a3a3a] hover:shadow-[0_20px_40px_rgba(255,255,255,0.08)]
                ${project.size === 'featured' ? 'sm:col-span-2 lg:col-span-3' : ''}
                ${project.size === 'large' ? 'sm:col-span-2' : ''}
                ${project.size === 'wide' ? 'sm:col-span-2' : ''}
              `}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                ease: easings.luxury,
                delay: index * 0.1 
              }}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className={`relative ${project.size === 'featured' ? 'aspect-[2/1] sm:aspect-[16/7]' : 'aspect-[4/3]'} overflow-hidden`}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: easings.luxury }}
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  {/* Category Tag */}
                  <span className="inline-block mb-2 px-3 py-1 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] border border-[#2a2a2a] text-[#888888]">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#ffffff] mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#a0a0a0] line-clamp-2 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs text-[#666666]">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-[#888888]">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Case Study Button */}
                  <motion.button
                    className="group/btn relative inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-5 py-2 text-sm font-medium text-[#0a0a0a] opacity-0 transition-all duration-300 hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>

                {/* Shiny Border for Featured Projects */}
                {project.accent && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ffffff]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                )}
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="mt-12 lg:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.luxury }}
        >
          <motion.a
            href="#"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffffff] via-[#888888] to-[#ffffff] px-8 py-4 text-sm sm:text-base font-medium text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
            style={{ backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
