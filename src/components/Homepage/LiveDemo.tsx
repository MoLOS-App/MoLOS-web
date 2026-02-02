import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import {
  CheckCircle2,
  Layout,
  Utensils,
  Wallet,
  Target,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeInVariants,
  staggerContainerVariants,
  slideInLeftVariants,
} from "../../theme/motion";

import styles from "../../pages/index.module.css";

// --- Constants & Types ---
const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
const NODE_RADIUS = isMobile ? 140 : 220; // Responsive radius
const HUB_SIZE = isMobile ? 60 : 90; // Responsive hub size
const NODE_SIZE = isMobile ? 50 : 70; // Responsive node size
const PARTICLE_COUNT = isMobile ? 15 : 30; // Responsive particle count

interface NodeState {
  id: string;
  label: string;
  angle: number;
  x: number;
  y: number;
  icon: React.ElementType;
  hoverTransition: number; // 0 to 1, for smooth transitions
}

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  const state = useRef({
    hub: { x: 0, y: 0, targetX: 0, targetY: 0 },
    nodes: [] as NodeState[],
    particles: [] as any[],
    isDragging: false,
    draggedNode: null as any,
    hoveredNode: null as any,
    dashOffset: 0,
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    animationTime: 0,
  });

  useEffect(() => {
    const moduleConfigs = [
      { id: "tasks", label: "Tasks", angle: 0, icon: Layout },
      { id: "meals", label: "Meals", angle: 72, icon: Utensils },
      { id: "finance", label: "Finance", angle: 144, icon: Wallet },
      { id: "goals", label: "Goals", angle: 216, icon: Target },
      { id: "health", label: "Health", angle: 288, icon: HeartPulse },
    ];

    state.current.nodes = moduleConfigs.map((config) => ({
      ...config,
      x: 0,
      y: 0,
      hoverTransition: 0,
    }));

    state.current.particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5,
    }));

    // Load logo image
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      logoImageRef.current = logoImg;
    };
    logoImg.src = "/img/brand/logo_1024-removebg-preview.png";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dpr = window.devicePixelRatio || 1;
      state.current.width = rect.width;
      state.current.height = rect.height;
      state.current.centerX = rect.width / 2;
      state.current.centerY = rect.height / 2;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      state.current.hub.x = state.current.centerX;
      state.current.hub.y = state.current.centerY;
      state.current.hub.targetX = state.current.centerX;
      state.current.hub.targetY = state.current.centerY;

      state.current.nodes.forEach((node) => {
        const rad = (node.angle - 90) * (Math.PI / 180);
        node.x = state.current.centerX + Math.cos(rad) * NODE_RADIUS;
        node.y = state.current.centerY + Math.sin(rad) * NODE_RADIUS;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, state.current.width, state.current.height);

      // Update animation time
      state.current.animationTime += 0.02;

      const { hub, nodes, particles } = state.current;
      const ease = 0.15;

      if (!state.current.isDragging) {
        hub.x += (hub.targetX - hub.x) * ease;
        hub.y += (hub.targetY - hub.y) * ease;
      }

      particles.forEach((p) => {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        ctx.beginPath();
        ctx.arc(
          p.x * state.current.width,
          p.y * state.current.height,
          p.size,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(0, 163, 255, ${p.alpha})`;
        ctx.fill();
      });

      state.current.dashOffset -= 0.5;
      nodes.forEach((node) => {
        if (state.current.draggedNode !== node) {
          const rad = (node.angle - 90) * (Math.PI / 180);
          const tx = hub.x + Math.cos(rad) * NODE_RADIUS;
          const ty = hub.y + Math.sin(rad) * NODE_RADIUS;
          node.x += (tx - node.x) * ease;
          node.y += (ty - node.y) * ease;
        }

        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(node.x, node.y);
        ctx.setLineDash([5, 5]);
        ctx.lineDashOffset = state.current.dashOffset;
        ctx.strokeStyle = "rgba(0, 163, 255, 0.3)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Hub
      ctx.save();
      ctx.translate(hub.x, hub.y);
      ctx.beginPath();
      ctx.roundRect(-HUB_SIZE / 2, -HUB_SIZE / 2, HUB_SIZE, HUB_SIZE, 22);
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 163, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Hub Logo
      if (logoImageRef.current) {
        const logoSize = HUB_SIZE * 0.7; // 70% of hub size
        ctx.drawImage(
          logoImageRef.current,
          -logoSize / 2,
          -logoSize / 2,
          logoSize,
          logoSize,
        );
      } else {
        // Fallback text while image loads
        ctx.fillStyle = "rgba(0, 163, 255, 0.8)";
        ctx.font = "bold 14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("MOLOS", 0, 5);
      }
      ctx.restore();

      // Nodes
      nodes.forEach((node, index) => {
        // Update hover transition smoothly
        const targetTransition = state.current.hoveredNode === node ? 1 : 0;
        node.hoverTransition += (targetTransition - node.hoverTransition) * 0.1;

        // Add floating effect
        const floatOffset =
          Math.sin(state.current.animationTime + index * 0.5) * 3;
        const currentX = node.x;
        const currentY = node.y - floatOffset; // Float up and down

        ctx.save();
        ctx.translate(currentX, currentY);

        // Node Box with smooth color transitions
        const t = node.hoverTransition;
        const normalBg = "rgba(255, 255, 255, 0.05)";
        const hoverBg = "var(--ifm-color-primary)";
        const normalStroke = "rgba(0, 163, 255, 0.4)";
        const hoverStroke = "var(--ifm-color-primary)";

        // Interpolate colors based on transition value
        const bgColor = t >= 0.5 ? hoverBg : normalBg;
        const strokeColor = t >= 0.5 ? hoverStroke : normalStroke;
        const strokeWidth = 1.5 + t * 0.5; // 1.5 to 2.0

        ctx.beginPath();
        ctx.roundRect(-NODE_SIZE / 2, -NODE_SIZE / 2, NODE_SIZE, NODE_SIZE, 18);
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();

        // Draw Icon (Lucide) - using actual SVG paths
        ctx.save();
        ctx.translate(0, -5);
        ctx.scale(1.1, 1.1);
        ctx.strokeStyle =
          t >= 0.5 ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 163, 255, 0.95)";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw actual Lucide icon paths
        switch (node.id) {
          case "tasks":
            // Layout icon - grid layout
            ctx.strokeRect(-10, -10, 7, 7);
            ctx.strokeRect(-10, -1, 7, 7);
            ctx.strokeRect(-1, -10, 7, 7);
            ctx.strokeRect(-1, -1, 7, 7);
            ctx.beginPath();
            ctx.moveTo(8, -8);
            ctx.lineTo(12, -8);
            ctx.lineTo(12, -4);
            ctx.stroke();
            break;
          case "meals":
            // Utensils icon - fork and spoon
            ctx.beginPath();
            ctx.moveTo(-8, -12);
            ctx.lineTo(-8, 8);
            ctx.moveTo(-4, -12);
            ctx.lineTo(-4, 8);
            ctx.moveTo(0, -12);
            ctx.lineTo(0, 8);
            ctx.moveTo(4, -12);
            ctx.lineTo(4, 8);
            ctx.stroke();
            // Spoon bowl
            ctx.beginPath();
            ctx.arc(8, 6, 4, Math.PI, 0);
            ctx.stroke();
            break;
          case "finance":
            // Wallet icon
            ctx.strokeRect(-12, -8, 24, 16);
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(12, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(8, 0, 3, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case "goals":
            // Target icon
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(12, 0);
            ctx.moveTo(0, -12);
            ctx.lineTo(0, 12);
            ctx.stroke();
            break;
          case "health":
            // HeartPulse icon - simplified EKG style
            ctx.beginPath();
            ctx.moveTo(-12, 0);
            ctx.lineTo(-8, 0);
            ctx.lineTo(-6, -6);
            ctx.lineTo(-4, 6);
            ctx.lineTo(-2, 0);
            ctx.lineTo(2, 0);
            ctx.lineTo(4, -4);
            ctx.lineTo(6, 0);
            ctx.lineTo(12, 0);
            ctx.stroke();
            break;
        }
        ctx.restore();

        ctx.fillStyle =
          t >= 0.5 ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 163, 255, 0.9)";
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label.toUpperCase(), 0, NODE_SIZE / 2 + 18);
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const distHub = Math.hypot(
      x - state.current.hub.x,
      y - state.current.hub.y,
    );
    if (distHub < HUB_SIZE / 2) {
      state.current.isDragging = true;
      state.current.draggedNode = state.current.hub;
      return;
    }

    for (const node of state.current.nodes) {
      const dist = Math.hypot(x - node.x, y - node.y);
      if (dist < NODE_SIZE / 2) {
        state.current.isDragging = true;
        state.current.draggedNode = node;
        return;
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Update hover state
    let hoveredNode = null;
    for (const node of state.current.nodes) {
      const floatOffset =
        Math.sin(
          state.current.animationTime + state.current.nodes.indexOf(node) * 0.5,
        ) * 3;
      const nodeY = node.y - floatOffset;
      const dist = Math.hypot(x - node.x, y - nodeY);
      if (dist < NODE_SIZE / 2) {
        hoveredNode = node;
        break;
      }
    }
    state.current.hoveredNode = hoveredNode;

    // Handle dragging
    if (!state.current.isDragging || !state.current.draggedNode) return;

    const clampedX = Math.max(NODE_SIZE, Math.min(rect.width - NODE_SIZE, x));
    const clampedY = Math.max(NODE_SIZE, Math.min(rect.height - NODE_SIZE, y));

    state.current.draggedNode.x = clampedX;
    state.current.draggedNode.y = clampedY;

    if (state.current.draggedNode === state.current.hub) {
      state.current.hub.targetX = clampedX;
      state.current.hub.targetY = clampedY;
    }
  };

  const handleMouseUp = () => {
    state.current.isDragging = false;
    state.current.draggedNode = null;
  };

  const handleMouseLeave = () => {
    state.current.hoveredNode = null;
    state.current.isDragging = false;
    state.current.draggedNode = null;
  };

  return (
    <div className="container padding-vert--xl">
      <motion.div
        className={styles.splitSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className={styles.splitContent}
          variants={slideInLeftVariants}
        >
          <Heading as="h2">Modular by Design</Heading>
          <p
            style={{
              fontSize: "1.2rem",
              color: "var(--ifm-color-emphasis-700)",
              marginBottom: "2rem",
            }}
          >
            Every MoLOS module works independently but integrates seamlessly.
            <strong> Add new modules</strong> without touching existing code.
          </p>
          <motion.ul
            style={{ lineHeight: "2.5", listStyle: "none", padding: 0 }}
            variants={staggerContainerVariants}
          >
            {[
              { label: "UI:", text: "Modern stack, fast builds." },
              { label: "Database:", text: "Your data stored locally." },
              { label: "Integrations:", text: "API endpoints enabled." },
            ].map((item, i) => (
              <motion.li
                key={i}
                style={{ display: "flex", alignItems: "center" }}
                variants={fadeInVariants}
              >
                <CheckCircle2
                  size={18}
                  color="var(--ifm-color-primary)"
                  className="margin-right--sm"
                />
                <b style={{ marginRight: "4px" }}>{item.label}</b> {item.text}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeInVariants}>
            <Link
              className={clsx(styles.primaryButton, "margin-top--lg")}
              style={{ display: "inline-block" }}
              to="/docs/module-development"
            >
              Learn Architecture →
            </Link>
          </motion.div>
        </motion.div>

        <div
          className={styles.splitVisual}
          ref={containerRef}
          style={{ minHeight: "600px", flex: 2 }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{
              cursor: "grab",
              display: "block",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default LiveDemo;
