# Translation Guide

## Current Status

✅ **Navigation is translated** - Navbar and Footer now use translations
✅ **Language switcher works** - Changes URL and loads correct locale
✅ **Translation system is set up** - Context provider and hook are ready

⚠️ **Page content is still in English** - Components like Hero, Services, etc. need to be updated individually

## How Translations Work

### 1. Translation Files

All translations are in `src/messages/[locale].json`:
- `en.json` - English (default)
- `hi.json` - Hindi
- `ar.json` - Arabic
- etc.

### 2. Using Translations in Client Components

```jsx
"use client";
import { useTranslations } from '@/lib/translations-context';

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t?.common?.home || "Home"}</h1>
      <p>{t?.common?.description || "Default text"}</p>
    </div>
  );
}
```

### 3. Using Translations in Server Components

```jsx
import { getTranslations } from '@/lib/i18n';

export default async function MyServerComponent({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  
  return (
    <div>
      <h1>{t?.common?.home || "Home"}</h1>
    </div>
  );
}
```

## Adding More Translations

### Step 1: Add keys to translation files

Edit `src/messages/en.json`:
```json
{
  "common": {
    "home": "Home",
    "heroTitle": "Website Development Agency",
    "heroSubtitle": "Fast Performance Websites Built for Business Growth"
  }
}
```

Then add translations to other language files (hi.json, ar.json, etc.)

### Step 2: Update components to use translations

**Before:**
```jsx
<h1>Website Development Agency</h1>
```

**After:**
```jsx
const t = useTranslations();
<h1>{t?.common?.heroTitle || "Website Development Agency"}</h1>
```

## Components That Need Translation

To fully translate the website, update these components:

1. **Hero Component** (`src/componenets/Hero.jsx`)
   - Hero title and subtitle
   - CTA buttons

2. **Services Component** (`src/componenets/Services.jsx`)
   - Service titles and descriptions

3. **Contact Component** (`src/componenets/Contact.jsx`)
   - Form labels and placeholders

4. **Page Components** (`src/app/[locale]/page.jsx`, etc.)
   - Page-specific content

## Quick Test

1. Select a language from the dropdown (e.g., Hindi or Arabic)
2. Check the navigation menu - it should be translated
3. Check the page content - currently still in English (needs component updates)

## Next Steps

To translate page content:
1. Add translation keys for all text content
2. Update each component to use `useTranslations()` hook
3. Test each language

The infrastructure is ready - you just need to add the translation keys and update components!

