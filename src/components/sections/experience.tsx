"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { easings, staggerItem } from "@/lib/animations";
import { Building2, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";

// Logo mapping for companies
const companyLogos: Record<string, string> = {
  "CSL Seqirus": "/logos/csl.jpeg",
  "Life-Space Group": "/logos/life_space_group.jpg", 
  "Australian Pharmaceutical Manufacturers (Pact Group Holdings Ltd)": "/logos/apm1.jpg",
  "Glass Expansion": "/logos/glass%20expansion.jpg",
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
  "Professional development": [
    {
      id: "skills-catalog-governance",
      title: "skills-catalog-governance",
      role: "Personal project",
      duration: "Jan 2026 - Present",
      industry: "AI Systems Governance",
      projectType: "Python CLI | Open Source",
      summary: "An MIT-licensed Python tool for governing AI-agent skills.",
      achievements: [
        "Benchmarked across a 211-skill corpus",
        "All 36 benchmark cells passed"
      ]
    },
    {
      id: "careerai-submitpro",
      title: "careerai-submitpro",
      role: "Personal project",
      duration: "Jan 2026 - Present",
      industry: "Career Automation",
      projectType: "Job-Search Application",
      summary: "A job-search application with multi-source role aggregation and a manual confirmation step before submission.",
      achievements: [
        "Aggregates roles from several sources",
        "Waits for manual confirmation before submitting"
      ]
    },
    {
      id: "voice-research-agents",
      title: "voice_research_agents",
      role: "Personal project",
      duration: "Jan 2026 - Present",
      industry: "Real-Time Voice Systems",
      projectType: "Voice Research Assistant",
      summary: "A real-time voice research assistant with background web-research delegation.",
      achievements: [
        "Delegates web research to run in the background"
      ]
    }
  ],
  "CSL Seqirus": [
    {
      id: "banksia",
      title: "Project Banksia",
      role: "Process Engineer, Technology Transfer",
      duration: "4 years",
      industry: "Biopharmaceutical Manufacturing",
      projectType: "Greenfield GMP Facility | Vaccine Manufacturing",
      summary: "Large-scale capital program to establish GMP-compliant vaccine manufacturing capability supporting seasonal and pandemic supply.",
      achievements: [
        "Transferred flu cell culture and antivenom product processes",
        "Enabled first-time GMP manufacturing at receiving site",
        "Reduced operational and regulatory risk during initial commercial campaigns"
      ]
    }
  ],
  "Life-Space Group": [
    {
      id: "tga-lines",
      title: "Tablet and Sachet Production Lines",
      role: "Project Engineer, Commissioning and Qualification",
      duration: "1 year",
      industry: "Pharmaceutical Manufacturing",
      projectType: "Tablet Manufacturing & Sachet Packing Lines",
      summary: "Commissioning and qualification for two tablet and sachet production lines as part of an approximately AUD 20M capital project.",
      achievements: [
        "Commissioned and qualified two production lines",
        "The site received TGA approval at its first audit with zero major findings"
      ]
    }
  ],
  "Australian Pharmaceutical Manufacturers (Pact Group Holdings Ltd)": [
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
  "Glass Expansion": [
    {
      id: "laser-manufacturing",
      title: "Laser Processing Development",
      role: "Laser Technician",
      duration: "1+ year",
      industry: "Precision Manufacturing",
      projectType: "Laser Processing | Continuous Improvement",
      summary: "Laser processing of carbon materials previously considered unfeasible.",
      achievements: [
        "Enabled laser processing of carbon materials previously considered unfeasible",
        "Significantly reduced scrap and rejection rates"
      ]
    }
  ],
  "SKF Australia Pty Ltd": [
    {
      id: "bearing-design",
      title: "Industrial Bearing Design",
      role: "Mechanical Draftsperson",
      duration: "~1 year",
      industry: "Heavy Industry | Mining | Oil & Gas",
      projectType: "Mechanical Design | Reliability Engineering",
      summary: "Design of large-scale bearing systems for global industrial clients.",
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
      summary: "Designing a magnetic bearing spindle for CNC machines.",
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

interface ExperienceRole {
  title: string;
  period: string;
  paragraphs: string[];
}

interface ExperienceEntry {
  id: string;
  company: string;
  role?: string;
  period: string;
  description?: string | string[];
  roles?: ExperienceRole[];
  isCurrent: boolean;
}

const experiences: ExperienceEntry[] = [
  {
    id: "career-break",
    company: "Professional development",
    role: "Career break",
    period: "Jan 2026 - Present",
    description: [
      "Planned career break focused on structured upskilling and independent software development. I completed CS50's Introduction to Programming with Python (CS50P) during this period.",
      "I created skills-catalog-governance, an MIT-licensed Python tool for governing AI-agent skills. It was tested across a 211-skill corpus, with all 36 benchmark cells passing. I also built careerai-submitpro, a job-search application with multi-source role aggregation and a manual confirmation step before submission, and voice_research_agents, a real-time voice research assistant with background web-research delegation.",
    ],
    isCurrent: true,
  },
  {
    id: "csl-seqirus",
    company: "CSL Seqirus",
    role: "MS&T Process Engineer (Technology Transfer Lead)",
    period: "Jul 2022 - Dec 2025",
    description: [
      "I owned MS&T technology-transfer deliverables for cell-culture influenza vaccine and antivenom processes on Project Banksia, an AUD 800M capital program. I prepared technology-transfer packages and facility-fit assessments, delivered process characterisation studies and MS&T engineering batches, and coordinated work across Operations, Quality, Validation, Engineering, Automation and Supply Chain.",
      "I led HAZOP studies and managed process and facility change control. Technology-transfer packages included FMEA, QRA and Process Risk and Gap Analysis (PRAGA). I reviewed and approved dozens of IQ/OQ/PQ protocols and carried out qualification and commissioning activities. At peak, I coordinated 10 to 30 specialist maintenance contractors.",
      "I authored and reviewed process flow diagrams, P&IDs, user requirement specifications and functional design specifications, and completed process calculations, equipment sizing and specifications. I also provided MS&T support during Validation-led PPQ batches.",
    ],
    isCurrent: false,
  },
  {
    id: "life-space",
    company: "Life-Space Group",
    role: "Project Engineer",
    period: "Nov 2021 - Jul 2022",
    description: [
      "I delivered commissioning and qualification for two tablet and sachet production lines as part of an approximately AUD 20M capital project. I owned a defined AUD 100K to AUD 1M budget for the commissioning and qualification scope, and led equipment commissioning, reliability verification and handover.",
      "I developed documentation and preventive maintenance protocols to support site readiness. The site received TGA approval at its first audit with zero major findings, and the project recorded zero safety incidents. I also gained hands-on experience in granulation and tablet coating.",
    ],
    isCurrent: false,
  },
  {
    id: "apm",
    company: "Australian Pharmaceutical Manufacturers (Pact Group Holdings Ltd)",
    period: "Sep 2018 - Oct 2021",
    roles: [
      {
        title: "Technical Lead",
        period: "Jul 2020 - Oct 2021",
        paragraphs: [
          "I led product development and scale-up projects in complementary-medicine manufacturing, from product trials through commercial production. I developed and scaled tablets, capsules, powders and sachets for clients including Swisse, UltraLife, BioRevive, Bubs Australia and Isagenix.",
          "I line-managed two Technical Scientists and one Senior Production Technician, and coordinated maintenance contractors. I commissioned, qualified and validated tablet compression machines, sachet lines and supporting equipment. I also developed SOPs, trained and assessed operators, and troubleshot production issues and batch deviations.",
          "I used OEE analysis and root-cause investigations to address unplanned downtime and improve production throughput. I defined preventive maintenance intervals, replacement criteria and critical spares for manufacturing equipment. I also prepared cost-per-batch quotations that contributed to more than 20 won contracts.",
        ],
      },
      {
        title: "Technical Scientist",
        period: "Sep 2018 - Jul 2020",
        paragraphs: [
          "I contributed to new product launches from concept through full-scale routine production. I applied OEE analysis to support production operations and equipment reliability improvement.",
        ],
      },
    ],
    isCurrent: false,
  },
  {
    id: "glass-expansions",
    company: "Glass Expansion",
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
function TimelineNode() {
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
  exp: ExperienceEntry;
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
            {!exp.roles && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-white/40" />
                <span className="text-sm font-medium text-white/90">{exp.role}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Description */}
      {exp.roles ? (
        <div className="space-y-5">
          {exp.roles.map((roleEntry) => (
            <div key={roleEntry.title}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-medium text-white/90">{roleEntry.title}</span>
                <span className="text-xs font-medium text-[#d4af37]">{roleEntry.period}</span>
              </div>
              <div className="text-sm text-white/50 leading-relaxed space-y-3">
                {roleEntry.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-white/50 leading-relaxed space-y-3">
          {(Array.isArray(exp.description) ? exp.description : [exp.description]).map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
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
                  <TimelineNode />

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