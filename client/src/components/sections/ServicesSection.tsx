/**
 * Design: "Plomberie Méditerranéen"
 * Services grid with navy icon circles and yellow accents
 * Updated with links to individual service pages
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import {
  Zap, Shield, AlertTriangle, LayoutGrid,
  Lightbulb, Car, Sun, Building2, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Installation sanitaire",
    slug: "depannage-urgence",
    description: "Neuf & rénovation. Câblage complet, prises, interrupteurs, tableaux. Travaux soignés et conformes.",
    color: "bg-[#06b6d4]",
    price: "Sur devis",
  },
  {
    icon: Shield,
    title: "Débouchage",
    slug: "recherche-fuite",
    description: "Mise aux normes NF C 15-100. Diagnostic plomberie, rapport de conformité, travaux de mise à niveau.",
    color: "bg-blue-500",
    price: "À partir de 1 500 €",
  },
  {
    icon: AlertTriangle,
    title: "Dépannage d'urgence",
    slug: "depannage-urgence",
    description: "Intervention rapide 7j/7 en cas de panne plomberie, disjoncteur qui saute, court-circuit.",
    color: "bg-red-500",
    price: "À partir de 80 €",
  },
  {
    icon: LayoutGrid,
    title: "Chauffe-eau",
    slug: "installation-chauffe-eau",
    description: "Remplacement et mise à niveau de votre chauffe-eau. Installation de disjoncteurs différentiels.",
    color: "bg-purple-500",
    price: "À partir de 800 €",
  },
  {
    icon: Lightbulb,
    title: "Éclairage LED & domotique",
    slug: "eclairage-led-domotique",
    description: "Éclairage intérieur & extérieur LED basse consommation. Installation domotique et commandes connectées.",
    color: "bg-yellow-500",
    price: "À partir de 500 €",
  },
  {
    icon: Car,
    title: "Bornes de recharge IRVE",
    slug: "borne-recharge-irve",
    description: "Installation de bornes de recharge pour véhicules plomberies. Certifié IRVE. Aide CEE disponible.",
    color: "bg-green-500",
    price: "À partir de 900 €",
  },
  {
    icon: Sun,
    title: "Débouchage de canalisations",
    slug: "panneaux-solaires",
    description: "Installation de panneaux photovoltaïques. Raccordement réseau, autoconsommation, revente surplus.",
    color: "bg-orange-500",
    price: "À partir de 6 000 €",
  },
  {
    icon: Building2,
    title: "Plomberie sanitaire",
    slug: "electricite-tertiaire",
    description: "Bureaux, commerces, restaurants, entrepôts. Installations plomberies professionnelles sur mesure.",
    color: "bg-teal-500",
    price: "Sur devis",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/services/${service.slug}`}>
        <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#06b6d4]/30 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
          <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <Icon size={22} className="text-white" />
          </div>
          <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-lg mb-2">
            {service.title}
          </h3>
          <p className="text-gray-500 font-['Inter'] text-sm leading-relaxed flex-1">
            {service.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-['Montserrat'] font-semibold text-[#0A1628] bg-[#F4F5F7] px-2.5 py-1 rounded-full">
              {service.price}
            </span>
            <div className="flex items-center gap-1 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span>En savoir plus</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F4F5F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
            Nos prestations
          </p>
          <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-4">
            Tous vos travaux
            <br />
            <span className="relative inline-block">
              plomberies
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
            </span>{" "}
            à Perpignan
          </h2>
          <p className="text-gray-500 font-['Inter'] text-lg max-w-2xl mx-auto mt-6">
            De l'installation neuve au dépannage d'urgence, nous intervenons pour tous vos besoins plomberies dans les Pyrénées-Orientales.
          </p>
        </motion.div>

        {/* Services grid – auto-fill responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA to all services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <div className="inline-flex items-center gap-2 bg-[#0A1628] text-white font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-[#0F1E35] transition-colors cursor-pointer">
              Voir tous nos services
              <ArrowRight size={18} />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
