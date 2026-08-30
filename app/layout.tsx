import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { SITE_URL } from "../lib/site-data";
import "./globals.css";

const title = "Volta Spark | Professional Cleaning in Lagos";
const description = "Book reliable home, office, post-construction, move-in and event cleaning in Lagos. Send your request directly to Volta Spark on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  category: "Cleaning services",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg", sizes: "256x256" }],
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Volta Spark Cleaning Services",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/og-image.jpg", width: 1736, height: 906, alt: "Volta Spark cleaning services in Lagos" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
