"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackOutboundLink, trackClick, trackScroll } from "@/lib/gtag";

/**
 * GlobalClickTracker - Automatically tracks clicks on external links and other key interactions
 * This component should be added once in the root layout or ConditionalLayout
 */
export default function GlobalClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track scroll depth
    let scrollTracked = {
      25: false,
      50: false,
      75: false,
      90: false,
    };

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll milestones
      if (scrollPercent >= 25 && !scrollTracked[25]) {
        trackScroll(25);
        scrollTracked[25] = true;
      }
      if (scrollPercent >= 50 && !scrollTracked[50]) {
        trackScroll(50);
        scrollTracked[50] = true;
      }
      if (scrollPercent >= 75 && !scrollTracked[75]) {
        trackScroll(75);
        scrollTracked[75] = true;
      }
      if (scrollPercent >= 90 && !scrollTracked[90]) {
        trackScroll(90);
        scrollTracked[90] = true;
      }
    };

    // Track clicks on external links
    const handleLinkClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Skip if it's a Next.js Link (internal navigation)
      if (link.hasAttribute("data-nextjs-link")) return;

      // Check if it's an external link
      const isExternal =
        href.startsWith("http") &&
        !href.includes(window.location.hostname) &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:");

      if (isExternal) {
        const linkText = link.textContent?.trim() || href;
        trackOutboundLink(href, linkText);
        trackClick(linkText, "external_link", {
          url: href,
          page: pathname,
        });
      }

      // Track mailto links
      if (href.startsWith("mailto:")) {
        const email = href.replace("mailto:", "");
        trackClick(`Email: ${email}`, "contact", {
          type: "email",
          email: email,
        });
      }

      // Track tel links
      if (href.startsWith("tel:")) {
        const phone = href.replace("tel:", "");
        trackClick(`Phone: ${phone}`, "contact", {
          type: "phone",
          phone: phone,
        });
      }
    };

    // Track form submissions globally (as a fallback)
    const handleFormSubmit = (e) => {
      const form = e.target;
      const formName = form.getAttribute("name") || form.id || "Unknown Form";
      const formAction = form.getAttribute("action") || "submit";

      trackClick(formName, "form_submit", {
        form_name: formName,
        form_action: formAction,
        page: pathname,
      });
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleLinkClick);
    document.addEventListener("submit", handleFormSubmit);

    // Reset scroll tracking on pathname change
    scrollTracked = {
      25: false,
      50: false,
      75: false,
      90: false,
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleLinkClick);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

