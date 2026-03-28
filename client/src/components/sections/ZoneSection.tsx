/**
 * Design: "Plomberie Méditerranéen"
 * Zone d'intervention with navy background and city cards (non-clickable)
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const zones = [
  { city: "Perpignan", code: "66000", time: "< 30 min", primary: true },
  { city: "Canet-en-Roussillon", code: "66140", time: "< 20 min" },
  { city: "Saint-Estève", code: "66240", time: "< 15 min" },
  { city: "Rivesaltes", code: "66600", time: "< 25 min" },
  { city: "Argelès-sur-Mer", code: "66700", time: "< 35 min" },
  { city: "Elne", code: "66200", time: "< 20 min" },
  { city: "Thuir", code: "66300", time: "< 25 min" },
  { city: "Saint-Cyprien", code: "66750", time: "< 25 min" },
];

export default function ZoneSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="zone" className="py-20 lg:py-28 bg-[#0A1628] relative overflow-hidden">
      {/* Circuit pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
              Où nous intervenons
            </p>
            <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Zone d'intervention
              <br />
              <span className="text-[#06b6d4]">Pyrénées-Orientales</span>
            </h2>
            <p className="text-gray-400 font-['Inter'] text-lg leading-relaxed mb-8">
              Nous intervenons dans tout le département 66, avec une priorité sur Perpignan et ses communes environnantes. Délai d'intervention garanti.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: "15+", label: "Communes couvertes" },
                { value: "< 1h", label: "Délai d'intervention" },
                { value: "7j/7", label: "Disponibilité" },
                { value: "66", label: "Département" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="font-['Montserrat'] font-black text-2xl text-[#06b6d4]">{value}</div>
                  <div className="text-gray-400 text-sm font-['Inter']">{label}</div>
                </div>
              ))}
            </div>

            <Link href="/villes">
              <div className="inline-flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-6 py-3 rounded-xl hover:bg-cyan-500 transition-colors cursor-pointer">
                Voir toutes les villes
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>

          {/* Right: City cards – non cliquables */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {zones.map((zone, index) => (
              <motion.div
                key={zone.city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 + index * 0.06, duration: 0.4 }}
                className={`rounded-xl p-4 border ${
                  zone.primary
                    ? "bg-[#06b6d4] border-[#06b6d4] text-[#0A1628]"
                    : "bg-white/5 border-white/10 text-white"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <MapPin size={16} className={zone.primary ? "text-[#0A1628] mt-0.5 shrink-0" : "text-[#06b6d4] mt-0.5 shrink-0"} />
                  <div>
                    <div className={`font-['Montserrat'] font-bold text-sm ${zone.primary ? "text-[#0A1628]" : "text-white"}`}>
                      {zone.city}
                    </div>
                    <div className={`text-xs ${zone.primary ? "text-[#0A1628]/70" : "text-gray-500"}`}>
                      {zone.code}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-xs ${zone.primary ? "text-[#0A1628]/80" : "text-gray-400"}`}>
                  <Clock size={12} />
                  <span>{zone.time}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
