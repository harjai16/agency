/**
 * Translations Context
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Translations are passed as props from server component (loaded at build time)
 * - Client components access translations via context (no runtime loading)
 * - No API calls or server dependencies
 * - Works perfectly with static export
 * 
 * Provides translations to client components
 * Translations are loaded at build time in the layout and passed down
 */

"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, defaultLocale } from './i18n';

const TranslationsContext = createContext(null);

export function TranslationsProvider({ children, translations }) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  
  // If context is not available, return empty translations
  if (!context) {
    console.warn('useTranslations must be used within TranslationsProvider');
    return {};
  }
  
  return context;
}

