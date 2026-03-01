"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const images = [
  { src: "/pavillionsquare_building.jpeg", alt: "Skyline Architecture", category: "Exterior" },
  { src: "/page_9_img_1.jpeg", alt: "118-Metre Infinity Pool", category: "Level 67" },
  { src: "/page_10_img_2.jpeg", alt: "Sky Lounge & Bar", category: "Level 67" },
  { src: "/page_12_img_1.jpeg", alt: "Fully Equipped Gym", category: "Level 66" },
  { src: "/page_7_img_1.jpeg", alt: "Grand Concierge", category: "Ground Floor" },
  { src: "/page_8_img_1.jpeg", alt: "Luxury Drop-Off", category: "Ground Floor" },
  { src: "/page_18_img_1.jpeg", alt: "Opulent Living Spaces", category: "Interior" },
];

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number, size: number, x: number, y: number, duration: number, delay: number, yOffset: number }[]>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const config = { damping: 40, stiffness: 100, bounce: 0 };
  const smoothMouseX = useSpring(mouseX, config);
  const smoothMouseY = useSpring(mouseY, config);

  // We explicitly create a single set of transforms that we can use broadly
  // instead of conditionally creating them inside a map loop.
  const xTransformFar = useTransform(smoothMouseX, (v) => v * -0.05);
  const yTransformFar = useTransform(smoothMouseY, (v) => v * -0.05);
  const xTransformMid = useTransform(smoothMouseX, (v) => v * -0.15);
  const yTransformMid = useTransform(smoothMouseY, (v) => v * -0.15);
  const xTransformNear = useTransform(smoothMouseX, (v) => v * -0.3);
  const yTransformNear = useTransform(smoothMouseY, (v) => v * -0.3);

  useEffect(() => {
    setMounted(true);
    const isMobile = window.innerWidth < 768;

    // Generate beautiful "ember" like particles of varying sizes (Desktop only to prevent lag)
    setParticles(
      isMobile ? [] : Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        // Most particles are small, some are larger
        size: Math.random() > 0.8 ? Math.random() * 5 + 3 : Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 120, // Start slightly below sometimes
        duration: Math.random() * 15 + 10,
        delay: Math.random() * -20, // Start at different times
        yOffset: Math.random() * -100 - 50, // Float upwards by 50-150px
      }))
    );

    if (isMobile) return; // Skip mouse tracking on mobile

    const handleMouseMove = (e: MouseEvent) => {
      // Offset from center of screen for parallax effect
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || particles.length === 0) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#c9a84c]/5 blur-[80px] rounded-full pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Interactive Mouse Tracking Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/10 blur-[120px]"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />

      {/* Dynamic Rising Embers/Particles with Interactive Parallax */}
      {particles.map((p) => {
        // Assign parallax layer based on size
        let xTrans = xTransformFar;
        let yTrans = yTransformFar;

        if (p.size > 5) {
          xTrans = xTransformNear;
          yTrans = yTransformNear;
        } else if (p.size > 2) {
          xTrans = xTransformMid;
          yTrans = yTransformMid;
        }

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-[0_0_12px_rgba(201,168,76,0.8)]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: p.size > 3
                ? 'radial-gradient(circle at 30% 30%, #fff, #ffd700, #c9a84c)'
                : '#ffd700',
              x: xTrans,
              y: yTrans,
            }}
            animate={{
              y: [0, p.yOffset],
              opacity: [0, 0.7, 0],
              scale: [0, 1.3, 0],
              // Gentle horizontal swaying while floating upwards
              x: [0, Math.sin(p.duration) * 20, Math.cos(p.delay) * -20, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        );
      })}

      {/* Large Slow-Moving Ambient Tones */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#c9a84c]/15 blur-[150px] rounded-full"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] bg-[#ffd700]/10 blur-[160px] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          y: [0, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const currentImage = images[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 25 : -25,
      z: -400,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 25 : -25,
      z: -400,
    }),
  };

  return (
    <section id="gallery" className="relative py-24 bg-[#02040c] overflow-hidden">
      {/* Dynamic Ambient Particles and Glow */}
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">

        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-badge mb-5"
          >
            <Camera className="w-3 h-3" />
            Visual Experience
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-tight"
          >
            The Pavilion{" "}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-[#c9a84c] to-[#ffd700]">
              Gallery
            </em>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 bg-gradient-to-r from-[#c9a84c] to-transparent mt-6 origin-left"
          />
        </div>

        {/* 3D Carousel Container */}
        <div className="relative w-full max-w-5xl aspect-[4/3] min-[480px]:aspect-[16/10] md:aspect-[21/9] perspective-[1200px] mb-8">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                rotateY: { duration: 0.6 },
                z: { duration: 0.6 },
                scale: { duration: 0.6 },
              }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover"
                sizes="(max-w-screen-xl) 100vw, 1200px"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#060914]/90 via-[#060914]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 min-[480px]:p-6 md:p-10 flex justify-start items-end">
                <div>
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 bg-[#c9a84c]/20 border border-[#c9a84c]/30 text-[#e6c154] text-xs font-semibold uppercase tracking-widest rounded-full mb-3"
                  >
                    {currentImage.category}
                  </motion.span>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg min-[480px]:text-2xl md:text-4xl font-heading font-bold text-white drop-shadow-lg"
                  >
                    {currentImage.alt}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 top-[55%] sm:top-1/2 -translate-y-1/2 z-20 w-10 h-10 min-[480px]:w-12 min-[480px]:h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all hover:scale-110 group shadow-xl"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform text-[#e6c154]" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 top-[55%] sm:top-1/2 -translate-y-1/2 z-20 w-10 h-10 min-[480px]:w-12 min-[480px]:h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all hover:scale-110 group shadow-xl"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform text-[#e6c154]" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex gap-3 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                ? "w-8 bg-gradient-to-r from-[#c9a84c] to-[#ffd700]"
                : "w-3 bg-white/20 hover:bg-white/40"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
