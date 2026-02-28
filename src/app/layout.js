/**
 * Root Layout
 *
 * Next.js requires the root layout to include <html> and <body>.
 * Locale-specific lang/dir and styles are set in [locale]/layout.js.
 * ToastProvider here ensures useToast works on "/" (app/page.js) during prerender.
 * Import globals.css so styles apply even when root page is rendered (e.g. before redirect).
 * RootRedirect sends "/" to "/en" so the full layout (Navbar, Footer) always shows.
 */

import "./globals.css";
import { ToastProvider } from "@/componenets/global/Toast";
import RootRedirect from "./RootRedirect";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ToastProvider>
          <RootRedirect>
            {children}
          </RootRedirect>
        </ToastProvider>
      </body>
    </html>
  );
}
