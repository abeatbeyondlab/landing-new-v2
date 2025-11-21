interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization schema for the company
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A Beat Beyond',
    description: 'A Beat Beyond è l\'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell\'oceano digitale. Specializzati in Digital Transformation.',
    url: 'https://www.abeatbeyond.com',
    logo: 'https://www.abeatbeyond.com/favicon.ico',
    contactPoint: {
      '@type': 'ContactPoint',
      // contactType: 'customer service',
      // availableLanguage: 'Italian'
    },
    sameAs: [
      // Add social media URLs when available
      // 'https://linkedin.com/company/abeatbeyond',
      // 'https://twitter.com/abeatbeyond',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Italy'
    }
  }
}

// Service schema for individual services
export function serviceSchema(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'A Beat Beyond',
      url: 'https://www.abeatbeyond.com'
    },
    serviceType: 'Digital Transformation Consulting',
    areaServed: {
      '@type': 'Country',
      name: 'Italy'
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'PMI (Piccole e Medie Imprese)'
    }
  }
}

// Website schema for the homepage
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'A Beat Beyond',
    description: 'A Beat Beyond è l\'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell\'oceano digitale. Specializzati in Digital Transformation.',
    url: 'https://www.abeatbeyond.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.abeatbeyond.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}
