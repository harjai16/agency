import { Metadata } from 'next';
import { loadData } from '@/lib/data-loader';
import { locales } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

export async function generateMetadata({ params }) {
  const { serviceId, locale } = await params;
  const pageData = await loadData('services-page', locale || 'en');
  const services = pageData?.services?.items || [];
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return {
      title: 'Service Not Found | Swagatam Tech',
      description: 'The service you are looking for does not exist.',
    };
  }

  const title = `${service.title} | Swagatam Tech`;
  const description = service.summary || `${service.title} - ${service.tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/services/${serviceId}`,
      siteName: 'Swagatam Tech',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/services/${serviceId}`,
      languages: Object.fromEntries(
        locales.map((loc) => [
          loc,
          `${siteUrl}/${loc}/services/${serviceId}`,
        ])
      ),
    },
  };
}

export default function ServiceDetailLayout({ children }) {
  return children;
}
