/**
 * Design: "Plomberie Méditerranéen"
 * Page liste de toutes les villes d'intervention – SEO local
 * Colors: Navy #0A1628, Yellow #06b6d4
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Clock, ChevronRight, ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cities } from "@/lib/cities";

export default function CitiesListPage() {
  // Perpignan en premier, puis les autres par distance
  const sortedCities = [...cities].sort((a, b) => {
    if (a.slug === "perpignan") return -1;
    if (b.slug === "perpignan") return 1;
    return parseInt(a.distance) - parseInt(b.distance);
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F4F5F7] border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm font-['Inter']">
              <Link href="/">
                <span className="text-gray-500 hover:text-[#0A1628] transition-colors cursor-pointer">Accueil</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium">Zones d'intervention</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] py-14 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
                Pyrénées-Orientales (66)
              </p>
              <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Plombier dans toutes les
                <br />
                <span className="text-[#06b6d4]">villes du 66</span>
              </h1>
              <p className="text-gray-300 font-['Inter'] text-lg max-w-2xl mx-auto mb-8">
                Votre plombier certifié intervient dans <strong className="text-white">{cities.length} communes</strong> des Pyrénées-Orientales. Devis gratuit sous 24h, intervention rapide.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { value: `${cities.length}+`, label: "Communes desservies" },
                  { value: "< 1h", label: "Délai d'intervention max" },
                  { value: "7j/7", label: "Disponibilité" },
                  { value: "100%", label: "Devis gratuits" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-['Montserrat'] font-black text-2xl text-[#06b6d4]">{value}</div>
                    <div className="text-gray-400 text-xs font-['Inter']">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cities grid */}
        <section className="py-14 lg:py-20 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-2">
                Toutes nos zones d'intervention
              </h2>
              <p className="text-gray-500 font-['Inter'] text-sm">
                Cliquez sur une ville pour voir les services disponibles, les délais d'intervention et les avis clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedCities.map((city, index) => (
                <motion.div
                  key={city.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/plombier-${city.slug}`}>
                    <div className={`group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border ${city.slug === "perpignan" ? "border-[#06b6d4]" : "border-transparent hover:border-[#06b6d4]/30"}`}>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${city.slug === "perpignan" ? "bg-[#06b6d4]" : "bg-[#0A1628]"}`}>
                            <MapPin size={18} className={city.slug === "perpignan" ? "text-[#0A1628]" : "text-[#06b6d4]"} />
                          </div>
                          <div>
                            <h3 className="font-['Montserrat'] font-black text-[#0A1628] text-base group-hover:text-[#06b6d4] transition-colors leading-tight">
                              {city.name}
                            </h3>
                            <div className="text-gray-400 text-xs font-['Inter']">{city.postalCode}</div>
                          </div>
                        </div>
                        {city.slug === "perpignan" && (
                          <span className="bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold text-xs px-2 py-0.5 rounded-full">
                            Siège
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-['Inter']">
                          <Clock size={12} className="text-[#06b6d4]" />
                          <span>Intervention : <strong className="text-[#0A1628]">{city.interventionTime}</strong></span>
                        </div>
                        {city.distance !== "0 km" && (
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-['Inter']">
                            <MapPin size={12} className="text-[#06b6d4]" />
                            <span>{city.distance}</span>
                          </div>
                        )}
                      </div>

                      {/* Services tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {city.mainServices.slice(0, 3).map((service) => (
                          <span key={service} className="text-xs bg-[#F4F5F7] text-gray-600 font-['Inter'] px-2 py-0.5 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1 text-[#06b6d4] font-['Montserrat'] font-semibold text-xs">
                        <span>Voir la page</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map placeholder + info */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
                  Zone de couverture
                </p>
                <h2 className="font-['Montserrat'] font-black text-3xl text-[#0A1628] mb-4">
                  Tout le département
                  <br />
                  <span className="text-[#06b6d4]">Pyrénées-Orientales</span>
                </h2>
                <p className="text-gray-600 font-['Inter'] text-base leading-relaxed mb-6">
                  Notre équipe d'plombiers certifiés couvre l'ensemble du département 66, du littoral méditerranéen aux contreforts pyrénéens. De Perpignan à Banyuls-sur-Mer, de Prades à Argelès-sur-Mer, nous intervenons partout avec la même qualité de service.
                </p>
                <div className="space-y-3">
                  {[
                    { zone: "Littoral catalan", cities: "Canet, Saint-Cyprien, Argelès, Collioure, Banyuls" },
                    { zone: "Plaine du Roussillon", cities: "Perpignan, Saint-Estève, Elne, Thuir, Pia" },
                    { zone: "Vallespir", cities: "Céret, Le Boulou, Amélie-les-Bains" },
                    { zone: "Conflent", cities: "Prades, Villefranche-de-Conflent" },
                    { zone: "Salanque", cities: "Rivesaltes, Villelongue, Saint-Laurent" },
                  ].map(({ zone, cities: citiesStr }) => (
                    <div key={zone} className="flex items-start gap-3 bg-[#F4F5F7] rounded-xl p-3">
                      <MapPin size={16} className="text-[#06b6d4] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-['Montserrat'] font-bold text-[#0A1628] text-sm">{zone}</div>
                        <div className="text-gray-500 text-xs font-['Inter']">{citiesStr}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual map placeholder */}
              <div className="bg-[#0A1628] rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="font-['Montserrat'] font-black text-white text-xl mb-3">
                  Pyrénées-Orientales (66)
                </h3>
                <p className="text-gray-400 font-['Inter'] text-sm mb-6">
                  {cities.length} communes desservies dans tout le département
                </p>
                <div className="grid grid-cols-2 gap-3 text-left">
                  {sortedCities.slice(0, 8).map((city) => (
                    <Link key={city.slug} href={`/plombier-${city.slug}`}>
                      <div className="flex items-center gap-2 text-gray-300 hover:text-[#06b6d4] transition-colors cursor-pointer text-xs font-['Inter']">
                        <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full flex-shrink-0" />
                        {city.name}
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/#contact">
                  <div className="mt-6 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold py-3 rounded-xl hover:bg-cyan-500 transition-colors cursor-pointer text-sm">
                    Demander un devis
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-14 bg-[#0A1628]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl text-white mb-3">
              Votre commune n'est pas dans la liste ?
            </h2>
            <p className="text-gray-400 font-['Inter'] mb-6">
              Contactez-nous, nous étudions toutes les demandes dans les Pyrénées-Orientales.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+33468000000" className="flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors">
                <Phone size={18} />
                04 68 XX XX XX
              </a>
              <Link href="/#contact">
                <div className="flex items-center gap-2 border-2 border-white/30 text-white font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors cursor-pointer">
                  Formulaire de contact
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
