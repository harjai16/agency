'use client';

import { useEffect } from 'react';

/**
 * Sets lang and dir on document.documentElement for the current locale.
 * Used when the root layout owns <html> and locale is in a child layout.
 */
export default function LocaleHtmlAttributes({ locale, dir }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    if (locale) html.setAttribute('lang', locale);
    if (dir) html.setAttribute('dir', dir);
  }, [locale, dir]);
  return null;
}
