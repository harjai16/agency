"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from "@/componenets/global/Navbar";
import Footer from "@/componenets/global/Footer";
import CapabilitiesStrip from "@/componenets/CapabilitiesStrip";
import CustomCursor from "@/componenets/global/CustomCursor";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isBlogPostPage = pathname === '/blog-post' || pathname?.startsWith('/blog-post');

  useEffect(() => {
    // Show normal cursor on admin pages
    if (isBlogPostPage) {
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
  }, [isBlogPostPage]);

  if (isBlogPostPage) {
    // Blog post page - no navbar, footer, or custom cursor
    return (
      <>
        <main className="min-h-screen">
          {children}
        </main>
      </>
    );
  }

  // All other pages - include navbar and footer
  return (
    <>
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
    </>
  );
}

