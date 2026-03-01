"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <div className="w-full h-0 flex items-center justify-center relative z-40 pointer-events-none outline-none">
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-4/5 max-w-5xl h-[2px] rounded-full flex items-center justify-center"
            >
                {/* Base Gradient Line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-40" />

                {/* Core Yellow/Gold Line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-60 overflow-hidden">
                    {/* Animated Sine Sweep */}
                    <motion.div
                        animate={{ x: ["-200%", "300%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                    />
                </div>

                {/* Outer Glow */}
                <div className="absolute w-1/2 h-full bg-[#ffd700] blur-[8px] opacity-30" />

            </motion.div>
        </div>
    );
}
