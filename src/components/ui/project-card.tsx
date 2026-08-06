"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const sizeClasses = {
    small: "md:col-span-1 md:row-span-1",
    medium: "md:col-span-1 md:row-span-2",
    large: "md:col-span-2 md:row-span-2",
    wide: "md:col-span-2 md:row-span-1",
    featured: "md:col-span-3 md:row-span-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: easings.luxury,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-surface",
        "border border-surface-border",
        "transition-all duration-500",
        "hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
        sizeClasses[project.size],
        project.accent && "before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-accent-blue/50 before:via-accent-purple/50 before:to-accent-cyan/50 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
        >
          <span className="mb-3 inline-block rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-text-primary transition-transform duration-300 group-hover:translate-y-0">
          {project.title}
        </h3>

        {/* Description - appears on hover */}
        <motion.p
          className="mb-4 text-sm text-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-tertiary"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Links - appear on hover */}
        <div className="flex gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          {project.link && (
            <a
              href={project.link}
              className="flex items-center gap-1 text-sm text-accent-blue hover:text-accent-cyan transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
