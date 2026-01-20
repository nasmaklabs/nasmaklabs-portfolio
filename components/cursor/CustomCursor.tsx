"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main cursor - snappy
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Diamond follower - smooth
  const diamondConfig = { damping: 20, stiffness: 150 };
  const diamondXSpring = useSpring(cursorX, diamondConfig);
  const diamondYSpring = useSpring(cursorY, diamondConfig);

  // Outer ring - very smooth
  const ringConfig = { damping: 15, stiffness: 80 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  // Rotation based on movement
  const rotation = useTransform(
    [cursorXSpring, diamondXSpring],
    ([x, dx]: number[]) => (x - dx) * 2
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hover]")) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Background glow for "N" */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 32 : 20,
            height: isHovering ? 32 : 20,
            backgroundColor: isHovering ? "#00A651" : "rgba(0, 166, 81, 0.2)",
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ 
            boxShadow: isHovering ? "0 0 20px #00A651" : "0 0 10px rgba(0, 166, 81, 0.5)",
          }}
        />
      </motion.div>

      {/* Trailing diamond */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: diamondXSpring,
          y: diamondYSpring,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isVisible ? 0.6 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M12 2L22 12L12 22L2 12L12 2Z" 
              stroke="#00A651"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Outer hexagon ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.8 : 1,
            rotate: isHovering ? 90 : 0,
            opacity: isVisible ? (isHovering ? 0.8 : 0.3) : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path 
              d="M24 4L42 14V34L24 44L6 34V14L24 4Z" 
              stroke="#00A651"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <path 
              d="M24 4L24 44M6 14L42 34M42 14L6 34" 
              stroke="#00A651"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* "N" letter - always visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.span
          className="font-black text-xs select-none"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
            opacity: isVisible ? 1 : 0,
            color: isHovering ? "#000" : "#00A651",
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            filter: isHovering ? "none" : "drop-shadow(0 0 4px #00A651)",
            textShadow: isHovering ? "none" : "0 0 8px #00A651",
          }}
        >
          N
        </motion.span>
      </motion.div>

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9995]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="rounded-full border border-[#00A651]"
            initial={{ width: 10, height: 10, opacity: 1 }}
            animate={{ width: 60, height: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </>
  );
}
