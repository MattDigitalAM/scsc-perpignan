/**
 * Design: "Plomberie Méditerranéen"
 * Page Mentions Légales
 */
import { Link } from "wouter";
import { ChevronRight, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function MentionsLegalesPage() {
  useSEO({
    title: "Mentions Légales | Le Plombier du 66",
    description: "Mentions légales du site Le Plombier du 66 – Plombier certifié RGE dans les Pyrénées-Orientales.",
    canonical: "/mentions-legales",
    noIndex: false,
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
              <span className="text-[#0A1628] font-medium">Mentions légales</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 bg-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FileText size={28} className="text-[#0A1628]" />
            </div>
            <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl text-white mb-3">
              Mentions Légales
            </h1>
            <p className="text-gray-400 font-['Inter'] text-base">
              Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-10">

            {/* Éditeur */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                1. Éditeur du site
              </h2>
              <div className="space-y-2 text-sm font-['Inter'] text-gray-600">
                <p><strong className="text-[#0A1628]">Raison sociale :</strong> Le Plombier du 66</p>
                <p><strong className="text-[#0A1628]">Forme juridique :</strong> Entreprise individuelle (artisan)</p>
                <p><strong className="text-[#0A1628]">SIRET :</strong> 123 456 789 00010</p>
                <p><strong className="text-[#0A1628]">Numéro TVA intracommunautaire :</strong> FR 12 123456789</p>
                <p><strong className="text-[#0A1628]">Adresse :</strong> Perpignan, 66000, Pyrénées-Orientales, France</p>
                <p><strong className="text-[#0A1628]">Téléphone :</strong> 04 68 XX XX XX</p>
                <p><strong className="text-[#0A1628]">Email :</strong> contact@elecpro66.fr</p>
                <p><strong className="text-[#0A1628]">Directeur de la publication :</strong> M. [Prénom Nom]</p>
              </div>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                2. Hébergement
              </h2>
              <div className="space-y-2 text-sm font-['Inter'] text-gray-600">
                <p>Ce site est hébergé par :</p>
                <p><strong className="text-[#0A1628]">Société :</strong> Manus AI</p>
                <p><strong className="text-[#0A1628]">Site web :</strong> <a href="https://manus.im" target="_blank" rel="noopener noreferrer" className="text-[#06b6d4] hover:underline">https://manus.im</a></p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                3. Propriété intellectuelle
              </h2>
              <p className="text-sm font-['Inter'] text-gray-600 leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, logos, graphismes, icônes) est protégé par le droit d'auteur et appartient à Le Plombier du 66 ou à ses partenaires. Toute reproduction, distribution, modification ou utilisation sans autorisation écrite préalable est strictement interdite.
              </p>
            </div>

            {/* Responsabilité */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                4. Limitation de responsabilité
              </h2>
              <p className="text-sm font-['Inter'] text-gray-600 leading-relaxed">
                Le Plombier du 66 s'efforce de maintenir les informations de ce site à jour et exactes. Cependant, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité des informations publiées. L'utilisation des informations de ce site se fait sous la seule responsabilité de l'utilisateur.
              </p>
            </div>

            {/* Liens hypertextes */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                5. Liens hypertextes
              </h2>
              <p className="text-sm font-['Inter'] text-gray-600 leading-relaxed">
                Ce site peut contenir des liens vers des sites tiers. Le Plombier du 66 n'est pas responsable du contenu de ces sites externes et ne peut être tenu responsable des dommages résultant de leur consultation.
              </p>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="font-['Montserrat'] font-black text-xl text-[#0A1628] mb-4 pb-2 border-b-2 border-[#06b6d4]">
                6. Droit applicable et juridiction
              </h2>
              <p className="text-sm font-['Inter'] text-gray-600 leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux compétents sont ceux du ressort de Perpignan, sauf disposition légale contraire.
              </p>
            </div>

            {/* Données personnelles */}
            <div className="bg-[#F4F5F7] rounded-2xl p-6">
              <h2 className="font-['Montserrat'] font-bold text-[#0A1628] text-base mb-3">
                Protection des données personnelles
              </h2>
              <p className="text-sm font-['Inter'] text-gray-600 mb-4">
                Pour toute information relative au traitement de vos données personnelles, consultez notre politique de confidentialité.
              </p>
              <Link href="/politique-confidentialite">
                <span className="inline-flex items-center gap-2 text-[#06b6d4] font-['Montserrat'] font-semibold text-sm hover:underline cursor-pointer">
                  Voir la politique de confidentialité
                  <ChevronRight size={14} />
                </span>
              </Link>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
