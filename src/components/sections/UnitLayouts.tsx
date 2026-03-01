"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BedDouble, Bath, Maximize2, ChevronLeft, ChevronRight, X, ArrowRight, MessageSquare, Building2, Star, Eye, Home, Sparkles, UtensilsCrossed, Sunset, TreePine, LayoutGrid, Sofa } from "lucide-react";

/* ── Feature icon map ─────────────────────────────── */
const FEATURE_CONFIG: Record<string, { icon: React.ElementType }> = {
  "Open-plan layout": { icon: LayoutGrid },
  "Premium finishes": { icon: Sparkles },
  "City view": { icon: Building2 },
  "Fully furnished": { icon: Home },
  "Separate bedroom": { icon: BedDouble },
  "Balcony": { icon: Sunset },
  "Designer kitchen": { icon: UtensilsCrossed },
  "Flexi room": { icon: LayoutGrid },
  "Generous living area": { icon: Sofa },
  "Wraparound views": { icon: Sunset },
  "Luxury bathroom": { icon: Bath },
  "Dual master": { icon: BedDouble },
  "Full kitchen": { icon: UtensilsCrossed },
  "Entertainment area": { icon: Sofa },
  "Corner unit": { icon: LayoutGrid },
  "Panoramic views": { icon: Sunset },
  "Double vanity": { icon: Bath },
  "Premium floor level": { icon: Building2 },
  "Extended balcony": { icon: Sunset },
  "High-spec fit-out": { icon: Sparkles },
  "Dual-aspect view": { icon: Sunset },
  "Walk-in wardrobe": { icon: Star },
  "Luxury bathtub": { icon: Bath },
  "Flagship unit": { icon: Star },
  "Sky views all sides": { icon: Sunset },
  "3 en-suite baths": { icon: Bath },
};
const defaultFeatureCfg = { icon: Sparkles };

