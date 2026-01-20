"use client";

import { motion } from "framer-motion";

// Deterministic pseudo-random based on seed - rounded to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

// Floating particles that connect - Neural network style
export function NeuralBackground({ color = "#00A651" }: { color?: string }) {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: seededRandom(i * 1.1) * 100,
    y: seededRandom(i * 2.2) * 100,
    size: seededRandom(i * 3.3) * 3 + 1,
    duration: seededRandom(i * 4.4) * 20 + 15,
    delay: seededRandom(i * 5.5) * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines */}
        {particles.slice(0, 15).map((p, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${p.x}%`}
            y1={`${p.y}%`}
            x2={`${particles[(i + 5) % particles.length].x}%`}
            y2={`${particles[(i + 5) % particles.length].y}%`}
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </svg>
      
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: color,
          }}
          animate={{
            x: [0, seededRandom(p.id * 10) * 100 - 50, 0],
            y: [0, seededRandom(p.id * 20) * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Circuit board pattern with glowing traces
export function CircuitBackground({ color = "#8B5CF6" }: { color?: string }) {
  const paths = [
    "M0,50 L30,50 L30,20 L60,20 L60,80 L100,80",
    "M0,30 L20,30 L20,70 L50,70 L50,40 L80,40 L80,90 L100,90",
    "M0,70 L40,70 L40,10 L70,10 L70,60 L100,60",
    "M0,90 L25,90 L25,50 L55,50 L55,30 L85,30 L85,70 L100,70",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <g key={i}>
            {/* Base line */}
            <path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeOpacity="0.2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated glow */}
            <motion.path
              d={d}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeOpacity="0.8"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: 0.2, pathOffset: [0, 1] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.8,
              }}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Matrix-style data rain
export function DataRainBackground({ color = "#0EA5E9" }: { color?: string }) {
  const columns = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i / 20) * 100,
    duration: seededRandom(i * 1.5) * 10 + 8,
    delay: seededRandom(i * 2.5) * 5,
    chars: Array.from({ length: 15 }, (_, j) => 
      seededRandom(i * 100 + j) > 0.5 ? Math.floor(seededRandom(i * 100 + j + 50) * 2) : String.fromCharCode(65 + Math.floor(seededRandom(i * 100 + j + 100) * 26))
    ),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {columns.map((col) => (
        <motion.div
          key={col.id}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${col.x}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{
            duration: col.duration,
            repeat: Infinity,
            ease: "linear",
            delay: col.delay,
          }}
        >
          {col.chars.map((char, i) => (
            <span
              key={i}
              className="font-mono text-xs leading-tight"
              style={{
                color,
                opacity: 1 - i * 0.06,
                textShadow: i === 0 ? `0 0 10px ${color}` : "none",
              }}
            >
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Hex grid with pulsing cells
export function HexGridBackground({ color = "#F59E0B" }: { color?: string }) {
  const hexes = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i % 6) * 18 + (Math.floor(i / 6) % 2) * 9,
    y: Math.floor(i / 6) * 16,
    delay: seededRandom(i * 1.7) * 3,
    duration: seededRandom(i * 2.7) * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {hexes.map((hex) => (
          <motion.polygon
            key={hex.id}
            points="5,0 10,3 10,9 5,12 0,9 0,3"
            fill="none"
            stroke={color}
            strokeWidth="0.3"
            transform={`translate(${hex.x}, ${hex.y})`}
            initial={{ opacity: 0.1, fill: `${color}00` }}
            animate={{ 
              opacity: [0.1, 0.5, 0.1],
              fill: [`${color}05`, `${color}20`, `${color}05`],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              delay: hex.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Floating geometric shapes - fixed positions
export function GeometricBackground({ color = "#00A651" }: { color?: string }) {
  const shapes = [
    { id: 0, type: "circle", x: 15, y: 20, size: 45, rotation: 0, duration: 25 },
    { id: 1, type: "square", x: 75, y: 15, size: 35, rotation: 45, duration: 30 },
    { id: 2, type: "triangle", x: 25, y: 70, size: 40, rotation: 0, duration: 28 },
    { id: 3, type: "diamond", x: 85, y: 60, size: 30, rotation: 0, duration: 22 },
    { id: 4, type: "circle", x: 50, y: 40, size: 55, rotation: 0, duration: 35 },
    { id: 5, type: "square", x: 10, y: 85, size: 25, rotation: 30, duration: 27 },
    { id: 6, type: "triangle", x: 60, y: 80, size: 35, rotation: 0, duration: 32 },
    { id: 7, type: "diamond", x: 40, y: 10, size: 40, rotation: 0, duration: 24 },
    { id: 8, type: "circle", x: 90, y: 35, size: 30, rotation: 0, duration: 29 },
    { id: 9, type: "square", x: 5, y: 50, size: 45, rotation: 15, duration: 26 },
    { id: 10, type: "triangle", x: 70, y: 45, size: 50, rotation: 0, duration: 31 },
    { id: 11, type: "diamond", x: 30, y: 55, size: 35, rotation: 0, duration: 23 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            x: [0, 30 - shape.id * 5, 0],
            y: [0, 20 - shape.id * 3, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full border" style={{ borderColor: color }} />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full border" style={{ borderColor: color }} />
          )}
          {shape.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon 
                points="50,10 90,90 10,90" 
                fill="none" 
                stroke={color} 
                strokeWidth="2"
              />
            </svg>
          )}
          {shape.type === "diamond" && (
            <div 
              className="w-full h-full border rotate-45" 
              style={{ borderColor: color }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Glowing orbs with blur
export function OrbsBackground({ color = "#00A651", secondaryColor = "#8B5CF6" }: { color?: string; secondaryColor?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: "blur(80px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${secondaryColor}30 0%, transparent 70%)`,
          filter: "blur(60px)",
          bottom: "-10%",
          right: "-10%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -120, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Accent orb */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          filter: "blur(40px)",
          top: "40%",
          left: "50%",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
