/**
 * Design: "Plomberie Méditerranéen"
 * Page Politique de Confidentialité – Conformité RGPD
 */
import { Link } from "wouter";
import { ChevronRight, Shield, Lock, Eye, Trash2, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function PolitiqueConfidentialitePage() {
  useSEO({
    title: "Politique de Confidentialité – RGPD | Le Plombier du 66",
    description:
      "Politique de confidentialité et protection des données personnelles d'Le Plombier du 66. Conformité RGPD, droits des utilisateurs.",
    canonical: "/politique-confidentialite",
    noIndex: false,
  });

  const sections = [
    {
      icon: Shield,
      title: "1. Responsable du traitement",
      content: [
        "Le responsable du traitement des données personnelles collectées sur ce site est :",
        "**Le Plombier du 66**",
        "Adresse : Perpignan, 66000, Pyrénées-Orientales",
        "Email : contact@elecpro66.fr",
        "Téléphone : 04 68 XX XX XX",
        "SIRET : 123 456 789 00010",
      ],
    },
    {
      icon: Eye,
      title: "2. Données collectées",
      content: [
        "Nous collectons les données personnelles suivantes via notre formulaire de contact :",
        "• **Nom et prénom** : pour vous identifier et personnaliser notre réponse",
        "• **Numéro de téléphone** : pour vous contacter rapidement concernant votre demande",
        "• **Adresse email** : pour vous envoyer notre réponse et le devis",
        "• **Type de prestation** : pour orienter votre demande vers le bon interlocuteur",
        "• **Message** : pour comprendre votre besoin et préparer une réponse adaptée",
        "Nous ne collectons aucune donnée sensible (santé, opinions politiques, etc.).",
      ],
    },
    {
      icon: Lock,
      title: "3. Finalités du traitement",
      content: [
        "Vos données sont collectées et traitées pour les finalités suivantes :",
        "• **Répondre à votre demande de devis** ou de renseignement (base légale : exécution d'un contrat précontractuel)",
        "• **Vous contacter** pour convenir d'un rendez-vous ou d'une intervention (base légale : intérêt légitime)",
        "• **Améliorer nos services** grâce à des statistiques anonymisées (base légale : intérêt légitime)",
        "Nous n'utilisons pas vos données à des fins de prospection commerciale sans votre consentement explicite.",
      ],
    },
    {
      icon: Shield,
      title: "4. Durée de conservation",
      content: [
        "Vos données personnelles sont conservées pour les durées suivantes :",
        "• **Données de contact (devis)** : 3 ans à compter du dernier contact",
        "• **Données clients (contrats)** : 10 ans à compter de la fin du contrat (obligation légale)",
        "• **Données de navigation** : 13 mois maximum (cookies analytiques)",
        "Au-delà de ces durées, vos données sont supprimées ou anonymisées.",
      ],
    },
    {
      icon: Eye,
      title: "5. Destinataires des données",
      content: [
        "Vos données personnelles sont destinées exclusivement à :",
        "• L'équipe d'Le Plombier du 66 (artisans et administratif)",
        "• Nos prestataires techniques (hébergement, messagerie) dans le cadre de contrats de sous-traitance conformes au RGPD",
        "Nous ne vendons, ne louons et ne cédons jamais vos données à des tiers à des fins commerciales.",
      ],
    },
    {
      icon: Lock,
      title: "6. Sécurité des données",
      content: [
        "Nous mettons en œuvre les mesures techniques et organisationnelles suivantes pour protéger vos données :",
        "• **Chiffrement HTTPS** (TLS 1.3) de toutes les communications",
        "• **Validation et sanitisation** des données saisies dans les formulaires",
        "• **Protection anti-spam** (honeypot, rate limiting) sur les formulaires",
        "• **Accès restreint** aux données (authentification, contrôle d'accès)",
        "• **Sauvegardes régulières** chiffrées",
        "En cas de violation de données, vous serez informé dans les 72 heures conformément à l'article 33 du RGPD.",
      ],
    },
    {
      icon: Trash2,
      title: "7. Vos droits RGPD",
      content: [
        "Conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :",
        "• **Droit d'accès** : obtenir une copie de vos données personnelles",
        "• **Droit de rectification** : corriger des données inexactes ou incomplètes",
        "• **Droit à l'effacement** (« droit à l'oubli ») : demander la suppression de vos données",
        "• **Droit à la limitation** : restreindre le traitement de vos données",
        "• **Droit à la portabilité** : recevoir vos données dans un format structuré",
        "• **Droit d'opposition** : vous opposer au traitement de vos données",
        "Pour exercer ces droits, contactez-nous à : contact@elecpro66.fr",
        "Nous répondrons dans un délai d'un mois. En cas de litige, vous pouvez saisir la CNIL (www.cnil.fr).",
      ],
    },
    {
      icon: Eye,
      title: "8. Cookies",
      content: [
        "Notre site utilise des cookies pour les finalités suivantes :",
        "• **Cookies techniques** (essentiels) : fonctionnement du site, mémorisation de vos préférences. Ces cookies ne nécessitent pas votre consentement.",
        "• **Cookies analytiques** (Umami Analytics) : mesure d'audience anonymisée, sans collecte de données personnelles identifiables. Ces cookies sont conformes au RGPD sans consentement préalable.",
        "Nous n'utilisons pas de cookies publicitaires ou de tracking tiers.",
      ],
    },
    {
      icon: Shield,
      title: "9. Modifications de cette politique",
      content: [
        "Cette politique de confidentialité peut être mise à jour pour refléter les évolutions légales ou nos pratiques. La date de dernière mise à jour est indiquée en bas de page.",
        "Nous vous encourageons à consulter régulièrement cette page.",
        "**Dernière mise à jour : 23 mars 2025**",
      ],
    },
  ];

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
              <span className="text-[#0A1628] font-medium">Politique de confidentialité</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-[#0A1628] py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 bg-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield size={28} className="text-[#0A1628]" />
            </div>
            <h1 className="font-['Montserrat'] font-black text-3xl sm:text-4xl text-white mb-3">
              Politique de Confidentialité
            </h1>
            <p className="text-gray-400 font-['Inter'] text-base max-w-xl mx-auto">
              Protection de vos données personnelles – Conformité RGPD (UE 2016/679)
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            {/* Intro */}
            <div className="bg-[#F4F5F7] rounded-2xl p-6 mb-10 flex items-start gap-4">
              <Lock size={20} className="text-[#06b6d4] flex-shrink-0 mt-0.5" />
              <p className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
                Le Plombier du 66 s'engage à protéger votre vie privée et vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations, conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {sections.map(({ icon: Icon, title, content }) => (
                <div key={title}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-[#0A1628] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#06b6d4]" />
                    </div>
                    <h2 className="font-['Montserrat'] font-black text-lg text-[#0A1628]">{title}</h2>
                  </div>
                  <div className="pl-12 space-y-2">
                    {content.map((line, i) => {
                      // Rendre le texte en gras entre **
                      const parts = line.split(/\*\*([^*]+)\*\*/g);
                      return (
                        <p key={i} className="text-gray-600 font-['Inter'] text-sm leading-relaxed">
                          {parts.map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-[#0A1628] font-semibold">{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    })}
                  </div>
                  <div className="mt-6 border-b border-gray-100" />
                </div>
              ))}
            </div>

            {/* Contact DPO */}
            <div className="mt-12 bg-[#0A1628] rounded-2xl p-6">
              <h3 className="font-['Montserrat'] font-bold text-white text-base mb-4">
                Exercer vos droits RGPD
              </h3>
              <p className="text-gray-400 font-['Inter'] text-sm mb-4">
                Pour toute demande relative à vos données personnelles, contactez-nous :
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:contact@elecpro66.fr"
                  className="flex items-center gap-2 text-[#06b6d4] font-['Inter'] text-sm hover:underline"
                >
                  <Mail size={14} />
                  contact@elecpro66.fr
                </a>
                <a
                  href="tel:+33468000000"
                  className="flex items-center gap-2 text-[#06b6d4] font-['Inter'] text-sm hover:underline"
                >
                  <Phone size={14} />
                  04 68 XX XX XX
                </a>
              </div>
              <p className="text-gray-500 font-['Inter'] text-xs mt-4">
                Vous pouvez également saisir la CNIL :{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#06b6d4] hover:underline"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
