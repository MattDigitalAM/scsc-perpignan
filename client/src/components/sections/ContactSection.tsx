/**
 * Design: "Plomberie Méditerranéen"
 * Contact section with form, info cards, and Google Maps embed
 * Sécurité : honeypot, validation, rate limiting, RGPD
 */
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Link } from "wouter";
import {
  useFormSecurity,
  validateForm,
  sanitizeInput,
  type FormData,
  type ValidationErrors,
} from "@/hooks/useFormSecurity";

const serviceOptions = [
  { value: "installation", label: "Installation sanitaire" },
  { value: "conformite", label: "Débouchage" },
  { value: "depannage", label: "Dépannage d'urgence" },
  { value: "tableau", label: "Chauffe-eau" },
  { value: "eclairage", label: "Éclairage LED / Domotique" },
  { value: "irve", label: "Borne de recharge IRVE" },
  { value: "solaire", label: "Débouchage de canalisations" },
  { value: "tertiaire", label: "Plomberie sanitaire" },
  { value: "autre", label: "Autre demande" },
];

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="flex items-center gap-1 text-red-500 text-xs font-['Inter'] mt-1">
      <AlertCircle size={12} />
      {error}
    </p>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [form, setForm] = useState<FormData>({
    nom: "",
    telephone: "",
    email: "",
    service: "",
    message: "",
    _website: "", // Honeypot – invisible pour les humains
  });

  const { checkSecurity, onSuccessfulSubmit, securityError } = useFormSecurity();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Vérifications de sécurité (honeypot, timing, rate limit)
    if (!checkSecurity(form)) {
      setIsSubmitting(false);
      return;
    }

    // 2. Validation des champs
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // 3. Vérification consentement RGPD
    if (!rgpdConsent) {
      setErrors({ message: "Veuillez accepter la politique de confidentialité." });
      setIsSubmitting(false);
      return;
    }

    // 4. Sanitisation des données avant envoi
    const sanitizedData = {
      nom: sanitizeInput(form.nom),
      telephone: sanitizeInput(form.telephone),
      email: sanitizeInput(form.email),
      service: form.service,
      message: sanitizeInput(form.message),
    };

    // 5. Simulation d'envoi (à remplacer par EmailJS/Formspree)
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.info("[Form] Données sanitisées prêtes à envoyer :", sanitizedData);

    onSuccessfulSubmit();
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const inputClass = (hasError?: string) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-[#0A1628] font-['Inter'] text-sm focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
        : "border-gray-200 focus:border-[#06b6d4] focus:ring-[#06b6d4]/20"
    }`;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
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
            Contactez-nous
          </p>
          <h2 className="font-['Montserrat'] font-black text-3xl sm:text-4xl lg:text-5xl text-[#0A1628] mb-4">
            Demandez votre{" "}
            <span className="relative inline-block">
              devis gratuit
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#06b6d4] rounded-full" />
            </span>
          </h2>
          <p className="text-gray-500 font-['Inter'] text-lg max-w-2xl mx-auto mt-6">
            Réponse sous 24h – Devis gratuit et sans engagement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-['Montserrat'] font-bold text-xl text-[#0A1628] mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-gray-600 font-['Inter']">
                  Nous vous répondrons dans les 24 heures. En cas d'urgence, appelez-nous directement.
                </p>
                <a
                  href="tel:+33468000000"
                  className="inline-flex items-center gap-2 mt-6 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold px-6 py-3 rounded-xl"
                >
                  <Phone size={18} />
                  04 68 XX XX XX
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#F4F5F7] rounded-2xl p-6 lg:p-8 space-y-4"
                noValidate
                aria-label="Formulaire de demande de devis"
              >
                {/* ── Honeypot (invisible pour les humains, piège pour les bots) ── */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
                  tabIndex={-1}
                >
                  <label htmlFor="website">Ne pas remplir ce champ</label>
                  <input
                    type="text"
                    id="website"
                    name="_website"
                    value={form._website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Erreur de sécurité globale */}
                {securityError && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                    <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm font-['Inter']">{securityError}</p>
                  </div>
                )}

                {/* Nom + Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-['Montserrat'] font-semibold text-[#0A1628] mb-1.5">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      autoComplete="name"
                      maxLength={100}
                      className={inputClass(errors.nom)}
                      aria-describedby={errors.nom ? "nom-error" : undefined}
                      aria-invalid={!!errors.nom}
                    />
                    <FieldError error={errors.nom} />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-['Montserrat'] font-semibold text-[#0A1628] mb-1.5">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={form.telephone}
                      onChange={handleChange}
                      placeholder="06 XX XX XX XX"
                      autoComplete="tel"
                      maxLength={20}
                      className={inputClass(errors.telephone)}
                      aria-invalid={!!errors.telephone}
                    />
                    <FieldError error={errors.telephone} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-['Montserrat'] font-semibold text-[#0A1628] mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@email.com"
                    autoComplete="email"
                    maxLength={200}
                    className={inputClass(errors.email)}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError error={errors.email} />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-['Montserrat'] font-semibold text-[#0A1628] mb-1.5">
                    Type de prestation <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass(errors.service)}
                    aria-invalid={!!errors.service}
                  >
                    <option value="" disabled>Sélectionnez un service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FieldError error={errors.service} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-['Montserrat'] font-semibold text-[#0A1628] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={2000}
                    placeholder="Décrivez votre projet ou votre problème..."
                    className={`${inputClass(errors.message)} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  <div className="flex items-center justify-between">
                    <FieldError error={errors.message} />
                    <span className="text-xs text-gray-400 font-['Inter'] ml-auto">
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Consentement RGPD */}
                <div className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                  <input
                    type="checkbox"
                    id="rgpd"
                    checked={rgpdConsent}
                    onChange={(e) => setRgpdConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#06b6d4] flex-shrink-0 cursor-pointer"
                    required
                  />
                  <label htmlFor="rgpd" className="text-xs text-gray-500 font-['Inter'] cursor-pointer leading-relaxed">
                    J'accepte que mes données soient traitées par Le Plombier du 66 pour répondre à ma demande, conformément à notre{" "}
                    <Link href="/politique-confidentialite">
                      <span className="text-[#06b6d4] hover:underline cursor-pointer">politique de confidentialité</span>
                    </Link>
                    . Vous pouvez exercer vos droits RGPD à tout moment.
                  </label>
                </div>

                {/* Bouton submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || !rgpdConsent}
                  className="w-full flex items-center justify-center gap-2 bg-[#06b6d4] text-[#0A1628] font-['Montserrat'] font-bold py-4 rounded-xl hover:bg-cyan-500 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0A1628]/30 border-t-[#0A1628] rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer ma demande
                    </>
                  )}
                </button>

                {/* Badge sécurité */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-['Inter']">
                  <Shield size={12} className="text-green-500" />
                  <span>Formulaire sécurisé – Données chiffrées – Conformité RGPD</span>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Phone,
                  title: "Téléphone",
                  value: "04 68 XX XX XX",
                  sub: "Urgences 7j/7",
                  href: "tel:+33468000000",
                },
                {
                  icon: Mail,
                  title: "Email",
                  value: "contact@elecpro66.fr",
                  sub: "Réponse sous 24h",
                  href: "mailto:contact@elecpro66.fr",
                },
                {
                  icon: Clock,
                  title: "Horaires",
                  value: "Lun–Sam 8h–19h",
                  sub: "Urgences 7j/7",
                },
                {
                  icon: MapPin,
                  title: "Zone",
                  value: "Perpignan & 66",
                  sub: "Tout le département",
                },
              ].map(({ icon: Icon, title, value, sub, href }) => (
                <div key={title} className="bg-[#F4F5F7] rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-[#0A1628] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#06b6d4]" />
                    </div>
                    <div className="font-['Montserrat'] font-bold text-[#0A1628] text-sm">{title}</div>
                  </div>
                  {href ? (
                    <a href={href} className="text-[#0A1628] font-['Inter'] text-sm font-medium hover:text-[#06b6d4] transition-colors block">
                      {value}
                    </a>
                  ) : (
                    <div className="text-[#0A1628] font-['Inter'] text-sm font-medium">{value}</div>
                  )}
                  <div className="text-gray-500 text-xs font-['Inter'] mt-0.5">{sub}</div>
                </div>
              ))}
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden flex-1 min-h-[280px]">
              <iframe
                title="Localisation Le Plombier du 66"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46688.72!2d2.8954!3d42.6976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b05c3a9d8f5555%3A0x40819a5fd979a70!2sPerpignan!5e0!3m2!1sfr!2sfr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
