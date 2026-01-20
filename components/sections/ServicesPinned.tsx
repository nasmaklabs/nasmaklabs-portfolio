"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CircuitBackground, NeuralBackground } from "@/components/ui/TechBackground";

const services = [
  { 
    num: "01", 
    title: "AI Solutions", 
    desc: "Custom AI agents, RAG pipelines, and LLM integrations that transform your business. From intelligent chatbots to autonomous workflows.",
    tags: ["GPT-4", "Claude", "LangChain", "RAG", "Fine-tuning"],
    color: "#00A651",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  { 
    num: "02", 
    title: "Web3 & Blockchain", 
    desc: "Decentralized applications, smart contracts, and DeFi protocols. Building the future of trustless digital infrastructure.",
    tags: ["Ethereum", "Solidity", "Smart Contracts", "DeFi", "IPFS"],
    color: "#8B5CF6",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" />
      </svg>
    )
  },
  { 
    num: "03", 
    title: "Full-Stack Development", 
    desc: "Scalable web platforms with modern frameworks. High-performance APIs, real-time features, and bulletproof architecture.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "GraphQL"],
    color: "#0EA5E9",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  { 
    num: "04", 
    title: "Product & UX Design", 
    desc: "User-centered interfaces for AI dashboards, Web3 dApps, and complex SaaS platforms. Design that users actually love.",
    tags: ["UI/UX", "Figma", "Design Systems", "Prototyping"],
    color: "#F59E0B",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  },
];

export function ServicesPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen py-20 md:py-24 overflow-hidden flex flex-col justify-center"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 25%, #2d1250 50%, #1a0a2e 75%, #0a0a0a 100%)",
      }}
    >
      {/* Animated tech background */}
      <CircuitBackground color="#8B5CF6" />
      <NeuralBackground color="#00A651" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
        
        {/* Floating gradient orbs */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            y: backgroundY,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 166, 81, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
            y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header with animated line */}
        <div className="mb-20 md:mb-32">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="h-px bg-[#00A651]"
              initial={{ width: 0 }}
              animate={isInView ? { width: 48 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.span 
              className="text-[#00A651] text-sm uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              What We Do
            </motion.span>
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Our <span className="text-[#00A651]">Services</span>
            </motion.h2>

            <motion.p
              className="text-white/40 max-w-sm text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-first solutions, Web3 infrastructure, and modern full-stack development
            </motion.p>
          </div>
        </div>

        {/* Services grid with staggered reveal */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [isHovered, setIsHovered] = useState(false);
  
  const color = service.color;

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 80, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] overflow-hidden"
        style={{ 
          borderWidth: 1, 
          borderStyle: "solid",
          borderColor: `${color}30`,
        }}
        animate={{
          borderColor: isHovered ? `${color}80` : `${color}30`,
          y: isHovered ? -8 : 0,
          boxShadow: isHovered ? `0 20px 60px ${color}20` : `0 0 30px ${color}08`,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        data-hover
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 0%, ${color}20 0%, transparent 50%)`,
            }}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 70% 100%, ${color}10 0%, transparent 50%)`,
            }}
          />
        </motion.div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ 
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${color}20`,
                  color: color,
                }}
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  backgroundColor: isHovered ? `${color}30` : `${color}20`,
                }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>
              <span className="font-mono text-sm font-semibold" style={{ color }}>{service.num}</span>
            </div>
            
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: `${color}40`,
              }}
              animate={{ 
                backgroundColor: isHovered ? color : "transparent",
                borderColor: isHovered ? color : `${color}40`,
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <svg 
                className="w-5 h-5 transition-colors"
                style={{ color: isHovered ? "#000" : color }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>

          {/* Title with underline animation */}
          <div className="mb-4 overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {service.title}
            </h3>
            <motion.div
              className="h-0.5 mt-2"
              style={{ backgroundColor: color, transformOrigin: "left" }}
              initial={{ scaleX: 0.3, opacity: 0.5 }}
              animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Description */}
          <motion.p
            className="text-white/50 leading-relaxed mb-8"
            animate={{ color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)" }}
            transition={{ duration: 0.3 }}
          >
            {service.desc}
          </motion.p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 text-xs rounded-full font-medium"
                style={{ 
                  borderWidth: 1, 
                  borderStyle: "solid",
                  backgroundColor: `${color}15`,
                  borderColor: `${color}30`,
                  color: color,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{
                  backgroundColor: `${color}30`,
                  borderColor: `${color}60`,
                  scale: 1.05,
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + i * 0.05,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
