"use client";

import { Suspense } from "react";
import useGoogleAnalytics from "@/hooks/useGoogleAnalytics";

function GoogleAnalyticsInner() {
  useGoogleAnalytics();
  return null;
}

export default function GoogleAnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}

