import Hero from "@/componenets/Hero";
import Services from "@/componenets/Services";
import CaseStudies from "@/componenets/CaseStudies";
import Process from "@/componenets/Process";
import Testimonials from "@/componenets/Testimonials";   
import Contact from "@/componenets/Contact";
import WhyChoose from "@/componenets/WhyChoose";

   
import StructuredData from "@/componenets/global/StructuredData";

     
export const metadata = {
  title: "Website Dev Agency | Fast Performance | Swagatam Tech",
  description: "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth. 10+ projects delivered, 98% satisfaction.",
  keywords: [
    "website development agency",
    "custom website design",
    "Next.js development",
    "React development",
    "web design services",
    "SEO optimization",
    "conversion optimization",
    "performance optimization",
    "SaaS website development",
    "e-commerce development",
    "web development company",
    "website design agency",
    "custom web development",
    "professional web design",
    "responsive website design",
    "modern website development",
    "website redesign",
    "web development services",
    "website development India",
    "best web development agency",
    "web development company India",
    "website design company",
    "custom web application development",
    "WordPress development",
    "headless CMS development",
    "website performance optimization",
    "UX UI design services",
    "website strategy consulting",
    "digital agency",
    "web development studio",
    "website maintenance services",
    "responsive web design",
    "mobile-first web design",
    "progressive web app development",
    "website analytics setup",
    "website security services"
  ],
  authors: [{ name: "Swagatam Tech" }],
  creator: "Swagatam Tech",
  publisher: "Swagatam Tech",
  openGraph: {
    title: "Website Dev Agency | Fast Performance | Swagatam Tech",
    description: "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth.",
    url: "/",
    type: "website",
    siteName: "Swagatam Tech",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Swagatam Tech - Website Development Agency",
      },
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "Swagatam Tech Logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Dev Agency | Fast Performance | Swagatam Tech",
    description: "Website development agency building fast performance websites for business growth. We built high-performance websites with strategy, UX design, and development focused on leads, conversions, and measurable growth.",
    images: ["/logo.jpeg"],
    site: "@swagatamtech",
    creator: "@swagatamtech",
  },
  alternates: {
    canonical: "https://www.swagatamtech.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Swagatam Tech",
    "url": siteUrl,
    "description": "Transform your website into a revenue engine. We build fast, conversion-focused websites with strategy, UX design, and modern development that drives measurable growth.",
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 1200,
      "height": 630
    },
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 512,
      "height": 512
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/blogs?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Swagatam Tech",
    "description": "Complete website services: strategy, UX/UI design, custom development, CMS setup, performance optimization, and SEO. Built to convert visitors.",
    "url": siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 1200,
      "height": 630
    },
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.jpeg`,
      "width": 512,
      "height": 512
    },
    "serviceType": [
      "Website Development",
      "Web Design",
      "UX/UI Design",
      "SEO Optimization",
      "Performance Optimization",
      "CMS Development"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Website Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Strategy & Structure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UX & UI Website Design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance & SEO Improvements"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most projects take 4–6 weeks depending on scope, revisions and content readiness. We also offer accelerated delivery for time-sensitive launches."
        }
      },
      {
        "@type": "Question",
        "name": "Do you handle everything or do we need separate designers/developers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We are a full-stack team. We handle UX/UI design, development, responsiveness, hosting setup, SEO optimization, analytics and launch support."
        }
      },
      {
        "@type": "Question",
        "name": "Will my website be SEO optimized?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We follow SEO best practices including structured data, page speed optimization, responsive layout, metadata, sitemaps and on-page keyword strategy."
        }
      },
      {
        "@type": "Question",
        "name": "Can you redesign our existing website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We improve UI, UX, performance, conversions, SEO and overall brand perception. We can migrate your current content too."
        }
      },
      {
        "@type": "Question",
        "name": "Do you build custom designs or use templates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Everything we ship is custom built. No generic templates. Your website will be tailored to your brand, target audience and business goals."
        }
      },
      {
        "@type": "Question",
        "name": "Can we update the website ourselves after launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — we build with modern CMS setups like WordPress, Headless CMS, or custom admin dashboards so your team can update text, images and blogs easily."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide ongoing support and maintenance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer affordable monthly maintenance including updates, performance monitoring, backups, bug fixes and monthly SEO improvements."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a website project cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pricing depends on complexity and features. Most small business websites fall between $1.5k–$8k. E-commerce or larger platforms priced separately. We provide clear fixed pricing before starting."
        }
      }
    ]
  };

  return (
  <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />
      <Hero />
      <Services />
           {/* <LogosStrip/> */}
           <CaseStudies />
      
             <Process />
                <Testimonials />
                {/* <Faq /> */}
             <WhyChoose />
                 <Contact pageName="Home" />
                 
      {/* other sections will come here */}
      <SEOBacklinks />
    </>
  );
}
