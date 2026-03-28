/**
 * Hook useFormSecurity – Protection anti-spam et sécurité des formulaires
 * Design: "Plomberie Méditerranéen" – Le Plombier du 66
 *
 * Protections implémentées :
 * 1. Champ honeypot invisible (pièges pour bots)
 * 2. Rate limiting côté client (max 3 soumissions / 10 min)
 * 3. Délai minimum de remplissage (< 3 secondes = bot probable)
 * 4. Validation stricte des champs
 * 5. Sanitisation des inputs (XSS prevention)
 */
import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FormData {
  nom: string;
  telephone: string;
  email: string;
  service: string;
  message: string;
  // Honeypot (ne doit jamais être rempli par un humain)
  _website?: string;
}

export interface ValidationErrors {
  nom?: string;
  telephone?: string;
  email?: string;
  service?: string;
  message?: string;
}

// ─── Rate Limiting ────────────────────────────────────────────────────────────

const RATE_LIMIT_KEY = "elecpro_form_submissions";
const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MIN_FILL_TIME_MS = 3000; // 3 secondes minimum

function getRateLimitData(): { count: number; firstSubmission: number } {
  try {
    const data = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (!data) return { count: 0, firstSubmission: Date.now() };
    return JSON.parse(data);
  } catch {
    return { count: 0, firstSubmission: Date.now() };
  }
}

function updateRateLimitData(data: { count: number; firstSubmission: number }) {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage non disponible (mode privé strict)
  }
}

function isRateLimited(): boolean {
  const data = getRateLimitData();
  const now = Date.now();

  // Réinitialiser si la fenêtre est expirée
  if (now - data.firstSubmission > RATE_LIMIT_WINDOW_MS) {
    updateRateLimitData({ count: 0, firstSubmission: now });
    return false;
  }

  return data.count >= MAX_SUBMISSIONS;
}

function incrementSubmissionCount() {
  const data = getRateLimitData();
  const now = Date.now();

  if (now - data.firstSubmission > RATE_LIMIT_WINDOW_MS) {
    updateRateLimitData({ count: 1, firstSubmission: now });
  } else {
    updateRateLimitData({ count: data.count + 1, firstSubmission: data.firstSubmission });
  }
}

// ─── Sanitisation ─────────────────────────────────────────────────────────────

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Supprimer les balises HTML basiques
    .replace(/javascript:/gi, "") // Supprimer les URLs javascript:
    .replace(/on\w+\s*=/gi, "") // Supprimer les gestionnaires d'événements inline
    .substring(0, 2000); // Limiter la longueur
}

// ─── Validation ───────────────────────────────────────────────────────────────

const PHONE_REGEX = /^(\+33|0033|0)[1-9](\d{8})$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateForm(data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Nom
  if (!data.nom.trim()) {
    errors.nom = "Votre nom est requis.";
  } else if (data.nom.trim().length < 2) {
    errors.nom = "Votre nom doit contenir au moins 2 caractères.";
  } else if (data.nom.trim().length > 100) {
    errors.nom = "Votre nom est trop long (max 100 caractères).";
  }

  // Téléphone
  const phoneClean = data.telephone.replace(/[\s.-]/g, "");
  if (!phoneClean) {
    errors.telephone = "Votre numéro de téléphone est requis.";
  } else if (!PHONE_REGEX.test(phoneClean)) {
    errors.telephone = "Numéro de téléphone invalide (format français attendu).";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "Votre adresse email est requise.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Adresse email invalide.";
  }

  // Service
  if (!data.service) {
    errors.service = "Veuillez sélectionner un service.";
  }

  // Message
  if (!data.message.trim()) {
    errors.message = "Votre message est requis.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Votre message est trop court (min 10 caractères).";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Votre message est trop long (max 2000 caractères).";
  }

  return errors;
}

// ─── Hook principal ───────────────────────────────────────────────────────────

export function useFormSecurity() {
  const formLoadTime = useRef(Date.now());
  const [securityError, setSecurityError] = useState<string | null>(null);

  const checkSecurity = useCallback((data: FormData): boolean => {
    setSecurityError(null);

    // 1. Vérification honeypot
    if (data._website && data._website.trim() !== "") {
      console.warn("[Security] Honeypot field filled – bot detected");
      setSecurityError("Une erreur est survenue. Veuillez réessayer.");
      return false;
    }

    // 2. Vérification du délai de remplissage
    const fillTime = Date.now() - formLoadTime.current;
    if (fillTime < MIN_FILL_TIME_MS) {
      console.warn("[Security] Form filled too fast – bot suspected");
      setSecurityError("Formulaire soumis trop rapidement. Veuillez réessayer.");
      return false;
    }

    // 3. Rate limiting
    if (isRateLimited()) {
      setSecurityError(
        "Trop de tentatives. Veuillez attendre 10 minutes avant de soumettre à nouveau, ou appelez-nous directement."
      );
      return false;
    }

    return true;
  }, []);

  const onSuccessfulSubmit = useCallback(() => {
    incrementSubmissionCount();
    formLoadTime.current = Date.now(); // Réinitialiser pour la prochaine soumission
  }, []);

  return {
    checkSecurity,
    onSuccessfulSubmit,
    securityError,
    setSecurityError,
  };
}
