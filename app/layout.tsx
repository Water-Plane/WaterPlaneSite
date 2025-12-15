import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

import { PixelCursorTrail } from "@/components/ui/pixel-trail";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
});

export const metadata: Metadata = {
  title: "WaterPlane | Digital Growth Partner",
  description: "We help ambitious brands and creators move from offline to online.",
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
        <SmoothScroll>
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
