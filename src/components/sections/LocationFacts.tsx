"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Train, ShoppingBag, Building2, Landmark, Plane, Car,
  ChevronLeft, ChevronRight, Star, Navigation
} from "lucide-react";

/* ── Slide images ─────────────────────────────────────── */
const slides = [
  {
    src: "/pavilionmainview.jpeg",
    headline: "The Epicentre of KL",
    sub: "75A Jalan Raja Chulan, Bukit Bintang",
  },
  {
    src: "/page_3_img_1.jpeg",
    headline: "Prime Golden Triangle",
    sub: "Steps from Pavilion KL via direct link bridge",
  },
  {
    src: "/page_4_img_1.jpeg",
    headline: "Connected to Everything",
    sub: "MRT, Monorail, KLCC — all within walking distance",
  },
  {
    src: "/page_6_img_1.jpeg",
    headline: "Bukit Bintang Landmark",
    sub: "Where luxury living meets world-class convenience",
  },
  {
    src: "/page_7_img_1.jpeg",
    headline: "KL's Most Coveted Address",
    sub: "67 storeys of architectural brilliance",
  },
];

// Quick facts array removed for a cleaner view

/* ── Connectivity ────────────────────────────────────── */
const connectivity = [
  { name: "Pavilion KL Mall", detail: "Direct link bridge — no outdoor walk", icon: ShoppingBag, highlight: true },
  { name: "Bukit Bintang MRT", detail: "Walking distance, 3 min", icon: Train, highlight: true },
  { name: "Raja Chulan Monorail", detail: "300 metres away", icon: Train, highlight: false },
  { name: "KLCC / Petronas Towers", detail: "1.5 km — 5 min drive", icon: Building2, highlight: false },
  { name: "KL Tower", detail: "1 km panoramic landmark", icon: Landmark, highlight: false },
  { name: "KL International Airport", detail: "55 min via KLIA Ekspres", icon: Plane, highlight: false },
  { name: "Elite Highway / Smart Tunnel", detail: "Direct highway access", icon: Car, highlight: false },
  { name: "Starhill Gallery", detail: "Adjacent luxury retail hub", icon: Star, highlight: false },
];

