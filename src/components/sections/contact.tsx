"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { easings } from "@/lib/animations";
import { Mail, Linkedin, Send } from "lucide-react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "mailto:abhilash333naidu@gmail.com";
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: easings.luxury }}
        >
          <span className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#888888]">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ffffff]">
            Let&apos;s Connect
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <FadeUp className="order-2 lg:order-1">
            <motion.form
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.luxury }}
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#888888]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-[#2a2a2a] bg-[#141414] text-[#ffffff] placeholder-[#666666] focus:border-[#3a3a3a] focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#888888]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-[#2a2a2a] bg-[#141414] text-[#ffffff] placeholder-[#666666] focus:border-[#3a3a3a] focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[#888888]">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-[#2a2a2a] bg-[#141414] text-[#ffffff] focus:border-[#3a3a3a] focus:outline-none transition-all duration-300"
                  required
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#888888]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-[#2a2a2a] bg-[#141414] text-[#ffffff] placeholder-[#666666] focus:border-[#3a3a3a] focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="group relative w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ffffff] via-[#888888] to-[#ffffff] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)]"
                style={{ backgroundSize: "200% 200%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                Send Message
              </motion.button>
            </motion.form>
          </FadeUp>

          {/* Right: Direct Contact */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
            {/* Email Card */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] bg-[#141414]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: easings.luxury }}
            >
              <motion.a
                href="mailto:abhilash333naidu@gmail.com"
                className="flex items-center gap-4 transition-colors duration-300 hover:text-[#ffffff]"
              >
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-[#888888]" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#ffffff] mb-1">
                    Email
                  </h3>
                  <p className="text-sm text-[#666666]">
                    abhilash333naidu@gmail.com
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] bg-[#141414]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: easings.luxury }}
            >
              <motion.a
                href="https://www.linkedin.com/in/abhilashpaspulati/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 transition-colors duration-300 hover:text-[#ffffff]"
              >
                <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 text-[#888888]" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#ffffff] mb-1">
                    LinkedIn
                  </h3>
                  <p className="text-sm text-[#666666]">
                    linkedin.com/in/abhilashpaspulati
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* Response Time */}
            <motion.div
              className="p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] bg-[#141414]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, ease: easings.luxury }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-[#ffffff] mb-3">
                Response Time
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                    I typically respond within 24-48 hours. For urgent matters, feel free to contact me directly via email.
                  </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
