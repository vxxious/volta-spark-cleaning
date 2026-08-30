import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMarquee } from "../components/brand-marquee";
import { HeroVisual } from "../components/hero-visual";
import { ServiceGrid } from "../components/service-grid";
import { WhatsAppIcon } from "../components/whatsapp-icon";
import { DISPLAY_PHONE, services, SITE_URL, socialLinks, WHATSAPP_NUMBER } from "../lib/site-data";

const homeTitle = "Volta Spark | Professional Cleaning in Lagos";
const homeDescription = "Book reliable home, office, post-construction, move-in and event cleaning in Lagos. Send your request directly to Volta Spark on WhatsApp.";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "Volta Spark Cleaning Services",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/og-image.jpg", width: 1736, height: 906, alt: "Volta Spark cleaning services in Lagos" }],
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription, images: ["/og-image.jpg"] },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: "Volta Spark Cleaning Services",
        description: "Professional cleaning for homes, offices, short lets and post-construction spaces across Lagos.",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        logo: `${SITE_URL}/favicon.jpg`,
        telephone: DISPLAY_PHONE,
        address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
        areaServed: { "@type": "City", name: "Lagos" },
        sameAs: socialLinks.map((social) => social.href),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, description: service.description },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Volta Spark Cleaning Services",
        inLanguage: "en-NG",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <h1 id="hero-title">A cleaner space,<span>without the stress.</span></h1>
          <div className="hero-foot">
            <p className="hero-copy">Professional cleaning for homes, offices and short lets across Lagos.</p>
            <div>
              <div className="hero-actions">
                <Link className="primary-button" href="/booking">Book a cleaning <ArrowRight size={19} aria-hidden="true" /></Link>
                <a className="text-link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                  <WhatsAppIcon width={18} height={18} aria-hidden="true" /> Chat on WhatsApp
                </a>
              </div>
              <p className="hero-footnote">Request a quote with no payment upfront</p>
            </div>
          </div>
        </div>

        <HeroVisual />
      </section>

      <section className="trust-strip" aria-label="What to expect from Volta Spark">
        <div><span className="trust-index">01</span><span><strong>Trusted team</strong><small>Trained and background-checked</small></span></div>
        <div><span className="trust-index">02</span><span><strong>Thoughtful care</strong><small>Products chosen for each space</small></span></div>
        <div><span className="trust-index">03</span><span><strong>Clear timing</strong><small>Your plan is agreed before we arrive</small></span></div>
      </section>

      <BrandMarquee />

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-heading">
          <h2 id="services-title">Cleaning for the way you use your space.</h2>
          <p>Choose the closest match. We will shape the final plan with you before the clean begins.</p>
        </div>
        <ServiceGrid />
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-heading">
          <h2 id="about-title">Careful work. Clear communication. No complicated process.</h2>
          <p>Volta Spark serves homes, offices, guest spaces and newly completed properties across Lagos.</p>
        </div>
        <div className="standards-list">
          <article>
            <h3>People you can trust</h3>
            <p>A trained team that respects your property, privacy and time.</p>
          </article>
          <article>
            <h3>A clean shaped around your space</h3>
            <p>We agree what needs attention before work begins, so expectations stay clear.</p>
          </article>
          <article>
            <h3>Direct support from start to finish</h3>
            <p>Your request, quote and appointment are confirmed with our team on WhatsApp.</p>
          </article>
        </div>
      </section>

    </main>
  );
}
