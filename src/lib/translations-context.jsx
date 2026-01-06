/**
 * Translations Context
 * 
 * Provides translations to client components
 * Loads translations based on current locale
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

