import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "submitpro",
    title: "CareerAI SubmitPro - AI Orchestration Suite",
    description: "An enterprise-grade career automation monorepo designed for high-assurance job application workflows. Features a multi-source parallel scraper, semantic scoring engine, and human-in-the-loop (HITL) visual verification pipeline.",
    category: "AI & Full-Stack Engineering",
    tags: ["React 19", "Express", "Playwright", "Gemini AI", "SSE Streaming", "Systems Integration", "Automation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    size: "featured",
    accent: true,
    link: "https://github.com/abhilash333naidu/careerai-submitpro",
    github: "https://github.com/abhilash333naidu/careerai-submitpro",
    highlights: [
      "Architected a failure-tolerant scraper orchestrator processing 7+ streams (Seek, LinkedIn, etc.) in parallel",
      "Engineered a real-time SSE (Server-Sent Events) feedback loop for live AI-driven tailoring",
      "Developed a precision document rendering engine using Tailwind-styled HTML and Playwright",
      "Implemented multi-model fallback strategies (Zen/Kilo) for 99.9% AI availability",
      "Strict data isolation and zero-leak security protocols for PII protection"
    ]
  },
  {
    id: "resumeapp",
    title: "ResumeCreatorApp - Flutter Mobile/Web",
    description: "A cross-platform professional document builder focused on dynamic PDF/LaTeX rendering and offline-first performance. Leverages SQLite for robust local state persistence and a modular template system.",
    category: "Mobile Development",
    tags: ["Flutter", "Dart", "SQLite", "PDF Generation", "LaTeX", "Cross-Platform"],
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    size: "large",
    link: "https://github.com/abhilash333naidu/resumecreatorapp",
    github: "https://github.com/abhilash333naidu/resumecreatorapp",
    highlights: [
      "Built a modular multi-template resume engine with real-time preview and auto-save",
      "Engineered an offline-first state management architecture using SQLite and Provider",
      "Developed a custom LaTeX-to-PDF rendering pipeline for pixel-perfect documents",
      "Designed a responsive UI following modern Material 3 and Apple HIG standards",
      "Full lifecycle management from CI/CD to App Store submission readiness"
    ]
  },
  {
    id: "1",
    title: "Project Banksia - Cell-Culture Vaccine Facility",
    description: "A landmark $800M national capital program delivering Australia's sovereign cell-based influenza vaccine and antivenom manufacturing capability. Led multi-site technology transfer and systems integration for critical vaccine platforms.",
    category: "Pharmaceutical Manufacturing",
    tags: ["Technology Transfer", "GMP", "Systems Integration", "IQ/OQ/PQ", "TGA/FDA", "Cell Culture", "Capital Projects"],
    image: "https://images.unsplash.com/photo-1584362917165-526a968576cf?w=800&h=600&fit=crop",
    size: "featured",
    accent: true,
    link: "#",
    github: undefined,
    highlights: [
      "Coordinated 10+ cross-functional teams across engineering, quality, validation, automation, and operations",
      "Led global-to-local technology transfer from Holly Springs (US) to Melbourne receiving site",
      "Defined QTPP, CQAs, CPPs, and validation strategy for cell-culture vaccine manufacturing",
      "Supported IQ/OQ/PQ execution and operational readiness for regulatory compliance",
      "One of Australia's most significant sovereign manufacturing investments"
    ]
  },
  {
    id: "2",
    title: "TGA Audit-Ready Manufacturing Lines",
    description: "Led commissioning and validation of tablet manufacturing and sachet packaging production lines, achieving TGA licensing with zero major findings through disciplined project control and rigorous quality systems.",
    category: "Commissioning & Validation",
    tags: ["TGA Audit", "Commissioning", "Validation", "GMP", "Tablet Manufacturing", "Sachet Packaging", "IQ/OQ"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
    size: "large",
    link: "#",
    github: undefined,
    highlights: [
      "Full project lifecycle ownership: design, equipment selection, installation, commissioning, validation",
      "Acted as TGA audit lead and technical presenter for owned production lines",
      "Achieved licensing with zero major findings for tablet and sachet lines",
      "Delivered projects under aggressive timelines through disciplined stakeholder coordination",
      "Authored VMP, IQ/OQ packages, batch records, and training matrices"
    ]
  },
  {
    id: "3",
    title: "Magnetic-Bearing Spindle System",
    description: "Designed and validated a CNC spindle compatible with magnetic bearing architecture, integrating electromagnetic analysis, FEA, and thermal modeling to enable transition to advanced bearing technology while maintaining serviceability.",
    category: "Mechanical Design",
    tags: ["CATIA", "FEA", "Electromagnetic Analysis", "Spindle Design", "CNC Systems", "Magnetic Bearings", "Design for Maintainability"],
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
    size: "medium",
    link: "#",
    github: undefined,
    highlights: [
      "Led complete spindle redesign to support magnetic bearing architecture",
      "Conducted electromagnetic analysis and FEA to validate thermal, structural, and magnetic interactions",
      "Developed manufacturing drawings and technical documentation in CATIA",
      "Reduced expected downtime risk through design-for-maintainability principles",
      "Enabled transition to magnetic bearings while preserving legacy serviceability"
    ]
  },
  {
    id: "4",
    title: "Laser Process Optimisation",
    description: "Implemented DOE-driven laser parameter optimisation for hard carbon materials, enabling new manufacturing capability and achieving measurable reduction in scrap and rejection rates through validated process windows.",
    category: "Advanced Manufacturing",
    tags: ["Laser Programming", "DOE", "Process Optimisation", "Quality Control", "Continuous Improvement", "5S"],
    image: "https://images.unsplash.com/photo-1565465295423-68c959ca3c2e?w=800&h=600&fit=crop",
    size: "wide",
    accent: true,
    link: "#",
    github: undefined,
    highlights: [
      "Programmed and executed laser processes for precision engraving and cutting",
      "Optimised laser parameters for hard carbon materials previously considered unsuitable",
      "Implemented 5S, continuous improvement initiatives, SOPs, and quality checkpoints",
      "Enabled new manufacturing capability through validated laser programs",
      "Reduced scrap and rejection rates through DOE-driven parameter optimisation"
    ]
  },
  {
    id: "5",
    title: "Large-Scale Bearing Assemblies",
    description: "Delivered CAD and technical packages for large bearing systems serving food (Nestlé), oil, and mining sector clients, implementing design improvements for durability, serviceability, and sector-specific compliance.",
    category: "Mechanical Design",
    tags: ["SKF", "Bearing Design", "CATIA", "Maintenance Strategy", "Mining", "Oil & Gas", "Food Industry"],
    image: "https://images.unsplash.com/photo-1616406432452-07bc59317528?w=800&h=600&fit=crop",
    size: "small",
    link: "#",
    github: undefined,
    highlights: [
      "Drafted and designed large bearing assemblies for enterprise-scale projects",
      "Served Nestlé (food), oil, and mining sector clients with compliance-specific solutions",
      "Developed maintenance strategies and implemented design improvements for lifecycle performance",
      "Authored maintenance plans and implemented serviceability-driven design changes"
    ]
  },
  {
    id: "6",
    title: "Pharmaceutical Systems Integration",
    description: "End-to-end systems integration for GMP-compliant pharmaceutical manufacturing, encompassing utility systems (HVAC, WFI, RO), equipment specification, FAT/SAT execution, and regulatory documentation.",
    category: "Systems Engineering",
    tags: ["Systems Integration", "FAT/SAT", "HVAC", "WFI", "RO", "Equipment Qualification", "Vendor Management"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop",
    size: "small",
    link: "#",
    github: undefined,
    highlights: [
      "Managed requirements traceability, design control, and validation processes",
      "Led vendor qualification, FAT/SAT execution, and equipment commissioning",
      "Coordinated multi-site and global stakeholder collaboration on systems integration",
      "Ensured alignment with TGA/FDA/EU regulatory frameworks",
      "Authored SOPs, deviation management, CAPA, and audit-ready documentation"
    ]
  },
];
