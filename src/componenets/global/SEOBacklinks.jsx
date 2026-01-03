/**
 * SEOBacklinks Component
 * Internal navigation links for SEO purposes - helps search engines discover and index pages
 * Uses visually hidden but crawlable technique (search engines can still see and follow links)
 */
import Link from "next/link";

export default function SEOBacklinks() {
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
      <Link href="/">Website Agency</Link>
      <Link href="/">Home</Link>
      <Link href="/about">About Us</Link>
      <Link href="/about">Web Development Agency</Link>
      <Link href="/about">Website Development Company</Link>
      <Link href="/services">Services</Link>
      <Link href="/services">Web Development Services</Link>
      <Link href="/services">Website Development Services</Link>
      <Link href="/services">Custom Website Development</Link>
      <Link href="/services">Website Design Services</Link>
      <Link href="/services">Digital Marketing Agency</Link>
      <Link href="/services">Website Development Agency India</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/portfolio">Website Design Company</Link>
      <Link href="/portfolio">Web Design Services</Link>
      <Link href="/portfolio">Best Web Development Agency</Link>
      <Link href="/portfolio">Professional Web Agency</Link>
      <Link href="/case-studies">Case Studies</Link>
      <Link href="/case-studies">Website Design Agency</Link>
      <Link href="/case-studies">Web Development Company</Link>
      <Link href="/case-studies">Website Development Case Studies</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/blogs">Web Design Blog</Link>
      <Link href="/blogs">Website Development Blog</Link>
      <Link href="/blogs">Digital Marketing Services</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/contact">Contact Us</Link>
      <Link href="/contact">Website Agency Contact</Link>
      <Link href="/contact">Get in Touch</Link>
      <Link href="/bussines-consultancy">Business Consultancy</Link>
      <Link href="/bussines-consultancy">Business Consultancy Services</Link>
      <Link href="/bussines-consultancy">Business Consulting</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/careers">Digital Agency Careers</Link>
      <Link href="/careers">Web Development Jobs</Link>
      <Link href="/careers">Join Our Team</Link>
      
      {/* SEO Keywords - Website Development */}
      <Link href="/services">Next.js Development</Link>
      <Link href="/services">React Development</Link>
      <Link href="/services">WordPress Development</Link>
      <Link href="/services">E-commerce Development</Link>
      <Link href="/services">SaaS Website Development</Link>
      <Link href="/services">Headless CMS Development</Link>
      <Link href="/services">Website Redesign</Link>
      <Link href="/services">Landing Page Development</Link>
      <Link href="/services">Web App Development</Link>
      
      {/* SEO Keywords - Design & UX */}
      <Link href="/services">UX UI Design</Link>
      <Link href="/services">Website Design</Link>
      <Link href="/services">Responsive Web Design</Link>
      <Link href="/services">Mobile-First Design</Link>
      <Link href="/services">Conversion Optimization</Link>
      
      {/* SEO Keywords - Performance & SEO */}
      <Link href="/services">SEO Services</Link>
      <Link href="/services">SEO Optimization</Link>
      <Link href="/services">Website Performance Optimization</Link>
      <Link href="/services">Core Web Vitals Optimization</Link>
      <Link href="/services">Website Speed Optimization</Link>
      
      {/* SEO Keywords - Location Based */}
      <Link href="/services">Website Development Agency India</Link>
      <Link href="/services">Web Development Company India</Link>
      <Link href="/services">Best Web Development Agency</Link>
      <Link href="/services">Top Website Development Agency</Link>
      <Link href="/services">Affordable Website Development</Link>
      
      {/* SEO Keywords - Industry Specific */}
      <Link href="/services">SaaS Website Development</Link>
      <Link href="/services">E-commerce Website Development</Link>
      <Link href="/services">Corporate Website Development</Link>
      <Link href="/services">Startup Website Development</Link>
      <Link href="/services">Small Business Website Development</Link>
    </nav>
  );
}

