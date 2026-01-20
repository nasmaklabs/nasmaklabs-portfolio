"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { OrbsBackground, HexGridBackground } from "@/components/ui/TechBackground";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support" },
];

const features = [
  { icon: "⚡", title: "Lightning Fast", desc: "Performance-optimized code that loads in milliseconds" },
  { icon: "🔒", title: "Secure by Default", desc: "Enterprise-grade security in every project" },
  { icon: "📈", title: "Built to Scale", desc: "Architecture that grows with your business" },
  { icon: "🎯", title: "Pixel Perfect", desc: "Attention to detail in every interaction" },
];

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-20 md:py-24 overflow-hidden flex flex-col justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1508 25%, #2a2010 50%, #1a1508 75%, #0a0a0a 100%)",
      }}
    >
      {/* Animated tech backgrounds */}
      <OrbsBackground color="#F59E0B" secondaryColor="#00A651" />
      <HexGridBackground color="#F59E0B" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <div className="w-12 h-px bg-[#00A651]" />
            <span className="text-[#00A651] text-sm uppercase tracking-widest">Why Us</span>
            <div className="w-12 h-px bg-[#00A651]" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            We craft digital experiences that 
            <span className="text-[#00A651]"> stand out</span> and 
            <span className="text-[#00A651]"> deliver results</span>
          </motion.h2>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-[#00A651] mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-white/40 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#00A651]/30 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -5 }}
              data-hover
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#00A651] transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
