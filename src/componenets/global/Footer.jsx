"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialShare from "./SocialShare";
import { useLoading } from "./LoadingContext";
import { trackClick, trackOutboundLink } from "@/lib/gtag";
import { usePathname } from "next/navigation";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";
import { useTranslations } from "@/lib/translations-context";

const quickLinks = [
  { labelKey: "home", href: "/" },
  { labelKey: "services", href: "/services" },
  { labelKey: "caseStudies", href: "/case-studies" },
  { labelKey: "portfolio", href: "/portfolio" },
  { labelKey: "blogs", href: "/blogs" },
  { labelKey: "about", href: "/about" },
  { labelKey: "careers", href: "/careers" },
  { labelKey: "contact", href: "/contact" },
];

const socials = [
  { label: "WhatsApp", href: "https://wa.me/919217731381?text=Hi%20Swagatam%20Team" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/swagatam-tech/?viewAsMember=true" },
  { label: "Instagram", href: "https://www.instagram.com/swagatamtechi?igsh=MXd4Nnh3aDdqYWIxMg==" },
];

const Footer = () => {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const t = useTranslations();
  
  // Get translated labels
  const getLabel = (labelKey) => {
    if (labelKey === "contact") {
      return t?.common?.getInTouch || "Get in touch";
    }
    return t?.navigation?.[labelKey] || t?.common?.[labelKey] || labelKey;
  };

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12 lg:py-14 grid gap-8 sm:gap-10 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <Link
            href={createLocalizedHref("/", currentLocale)}
            className="flex items-center mb-4 group"
            aria-label="Swagatam Tech - Home"
            onClick={() => {
              trackClick("Logo - Footer", "navigation");
              setLoading(true);
            }}
            style={{ marginTop: '-35px' }}
          >
            <div className="relative w-60  sm:w-47  md:w-32  lg:w-53">
              <Image
                src="/our_logo/logo-removebg-preview.png"
                alt={t?.seo?.siteName ? `${t.seo.siteName} Logo` : "Swagatam Tech Logo - Website Development Agency"}
                fill
                className="object-contain group-hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'transparent' }}
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 144px"
              />
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs leading-relaxed">
            We design websites that convert visitors into customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
            {quickLinks.map((item) => (
              <li key={item.labelKey}>
                <Link
                  href={createLocalizedHref(item.href, currentLocale)}
                  className="hover:text-black transition-colors"
                  aria-label={`Navigate to ${getLabel(item.labelKey)} page`}
                  onClick={() => {
                    trackClick(`${getLabel(item.labelKey)} - Footer`, "navigation", {
                      destination: item.href,
                    });
                    setLoading(true);
                  }}
                >
                  {getLabel(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Share */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
              Follow Us
            </h4>
            <div className="flex gap-4 sm:gap-5 text-xs sm:text-sm text-gray-600">
              {socials.map((s) => (
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                  onClick={() => {
                    trackOutboundLink(s.href, `${s.label} - Footer`);
                    trackClick(`${s.label} - Footer`, "social_link", {
                      platform: s.label.toLowerCase(),
                      url: s.href,
                    });
                  }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <SocialShare 
              url="/"
              title="Swagatam Tech - Website Development Agency"
              description="Transform your website into a revenue engine. We build fast, conversion-focused websites with strategy, UX design, and modern development."
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-100 py-3 sm:py-4 md:py-5 text-center text-[10px] sm:text-xs text-gray-500">
        © {new Date().getFullYear()} AGENCY AI — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
