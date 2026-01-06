/**
 * Client-side hook for loading locale-specific data
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Uses dynamic imports that are resolved at build time
 * - All locale data files are bundled into the static export
 * - Falls back to English if locale data doesn't exist
 * 
 * @param {string} dataFile - Name of the data file (e.g., 'testimonials', 'services')
 * @param {string} locale - The locale code (e.g., 'en', 'hi', 'ar')
 * @returns {Object|Array|null} Data object or array, or null if loading
 */
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCurrentLocale } from './navigation';

export function useLocaleData(dataFile, locale = null) {
  const pathname = usePathname();
  const currentLocale = locale || getCurrentLocale(pathname);
  // Initialize with empty array for array data, empty object for object data
  // We'll determine the type after first load
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Dynamic import - Next.js bundles this at build time for static export
        const module = await import(`@/data/${currentLocale}/${dataFile}.json`);
        const loadedData = module.default || module;
        // Ensure we return the correct type (array or object)
        setData(Array.isArray(loadedData) ? loadedData : (loadedData || {}));
      } catch (error) {
        // Fallback to English if locale file doesn't exist
        if (currentLocale !== 'en') {
          try {
            const fallbackModule = await import(`@/data/en/${dataFile}.json`);
            const fallbackData = fallbackModule.default || fallbackModule;
            setData(Array.isArray(fallbackData) ? fallbackData : (fallbackData || {}));
          } catch (fallbackError) {
            console.warn(`Data file "${dataFile}" not found for locale "${currentLocale}" or fallback "en"`);
            setData([]);
          }
        } else {
          console.warn(`Data file "${dataFile}" not found for locale "${currentLocale}"`);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dataFile, currentLocale]);

  return { data, loading };
}

