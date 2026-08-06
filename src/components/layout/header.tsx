"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";
import { Menu, X } from "lucide-react";

  const navLinks = [
    { href: "/", label: "Home", font: "font-[var(--font-source-sans)]" },
    { href: "/cursor-flare-test", label: "Cursor Flare", font: "font-[var(--font-source-sans)]" },
    { href: "#services", label: "Services", font: "font-[var(--font-source-sans)]" },
    { href: "#about", label: "About", font: "font-[var(--font-source-sans)]" },
    { href: "#projects", label: "Projects", font: "font-[var(--font-source-sans)]" },
    { href: "#process", label: "Process", font: "font-[var(--font-source-sans)]" },
    { href: "#contact", label: "Contact", font: "font-[var(--font-source-sans)]" },
  ];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-4 bg-[#000000]/95 backdrop-blur-xl border-b border-[#1a1a1a]"
            : "py-6 bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easings.luxury, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Desktop Navigation - Centered */}
            <motion.nav 
              className="hidden lg:flex items-center gap-8 border border-white/50 rounded-none px-12 py-1 relative bg-[#0a0a0a] hover:border-white/75 hover:bg-white/7.5 transition-all duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,

              }}
              transition={{ 
                delay: 0.6, 
                duration: 0.6, 
                ease: [0.23, 1, 0.32, 1],

              }}

            >
              {navLinks.map((link, index) => (
                <>
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-0.25 text-base font-medium text-[#666666] hover:text-[#ffffff] transition-all duration-300 ${link.font}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ 
                      transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                    }}
                  >
                    {link.label}
                  </motion.a>
                  {index < navLinks.length - 1 && (
                    <div className="w-px h-4 bg-white/60" />
                  )}
                </>
              ))}
            </motion.nav>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-[#ffffff]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#000000]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute inset-x-0 top-20 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: easings.luxury }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="text-xl font-semibold text-[#ffffff] py-3 border-b border-[#1a1a1a]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
