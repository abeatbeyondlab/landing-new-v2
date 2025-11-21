import { servicesData } from '../../../data/services';
import { ServicePage } from '../../../components/ServicePage';

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return <ServicePage slug={service.slug} />;
}
