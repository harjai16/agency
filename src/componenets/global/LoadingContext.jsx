"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: () => {},
});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Reset loading when pathname changes (page loaded)
  useEffect(() => {
    // Only reset if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      previousPathname.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const setLoading = (loading) => {
    // Prevent showing loader for same-page navigation
    if (loading && pathname === previousPathname.current) {
      return;
    }
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <PageLoader isLoading={isLoading} />
    </LoadingContext.Provider>
  );
};

