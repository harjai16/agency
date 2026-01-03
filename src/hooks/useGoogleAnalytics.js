"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview } from "@/lib/gtag";

export default function useGoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = pathname;
      
      // Include search params if they exist
      if (searchParams && searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }

      pageview(url);
    }
  }, [pathname, searchParams]);
}

