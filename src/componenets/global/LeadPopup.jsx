"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Button from "@/componenets/ui/Button";
import { useToast } from "./Toast";
import { useLeadPopup } from "./LeadPopupContext";

const LeadPopup = () => {
  const { isOpen: contextIsOpen, openPopup, closePopup } = useLeadPopup();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const { showToast } = useToast();

  // Sync with context
  useEffect(() => {
    setIsOpen(contextIsOpen);
  }, [contextIsOpen]);

  // Auto-show popup logic (only if not manually opened)
  useEffect(() => {
    // Don't show on admin pages
    if (pathname?.includes('/blog-post') || pathname?.includes('/request-query')) {
      return;
    }

    // If popup is already open via context, don't auto-show
    if (contextIsOpen) {
      return;
    }

    // Check localStorage
    const popupShown = localStorage.getItem('leadPopupShown');
    const popupSubmitted = localStorage.getItem('leadPopupSubmitted');

    // If already shown or submitted, don't show again
    if (popupShown === 'true' || popupSubmitted === 'true') {
      return;
    }

    // Show popup after 5 seconds delay
    const timer = setTimeout(() => {
      if (!contextIsOpen) {
        openPopup();
        localStorage.setItem('leadPopupShown', 'true');
      }
    }, 5000);

    // Also show on scroll (after scrolling 30% of page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 30 && !popupShown && !popupSubmitted && !contextIsOpen) {
        openPopup();
        localStorage.setItem('leadPopupShown', 'true');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, contextIsOpen, openPopup]);

  const handleClose = () => {
    setIsOpen(false);
    closePopup();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const pageName = pathname === '/' ? 'Home' : pathname?.replace('/', '').split('/')[0] || 'Unknown';

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      message: formData.get("message") || '',
      pageName: `Popup - ${pageName}`,
    };

    try {
      const response = await fetch("/api/request-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showToast("Thank you! We'll get back to you soon.", "success");
        localStorage.setItem('leadPopupSubmitted', 'true');
        e.target.reset();
        setIsOpen(false);
        closePopup();
      } else {
        showToast(result.error || "Failed to submit. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Failed to submit. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render on admin pages
  if (pathname?.includes('/blog-post') || pathname?.includes('/request-query')) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(15,23,42,0.25)] w-full max-w-md p-6 sm:p-8 pointer-events-auto max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Glow accent */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-tr from-gray-100 via-white to-gray-50 blur-3xl opacity-50" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 bg-white/80 hover:bg-gray-50 hover:border-gray-300 text-gray-400 hover:text-gray-600 transition-all duration-200 shadow-sm"
                aria-label="Close popup"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-6 relative z-[1]">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Quick Inquiry
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 mb-2">
                  Let's Get Started! 🚀
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tell us what you need, and we'll help you achieve your goals.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 relative z-[1]">
                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="popup-name"
                    className="text-xs font-medium text-gray-700"
                  >
                    Name *
                  </label>
                  <input
                    id="popup-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-0 hover:border-gray-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="popup-email"
                    className="text-xs font-medium text-gray-700"
                  >
                    Email *
                  </label>
                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-0 hover:border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="popup-phone"
                    className="text-xs font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="popup-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-0 hover:border-gray-300"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                {/* What they want - Dropdown */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="popup-projectType"
                    className="text-xs font-medium text-gray-700"
                  >
                    What are you looking for? *
                  </label>
                  <select
                    id="popup-projectType"
                    name="projectType"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-0 hover:border-gray-300 cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="Website Development">Website Development</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Social Media Content">Social Media Content</option>
                    <option value="Video Production">Video Production</option>
                    <option value="Video Shoot">Video Shoot</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="E-commerce Development">E-commerce Development</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Web App Development">Web App Development</option>
                    <option value="Branding">Branding</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message (Optional) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="popup-message"
                    className="text-xs font-medium text-gray-700"
                  >
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="popup-message"
                    name="message"
                    rows={3}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-0 resize-none hover:border-gray-300"
                    placeholder="Tell us more about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Get Started"}
                  </Button>
                  <p className="text-[11px] text-gray-400 mt-3 text-center leading-relaxed">
                    We'll get back to you within 24 hours. No spam, promise! ✨
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;

