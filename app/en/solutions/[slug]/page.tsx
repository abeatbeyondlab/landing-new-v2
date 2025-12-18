import { servicesDataEn } from '@/data/services-en';
import { ServicePage } from '../../components/ServicePage';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { JsonLd, serviceSchema } from '@/components/JsonLd';

export function generateStaticParams() {
  return servicesDataEn.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesDataEn.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service is not available.',
    };
  }

  return {
    title: service.title,
    description: service.description,
    keywords: [
      ...siteConfig.keywords,
      service.title.toLowerCase(),
      service.slug.replace('-', ' '),
    ],
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'article',
      url: `${siteConfig.url}/en/solutions/${service.slug}`,
      locale: 'en_US',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${service.title} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      title: service.title,
      description: service.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/en/solutions/${service.slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesDataEn.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <ServicePage slug={service.slug} />
    </>
  );
}