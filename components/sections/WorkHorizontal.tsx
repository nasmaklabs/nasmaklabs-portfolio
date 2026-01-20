"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { DataRainBackground, HexGridBackground } from "@/components/ui/TechBackground";
import { 
  SiOpenai, SiPython, SiTensorflow, SiPytorch, 
  SiEthereum, SiSolidity, SiIpfs, SiPolygon, SiSolana,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiPostgresql, SiRedis, SiVercel, SiDocker, SiGraphql,
  SiGooglecloud, SiFirebase, SiSupabase, SiKubernetes, SiTerraform, SiMongodb
} from "react-icons/si";
import { FaBrain, FaLink, FaRobot, FaDatabase, FaFileContract, FaCoins, FaHatWizard, FaCube, FaCloud, FaAws } from "react-icons/fa";
import { BsStars, BsMicrosoft } from "react-icons/bs";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your vision, goals, and challenges. Understanding your users and market is where great products begin.",
  },
  {
    num: "02", 
    title: "Strategy",
    desc: "We craft a roadmap that aligns business objectives with user needs. Every decision is intentional and data-informed.",
  },
  {
    num: "03",
    title: "Design",
    desc: "From wireframes to high-fidelity prototypes. We create interfaces that are beautiful, intuitive, and accessible.",
  },
  {
    num: "04",
    title: "Development",
    desc: "Clean, scalable code brought to life. We build with performance, security, and maintainability at the core.",
  },
  {
    num: "05",
    title: "Launch & Scale",
    desc: "Rigorous testing, seamless deployment, and ongoing optimization. We're with you beyond the launch.",
  },
];

// Tech icons mapping
const techIcons: Record<string, React.ReactNode> = {
  "OpenAI": <SiOpenai />,
  "GPT-4": <BsStars />,
  "Claude": <FaBrain />,
  "LangChain": <FaLink />,
  "Pinecone": <FaDatabase />,
  "Hugging Face": <FaRobot />,
  "TensorFlow": <SiTensorflow />,
  "PyTorch": <SiPytorch />,
  "Stable Diffusion": <FaHatWizard />,
  "RAG": <FaCube />,
  "Ethereum": <SiEthereum />,
  "Solidity": <SiSolidity />,
  "Web3.js": <SiEthereum />,
  "Ethers.js": <SiEthereum />,
  "Hardhat": <FaHatWizard />,
  "IPFS": <SiIpfs />,
  "Polygon": <SiPolygon />,
  "Solana": <SiSolana />,
  "Smart Contracts": <FaFileContract />,
  "DeFi": <FaCoins />,
  "React": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "TypeScript": <SiTypescript />,
  "Tailwind": <SiTailwindcss />,
  "Framer Motion": <SiFramer />,
  "Three.js": <SiThreedotjs />,
  "Node.js": <SiNodedotjs />,
  "Python": <SiPython />,
  "PostgreSQL": <SiPostgresql />,
  "MongoDB": <SiMongodb />,
  "Redis": <SiRedis />,
  "GraphQL": <SiGraphql />,
  "AWS": <FaAws />,
  "Google Cloud": <SiGooglecloud />,
  "Azure": <BsMicrosoft />,
  "Firebase": <SiFirebase />,
  "Supabase": <SiSupabase />,
  "Vercel": <SiVercel />,
  "Docker": <SiDocker />,
  "Kubernetes": <SiKubernetes />,
  "Terraform": <SiTerraform />,
  "Serverless": <FaCloud />,
};

const techCategories = [
  {
    name: "AI & Machine Learning",
    color: "#00A651",
    techs: ["OpenAI", "GPT-4", "Claude", "LangChain", "Pinecone", "Hugging Face", "TensorFlow", "PyTorch", "Stable Diffusion", "RAG"]
  },
  {
    name: "Web3 & Blockchain",
    color: "#8B5CF6",
    techs: ["Ethereum", "Solidity", "Web3.js", "Ethers.js", "Hardhat", "IPFS", "Polygon", "Solana", "Smart Contracts", "DeFi"]
  },
  {
    name: "Frontend",
    color: "#0EA5E9",
    techs: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Three.js"]
  },
  {
    name: "Backend",
    color: "#F59E0B",
    techs: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"]
  },
  {
    name: "Cloud & DevOps",
    color: "#EC4899",
    techs: ["AWS", "Google Cloud", "Azure", "Firebase", "Supabase", "Vercel", "Docker", "Kubernetes", "Terraform", "Serverless"]
  },
];

