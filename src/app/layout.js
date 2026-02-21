/**
 * Root Layout
 *
 * Next.js requires the root layout to include <html> and <body>.
 * Locale-specific lang/dir and styles are set in [locale]/layout.js.
 * ToastProvider here ensures useToast works on "/" (app/page.js) during prerender.
 */

import { ToastProvider } from "@/componenets/global/Toast";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
