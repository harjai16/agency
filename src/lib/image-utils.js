/**
 * Image Utilities for Locale-Aware Images
 * 
 * Helper functions for handling locale-specific images
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Works with static export/SSG
 * - Falls back to default image if locale-specific version doesn't exist
 */

/**
 * Get locale-specific image path
 * @param {string} basePath - Base image path (e.g., "/our_logo/logo.png")
 * @param {string} locale - Current locale (e.g., "en", "hi", "ar")
 * @param {boolean} useLocaleSpecific - Whether to use locale-specific images (default: false for logos, true for content images)
 * @returns {string} - Image path (locale-specific if exists, otherwise base path)
 */
export function getLocaleImagePath(basePath, locale = 'en', useLocaleSpecific = false) {
  // For logos and brand images, typically don't change per locale
  if (!useLocaleSpecific) {
    return basePath;
  }

  // For content images, check if locale-specific version exists
  // Format: /images/{locale}/filename.ext or /images/filename-{locale}.ext
  if (locale && locale !== 'en') {
    const pathParts = basePath.split('/');
    const filename = pathParts[pathParts.length - 1];
    const extension = filename.split('.').pop();
    const nameWithoutExt = filename.replace(`.${extension}`, '');
    const directory = pathParts.slice(0, -1).join('/');

    // Try locale-specific directory: /images/{locale}/filename.ext
    const localeDirPath = `${directory}/${locale}/${filename}`;
    
    // Try locale-specific filename: /images/filename-{locale}.ext
    const localeFilenamePath = `${directory}/${nameWithoutExt}-${locale}.${extension}`;

    // Return locale-specific path (you can implement actual file existence check if needed)
    // For now, return the base path - implement actual logic based on your file structure
    return basePath;
  }

  return basePath;
}

/**
 * Get locale-specific logo path
 * Logos typically don't change per locale, but this allows for future customization
 * @param {string} locale - Current locale
 * @returns {string} - Logo path
 */
export function getLogoPath(locale = 'en') {
  // Default logo path - same for all locales
  // If you want locale-specific logos, create them in: /our_logo/logo-{locale}.png
  const defaultLogo = "/our_logo/logo-removebg-preview.png";
  
  if (locale && locale !== 'en') {
    // Try locale-specific logo: /our_logo/logo-{locale}.png
    // Uncomment below if you have locale-specific logos
    // const localeLogo = `/our_logo/logo-${locale}.png`;
    // return localeLogo;
  }
  
  return defaultLogo;
}

