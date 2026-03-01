"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Location", href: "#location" },
  { label: "Units", href: "#units" },
  { label: "Facilities", href: "#facilities" },
  { label: "360° Tour", href: "#virtual-tour" },
  { label: "Concierge", href: "#concierge" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    // Optimize observer: Only trigger when a section crosses the middle of the screen
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    };

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // Add a tiny delay to prevent rapid flickering during fast scrolls
          setTimeout(() => setActiveSection(sectionId), 50);
        }
      }, observerOptions);

      observer.observe(el);
      observers.push(observer);
    });

    // Extremely lightweight scroll check for top/bottom edge cases, throttled via rAF
    let scrollTicking = false;
    const handleScrollExtras = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 100) setActiveSection("hero");
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            setActiveSection(sections[sections.length - 1]);
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    window.addEventListener("scroll", handleScrollExtras, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScrollExtras);
    };
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? "bg-[#0e0c14]/80 backdrop-blur-2xl border-b border-white/5 py-3 sm:py-4 shadow-2xl shadow-black/20"
          : "bg-transparent py-4 sm:py-6"
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-14 sm:h-16 md:h-20">
          {/* Logo (Left) */}
          <div className="flex justify-start">
            <Link href="#hero" className="flex items-center gap-4 group relative z-50">
              <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 border border-gold/30 rotate-45 transition-transform duration-700 group-hover:rotate-[225deg] group-hover:border-gold" />
                <div className="absolute inset-0 border border-white/10 rotate-45 scale-90" />
                <span className="text-gold font-heading font-bold text-xl relative z-10 transition-transform duration-500 group-hover:scale-110">P</span>
              </div>
              <div className="hidden min-[380px]:block">
                <div className="text-sm sm:text-base font-heading font-bold text-white tracking-[0.2em] group-hover:text-gold transition-colors duration-500">PAVILION</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/50 group-hover:text-white/70 transition-colors duration-500">Square KL</div>
              </div>
            </Link>
          </div>

          {/* Desktop Links (Center) */}
          <div className="hidden lg:flex justify-center">
            <div className="flex items-center gap-1 bg-[#0e0c14]/30 rounded-full px-2 py-2 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/20">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                const isHovered = hoveredIndex === i;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveSection(link.href.replace("#", ""))}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-500"
                  >
                    {/* Floating Pill Background for Active/Hover State */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gold rounded-full z-0 shadow-[0_0_20px_rgba(196,162,101,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {/* Subtle Hover Pill if not active */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="nav-hover"
                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Text Content */}
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-dark-bg font-extrabold" : "text-white/90"}`}>
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA + Mobile Toggle (Right) */}
          <div className="flex justify-end items-center gap-4">
            <a
              href="https://wa.link/9ckvr8"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex relative group overflow-hidden rounded-full shadow-[0_4px_15px_rgba(196,162,101,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(196,162,101,0.5)] hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine" />
              <div className="relative px-8 py-4 sm:px-10 sm:py-4.5 flex items-center gap-2.5 text-dark-bg transition-colors duration-300 text-[11px] uppercase tracking-[0.2em] font-bold">
                {/* Custom WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-dark-bg transition-transform group-hover:scale-110"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span>Register Now</span>
              </div>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-[#c9a84c] border border-[#c9a84c]/40 rounded-full hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(201,168,76,0.5)] bg-gradient-to-br from-[#0e0c12]/90 to-[#1a1721]/90 backdrop-blur-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 drop-shadow-[0_0_8px_rgba(201,168,76,1)]" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] bg-[#0e0c14]/40 backdrop-blur-[24px] flex items-center justify-center -m-4"
          >
            <motion.div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 30 }}
                  className={`text-2xl sm:text-3xl font-heading font-light tracking-wider hover:text-[#ffd700] transition-all duration-500 ${activeSection === link.href.replace("#", "") ? "text-[#ffd700] scale-110 font-bold" : "text-white/50"
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-8">
                <a
                  href="https://wa.link/9ckvr8"
                  target="_blank"
                  className="relative group inline-flex overflow-hidden items-center gap-2.5 px-10 py-4.5 rounded-full shadow-[0_4px_25px_rgba(196,162,101,0.4)] transition-all duration-300 active:scale-95"
                >
                  <div className="absolute inset-0 bg-[#25D366] opacity-0 group-active:opacity-20 transition-opacity duration-300 z-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine z-0" />
                  <span className="relative z-10 flex items-center gap-3 text-dark-bg text-sm uppercase tracking-widest font-extrabold drop-shadow-sm">
                    {/* Custom WhatsApp Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-dark-bg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    Register Now
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
