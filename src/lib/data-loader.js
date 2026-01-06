/**
 * Data Loader for Locale-Specific JSON Files
 * 
 * STATIC EXPORT COMPATIBLE:
 * - Uses dynamic imports resolved at build time
 * - Works with SSG/static export
 * - Falls back to English if locale file doesn't exist
 * 
 * @param {string} dataFile - Name of the data file (e.g., 'testimonials', 'services')
 * @param {string} locale - The locale code (e.g., 'en', 'hi', 'ar')
 * @returns {Promise<Object|Array>} Data object or array
 */
export async function loadData(dataFile, locale = 'en') {
  try {
    // Dynamic import - Next.js will bundle this at build time
    const data = await import(`@/data/${locale}/${dataFile}.json`);
    return data.default || (Array.isArray(data) ? data : {});
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    if (locale !== 'en') {
      try {
        const data = await import(`@/data/en/${dataFile}.json`);
        return data.default || (Array.isArray(data) ? data : {});
      } catch (fallbackError) {
        console.warn(`Data file "${dataFile}" not found for locale "${locale}" or fallback "en"`);
        return Array.isArray(data) ? [] : {};
      }
    }
    console.warn(`Data file "${dataFile}" not found for locale "${locale}"`);
    return Array.isArray(data) ? [] : {};
  }
}

/**
 * Synchronous data loader for client-side use
 * Note: This requires the data to be pre-loaded or available
 * For static export, use the async version in server components
 */
export function getDataSync(dataFile, locale = 'en', allData = {}) {
  const localeData = allData[locale] || {};
  return localeData[dataFile] || (allData.en && allData.en[dataFile]) || null;
}

