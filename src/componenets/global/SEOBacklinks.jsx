/**
 * SEOBacklinks Component
 * Internal navigation links for SEO purposes - helps search engines discover and index pages
 * Uses visually hidden but crawlable technique (search engines can still see and follow links)
 * 
 * UPDATED: Now uses locale-aware links for multilingual SEO
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";
import caseStudies from "@/data/case-studies.json";

const serviceIds = ["strategy", "ux-ui", "development", "cms", "performance", "support"];
const primaryPages = [
  { path: "/", label: "Website Agency" },
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/about", label: "Web Development Agency" },
  { path: "/about", label: "Website Development Company" },
  { path: "/services", label: "Services" },
  { path: "/services", label: "Web Development Services" },
  { path: "/services", label: "Website Development Services" },
  { path: "/services", label: "Custom Website Development" },
  { path: "/services", label: "Website Design Services" },
  { path: "/services", label: "Digital Marketing Agency" },
  { path: "/services", label: "Website Development Agency India" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/portfolio", label: "Website Design Company" },
  { path: "/portfolio", label: "Web Design Services" },
  { path: "/portfolio", label: "Best Web Development Agency" },
  { path: "/portfolio", label: "Professional Web Agency" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/case-studies", label: "Website Design Agency" },
  { path: "/case-studies", label: "Web Development Company" },
  { path: "/case-studies", label: "Website Development Case Studies" },
  { path: "/blogs", label: "Blogs" },
  { path: "/blogs", label: "Web Design Blog" },
  { path: "/blogs", label: "Website Development Blog" },
  { path: "/blogs", label: "Digital Marketing Services" },
  { path: "/contact", label: "Contact" },
  { path: "/contact", label: "Contact Us" },
  { path: "/contact", label: "Website Agency Contact" },
  { path: "/contact", label: "Get in Touch" },
  { path: "/bussines-consultancy", label: "Business Consultancy" },
  { path: "/bussines-consultancy", label: "Business Consultancy Services" },
  { path: "/bussines-consultancy", label: "Business Consulting" },
  { path: "/careers", label: "Careers" },
  { path: "/careers", label: "Digital Agency Careers" },
  { path: "/careers", label: "Web Development Jobs" },
  { path: "/careers", label: "Join Our Team" },
];

const seoKeywordLinks = [
  "Next.js Development",
  "React Development",
  "WordPress Development",
  "E-commerce Development",
  "SaaS Website Development",
  "Headless CMS Development",
  "Website Redesign",
  "Landing Page Development",
  "Web App Development",
  "UX UI Design",
  "Website Design",
  "Responsive Web Design",
  "Mobile-First Design",
  "Conversion Optimization",
  "SEO Services",
  "SEO Optimization",
  "Website Performance Optimization",
  "Core Web Vitals Optimization",
  "Website Speed Optimization",
  "Website Development Agency India",
  "Web Development Company India",
  "Best Web Development Agency",
  "Top Website Development Agency",
  "Affordable Website Development",
  "SaaS Website Development",
  "E-commerce Website Development",
  "Corporate Website Development",
  "Startup Website Development",
  "Small Business Website Development",
];

export default function SEOBacklinks() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const projectPages = Array.isArray(caseStudies)
    ? caseStudies
        .map((study) => study?.id)
        .filter(Boolean)
        .map((id) => ({ path: `/case-studies/${id}`, label: `Project ${id}` }))
    : [];

  return (
    <nav 
      className="sr-only"
      aria-label="Internal site navigation"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0
      }}
    >
      {primaryPages.map((item, index) => (
        <Link key={`primary-${index}`} href={createLocalizedHref(item.path, currentLocale)}>
          {item.label}
        </Link>
      ))}

      {/* Services main + individual service pages */}
      {serviceIds.map((serviceId) => (
        <Link key={`service-${serviceId}`} href={createLocalizedHref(`/services/${serviceId}`, currentLocale)}>
          {`Service ${serviceId}`}
        </Link>
      ))}

      {/* Project pages from case studies */}
      {projectPages.map((project, index) => (
        <Link key={`project-${index}`} href={createLocalizedHref(project.path, currentLocale)}>
          {project.label}
        </Link>
      ))}

      {/* SEO keyword backlinks to services */}
      {seoKeywordLinks.map((label, index) => (
        <Link key={`keyword-${index}`} href={createLocalizedHref("/services", currentLocale)}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