/* ── Full-bleed BG Slider ────────────────────────────── */
function BgSlider({ current, slides }: { current: number; slides: { src: string; headline: string; sub: string }[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <Image
            src={s.src}
            alt={s.headline}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover kb-zoom-bg"
          />
        </motion.div>
      ))}
      {/* Left-heavy overlay: dark for text readability, fades to near-transparent revealing the photo on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/80 to-[#060914]/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/70 via-transparent to-[#060914]/40" />
      {/* Gold shimmer line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
    </div>
  );
}

// Stat component removed for cleaner view

export default function LocationFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Auto-advance slider */
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPaused]);

  const goTo = (i: number) => { setCurrent(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 8000); };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  /* ── Scroll-driven parallax ──────────────────── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section id="location" ref={sectionRef} className="relative min-h-[89dvh] w-full overflow-hidden bg-[#060914] flex flex-col pt-6 pb-6">
      <BgSlider current={current} slides={slides} />

      {/* Content — left-aligned, right half reveals background photo */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex-1 w-full overflow-y-auto hide-scrollbar"
      >
        <div className="w-full pl-4 min-[480px]:pl-6 sm:pl-14 md:pl-20 lg:pl-28 xl:pl-36 2xl:pl-44 pr-4 min-[480px]:pr-5 sm:pr-8 lg:pr-8 pt-20 pb-20 max-w-full sm:max-w-[800px] lg:max-w-[60%] xl:max-w-[55%] flex flex-col">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 self-start"
          >
            <Navigation className="w-3.5 h-3.5 text-[#ffd700]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-md">
              Prime Location — Bukit Bintang, KL
            </span>
          </motion.div>

          {/* Slide headline */}
          <div className="overflow-hidden mb-2 relative">
            {/* Ambient glow spotlight behind headline */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[320px] h-[120px] bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-heading font-black text-white leading-[0.92] tracking-tight"
              >
                {slides[current].headline.split(" ").map((w, i) =>
                  i === slides[current].headline.split(" ").length - 1 ? (
                    <span
                      key={i}
                      style={{
                        WebkitTextFillColor: "transparent",
                        background: "linear-gradient(135deg,#c9a84c,#ffd700,#f0d070)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        textShadow: "none",
                        filter: "drop-shadow(0 0 15px rgba(255, 217, 0, 0.66)) drop-shadow(0 0 5px rgba(255,255,255,0.2))",
                      }}
                    >{w} </span>
                  ) : <span key={i} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>{w} </span>
                )}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Slide sub */}
          <AnimatePresence mode="wait">
            <motion.p
              key={"sub-" + current}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="text-white/85 text-base sm:text-lg mb-5 font-light"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
            >
              {slides[current].sub}
            </motion.p>
          </AnimatePresence>

          {/* Connectivity section */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Moving gold progress line */}
            <div className="relative w-[160px] sm:w-[200px] mb-3 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent animate-[slideProgress_2s_linear_infinite]">
                <div className="absolute inset-0 bg-[#ffd700] opacity-25"></div>
              </div>
              <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent animate-[slideProgress_3.5s_linear_infinite] opacity-50"></div>
            </div>

            {/* Connectivity pill header */}
            <div className="flex justify-center w-full mb-4">
              <div className="relative inline-flex items-center group cursor-default">
                <div className="absolute inset-0 bg-[#ffd700]/6 blur-md rounded-full opacity-15 group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="relative p-[1px] rounded-full overflow-hidden bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/25 to-transparent w-[200%] animate-[slideProgress_3s_linear_infinite]"></div>
                  <div className="relative flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 bg-[#08070c] backdrop-blur-xl rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse shadow-[0_0_3px_rgba(255,215,0,0.25)]"></div>
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-bold bg-gradient-to-r from-[#ffd700] via-[#f0d070] to-[#c9a84c] bg-clip-text text-transparent">
                      Connectivity <span className="text-white/35 px-0.5">&amp;</span> Surroundings
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connectivity grid — always 2 cols to fit left panel */}
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2">
              {connectivity.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.04 * i }}
                  className={"group relative overflow-hidden flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border transition-all duration-500 cursor-default transform hover:scale-[1.02] " + (
                    item.highlight
                      ? "bg-gradient-to-br from-[#c9a84c]/15 via-[#ffd700]/8 to-[#c9a84c]/10 border-[#c9a84c]/30 hover:border-[#ffd700]/50 shadow-[0_4px_20px_rgba(201,168,76,0.08)] hover:shadow-[0_8px_28px_rgba(255,215,0,0.18)]"
                      : "bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-[#c9a84c]/30 hover:bg-white/8"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700]/8 to-transparent -skew-x-12 animate-[shine_2.5s_ease-in-out_infinite]"></div>
                  </div>
                  <div className={"w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 relative overflow-hidden " + (item.highlight ? "bg-gradient-to-br from-[#c9a84c]/30 to-[#ffd700]/20 border border-[#c9a84c]/40" : "bg-gradient-to-br from-white/10 to-white/5 border border-white/12") + " group-hover:border-[#ffd700]/60 group-hover:shadow-[0_0_14px_rgba(255,215,0,0.25)]"}>
                    <item.icon className={"w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:text-[#ffd700] " + (item.highlight ? "text-[#ffd700]" : "text-white/55")} />
                    <div className="absolute inset-0 bg-[#ffd700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse rounded-xl"></div>
                  </div>
                  <div className="relative z-10 min-w-0">
                    <div className={"text-[12px] sm:text-sm font-bold leading-tight mb-1 transition-all duration-500 group-hover:text-[#ffd700] " + (item.highlight ? "text-[#ffd700]" : "text-white/90")}>
                      {item.name}
                    </div>
                    <div className="text-[11px] sm:text-xs text-white/60 group-hover:text-white/85 transition-colors duration-500 leading-snug">
                      {item.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Control Deck — nav + CTA */}
          <div className="flex justify-center w-full mt-8 lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="w-full max-w-[500px]"
            >
              <div className="relative p-[1px] rounded-[2rem] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent w-[300%] animate-[slideProgress_4s_linear_infinite] opacity-40 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative flex flex-row items-center justify-between gap-0 bg-[#08070c]/95 backdrop-blur-2xl rounded-[2rem] p-1.5 border border-[#ffd700]/30 shadow-[0_8px_32px_-4px_rgba(255,215,0,0.25)] group-hover:border-[#ffd700]/60 group-hover:shadow-[0_8px_32px_-4px_rgba(255,215,0,0.45)] transition-all duration-700 w-full">

                  {/* Nav controls */}
                  <div className="flex items-center shrink-0 px-2 gap-1">
                    <button onClick={prev} className="group/btn flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-all duration-300" aria-label="Previous">
                      <ChevronLeft className="w-4 h-4 text-white/50 group-hover/btn:text-[#ffd700] transition-colors" />
                    </button>
                    <div className="flex items-center justify-center min-w-[52px] font-mono text-[12px] tracking-widest text-[#f0d070]">
                      <span className="font-bold">{String(current + 1).padStart(2, "0")}</span>
                      <span className="text-white/25 mx-1 font-light">/</span>
                      <span className="text-white/40">{String(slides.length).padStart(2, "0")}</span>
                    </div>
                    <button onClick={next} className="group/btn flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-all duration-300" aria-label="Next">
                      <ChevronRight className="w-4 h-4 text-white/50 group-hover/btn:text-[#ffd700] transition-colors" />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-3 shrink-0"></div>

                  {/* CTA */}
                  <div className="flex items-center pl-4 pr-1.5 py-1.5 h-[50px]">
                    <a
                      href="https://wa.link/9ckvr8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta relative flex items-center justify-center gap-2 px-6 h-full rounded-[1.5rem] bg-gradient-to-r from-[#c9a84c] via-[#ffd700] to-[#c9a84c] text-[#060914] overflow-hidden transition-all duration-300 active:scale-[0.97] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-[150%] skew-x-[-25deg] group-hover/cta:animate-[shine_1.5s_ease-in-out]"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current relative z-10 transition-transform duration-500 group-hover/cta:scale-110 group-hover/cta:-rotate-12 shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                      <span className="relative z-10 text-[11px] uppercase tracking-[0.15em] font-black whitespace-nowrap">
                        Register Interest
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
