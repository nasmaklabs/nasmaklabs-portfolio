"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  delay?: number;
  stagger?: number;
  animation?: "fadeUp" | "fadeIn" | "blur" | "scale" | "rotate";
  once?: boolean;
}

const animations = {
  fadeUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  scale: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  rotate: {
    hidden: { rotateX: -90, opacity: 0, y: 20 },
    visible: { rotateX: 0, opacity: 1, y: 0 },
  },
};

export function SplitText({
  children,
  className = "",
  type = "words",
  delay = 0,
  stagger = 0.03,
  animation = "fadeUp",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const items = useMemo(() => {
    if (type === "chars") {
      return children.split("");
    } else if (type === "words") {
      return children.split(" ");
    } else {
      return children.split("\n");
    }
  }, [children, type]);

  const animationVariants = animations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: animation === "rotate" ? "1000px" : undefined }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: type === "words" ? "0.3em" : undefined }}
        >
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: animationVariants.hidden,
              visible: {
                ...animationVariants.visible,
                transition: {
                  duration: 0.6,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{ 
              transformOrigin: "bottom",
              whiteSpace: type === "chars" ? "pre" : undefined,
            }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// Scroll-linked text reveal - words highlight as you scroll
interface ScrollTextProps {
  children: string;
  className?: string;
  highlightColor?: string;
}

export function ScrollText({
  children,
  className = "",
  highlightColor = "#00A651",
}: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = children.split(" ");

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => (
        <ScrollWord
          key={i}
          word={word}
          progress={scrollYProgress}
          index={i}
          total={words.length}
          highlightColor={highlightColor}
        />
      ))}
    </div>
  );
}

function ScrollWord({
  word,
  progress,
  index,
  total,
  highlightColor,
}: {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  highlightColor: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(
    progress,
    [start, start + 0.01, end - 0.01, end],
    ["#333", highlightColor, highlightColor, "#fff"]
  );

  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      style={{ opacity, color }}
    >
      {word}
    </motion.span>
  );
}

// Dramatic split animation - each word goes different direction
interface SplitDramaticProps {
  children: string;
  className?: string;
  progress: MotionValue<number>;
}

const DIRECTIONS = [
  { x: -100, y: -50, rotate: -15 },
  { x: 100, y: -30, rotate: 10 },
  { x: -50, y: -80, rotate: -5 },
  { x: 80, y: -60, rotate: 20 },
];

export function SplitDramatic({
  children,
  className = "",
  progress,
}: SplitDramaticProps) {
  const words = children.split(" ");

  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <DramaticWord 
          key={i} 
          word={word} 
          index={i} 
          progress={progress} 
        />
      ))}
    </div>
  );
}

// Separate component for each word to properly use hooks
function DramaticWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const dir = DIRECTIONS[index % DIRECTIONS.length];

  const x = useTransform(progress, [0.3, 0.6], [0, dir.x]);
  const y = useTransform(progress, [0.3, 0.6], [0, dir.y]);
  const rotate = useTransform(progress, [0.3, 0.6], [0, dir.rotate]);
  const opacity = useTransform(progress, [0.3, 0.5, 0.6], [1, 0.5, 0]);
  const scale = useTransform(progress, [0.3, 0.6], [1, 0.8]);

  return (
    <motion.span
      className="inline-block mx-2"
      style={{ x, y, rotate, opacity, scale }}
    >
      {word}
    </motion.span>
  );
}

// Text scramble effect on hover
interface TextScrambleProps {
  children: string;
  className?: string;
}

export function TextScramble({ children, className = "" }: TextScrambleProps) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const ref = useRef<HTMLSpanElement>(null);
  const originalText = children;

  const scramble = () => {
    if (!ref.current) return;

    let iteration = 0;
    const interval = setInterval(() => {
      if (!ref.current) return;

      ref.current.innerText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const reset = () => {
    if (ref.current) {
      ref.current.innerText = originalText;
    }
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {children}
    </span>
  );
}
