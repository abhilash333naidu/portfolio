"use client";

import { CursorFlare } from "@/components/cursor-flare";
import { motion } from "framer-motion";
import Link from "next/link";

// Test page for cursor flare effect
export default function CursorFlareTest() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Cursor Flare Effect */}
      <CursorFlare />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-8 py-6">
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent">
            Cursor Flare Demo
          </h1>
          <p className="text-xl text-white/60 mb-12">
            A stunning multi-layered cursor effect with gold accents that complements the portfolio theme.
          </p>

          {/* Interactive Elements */}
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold rounded-full"
            >
              Hover Me
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/5"
            >
              Another Button
            </motion.button>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border border-[#d4af37]/30 text-[#d4af37] font-medium rounded-full hover:bg-[#d4af37]/10"
            >
              Interactive Link
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="min-h-screen flex items-center justify-center px-8 py-24">
        <div className="max-w-6xl w-full grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Multi-Layer Design",
              description: "Five distinct layers create depth - ambient glow, trail, core, bright center, and sparkle ring."
            },
            {
              title: "Spring Physics",
              description: "Each layer uses different spring configurations for natural, organic movement."
            },
            {
              title: "Hover Effects",
              description: "Scales up and shows an animated ring when hovering over interactive elements."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
              data-interactive="true"
            >
              <h3 className="text-lg font-semibold text-[#d4af37] mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">
          Move your cursor around to see the effect in action
        </p>
      </footer>
    </div>
  );
}
