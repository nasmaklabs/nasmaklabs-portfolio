"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { NeuralBackground, GeometricBackground } from "@/components/ui/TechBackground";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      className="relative min-h-screen py-20 md:py-24 overflow-hidden flex flex-col justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0a1a10 25%, #0f2a18 50%, #0a1a10 75%, #0a0a0a 100%)",
      }}
    >
      {/* Animated tech backgrounds */}
      <NeuralBackground color="#00A651" />
      <GeometricBackground color="#00A651" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A651]/40 to-transparent" />
        <motion.div
          className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 166, 81, 0.25) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 166, 81, 0.15) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 0.9, 1], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - CTA */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
            >
              <div className="w-12 h-px bg-[#00A651]" />
              <span className="text-[#00A651] text-sm uppercase tracking-widest">Get in Touch</span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let&apos;s build<br />
              <span className="text-[#00A651]">something</span><br />
              great
            </motion.h2>

            <motion.p
              className="text-xl text-white/50 max-w-md mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Have a project in mind? We&apos;d love to hear about it. 
              Let&apos;s create something extraordinary together.
            </motion.p>

            <motion.a
              href="mailto:hello@nasmaklabs.com"
              className="group inline-flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ x: 10 }}
              data-hover
            >
              <span className="text-2xl md:text-3xl font-bold group-hover:text-[#00A651] transition-colors">
                hello@nasmaklabs.com
              </span>
              <div className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-[#00A651] group-hover:border-[#00A651] transition-all">
                <svg className="w-5 h-5 -rotate-45 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          </div>

          {/* Right - Info */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Social */}
            <div className="mb-12">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Follow Us</p>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/company/nasmak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full text-sm hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  data-hover
                >
                  <FaLinkedinIn className="w-4 h-4" />
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/people/Nasmak-Labs/61573415361536/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full text-sm hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  data-hover
                >
                  <FaFacebookF className="w-4 h-4" />
                  Facebook
                </motion.a>
              </div>
            </div>

            {/* Location */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-xs text-white/30 uppercase tracking-widest mb-4">Location</p>
              <p className="text-lg text-white/70 mb-2">Based Worldwide</p>
              <p className="text-white/40">Working with teams across the globe, from San Francisco to Singapore.</p>
            </div>
          </motion.div>
        </div>

        {/* Footer - Minimal */}
        <motion.footer
          className="mt-16 pt-6 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/30 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A651]" />
              <span>© {new Date().getFullYear()} Nasmak Labs</span>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-white/25">
              <a href="#" className="hover:text-white/60 transition-colors" data-hover>Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors" data-hover>Terms</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
