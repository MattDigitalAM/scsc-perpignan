/**
 * PlumbingCursor – Curseur personnalisé goutte d'eau avec traînée aquatique
 * Design: "Premium Local" – Le Plombier du 66
 * Effets : curseur goutte SVG, traînée de bulles, explosion d'eau au clic
 */
import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "trail" | "spark";
}

interface ClickSpark {
  id: number;
  x: number;
  y: number;
}

let particleId = 0;
let sparkId = 0;

export default function PlumbingCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastPosRef = useRef({ x: -200, y: -200 });
  const [clickSparks, setClickSparks] = useState<ClickSpark[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Détecter si c'est un appareil tactile
  const isTouchDevice = typeof window !== "undefined" &&
    (("ontouchstart" in window) || navigator.maxTouchPoints > 0);

  const addTrailParticle = useCallback((x: number, y: number) => {
    const count = 2;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        id: particleId++,
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        life: 1,
        maxLife: 0.4 + Math.random() * 0.4,
        size: 1.5 + Math.random() * 2.5,
        type: "trail",
      });
    }
    // Limiter le nombre de particules
    if (particlesRef.current.length > 80) {
      particlesRef.current = particlesRef.current.slice(-80);
    }
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const id = sparkId++;
    setClickSparks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    // Ajouter des particules d'explosion (gouttelettes)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      particlesRef.current.push({
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.3,
        size: 2 + Math.random() * 3,
        type: "spark",
      });
    }
    // Supprimer le spark après l'animation
    setTimeout(() => {
      setClickSparks((prev) => prev.filter((s) => s.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Ajouter des particules si la souris a bougé suffisamment
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 8) {
        addTrailParticle(e.clientX, e.clientY);
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }

      // Déplacer le curseur SVG
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("click", handleClick);

    // Boucle d'animation canvas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dt = 0.016; // ~60fps
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravité légère
        p.life -= dt / p.maxLife;

        const alpha = Math.max(0, p.life);
        const size = p.size * alpha;

        if (p.type === "trail") {
          // Particule traînée : bulle d'eau cyan/bleu
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
          gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.9})`);
          gradient.addColorStop(0.5, `rgba(103, 232, 249, ${alpha * 0.4})`);
          gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Gouttelette d'explosion
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.fill();

          // Point de lumière sur la gouttelette
          ctx.beginPath();
          ctx.arc(p.x - size * 0.2, p.y - size * 0.2, size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isTouchDevice, addTrailParticle, handleClick, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Canvas pour les particules */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Curseur SVG goutte */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        {/* Halo lumineux */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: 24,
            height: 24,
            background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
            transform: "scale(2.5)",
            filter: "blur(4px)",
          }}
        />
        {/* Goutte d'eau SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ filter: "drop-shadow(0 0 6px #06b6d4) drop-shadow(0 0 12px #06b6d4)" }}
        >
          <path
            d="M12 21.5c-4.142 0-7.5-3.358-7.5-7.5 0-4.142 7.5-12 7.5-12s7.5 7.858 7.5 12c0 4.142-3.358 7.5-7.5 7.5z"
            fill="#06b6d4"
            stroke="#fff"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Ondulations au clic */}
      {clickSparks.map((spark) => (
        <div
          key={spark.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: spark.x - 30,
            top: spark.y - 30,
            width: 60,
            height: 60,
          }}
        >
          {/* Anneau de propagation (onde) */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#06b6d4]"
            style={{
              animation: "water-ripple 0.6s ease-out forwards",
            }}
          />
          {/* Flash central aquatique */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "water-flash 0.3s ease-out forwards" }}
          >
            <div className="w-3 h-3 bg-white rounded-full" style={{ boxShadow: "0 0 12px #06b6d4, 0 0 24px #06b6d4" }} />
          </div>
        </div>
      ))}

      {/* Styles d'animation */}
      <style>{`
        @keyframes water-ripple {
          0% { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes water-flash {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        * { cursor: none !important; }
      `}</style>
    </>
  );
}