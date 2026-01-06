# Static Export Setup Instructions

## Quick Setup for Static Export

### Step 1: Update `next.config.mjs`

Add `output: 'export'` to enable static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  // ... rest of your config
};
```

### Step 2: Handle API Routes

If you have API routes (`src/app/api/`), you have two options:

**Option A: Remove API routes** (recommended for pure static)
- Move API logic to external service
- Fetch data at build time instead of runtime

**Option B: Keep API routes** (requires server)
- Don't use `output: 'export'`
- Use regular Next.js deployment (Vercel, etc.)

### Step 3: Update Sitemap (if using dynamic data)

If your sitemap fetches from API routes, update it to import data directly:

```javascript
// Instead of fetching from API
import blogData from '@/data/blogs.json';

export default async function sitemap() {
  // Use imported data instead of fetch
  const blogs = blogData.filter(b => b.status === 'published');
  // ... rest of sitemap logic
}
```

### Step 4: Build and Export

```bash
# Build the static site
npm run build

# The output will be in the 'out' folder
# You can serve it with:
npx serve out
```

## Middleware in Static Export

### Option A: Platform Redirects (Recommended)

Configure redirects in your hosting platform:

**Vercel (`vercel.json`):**
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/en",
      "permanent": false
    },
    {
      "source": "/:path((?!en|hi|ar|fr|es|de|pt|ru|ja|ko|zh|it|api|_next).*)",
      "destination": "/en/:path",
      "permanent": false
    }
  ]
}
```

**Netlify (`netlify.toml`):**
```toml
[[redirects]]
  from = "/"
  to = "/en"
  status = 302

[[redirects]]
  from = "/:path"
  to = "/en/:path"
  status = 302
  force = true
  conditions = {Language = ["!en", "!hi", "!ar", "!fr", "!es", "!de", "!pt", "!ru", "!ja", "!ko", "!zh", "!it"]}
```

### Option B: Client-Side Redirect

Add to `src/app/layout.js`:

```javascript
"use client";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPath, locales, defaultLocale } from '@/lib/i18n';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if no locale in path
    const segments = pathname.split('/').filter(Boolean);
    const hasLocale = segments.length > 0 && locales.includes(segments[0]);
    
    if (!hasLocale && pathname !== '/') {
      // Get locale from cookie or default
      const cookieLocale = document.cookie
        .split('; ')
        .find(row => row.startsWith('lang='))
        ?.split('=')[1];
      
      const locale = cookieLocale && locales.includes(cookieLocale) 
        ? cookieLocale 
        : defaultLocale;
      
      router.replace(`/${locale}${pathname}`);
    }
  }, [pathname, router]);

  return children;
}
```

## Verification Checklist

- [ ] All pages generate for all locales (`/en`, `/hi`, `/ar`, etc.)
- [ ] Translations load correctly
- [ ] Language switcher works
- [ ] No runtime errors in console
- [ ] Metadata is correct for each locale
- [ ] RTL works for Arabic
- [ ] Sitemap generates correctly
- [ ] No API route dependencies

## Testing

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Check output:**
   ```bash
   ls -la out/
   # Should see: en/, hi/, ar/, etc.
   ```

3. **Serve locally:**
   ```bash
   npx serve out
   ```

4. **Test URLs:**
   - `http://localhost:3000/en`
   - `http://localhost:3000/hi`
   - `http://localhost:3000/ar`
   - Language switcher should work

## Troubleshooting

### Build fails with "API routes cannot be used with output: export"
**Solution:** Remove or comment out API routes, or don't use `output: 'export'`

### Translations not loading
**Solution:** Check that translation files exist in `src/messages/` and are imported correctly

### Pages not generating for all locales
**Solution:** Verify `generateStaticParams` returns all locales

### Middleware not working
**Solution:** Use platform redirects or client-side redirect (see above)

