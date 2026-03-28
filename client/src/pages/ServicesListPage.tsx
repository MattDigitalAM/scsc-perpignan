/**
 * Design: "Plomberie Méditerranéen"
 * Page liste de tous les services
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Zap, Shield, AlertTriangle, LayoutGrid,
  Lightbulb, Car, Sun, Building2, ArrowRight, ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Zap, Shield, AlertTriangle, LayoutGrid,
  Lightbulb, Car, Sun, Building2,
};

export default function ServicesListPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F4F5F7] border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm font-['Inter']">
              <Link href="/" className="text-gray-500 hover:text-[#0A1628] transition-colors">Accueil</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium">Services</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">Nos prestations</p>
              <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Tous nos services plomberies
                <br />
                <span className="text-[#06b6d4]">à Perpignan</span>
              </h1>
              <p className="text-gray-300 font-['Inter'] text-lg max-w-2xl mx-auto">
                De l'installation neuve au dépannage d'urgence, notre équipe certifiée RGE intervient pour tous vos besoins plomberies dans les Pyrénées-Orientales.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 lg:py-24 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Zap;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#06b6d4]/30 hover:-translate-y-1 cursor-pointer h-full">
                        <div className="flex items-start gap-5">
                          <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon size={26} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h2 className="font-['Montserrat'] font-bold text-[#0A1628] text-lg">{service.shortTitle}</h2>
                              <ArrowRight size={18} className="text-gray-300 group-hover:text-[#06b6d4] transition-colors flex-shrink-0 ml-2" />
                            </div>
                            <p className="text-gray-500 font-['Inter'] text-sm leading-relaxed mb-4">{service.description}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full" />
                                <span className="text-xs font-['Montserrat'] font-semibold text-[#0A1628]">{service.price}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                <span className="text-xs text-gray-400 font-['Inter']">{service.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-[#0A1628]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl text-white mb-3">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-gray-400 font-['Inter'] mb-6">Contactez-nous directement, nous étudions tous les projets plomberies.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors">
              Nous contacter
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
