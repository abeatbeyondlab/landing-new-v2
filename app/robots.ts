import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Add disallow rules for admin or private pages if they exist in the future
      // disallow: ['/admin/', '/private/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
