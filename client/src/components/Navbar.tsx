/**
 * Design: "Plomberie Méditerranéen"
 * Sticky navbar with navy background, yellow accent on active/hover
 * Updated with Services dropdown and Blog link
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Zap, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { services } from "@/lib/data";

const serviceIcons: Record<string, string> = {
  "depannage-urgence": "🚨",
  "recherche-fuite": "🛡️",
  "installation-chauffe-eau": "⚙️",
  "debouchage-canalisations": "🌊",
  "renovation-salle-de-bain": "🛁",
  "installation-sanitaire": "🚿",
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    // Throttle scroll handler pour éviter trop de re-renders
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    // passive: true améliore les performances de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const logoHref = isHome ? "#accueil" : "/";
  const contactHref = isHome ? "#contact" : "/#contact";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A1628]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-[#0A1628]"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            {isHome ? (
              <a href={logoHref} className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-[#06b6d4] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Zap size={20} className="text-[#0A1628]" fill="currentColor" />
                </div>
                <div>
                  <div className="font-['Montserrat'] font-black text-white text-base leading-tight">
                    Élec<span className="text-[#06b6d4]">Pro</span>
                  </div>
                  <div className="text-gray-400 text-xs font-['Inter']">Perpignan 66</div>
                </div>
              </a>
            ) : (
              <Link href="/">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-9 h-9 bg-[#06b6d4] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Zap size={20} className="text-[#0A1628]" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-['Montserrat'] font-black text-white text-base leading-tight">
                      Élec<span className="text-[#06b6d4]">Pro</span>
                    </div>
                    <div className="text-gray-400 text-xs font-['Inter']">Perpignan 66</div>
                  </div>
                </div>
              </Link>
            )}

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {/* Accueil */}
              {isHome ? (
                <a href="#accueil" className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium text-sm transition-colors relative group">
                  Accueil
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#06b6d4] group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link href="/">
                  <span className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium text-sm transition-colors cursor-pointer">Accueil</span>
                </Link>
              )}

              {/* Services dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium text-sm transition-colors"
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="text-xs text-gray-400 font-['Montserrat'] font-semibold uppercase tracking-wider px-2 mb-3">Nos prestations</div>
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((service) => (
                            <Link key={service.slug} href={`/services/${service.slug}`}>
                              <div
                                onClick={() => setServicesOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F5F7] transition-colors cursor-pointer group"
                              >
                                <span className="text-lg">{serviceIcons[service.slug] || "⚡"}</span>
                                <div>
                                  <div className="font-['Montserrat'] font-semibold text-[#0A1628] text-xs group-hover:text-[#06b6d4] transition-colors">
                                    {service.shortTitle}
                                  </div>
                                  <div className="text-gray-400 text-xs font-['Inter']">{service.price}</div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <Link href="/services">
                            <div onClick={() => setServicesOpen(false)} className="flex items-center justify-center gap-2 bg-[#0A1628] text-white font-['Montserrat'] font-bold text-xs py-2.5 rounded-xl hover:bg-[#0F1E35] transition-colors cursor-pointer">
                              Voir tous les services
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Villes */}
              <Link href="/villes">
                <span className={`font-['Inter'] font-medium text-sm transition-colors cursor-pointer relative group ${location.startsWith("/plombier-") || location === "/villes" ? "text-[#06b6d4]" : "text-gray-300 hover:text-[#06b6d4]"}`}>
                  Villes du 66
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#06b6d4] transition-all duration-300 ${location.startsWith("/plombier-") || location === "/villes" ? "w-full" : "w-0 group-hover:w-full"}`} />
                </span>
              </Link>

              {/* Blog */}
              <Link href="/blog">
                <span className={`font-['Inter'] font-medium text-sm transition-colors cursor-pointer relative group ${location.startsWith("/blog") ? "text-[#06b6d4]" : "text-gray-300 hover:text-[#06b6d4]"}`}>
                  Blog
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#06b6d4] transition-all duration-300 ${location.startsWith("/blog") ? "w-full" : "w-0 group-hover:w-full"}`} />
                </span>
              </Link>

              {/* Contact */}
              {isHome ? (
                <a href="#contact" className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium text-sm transition-colors relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#06b6d4] group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link href="/#contact">
                  <span className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium text-sm transition-colors cursor-pointer">Contact</span>
                </Link>
              )}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+33468000000"
                className="flex items-center gap-2 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm hover:text-yellow-300 transition-colors"
              >
                <Phone size={16} />
                04 68 XX XX XX
              </a>
              <a
                href={contactHref}
                className="bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-cyan-500 transition-colors"
              >
                Devis gratuit
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0A1628] border-t border-white/10 shadow-xl lg:hidden overflow-y-auto max-h-[80vh]"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {isHome ? (
                <a href="#accueil" onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors">
                  Accueil
                </a>
              ) : (
                <Link href="/">
                  <div onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors cursor-pointer">
                    Accueil
                  </div>
                </Link>
              )}

              {/* Mobile services accordion */}
              <div className="border-b border-white/5">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 transition-colors"
                >
                  Services
                  <ChevronDown size={16} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-4 flex flex-col gap-1">
                        <Link href="/services">
                          <div onClick={() => setIsMobileOpen(false)} className="text-[#06b6d4] font-['Montserrat'] font-semibold text-sm py-2 cursor-pointer">
                            → Tous les services
                          </div>
                        </Link>
                        {services.map((service) => (
                          <Link key={service.slug} href={`/services/${service.slug}`}>
                            <div onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm py-1.5 cursor-pointer transition-colors">
                              <span>{serviceIcons[service.slug] || "⚡"}</span>
                              <span className="font-['Inter']">{service.shortTitle}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/villes">
                <div onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors cursor-pointer">
                  Villes du 66
                </div>
              </Link>
              {/* Keep zone anchor for home */}
              {isHome && (
                <a href="#zone" onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors">
                  Zone d'intervention
                </a>
              )}

              <Link href="/blog">
                <div onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors cursor-pointer">
                  Blog
                </div>
              </Link>

              {isHome ? (
                <a href="#contact" onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors">
                  Contact
                </a>
              ) : (
                <Link href="/#contact">
                  <div onClick={() => setIsMobileOpen(false)} className="text-gray-300 hover:text-[#06b6d4] font-['Inter'] font-medium py-3 border-b border-white/5 transition-colors cursor-pointer">
                    Contact
                  </div>
                </Link>
              )}

              <a
                href="tel:+33468000000"
                className="flex items-center gap-2 mt-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-5 py-3 rounded-lg text-center justify-center"
              >
                <Phone size={18} />
                04 68 XX XX XX
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#0A1628] border-t border-white/10 p-3">
        <a
          href="tel:+33468000000"
          className="flex items-center justify-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold py-3 rounded-xl w-full"
        >
          <Phone size={20} />
          Appeler maintenant – 04 68 XX XX XX
        </a>
      </div>
    </>
  );
}
