/**
 * Root Layout
 *
 * Next.js requires the root layout to include <html> and <body>.
 * Locale-specific lang/dir and styles are set in [locale]/layout.js.
 */

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
