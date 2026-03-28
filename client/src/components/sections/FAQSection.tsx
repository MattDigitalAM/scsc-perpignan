/**
 * Design: "Plomberie Méditerranéen"
 * FAQ accordion with smooth animations
 */
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Combien coûte un plombier à Perpignan ?",
    answer:
      "Le tarif horaire d'un plombier à Perpignan varie entre 50€ et 90€ HT selon la nature des travaux. Pour un dépannage d'urgence, comptez entre 80€ et 150€ HT. Nous proposons toujours un devis gratuit et détaillé avant toute intervention, sans mauvaise surprise.",
  },
  {
    question: "Intervenez-vous en urgence le week-end ?",
    answer:
      "Oui, nous intervenons 7 jours sur 7, y compris les week-ends et jours fériés pour les urgences plomberies. Notre délai d'intervention est généralement inférieur à 2 heures dans Perpignan et les communes environnantes. Appelez-nous directement au 04 68 XX XX XX.",
  },
  {
    question: "Êtes-vous certifié RGE ?",
    answer:
      "Oui, nous sommes certifiés RGE (Reconnu Garant de l'Environnement), ce qui vous permet de bénéficier des aides de l'État pour vos travaux d'économies d'énergie (installation de bornes IRVE, rénovation salle de bain, etc.). Cette certification est délivrée par Qualifelec et renouvelée régulièrement.",
  },
  {
    question: "Quelle est la durée d'une recherche de fuite ?",
    answer:
      "La durée d'une recherche de fuite plomberie dépend de la superficie et de l'état de l'installation. Pour un appartement de 60m², comptez 1 à 2 jours. Pour une maison de 150m², prévoir 2 à 4 jours. Nous réalisons d'abord un diagnostic complet avant de vous remettre un devis précis.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons à votre domicile ou sur votre chantier pour évaluer les travaux et vous remettre un devis détaillé sous 24h. Le devis est valable 30 jours.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-['Montserrat'] font-semibold text-[#0A1628] text-base pr-4">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-[#06b6d4]" : "bg-[#F4F5F7]"}`}>
          {isOpen ? (
            <Minus size={16} className="text-[#0A1628]" />
          ) : (
            <Plus size={16} className="text-[#0A1628]" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 bg-white">
              <div className="w-12 h-0.5 bg-[#06b6d4] mb-4" />
              <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 lg:py-28 bg-[#F4F5F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
              Questions fréquentes
            </p>
            <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-6 leading-tight">
              Vous avez des{" "}
              <span className="relative inline-block">
                questions ?
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
              </span>
            </h2>
            <p className="text-gray-500 font-['Inter'] text-lg leading-relaxed mb-8">
              Retrouvez les réponses aux questions les plus fréquentes sur nos services d'plomberie à Perpignan.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#0A1628] text-white font-['Montserrat'] font-bold px-6 py-3 rounded-xl hover:bg-[#0F1E35] transition-colors"
            >
              Poser une question
            </a>
          </motion.div>

          {/* Right: FAQ items */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
