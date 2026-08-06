"use client";

import { motion } from "framer-motion";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { Briefcase, Calendar, Building2, Award, Target, CheckCircle } from "lucide-react";

const featuredProjects = [
  {
    id: "banksia",
    title: "Project Banksia",
    company: "CSL Seqirus",
    role: "Process Engineer – Technology Transfer",
    duration: "4 years",
    industry: "Biopharmaceutical Manufacturing",
    projectType: "Greenfield GMP Facility | Vaccine Manufacturing",
    summary: "Large-scale capital program to establish GMP-compliant vaccine manufacturing capability supporting seasonal and pandemic supply.",
    scopeAndResponsibilities: [
      "Led end-to-end technology transfer from Parkville and Holly Springs sites",
      "Acted as primary technical authority for transferred processes",
      "Bridged production, quality, validation, and engineering teams",
      "Defined and protected QTTP through control of CPPs and CQAs",
      "Developed and delivered training for production, QA, and validation teams"
    ],
    technicalFocus: [
      "Process mapping and comparability assessments",
      "CPP and CQA identification and control strategies",
      "Batch record alignment and execution readiness",
      "Scale-up and equipment equivalency assessments",
      "Deviation management and risk mitigation during transfer"
    ],
    regulatoryAndQualityImpact: [
      "Supported GMP compliance aligned with TGA and global regulatory expectations",
      "Ensured validated state was maintained during technology transfer",
      "Established compliant documentation frameworks for commercial readiness"
    ],
    achievements: [
      "Successfully transferred flu cell culture and PNS product portfolio",
      "Enabled first-time GMP manufacturing at receiving site",
      "Reduced operational and regulatory risk during initial commercial campaigns",
      "Strengthened cross-site knowledge transfer and process ownership"
    ]
  },
  {
    id: "flu-cell-culture",
    title: "Flu Cell Culture Technology Transfer",
    company: "CSL Seqirus",
    role: "Process Engineer",
    duration: "Concurrent with Project Banksia",
    industry: "Vaccine Manufacturing",
    projectType: "Process Transfer | Seasonal and Pandemic Vaccines",
    summary: "Transfer of flu cell culture manufacturing processes supporting trivalent and quadrivalent vaccine production.",
    scopeAndResponsibilities: [
      "Led technical transfer of flu cell culture process",
      "Ensured alignment of CPPs and CQAs with sending unit",
      "Trained production and quality teams at receiving site",
      "Supported validation and process qualification activities"
    ],
    technicalFocus: [
      "Cell culture process control and monitoring",
      "Process robustness and reproducibility",
      "Critical parameter control strategies",
      "Manufacturing readiness and scale translation"
    ],
    regulatoryAndQualityImpact: [
      "Maintained QTTP across sites",
      "Supported regulatory compliance for pandemic readiness"
    ],
    achievements: [
      "Enabled compliant production of seasonal and pandemic vaccines",
      "Established internal capability for complex cell culture processes",
      "Minimized variability during early production campaigns"
    ]
  },
  {
    id: "tga-lines",
    title: "TGA Manufacturing Lines Establishment",
    company: "Lifespace Group",
    role: "Project Engineer – Line Establishment Lead",
    duration: "1 year",
    industry: "Pharmaceutical Manufacturing",
    projectType: "Tablet Manufacturing & Sachet Packing Lines",
    summary: "Establishment of two major GMP manufacturing lines under aggressive timelines to achieve regulatory approval.",
    scopeAndResponsibilities: [
      "Led establishment of tablet manufacturing and sachet packing lines",
      "Owned project delivery from design through operational readiness",
      "Acted as primary presenter during TGA audits",
      "Coordinated engineering, quality, validation, and operations teams"
    ],
    technicalFocus: [
      "Equipment selection and installation",
      "Process validation and qualification",
      "GMP documentation and audit readiness",
      "Risk identification and mitigation"
    ],
    regulatoryAndQualityImpact: [
      "Directly supported successful TGA audit",
      "Ensured no major audit findings for assigned lines"
    ],
    achievements: [
      "Achieved TGA license approval on first audit",
      "Delivered two GMP-compliant production lines on schedule",
      "Established strong inspection readiness culture across teams"
    ]
  },
  {
    id: "npd-npi",
    title: "NPD & NPI Programs",
    company: "APM",
    role: "Project / Process Engineer",
    duration: "Multiple programs",
    industry: "Pharmaceutical Manufacturing",
    projectType: "New Product Development & New Product Introduction",
    summary: "End-to-end development and commercialization of pharmaceutical products from concept through routine production.",
    scopeAndResponsibilities: [
      "Led technical development of new pharmaceutical products",
      "Planned and executed pilot batches and scale-up activities",
      "Transferred processes into commercial manufacturing",
      "Provided ongoing production support and troubleshooting",
      "Managed resources and cross-functional team alignment"
    ],
    technicalFocus: [
      "Process development and parameter optimization",
      "Pilot-to-commercial scale translation",
      "Manufacturing robustness and process capability",
      "Root cause analysis and continuous improvement"
    ],
    regulatoryAndQualityImpact: [
      "Ensured GMP compliance throughout development lifecycle",
      "Maintained validated state during scale-up and transfer"
    ],
    achievements: [
      "Successfully commercialized multiple pharmaceutical products",
      "Reduced post-launch deviations through strong process design",
      "Improved time-to-market through effective cross-functional coordination"
    ]
  },
  {
    id: "laser-manufacturing",
    title: "Advanced Laser Manufacturing Optimization",
    company: "Glass Expansion",
    role: "Laser Technician",
    duration: "1+ year",
    industry: "Precision Manufacturing",
    projectType: "Process Optimization | Continuous Improvement",
    summary: "Optimization of laser manufacturing processes for difficult-to-machine carbon materials.",
    scopeAndResponsibilities: [
      "Programmed and operated laser manufacturing equipment",
      "Developed new laser programs for carbon material processing",
      "Implemented 5S and continuous improvement initiatives",
      "Created quality control checks to reduce rejections"
    ],
    technicalFocus: [
      "Laser parameter optimization",
      "Process repeatability and stability",
      "Quality control and inspection methods"
    ],
    regulatoryAndQualityImpact: [
      "Improved internal quality standards and consistency"
    ],
    achievements: [
      "Enabled laser cutting and engraving of carbon materials previously considered unfeasible",
      "Significantly reduced scrap and rejection rates",
      "Improved production efficiency and process reliability"
    ]
  },
  {
    id: "bearing-design",
    title: "Industrial Bearing Design & Optimization",
    company: "SKF Group",
    role: "Mechanical Draftsperson",
    duration: "~1 year",
    industry: "Heavy Industry | Mining | Oil & Gas",
    projectType: "Mechanical Design | Reliability Engineering",
    summary: "Design and optimization of large-scale bearing systems for global industrial clients.",
    scopeAndResponsibilities: [
      "Designed and optimized large bearing systems",
      "Developed maintenance and reliability strategies",
      "Supported new design implementations and upgrades",
      "Worked on projects for major mining, oil, and FMCG clients"
    ],
    technicalFocus: [
      "Mechanical design and drafting",
      "Load analysis and failure prevention",
      "Maintenance planning and lifecycle optimization"
    ],
    regulatoryAndQualityImpact: [
      "Ensured designs met industry and client specifications"
    ],
    achievements: [
      "Supported high-reliability applications in critical industrial environments",
      "Improved maintainability and lifecycle performance of bearing systems",
      "Delivered designs aligned with client operational constraints"
    ]
  }
];

