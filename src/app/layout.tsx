import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Serif } from "next/font/google";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lendar",
    template: "%s - Lendar",
  },
  description: "Préstamos hipotecarios P2P sin banco en Argentina",
  icons: {
    icon: "/brand/lendar-favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Lendar",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${robotoSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
