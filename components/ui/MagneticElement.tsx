"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ============================================
// MAGNETIC HOOK (inline to avoid import issues)
// ============================================
function useMagneticEffect(strength: number = 0.4) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const element = ref.current;
    if (!element) return;

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

  return { ref, x: smoothX, y: smoothY, handleMouseMove, handleMouseLeave };
}

// ============================================
// MAGNETIC ELEMENT
// ============================================
interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  cursorText?: string;
}

export function MagneticElement({
  children,
  className = "",
  strength = 0.4,
  as = "div",
  href,
  onClick,
  cursorText,
}: MagneticElementProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(strength);

  const props = {
    className,
    style: { x, y },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.15 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-cursor-hover": true,
    "data-cursor-text": cursorText,
  };

  if (as === "a" && href) {
    return (
      <motion.a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} {...props}>
        {children}
      </motion.a>
    );
  }

  if (as === "button" || onClick) {
    return (
      <motion.button ref={ref as React.RefObject<HTMLButtonElement>} onClick={onClick} {...props}>
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} {...props}>
      {children}
    </motion.div>
  );
}

// ============================================
// MAGNETIC BUTTON
// ============================================
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const element = href ? anchorRef.current : buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full overflow-hidden transition-colors";
  
  const variantStyles = {
    primary: "bg-[#00A651] text-black hover:bg-[#00D66B]",
    outline: "bg-transparent border border-white/20 text-white hover:border-white/40",
  };

  const content = (
    <motion.span 
      className="relative z-10 flex items-center gap-3"
      style={{ x: smoothX, y: smoothY }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}
        data-cursor-hover
        whileTap={{ scale: 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}
      data-cursor-hover
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </motion.button>
  );
}
