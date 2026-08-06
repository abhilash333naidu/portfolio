import Link from "next/link";
import { projects } from "@/data/projects";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { easings } from "@/lib/animations";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#ffffff] mb-4">Project Not Found</h1>
          <Link href="/" className="text-[#888888] hover:text-[#ffffff]">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-[#0a0a0a]">
        {/* Back Button */}
        <motion.div
          className="relative z-10 py-8 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.luxury }}
        >
          <Link href="/"
            className="inline-flex items-center gap-2 text-[#888888] hover:text-[#ffffff] transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Hero */}
        <div className="relative min-h-[50vh]">
          <div className="absolute inset-0">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: easings.luxury }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Title & Info */}
              <div>
                <FadeUp>
                  <span className="mb-4 inline-block px-3 py-1 text-sm font-medium uppercase tracking-wider bg-[#0a0a0a] border border-[#2a2a2a] text-[#888888]">
                    {project.category}
                  </span>
                </FadeUp>

                <TextReveal
                  text={project.title}
                  className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#ffffff]"
                  delay={0.2}
                />

                <FadeUp delay={0.4}>
                  <p className="text-lg text-[#a0a0a0] leading-relaxed">
                    {project.description}
                  </p>
                </FadeUp>

                {/* Tags */}
                <FadeUp delay={0.6} className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-[#888888] bg-[#141414] border border-[#2a2a2a]"
                    >
                      {tag}
                    </span>
                  ))}
                </FadeUp>

                {/* Action Buttons */}
                <FadeUp delay={0.8} className="flex flex-wrap gap-4 mt-8">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffffff] text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,255,255,0.1)]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Site
                    </motion.a>
                  )}

                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2a2a2a] bg-transparent text-[#ffffff] transition-all duration-300 hover:bg-[#141414]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </motion.a>
                  )}

                  <Link href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2a2a2a] bg-transparent text-[#ffffff] transition-all duration-300 hover:bg-[#141414]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    All Projects
                  </Link>
                </FadeUp>
              </div>
            </div>

            {/* Right: Highlights */}
            <div className="lg:col-span-1">
              <FadeUp delay={0.3}>
                <h2 className="text-2xl font-semibold text-[#ffffff] mb-6">
                  Key Highlights
                </h2>
              </FadeUp>

              <ul className="space-y-4">
                {project.highlights?.map((highlight, index) => (
                  <FadeUp key={index} delay={0.4 + index * 0.1}>
                    <li className="flex gap-3 text-[#666666]">
                      <motion.span
                        className="flex-shrink-0 h-2 w-2 mt-2.5 text-[#888888]"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.3, ease: easings.luxury }}
                      >
                        →
                      </motion.span>
                      <span>{highlight}</span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
