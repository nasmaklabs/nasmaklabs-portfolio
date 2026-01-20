"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GeometricBackground } from "@/components/ui/TechBackground";

export function HeroPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0a1a12 25%, #0f2a1a 50%, #0a1a12 75%, #0a0a0a 100%)",
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #00A651 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #00A651 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <GeometricBackground color="#00A651" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,166,81,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,166,81,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Navigation */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end gap-4 px-6 md:px-12 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.a
          href="/careers"
          className="group flex items-center gap-3 px-5 py-3 bg-[#00A651]/10 border border-[#00A651]/30 rounded-full text-sm text-[#00A651] hover:bg-[#00A651] hover:text-black transition-all"
          whileHover={{ scale: 1.05 }}
          data-hover
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A651] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A651]" />
          </span>
          We&apos;re Hiring
        </motion.a>
        <motion.a
          href="#contact"
          className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full text-sm hover:bg-[#00A651] hover:border-[#00A651] hover:text-black transition-all"
          whileHover={{ scale: 1.05 }}
          data-hover
        >
          Let&apos;s Talk
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>
      </motion.nav>

      {/* Main content */}
      <motion.div 
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12"
        style={{ y, opacity }}
      >
        {/* Giant headline */}
        <div className="relative">
          {/* Line 1 */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="overflow-hidden">
              <motion.span
                className="block text-[15vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter"
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                WE
              </motion.span>
            </div>
            <motion.div
              className="relative overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
              initial={{ 
                y: -400, 
                opacity: 0,
                width: "8vw",
                height: "8vw",
                borderRadius: "50%",
              }}
              animate={{ 
                y: [-400, 30, -50, 15, -20, 0],
                opacity: [0, 1, 1, 1, 1, 1],
                width: "20vw",
                height: "8vw",
                borderRadius: "16px",
              }}
              transition={{ 
                y: { 
                  duration: 1.4, 
                  delay: 0.7, 
                  times: [0, 0.35, 0.55, 0.75, 0.9, 1],
                  ease: "easeOut",
                },
                opacity: { 
                  duration: 0.2, 
                  delay: 0.7,
                },
                width: {
                  duration: 0.6,
                  delay: 1.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                height: {
                  duration: 0.6,
                  delay: 1.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                borderRadius: {
                  duration: 0.6,
                  delay: 1.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ 
                  rotate: [0, 3, -3, 0],
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
                }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Nasmak Labs" 
                  fill
                  className="object-contain p-2"
                  priority
                />
              </motion.div>
            </motion.div>
            <div className="overflow-hidden">
              <motion.span
                className="block text-[15vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter"
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                BUILD
              </motion.span>
            </div>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-4 md:gap-8"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[15vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter text-[#00A651]">
                DIGITAL
              </span>
            </motion.div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-4 md:gap-8"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[15vw] md:text-[12vw] font-black leading-[0.85] tracking-tighter">
                PRODUCTS
              </span>
              <motion.div
                className="hidden md:block w-[6vw] h-[6vw] border-4 border-[#00A651] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Description */}
          <p className="text-lg md:text-xl text-white/60 max-w-md leading-relaxed">
            We transform ambitious ideas into exceptional digital experiences. 
            <span className="text-[#00A651]"> From startups to enterprises.</span>
          </p>

          {/* CTA */}
          <motion.a
            href="#work"
            className="group flex items-center gap-4"
            whileHover={{ x: 10 }}
            data-hover
          >
            <span className="text-sm uppercase tracking-widest text-white/60 group-hover:text-[#00A651] transition-colors">
              Explore Work
            </span>
            <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-[#00A651] group-hover:border-[#00A651] transition-all">
              <svg className="w-5 h-5 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Side text */}
      <motion.div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-white/30 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Software & Product Studio — Est. 2019
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-[#00A651] rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
