import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { cx } from "@/lib/utils";
import "./globals.css";
import "katex/dist/katex.min.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";
import PrimarySiteNav from "@/components/common/primary-site-nav";
import PrimarySiteFooter from "@/components/common/primary-site-footer";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(ibmPlexMono.variable, ibmPlexSans.variable)}
      suppressHydrationWarning
    >
      <head>
      </head>
            <body className="antialiased font-sans">
        <div aria-hidden className="page-atmosphere">
          <div className="glow-a" />
          <div className="glow-b" />
          <div aria-hidden className="guilloche" />
        </div>
        <div className="relative z-10">
          <Providers>
            <PrimarySiteNav />
            <main>{children}</main>
            <PrimarySiteFooter />
          </Providers>
        </div>
        <div aria-hidden className="grain-overlay" />
      </body>
    </html>
  );
}
