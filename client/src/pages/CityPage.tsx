/**
 * Design: "Plomberie Méditerranéen"
 * Template de page ville SEO – Navy #0A1628 / Yellow #06b6d4
 * Optimisé pour le référencement local
 */
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Phone, ChevronRight, Star,
  CheckCircle2, ArrowRight, Zap, Shield,
  AlertTriangle, Lightbulb, Car, Sun, Building2, LayoutGrid
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCityBySlug, cities } from "@/lib/cities";
import NotFound from "./NotFound";
import { useSEO, buildLocalBusinessJsonLd, buildFaqJsonLd } from "@/hooks/useSEO";

const serviceIcons: Record<string, React.ReactNode> = {
  "Installation sanitaire": <Zap size={18} className="text-white" />,
  "Installation neuve": <Zap size={18} className="text-white" />,
  "Rénovation plomberie": <Zap size={18} className="text-white" />,
  "Débouchage": <Shield size={18} className="text-white" />,
  "Débouchage ERP": <Shield size={18} className="text-white" />,
  "Dépannage d'urgence": <AlertTriangle size={18} className="text-white" />,
  "Dépannage": <AlertTriangle size={18} className="text-white" />,
  "Chauffe-eau": <LayoutGrid size={18} className="text-white" />,
  "Éclairage LED": <Lightbulb size={18} className="text-white" />,
  "Éclairage LED & domotique": <Lightbulb size={18} className="text-white" />,
  "Recherche de fuite": <Car size={18} className="text-white" />,
  "Débouchage de canalisations": <Sun size={18} className="text-white" />,
  "Plomberie sanitaire": <Building2 size={18} className="text-white" />,
  "Installation tertiaire": <Building2 size={18} className="text-white" />,
  "Tous services": <Zap size={18} className="text-white" />,
};

const serviceColors: Record<string, string> = {
  "Installation sanitaire": "bg-[#06b6d4]",
  "Installation neuve": "bg-[#06b6d4]",
  "Rénovation plomberie": "bg-[#06b6d4]",
  "Débouchage": "bg-blue-500",
  "Débouchage ERP": "bg-blue-500",
  "Dépannage d'urgence": "bg-red-500",
  "Dépannage": "bg-red-500",
  "Chauffe-eau": "bg-purple-500",
  "Éclairage LED": "bg-yellow-500",
  "Éclairage LED & domotique": "bg-yellow-500",
  "Recherche de fuite": "bg-green-500",
  "Débouchage de canalisations": "bg-orange-500",
  "Plomberie sanitaire": "bg-teal-500",
  "Installation tertiaire": "bg-teal-500",
  "Tous services": "bg-[#06b6d4]",
};

