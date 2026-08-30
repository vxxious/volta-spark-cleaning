import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingForm } from "../components/booking-form";
import { BrandMarquee } from "../components/brand-marquee";
import { HeroVisual } from "../components/hero-visual";
import { ServiceGrid } from "../components/service-grid";
import { WhatsAppIcon } from "../components/whatsapp-icon";
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "../lib/site-data";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <h1 id="hero-title">A cleaner space,<span>without the stress.</span></h1>
          <div className="hero-foot">
            <p className="hero-copy">Professional cleaning for homes, offices and short lets across Lagos.</p>
            <div>
              <div className="hero-actions">
                <Link className="primary-button" href="#book">Book a cleaning <ArrowRight size={19} aria-hidden="true" /></Link>
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

      <section className="booking-section" id="book" aria-labelledby="booking-title">
        <div className="booking-intro">
          <h2 id="booking-title">Tell us what needs cleaning.</h2>
          <p>Complete the short form and review your prepared request in WhatsApp before sending.</p>

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
