"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

const faqs = [
  {
    id: "who-are-you",
    question: "Who are you and what do you do?",
    answer: "I'm Abhilash Naidu Paspulati, an Engineering Manager and Systems Engineer with 10+ years of experience delivering safety-critical, capital-intensive programs across pharmaceutical manufacturing and regulated industries.",
  },
  {
    id: "background",
    question: "What is your professional background?",
    answer: "My career spans mechanical design, CNC systems, laser process engineering, regulated pharmaceutical manufacturing, technology transfer, validation, and major capital project delivery. Currently leading multi-site technology transfer at CSL Seqirus.",
  },
  {
    id: "industries",
    question: "What industries have you worked in?",
    answer: "I have worked across precision engineering, advanced manufacturing, laser processing, GMP-regulated pharmaceutical manufacturing, and national-significance vaccine production. Experience includes food, mining, oil & gas, and biotech sectors.",
  },
  {
    id: "skills",
    question: "What are your core skills and areas of expertise?",
    answer: "Core skills include systems engineering & requirements management, team leadership & mentoring, major program delivery, regulatory compliance (TGA, FDA, EU), design control & configuration management, and technology transfer & validation lifecycle management.",
  },
  {
    id: "projects",
    question: "What types of projects have you worked on?",
    answer: "Key projects include Project Banksia ($800M cell-culture vaccine facility), TGA audit-ready manufacturing lines with zero major findings, magnetic-bearing spindle design, laser process optimisation, large-scale bearing assemblies, and pharmaceutical systems integration.",
  },
  {
    id: "scale",
    question: "What is the scale and complexity of your past work?",
    answer: "Led $800M+ in capital programs, coordinated 10+ cross-functional teams across engineering, quality, validation, automation, and operations. Delivered end-to-end systems integration from requirements through commissioning and handover.",
  },
  {
    id: "tools",
    question: "What tools and technologies do you use?",
    answer: "Technical tools include CATIA, FEA, FMEA, electromagnetic simulation, CNC programming, PLC fundamentals, and Python (CS50 Harvard). Frameworks include GMP/cGMP compliance, TGA/FDA/EU regulations, and validation lifecycle (IQ/OQ/PQ).",
  },
  {
    id: "achievements",
    question: "What are your most significant achievements?",
    answer: "Led technology transfer for Australia's sovereign cell-culture vaccine manufacturing, achieved TGA licensing with zero major findings for manufacturing lines, designed and validated magnetic-bearing spindle systems, and delivered complex capital programs under tight timelines.",
  },
  {
    id: "leadership",
    question: "Do you have leadership or management experience?",
    answer: "Yes. I have extensive leadership experience managing multi-disciplinary teams, mentoring junior engineers, and leading cross-functional collaboration across engineering, quality, validation, automation, and operations. Led 10+ teams on major capital programs.",
  },
  {
    id: "availability",
    question: "Are you available for new opportunities?",
    answer: "Yes, I am open to new opportunities, particularly in engineering management, systems engineering, capability acquisition, and sustainment roles. Currently positioning my experience toward the Defence sector.",
  },
  {
    id: "certifications",
    question: "Do you have certifications or qualifications?",
    answer: "I hold a Master of Engineering in Manufacturing Engineering from RMIT University and a Bachelor of Technology in Mechanical Engineering from JNTU University. Professional certifications include CATIA, FMEA, and currently completing CS50 (Harvard).",
  },
  {
    id: "contact",
    question: "How can someone contact or engage you?",
    answer: "You can reach me via email at abhilash333naidu@gmail.com, connect on LinkedIn at linkedin.com/in/abhilashpaspulati, or use the contact form on this website. I'm open to discussing opportunities and collaborations.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-[#888888]" />
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-[#888888]">
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            Common Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={staggerItem}
              className="rounded-xl sm:rounded-2xl border border-[#2a2a2a] bg-[#141414] overflow-hidden"
            >
              {/* Question Header */}
              <motion.button
                className="w-full px-4 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 text-left"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "#1a1a1a" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-sm sm:text-base font-medium text-[#ffffff] pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: easings.luxury }}
                >
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#888888] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-[#888888] shrink-0" />
                  )}
                </motion.div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easings.luxury }}
                    className="px-4 pb-4 sm:px-6 sm:pb-6"
                  >
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
