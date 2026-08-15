import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Préstamos hipotecarios P2P sin banco en Argentina - Lendar",
    template: "%s - Lendar",
  },
  description:
    "Simulá tu préstamo hipotecario o tu inversión P2P sin bancos, con financiación colaborativa para clientes RE/MAX. Dejá tus datos y un asesor te contacta.",
  icons: {
    icon: "/brand/lendar-favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Lendar",
    locale: "es_AR",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
