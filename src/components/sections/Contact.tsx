"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe,
  ExternalLink, CheckCircle, ChevronLeft, ChevronRight,
  MessageSquare, Send, AlertCircle, User, AtSign, Smartphone,
} from "lucide-react";

/* ── Gallery images ──────────────────────────────────── */
const gallery = [
  "/pavilionmainview.jpeg",
  "/page_4_img_1.jpeg",
  "/page_9_img_1.jpeg",
  "/page_8_img_1.jpeg",
  "/page_10_img_2.jpeg",
  "/page_11_img_1.jpeg",
  "/page_12_img_1.jpeg",
  "/page_13_img_1.jpeg",
  "/page_15_img_1.jpeg",
  "/page_15_img_4.jpeg",
  "/page_16_img_1.jpeg",
  "/page_17_img_1.jpeg",
  "/page_18_img_1.jpeg",
  "/page_4_img_2.jpeg",
];

/* ── Form options & unused constants removed ── */

/* ── Contact details ─────────────────────────────────── */
const contactInfo = [
  { icon: Phone, label: "Sales Line", value: "+603 2332 8808", href: "tel:+60323328808" },
  { icon: Phone, label: "Mobile / WhatsApp", value: "+6011 2880 8088", href: "https://wa.link/kgsiw7" },
  { icon: Mail, label: "Email Enquiry", value: "sales@pavilionsquarekl.com", href: "mailto:sales@pavilionsquarekl.com" },
  { icon: MapPin, label: "Sales Gallery", value: "Level 3, Menara Khuan Choo, 75A Jalan Raja Chulan, 50200 Kuala Lumpur", href: "https://maps.google.com/?q=Pavilion+Square+KL" },
  { icon: Clock, label: "Opening Hours", value: "Monday – Sunday: 10:00 AM – 7:00 PM", href: null },
];

const socials = [
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/pavilionsquarekl" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/pavilionsquarekl" },
  { icon: Globe, label: "Website", href: "https://www.pavillionsquare.com.my" },
];

const quickLinks = [
  { label: "About Pavilion Square", href: "#" },
  { label: "Unit Layouts", href: "#unit-layouts" },
  { label: "Facilities", href: "#facilities" },
  { label: "Virtual Tour", href: "#virtual-tour" },
  { label: "Concierge Services", href: "#concierge" },
  { label: "Location", href: "#location" },
];

