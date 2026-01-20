"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SceneTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function SceneTransition({ children, className = "" }: SceneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  return (
    <div 
      ref={ref} 
      className={`min-h-screen snap-start ${className}`}
    >
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.92,
          y: 80,
        }}
        animate={{ 
          opacity: isInView ? 1 : 0, 
          scale: isInView ? 1 : 0.92,
          y: isInView ? 0 : 80,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
