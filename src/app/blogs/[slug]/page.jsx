"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Contact from "@/componenets/Contact";
import StructuredData from "@/componenets/global/StructuredData";
import SEOHead from "@/componenets/global/SEOHead";
import SocialShare from "@/componenets/global/SocialShare";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (slug) {
      // Reset state when slug changes
      setLoading(true);
      setBlog(null);
      fetchBlog();
      fetchRelatedBlogs();
    } else {
      setLoading(false);
    }
  }, [slug]);

  // Style links in blog content
  useEffect(() => {
    if (blog?.content) {
      const style = document.createElement('style');
      style.id = 'blog-links-style';
      style.textContent = `
        .blog-content a {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          transition: color 0.2s ease;
        }
        .blog-content a:hover {
          color: #1d4ed8 !important;
        }
        .blog-content a:visited {
          color: #7c3aed !important;
        }
      `;
      // Remove existing style if present
      const existingStyle = document.getElementById('blog-links-style');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
      document.head.appendChild(style);
      return () => {
        const styleToRemove = document.getElementById('blog-links-style');
        if (styleToRemove) {
          document.head.removeChild(styleToRemove);
        }
      };
    }
  }, [blog?.content]);

  const fetchBlog = async () => {
    try {
      if (!slug) {
        console.error('No slug provided');
        setLoading(false);
        return;
      }

      console.log('Fetching blog with slug:', slug);
      const apiUrl = `/api/blogs/slug/${encodeURIComponent(slug)}`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch blog:', response.status, response.statusText, errorData);
        setBlog(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success && data.blog) {
        console.log('Blog fetched successfully:', data.blog.title);
        setBlog(data.blog);
        // Update page title and meta tags for SEO
        if (typeof document !== 'undefined') {
          document.title = data.blog.metaTitle || data.blog.title;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', data.blog.metaDescription || data.blog.excerpt || '');
          }
        }
      } else {
        console.error('Blog not found or error:', data.error || 'Unknown error', data);
        setBlog(null);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?status=published');
      const data = await response.json();

      if (data.success && data.blogs) {
        // Get up to 3 related blogs (excluding current one)
        const related = data.blogs
          .filter(b => b.slug !== slug)
          .slice(0, 3);
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.error('Error fetching related blogs:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Convert Google Drive share link to direct image URL
  const convertGoogleDriveUrl = (url) => {
    if (!url) return url;
    
    // Check if it's a Google Drive share link
    const driveSharePattern = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveSharePattern);
    
    if (match && match[1]) {
      // Convert to direct image URL
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Return original URL if not a Google Drive share link
    return url;
  };

  if (loading) {
    return (
      <main className="bg-white text-gray-900">
        <Section className="py-24 md:py-32">
          <div className="max-w-fullhd mx-auto text-center">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </Section>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="bg-white text-gray-900">
        <Section className="py-24 md:py-32">
          <div className="max-w-fullhd mx-auto text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Blog post not found
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              The article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/blogs">Back to all blogs</Link>
            </Button>
          </div>
        </Section>
      </main>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';
  const blogUrl = `${siteUrl}/blogs/${slug}`;

  // Auto-generated schema (fallback)
  const defaultArticleSchema = blog ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.metaDescription || blog.excerpt || blog.title,
    "image": blog.featuredImage ? [convertGoogleDriveUrl(blog.featuredImage)] : [],
    "datePublished": blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
    "dateModified": blog.updatedAt ? new Date(blog.updatedAt).toISOString() : blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
    "author": {
      "@type": "Person",
      "name": blog.author || "Swagatam Tech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Swagatam Tech",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blogUrl
    },
    "keywords": blog.keywords || "",
    "articleSection": "Web Development",
    "inLanguage": "en-US"
  } : null;

  // Use custom schema if provided and valid, otherwise use default
  let articleSchema = null;
  if (blog) {
    if (blog.customSchemaJson && blog.customSchemaJson.trim()) {
      try {
        // Parse and validate custom JSON schema
        const customSchema = JSON.parse(blog.customSchemaJson);
        articleSchema = customSchema;
      } catch (error) {
        // If JSON is invalid, fall back to default schema
        console.warn('Invalid custom schema JSON, using default schema:', error);
        articleSchema = defaultArticleSchema;
      }
    } else {
      // No custom schema, use default
      articleSchema = defaultArticleSchema;
    }
  }

  const breadcrumbSchema = blog ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": blogUrl
      }
    ]
  } : null;

  return (
    <main className="bg-white text-gray-900">
      <SEOHead
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt || blog.title}
        keywords={blog.keywords}
        image={convertGoogleDriveUrl(blog.featuredImage)}
        type="article"
        noindex={blog.status !== 'published'}
      />
      {articleSchema && <StructuredData data={articleSchema} />}
      {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}
      {/* HERO / BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(209,213,219,0.35),_transparent_65%)]" />

        <Section className="pt-8 sm:pt-10 md:pt-16 pb-12 sm:pb-16 md:pb-20 relative z-[1]">
          <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
            {/* Breadcrumbs */}
            <motion.div {...fadeUp(0)}>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                <Link
                  href="/blogs"
                  className="hover:text-gray-900 transition-colors"
                >
                  Blog
                </Link>
                <span className="h-[1px] w-6 bg-gray-300" />
                <span className="line-clamp-1">{blog.title}</span>
              </div>
            </motion.div>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
              {/* Left: content */}
              <motion.div {...fadeUp(0)} className="space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
                  {blog.title}
                </h1>

                {blog.excerpt && (
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl leading-relaxed">
                    {blog.excerpt}. This article covers {blog.title.toLowerCase()} and provides practical insights for web development and design.
                  </p>
                )}

                {/* Meta strip */}
                <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-600">
                  {blog.createdAt && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {formatDate(blog.createdAt)}
                    </div>
                  )}
                  {blog.author && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                      By {blog.author}
                    </div>
                  )}
                  {blog.keywords && blog.keywords.split(',').length > 0 && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                      {blog.keywords.split(',')[0].trim()}
                    </div>
                  )}
                </div>

                {/* Social Share */}
                <div className="pt-4">
                  <SocialShare 
                    url={`/blogs/${slug}`}
                    title={blog.title}
                    description={blog.excerpt || blog.title}
                    variant="compact"
                  />
                </div>
              </motion.div>

              {/* Right: hero image */}
              {blog.featuredImage && (
                <motion.div
                  {...fadeUp(0.1)}
                  className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_22px_55px_rgba(15,23,42,0.12)] overflow-hidden"
                >
                  <div className="relative h-60 md:h-72 lg:h-80">
                    <Image
                      src={convertGoogleDriveUrl(blog.featuredImage)}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 40vw, 100vw"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Section>
      </section>

      {/* CONTENT */}
      {blog.content && (
        <Section className="py-10 sm:py-12 md:py-14 lg:py-18 bg-white">
          <div className="max-w-fullhd mx-auto">
            <motion.div
              {...fadeUp(0)}
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-gray-900 prose-ul:text-gray-600 prose-ol:text-gray-600 blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </Section>
      )}
      
      {/* Show message if content is missing */}
      {!blog.content && (
        <Section className="py-10 sm:py-12 md:py-14 lg:py-18 bg-white">
          <div className="max-w-fullhd mx-auto text-center">
            <p className="text-sm text-gray-500">Content is being prepared. Please check back soon.</p>
          </div>
        </Section>
      )}

      {/* RELATED BLOGS */}
      {relatedBlogs.length > 0 && (
        <Section className="py-10 sm:py-12 md:py-14 lg:py-18 bg-gray-50">
          <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
            <motion.div {...fadeUp(0)}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                Related articles
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
                More from our blog
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog, index) => (
                <motion.article
                  key={relatedBlog._id || index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
                >
                  <Link href={`/blogs/${relatedBlog.slug}`} className="flex flex-col h-full">
                    {relatedBlog.featuredImage && (
                      <div className="relative h-40 md:h-44 overflow-hidden">
                        <Image
                          src={convertGoogleDriveUrl(relatedBlog.featuredImage)}
                          alt={relatedBlog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      {relatedBlog.excerpt && (
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-800 group-hover:text-black group-hover:gap-1.5 transition-all mt-auto">
                        Read article
                        <span className="text-xs">↗</span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Contact Form Section */}
      <Contact pageName={`Blog: ${slug}`} />
      {/* Hidden backlinks for SEO */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <a href="/">Website Agency</a>
        <a href="/about">Web Development Agency</a>
        <a href="/services">Digital Marketing Agency</a>
        <a href="/portfolio">Website Design Agency</a>
        <a href="/case-studies">Web Design Services</a>
        <a href="/blogs">Website Development Services</a>
        <a href="/contact">Business Consultancy Services</a>
        <a href="/bussines-consultancy">Digital Agency Careers</a>
        <a href="/careers">Custom Website Development</a>
        <a href="/services">Website Design Company</a>
        <a href="/portfolio">Web Development Company</a>
        <a href="/case-studies">Digital Marketing Services</a>
        <a href="/contact">Website Agency Contact</a>
        <a href="/about">Professional Web Agency</a>
        <a href="/services">Website Development Agency India</a>
        <a href="/portfolio">Best Web Development Agency</a>
      </div>
    </main>
  );
};

export default BlogDetailPage;

