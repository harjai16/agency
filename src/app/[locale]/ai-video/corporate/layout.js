import { buildAlternateLanguageUrls, getLocaleFromHeaders } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.swagatamtech.com";

export async function generateMetadata() {
  const locale = await getLocaleFromHeaders();
  const canonical = `${siteUrl}/${locale}/ai-video/corporate`;
  return {
    title: "Corporate AI Video Production | Brand & GTM Films | Swagatam Tech",
    description:
      "Corporate AI video production for vision films, employer branding, leadership updates, explainers, and product demos—multi-format masters for web, LinkedIn, and paid social with SEO-aligned publishing guidance.",
    keywords: [
      "corporate AI video",
      "company brand video",
      "B2B video production",
      "employer branding video",
      "product explainer video",
      "AI corporate video",
      "LinkedIn video ads",
      "marketing video agency",
      "homepage hero video",
      "sales enablement video",
      "corporate film production India",
      "Swagatam Tech corporate video",
    ],
    authors: [{ name: "Swagatam Tech" }],
    creator: "Swagatam Tech",
    publisher: "Swagatam Tech",
    openGraph: {
      title: "Corporate AI Video Production | Swagatam Tech",
      description:
        "Brand-safe corporate storytelling with AI-assisted editing and campaign-ready variants.",
      url: canonical,
      type: "website",
      siteName: "Swagatam Tech",
      images: [
        {
          url: `${siteUrl}/logo.jpeg`,
          width: 1200,
          height: 630,
          alt: "Swagatam Tech - Corporate AI Video",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Corporate AI Video Production | Swagatam Tech",
      description:
        "Vision films, explainers, and hiring stories—built for modern GTM teams.",
      images: [`${siteUrl}/logo.jpeg`],
      site: "@swagatamtech",
      creator: "@swagatamtech",
    },
    alternates: {
      canonical,
      languages: buildAlternateLanguageUrls("/ai-video/corporate"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "IN",
      "geo.placename": "India",
    },
  };
}

export default function CorporateAiVideoLayout({ children }) {
  return children;
}
