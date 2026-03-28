/**
 * Design: "Plomberie Méditerranéen"
 * Page individuelle pour chaque service
 * Colors: Navy #0A1628, Yellow #06b6d4
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  Zap, Shield, AlertTriangle, LayoutGrid,
  Lightbulb, Car, Sun, Building2,
  CheckCircle, ArrowRight, Phone, FileText,
  ChevronRight, Plus, Minus
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceBySlug, services } from "@/lib/data";
import NotFound from "./NotFound";
import { useSEO, buildServiceJsonLd, buildFaqJsonLd } from "@/hooks/useSEO";

const iconMap: Record<string, React.ElementType> = {
  Zap, Shield, AlertTriangle, LayoutGrid,
  Lightbulb, Car, Sun, Building2,
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-['Montserrat'] font-semibold text-[#0A1628] text-sm pr-4">{q}</span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-[#06b6d4]" : "bg-[#F4F5F7]"}`}>
          {open ? <Minus size={14} className="text-[#0A1628]" /> : <Plus size={14} className="text-[#0A1628]" />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <div className="w-10 h-0.5 bg-[#06b6d4] mb-3" />
          <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) return <NotFound />;

  const Icon = iconMap[service.icon] || Zap;
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  useSEO({
    title: service.metaTitle,
    description: service.metaDescription,
    canonical: `/services/${service.slug}`,
    image: service.heroImage,
    jsonLd: [
      buildServiceJsonLd({
        name: service.title,
        description: service.description,
        url: `https://plombier-perpignan66.fr/services/${service.slug}`,
        price: service.price,
      }),
      buildFaqJsonLd(service.faq),
    ],
  });

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
              <Link href="/services" className="text-gray-500 hover:text-[#0A1628] transition-colors">Services</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium">{service.shortTitle}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest">
                    Service
                  </span>
                </div>
                <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
                  {service.title}
                </h1>
                <p className="text-[#06b6d4] font-['Montserrat'] font-medium text-lg mb-6">{service.tagline}</p>
                <p className="text-gray-300 font-['Inter'] text-base leading-relaxed mb-8">{service.description}</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                    <div className="text-[#06b6d4] font-['Montserrat'] font-black text-lg">{service.price}</div>
                    <div className="text-gray-400 text-xs">Tarif indicatif</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                    <div className="text-[#06b6d4] font-['Montserrat'] font-black text-lg">{service.duration}</div>
                    <div className="text-gray-400 text-xs">Durée estimée</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/#contact" className="inline-flex items-center justify-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-7 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors">
                    <FileText size={18} />
                    Devis gratuit
                  </a>
                  <a href="tel:+33468000000" className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-['Montserrat'] font-semibold px-7 py-3.5 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors">
                    <Phone size={18} />
                    04 68 XX XX XX
                  </a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={service.heroImage} alt={service.title} className="w-full h-[420px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/40 to-transparent rounded-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-2">Ce que comprend la prestation</p>
              <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A1628]">
                Nos engagements pour ce service
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 bg-[#F4F5F7] rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-[#06b6d4]/20"
                >
                  <CheckCircle size={20} className="text-[#06b6d4] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-500 font-['Inter'] text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 lg:py-24 bg-[#0A1628]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-2">Déroulement</p>
              <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                Comment se déroule l'intervention ?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {i < service.process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-white/10 z-0" style={{ width: "calc(100% - 2rem)" }} />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="font-['Montserrat'] font-black text-[#0A1628] text-xl">{step.step}</span>
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-white text-base mb-2">{step.title}</h3>
                    <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-12">
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A1628]">
                Questions fréquentes
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {service.faq.map((item) => (
                <FAQItem key={item.question} q={item.question} a={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-8">Autres services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherServices.map((s) => {
                const SIcon = iconMap[s.icon] || Zap;
                return (
                  <Link key={s.slug} href={`/services/${s.slug}`}>
                    <div className="group flex items-center gap-4 p-5 bg-[#F4F5F7] rounded-xl hover:bg-[#0A1628] transition-all duration-300 cursor-pointer">
                      <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <SIcon size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-['Montserrat'] font-bold text-[#0A1628] group-hover:text-white text-sm transition-colors truncate">{s.shortTitle}</div>
                        <div className="text-gray-500 group-hover:text-gray-300 text-xs font-['Inter'] transition-colors">{s.price}</div>
                      </div>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-[#06b6d4] transition-colors flex-shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-[#06b6d4]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl text-[#0A1628] mb-3">
              Besoin de ce service à Perpignan ?
            </h2>
            <p className="text-[#0A1628]/70 font-['Inter'] mb-6">Devis gratuit sous 24h – Intervention rapide dans les Pyrénées-Orientales</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact" className="inline-flex items-center justify-center gap-2 bg-[#0A1628] text-white font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-[#0F1E35] transition-colors">
                <FileText size={18} />
                Demander un devis
              </a>
              <a href="tel:+33468000000" className="inline-flex items-center justify-center gap-2 border-2 border-[#0A1628] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-[#0A1628] hover:text-white transition-colors">
                <Phone size={18} />
                04 68 XX XX XX
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
