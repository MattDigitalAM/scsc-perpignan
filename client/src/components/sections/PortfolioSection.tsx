/**
 * Design: "Plomberie Méditerranéen"
 * Portfolio grid with project cards showing images and details
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

const TABLEAU_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/installation-chauffe-eau-iJzUj5vkF67qwaXdDqUvn3.webp";
const BORNE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/borne-irve-f5KMkj8apUk3jkKjxNm9Qi.webp";
const LED_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/eclairage-led-WZLR8yajya5HWFpKGYkwMK.webp";
const SOLAR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/panneaux-solaires-haqNCPfFSRRMQ7gBqrnG5V.webp";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/hero-plombier-Vr46JfruqYxroApnLBtBds.webp";

const projects = [
  {
    image: TABLEAU_IMAGE,
    type: "Chauffe-eau",
    city: "Perpignan",
    description: "Remplacement complet du chauffe-eau avec mise aux normes NF C 15-100 dans une maison des années 80.",
    tag: "Rénovation",
  },
  {
    image: LED_IMAGE,
    type: "Éclairage LED",
    city: "Canet-en-Roussillon",
    description: "Installation d'un système d'éclairage LED connecté dans un appartement neuf. Économies d'énergie de 60%.",
    tag: "Neuf",
  },
  {
    image: BORNE_IMAGE,
    type: "Recherche de fuite",
    city: "Saint-Estève",
    description: "Installation d'une borne de recharge 7kW pour véhicule plomberie avec gestion intelligente de la charge.",
    tag: "IRVE",
  },
  {
    image: HERO_IMAGE,
    type: "Installation neuve",
    city: "Rivesaltes",
    description: "Câblage plomberie complet d'une maison individuelle de 150m² en construction. Livraison dans les délais.",
    tag: "Construction",
  },
  {
    image: SOLAR_IMAGE,
    type: "Débouchage de canalisations",
    city: "Thuir",
    description: "Installation de 12 panneaux photovoltaïques 400Wc avec onduleur et monitoring de production.",
    tag: "Solaire",
  },
  {
    image: TABLEAU_IMAGE,
    type: "Débouchage",
    city: "Argelès-sur-Mer",
    description: "Diagnostic et recherche de fuite d'un local commercial. Rapport Assurance obtenu en 3 jours.",
    tag: "Conformité",
  },
];

const tagColors: Record<string, string> = {
  Rénovation: "bg-blue-100 text-blue-700",
  Neuf: "bg-green-100 text-green-700",
  IRVE: "bg-purple-100 text-purple-700",
  Construction: "bg-orange-100 text-orange-700",
  Solaire: "bg-yellow-100 text-yellow-700",
  Conformité: "bg-red-100 text-red-700",
};

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="realisations" className="py-20 lg:py-28 bg-[#F4F5F7]">
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
            Portfolio
          </p>
          <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-4">
            Nos{" "}
            <span className="relative inline-block">
              réalisations
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
            </span>
          </h2>
          <p className="text-gray-500 font-['Inter'] text-lg max-w-2xl mx-auto mt-6">
            Découvrez quelques-uns de nos chantiers récents dans les Pyrénées-Orientales.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image – aspect-ratio fixe pour éviter le layout shift */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={project.image}
                  alt={`Réalisation plombier à ${project.city} – ${project.type}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={270}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Tag */}
                <span className={`absolute top-3 right-3 text-xs font-['Montserrat'] font-semibold px-3 py-1 rounded-full ${tagColors[project.tag]}`}>
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base">
                    {project.type}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <MapPin size={12} />
                    <span>{project.city}</span>
                  </div>
                </div>
                <p className="text-gray-500 font-['Inter'] text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
