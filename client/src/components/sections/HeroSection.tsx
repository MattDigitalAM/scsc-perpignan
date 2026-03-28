/**
 * Design: "Plomberie Méditerranéen" – Premium Local
 * Colors: Navy #0A1628, Yellow #06b6d4
 * Typography: Montserrat Black (titles), Inter (body)
 * Layout: Asymmetric 60/40 hero with ContainerScroll 3D animation
 */
import { motion } from "framer-motion";
import { Phone, FileText, Shield, Clock, Award } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import WaterParticles from "@/components/effects/WaterParticles";
import TypewriterText from "@/components/effects/TypewriterText";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/hero-plombier-Vr46JfruqYxroApnLBtBds.webp";
const TABLEAU_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/installation-chauffe-eau-iJzUj5vkF67qwaXdDqUvn3.webp";

export default function HeroSection() {
  return (
    <section id="accueil" className="relative bg-[#0A1628] overflow-hidden">
      {/* Circuit pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(245,197,24,0.4) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Particules plomberies flottantes */}
      <WaterParticles count={45} className="opacity-60" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-pulse" />
              <span className="text-[#06b6d4] text-sm font-semibold font-['Montserrat']">
                Disponible 7j/7 – Intervention sous 2h
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-['Montserrat'] font-black text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Votre Plombier de{" "}
              <span className="text-[#06b6d4]">Confiance</span>
              <br />à Perpignan
            </h1>

            {/* Typewriter subheadline */}
            <div className="text-lg text-gray-300 font-['Inter'] mb-8 leading-relaxed max-w-lg min-h-[3.5rem]">
              <TypewriterText
                phrases={[
                  "Intervention rapide 7j/7 dans tout le 66.",
                  "Devis gratuit sous 24h – Sans engagement.",
                  "Certifié RGE – Artisan Qualifelec.",
                  "Dépannage d'urgence sous 2h à Perpignan.",
                  "Installation, rénovation, recherche de fuite.",
                ]}
                typingSpeed={55}
                erasingSpeed={30}
                pauseAfterType={2500}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-8 py-4 rounded-xl text-base hover:bg-cyan-500 transition-colors shadow-lg"
              >
                <FileText size={20} />
                Demander un devis
              </motion.a>
              <motion.a
                href="tel:+33468000000"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-['Montserrat'] font-semibold px-8 py-4 rounded-xl text-base hover:border-[#06b6d4] hover:text-[#06b6d4] transition-colors"
              >
                <Phone size={20} />
                04 68 XX XX XX
              </motion.a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Shield, label: "Certifié RGE" },
                { icon: Award, label: "10+ ans d'expérience" },
                { icon: Clock, label: "Intervention en 2h" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                >
                  <Icon size={16} className="text-[#06b6d4]" />
                  <span className="text-sm text-gray-300 font-['Inter']">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <img
                src={HERO_IMAGE}
                alt="Plombier professionnel à Perpignan"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={600}
                height={450}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                <div className="text-3xl font-black font-['Montserrat'] text-[#06b6d4]">500+</div>
                <div className="text-sm text-gray-300">Chantiers réalisés</div>
              </div>
              <div className="absolute top-6 right-6 bg-[#06b6d4] rounded-xl p-3 text-[#0A1628]">
                <Shield size={24} className="font-bold" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ContainerScroll Section */}
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="text-white mb-4">
              <p className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm uppercase tracking-widest mb-3">
                Notre expertise
              </p>
              <h2 className="font-['Montserrat'] font-black text-3xl md:text-5xl text-white leading-tight">
                Des installations plomberies
                <br />
                <span className="text-[#06b6d4]">conformes & durables</span>
              </h2>
            </div>
          }
        >
          <div className="relative h-full w-full">
            <img
              src={TABLEAU_IMAGE}
              alt="Chauffe-eau professionnel"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "NF C 15-100", label: "Norme respectée" },
                  { value: "RGE", label: "Certification officielle" },
                  { value: "10 ans", label: "Garantie décennale" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-[#06b6d4] font-['Montserrat'] font-black text-xl md:text-2xl">{value}</div>
                    <div className="text-gray-300 text-xs md:text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
