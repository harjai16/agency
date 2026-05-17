import AiVideoHubPage from "@/componenets/ai-video/HubPage";
import { buildAlternateLanguageUrls, getLocaleFromHeaders } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.swagatamtech.com";

export async function generateMetadata() {
  const locale = await getLocaleFromHeaders();
  const canonical = `${siteUrl}/${locale}/ai-video`;
  return {
    title: "AI Video Production | Corporate, Social & Invitation Films | Swagatam Tech",
    description:
      "AI-assisted video production for companies and celebrations—corporate brand films, explainers, social ads, SEO-aware publishing, wedding invitations, and event teasers. Strategy-led creative with multi-format delivery.",
    keywords: [
      "AI video production",
      "AI video company",
      "corporate AI video",
      "AI invitation video",
      "AI wedding invitation video",
      "AI video ads",
      "AI explainer video",
      "AI social video",
      "brand film production",
      "video SEO",
      "YouTube SEO video",
      "vertical video ads",
      "product demo video",
      "employer branding video",
      "AI assisted video editing",
      "invitation video maker agency",
      "corporate video agency India",
      "Swagatam Tech AI video",
      "AI video for business",
      "AI video for weddings",
      "video production for startups",
      "AI animated corporate video",
      "AI marketing video agency",
    ],
    authors: [{ name: "Swagatam Tech" }],
    creator: "Swagatam Tech",
    publisher: "Swagatam Tech",
    openGraph: {
      title: "AI Video Production | Corporate, Social & Invitation Films | Swagatam Tech",
      description:
        "Corporate films, explainers, social ads, and invitation storytelling—AI-assisted production with human creative direction.",
      url: canonical,
      type: "website",
      siteName: "Swagatam Tech",
      images: [
        {
          url: `${siteUrl}/logo.jpeg`,
          width: 1200,
          height: 630,
          alt: "Swagatam Tech - AI Video Production",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Video Production | Swagatam Tech",
      description:
        "Corporate, social, and invitation AI-assisted video—built for modern distribution.",
      images: [`${siteUrl}/logo.jpeg`],
      site: "@swagatamtech",
      creator: "@swagatamtech",
    },
    alternates: {
      canonical,
      languages: buildAlternateLanguageUrls("/ai-video"),
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

export default function AiVideoPage() {
  return <AiVideoHubPage />;
}