interface ProjectCardProps {
  project: typeof featuredProjects[0];
  index: number;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative"
    >
      {/* Timeline Node */}
      <motion.div
        className="absolute left-4 sm:left-8 top-4 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 sm:border-4 border-[#0a0a0a] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"
        whileInView={{ scale: [1, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easings.luxury }}
      >
        <div className="absolute inset-1 sm:inset-2 rounded-full bg-[#ffffff]" />
      </motion.div>

      {/* Content Card */}
      <motion.div
        className="relative p-4 sm:p-5 lg:p-6 rounded-2xl border border-[#2a2a2a] bg-[#141414] transition-all duration-300 hover:border-[#3a3a3a] hover:bg-[#161616] hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)]"
        whileHover={{ x: 5 }}
      >
        {/* Project Header */}
        <div className="mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-0.5">
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] flex items-center justify-center">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-[#ffffff] mb-1">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] font-medium">
                {project.company}
              </p>
            </div>
          </div>

          {/* Project Type Badge */}
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]">
            <span className="text-xs font-medium text-[#888888]">
              {project.projectType}
            </span>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          {/* Duration and Industry */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs font-medium text-[#d4af37]">
                {project.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#888888]" />
              <span className="text-xs text-[#888888]">
                {project.industry}
              </span>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-start gap-3">
            <Briefcase className="h-4 w-4 text-[#a0a0a0] flex-shrink-0 mt-0.5" />
            <h4 className="text-sm font-medium text-[#ffffff]">
              {project.role}
            </h4>
          </div>

          {/* Summary */}
          <p className="text-sm text-[#666666] leading-relaxed">
            {project.summary}
          </p>

          {/* Key Sections */}
          <div className="space-y-3">
            {/* Scope & Responsibilities */}
            {project.scopeAndResponsibilities.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-[#888888] uppercase tracking-[0.1em] mb-2">
                  Scope & Responsibilities
                </h5>
                <ul className="space-y-1">
                  {project.scopeAndResponsibilities.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#a0a0a0]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Focus */}
            {project.technicalFocus.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-[#888888] uppercase tracking-[0.1em] mb-2">
                  Technical Focus
                </h5>
                <div className="flex flex-wrap gap-1">
                  {project.technicalFocus.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="inline-block px-2 py-1 rounded text-xs text-[#ffffff] bg-[#2a2a2a]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {project.achievements.length > 0 && (
              <div>
                <h5 className="text-xs font-semibold text-[#d4af37] uppercase tracking-[0.1em] mb-2">
                  Key Achievements
                </h5>
                <ul className="space-y-1">
                  {project.achievements.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Award className="h-3 w-3 text-[#d4af37] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#a0a0a0]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="relative py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.3em] text-[#888888]">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff] mt-4">
            Featured Projects
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-[#2a2a2a]" />

          {/* Project Items */}
          <motion.div
            className="space-y-6 sm:space-y-8 lg:space-y-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}