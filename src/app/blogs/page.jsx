"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Contact from "@/componenets/Contact";

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
        setBlogs(data.blogs || []);
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

  return (
    <main className="bg-white text-gray-900">
      {/* Banner / Hero */}
      <Section
        id="blogs-hero"
        aria-label="Blogs hero"
        className="pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-14"
      >
        <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6 text-left">
          <motion.div {...fadeUp(0)} className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Blog
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
            Practical insights {" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                from
              </span>{" "}
             building real websites
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl">
            Thoughts and learnings on web design, development, performance, and SEO — based on real projects, not theory. <br />
Short, useful reads focused on what actually works when building and shipping websites.
            </p>
          </motion.div>
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
              <div className="flex items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
                <span>{blogs.length} {blogs.length === 1 ? 'article' : 'articles'}</span>
                <span className="hidden md:inline-block">
                  Latest insights on web design, development, and digital marketing.
                </span>
              </div>

              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => (
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
                      {blog.featuredImage && (
                        <div className="relative h-40 md:h-44 overflow-hidden">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            priority={index === 0}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        </div>
                      )}

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
           Let’s talk when you’re ready
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

    </main>
  );
};

export default BlogsPage;

