import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SocialLinks } from "../../components/social-links";
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Contact Volta Spark | Lagos Cleaning Service",
  description: "Contact Volta Spark Cleaning Services in Lagos by WhatsApp, phone or social media.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero page-hero-sage">
        <p className="section-kicker">Contact</p>
        <h1>Let us talk about your space.</h1>
        <p>For quotes, availability or questions, reach our Lagos team directly.</p>
      </section>

      <section className="contact-section">
        <div className="contact-primary">
          <p className="section-kicker section-kicker-light">Fastest response</p>
          <h2>Chat with us on WhatsApp.</h2>
          <p>Tell us the service you need, your area and preferred date. We will guide you from there.</p>
          <a className="primary-button primary-button-light" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> Start a conversation
          </a>
        </div>
        <div className="contact-details">
          <article><Phone size={22} aria-hidden="true" /><div><small>Phone and WhatsApp</small><a href={`tel:+${WHATSAPP_NUMBER}`}>{DISPLAY_PHONE}</a></div></article>
          <article><MapPin size={22} aria-hidden="true" /><div><small>Service area</small><strong>Lagos, Nigeria</strong></div></article>
          <article className="contact-social"><div><small>Follow Volta Spark</small><SocialLinks /></div></article>
        </div>
      </section>
    </main>
  );
}
