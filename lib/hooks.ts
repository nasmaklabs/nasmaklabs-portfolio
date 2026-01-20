"use client";

import { useRef, useEffect, useState, RefObject } from "react";
import { useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";

// ============================================
// SCROLL PIN HOOK
// Pin a section and track progress through it
// ============================================
export function useScrollPin(scrollLength: number = 1) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress through the pinned section (0 to 1)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Smooth progress with spring
  const smoothProgress = useSpring(progress, { 
    stiffness: 100, 
    damping: 30,
    restDelta: 0.001 
  });

  return {
    containerRef,
    progress,
    smoothProgress,
    scrollYProgress,
    // Height multiplier for the container (e.g., 2 = 200vh of scroll space)
    scrollLength,
  };
}

// ============================================
// HORIZONTAL SCROLL HOOK  
// Convert vertical scroll to horizontal movement
// ============================================
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate total scroll width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (scrollerRef.current) {
        const width = scrollerRef.current.scrollWidth - window.innerWidth;
        setScrollWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Transform vertical progress to horizontal position
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);
  
  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return {
    containerRef,
    scrollerRef,
    x: smoothX,
    progress: scrollYProgress,
    scrollWidth,
  };
}

// ============================================
// PARALLAX HOOK
// Create parallax movement for elements
// ============================================
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5,
  direction: "up" | "down" = "up"
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [speed * 100 * multiplier, speed * -100 * multiplier]
  );

  return { y, progress: scrollYProgress };
}

// ============================================
// SMOOTH MOUSE POSITION
// Track mouse with spring smoothing
// ============================================
export function useSmoothMouse(stiffness = 150, damping = 15) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness, damping });
  const smoothY = useSpring(mouseY, { stiffness, damping });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { x: smoothX, y: smoothY, rawX: mouseX, rawY: mouseY };
}

// ============================================
// MAGNETIC ELEMENT HOOK
// Strong magnetic pull effect for buttons/links
// ============================================
export function useMagnetic(strength: number = 0.4) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, x, y]);

  return { ref, x: smoothX, y: smoothY };
}

// ============================================
// SCROLL VELOCITY HOOK
// Track scroll direction and speed
// ============================================
export function useScrollVelocity() {
  const { scrollY } = useScroll();
  const [velocity, setVelocity] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const diff = latest - prevScrollY.current;
      setVelocity(Math.abs(diff));
      setDirection(diff > 0 ? "down" : diff < 0 ? "up" : null);
      prevScrollY.current = latest;
    });

    return () => unsubscribe();
  }, [scrollY]);

  return { velocity, direction, scrollY };
}

// ============================================
// ELEMENT IN VIEW PROGRESS
// Track how much of an element is visible
// ============================================
export function useInViewProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 = element just entered viewport from bottom
  // 0.5 = element is centered in viewport  
  // 1 = element just left viewport from top
  return scrollYProgress;
}

// ============================================
// WINDOW SIZE HOOK
// ============================================
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
