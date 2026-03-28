/**
 * Hook useSEO – Gestion dynamique des balises meta SEO, Open Graph et JSON-LD
 * Design: "Plomberie Méditerranéen" – Le Plombier du 66
 *
 * Utilisation :
 *   useSEO({ title, description, canonical, jsonLd })
 */
import { useEffect } from "react";

const SITE_URL = "https://plombier-perpignan66.fr";
const SITE_NAME = "Le Plombier du 66";
const DEFAULT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663468020547/b23Hm8oyV3TPnHzP3iCvwg/hero-plombier-Vr46JfruqYxroApnLBtBds.webp";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(data: object | object[], id: string) {
  // Supprimer l'ancien script JSON-LD dynamique s'il existe
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
  document.head.appendChild(script);
}

export function useSEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedAt,
  jsonLd,
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    // Utiliser le titre tel quel – ne pas ajouter le nom du site s'il est déjà inclus
    const fullTitle = title;

    // ── Title ──────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Meta de base ───────────────────────────────────
    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large");

    // ── Canonical ─────────────────────────────────────
    if (canonical) {
      setLink("canonical", canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`);
    }

    // ── Open Graph ────────────────────────────────────
    setMeta("og:type", type, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonical ? (canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`) : SITE_URL, true);
    setMeta("og:image", image, true);
    setMeta("og:image:alt", `${title} – ${SITE_NAME}`, true);
    setMeta("og:locale", "fr_FR", true);

    // ── Twitter Card ──────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // ── Article spécifique ────────────────────────────
    if (type === "article" && publishedAt) {
      setMeta("article:published_time", publishedAt, true);
      setMeta("article:author", SITE_NAME, true);
    }

    // ── JSON-LD dynamique ─────────────────────────────
    if (jsonLd) {
      injectJsonLd(jsonLd, "dynamic-json-ld");
    }

    // Nettoyage à la navigation
    return () => {
      const dynamicLd = document.getElementById("dynamic-json-ld");
      if (dynamicLd) dynamicLd.remove();
    };
  }, [title, description, canonical, image, type, publishedAt, jsonLd, noIndex]);
}

// ─── Helpers JSON-LD ──────────────────────────────────────────────────────────

export function buildServiceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "ElectricalContractor",
      "name": SITE_NAME,
      "url": SITE_URL,
      "telephone": "+33468000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Perpignan",
        "postalCode": "66000",
        "addressCountry": "FR",
      },
    },
    ...(service.price && {
      "offers": {
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
      },
    }),
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Pyrénées-Orientales",
    },
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function buildArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "image": article.image,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.svg`,
      },
    },
    "keywords": article.tags?.join(", "),
    "inLanguage": "fr-FR",
  };
}

export function buildLocalBusinessJsonLd(city: {
  name: string;
  slug: string;
  postalCode: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "name": `${SITE_NAME} – ${city.name}`,
    "description": city.description,
    "url": `${SITE_URL}/plombier-${city.slug}`,
    "telephone": "+33468000000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "postalCode": city.postalCode,
      "addressCountry": "FR",
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
    },
    "parentOrganization": {
      "@id": `${SITE_URL}/#business`,
    },
  };
}
