"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Waves, Dumbbell, TreePine, CheckCircle, Flame, Star
} from "lucide-react";

/* ── Levels data ─────────────────────────────────────── */
const levels = [
  {
    id: "L67",
    level: "Level 67",
    headline: "118-Metre Infinity Pool",
    tagline: "Highest Rooftop Pool in KL City Centre",
    description:
      "67 storeys above Kuala Lumpur — plunge into the longest rooftop infinity pool in the city. At 118 metres, this sky-high oasis offers breathtaking 360° panoramic views of the KL skyline, surrounded by a sun deck, sky lounge, and private Jacuzzi.",
    image: "/page_9_img_1.jpeg",
    bgImage: "/page_9_img_1.jpeg",
    stat: "118m",
    statLabel: "Pool Length",
    accent: "#06b6d4",
    features: ["118m Infinity Pool", "Sky Lounge & Bar", "Private Jacuzzi", "Sun Deck Cabanas", "Panoramic KL Views", "Poolside Dining"],
    icon: Waves,
  },
  {
    id: "L66",
    level: "Level 66",
    headline: "Sky Facilities Deck",
    tagline: "Entertainment Above the Clouds",
    description:
      "A curated sky-high sanctuary blending modern sophistication with peaceful retreat. BBQ terraces, private dining, an entertainment lounge — making Level 66 the ultimate destination for gatherings above Kuala Lumpur.",
    image: "/page_10_img_2.jpeg",
    bgImage: "/page_10_img_2.jpeg",
    stat: "Level 66",
    statLabel: "Sky Deck",
    accent: "#f59e0b",
    features: ["Sky Terrace", "BBQ & Dining", "Entertainment Lounge", "Outdoor Cinema", "Private Function Rooms", "Alfresco Seating"],
    icon: Flame,
  },
  {
    id: "L63A",
    level: "Level 63A",
    headline: "Sky Wellness Centre",
    tagline: "Largest Sky Gym in KL City Centre",
    description:
      "15,000 sq.ft. of world-class wellness facilities — the highest and most expansive Sky Wellness floor in Kuala Lumpur. World-class gym equipment, yoga studios, sauna & steam rooms, and outdoor fitness decks.",
    image: "/page_11_img_1.jpeg",
    bgImage: "/page_12_img_1.jpeg",
    stat: "15,000",
    statLabel: "sq.ft. Wellness",
    accent: "#10b981",
    features: ["Indoor Sky Gym", "Outdoor Fitness Deck", "Yoga & Pilates Studio", "Sauna & Steam Room", "Sports Lounge", "Meditation Garden"],
    icon: Dumbbell,
  },
  {
    id: "L12",
    level: "Level 12",
    headline: "Courtyard Garden",
    tagline: "A Community at the Heart of It All",
    description:
      "A lushly landscaped 30,000 sq.ft. garden paradise at 12 storeys above street level — featuring a serene walk trail, kids playground, yoga deck, BBQ deck, multi-purpose hall, karaoke, pool table, and a club lounge.",
    image: "/page_13_img_1.jpeg",
    bgImage: "/page_14_img_1.jpeg",
    stat: "30K sqft",
    statLabel: "Garden Level",
    accent: "#84cc16",
    features: ["Serene Trail & Garden", "Kids Playground", "BBQ Deck", "Multi-purpose Hall", "Club Lounge", "Karaoke & Games Room"],
    icon: TreePine,
  },
];


