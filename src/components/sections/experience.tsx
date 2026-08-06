"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { Building2, Calendar, Briefcase, Target } from "lucide-react";
import Image from "next/image";

// Logo mapping for companies
const companyLogos: Record<string, string> = {
  "CSL Seqirus": "/logos/csl.jpeg",
  "Life-Space Group": "/logos/life_space_group.jpg", 
  "Australian Pharmaceutical Manufacturers": "/logos/apm1.jpg",
  "Glass Expansions": "/logos/glass%20expansion.jpg",
  "SKF Australia Pty Ltd": "/logos/skf.jpg",
  "Simplex CNC Systems": "",
};

// Project data for companies
interface ProjectData {
  id: string;
  title: string;
  role: string;
  duration: string;
  industry?: string;
  projectType?: string;
  summary: string;
  achievements: string[];
}

const companyProjects: Record<string, ProjectData[]> = {
  "CSL Seqirus": [
    {
      id: "banksia",
      title: "Project Banksia",
      role: "Process Engineer – Technology Transfer",
      duration: "4 years",
      industry: "Biopharmaceutical Manufacturing",
      projectType: "Greenfield GMP Facility | Vaccine Manufacturing",
      summary: "Large-scale capital program to establish GMP-compliant vaccine manufacturing capability supporting seasonal and pandemic supply.",
      achievements: [
        "Successfully transferred flu cell culture and PNS product portfolio",
        "Enabled first-time GMP manufacturing at receiving site",
        "Reduced operational and regulatory risk during initial commercial campaigns"
      ]
    }
  ],
  "Life-Space Group": [
    {
      id: "tga-lines",
      title: "TGA Manufacturing Lines Establishment",
      role: "Project Engineer – Line Establishment Lead",
      duration: "1 year",
      industry: "Pharmaceutical Manufacturing",
      projectType: "Tablet Manufacturing & Sachet Packing Lines",
      summary: "Establishment of two major GMP manufacturing lines under aggressive timelines to achieve regulatory approval.",
      achievements: [
        "Achieved TGA license approval on first audit with zero major findings",
        "Delivered two GMP-compliant production lines on schedule",
        "Established TGA audit-ready tablet line and sachet line"
      ]
    }
  ],
  "Australian Pharmaceutical Manufacturers": [
    {
      id: "npd-npi",
      title: "NPD & NPI Programs",
      role: "Project / Process Engineer",
      duration: "Multiple programs",
      industry: "Pharmaceutical Manufacturing",
      projectType: "New Product Development & New Product Introduction",
      summary: "End-to-end development and commercialization of pharmaceutical products from concept through routine production.",
      achievements: [
        "Successfully commercialized multiple pharmaceutical products",
        "Reduced post-launch deviations through strong process design",
        "End-to-end ownership: formulation → pilot → commercial manufacturing"
      ]
    }
  ],
  "Glass Expansions": [
    {
      id: "laser-manufacturing",
      title: "Advanced Laser Manufacturing Optimization",
      role: "Laser Technician",
      duration: "1+ year",
      industry: "Precision Manufacturing",
      projectType: "Process Optimization | Continuous Improvement",
      summary: "Optimization of laser manufacturing processes for difficult-to-machine carbon materials.",
      achievements: [
        "Enabled laser processing of carbon materials previously considered unfeasible",
        "Significantly reduced scrap and rejection rates"
      ]
    }
  ],
  "SKF Australia Pty Ltd": [
    {
      id: "bearing-design",
      title: "Industrial Bearing Design & Optimization",
      role: "Mechanical Draftsperson",
      duration: "~1 year",
      industry: "Heavy Industry | Mining | Oil & Gas",
      projectType: "Mechanical Design | Reliability Engineering",
      summary: "Design and optimization of large-scale bearing systems for global industrial clients.",
      achievements: [
        "Supported high-reliability applications in critical industrial environments",
        "Improved maintainability and lifecycle performance of bearing systems"
      ]
    }
  ],
  "Simplex CNC Systems": [
    {
      id: "cnc-spindle",
      title: "Advanced CNC Spindle Design",
      role: "Design Engineer",
      duration: "Feb 2016 - Aug 2016",
      industry: "Precision Manufacturing",
      projectType: "Mechanical Design | Advanced Engineering",
      summary: "Designing state-of-the-art magnetic bearing spindle for CNC machines.",
      achievements: [
        "CNC spindle redesign for magnetic-bearing compatibility",
        "Electromagnetic analysis + structural/thermal FEA",
        "CATIA design, tolerance stack-up, manufacturability",
        "Prototype support and design validation intent",
        "Advanced mechanical systems design enabling next-generation bearing architecture"
      ]
    }
  ]
};

