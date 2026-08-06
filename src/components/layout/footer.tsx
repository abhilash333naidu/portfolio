"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations/fade-up";
import { easings } from "@/lib/animations";
import { Linkedin, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/abhilashpaspulati/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:abhilash333naidu@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <FadeUp>
            <div className="flex flex-col items-center md:items-start gap-2">
              <motion.span
                className="text-4xl font-bold text-[#ffffff] tracking-widest"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: easings.luxury }}
              >
                AN
              </motion.span>
              <p className="text-sm text-[#444444]">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </FadeUp>

          {/* Navigation Links */}
          <FadeUp delay={0.1}>
            <nav className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#555555] hover:text-[#ffffff] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </FadeUp>

          {/* Social Links & Back to Top */}
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-[#555555] hover:text-[#ffffff] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-[#555555] hover:text-[#ffffff] transition-colors duration-300"
                aria-label="Back to top"
              >
                <ArrowUp className="h-5 w-5" />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </div>
    </footer>
  );
}
