import type { Metadata } from "next";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { BookingForm } from "../../components/booking-form";
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Book a Cleaning | Volta Spark Lagos",
  description: "Request your Volta Spark cleaning quote and send your booking details directly to our Lagos team on WhatsApp.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main>
      <section className="page-hero page-hero-compact">
        <p className="section-kicker">Book a clean</p>
        <h1>A few details, then straight to WhatsApp.</h1>
        <p>No account or online payment. We confirm your quote, availability and appointment directly with you.</p>
      </section>

      <section className="booking-section booking-page-section" aria-labelledby="booking-form-title">
        <div className="booking-intro">
          <p className="section-kicker section-kicker-light">Quick booking</p>
          <h2 id="booking-form-title">Start your request.</h2>
          <p>Choose your service and tell us about the property. Your message will be prepared for you to review before sending.</p>
          <ul className="booking-points">
            <li><CheckCircle2 size={19} aria-hidden="true" /> Takes about one minute</li>
            <li><CheckCircle2 size={19} aria-hidden="true" /> No account or payment needed</li>
            <li><CheckCircle2 size={19} aria-hidden="true" /> Quote confirmed in WhatsApp</li>
          </ul>
          <div className="booking-contact">
            <MessageCircle size={21} aria-hidden="true" />
            <span><small>Prefer to chat directly?</small><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{DISPLAY_PHONE}</a></span>
          </div>
        </div>
        <BookingForm initialService={service} />
      </section>
    </main>
  );
}
