import { MetadataRoute } from 'next'
import { servicesData } from '@/data/services'
import { siteConfig } from '@/config/site'
import { getSortedPosts } from '@/data/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic service pages
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/solutions/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Blog posts
  const posts = await getSortedPosts();
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const, // Articoli di blog tendono a essere statici
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...blogPosts]
}
