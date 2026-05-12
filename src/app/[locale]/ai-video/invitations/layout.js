import { buildAlternateLanguageUrls, getLocaleFromHeaders } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.swagatamtech.com";

export async function generateMetadata() {
  const locale = await getLocaleFromHeaders();
  const canonical = `${siteUrl}/${locale}/ai-video/invitations`;
  return {
    title: "AI Invitation Videos | Weddings & Celebrations | Swagatam Tech",
    description:
      "Cinematic AI-assisted invitation videos—save-the-dates, wedding invites, anniversary surprises, and milestone teasers with vertical and widescreen exports for phones, venues, and social.",
    keywords: [
      "AI invitation video",
      "wedding invitation video",
      "save the date video",
      "cinematic invitation film",
      "celebration teaser video",
      "WhatsApp invitation video",
      "vertical invitation reel",
      "AI wedding video invite",
      "event invitation video agency",
      "Swagatam Tech invitation video",
    ],
    authors: [{ name: "Swagatam Tech" }],
    creator: "Swagatam Tech",
    publisher: "Swagatam Tech",
    openGraph: {
      title: "AI Invitation Videos | Swagatam Tech",
      description:
        "Story-led invitation edits sized for chat, reels, and banquet screens.",
      url: canonical,
      type: "website",
      siteName: "Swagatam Tech",
      images: [
        {
          url: `${siteUrl}/logo.jpeg`,
          width: 1200,
          height: 630,
          alt: "Swagatam Tech - AI Invitation Videos",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Invitation Videos | Swagatam Tech",
      description:
        "Premium invitation storytelling with accessible exports for every screen.",
      images: [`${siteUrl}/logo.jpeg`],
      site: "@swagatamtech",
      creator: "@swagatamtech",
    },
    alternates: {
      canonical,
      languages: buildAlternateLanguageUrls("/ai-video/invitations"),
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

export default function AiInvitationVideoLayout({ children }) {
  return children;
}
