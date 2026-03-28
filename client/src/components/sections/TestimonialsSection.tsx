/**
 * Design: "Plomberie Méditerranéen"
 * Google-style review cards with star ratings
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie-Claire Dupont",
    city: "Perpignan",
    rating: 5,
    service: "Chauffe-eau",
    text: "Intervention très rapide suite à une panne totale chez moi. Le plombier est arrivé en moins d'une heure, a diagnostiqué le problème et remplacé mon vieux tableau en une demi-journée. Travail soigné, prix honnête. Je recommande vivement !",
    date: "Il y a 2 semaines",
  },
  {
    name: "Jean-Pierre Roca",
    city: "Canet-en-Roussillon",
    rating: 5,
    service: "Recherche de fuite",
    text: "Installation de ma borne de recharge pour ma Tesla. Devis reçu rapidement, travaux réalisés proprement. L'équipe a même géré les démarches pour l'aide CEE. Très professionnel, je suis ravi du résultat.",
    date: "Il y a 1 mois",
  },
  {
    name: "Sophie Martínez",
    city: "Saint-Estève",
    rating: 5,
    service: "Débouchage",
    text: "Débouchage de mon appartement avant vente. Rapport de diagnostic clair, travaux réalisés dans les délais annoncés. Le Assurance a été obtenu sans problème. Merci pour le sérieux et la réactivité !",
    date: "Il y a 3 semaines",
  },
  {
    name: "Robert Fontaine",
    city: "Thuir",
    rating: 5,
    service: "Débouchage de canalisations",
    text: "Installation de 10 rénovation salle de bain sur ma maison. Équipe compétente, travail impeccable. La production est conforme aux prévisions. En plus, ils ont géré le raccordement avec Enedis. Parfait !",
    date: "Il y a 2 mois",
  },
  {
    name: "Isabelle Vidal",
    city: "Rivesaltes",
    rating: 5,
    service: "Éclairage LED",
    text: "Remplacement de tous mes éclairages par des LED connectées. Le plombier a été de bon conseil pour le choix des produits. Installation soignée, le résultat est magnifique. Mes factures d'plomberie ont baissé de 40% !",
    date: "Il y a 5 semaines",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-[#06b6d4] fill-[#06b6d4]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
            Avis clients
          </p>
          <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-4">
            Ce que disent nos{" "}
            <span className="relative inline-block">
              clients
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
            </span>
          </h2>

          {/* Google rating summary */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-[#06b6d4] fill-[#06b6d4]" />
              ))}
            </div>
            <span className="font-['Montserrat'] font-black text-2xl text-[#0A1628]">5.0</span>
            <span className="text-gray-500 font-['Inter']">· 47 avis Google</span>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-[#06b6d4] mb-4" />

              {/* Review text */}
              <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0A1628] rounded-full flex items-center justify-center text-white font-['Montserrat'] font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-['Montserrat'] font-semibold text-[#0A1628] text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">{testimonial.city}</div>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={testimonial.rating} />
                  <div className="text-xs text-gray-400 mt-1">{testimonial.date}</div>
                </div>
              </div>

              {/* Service badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-['Inter']">Service : </span>
                <span className="text-xs font-['Montserrat'] font-semibold text-[#0A1628]">
                  {testimonial.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-32">
          {testimonials.slice(3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.12 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote size={24} className="text-[#06b6d4] mb-4" />
              <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0A1628] rounded-full flex items-center justify-center text-white font-['Montserrat'] font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-['Montserrat'] font-semibold text-[#0A1628] text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">{testimonial.city}</div>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating rating={testimonial.rating} />
                  <div className="text-xs text-gray-400 mt-1">{testimonial.date}</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400 font-['Inter']">Service : </span>
                <span className="text-xs font-['Montserrat'] font-semibold text-[#0A1628]">
                  {testimonial.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
