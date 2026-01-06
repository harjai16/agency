# Static Export Compatibility Guide

This document explains how the multilingual implementation works with Next.js static export (SSG).

## Static Export Compatibility

✅ **All features are compatible with static export:**
- Middleware works with static export (runs at edge/runtime)
- Translations are loaded at build time via dynamic imports
- `generateStaticParams` ensures all locale pages are pre-generated
- No SSR-only features are used
- All metadata is generated statically

## Key Files for Static Export

### 1. Middleware (`middleware.js`)
- ✅ Compatible with static export
- Runs at edge/runtime (not build time)
- Handles redirects for URLs without locale
- No server-side dependencies

### 2. Translation Loading (`src/lib/i18n.js`)
- ✅ Uses dynamic imports (works with SSG)
- Translations are bundled at build time
- No runtime API calls
- Fallback to English if translation missing

### 3. Layout (`src/app/[locale]/layout.js`)
- ✅ Uses `generateStaticParams` for all locales
- ✅ Async `generateMetadata` (works with SSG)
- ✅ Translations loaded at build time
- ✅ No runtime dependencies

### 4. Components
- ✅ Client components use `useTranslations()` hook
- ✅ Server components receive translations as props
- ✅ No SSR-only features

## Building for Static Export

### Option 1: Using `next export` (Next.js 12)
```bash
npm run build
next export
```

### Option 2: Using `output: 'export'` (Next.js 13+)
Add to `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'export',
  // ... rest of config
};
```

Then:
```bash
npm run build
```

## Static Generation Process

1. **Build Time:**
   - `generateStaticParams` runs for `[locale]` segment
   - Generates pages for all 12 locales
   - Translations are bundled into each page
   - All metadata is generated statically

2. **Runtime (Static Export):**
   - Middleware handles redirects (if using hosting that supports it)
   - Client-side language switcher works
   - Translations are already bundled

## Important Notes

### Middleware in Static Export
- Middleware runs on the hosting platform (Vercel, Netlify, etc.)
- For pure static hosting, you may need to configure redirects in hosting config
- Alternative: Use client-side redirect for initial load

### Sitemap
- Sitemap is generated at build time
- For dynamic content (blogs), ensure data is available at build time
- Consider using ISR or pre-rendering for dynamic routes

### API Routes
- API routes don't work with `output: 'export'`
- If you have API routes, remove them or use external API
- Blog data should be fetched at build time, not runtime

## Testing Static Export

1. Build the site:
   ```bash
   npm run build
   ```

2. Check `.next` folder for generated pages:
   - Should see `/en`, `/hi`, `/ar`, etc. folders
   - Each locale should have all pages pre-generated

3. Test locally:
   ```bash
   npm run start
   # or
   npx serve out
   ```

4. Verify:
   - All locale URLs work (`/en`, `/hi`, etc.)
   - Language switcher works
   - Translations display correctly
   - No runtime errors

## Troubleshooting

### Issue: Middleware not working in static export
**Solution:** Configure redirects in hosting platform (Vercel, Netlify) or use client-side redirect

### Issue: Translations not loading
**Solution:** Ensure translation files are in `src/messages/` and imported correctly

### Issue: Pages not generating for all locales
**Solution:** Check `generateStaticParams` returns all locales

### Issue: Build fails
**Solution:** Ensure all dynamic imports resolve at build time

