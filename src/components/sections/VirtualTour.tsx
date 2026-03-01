"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useInView as useInViewRIO } from "react-intersection-observer";
import { Compass, Expand, Minimize, Eye, RotateCcw, Navigation, View, Play, Power, X, Move } from "lucide-react";

/* ── BG images for this section ─────────────────────── */
const bgSlides = [
  { src: "/pavilionmainview.jpeg", label: "Pavilion Square — Aerial Overview" },
  { src: "/page_4_img_2.jpeg", label: "Exterior Architecture" },
  { src: "/page_5_img_2.jpeg", label: "Tower Elevation" },
  { src: "/page_8_img_1.jpeg", label: "Sky Level Views" },
  { src: "/page_18_img_1.jpeg", label: "Grand Entrance" },
];

/* ── Features ────────────────────────────────────────── */
const features = [
  { icon: Compass, title: "360° Panoramic", desc: "Navigate every angle of Pavilion Square in full 360°" },
  { icon: Eye, title: "True-to-Life View", desc: "Photorealistic renders of every level and unit type" },
  { icon: Navigation, title: "Guided Tour", desc: "Move through the building floor-by-floor interactively" },
];

export default function VirtualTour() {
  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [expandedStarted, setExpandedStarted] = useState(false);
  const [expandedIframeLoaded, setExpandedIframeLoaded] = useState(false);

  const { ref: iframeRef } = useInViewRIO({ triggerOnce: true, threshold: 0.2 });
  const { ref: sectionVisRef, inView: sectionVisible } = useInViewRIO({ threshold: 0.05 });

  /* Auto-advance bg */
  useEffect(() => {
    if (paused || isExpanded) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % bgSlides.length), 5500);
    return () => clearInterval(t);
  }, [paused, isExpanded]);

  const goTo = (i: number) => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 9000); };

  /* Reset iframe when scrolling away */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!sectionVisible && iframeLoaded) {
      timeout = setTimeout(() => { setIframeLoaded(false); }, 0);
    }
    return () => clearTimeout(timeout);
  }, [sectionVisible, iframeLoaded]);

  /* ── Full lock when expanded ── */
  useEffect(() => {
    if (isExpanded) {
      // Lock scroll completely
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, [isExpanded]);

  /* Escape key to close */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        closeExpanded();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isExpanded]);

  const openExpanded = useCallback(() => {
    setExpandedStarted(false);
    setExpandedIframeLoaded(false);
    setIsExpanded(true);
  }, []);

  const closeExpanded = useCallback(() => {
    setIsExpanded(false);
    setExpandedStarted(false);
    setExpandedIframeLoaded(false);
  }, []);

  return (
    <section id="virtual-tour" ref={sectionVisRef} className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* BG slider */}
      {bgSlides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <Image src={s.src} alt={s.label} fill sizes="100vw" priority={i === 0} className="object-cover kb-zoom-bg" style={{ filter: "grayscale(30%) brightness(0.5)" }} />
        </motion.div>
      ))}
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/97 via-[#060914]/80 to-[#060914]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/60" />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.8) 1px, transparent 0)", backgroundSize: "48px 48px" }} />

      <div className="relative z-10 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-28 flex flex-col justify-center">

        {/* Header */}
        <div className="mb-6 sm:mb-10 mt-6 sm:mt-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <View className="w-3 h-3" />
            Immersive 360° Experience
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-7xl lg:text-[90px] leading-[1.1] font-heading font-black text-white drop-shadow-2xl tracking-tight"
          >
            Virtual{" "}
            <em className="relative inline-block" style={{ fontStyle: "normal" }}>
              <span
                className="relative z-10 animate-shine inline-block"
                style={{
                  WebkitTextFillColor: "transparent",
                  background: "linear-gradient(90deg, #c9a84c, #ffd700, #fff, #ffd700, #c9a84c)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text"
                }}
              >
                Tour
              </span>
              <span className="absolute inset-0 z-0 blur-[40px] opacity-40 bg-[#c9a84c] rounded-full scale-150"></span>
            </em>
          </motion.h2>
          <div className="section-divider mt-4" />
        </div>

        <div className="flex-1 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-stretch">

          {/* Left — features + controls */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center gap-4 sm:gap-8"
          >
            <p className="text-white/65 text-sm sm:text-[15px] leading-relaxed">
              Step inside Pavilion Square KL without leaving your home. Our immersive 360° virtual tour lets you explore every floor — from the 118m sky pool to the luxurious residences and corporate suites.
            </p>

            {/* Feature cards */}
            <div className="flex flex-col gap-5 sm:gap-6 mt-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="group flex items-start gap-4 p-3 sm:p-4 rounded-2xl glow-card glow-card-slow cursor-default bg-white/[0.02]"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border border-[#c9a84c]/25 flex items-center justify-center flex-shrink-0 group-hover:border-[#ffd700]/45 group-hover:shadow-[0_0_16px_rgba(255,215,0,0.15)] transition-all duration-300">
                    <f.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                    <div className="text-xs text-white/60 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* BG slide dots */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-semibold">Current View</div>
              <div className="flex gap-2 items-center mb-2">
                {bgSlides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`slider-dot ${i === current ? "active" : "w-2 h-2"}`} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xs text-white/40 italic"
                >
                  {bgSlides[current].label}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right — 360 inline viewer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col justify-center gap-4"
          >
            {/* Inline viewer */}
            <div
              className="relative h-[240px] min-[400px]:h-[300px] sm:h-[400px] lg:h-[420px] w-full p-[2px] sm:p-[3px] rounded-2xl sm:rounded-[32px] shadow-[0_0_40px_rgba(201,168,76,0.2)] hover:shadow-[0_0_70px_rgba(201,168,76,0.4)] bg-[length:200%_auto] animate-shine bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] transition-shadow duration-500"
            >
              <div
                ref={iframeRef}
                className="relative w-full h-full bg-[#060914] rounded-xl sm:rounded-[29px] overflow-hidden"
              >
                {/* Start Overlay (inline) */}
                {!isStarted && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm group cursor-pointer" onClick={() => setIsStarted(true)}>
                    <div className="absolute inset-0 overflow-hidden">
                      <Image src="/pavilionmainview.jpeg" alt="Preview" fill sizes="100vw" className="object-cover opacity-40 scale-105 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => { e.stopPropagation(); setIsStarted(true); }}
                      className="relative z-30 flex items-center gap-2.5 sm:gap-4 px-4 py-2.5 sm:px-10 sm:py-5 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine rounded-full shadow-[0_0_40px_rgba(196,162,101,0.5)] hover:shadow-[0_0_60px_rgba(196,162,101,0.8)] transition-all duration-500"
                    >
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                      </div>
                      <span className="text-[#0e0c12] font-heading font-bold uppercase tracking-widest text-[11px] sm:text-base">Start Virtual Tour</span>
                    </motion.button>
                    <div className="relative z-30 mt-4 sm:mt-6 text-white/50 text-[10px] sm:text-sm tracking-widest uppercase">Click to Explore 360° View</div>
                  </div>
                )}

                {/* Loading skeleton (inline) */}
                {isStarted && !iframeLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#141218] to-[#0e0c12] flex flex-col items-center justify-center gap-4 z-10">
                    <div className="w-16 h-16 rounded-2xl bg-[#c9a84c]/15 border border-[#c9a84c]/25 flex items-center justify-center">
                      <RotateCcw className="w-8 h-8 text-[#c9a84c] animate-spin" style={{ animationDuration: "2s" }} />
                    </div>
                    <div className="text-sm text-white/50">Loading 360° Tour...</div>
                    <div className="w-48 h-1 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#ffd700] shimmer-bar rounded-full" />
                    </div>
                  </div>
                )}

                {isStarted && sectionVisible && (
                  <iframe
                    src="/pano-viewer.html"
                    className="w-full h-full border-0 pointer-events-none sm:pointer-events-auto"
                    allow="fullscreen; vr; xr"
                    onLoad={() => setIframeLoaded(true)}
                    title="Pavilion Square 360° Virtual Tour"
                  />
                )}

                {/* Overlay controls */}
                <div className="absolute top-4 right-4 flex gap-2.5 z-50">
                  <AnimatePresence>
                    {isStarted && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => { e.stopPropagation(); setIsStarted(false); setIframeLoaded(false); }}
                        className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 group shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                        title="Stop Tour"
                      >
                        <Power className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={(e) => { e.stopPropagation(); openExpanded(); }}
                    className="w-10 h-10 rounded-xl bg-[#060914]/60 hover:bg-[#c9a84c]/20 border border-white/10 hover:border-[#c9a84c]/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                    title="Fullscreen 360° View"
                  >
                    <Expand className="w-4 h-4 text-white group-hover:text-[#ffd700] transition-colors" />
                  </button>
                </div>

                {/* Tour indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[11px] text-white/60 backdrop-blur-sm bg-[#060914]/50 px-2 py-1 rounded">
                    Live 360° — Drag to Explore
                  </span>
                </div>
              </div>
            </div>

            {/* Hint to expand */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest justify-center"
            >
              <Expand className="w-3 h-3" />
              <span>Click expand for immersive fullscreen 360° experience</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* FULLSCREEN 360° MODAL — hides ALL landing page content              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="vt-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            // Fixed + z-[100000] so it sits above EVERYTHING including navbar, modals, etc.
            className="fixed inset-0 z-[100000] bg-[#060914] flex flex-col"
            // Prevent any click from leaking to the page beneath
            onPointerDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >

            {/* ── Ambient background radial glows ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
              <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c9a84c]/3 blur-[160px]" />
              {/* Dot grid */}
              <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
            </div>

            {/* ── Top bar ── */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b border-[#c9a84c]/15 bg-[#060914]/80 backdrop-blur-md flex-shrink-0">
              {/* Logo / title */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#c9a84c]/25 to-[#c9a84c]/5 border border-[#c9a84c]/30 flex items-center justify-center">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a84c]" />
                </div>
                <div>
                  <div className="text-white font-heading font-bold text-sm sm:text-base tracking-wide">Pavilion Square</div>
                  <div className="text-[#c9a84c]/80 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold">360° Virtual Tour</div>
                </div>
              </div>

              {/* Center live badge */}
              <div className="hidden sm:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold tracking-wider">LIVE 360° VIEW</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Hint */}
                <div className="hidden md:flex items-center gap-1.5 text-white/30 text-xs">
                  <Move className="w-3 h-3" />
                  <span>Drag to look around</span>
                </div>

                {/* Minimize */}
                <button
                  onClick={closeExpanded}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 hover:bg-[#c9a84c]/15 border border-white/10 hover:border-[#c9a84c]/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group hover:shadow-[0_0_14px_rgba(201,168,76,0.2)]"
                  title="Minimize (Esc)"
                >
                  <Minimize className="w-4 h-4 text-white/60 group-hover:text-[#ffd700] transition-colors" />
                </button>

                {/* Close */}
                <button
                  onClick={closeExpanded}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/10 hover:bg-red-500/25 border border-red-500/25 hover:border-red-400/60 backdrop-blur-md flex items-center justify-center transition-all duration-300 group shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4 text-red-400/80 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* ── Main 360° viewer area ── */}
            <div className="relative flex-1 flex items-center justify-center p-3 sm:p-5 lg:p-6">

              {/* Golden border wrapper */}
              <div className="relative w-full h-full p-[2px] sm:p-[3px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine shadow-[0_0_80px_rgba(201,168,76,0.35)]">
                <div className="relative w-full h-full rounded-xl sm:rounded-[calc(1.5rem-3px)] overflow-hidden bg-[#060914]">

                  {/* ── Start overlay for expanded mode ── */}
                  {!expandedStarted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center"
                    >
                      {/* Blurred bg preview */}
                      <div className="absolute inset-0">
                        <Image src="/pavilionmainview.jpeg" alt="Preview" fill sizes="100vw" className="object-cover opacity-30 scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/70 to-[#060914]/50 backdrop-blur-sm" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 px-6 text-center max-w-lg">
                        {/* Icon ring */}
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 border-2 border-[#c9a84c]/30 flex items-center justify-center shadow-[0_0_60px_rgba(201,168,76,0.3)]">
                            <Compass className="w-10 h-10 sm:w-14 sm:h-14 text-[#c9a84c]" />
                          </div>
                          {/* Orbiting ring */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-dashed border-[#c9a84c]/20"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                            className="absolute -inset-3 rounded-full border border-dashed border-[#c9a84c]/10"
                          />
                        </div>

                        <div>
                          <h3 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight mb-2">
                            Immersive{" "}
                            <span
                              className="animate-shine inline-block"
                              style={{
                                WebkitTextFillColor: "transparent",
                                background: "linear-gradient(90deg, #c9a84c, #ffd700, #fff, #ffd700, #c9a84c)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text"
                              }}
                            >
                              360° Tour
                            </span>
                          </h3>
                          <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                            Drag to look around in every direction. Pinch to zoom on mobile.
                          </p>
                        </div>

                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 justify-center">
                          {["360° Panoramic", "Drag & Explore", "Full Immersion"].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full text-[10px] sm:text-xs border border-[#c9a84c]/25 text-[#c9a84c]/80 bg-[#c9a84c]/5 tracking-widest uppercase font-semibold">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setExpandedStarted(true); setExpandedIframeLoaded(false); }}
                          className="flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] bg-[length:200%_auto] animate-shine rounded-2xl shadow-[0_0_50px_rgba(196,162,101,0.5)] hover:shadow-[0_0_80px_rgba(196,162,101,0.8)] transition-shadow duration-500 font-heading font-bold uppercase tracking-widest text-[#0e0c12] text-sm sm:text-base"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/20 flex items-center justify-center border border-white/20">
                            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                          </div>
                          Enter 360° View
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Loading skeleton (expanded) */}
                  {expandedStarted && !expandedIframeLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#141218] to-[#0e0c12] flex flex-col items-center justify-center gap-5 z-20">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-[#c9a84c]/15 border border-[#c9a84c]/20 flex items-center justify-center">
                          <RotateCcw className="w-10 h-10 text-[#c9a84c] animate-spin" style={{ animationDuration: "2s" }} />
                        </div>
                      </div>
                      <div className="text-base text-white/50 font-medium">Initialising 360° Environment...</div>
                      <div className="w-56 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#ffd700] shimmer-bar rounded-full" />
                      </div>
                      <div className="text-xs text-white/25 uppercase tracking-widest">Pavilion Square KL</div>
                    </div>
                  )}

                  {/* The actual 360 iframe — fills entire viewer, pointer events fully enabled */}
                  {expandedStarted && (
                    <iframe
                      src="/pano-viewer.html"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ pointerEvents: "all" }}
                      allow="fullscreen; vr; xr"
                      onLoad={() => setExpandedIframeLoaded(true)}
                      title="Pavilion Square 360° Virtual Tour — Fullscreen"
                    />
                  )}

                </div>
              </div>
            </div>

            {/* ── Bottom status bar ── */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3 border-t border-[#c9a84c]/10 bg-[#060914]/70 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="sm:hidden flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[9px] font-semibold tracking-wider">LIVE 360°</span>
                </div>
                <span className="hidden sm:block text-white/30 text-xs">Pavilion Square KL — Interactive Virtual Tour</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/25 text-[10px] sm:text-xs">
                <span className="hidden sm:inline">Press</span>
                <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-white/40 text-[9px] sm:text-[10px] font-mono">Esc</kbd>
                <span>to exit</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
