"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * When user lands on root "/" (no locale), redirect to "/en" so they get
 * the full [locale] layout with Navbar and Footer. Fixes navbar not showing on "/".
 */
export default function RootRedirect({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      router.replace("/en");
    }
  }, [pathname, router]);

  return children;
}
