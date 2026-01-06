/**
 * Root Layout (Minimal Wrapper)
 * 
 * This is the minimal root layout that wraps the [locale] segment.
 * All locale-specific logic is handled in [locale]/layout.js
 * 
 * This layout exists to satisfy Next.js App Router requirements.
 */

export default function RootLayout({ children }) {
  return children;
}
