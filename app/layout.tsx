import type { Metadata } from "next";
import { headers } from "next/headers";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Volta Spark | Professional Cleaning in Lagos";
  const description = "Book reliable home, office, post-construction, move-in and event cleaning in Lagos. Send your request directly to Volta Spark on WhatsApp.";

  return {
    metadataBase,
    title,
    description,
    icons: { icon: "/volta-spark-logo-source.jpg", shortcut: "/volta-spark-logo-source.jpg" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_NG",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1736, height: 906, alt: "Volta Spark cleaning services in Lagos" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", metadataBase).toString()] },
  };
}

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
