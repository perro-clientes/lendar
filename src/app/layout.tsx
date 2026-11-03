import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SITE_URL } from "@/lib/sitio";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto-serif",
  display: "swap",
});

const IMAGEN_OG = {
  url: "/og/og-website.jpg",
  width: 1200,
  height: 630,
  alt: "Lendar: préstamos hipotecarios entre personas",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lendar",
    template: "%s - Lendar",
  },
  description:
    "Préstamos hipotecarios entre personas, sin bancos, para clientes de RE/MAX en Santa Fe y Entre Ríos. Simulá tu préstamo o tu inversión en dólares.",
  icons: {
    icon: "/brand/lendar-favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Lendar",
    locale: "es_AR",
    images: [IMAGEN_OG],
  },
  twitter: {
    card: "summary_large_image",
    images: [IMAGEN_OG],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${robotoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
