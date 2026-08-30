import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BookingForm } from "../../components/booking-form";
import { WhatsAppIcon } from "../../components/whatsapp-icon";
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Book a Cleaning | Volta Spark",
  description: "Request a home, office, post-construction or short-let cleaning quote from Volta Spark in Lagos.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main id="main-content">
      <section className="booking-section booking-page" aria-labelledby="booking-title">
        <div className="booking-intro">
          <Link className="back-link" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link>
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
