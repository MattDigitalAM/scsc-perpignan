/**
 * TypewriterText – Effet machine à écrire avec curseur clignotant
 * Design: "Plomberie Méditerranéen" – Le Plombier du 66
 * Cycle à travers plusieurs phrases avec effacement et réécriture
 */
import { useEffect, useState, useRef } from "react";

interface TypewriterTextProps {
  phrases: string[];
  typingSpeed?: number;   // ms par caractère
  erasingSpeed?: number;  // ms par caractère effacé
  pauseAfterType?: number; // ms de pause après écriture complète
  pauseAfterErase?: number; // ms de pause après effacement
  className?: string;
}

export default function TypewriterText({
  phrases,
  typingSpeed = 65,
  erasingSpeed = 35,
  pauseAfterType = 2200,
  pauseAfterErase = 400,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing" | "waiting">("typing");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const tick = () => {
      if (phase === "typing") {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, typingSpeed + Math.random() * 30);
        } else {
          setPhase("pausing");
          timeoutRef.current = setTimeout(() => setPhase("erasing"), pauseAfterType);
        }
      } else if (phase === "erasing") {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(tick, erasingSpeed);
        } else {
          setPhase("waiting");
          timeoutRef.current = setTimeout(() => {
            setPhraseIndex((i) => (i + 1) % phrases.length);
            setPhase("typing");
          }, pauseAfterErase);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 50);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, phase, phraseIndex, phrases, typingSpeed, erasingSpeed, pauseAfterType, pauseAfterErase]);

  return (
    <span className={className}>
      {displayText}
      {/* Curseur clignotant style éclair */}
      <span
        className="inline-block w-0.5 h-[1em] bg-[#06b6d4] ml-1 align-middle"
        style={{
          animation: "blink-cursor 0.8s step-end infinite",
          boxShadow: "0 0 8px #06b6d4, 0 0 16px #06b6d4",
        }}
      />
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
