import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Leaf,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { ServiceGrid } from "../components/service-grid";
import { WHATSAPP_NUMBER } from "../lib/site-data";

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <p className="eyebrow">Professional cleaning in Lagos</p>
          <h1 id="hero-title">A cleaner space,<span>without the stress.</span></h1>
          <p className="hero-copy">Reliable home, office and short-let cleaning, booked in minutes and handled with care.</p>
          <div className="hero-actions">
            <Link className="primary-button" href="/booking">Book a cleaning <ArrowRight size={19} aria-hidden="true" /></Link>
            <a className="text-link" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Chat with us
            </a>
          </div>
          <p className="hero-footnote"><Check size={16} aria-hidden="true" /> No payment required to request a quote</p>
        </div>

        <figure className="hero-photo-wrap">
          <Image
            className="hero-photo"
            src="/volta-spark-cleaner.jpg"
            alt="A cleaner mopping a bright, modern living room"
            width={1800}
            height={1013}
            priority
            sizes="(max-width: 760px) 100vw, 56vw"
          />
          <figcaption>
            <ShieldCheck size={20} aria-hidden="true" />
            <span><strong>Care you can count on</strong><small>For homes and businesses across Lagos</small></span>
          </figcaption>
        </figure>
      </section>

      <section className="trust-strip" aria-label="Volta Spark service promises">
        <div><ShieldCheck size={20} aria-hidden="true" /><span><strong>Trained and trusted</strong><small>A reliable cleaning team</small></span></div>
        <div><Leaf size={20} aria-hidden="true" /><span><strong>Eco-conscious</strong><small>Thoughtful product choices</small></span></div>
        <div><CalendarDays size={20} aria-hidden="true" /><span><strong>Reliable timing</strong><small>Planned around your day</small></span></div>
      </section>

      <section className="services-section" aria-labelledby="home-services-title">
        <div className="section-heading">
          <div><p className="section-kicker">Popular services</p><h2 id="home-services-title">The right clean for your space.</h2></div>
          <div className="section-heading-action">
            <p>Explore the full service range and choose the clean that fits your space.</p>
            <Link className="text-link" href="/services">View all services <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <ServiceGrid limit={3} />
      </section>

      <section className="why-section" aria-labelledby="home-why-title">
        <div className="why-heading">
          <p className="section-kicker">Why Volta Spark</p>
          <h2 id="home-why-title">A straightforward service, done properly.</h2>
          <p>Clear communication, careful work and a team that respects your space from arrival to finish.</p>
          <Link className="text-link" href="/about">Learn about us <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="benefit-list">
          <article><span className="benefit-number">01</span><div><h3>People you can trust</h3><p>A trained and background-checked team for homes, offices and guest spaces.</p></div></article>
          <article><span className="benefit-number">02</span><div><h3>Careful product choices</h3><p>Effective products selected with your comfort and each surface in mind.</p></div></article>
          <article><span className="benefit-number">03</span><div><h3>Communication that is clear</h3><p>Your service, quote and timing are agreed before the clean begins.</p></div></article>
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="section-heading process-heading">
          <div><p className="section-kicker">How it works</p><h2 id="process-title">From request to spotless.</h2></div>
          <p>No account, complicated checkout or back-and-forth forms.</p>
        </div>
        <ol className="process-grid">
          <li><span>1</span><h3>Send your request</h3><p>Choose a service, add your details and continue to WhatsApp.</p></li>
          <li><span>2</span><h3>Confirm the plan</h3><p>We agree the quote, date, arrival time and access details with you.</p></li>
          <li><span>3</span><h3>Enjoy your clean space</h3><p>Our team handles the work while you get your time and comfort back.</p></li>
        </ol>
      </section>

      <section className="final-cta" aria-labelledby="home-cta-title">
        <div><p className="section-kicker section-kicker-light">Ready when you are</p><h2 id="home-cta-title">Your cleaner space starts here.</h2></div>
        <Link className="primary-button primary-button-light" href="/booking">Book your clean <ArrowRight size={19} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
