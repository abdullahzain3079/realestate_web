"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Gem, MapPin } from "lucide-react";


/* ── Marquee Text Strip ───────────────────────────────── */
function MarqueeStrip() {
  const items = [
    "67 STOREYS", "960 LUXURY UNITS", "118M INFINITY POOL", "SKY WELLNESS",
    "CONCIERGE SERVICES", "LINK BRIDGE TO PAVILION KL", "FREEHOLD", "BUKIT BINTANG",
    "CORPORATE SUITES", "FULLY FURNISHED",
  ];
  return (
    <div className="absolute bottom-[15%] min-[480px]:bottom-[20%] sm:bottom-36 left-0 w-full z-20 overflow-hidden opacity-30 pointer-events-none mix-blend-overlay">
      <div className="marquee-track flex whitespace-nowrap gap-16" style={{ willChange: "transform" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium flex items-center gap-8">
            {item} <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gold/80 shadow-[0_0_10px_rgba(196,162,101,0.5)] inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

/* ── Animated Counter Component ───────────────────────── */
function AnimatedCounter({ from = 0, to, duration = 2, delay = 2 }: { from?: number, to: number, duration?: number, delay?: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    let isDelayed = true;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay * 1000) {
        animationFrame = requestAnimationFrame(updateCount);
        return;
      }

      if (isDelayed) {
        startTime = timestamp;
        isDelayed = false;
      }

      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(from + (to - from) * easeOutExpo);

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, delay]);

  return <span>{count}</span>;
}

/* ── Hero Stats HUD (Compact) ─────────────────────────── */
function HeroStats() {
  const stats = [
    { icon: Building2, label: "Storeys", value: 67, suffix: "" },
    { icon: Gem, label: "Units", value: 960, suffix: "" },
    { icon: MapPin, label: "Location", value: "Bukit Bintang", isString: true },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 2, ease: "easeOut" }}
      className="absolute bottom-[3.5rem] min-[480px]:bottom-[4.5rem] sm:bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-[95%] sm:w-auto max-w-[95vw]"
    >
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-row items-center justify-center sm:flex-row gap-2 min-[480px]:gap-3 sm:gap-8 md:gap-12 bg-[#0e0c14]/90 backdrop-blur-2xl px-3 min-[480px]:px-4 sm:px-10 py-2.5 min-[480px]:py-3 sm:py-5 rounded-[2rem] sm:rounded-full border border-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(196,162,101,0.15)] hover:border-gold/50 transition-all duration-500 w-full overflow-hidden"
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-5 group relative flex-1 sm:flex-none justify-center">
            <div className="relative w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#1a1820] shrink-0 flex items-center justify-center border border-white/5 group-hover:bg-gold/10 transition-all duration-500 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gold/80 group-hover:text-gold transition-colors duration-500 relative z-10" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] min-[380px]:text-sm sm:text-xl font-heading font-black text-white leading-none group-hover:text-gold transition-colors block whitespace-nowrap">
                {stat.isString ? (
                  stat.value
                ) : (
                  <AnimatedCounter to={stat.value as number} duration={2.5} />
                )}
                {stat.suffix}
              </span>
              <span className="text-[7px] min-[380px]:text-[8px] sm:text-[10px] sm:mt-0.5 uppercase tracking-widest sm:tracking-[0.3em] text-white/50 block font-medium whitespace-nowrap">
                {stat.label}
              </span>
            </div>
            {i < stats.length - 1 && <div className="w-px h-6 sm:h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent block ml-1 sm:ml-4 opacity-50 sm:opacity-100" />}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}


/* ── Main Hero Component ──────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-[#0e0f1a]">
      {/* ▸ Layer 0: High-Impact Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Outer motion.div for continuous pan and zoom */}
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%]"
          animate={{
            scale: [1, 1.05, 1.1, 1.05, 1],
            x: ["0%", "-2%", "1%", "-1%", "0%"],
            y: ["0%", "1%", "-2%", "1%", "0%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {/* Inner motion.div for the initial 2s blur reveal */}
          <motion.div
            className="absolute inset-0"
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <Image
              src="/page_3_img_1.jpeg"
              alt="Pavilion Square KL Luxury Development"
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Dynamic lighting and contrast overlays for "wow" effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0f1a]/80 via-transparent to-[#0e0f1a]/90 mix-blend-multiply" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, transparent 20%, rgba(14,15,26,0.85) 100%)`,
          }}
        />

        {/* Subtle animated color dodge overlay for a premium glowing feel */}
        <motion.div
          className="absolute inset-0 bg-[#c9a84c]/10 mix-blend-color-dodge pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>



      {/* Decorative side lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 z-20 hidden xl:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-white/5 z-20 hidden xl:block" />

      {/* ▸ Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:py-20 pointer-events-none">

        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="w-full max-w-7xl px-4 relative z-10 mx-auto text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[6.5vw] min-[380px]:text-[7.5vw] sm:text-5xl md:text-6xl lg:text-[6.5vw] xl:text-[7rem] leading-[0.85] font-heading font-black text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              <span className="drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">PAVILION</span>{" "}
              <span className="inline-block relative">
                {/* Opacity-based glow layer (hardware accelerated) */}
                <motion.span
                  className="absolute inset-0 gold-gradient-text blur-[12px] z-0"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: "opacity" }}
                  aria-hidden="true"
                >
                  SQUARE
                </motion.span>

                {/* Static foreground text with a lightweight text-shadow */}
                <span className="relative z-10 gold-gradient-text drop-shadow-[0_0_15px_rgba(196,162,101,0.5)]">
                  SQUARE
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
              className="mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-14 md:mb-20 text-xs sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.2em] min-[480px]:tracking-[0.3em] sm:tracking-[0.5em] font-extrabold flex items-center justify-center gap-2 min-[480px]:gap-4 sm:gap-8"
            >
              <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-gold shadow-[0_2px_15px_rgba(255,215,0,0.8),0_4px_20px_rgba(0,0,0,0.9)] opacity-90 rounded-full" />

              <span className="relative drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
                {/* Animated Gradient Text */}
                <span className="bg-gradient-to-r from-white via-[#ffd700] to-white bg-[length:200%_auto] animate-shine text-transparent bg-clip-text">
                  Bukit Bintang, KL
                </span>
              </span>

              <span className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent via-gold/50 to-gold shadow-[0_2px_15px_rgba(255,215,0,0.8),0_4px_20px_rgba(0,0,0,0.9)] opacity-90 rounded-full" />
            </motion.p>
          </div>



        </motion.div>
      </div>

      {/* Marquee */}
      <MarqueeStrip />

      {/* Stats HUD (New High Visibility Design) */}
      <HeroStats />

      {/* Scroll indicator (Removed to not clutter the stats) */}

    </section>
  );
}
