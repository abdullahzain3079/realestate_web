"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles, Car, Eye, Building2, ConciergeBell, CheckCircle,
  Star, Shield, ChevronLeft, ChevronRight, Anchor, Home,
} from "lucide-react";

const bgSlides = [
  { src: "/page_18_img_1.jpeg", label: "Grand Entrance Lobby" },
  { src: "/page_9_img_1.jpeg", label: "L67 Infinity Sky Pool" },
  { src: "/page_10_img_2.jpeg", label: "L66 Sky Garden & Lounge" },
  { src: "/page_4_img_3.jpeg", label: "Facade - Jalan Bukit Bintang" },
  { src: "/page_15_img_3.jpeg", label: "Residence Interior" },
  { src: "/page_15_img_5.jpeg", label: "Premium Suite" },
];

const officialServices = [
  {
    icon: Sparkles,
    title: "Housekeeping & Cleaning",
    subtitle: "Official Service",
    desc: "Professional housekeeping tailored to your schedule - from daily tidying to comprehensive deep cleans, ensuring your residence is always immaculate.",
    color: "#6ee7b7",
    glow: "rgba(110,231,183,0.22)",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Anchor,
    title: "Limousine, Private Jet & Yacht",
    subtitle: "Official Service",
    desc: "Bespoke land, air and sea arrangements - luxury chauffeur-driven transfers, private aviation bookings and exclusive yacht charter coordination.",
    color: "#7dd3fc",
    glow: "rgba(125,211,252,0.22)",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    icon: Building2,
    title: "Property Management & Viewing",
    subtitle: "Official Service",
    desc: "End-to-end property management - maintenance coordination, rental yield optimisation and private showflat viewings for prospective buyers.",
    color: "#c9a84c",
    glow: "rgba(201,168,76,0.28)",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

const extraServices = [
  { icon: ConciergeBell, title: "24/7 Concierge Desk", desc: "Round-the-clock personal concierge - restaurant reservations, event tickets and exclusive access.", image: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { icon: Shield, title: "Multi-Tier Security", desc: "Advanced CCTV, card-access and on-site security personnel providing absolute resident safety.", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { icon: Home, title: "Fully Furnished Units", desc: "Every residence and corporate suite delivered exclusively fully furnished - move in from day one.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { icon: Car, title: "Valet & Drop-off", desc: "Designer drop-off portico with dedicated valet parking for residents and guests.", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { icon: Eye, title: "Private Viewings", desc: "After-hours showflat viewings arranged by appointment through the dedicated concierge team.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { icon: Star, title: "Pavilion KL Link", desc: "Pedestrian link bridge to Pavilion KL - 450+ retail, dining and entertainment options.", image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

const stats = [
  { value: "960", label: "Luxury Residences" },
  { value: "106", label: "Corporate Suites" },
  { value: "70K", label: "sq.ft. Facilities" },
  { value: "24/7", label: "Concierge" },
];

export default function Concierge() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % bgSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="concierge" className="relative min-h-screen overflow-hidden bg-[#060914]">
      {/* BG Slider */}
      {bgSlides.map((s, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={s.src}
            alt={s.label}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover kb-zoom-bg"
            style={{ filter: "brightness(0.35) saturate(0.8)" }}
          />
        </motion.div>
      ))}
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060914]/98 via-[#060914]/78 to-[#060914]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/55" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,76,1) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-16 pb-32 sm:pt-28 sm:pb-32">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5 mx-auto"
          >
            <ConciergeBell className="w-3 h-3" />White-Glove Living &middot; Pavilion Group
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl min-[480px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-tight"
          >
            Concierge &amp; <br className="hidden md:block" />
            <span style={{ WebkitTextFillColor: "transparent", background: "linear-gradient(135deg,#c9a84c 0%,#ffd700 50%,#f0d070 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
              Lifestyle Services
            </span>
          </motion.h2>
          <div className="section-divider mt-4 mb-5 mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/72 text-[15px] leading-relaxed max-w-2xl mx-auto"
          >
            Pavilion Square, developed by{" "}
            <strong className="text-[#e8c050] font-bold">Armani Hartajaya Sdn Bhd under Pavilion Group</strong>,
            delivers an unrivalled suite of bespoke concierge services for residents who expect nothing less than extraordinary.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-14"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glow-card rounded-xl sm:rounded-2xl text-center py-4 sm:py-6 px-2 sm:px-3 bg-white/[0.02]"
            >
              <div className="text-xl sm:text-3xl md:text-4xl font-heading font-bold stat-number">{s.value}</div>
              <div className="text-[11px] text-white/60 uppercase tracking-[0.22em] font-semibold mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* New Services Grid Layout */}
        <div className="flex flex-col gap-16 sm:gap-20">

          {/* Official Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-4 mb-2">
                <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#c9a84c]"></div>
                <span
                  className="text-[14px] sm:text-[18px] uppercase tracking-[0.4em] font-black"
                  style={{
                    background: "linear-gradient(90deg, #e8c050, #fff, #e8c050)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Official Pavilion
                </span>
                <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#c9a84c]"></div>
              </div>
              <h3 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-widest uppercase">
                Concierge Services
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {officialServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                  className="group relative h-[340px] min-[480px]:h-[420px] sm:h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-[#060914]">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/20 via-[#060914]/60 to-[#060914] transition-opacity duration-700 group-hover:opacity-95" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                    <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] backdrop-blur-md"
                        style={{
                          background: `linear-gradient(135deg, ${svc.glow}, rgba(255,255,255,0.05))`,
                          border: `1px solid ${svc.color}55`,
                        }}
                      >
                        <svc.icon className="w-7 h-7" style={{ color: svc.color }} />
                      </div>

                      <div className="flex flex-col gap-3">
                        <span
                          className="text-[10px] w-max px-3 py-1.5 rounded-full font-bold uppercase tracking-[0.25em] backdrop-blur-md"
                          style={{
                            background: `${svc.color}15`,
                            border: `1px solid ${svc.color}40`,
                            color: svc.color,
                          }}
                        >
                          {svc.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight group-hover:text-[#c9a84c] transition-colors duration-500 max-w-[90%]">
                          {svc.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[13px] sm:text-[15px] text-white/70 leading-relaxed transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      {svc.desc}
                    </p>

                    {/* Hover Glow Effects */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-tr-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Extra Services Grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 flex flex-col items-center"
            >
              <div className="inline-block relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent blur-xl"></div>
                <div className="relative px-4 py-3 sm:px-12 sm:py-5 border-y border-[#c9a84c]/40 flex items-center justify-center gap-3 sm:gap-6 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent backdrop-blur-sm flex-wrap">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#c9a84c] shadow-[0_0_15px_#ffd700]"></div>
                  <h3 className="text-lg min-[480px]:text-xl sm:text-3xl font-heading font-black text-white tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center">
                    Additional Premium Services
                  </h3>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#c9a84c] shadow-[0_0_15px_#ffd700]"></div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {extraServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="relative h-[240px] rounded-xl overflow-hidden group cursor-pointer border border-[#c9a84c]/20 hover:border-[#c9a84c]/60 transition-colors duration-500 shadow-lg"
                >
                  {/* BG Image setup */}
                  <div className="absolute inset-0 bg-[#060914]">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-75" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#060914]/40 via-[#060914]/80 to-[#060914] transition-opacity duration-500 group-hover:opacity-90" />
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#c9a84c]/50 group-hover:bg-[#c9a84c]/10 transition-colors duration-500 shadow-xl backdrop-blur-md">
                        <svc.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-[#ffd700] transition-colors duration-500" />
                      </div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-white group-hover:text-[#c9a84c] transition-colors duration-500 leading-tight">
                        {svc.title}
                      </h4>
                    </div>
                    <p className="text-[12px] sm:text-[13px] text-white/60 leading-relaxed font-light group-hover:text-white/85 transition-colors duration-500">
                      {svc.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 relative z-10"
          >
            <a href="#contact" className="btn-gold rounded-xl py-4 px-6 sm:px-8 justify-center w-full sm:w-auto min-w-0 sm:min-w-[240px]">
              <ConciergeBell className="w-5 h-5" />Register Your Interest
            </a>
            <a
              href="https://wa.link/kgsiw7"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-gold rounded-xl py-4 px-6 sm:px-8 justify-center w-full sm:w-auto min-w-0 sm:min-w-[240px]"
            >
              <Anchor className="w-5 h-5" />WhatsApp Enquiry
            </a>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent" />
    </section>
  );
}