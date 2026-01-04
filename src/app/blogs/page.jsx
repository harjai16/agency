"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Contact from "@/componenets/Contact";
import StructuredData from "@/componenets/global/StructuredData";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const BlogsPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?status=published');
      const data = await response.json();
      
      if (data.success) {
        const blogsList = data.blogs || [];
        console.log('Fetched blogs:', blogsList.map(b => ({ slug: b.slug, title: b.title, status: b.status })));
        setBlogs(blogsList);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';
  
  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog - Swagatam Tech",
    "description": "Practical insights from building real websites. Thoughts and learnings on web design, development, performance, and SEO.",
    "url": `${siteUrl}/blogs`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": blogs.length,
      "itemListElement": blogs.slice(0, 10).map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt || blog.title,
          "url": `${siteUrl}/blogs/${blog.slug}`,
          "image": blog.featuredImage || undefined,
          "datePublished": blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
          "author": {
            "@type": "Person",
            "name": blog.author || "Swagatam Tech"
          }
        }
      }))
    }
  };

  return (
    <main className="bg-white text-gray-900">
      <StructuredData data={blogCollectionSchema} />
      {/* Banner / Hero */}
      <Section
        id="blogs-hero"
        aria-label="Blogs hero"
        className="pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-14"
      >
        <div className="max-w-fullhd mx-auto">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 items-center">
            {/* Left text */}
            <motion.div {...fadeUp(0)} className="space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Blog
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
                Blog{" "}
                <span className="inline-block border-b border-gray-300 pb-1">
                  Web Design & Development Insights
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
                Practical insights from building real websites. Thoughts and learnings on <Link href="/services" className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">web design</Link>, <Link href="/services" className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">development</Link>, performance, and SEO — based on real projects, not theory. Short, useful reads focused on what actually works when building and shipping websites.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => router.push("/contact")}
                >
                  Discuss your project
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    document
                      .getElementById("blogs-list")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse articles
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500">
                <div>
                  <div className="font-semibold text-gray-900 text-base">
                    {blogs.length}+
                  </div>
                  <div>Articles published</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-base">
                    Latest
                  </div>
                  <div>Insights & tips</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-base">
                    Practical
                  </div>
                  <div>Real-world examples</div>
                </div>
              </div>
            </motion.div>

            {/* Right: featured blog card */}
            {blogs.length > 0 && (
              <motion.div {...fadeUp(0.1)} className="relative">
                <div className="pointer-events-none absolute -top-10 -right-4 h-40 w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-3xl" />
                <Link href={`/blogs/${blogs[0].slug}`} className="block">
                  <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
                    {/* Image */}
                    {blogs[0].featuredImage && (
                      <div className="relative h-52 md:h-60 overflow-hidden">
                        <Image
                          src={convertGoogleDriveUrl(blogs[0].featuredImage)}
                          alt={blogs[0].title}
                          fill
                          priority
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                        <div className="relative flex h-full items-end justify-between px-5 pb-4">
                          <div>
                            {blogs[0].createdAt && (
                              <div className="text-[11px] uppercase tracking-[0.18em] text-gray-200">
                                {formatDate(blogs[0].createdAt)}
                              </div>
                            )}
                            <div className="text-sm font-semibold text-white line-clamp-2">
                              {blogs[0].title}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="px-5 pt-4 pb-5 space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                        Featured article
                      </p>
                      <h2 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                        {blogs[0].title}
                      </h2>
                      {blogs[0].excerpt && (
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-3">
                          {blogs[0].excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500">
                        {blogs[0].author && (
                          <span>{blogs[0].author}</span>
                        )}
                        <span className="inline-flex items-center gap-1 font-medium text-gray-800 hover:text-black hover:gap-1.5 transition-all">
                          Read article <span className="text-xs">↗</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </Section>

      {/* Listing grid */}
      <Section
        id="blogs-list"
        aria-label="Blogs list"
        className="pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white"
      >
        <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No blogs available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Optional small label row */}
              <motion.div
                {...fadeUp(0)}
                className="flex flex-wrap items-center justify-between gap-4"
              >
                <div className="text-xs md:text-sm text-gray-500">
                  Showing {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} on web design, development, and digital marketing.
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
                  <button className="rounded-full border border-gray-900 bg-gray-900 px-3 py-1 text-white">
                    All articles
                  </button>
                  <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                    Web Design
                  </button>
                  <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                    Development
                  </button>
                  <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                    SEO
                  </button>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.slice(1).map((blog, index) => (
                  <motion.article
                    key={blog._id || index}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
                      {/* Top image area */}
                      <div className="relative h-40 md:h-44 overflow-hidden bg-gray-50">
                        {blog.featuredImage ? (
                          <Image
                            src={convertGoogleDriveUrl(blog.featuredImage)}
                            alt={blog.title}
                            fill
                            priority={index === 0}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      </div>

                      {/* Body */}
                      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                        <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                          {blog.title}
                        </h2>
                        {blog.excerpt && (
                          <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        )}

                        <div className="mt-auto flex items-center justify-between text-[11px] text-gray-500">
                          <div className="flex items-center gap-2">
                            {blog.createdAt && (
                              <span>{formatDate(blog.createdAt)}</span>
                            )}
                            {blog.author && (
                              <>
                                <span>•</span>
                                <span>{blog.author}</span>
                              </>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-1 font-medium text-gray-800 group-hover:text-black group-hover:gap-1.5 transition-all">
                            Read article
                            <span className="text-xs">↗</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Hover overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/90 via-transparent to-transparent" />
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </Section>

      {/* Contact Form Section */}
      {/* <Contact pageName="Blogs" /> */}


     {/* FINAL CTA */}
      <Section
        aria-label="Portfolio final CTA"
        className="pb-12 sm:pb-16 md:pb-20 bg-gray-50"
      >
        <motion.div
          {...fadeUp(0)}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          Found this useful?
          </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
           Ready to discuss your website project?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
          If something here sparked an idea or raised a question, feel free to reach out.
Share a bit about what you’re exploring and we’ll help you think through the next steps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
           
            <Button
              variant="ghost"
             onClick={() => router.push("/contact")}
            >
              Start a conversation
            </Button>
          </div>
        </motion.div>
      </Section>
      <SEOBacklinks />
    </main>
  );
};

export default BlogsPage;