const whyUsPoints = [
  "Artisan certifié Qualifelec, assuré RCP",
  "Devis gratuit sous 24h",
  "Respect des normes NF C 15-100",
  "Garantie décennale sur tous les travaux",
  "Disponible 7j/7 pour les urgences",
  "Tarifs transparents sans surprise",
];

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug || "");

  if (!city) return <NotFound />;

  const nearbyCities = cities
    .filter((c) => c.slug !== slug && c.slug !== "perpignan")
    .slice(0, 6);

  useSEO({
    title: city.metaTitle,
    description: city.metaDescription,
    canonical: `/plombier-${city.slug}`,
    jsonLd: [
      buildLocalBusinessJsonLd({
        name: city.name,
        slug: city.slug,
        postalCode: city.postalCode,
        description: city.description,
      }),
      buildFaqJsonLd(city.faq),
    ],
  });

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="bg-[#F4F5F7] border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm font-['Inter'] flex-wrap">
              <Link href="/">
                <span className="text-gray-500 hover:text-[#0A1628] transition-colors cursor-pointer">Accueil</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link href="/villes">
                <span className="text-gray-500 hover:text-[#0A1628] transition-colors cursor-pointer">Zones d'intervention</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#0A1628] font-medium">Plombier {city.name}</span>
            </div>
          </div>
        </div>

        {/* Hero section */}
        <section className="bg-[#0A1628] py-14 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.6) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {/* Location badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                  <MapPin size={14} className="text-[#06b6d4]" />
                  <span className="text-white text-xs font-['Montserrat'] font-semibold">{city.name} – {city.postalCode} – {city.department}</span>
                </div>

                <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
                  Plombier
                  <br />
                  <span className="text-[#06b6d4]">{city.name}</span>
                  <br />
                  <span className="text-2xl sm:text-3xl text-gray-300 font-bold">{city.postalCode}</span>
                </h1>

                <p className="text-gray-300 font-['Inter'] text-lg leading-relaxed mb-7">
                  {city.heroTagline}. Intervention rapide en <strong className="text-white">{city.interventionTime}</strong> — Devis gratuit sous 24h.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mb-7">
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                    <Clock size={16} className="text-[#06b6d4]" />
                    <div>
                      <div className="text-white font-['Montserrat'] font-bold text-sm">{city.interventionTime}</div>
                      <div className="text-gray-400 text-xs font-['Inter']">Délai d'intervention</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                    <MapPin size={16} className="text-[#06b6d4]" />
                    <div>
                      <div className="text-white font-['Montserrat'] font-bold text-sm">{city.distance}</div>
                      <div className="text-gray-400 text-xs font-['Inter']">de Perpignan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5">
                    <Star size={16} className="text-[#06b6d4]" fill="currentColor" />
                    <div>
                      <div className="text-white font-['Montserrat'] font-bold text-sm">4.9/5</div>
                      <div className="text-gray-400 text-xs font-['Inter']">Note clients</div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+33468000000"
                    className="flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-6 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors"
                  >
                    <Phone size={18} />
                    04 68 XX XX XX
                  </a>
                  <Link href="/#contact">
                    <div className="flex items-center gap-2 border-2 border-white/30 text-white font-['Montserrat'] font-bold px-6 py-3.5 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors cursor-pointer">
                      Devis gratuit
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
                  <h2 className="font-['Montserrat'] font-bold text-white text-lg mb-5">
                    Plombier certifié à {city.name}
                  </h2>
                  <div className="space-y-3 mb-6">
                    {whyUsPoints.map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#06b6d4] flex-shrink-0" />
                        <span className="text-gray-300 font-['Inter'] text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                  {/* Testimonial preview */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="text-[#06b6d4]" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-300 font-['Inter'] text-xs italic leading-relaxed mb-2">
                      "{city.testimonial.text.substring(0, 120)}..."
                    </p>
                    <div className="text-gray-400 text-xs font-['Montserrat'] font-semibold">
                      — {city.testimonial.author} · {city.testimonial.service}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: Main content */}
              <div className="lg:col-span-2 space-y-12">
                {/* About the city */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-2 pb-2 border-b-2 border-[#06b6d4] inline-block">
                    Plombier à {city.name} – Votre artisan local
                  </h2>
                  <p className="text-gray-600 font-['Inter'] text-base leading-relaxed mt-4 mb-4">
                    {city.description}
                  </p>
                  <p className="text-gray-600 font-['Inter'] text-base leading-relaxed">
                    {city.localContext}
                  </p>
                </motion.div>

                {/* Services */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-2 pb-2 border-b-2 border-[#06b6d4] inline-block">
                    Nos services à {city.name}
                  </h2>
                  <p className="text-gray-600 font-['Inter'] text-sm mt-4 mb-6">
                    Voici les prestations les plus demandées par nos clients à {city.name} ({city.postalCode}) :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {city.mainServices.map((service) => (
                      <div key={service} className="flex items-center gap-4 bg-[#F4F5F7] rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 ${serviceColors[service] || "bg-[#0A1628]"} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          {serviceIcons[service] || <Zap size={18} className="text-white" />}
                        </div>
                        <div>
                          <div className="font-['Montserrat'] font-bold text-[#0A1628] text-sm">{service}</div>
                          <div className="text-gray-400 text-xs font-['Inter']">Devis gratuit</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link href="/services">
                      <div className="inline-flex items-center gap-2 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm hover:underline cursor-pointer">
                        Voir tous nos services
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </div>
                </motion.div>

                {/* Neighborhoods */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-2 pb-2 border-b-2 border-[#06b6d4] inline-block">
                    Zones d'intervention à {city.name}
                  </h2>
                  <p className="text-gray-600 font-['Inter'] text-sm mt-4 mb-5">
                    Nous intervenons dans tous les quartiers et secteurs de {city.name} :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map((neighborhood) => (
                      <span
                        key={neighborhood}
                        className="flex items-center gap-1.5 bg-[#0A1628] text-white font-['Montserrat'] font-semibold text-xs px-3 py-1.5 rounded-full"
                      >
                        <MapPin size={11} className="text-[#06b6d4]" />
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-6 pb-2 border-b-2 border-[#06b6d4] inline-block">
                    Avis client à {city.name}
                  </h2>
                  <div className="bg-[#F4F5F7] rounded-2xl p-6 border-l-4 border-[#06b6d4]">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-[#06b6d4]" fill="currentColor" />
                      ))}
                      <span className="text-gray-500 text-xs font-['Inter'] ml-2">5/5 – Google</span>
                    </div>
                    <p className="text-gray-700 font-['Inter'] text-base italic leading-relaxed mb-4">
                      "{city.testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0A1628] rounded-full flex items-center justify-center">
                        <span className="text-white font-['Montserrat'] font-bold text-sm">
                          {city.testimonial.author[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-['Montserrat'] font-bold text-[#0A1628] text-sm">{city.testimonial.author}</div>
                        <div className="text-gray-400 text-xs font-['Inter']">{city.testimonial.service} – {city.name}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FAQ */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="font-['Montserrat'] font-black text-2xl text-[#0A1628] mb-6 pb-2 border-b-2 border-[#06b6d4] inline-block">
                    Questions fréquentes – {city.name}
                  </h2>
                  <div className="space-y-4">
                    {city.faq.map((item, i) => (
                      <div key={i} className="bg-[#F4F5F7] rounded-xl p-5">
                        <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-2">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                    {/* Generic FAQ */}
                    <div className="bg-[#F4F5F7] rounded-xl p-5">
                      <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-2">
                        Comment obtenir un devis pour des travaux plomberies à {city.name} ?
                      </h3>
                      <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
                        Contactez-nous par téléphone au 04 68 XX XX XX ou via notre formulaire en ligne. Nous vous répondons sous 24h avec un devis gratuit et détaillé, sans engagement.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-5">
                  {/* Contact CTA */}
                  <div className="bg-[#0A1628] rounded-2xl p-6 text-white">
                    <div className="w-10 h-10 bg-[#06b6d4] rounded-xl flex items-center justify-center mb-4">
                      <Phone size={20} className="text-[#0A1628]" />
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-lg mb-1">
                      Plombier à {city.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-['Inter'] mb-5">
                      Intervention en {city.interventionTime}. Devis gratuit sous 24h.
                    </p>
                    <a
                      href="tel:+33468000000"
                      className="flex items-center justify-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold py-3 rounded-xl hover:bg-cyan-500 transition-colors text-sm mb-3"
                    >
                      <Phone size={16} />
                      04 68 XX XX XX
                    </a>
                    <Link href="/#contact">
                      <div className="flex items-center justify-center gap-2 border border-white/20 text-white font-['Montserrat'] font-semibold py-3 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors text-sm cursor-pointer">
                        Devis gratuit en ligne
                      </div>
                    </Link>
                  </div>

                  {/* Why us */}
                  <div className="bg-[#F4F5F7] rounded-2xl p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-4">
                      Pourquoi nous choisir ?
                    </h3>
                    <div className="space-y-2.5">
                      {whyUsPoints.map((point) => (
                        <div key={point} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#06b6d4] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 font-['Inter'] text-xs">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby city */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-3">
                      Communes voisines
                    </h3>
                    <Link href={`/plombier-${city.nearbyCitySlug}`}>
                      <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#06b6d4] transition-colors cursor-pointer mb-2">
                        <MapPin size={13} className="text-[#06b6d4]" />
                        <span className="font-['Inter']">Plombier {city.nearbyCity}</span>
                      </div>
                    </Link>
                    {nearbyCities.slice(0, 4).map((c) => (
                      <Link key={c.slug} href={`/plombier-${c.slug}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#06b6d4] transition-colors cursor-pointer mb-2">
                          <MapPin size={13} className="text-[#06b6d4]" />
                          <span className="font-['Inter']">Plombier {c.name}</span>
                        </div>
                      </Link>
                    ))}
                    <Link href="/villes">
                      <div className="flex items-center gap-1 text-xs text-[#06b6d4] font-['Montserrat'] font-semibold mt-3 cursor-pointer hover:underline">
                        Voir toutes les villes
                        <ArrowRight size={12} />
                      </div>
                    </Link>
                  </div>

                  {/* Services links */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-3">
                      Nos services
                    </h3>
                    {[
                      { label: "Installation sanitaire", slug: "depannage-urgence" },
                      { label: "Débouchage", slug: "recherche-fuite" },
                      { label: "Dépannage d'urgence", slug: "depannage-urgence" },
                      { label: "Chauffe-eau", slug: "installation-chauffe-eau" },
                      { label: "Débouchage", slug: "borne-recharge-irve" },
                      { label: "Débouchage de canalisations", slug: "panneaux-solaires" },
                    ].map(({ label, slug }) => (
                      <Link key={slug} href={`/services/${slug}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#06b6d4] transition-colors cursor-pointer mb-2">
                          <ArrowRight size={13} className="text-[#06b6d4]" />
                          <span className="font-['Inter']">{label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Nearby cities grid */}
        <section className="py-12 bg-[#F4F5F7]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-6">
              Plombier dans les communes voisines
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {nearbyCities.map((c) => (
                <Link key={c.slug} href={`/plombier-${c.slug}`}>
                  <div className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-[#06b6d4] border border-transparent transition-all cursor-pointer">
                    <MapPin size={18} className="text-[#06b6d4] mx-auto mb-1.5" />
                    <div className="font-['Montserrat'] font-bold text-[#0A1628] text-xs group-hover:text-[#06b6d4] transition-colors">
                      {c.name}
                    </div>
                    <div className="text-gray-400 text-xs font-['Inter'] mt-0.5">{c.postalCode}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 bg-[#0A1628]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-['Montserrat'] font-black text-2xl sm:text-3xl text-white mb-3">
              Besoin d'un plombier à {city.name} ?
            </h2>
            <p className="text-gray-400 font-['Inter'] mb-6">
              Intervention en {city.interventionTime} — Devis gratuit — Artisan certifié
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+33468000000" className="flex items-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:bg-cyan-500 transition-colors">
                <Phone size={18} />
                04 68 XX XX XX
              </a>
              <Link href="/#contact">
                <div className="flex items-center gap-2 border-2 border-white/30 text-white font-['Montserrat'] font-bold px-8 py-3.5 rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors cursor-pointer">
                  Demander un devis gratuit
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
