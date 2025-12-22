"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from "@/componenets/global/Navbar";
import Footer from "@/componenets/global/Footer";
import CapabilitiesStrip from "@/componenets/CapabilitiesStrip";
import CustomCursor from "@/componenets/global/CustomCursor";
import { ToastProvider } from "@/componenets/global/Toast";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isBlogPostPage = pathname === '/blog-post' || pathname?.startsWith('/blog-post');
  const isRequestQueryPage = pathname === '/request-query';

  useEffect(() => {
    // Show normal cursor on admin pages
    if (isBlogPostPage || isRequestQueryPage) {
      document.body.style.cursor = 'auto';
      // Also ensure all elements show normal cursor
      const style = document.createElement('style');
      style.id = 'admin-cursor-style';
      style.textContent = `
        body, body * {
          cursor: auto !important;
        }
        a, button, [role="button"], input, textarea, select {
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.body.style.cursor = '';
        const existingStyle = document.getElementById('admin-cursor-style');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    } else {
      // Restore custom cursor for other pages
      document.body.style.cursor = 'none';
      const existingStyle = document.getElementById('admin-cursor-style');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  }, [isBlogPostPage, isRequestQueryPage]);

  if (isBlogPostPage || isRequestQueryPage) {
    // Blog post page or Request Query page - no navbar, footer, or custom cursor
    return (
      <ToastProvider>
        <main className="min-h-screen">
          {children}
        </main>
      </ToastProvider>
    );
  }

  // All other pages - include navbar and footer
  return (
    <ToastProvider>
      <CustomCursor />
      {/* Fixed header: stripe + navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <CapabilitiesStrip />
        <Navbar />
      </div>
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36">
        {children}
      </main>
      <Footer />
    </ToastProvider>
  );
}

