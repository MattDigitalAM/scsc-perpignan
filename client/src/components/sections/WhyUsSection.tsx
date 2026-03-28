/**
 * WhyUsSection – Pourquoi nous choisir
 * Design: "Plomberie Méditerranéen"
 * Updated: animated counters on scroll + responsive optimizations
 */
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, FileCheck, ShieldCheck, Star, Users, Zap, Award } from "lucide-react";

// Compteur animé
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  isActive,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.round(easedProgress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isActive, target, duration]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

const reasons = [
  {
    icon: Clock,
    title: "Intervention rapide sous 2h",
    description:
      "Disponible 7 jours sur 7, nous intervenons en urgence dans les 2 heures suivant votre appel. Votre confort et votre sécurité sont notre priorité.",
    stat: "2h",
    statLabel: "Délai d'intervention",
  },
  {
    icon: FileCheck,
    title: "Devis gratuit & transparent",
    description:
      "Nous vous fournissons un devis détaillé et gratuit avant tout travaux. Pas de mauvaises surprises : le prix annoncé est le prix final.",
    stat: "0€",
    statLabel: "Coût du devis",
  },
  {
    icon: ShieldCheck,
    title: "Artisan certifié RGE & assuré",
    description:
      "Certification RGE (Reconnu Garant de l'Environnement), assurance décennale et responsabilité civile professionnelle. Travaux garantis.",
    stat: "10 ans",
    statLabel: "Garantie décennale",
  },
];

// Statistiques avec compteurs animés
const stats = [
  { icon: Star, target: 127, suffix: "+", label: "Avis 5 étoiles", prefix: "" },
  { icon: Users, target: 2500, suffix: "+", label: "Clients satisfaits", prefix: "" },
  { icon: Zap, target: 15, suffix: " ans", label: "D'expérience", prefix: "" },
  { icon: Award, target: 98, suffix: "%", label: "Taux de satisfaction", prefix: "" },
];

export default function WhyUsSection() {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
            Nos engagements
          </p>
          <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-4">
            Pourquoi nous{" "}
            <span className="relative inline-block">
              choisir ?
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
            </span>
          </h2>
          <p className="text-gray-500 font-['Inter'] text-lg max-w-2xl mx-auto mt-6">
            Plus de 15 ans d'expérience au service des particuliers et professionnels de Perpignan et des Pyrénées-Orientales.
          </p>
        </motion.div>

        {/* Compteurs animés – section waouh */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                className="bg-[#0A1628] rounded-2xl p-5 sm:p-6 text-center group hover:bg-[#06b6d4] transition-colors duration-300"
              >
                <Icon
                  size={28}
                  className="text-[#06b6d4] group-hover:text-[#0A1628] mx-auto mb-3 transition-colors duration-300"
                />
                <div className="font-['Montserrat'] font-black text-3xl sm:text-4xl text-white group-hover:text-[#0A1628] transition-colors duration-300 leading-none mb-1">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isActive={statsInView}
                    duration={1800 + index * 200}
                  />
                </div>
                <div className="text-gray-400 group-hover:text-[#0A1628]/70 font-['Inter'] text-xs sm:text-sm transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group text-center"
              >
                {/* Icon circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-[#0A1628] rounded-2xl flex items-center justify-center group-hover:bg-[#06b6d4] transition-colors duration-300">
                    <Icon size={36} className="text-[#06b6d4] group-hover:text-[#0A1628] transition-colors duration-300" />
                  </div>
                  {/* Stat badge */}
                  <div className="absolute -top-2 -right-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-black text-xs px-2 py-1 rounded-lg">
                    {reason.stat}
                  </div>
                </div>

                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0A1628] mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-500 font-['Inter'] text-sm leading-relaxed">
                  {reason.description}
                </p>

                {/* Stat label */}
                <div className="mt-4 inline-flex items-center gap-2 bg-[#F4F5F7] rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 bg-[#06b6d4] rounded-full" />
                  <span className="text-[#0A1628] font-['Montserrat'] font-semibold text-xs">
                    {reason.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-[#0A1628] rounded-2xl p-8 lg:p-12 text-center"
        >
          <h3 className="font-['Montserrat'] font-black text-2xl lg:text-3xl text-white mb-3">
            Besoin d'un plombier à Perpignan ?
          </h3>
          <p className="text-gray-400 font-['Inter'] mb-6">
            Contactez-nous dès maintenant pour un devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3 rounded-xl hover:bg-cyan-500 transition-colors"
            >
              Demander un devis gratuit
            </a>
            <a
              href="tel:+33468000000"
              className="border-2 border-white/20 text-white font-['Montserrat'] font-semibold px-8 py-3 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors"
            >
              04 68 XX XX XX
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
