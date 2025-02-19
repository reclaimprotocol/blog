import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { cx } from "@/lib/utils";
import "./globals.css";
import "katex/dist/katex.min.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";
import PrimarySiteNav from "@/components/common/primary-site-nav";
import PrimarySiteFooter from "@/components/common/primary-site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
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
      className={cx(inter.variable, lora.variable)}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="antialiased text-gray-800 dark:bg-black dark:text-gray-400">
        <Providers>
          <PrimarySiteNav />
          <main>{children}</main>
          <PrimarySiteFooter />
        </Providers>
      </body>
    </html>
  );
}