export default function Facilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = levels[activeIdx];

  /* Auto-advance levels */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % levels.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const selectLevel = (i: number) => { setActiveIdx(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };

  return (
    <section id="facilities" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#060914]">

      {/* Full-bleed background per level */}
      {levels.map((l, i) => (
        <motion.div
          key={l.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image src={l.bgImage} alt={l.headline} fill sizes="100vw" priority={i === 0} className="object-cover kb-zoom-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/96 via-[#0e0c14]/80 to-[#060914]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/50" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-28">

        {/* Section heading */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Star className="w-3 h-3" />
            World-Class Lifestyle Amenities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl min-[480px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight"
          >
            Sky-High <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Facilities</em>
            <br />Like No Other
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: "left center" }}
            className="section-divider mt-4"
          />
        </div>

        {/* Level tabs */}
        <div className="flex gap-1 mb-8 sm:mb-10 border-b border-white/10 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {levels.map((l, i) => (
            <button
              key={l.id}
              onClick={() => selectLevel(i)}
              className={`tab-pill ${i === activeIdx ? "active" : ""}`}
            >
              <span className="mr-1.5 text-[10px]">{l.id}</span>
              {l.headline.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-stretch">

          {/* Left — details only */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-center"
              >
                {/* Level badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 w-fit text-[11px] uppercase tracking-widest font-bold"
                  style={{ background: `${active.accent}18`, border: `1px solid ${active.accent}35`, color: active.accent }}>
                  <active.icon className="w-3.5 h-3.5" />
                  {active.level}
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4 leading-tight">
                  {active.headline}
                </h3>
                <div className="text-[#c9a84c]/90 text-base sm:text-lg mb-6 font-medium bg-gradient-to-r from-[#c9a84c]/20 to-transparent p-4 rounded-xl border-l-4 border-[#c9a84c]">
                  {active.tagline}
                </div>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl font-light">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — image and features */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6 h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active.id}`}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 img-card-hover min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]"
              >
                {/* Main image */}
                <Image
                  src={active.image}
                  alt={active.headline}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />

                {/* Deep bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-[#060914]/20 to-transparent" />

                {/* Accent glow overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: `radial-gradient(ellipse at 75% 15%, ${active.accent}22 0%, transparent 65%)` }}
                />

                {/* Top-left level badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-5 left-5 flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ background: `${active.accent}28`, border: `1px solid ${active.accent}50`, color: active.accent }}
                >
                  <active.icon className="w-3.5 h-3.5" />
                  {active.level}
                </motion.div>

                {/* Top-right corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-tr-2xl sm:rounded-tr-3xl"
                  style={{ background: `linear-gradient(225deg, ${active.accent}25 0%, transparent 65%)` }}
                />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-[#060914] via-[#060914]/80 to-transparent">
                  {/* Thin accent rule */}
                  <motion.div
                    key={`rule-${active.id}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left center", background: `linear-gradient(90deg, ${active.accent}, transparent)` }}
                    className="h-[2px] w-full mb-4"
                  />

                  <div className="flex flex-col gap-4">
                    {/* Stat row */}
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white/50 text-[11px] uppercase tracking-[0.2em] mb-1 font-bold">{active.statLabel}</div>
                        <div className="text-4xl sm:text-5xl font-heading font-black leading-none stat-number tracking-tight" style={{ color: active.accent }}>
                          {active.stat}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `${active.accent}15`, border: `1px solid ${active.accent}40` }}>
                        <active.icon className="w-6 h-6" style={{ color: active.accent }} />
                      </div>
                    </div>

                    {/* Features grid */}
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 mt-2">
                      {active.features.map((f, i) => (
                        <motion.div
                          key={`${active.id}-feature-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + (i * 0.05) }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/5 hover:border-white/15 transition-colors group"
                        >
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: active.accent }} />
                          <span className="text-[11px] sm:text-xs text-white/80 group-hover:text-white transition-colors font-medium leading-tight truncate">{f}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated glowing border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      `inset 0 0 0 1px ${active.accent}18, 0 8px 50px ${active.accent}10`,
                      `inset 0 0 0 1px ${active.accent}40, 0 8px 70px ${active.accent}22`,
                      `inset 0 0 0 1px ${active.accent}18, 0 8px 50px ${active.accent}10`,
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Progress bar — auto-advance indicator */}
                {!paused && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 rounded-b-3xl overflow-hidden">
                    <motion.div
                      key={`progress-${active.id}`}
                      className="h-full"
                      style={{ background: `linear-gradient(90deg, ${active.accent}, #fff8)` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}