/* ── Unit types (as per official Pavilion Square KL floor plans) ── */
const residentialUnits = [
  {
    type: "Type A", label: "Studio",
    sqft: 504, sqm: 46.8, beds: 0, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "Contact for Price",
    features: ["Open-plan layout", "Premium finishes", "City view", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B1", label: "1+1 Rooms",
    sqft: 770, sqm: 71.5, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    features: ["Separate bedroom", "Flexi room", "Designer kitchen", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B2", label: "1+1 Rooms",
    sqft: 772, sqm: 71.7, beds: 1, baths: 1,
    floors: "Residential Tower",
    image: "/page_15_img_3.jpeg",
    bgImage: "/page_15_img_3.jpeg",
    price: "Contact for Price",
    features: ["Separate bedroom", "Flexi room", "Balcony", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type B3", label: "2 Rooms",
    sqft: 966, sqm: 89.7, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    features: ["Dual master", "Full kitchen", "Entertainment area", "Fully furnished"],
    highlight: true,
  },
  {
    type: "Type C1", label: "2+1 Rooms",
    sqft: 978, sqm: 90.9, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_5.jpeg",
    bgImage: "/page_15_img_5.jpeg",
    price: "Contact for Price",
    features: ["Flexi room", "Panoramic views", "Double vanity", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C2", label: "2+1 Rooms",
    sqft: 1100, sqm: 102.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_1.jpeg",
    bgImage: "/page_15_img_1.jpeg",
    price: "Contact for Price",
    features: ["Premium floor level", "Extended balcony", "High-spec fit-out", "Fully furnished"],
    highlight: false,
  },
  {
    type: "Type C3", label: "2+1 Rooms",
    sqft: 1272, sqm: 118.2, beds: 2, baths: 2,
    floors: "Residential Tower",
    image: "/page_15_img_2.jpeg",
    bgImage: "/page_15_img_2.jpeg",
    price: "Contact for Price",
    features: ["Dual-aspect view", "Walk-in wardrobe", "Luxury bathtub", "Fully furnished"],
    highlight: true,
  },
  {
    type: "Type D", label: "3 Rooms",
    sqft: 1255, sqm: 116.6, beds: 3, baths: 3,
    floors: "Residential Tower",
    image: "/page_15_img_4.jpeg",
    bgImage: "/page_15_img_4.jpeg",
    price: "Contact for Price",
    features: ["Flagship unit", "Sky views all sides", "3 en-suite baths", "Fully furnished"],
    highlight: true,
  },
];

const corporateUnits: typeof residentialUnits = [];

const _corporateUnitsUnused = [
  {
    type: "Office 1", label: "Corporate Suite",
    sqft: 2464, sqm: 228.9, beds: 0, baths: 2,
    floors: "Office Tower",
    image: "/page_16_img_1.jpeg",
    bgImage: "/page_16_img_1.jpeg",
    price: "From RM 3.8M",
    features: ["Boardroom ready", "Prestige address", "KLCC views", "Smart system"],
    highlight: true,
  },
  {
    type: "Office 2", label: "Corporate Suite",
    sqft: 1093, sqm: 101.6, beds: 0, baths: 1,
    floors: "Office Tower",
    image: "/page_17_img_1.jpeg",
    bgImage: "/page_17_img_1.jpeg",
    price: "From RM 1.7M",
    features: ["Mid-size suite", "Flexible layout", "High-speed fibre", "Smart system"],
    highlight: false,
  },
  {
    type: "Office 3", label: "Corporate Suite",
    sqft: 1547, sqm: 143.7, beds: 0, baths: 1,
    floors: "Office Tower",
    image: "/page_17_img_2.jpeg",
    bgImage: "/page_17_img_2.jpeg",
    price: "From RM 2.4M",
    features: ["Full-floor option", "Business lounge", "Reception area", "Smart system"],
    highlight: false,
  },
];

type Unit = typeof residentialUnits[0];

/* ── BG image slider per unit ─────────────────────────── */
function UnitBg({ unit }: { unit: Unit }) {
  return (
    <div className="absolute inset-0">
      <motion.div
        key={unit.type}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image src={unit.bgImage} alt={unit.label} fill sizes="100vw" priority className="object-cover" />
      </motion.div>
      {/* Deep navy overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/85 to-[#060914]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-transparent to-[#060914]/60" />
    </div>
  );
}

/* ── Unit Detail Modal ────────────────────────────────── */
function UnitModal({ unit, onClose }: { unit: Unit; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#060914]/95 backdrop-blur-2xl" />
      <motion.div
        initial={{ scale: 0.92, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-3xl w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#c9a84c]/20 bg-gradient-to-br from-[#141218] to-[#0e0c12] max-h-[90vh] overflow-y-auto"
      >
        {/* Image */}
        <div className="relative h-40 sm:h-60 overflow-hidden">
          <Image src={unit.image} alt={unit.label} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141218] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#060914]/70 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold mb-1">{unit.type} — {unit.label}</div>
            <div className="text-2xl font-heading font-black text-white">{unit.sqft} sq.ft.</div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {[
              { label: "Size", value: `${unit.sqft} sq.ft.`, icon: Maximize2 },
              { label: "Floor", value: unit.floors, icon: Building2 },
              { label: "Price", value: unit.price, icon: Star },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/8 text-center gap-1">
                <s.icon className="w-4 h-4 text-[#c9a84c]" />
                <div className="text-sm font-bold text-white">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
            {unit.features.map((f) => (
              <span key={f} className="feature-tag">{f}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <a
              href={`https://wa.me/60112880808?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(unit.type)}%20at%20Pavilion%20Square%20KL`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex-1 rounded-xl py-3 sm:py-3.5"
            >
              <MessageSquare className="w-4 h-4" />
              Enquire on WhatsApp
            </a>
            <a href="#contact" onClick={onClose} className="btn-ghost-gold flex-1 rounded-xl py-3 sm:py-3.5">
              Register Interest
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function UnitLayouts() {
  const units = residentialUnits;
  const [activeIdx, setActiveIdx] = useState(0);
  const [modalUnit, setModalUnit] = useState<Unit | null>(null);
  const [paused, setPaused] = useState(false);
  const activeUnit = units[activeIdx] as Unit;

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % units.length), 5500);
    return () => clearInterval(t);
  }, [paused, units.length]);

  const select = (i: number) => { setActiveIdx(i); setPaused(true); setTimeout(() => setPaused(false), 10000); };

  return (
    <section id="units" className="relative min-h-[90vh] overflow-hidden bg-[#060914] flex flex-col justify-center">

      {/* Dynamic bg per unit */}
      <AnimatePresence>
        <UnitBg key={`unit-${activeIdx}`} unit={activeUnit} />
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">

        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-3"
          >
            <Building2 className="w-3 h-3" />
            Luxury Residences
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-5xl font-heading font-black text-white leading-tight"
            >
              Unit <em style={{ fontStyle: "normal", WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c,#ffd700)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Layouts</em>
            </motion.h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] text-[10px] uppercase tracking-widest font-bold">
              <Star className="w-3 h-3" /> {units.length} Unit Types Available
            </div>
          </div>
          <div className="section-divider mt-4" />
        </div>

        {/* Unit tabs — two rows: first 4 in row 1, last 4 in row 2 */}
        <div className="flex flex-col gap-2 mb-4 sm:mb-6 pb-4 border-b border-white/10">
          {[units.slice(0, 4), units.slice(4)].map((row, rowIdx) =>
            row.length > 0 ? (
              <div key={rowIdx} className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide">
                {row.map((u, localIdx) => {
                  const i = rowIdx * 4 + localIdx;
                  const isActive = i === activeIdx;
                  return (
                    <motion.button
                      key={u.type}
                      onClick={() => select(i)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className={`tab-pill relative overflow-hidden ${isActive ? "active" : ""
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pill-active-bg"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#c9a84c]/15 to-[#ffd700]/10"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative mr-1 text-[10px] font-black text-[#c9a84c] whitespace-nowrap tracking-wider">{u.type}</span>
                      <span className="relative whitespace-nowrap text-[11px]">· {u.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            ) : null
          )}
        </div>

        {/* Main content area */}
        <div className="flex-1 grid lg:grid-cols-12 gap-4 sm:gap-6 items-stretch align-middle">

          {/* Left — Details */}
          <div className="lg:col-span-5 flex flex-col h-full bg-gradient-to-br from-[#0a0d1a]/70 via-[#060914]/60 to-[#0e0b18]/70 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-5 lg:p-6 overflow-hidden relative">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#c9a84c]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#ffd700]/5 blur-2xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeIdx}`}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                }}
                className="flex-1 flex flex-col justify-between h-full relative z-10"
              >
                <div>
                  {/* Badges */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 mb-2"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold bg-[#c9a84c]/15 border border-[#c9a84c]/35 text-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.15)]">
                      <Building2 className="w-3 h-3" />
                      {activeUnit.type}
                    </div>
                    {activeUnit.highlight && (
                      <span className="px-2.5 py-1 rounded-full text-[8px] uppercase tracking-widest font-bold bg-gradient-to-r from-[#ffd700]/20 to-[#c9a84c]/15 border border-[#ffd700]/40 text-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.15)]">✦ Most Popular</span>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 } }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl font-heading font-black text-white leading-none tracking-tight mb-0.5"
                  >
                    {activeUnit.label}
                  </motion.h3>

                  {/* Price */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 } }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-heading font-black bg-gradient-to-r from-[#c9a84c] to-[#ffd700] bg-clip-text text-transparent mb-3"
                  >
                    {activeUnit.price}
                  </motion.div>

                  {/* Quick info grid */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.97 } }}
                    transition={{ duration: 0.45 }}
                    className="grid grid-cols-2 gap-2 mb-3"
                  >
                    {[
                      { icon: Maximize2, label: "Size", val: `${activeUnit.sqft} sq.ft.` },
                      { icon: BedDouble, label: "Bedrooms", val: activeUnit.beds > 0 ? String(activeUnit.beds) : "Studio" },
                      { icon: Bath, label: "Bathrooms", val: String(activeUnit.baths) },
                      { icon: Building2, label: "Floors", val: activeUnit.floors.includes("L") ? activeUnit.floors : "Office" },
                    ].map((s) => (
                      <div key={s.label} className="group/stat flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/8 transition-all duration-300 cursor-default">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#c9a84c]/10 group-hover/stat:bg-[#c9a84c]/20 group-hover/stat:scale-110 transition-all duration-300 shrink-0">
                          <s.icon className="w-3.5 h-3.5 text-[#c9a84c]" />
                        </div>
                        <div>
                          <div className="text-[8px] uppercase tracking-widest text-[#c9a84c]/70 font-semibold">{s.label}</div>
                          <div className="text-[13px] font-bold text-white group-hover/stat:text-[#ffd700] transition-colors leading-tight">{s.val}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Features — gold-only icon cards */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 gap-1 sm:gap-1.5 mb-2"
                  >
                    {activeUnit.features.map((f, fi) => {
                      const cfg = FEATURE_CONFIG[f] ?? defaultFeatureCfg;
                      const Icon = cfg.icon;
                      return (
                        <motion.div
                          key={f}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: fi * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="group/feat flex items-center gap-2 px-2.5 py-2 rounded-xl border bg-[#c9a84c]/6 border-[#c9a84c]/20 hover:border-[#c9a84c]/45 hover:bg-[#c9a84c]/12 transition-all duration-300 cursor-default"
                        >
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 bg-[#c9a84c]/10 group-hover/feat:bg-[#c9a84c]/20 group-hover/feat:scale-110 transition-all duration-300">
                            <Icon className="w-3 h-3 text-[#c9a84c]" />
                          </div>
                          <span className="text-[10px] font-semibold leading-tight text-[#e8c97a] group-hover/feat:text-[#ffd700] transition-colors">{f}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* CTAs fixed at bottom */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-2 mt-auto pt-3 border-t border-white/10"
                >
                  <button className="btn-gold flex-1 rounded-lg py-2.5 flex justify-center items-center gap-1.5 font-bold text-xs hover:shadow-[0_0_24px_rgba(201,168,76,0.4)] transition-all duration-300" onClick={() => setModalUnit(activeUnit)}>
                    <Eye className="w-3.5 h-3.5" />View Plan
                  </button>
                  <a
                    href={`https://wa.me/60112880808?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(activeUnit.type)}%20at%20Pavilion%20Square`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-gold flex-1 rounded-lg py-2.5 flex justify-center items-center gap-1.5 font-bold text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />WhatsApp
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Image */}
          <div className="lg:col-span-7 h-full min-h-[220px] min-[480px]:min-h-[300px] sm:min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeIdx}`}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0 round 24px)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0 round 24px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 group img-card-hover"
              >
                <Image
                  src={activeUnit.image}
                  alt={activeUnit.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Deep bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-[#060914]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="text-5xl sm:text-7xl font-heading font-black leading-none mb-2 stat-number text-white tracking-tight">
                    {activeUnit.sqft} <span className="text-2xl sm:text-3xl font-light text-white/50 tracking-normal">sq.ft.</span>
                  </div>
                  <div className="text-[#c9a84c]/80 text-sm uppercase tracking-[0.2em] font-bold">{activeUnit.floors}</div>
                </div>

                {/* View button hover */}
                <button
                  onClick={() => setModalUnit(activeUnit)}
                  className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#060914]/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 shadow-lg"
                >
                  <Eye className="w-4 h-4" /> Enlarge Floor Plan
                </button>

                {/* Progress bar — auto-advance indicator */}
                {!paused && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 overflow-hidden">
                    <motion.div
                      key={`progress-${activeIdx}`}
                      className="h-full bg-gradient-to-r from-[#c9a84c] to-[#ffd700]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots (removed as we now use pills above) */}
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />

      {/* Modal */}
      <AnimatePresence>
        {modalUnit && <UnitModal unit={modalUnit} onClose={() => setModalUnit(null)} />}
      </AnimatePresence>
    </section>
  );
}
