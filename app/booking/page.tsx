import type { Metadata } from "next";
import { BookingForm } from "../../components/booking-form";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { WhatsAppIcon } from "../../components/whatsapp-icon";
import { DISPLAY_PHONE, SITE_URL, WHATSAPP_NUMBER } from "../../lib/site-data";

const bookingTitle = "Book a Cleaning in Lagos | Volta Spark";
const bookingDescription = "Request a home, office, post-construction, move-in or short-let cleaning quote from Volta Spark in Lagos.";
export const metadata: Metadata = {
  title: bookingTitle,
  description: bookingDescription,
  alternates: { canonical: "/booking" },
  openGraph: {
    title: bookingTitle,
    description: bookingDescription,
    url: "/booking",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/og-image.jpg", width: 1736, height: 906, alt: "Book Volta Spark cleaning services in Lagos" }],
  },
  twitter: { card: "summary_large_image", title: bookingTitle, description: bookingDescription, images: ["/og-image.jpg"] },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Book a cleaning", item: `${SITE_URL}/booking` },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, "\\u003c") }}
      />
      <section className="booking-section booking-page" aria-labelledby="booking-title">
        <div className="booking-intro">
          <Breadcrumbs current="Book a cleaning" />
          <h1 id="booking-title">Book your clean.</h1>
          <p>Share the essentials, then review your prepared request in WhatsApp before sending.</p>

          <ol className="booking-steps" id="process">
            <li><span>01</span><div><strong>Choose your service</strong><small>Select the closest match for your space.</small></div></li>
            <li><span>02</span><div><strong>Add the essentials</strong><small>Your name, area, property and preferred date.</small></div></li>
            <li><span>03</span><div><strong>Confirm on WhatsApp</strong><small>We agree availability and your quote directly.</small></div></li>
          </ol>

          <div className="booking-contact">
            <WhatsAppIcon width={20} height={20} aria-hidden="true" />
            <span><small>Prefer to chat now?</small><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{DISPLAY_PHONE}</a></span>
          </div>
        </div>
        <BookingForm initialService={service} />
      </section>
    </main>
  );
}
