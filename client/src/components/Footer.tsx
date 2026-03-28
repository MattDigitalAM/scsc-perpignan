/**
 * Design: "Plomberie Méditerranéen"
 * Dark navy footer with logo, links, social icons, legal info
 */
import { Zap, Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const quickLinks = [
  { href: "/", label: "Accueil", internal: true },
  { href: "/services", label: "Tous les services", internal: true },
  { href: "/blog", label: "Blog plomberie", internal: true },
  { href: "/villes", label: "Zones d'intervention", internal: true },
  { href: "/#contact", label: "Contact & Devis", internal: false },
  { href: "/mentions-legales", label: "Mentions légales", internal: true },
  { href: "/politique-confidentialite", label: "Politique RGPD", internal: true },
];

const cityLinks = [
  { label: "Perpignan", slug: "perpignan" },
  { label: "Canet-en-Roussillon", slug: "canet-en-roussillon" },
  { label: "Saint-Estève", slug: "saint-esteve" },
  { label: "Argelès-sur-Mer", slug: "argeles-sur-mer" },
  { label: "Saint-Cyprien", slug: "saint-cyprien" },
  { label: "Elne", slug: "elne" },
  { label: "Thuir", slug: "thuir" },
  { label: "Rivesaltes", slug: "rivesaltes" },
];

const serviceLinks = [
  { label: "Installation sanitaire", slug: "depannage-urgence" },
  { label: "Débouchage NF C 15-100", slug: "recherche-fuite" },
  { label: "Dépannage d'urgence", slug: "depannage-urgence" },
  { label: "Chauffe-eau", slug: "installation-chauffe-eau" },
  { label: "Éclairage LED & domotique", slug: "eclairage-led-domotique" },
  { label: "Débouchage", slug: "borne-recharge-irve" },
  { label: "Débouchage de canalisations", slug: "panneaux-solaires" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#06b6d4] rounded-xl flex items-center justify-center">
                <Zap size={22} className="text-[#0A1628]" fill="currentColor" />
              </div>
              <div>
                <div className="font-['Montserrat'] font-black text-white text-lg leading-tight">
                  Élec<span className="text-[#06b6d4]">Pro</span>
                </div>
                <div className="text-gray-500 text-xs font-['Inter']">Perpignan 66</div>
              </div>
            </div>
            <p className="text-gray-400 font-['Inter'] text-sm leading-relaxed mb-5">
              Plombier certifié à Perpignan. Votre artisan de confiance pour tous vos travaux plomberies dans les Pyrénées-Orientales.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                {
                  icon: () => (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  ),
                  href: "#",
                  label: "Google Business",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#06b6d4] hover:border-[#06b6d4]/30 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-['Montserrat'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label, internal }) => (
                <li key={label}>
                  {internal ? (
                    <Link href={href}>
                      <span className="text-gray-400 hover:text-[#06b6d4] font-['Inter'] text-sm transition-colors cursor-pointer">{label}</span>
                    </Link>
                  ) : (
                    <a href={href} className="text-gray-400 hover:text-[#06b6d4] font-['Inter'] text-sm transition-colors">{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Montserrat'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Nos services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, slug }) => (
                <li key={label}>
                  <Link href={`/services/${slug}`}>
                    <span className="text-gray-400 hover:text-[#06b6d4] font-['Inter'] text-sm transition-colors cursor-pointer">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-['Montserrat'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Villes du 66
            </h4>
            <ul className="space-y-2.5">
              {cityLinks.map(({ label, slug }) => (
                <li key={label}>
                  <Link href={`/plombier-${slug}`}>
                    <span className="text-gray-400 hover:text-[#06b6d4] font-['Inter'] text-sm transition-colors cursor-pointer flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#06b6d4] flex-shrink-0" />
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/villes">
              <span className="inline-flex items-center gap-1 text-xs text-[#06b6d4] font-['Montserrat'] font-semibold mt-3 cursor-pointer hover:underline">
                Voir toutes →
              </span>
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Montserrat'] font-bold text-white text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <a href="tel:+33468000000" className="flex items-center gap-2 text-gray-400 hover:text-[#06b6d4] transition-colors">
                <Phone size={15} className="text-[#06b6d4]" />
                <span className="font-['Inter'] text-sm">04 68 XX XX XX</span>
              </a>
              <a href="mailto:contact@elecpro66.fr" className="flex items-center gap-2 text-gray-400 hover:text-[#06b6d4] transition-colors">
                <Mail size={15} className="text-[#06b6d4]" />
                <span className="font-['Inter'] text-sm">contact@elecpro66.fr</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={15} className="text-[#06b6d4] mt-0.5 flex-shrink-0" />
                <span className="font-['Inter'] text-sm">Perpignan, 66000<br />Pyrénées-Orientales</span>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-6 space-y-2">
              {[
                "✓ Certifié RGE",
                "✓ Assurance décennale",
                "✓ SIRET : 123 456 789 00010",
              ].map((badge) => (
                <div key={badge} className="text-xs text-gray-500 font-['Inter']">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 font-['Inter'] text-xs">
            © 2025 Le Plombier du 66. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/mentions-legales">
              <span className="text-xs text-gray-500 hover:text-[#06b6d4] font-['Inter'] transition-colors cursor-pointer">Mentions légales</span>
            </Link>
            <span className="text-gray-700 text-xs">·</span>
            <Link href="/politique-confidentialite">
              <span className="text-xs text-gray-500 hover:text-[#06b6d4] font-['Inter'] transition-colors cursor-pointer">Politique de confidentialité</span>
            </Link>
            <span className="text-gray-700 text-xs">·</span>
            <Link href="/sitemap.xml">
              <span className="text-xs text-gray-500 hover:text-[#06b6d4] font-['Inter'] transition-colors cursor-pointer">Sitemap</span>
            </Link>
            <div className="w-6 h-6 bg-[#06b6d4] rounded flex items-center justify-center">
              <Zap size={12} className="text-[#0A1628]" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