/* ── Form field helper ───────────────────────────────── */
function InputField({ label, required, error, step, icon: Icon, children }: { label: string; required?: boolean; error?: string; step?: number; icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {step && (
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a84c]/30 to-[#ffd700]/10 border border-[#c9a84c]/40 flex items-center justify-center text-[10px] font-bold text-[#c9a84c] flex-shrink-0">
            {step}
          </span>
        )}
        <label className="text-[13px] font-bold text-white/70 uppercase tracking-[0.15em]">
          {label} {required && <span className="text-[#c9a84c]">*</span>}
        </label>
      </div>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <Icon className="w-4 h-4 text-[#c9a84c]/50" />
          </div>
        )}
        {children}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-red-400 text-[12px] mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-[#060914] md:bg-[#060914]/60 border border-white/10 rounded-xl px-5 py-4 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 focus:bg-[#060914] shadow-inner transition-all duration-300 md:backdrop-blur-md";

const inputWithIconCls =
  "w-full bg-[#060914] md:bg-[#060914]/60 border border-white/10 rounded-xl pl-11 pr-5 py-4 text-[15px] text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/60 focus:ring-1 focus:ring-[#c9a84c]/30 focus:bg-[#060914] shadow-inner transition-all duration-300 md:backdrop-blur-md";

/* ── Component ───────────────────────────────────────── */
export default function Contact() {
  /* Gallery state */
  const [galIdx, setGalIdx] = useState(0);
  const galPaused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => { if (!galPaused.current) setGalIdx((i) => (i + 1) % gallery.length); }, 3800);
    return () => clearInterval(t);
  }, []);
  const galPrev = () => { galPaused.current = true; setGalIdx((i) => (i - 1 + gallery.length) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };
  const galNext = () => { galPaused.current = true; setGalIdx((i) => (i + 1) % gallery.length); setTimeout(() => { galPaused.current = false; }, 7000); };

  /* Form state */
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", pdpa: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string, v: string | boolean) => { setForm((f) => ({ ...f, [k]: v })); if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; }); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.match(/^(\+?6?0)[0-9]{8,10}$/)) e.phone = "Valid Malaysian phone required";
    if (!form.pdpa) e.pdpa = "PDPA consent is required";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // ~API call
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#060914] pt-8">

      {/* ── BACKGROUND SLIDER ───────────────────────── */}
      {gallery.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-0"
          animate={{ opacity: i === galIdx ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt="Pavilion Square"
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover kb-zoom-bg"
            style={{ filter: "brightness(0.3) saturate(1.2)" }}
          />
        </motion.div>
      ))}

      {/* Dynamic Overlays for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#060914]/95 via-[#060914]/80 to-[#060914]/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#060914] via-transparent to-[#060914]/60" />

      {/* ── CONTENT ───────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── FULL-WIDTH HEADING AREA ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          {/* Title & Subtitle */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-badge mb-3"
            >
              <Mail className="w-3 h-3" />
              Get In Touch
            </motion.div>

            <h2 className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black text-white leading-[1.05] mb-3 text-shadow-luxury">
              Register Your{" "}
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[#c9a84c] via-[#ffd700] to-[#e8c050] drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]">
                Interest
              </em>
            </h2>

            <div className="section-divider mb-3" />

            <p className="text-white/75 text-[15px] sm:text-base leading-relaxed">
              Speak with our dedicated sales consultants to schedule a private viewing at our gallery in the heart of KL City Centre.
            </p>
          </div>

          {/* Gallery controls top, Stat boxes bottom */}
          {/* Gallery slider controls */}


          {/* Stat Boxes SECOND (below) */}
          <div className="flex gap-3 mt-6 sm:mt-8">
            {[
              { num: "67", label: "Floors" },
              { num: "5★", label: "Luxury" },
              { num: "KLCC", label: "Location" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center w-[80px] h-[64px] min-[480px]:w-[100px] min-[480px]:h-[80px] rounded-2xl bg-[#060914]/90 min-[480px]:bg-white/[0.04] border border-white/10 min-[480px]:backdrop-blur-sm hover:border-[#c9a84c]/40 transition-all duration-300 group"
              >
                <span className="stat-number text-xl font-heading font-black group-hover:scale-110 transition-transform duration-300">
                  {stat.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── TWO-COLUMN: CONTACT BOXES + FORM ── */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Contact items */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="group glow-card glow-card-slow bg-[#060914]/90 md:bg-white/5 md:backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:bg-[#060914] md:hover:bg-white/10 transition-all duration-300 min-h-[76px]">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c9a84c]/15 to-transparent border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div className="min-w-0 flex-1 py-1">
                    <div className="text-base font-bold text-white group-hover:text-[#c9a84c] transition-colors">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm sm:text-[15px] text-white/50 hover:text-[#ffd700] transition-colors duration-200 block break-words leading-tight mt-0.5">
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm sm:text-[15px] text-white/50 break-words leading-tight mt-0.5">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-2 pl-0 min-[480px]:pl-[80px] flex flex-col items-center w-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold">Connect With Us</div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
              </div>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="relative group w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0a0f1d] border border-white/5 overflow-hidden transition-all duration-500 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(201,168,76,0.5)] hover:border-[#c9a84c]/50"
                  >
                    {/* Hover internal glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon */}
                    <s.icon className="relative z-10 w-5 h-5 text-white/40 group-hover:text-[#ffd700] transition-colors duration-500" />

                    {/* Bottom reflection line */}
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 lg:pl-4 xl:pl-8 h-full flex flex-col justify-start"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#060914]/40 backdrop-blur-2xl border border-[#c9a84c]/40 rounded-3xl p-12 flex flex-col items-center text-center gap-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#ffd700]/10 border border-[#c9a84c]/50 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.3)]">
                    <CheckCircle className="w-10 h-10 text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading font-bold text-white mb-2">Thank You!</div>
                    <div className="text-white/70 text-[14px] leading-relaxed max-w-sm">
                      Your enquiry has been received. Our sales team will contact you within 24 hours via your preferred channel.
                    </div>
                  </div>
                  <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-xl px-8 py-3">
                    <MessageSquare className="w-4 h-4" />Also Reach Us on WhatsApp
                  </a>
                  <button onClick={() => setSubmitted(false)} className="text-[12px] font-bold text-white/40 hover:text-white transition-colors">Submit another enquiry</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="bg-[#060914]/40 backdrop-blur-3xl border border-[#c9a84c]/40 rounded-3xl p-6 sm:p-10 flex flex-col gap-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative"
                  noValidate
                >
                  {/* Gold accent bar at top */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent rounded-full" />

                  {/* Corner glow — top right */}
                  <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-bl from-[#c9a84c]/15 to-transparent rounded-3xl pointer-events-none" />

                  {/* Premium subtle glow overlay inside the form */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl pointer-events-none" />

                  <div className="relative mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#ffd700]/70 font-semibold px-2 py-0.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20">Exclusive Preview</span>
                    </div>
                    <div className="text-[12px] min-[390px]:text-[13px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold mt-2">Priority Registration</div>
                  </div>

                  <InputField label="Full Name" required error={errors.name} step={1} icon={User}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Doe"
                      className={inputWithIconCls}
                    />
                  </InputField>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField label="Email Address" required error={errors.email} step={2} icon={AtSign}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="jane@example.com"
                        className={inputWithIconCls}
                      />
                    </InputField>
                    <InputField label="Phone Number" required error={errors.phone} step={3} icon={Smartphone}>
                      <input
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+60 12-345 6789"
                        className={inputWithIconCls}
                      />
                    </InputField>
                  </div>

                  <InputField label="Message (Optional)" step={4}>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Tell us what you're looking for..."
                      className={inputCls + " resize-none"}
                    />
                  </InputField>

                  {/* PDPA consent */}
                  <div className="flex items-start gap-3 mt-1 mb-1">
                    <button
                      type="button"
                      onClick={() => set("pdpa", !form.pdpa)}
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${form.pdpa ? "bg-gradient-to-br from-[#c9a84c] to-[#b8963a] border-[#c9a84c]" : "bg-[#060914]/60 border-white/20 hover:border-[#c9a84c]/50"}`}
                    >
                      {form.pdpa && <CheckCircle className="w-3.5 h-3.5 text-[#060914]" />}
                    </button>
                    <div>
                      <p className="text-[12px] text-white/50 leading-relaxed">
                        I consent to YNH Property Berhad collecting, using and disclosing my personal data in accordance with their <a href="https://www.pavillionsquare.com.my" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline hover:text-[#ffd700]">Privacy Policy</a> and Malaysia&apos;s Personal Data Protection Act 2010 (PDPA). <span className="text-[#c9a84c] font-bold">*</span>
                      </p>
                      {errors.pdpa && <div className="flex items-center gap-1.5 text-red-400 text-[12px] mt-1.5"><AlertCircle className="w-3.5 h-3.5" />{errors.pdpa}</div>}
                    </div>
                  </div>

                  {/* Buttons — perfectly inline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-[390px]:gap-5 pt-3 items-stretch">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold w-full rounded-xl min-h-[56px] py-4 text-[14px] font-bold text-center disabled:opacity-60 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <span className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                        {submitting ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" /></svg>
                            Submitting…
                          </>
                        ) : (
                          <><Send className="w-5 h-5" />Submit Enquiry</>
                        )}
                      </span>
                    </button>

                    <a
                      href="https://wa.link/kgsiw7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-gold w-full rounded-xl min-h-[56px] py-4 text-[14px] font-bold text-center flex items-center justify-center gap-2 group whitespace-nowrap hover:shadow-[0_0_24px_rgba(37,211,102,0.25)] hover:border-[#25d366]/60 transition-all duration-300"
                    >
                      <MessageSquare className="w-5 h-5 group-hover:animate-pulse group-hover:text-[#25d366] transition-colors duration-300" />
                      <span className="group-hover:text-[#25d366] transition-colors duration-300">WhatsApp Pricing</span>
                    </a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div >

      {/* ── FOOTER ────────────────────────────────────── */}
      < footer className="relative mt-12 sm:mt-16 w-full" >
        {/* Animated Glow Border Wrapper - Oval Top Only */}
        < div className="relative rounded-t-[24px] sm:rounded-t-[32px] lg:rounded-t-[40px] pt-[2px] overflow-hidden group shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" >
          {/* Animated conic gradients for the tracing border effect */}
          < div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#c9a84c_330deg,#ffd700_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ animation: 'spin 6s linear infinite' }
          } />
          < div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_180deg,transparent_0_300deg,#c9a84c_330deg,#ffd700_360deg)] opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ animation: 'spin 6s linear infinite' }} />

          {/* Inner Content Container */}
          <div className="relative bg-[#030611] overflow-hidden rounded-t-[22px] sm:rounded-t-[30px] lg:rounded-t-[38px] h-full w-full">

            {/* Animated Background Image */}
            <div className="absolute inset-0 z-0">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                className="w-full h-full relative"
              >
                <Image
                  src="/page_3_img_1.jpeg"
                  alt="Pavilion Square KL Night View"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Deep gradient overlays for legibility */}
              <div className="absolute inset-0 bg-[#030611]/70 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-[#030611]/90 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030611]/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 sm:pt-10 pb-4">

              <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

                {/* Brand Section */}
                <div
                  className="lg:col-span-5 flex flex-col gap-6"
                >
                  <Link href="#hero" className="inline-block group w-fit">
                    <div className="flex items-center gap-4 relative">
                      <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 border-2 border-[#c9a84c]/30 rotate-45 transition-transform duration-700 group-hover:rotate-[225deg] group-hover:border-[#c9a84c]" />
                        <div className="absolute inset-0 border border-white/10 rotate-45 scale-90" />
                        <span className="text-[#c9a84c] font-heading font-bold text-2xl relative z-10 transition-transform duration-500 group-hover:scale-110">P</span>
                        <div className="absolute inset-0 bg-[#c9a84c]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-heading font-black tracking-[0.2em] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#ffd700] transition-all duration-500">
                          PAVILION
                        </div>
                        <div className="text-[14px] font-heading font-bold tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#c9a84c] to-[#ffd700]">
                          SQUARE
                        </div>
                      </div>
                    </div>
                  </Link>

                  <p className="text-[14px] text-white/70 leading-relaxed max-w-md mt-2 font-light">
                    A landmark dual-tower mixed-use development by YNH Property Berhad, rising 67 floors above the prestigious KLCC precinct, redefining urban luxury.
                  </p>

                  <div className="flex gap-4 mt-2">
                    {socials.map((s, i) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#c9a84c]/50 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(201,168,76,0.4)] transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <s.icon className="w-4 h-4 text-white/60 group-hover:text-[#ffd700] relative z-10 transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div
                  className="lg:col-span-3"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold mb-6 flex items-center gap-3">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                    Navigation
                  </div>
                  <ul className="flex flex-col gap-3">
                    {quickLinks.map((l, i) => (
                      <li
                        key={l.label}
                      >
                        <a
                          href={l.href}
                          className="group flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors duration-300 w-fit"
                        >
                          <span className="w-0 h-px bg-[#c9a84c] transition-all duration-300 group-hover:w-4" />
                          <span className="relative overflow-hidden inline-block">
                            {l.label}
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Information */}
                <div
                  className="lg:col-span-4"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold mb-6 flex items-center gap-3">
                    <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
                    Contact Us
                  </div>

                  <div className="flex flex-col gap-5">
                    <a href="tel:+60323328808" className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#c9a84c]/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-4 h-4 text-[#c9a84c]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Sales Line</div>
                        <div className="text-[15px] font-medium text-white/90 group-hover:text-[#ffd700] transition-colors">+603 2332 8808</div>
                      </div>
                    </a>

                    <a href="https://wa.link/kgsiw7" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#25D366]/40 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]">
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">WhatsApp</div>
                        <div className="text-[15px] font-medium text-white/90 group-hover:text-[#25D366] transition-colors">+6011 2880 8088</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white/60" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Sales Gallery</div>
                        <a href="https://maps.google.com/?q=Pavilion+Square+KL" target="_blank" rel="noopener noreferrer" className="text-[13px] leading-relaxed text-white/70 hover:text-white transition-colors">
                          Level 3, Menara Khuan Choo,<br />75A Jalan Raja Chulan,<br />50200 Kuala Lumpur
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Legal Bar - Cleaned up per user request */}
              <div
                className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-2 pb-6 text-center"
              >
                <div className="text-[12px] text-white/50 font-light">
                  © {new Date().getFullYear()} YNH Property Berhad. All rights reserved.
                </div>
              </div>

            </div>
          </div>
        </div >
      </footer >
    </section >
  );
}
