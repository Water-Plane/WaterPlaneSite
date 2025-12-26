import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { cn } from "@/lib/utils";

import { PixelCursorTrail } from "@/components/ui/pixel-trail";
import ImageProtection from "@/components/utils/ImageProtection";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://waterplane.in'),
  title: {
    default: 'WaterPlane | Digital Growth Partner',
    template: '%s | WaterPlane',
  },
  description: "Helping ambitious brands and creators move from offline to online. Premier digital agency for web development, AI content, and strategic growth.",
  keywords: ["WaterPlane", "Digital Agency Lucknow", "Web Development", "AI Content", "Strategic Growth", "Web Develoment services in Lucknow", " How to grow business"],
  openGraph: {
    title: 'WaterPlane | Digital Growth Partner',
    description: "Helping ambitious brands and creators move from offline to online. Premier digital agency for web development, AI content, and strategic growth.",
    url: 'https://waterplane.in',
    siteName: 'WaterPlane',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, clash.variable, "bg-black text-white antialiased font-sans")}>
        <PixelCursorTrail />
        <ImageProtection />
        <SmoothScroll>
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WaterPlane",
              url: "https://waterplane.in",
              logo: "https://waterplane.in/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/waterplane",
                "https://www.instagram.com/waterplane.in"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "",
                contactType: "customer service"
              }
            })
          }}
        />
        <GoogleAnalytics gaId="G-R0B3PXBFTT" />
      </body>
    </html>
  );
}
