/**
 * PageTransition – Rideau plomberie cinématographique entre les pages
 * Design: "Plomberie Méditerranéen" – Le Plombier du 66
 * Effet : panneau navy qui entre/sort avec des éclairs jaunes et un logo
 */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Zap } from "lucide-react";

// Éclairs SVG aléatoires pour le rideau
function LightningBolt({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  const points = Array.from({ length: 8 }, (_, i) => {
    const py = (i / 7) * 100;
    const px = x + (i % 2 === 0 ? -8 : 8) + (Math.random() - 0.5) * 6;
    return `${px}%,${py}%`;
  });

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 1, 0] }}
      transition={{ delay, duration, repeat: Infinity, repeatDelay: duration * 2 }}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#06b6d4"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 3px #06b6d4)" }}
      />
    </motion.svg>
  );
}

// Variantes d'animation du rideau
const curtainVariants = {
  initial: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    opacity: 1,
  },
  enter: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
      delay: 0.1,
    },
  },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.25 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevLocationRef = useRef(location);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location === prevLocationRef.current) return;
    prevLocationRef.current = location;

    // Déclencher la transition
    setIsTransitioning(true);

    // Après l'entrée du rideau, changer le contenu
    if (transitionRef.current) clearTimeout(transitionRef.current);
    transitionRef.current = setTimeout(() => {
      setDisplayChildren(children);
      // Scroll vers le haut
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 400);

    // Retirer le rideau
    const exitTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);

    return () => {
      clearTimeout(exitTimer);
      if (transitionRef.current) clearTimeout(transitionRef.current);
    };
  }, [location, children]);

  // Mettre à jour le contenu si pas en transition
  useEffect(() => {
    if (!isTransitioning) {
      setDisplayChildren(children);
    }
  }, [children, isTransitioning]);

  const lightningBolts = [
    { x: 15, delay: 0.1, duration: 0.3 },
    { x: 35, delay: 0.05, duration: 0.25 },
    { x: 55, delay: 0.15, duration: 0.35 },
    { x: 75, delay: 0.08, duration: 0.28 },
    { x: 90, delay: 0.12, duration: 0.32 },
  ];

  return (
    <>
      {/* Contenu de la page */}
      <div>{displayChildren}</div>

      {/* Rideau de transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[10000] pointer-events-none"
            variants={curtainVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {/* Fond navy */}
            <div className="absolute inset-0 bg-[#0A1628]" />

            {/* Grille de points */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.5) 1px, transparent 0)`,
                backgroundSize: "30px 30px",
              }}
            />

            {/* Éclairs décoratifs */}
            {lightningBolts.map((bolt, i) => (
              <LightningBolt key={i} {...bolt} />
            ))}

            {/* Logo central animé */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={contentVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Icône éclair avec halo */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "radial-gradient(circle, rgba(245,197,24,0.4) 0%, transparent 70%)",
                      transform: "scale(2.5)",
                      filter: "blur(8px)",
                    }}
                  />
                  <div className="relative w-16 h-16 bg-[#06b6d4] rounded-2xl flex items-center justify-center shadow-2xl">
                    <Zap size={32} className="text-[#0A1628]" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Nom de la marque */}
                <div className="text-center">
                  <div className="font-['Montserrat'] font-black text-2xl text-white tracking-tight">
                    Élec<span className="text-[#06b6d4]">Pro</span>
                  </div>
                  <div className="text-gray-500 text-xs font-['Inter'] tracking-widest uppercase mt-1">
                    Perpignan 66
                  </div>
                </div>

                {/* Barre de chargement */}
                <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-[#06b6d4] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    style={{ boxShadow: "0 0 8px #06b6d4" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Lignes de scan horizontales */}
            {[0.2, 0.4, 0.6, 0.8].map((pos) => (
              <motion.div
                key={pos}
                className="absolute left-0 right-0 h-px"
                style={{ top: `${pos * 100}%`, background: "rgba(245,197,24,0.15)" }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, delay: pos * 0.1, repeat: Infinity }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
