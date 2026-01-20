"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface MaskTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const maskVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    y: "100%",
    rotateX: -80,
  },
  visible: {
    y: "0%",
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function MaskText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: MaskTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  // Split by newlines or treat as single line
  const lines = children.split("\n").filter(Boolean);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={maskVariants}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            variants={{
              hidden: {
                y: "100%",
                rotateX: -80,
                opacity: 0,
              },
              visible: {
                y: "0%",
                rotateX: 0,
                opacity: 1,
                transition: {
                  duration,
                  delay: delay + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{ transformOrigin: "bottom center" }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

// Single line mask reveal (simpler version)
export function MaskLine({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
