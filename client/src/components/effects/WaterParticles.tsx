/**
 * WaterParticles – Bulles et particules aquatiques pour le fond du Hero
 * Design: "Premium Local" – Le Plombier du 66
 * Effet : bulles translucides, ondulations et nœuds aquatiques qui flottent
 */
import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
  type: "bubble" | "node";
  opacity: number;
}

interface WaterParticlesProps {
  count?: number;
  className?: string;
}

export default function WaterParticles({ count = 40, className = "" }: WaterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Réduire les particules sur mobile pour les performances
    const isMobile = window.innerWidth < 768;
    const effectiveCount = isMobile ? Math.floor(count * 0.4) : count;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Pause animation quand hors viewport (Intersection Observer)
    const observer = new IntersectionObserver(
      (entries) => { isVisibleRef.current = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNodes();
    };

    const initNodes = () => {
      nodesRef.current = Array.from({ length: effectiveCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.2, // Tendance à monter (bulles)
        size: 1 + Math.random() * 4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        type: Math.random() > 0.6 ? "bubble" : "node",
        opacity: 0.2 + Math.random() * 0.5,
      }));
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const animate = () => {
      // Pause quand hors viewport pour économiser le CPU
      if (!isVisibleRef.current) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      timeRef.current += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Mettre à jour les positions
      for (const node of nodes) {
        node.x += node.vx + Math.sin(timeRef.current + node.pulse) * 0.1; // Léger balancement
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Réapparaître en bas quand sort par le haut
        if (node.x < 0) { node.x = canvas.width; }
        if (node.x > canvas.width) { node.x = 0; }
        if (node.y < -20) { node.y = canvas.height + 20; }
        if (node.y > canvas.height + 20) { node.y = -20; }
      }

      // Dessiner les connexions (liens fluides) entre nœuds proches
      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dessiner les bulles et nœuds
      for (const node of nodes) {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.2;
        const alpha = node.opacity * (0.8 + Math.sin(node.pulse) * 0.2);

        if (node.type === "node") {
          // Nœud aquatique avec halo
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * 2 * pulseScale
          );
          gradient.addColorStop(0, `rgba(103, 232, 249, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 2 * pulseScale, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Bulle d'air
          const s = node.size * pulseScale;
          ctx.beginPath();
          ctx.arc(node.x, node.y, s, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.8})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Reflet sur la bulle
          ctx.beginPath();
          ctx.arc(node.x - s * 0.3, node.y - s * 0.3, s * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}