const experiences = [
  {
    id: "csl-seqirus",
    company: "CSL Seqirus",
    role: "MS&T Process Engineer / Technology Transfer Lead",
    period: "Jul 2022 - Present",
    description: "Led 10+ cross-functional teams on $800M Project Banksia. Global technology transfer for cell-culture vaccines and antivenom products.",
    isCurrent: true,
  },
  {
    id: "life-space",
    company: "Life-Space Group",
    role: "Project Engineer",
    period: "Nov 2021 - Jul 2022",
    description: "Delivered engineering solutions in nutraceutical manufacturing. Led tablet manufacturing and sachet packaging production lines.",
    isCurrent: false,
  },
  {
    id: "pharma-tech",
    company: "Australian Pharmaceutical Manufacturers",
    role: "Technical Lead",
    period: "Jul 2020 - Nov 2021",
    description: "Technical delivery ensuring GMP compliance for all pharmaceutical manufacturing processes.",
    isCurrent: false,
  },
  {
    id: "pharma-scientist",
    company: "Australian Pharmaceutical Manufacturers",
    role: "Technical Scientist",
    period: "Sep 2018 - Jul 2020",
    description: "Contributed to scientific and technical aspects of pharmaceutical production and process improvement.",
    isCurrent: false,
  },
  {
    id: "glass-expansions",
    company: "Glass Expansions",
    role: "Laser Technician",
    period: "Jun 2017 - Aug 2018",
    description: "Laser programming and execution for precision engraving and cutting. Implemented 5S and continuous improvement initiatives.",
    isCurrent: false,
  },
  {
    id: "skf",
    company: "SKF Australia Pty Ltd",
    role: "Mechanical Draftsperson",
    period: "Sep 2016 - Jun 2017",
    description: "Drafted and designed large bearing systems for food, oil, and mining sector clients.",
    isCurrent: false,
  },
  {
    id: "simplex",
    company: "Simplex CNC Systems",
    role: "Design Engineer",
    period: "Feb 2016 - Aug 2016",
    description: "Spindle design and magnetic bearing integration for CNC systems. Conducted electromagnetic analysis and FEA.",
    isCurrent: false,
  }
];

// Timeline Node Component
function TimelineNode({ index, isCurrent }: { index: number; isCurrent: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ 
        scale: 1, 
        opacity: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* All markers use identical golden pulsing glow */}
      <motion.div 
        className="w-4 h-4 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%)',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.9)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.3)',
            '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4), 0 0 90px rgba(212, 175, 55, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.4)',
            '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.3)'
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.2
        }}
      />
    </motion.div>
  );
}

// Connection Line Component
function ConnectionLine({ index, isLeft }: { index: number; isLeft: boolean }) {
  return (
    <motion.div
      className={`absolute top-2 h-px bg-gradient-to-r ${
        isLeft 
          ? 'from-white/20 to-transparent right-1/2 mr-2' 
          : 'from-transparent to-white/20 left-1/2 ml-2'
      }`}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 48, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: easings.luxury,
        delay: index * 0.15 + 0.3
      }}
    />
  );
}

// Project Card Component
interface ProjectCardProps {
  project: ProjectData;
  index: number;
  isLeft?: boolean;
}

