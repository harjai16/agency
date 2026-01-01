"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Frontend SEO Component
 * Dynamically updates meta tags for client-side navigation
 */
export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  image,
  type = 'website',
  noindex = false 
}) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';
  const fullTitle = title?.includes('Swagatam Tech') ? title : `${title} | Swagatam Tech`;
  const imageUrl = image?.startsWith('http') ? image : image ? `${siteUrl}${image}` : `${siteUrl}/logo.png`;
  const canonicalUrl = `${siteUrl}${pathname}`;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update title
    if (title) {
      document.title = fullTitle;
    }

    // Update description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, 'property');
      updateMetaTag('twitter:description', description);
    }

    // Update keywords
    if (keywords) {
      const keywordsStr = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      updateMetaTag('keywords', keywordsStr);
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', fullTitle, 'property');
      updateMetaTag('twitter:title', fullTitle);
    }

    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:image', imageUrl, 'property');
    updateMetaTag('twitter:image', imageUrl);
    updateMetaTag('twitter:card', 'summary_large_image');

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update robots meta
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
  }, [title, description, keywords, image, type, noindex, pathname, fullTitle, imageUrl, canonicalUrl]);

  return null; // This component doesn't render anything
}

