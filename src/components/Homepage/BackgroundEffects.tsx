import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const BackgroundEffects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring physics for the parallax and glow
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number; size: number }>
  >([]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add to trail with varying sizes for more "organic" feel
      setTrail((prev) => {
        const newPoint = {
          x: e.clientX,
          y: e.clientY,
          id: Math.random(),
          size: Math.random() * 15 + 5,
        };
        return [newPoint, ...prev.slice(0, 15)];
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1, // Ensure it's behind all content
        overflow: "hidden",
      }}
    >
      {/* Dynamic Glow following mouse */}
      <motion.div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          left: -300,
          top: -300,
          x: smoothX,
          y: smoothY,
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 60 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            width: Math.random() * 8 + 2,
            height: Math.random() * 8 + 2,
            backgroundColor:
              i % 3 === 0
                ? "rgba(59, 130, 246, 0.4)"
                : i % 3 === 1
                  ? "rgba(147, 51, 234, 0.3)"
                  : "rgba(34, 197, 94, 0.2)",
            borderRadius: "50%",
            filter: "blur(1px)",
          }}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            x: [null, Math.random() * 100 + "%"],
            y: [null, Math.random() * 100 + "%"],
            scale: [1, 2, 1],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Cursor trail - More prominent */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          style={{
            position: "absolute",
            width: point.size * 1.5,
            height: point.size * 1.5,
            backgroundColor:
              index % 2 === 0
                ? "rgba(59, 130, 246, 0.6)"
                : "rgba(147, 51, 234, 0.5)",
            borderRadius: "50%",
            left: point.x,
            top: point.y,
            x: "-50%",
            y: "-50%",
            filter: "blur(4px)",
            boxShadow: `0 0 ${point.size}px rgba(59, 130, 246, 0.8)`,
          }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Parallax Grid/Shapes */}
      <motion.div
        style={{
          position: "absolute",
          width: "110%",
          height: "110%",
          left: "-5%",
          top: "-5%",
          backgroundImage:
            "radial-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          x: useSpring(mouseX, { damping: 50, stiffness: 10 }),
          y: useSpring(mouseY, { damping: 50, stiffness: 10 }),
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
