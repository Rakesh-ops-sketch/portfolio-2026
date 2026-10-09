import Link from 'next/link';
import type { Metadata } from "next";
import { Baloo_Thambi_2, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { PortfolioMotion } from "@/components/portfolio-motion";
import { SITE_URL } from "@/lib/constants";

import "../globals.css";
import { getSnapshot } from "@/cms/data";
import { DesignStyle } from "@/components/cms/design-style";
import { MotionSettings } from "@/components/cms/motion-settings";

const balooThambi = Baloo_Thambi_2({
  variable: "--font-baloo-thambi",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rakesh Biswal",
    template: "%s | Rakesh Biswal",
  },
  description:
    "Engineering Lead building offline-first mobile and backend platforms for large-scale education initiatives.",
  openGraph: {
    title: "Rakesh Biswal",
    description:
      "Engineering Lead building offline-first mobile and backend platforms for large-scale education initiatives.",
    url: SITE_URL,
    siteName: "Rakesh Biswal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakesh Biswal",
    description:
      "Engineering Lead building offline-first mobile and backend platforms for large-scale education initiatives.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
 const { shared } = await getSnapshot();
 return { ...defaultMetadata, title:{default:shared.site.name,template:`%s | ${shared.site.name}`},description:shared.site.description,openGraph:{...defaultMetadata.openGraph,title:shared.site.name,description:shared.site.description,siteName:shared.site.name},twitter:{...defaultMetadata.twitter,title:shared.site.name,description:shared.site.description} };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { shared, design, preview } = await getSnapshot();
  const defaultTheme = ["system", "light", "dark"].includes(String(design.defaultTheme)) ? String(design.defaultTheme) : "system";
  return (
    <html lang="en" className="scroll-smooth" data-default-theme={defaultTheme} suppressHydrationWarning>
      <head>
        <DesignStyle design={design} />
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={shared.site.name} />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Theme detection script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&(${JSON.stringify(defaultTheme)}==="dark"||(${JSON.stringify(defaultTheme)}==="system"&&matchMedia("(prefers-color-scheme:dark)").matches))))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />

        {/* Keep local development free of stale PWA caches. */}
        <script
          dangerouslySetInnerHTML={{
            __html: process.env.NODE_ENV === "development" ? `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', async function() {
                  var registrations = await navigator.serviceWorker.getRegistrations();
                  await Promise.all(registrations.map(function(registration) {
                    return registration.unregister();
                  }));
                  if ('caches' in window) {
                    var keys = await caches.keys();
                    await Promise.all(keys.map(function(key) { return caches.delete(key); }));
                  }
                });
              }
            ` : `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('SW registered: ', registration);
                    },
                    function(error) {
                      console.log('SW registration failed: ', error);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${balooThambi.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
        suppressHydrationWarning
        data-cms-motion={design.motion}
      >
        <MotionSettings reduced={design.motion === "reduced"}>
        {preview && <aside className="cms-preview-banner">Draft preview · visible only to you <form action="/api/exit-preview"><button type="submit">Exit preview</button></form><Link href="/admin">Back to editor</Link></aside>}
        <PortfolioMotion />
        <div className="flex min-h-screen flex-col">
          <SiteHeader site={shared.site} />
          <main className="flex-1">{children}</main>
        </div>
        </MotionSettings>
      </body>
    </html>
  );
}