export function WorkHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      id="work" 
      className="relative min-h-screen py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0a1628 25%, #0f2540 50%, #0a1628 75%, #0a0a0a 100%)",
      }}
    >
      {/* Animated tech backgrounds */}
      <DataRainBackground color="#0EA5E9" />
      <HexGridBackground color="#0EA5E9" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/40 to-transparent" />
        <motion.div
          className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 166, 81, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 0.9, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Process Section */}
        <div className="mb-32 md:mb-48">
          {/* Header */}
          <div className="mb-20 md:mb-24">
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
              <span className="text-[#00A651] text-sm uppercase tracking-widest">How We Work</span>
            </motion.div>
            
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Our <span className="text-[#00A651]">Process</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] md:left-8 top-0 bottom-0 w-px bg-white/10">
              <motion.div 
                className="w-full bg-gradient-to-b from-[#00A651] to-[#00A651]/50"
                style={{ height: lineHeight }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, i) => (
                <ProcessStep key={i} step={step} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <TechStack />
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-16 md:pl-24"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      {/* Number circle */}
      <motion.div
        className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#00A651] bg-black flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[#00A651] font-mono text-sm font-bold">{step.num}</span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="group"
        whileHover={{ x: 10 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#00A651] transition-colors mb-3">
          {step.title}
        </h3>
        <p className="text-white/50 max-w-2xl leading-relaxed">
          {step.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="mb-12 md:mb-16">
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
          <span className="text-[#00A651] text-sm uppercase tracking-widest">Technologies</span>
        </motion.div>
        
        <motion.h3
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tech Stack We <span className="text-[#00A651]">Master</span>
        </motion.h3>
      </div>

      {/* Categories */}
      <div className="space-y-8 md:space-y-12">
        {techCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            className="group"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + catIndex * 0.15 }}
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {/* Category header */}
            <motion.div 
              className="flex items-center gap-4 mb-4"
              animate={{
                x: activeCategory === category.name ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
                animate={{
                  scale: activeCategory === category.name ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              <span 
                className="text-lg font-semibold transition-colors duration-300"
                style={{ color: activeCategory === category.name ? category.color : "rgba(255,255,255,0.7)" }}
              >
                {category.name}
              </span>
              <motion.div 
                className="flex-1 h-px"
                style={{ backgroundColor: `${category.color}20` }}
                animate={{
                  backgroundColor: activeCategory === category.name ? `${category.color}40` : `${category.color}20`,
                }}
              />
            </motion.div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 pl-7">
              {category.techs.map((tech, techIndex) => (
                <motion.div
                  key={tech}
                  className="relative px-4 md:px-5 py-2 md:py-2.5 rounded-full border cursor-default overflow-hidden"
                  style={{
                    borderColor: activeCategory === category.name ? `${category.color}50` : "rgba(255,255,255,0.1)",
                    backgroundColor: activeCategory === category.name ? `${category.color}10` : "rgba(255,255,255,0.02)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                  } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.4 + catIndex * 0.1 + techIndex * 0.03,
                  }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -3,
                    borderColor: category.color,
                    backgroundColor: `${category.color}15`,
                  }}
                  data-hover
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    style={{
                      boxShadow: `0 0 20px ${category.color}30`,
                    }}
                  />
                  
                  <span 
                    className="relative z-10 text-sm font-medium transition-colors duration-300 flex items-center gap-2"
                    style={{ 
                      color: activeCategory === category.name ? category.color : "rgba(255,255,255,0.6)" 
                    }}
                  >
                    <span className="text-base">{techIcons[tech]}</span>
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee of all techs */}
      <motion.div
        className="mt-16 md:mt-20 overflow-hidden py-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...techCategories.flatMap(c => c.techs), ...techCategories.flatMap(c => c.techs)].map((tech, i) => (
              <span key={i} className="text-4xl md:text-5xl font-bold text-white/30">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