function ProjectCard({ project, index, isLeft = false }: ProjectCardProps) {
  // Slide from the outer edge toward center - smoother, shorter distance
  const slideDirection = isLeft ? -30 : 30;
  
  return (
    <motion.div
      className="relative p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-black/50 group"
      initial={{ 
        opacity: 0, 
        x: slideDirection
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0
      }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.8 
      }}
      whileHover={{ 
        y: -4,
        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.1)'
      }}
    >
      {/* Project Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 relative">
          <Building2 className="h-5 w-5 text-white/40 flex-shrink-0 mt-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-white mb-1 truncate">
            {project.title}
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs text-white/50">{project.duration}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">
              {project.projectType?.split(' | ')[0] || 'Project'}
            </span>
          </div>
        </div>
      </div>

      {/* Project Role */}
      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="h-3.5 w-3.5 text-white/40" />
        <span className="text-sm font-medium text-white/90">{project.role}</span>
      </div>

      {/* Project Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-4">
        {project.summary}
      </p>

      {/* Key Achievements */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-[#d4af37]/80 uppercase tracking-[0.1em] mb-2">
          Key Achievements
        </div>
        {project.achievements?.slice(0, 3).map((achievement: string, idx: number) => (
          <motion.div 
            key={idx} 
            className="flex items-start gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15 + idx * 0.1
            }}
          >
            <motion.div 
              className="w-1 h-1 rounded-full bg-[#3b82f6] mt-1.5 flex-shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + idx * 0.1 }}
            />
            <span className="text-xs text-white/50 leading-relaxed">{achievement}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Company Card Component
interface CompanyCardProps {
  exp: typeof experiences[0];
  index: number;
}

function CompanyCard({ exp, index }: CompanyCardProps) {
  return (
    <motion.div
      className="relative p-5 sm:p-6 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-white/10 hover:bg-black/50 group"
      style={{
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: easings.luxury,
        delay: index * 0.1
      }}
      whileHover={{ y: -0.5 }}
    >
      {/* Current Badge */}
      {exp.isCurrent && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#d4af37]/10 border-[#d4af37]/30">
          <span className="text-xs font-medium text-[#d4af37] uppercase tracking-wider">Current</span>
        </div>
      )}

      {/* Company Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative w-10 h-10 flex-shrink-0 mt-0.5">
          {companyLogos[exp.company] ? (
            <Image
              src={companyLogos[exp.company]}
              alt={`${exp.company} logo`}
              fill
              className="object-contain rounded-sm"
              sizes="40px"
            />
          ) : (
            <Building2 className="h-5 w-5 text-white/40 flex-shrink-0 mt-0.5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
            {exp.company}
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#d4af37]" />
              <span className="text-sm font-medium text-[#d4af37]">
                {exp.period}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-white/40" />
              <span className="text-sm font-medium text-white/90">{exp.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Description */}
      <p className="text-sm text-white/50 leading-relaxed">
        {exp.description}
      </p>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
            Career Journey
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Central Timeline Line with Progress */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px h-full">
            {/* Background Line */}
            <div className="absolute inset-0 bg-white/5" />
            
            {/* Animated Progress Line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-transparent via-white/20 to-white/30"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easings.smooth }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const hasProjects = companyProjects[exp.company] && companyProjects[exp.company].length > 0;

              return (
                <motion.div
                  key={exp.id}
                  className="relative"
                  variants={staggerItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Timeline Node */}
                  <TimelineNode 
                    index={index} 
                    isCurrent={exp.isCurrent || false} 
                  />

                  {/* Connection Line */}
                  <ConnectionLine index={index} isLeft={isLeft} />

                  {/* Content Area - Side-by-Side Grid Layout */}
                  <div className="relative">
                    {/* Company Card and Projects - Side by Side */}
                    <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Left Side */}
                      <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pl-8' : 'lg:pr-8'}`}>
                        <CompanyCard exp={exp} index={index} />
                      </div>
                      
                      {/* Right Side - Projects (vertically centered) */}
                      {hasProjects ? (
                        <motion.div 
                          className={`w-full lg:w-1/2 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="space-y-3">
                            {companyProjects[exp.company].map((project, projectIndex) => (
                              <ProjectCard 
                                key={project.id}
                                project={project} 
                                index={projectIndex}
                                isLeft={isLeft}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        /* Empty spacer for alignment when no projects */
                        <div className="hidden lg:block w-1/2" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}