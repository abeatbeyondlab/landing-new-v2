export const siteConfig = {
  name: "A Beat Beyond",
  description: "A Beat Beyond è l'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell'oceano digitale. Specializzati in Digital Transformation.",
  url: "https://www.abeatbeyond.com",
  locale: "it_IT",
  author: "A Beat Beyond",
  
  // Open Graph defaults
  ogImage: "/images/og-default.jpg", // We'll create this later
  ogType: "website" as const,
  
  // Default keywords for the site
  keywords: [
    "digital transformation",
    "trasformazione digitale",
    "consulenza informatica",
    "advisor digitale",
    "PMI",
    "software gestionale",
    "ERP",
    "CRM",
    "cybersecurity",
    "business intelligence",
    "architetture informatiche",
    "integrazione sistemi",
    "open source",
    "project management",
    "formazione IT"
  ],
  
  // Social media links (add as needed)
  social: {
    // linkedin: "https://linkedin.com/company/abeatbeyond",
    // twitter: "https://twitter.com/abeatbeyond",
  },
  
  // Contact information
  contact: {
    // email: "info@abeatbeyond.com",
    // phone: "+39-123-456789",
    // address: "Via Roma 1, 00100 Roma, Italia"
  }
}

export type SiteConfig = typeof siteConfig
