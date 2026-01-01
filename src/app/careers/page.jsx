"use client";

import React, { useState, useEffect } from "react";
import careersData from "@/data/careers.json";
import StructuredData from "@/componenets/global/StructuredData";
import Hero from "@/componenets/careers/Hero";
import Benefits from "@/componenets/careers/Benefits";
import JobsList from "@/componenets/careers/JobsList";

const CareersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs?status=active');
      const data = await response.json();

      if (data.success && data.jobs) {
        setJobs(data.jobs);
      } else {
        // Fallback to JSON data if API fails
        setJobs(careersData.jobs);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Fallback to JSON data
      setJobs(careersData.jobs);
    } finally {
      setLoading(false);
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Swagatam Tech",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.jpeg`,
    "description": "Website development and digital agency offering career opportunities.",
    "sameAs": [
      "https://twitter.com/swagatamtech",
      "https://linkedin.com/company/swagatamtech"
    ]
  };

  const jobPostingSchemas = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "employmentType": job.type,
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Swagatam Tech",
      "sameAs": siteUrl
    },
    "workHours": job.type,
    "datePosted": job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString()
  }));

  return (
    <>
      <StructuredData data={organizationSchema} />
      {jobPostingSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
      <main className="bg-white text-gray-900">
        <Hero data={careersData.hero} />
        <Benefits benefits={careersData.benefits} />
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading jobs...</div>
        ) : (
          <JobsList jobs={jobs.length > 0 ? jobs : careersData.jobs} />
        )}
      </main>
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
        <a href="/services">Custom Website Development</a>
        <a href="/portfolio">Website Design Company</a>
        <a href="/case-studies">Web Development Company</a>
        <a href="/blogs">Digital Marketing Services</a>
        <a href="/contact">Website Agency Contact</a>
        <a href="/about">Professional Web Agency</a>
        <a href="/services">Website Development Agency India</a>
        <a href="/portfolio">Best Web Development Agency</a>
      </div>
    </>
  );
};

export default CareersPage;

