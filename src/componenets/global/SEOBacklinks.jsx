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

export default function SEOBacklinks() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
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
      {/* Main Pages */}
      <Link href={createLocalizedHref("/", currentLocale)}>Website Agency</Link>
      <Link href={createLocalizedHref("/", currentLocale)}>Home</Link>
      <Link href={createLocalizedHref("/about", currentLocale)}>About Us</Link>
      <Link href={createLocalizedHref("/about", currentLocale)}>Web Development Agency</Link>
      <Link href={createLocalizedHref("/about", currentLocale)}>Website Development Company</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Services</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Web Development Services</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Development Services</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Custom Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Design Services</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Digital Marketing Agency</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Development Agency India</Link>
      <Link href={createLocalizedHref("/portfolio", currentLocale)}>Portfolio</Link>
      <Link href={createLocalizedHref("/portfolio", currentLocale)}>Website Design Company</Link>
      <Link href={createLocalizedHref("/portfolio", currentLocale)}>Web Design Services</Link>
      <Link href={createLocalizedHref("/portfolio", currentLocale)}>Best Web Development Agency</Link>
      <Link href={createLocalizedHref("/portfolio", currentLocale)}>Professional Web Agency</Link>
      <Link href={createLocalizedHref("/case-studies", currentLocale)}>Case Studies</Link>
      <Link href={createLocalizedHref("/case-studies", currentLocale)}>Website Design Agency</Link>
      <Link href={createLocalizedHref("/case-studies", currentLocale)}>Web Development Company</Link>
      <Link href={createLocalizedHref("/case-studies", currentLocale)}>Website Development Case Studies</Link>
      <Link href={createLocalizedHref("/blogs", currentLocale)}>Blogs</Link>
      <Link href={createLocalizedHref("/blogs", currentLocale)}>Web Design Blog</Link>
      <Link href={createLocalizedHref("/blogs", currentLocale)}>Website Development Blog</Link>
      <Link href={createLocalizedHref("/blogs", currentLocale)}>Digital Marketing Services</Link>
      <Link href={createLocalizedHref("/contact", currentLocale)}>Contact</Link>
      <Link href={createLocalizedHref("/contact", currentLocale)}>Contact Us</Link>
      <Link href={createLocalizedHref("/contact", currentLocale)}>Website Agency Contact</Link>
      <Link href={createLocalizedHref("/contact", currentLocale)}>Get in Touch</Link>
      <Link href={createLocalizedHref("/bussines-consultancy", currentLocale)}>Business Consultancy</Link>
      <Link href={createLocalizedHref("/bussines-consultancy", currentLocale)}>Business Consultancy Services</Link>
      <Link href={createLocalizedHref("/bussines-consultancy", currentLocale)}>Business Consulting</Link>
      <Link href={createLocalizedHref("/careers", currentLocale)}>Careers</Link>
      <Link href={createLocalizedHref("/careers", currentLocale)}>Digital Agency Careers</Link>
      <Link href={createLocalizedHref("/careers", currentLocale)}>Web Development Jobs</Link>
      <Link href={createLocalizedHref("/careers", currentLocale)}>Join Our Team</Link>
      
      {/* SEO Keywords - Website Development */}
      <Link href={createLocalizedHref("/services", currentLocale)}>Next.js Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>React Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>WordPress Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>E-commerce Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>SaaS Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Headless CMS Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Redesign</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Landing Page Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Web App Development</Link>
      
      {/* SEO Keywords - Design & UX */}
      <Link href={createLocalizedHref("/services", currentLocale)}>UX UI Design</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Design</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Responsive Web Design</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Mobile-First Design</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Conversion Optimization</Link>
      
      {/* SEO Keywords - Performance & SEO */}
      <Link href={createLocalizedHref("/services", currentLocale)}>SEO Services</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>SEO Optimization</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Performance Optimization</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Core Web Vitals Optimization</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Speed Optimization</Link>
      
      {/* SEO Keywords - Location Based */}
      <Link href={createLocalizedHref("/services", currentLocale)}>Website Development Agency India</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Web Development Company India</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Best Web Development Agency</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Top Website Development Agency</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Affordable Website Development</Link>
      
      {/* SEO Keywords - Industry Specific */}
      <Link href={createLocalizedHref("/services", currentLocale)}>SaaS Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>E-commerce Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Corporate Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Startup Website Development</Link>
      <Link href={createLocalizedHref("/services", currentLocale)}>Small Business Website Development</Link>
    </nav>
  );
}

