/**
 * SEOBacklinks Component
 * Hidden backlinks for SEO purposes - helps search engines discover and index pages
 * Uses screen-reader accessible hiding technique (not display:none)
 */
export default function SEOBacklinks() {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        left: '-9999px', 
        width: '1px', 
        height: '1px', 
        overflow: 'hidden' 
      }} 
      aria-hidden="true"
    >
      {/* Main Pages */}
      <a href="/">Website Agency</a>
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/about">Web Development Agency</a>
      <a href="/about">Website Development Company</a>
      <a href="/services">Services</a>
      <a href="/services">Web Development Services</a>
      <a href="/services">Website Development Services</a>
      <a href="/services">Custom Website Development</a>
      <a href="/services">Website Design Services</a>
      <a href="/services">Digital Marketing Agency</a>
      <a href="/services">Website Development Agency India</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/portfolio">Website Design Company</a>
      <a href="/portfolio">Web Design Services</a>
      <a href="/portfolio">Best Web Development Agency</a>
      <a href="/portfolio">Professional Web Agency</a>
      <a href="/case-studies">Case Studies</a>
      <a href="/case-studies">Website Design Agency</a>
      <a href="/case-studies">Web Development Company</a>
      <a href="/case-studies">Website Development Case Studies</a>
      <a href="/blogs">Blogs</a>
      <a href="/blogs">Web Design Blog</a>
      <a href="/blogs">Website Development Blog</a>
      <a href="/blogs">Digital Marketing Services</a>
      <a href="/contact">Contact</a>
      <a href="/contact">Contact Us</a>
      <a href="/contact">Website Agency Contact</a>
      <a href="/contact">Get in Touch</a>
      <a href="/bussines-consultancy">Business Consultancy</a>
      <a href="/bussines-consultancy">Business Consultancy Services</a>
      <a href="/bussines-consultancy">Business Consulting</a>
      <a href="/careers">Careers</a>
      <a href="/careers">Digital Agency Careers</a>
      <a href="/careers">Web Development Jobs</a>
      <a href="/careers">Join Our Team</a>
      
      {/* SEO Keywords - Website Development */}
      <a href="/services">Next.js Development</a>
      <a href="/services">React Development</a>
      <a href="/services">WordPress Development</a>
      <a href="/services">E-commerce Development</a>
      <a href="/services">SaaS Website Development</a>
      <a href="/services">Headless CMS Development</a>
      <a href="/services">Website Redesign</a>
      <a href="/services">Landing Page Development</a>
      <a href="/services">Web App Development</a>
      
      {/* SEO Keywords - Design & UX */}
      <a href="/services">UX UI Design</a>
      <a href="/services">Website Design</a>
      <a href="/services">Responsive Web Design</a>
      <a href="/services">Mobile-First Design</a>
      <a href="/services">Conversion Optimization</a>
      
      {/* SEO Keywords - Performance & SEO */}
      <a href="/services">SEO Services</a>
      <a href="/services">SEO Optimization</a>
      <a href="/services">Website Performance Optimization</a>
      <a href="/services">Core Web Vitals Optimization</a>
      <a href="/services">Website Speed Optimization</a>
      
      {/* SEO Keywords - Location Based */}
      <a href="/services">Website Development Agency India</a>
      <a href="/services">Web Development Company India</a>
      <a href="/services">Best Web Development Agency</a>
      <a href="/services">Top Website Development Agency</a>
      <a href="/services">Affordable Website Development</a>
      
      {/* SEO Keywords - Industry Specific */}
      <a href="/services">SaaS Website Development</a>
      <a href="/services">E-commerce Website Development</a>
      <a href="/services">Corporate Website Development</a>
      <a href="/services">Startup Website Development</a>
      <a href="/services">Small Business Website Development</a>
    </div>
  );
}

