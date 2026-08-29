import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck2, Leaf, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Volta Spark | Cleaning Services in Lagos",
  description: "Meet Volta Spark and learn how our trusted Lagos cleaning team approaches homes, offices and guest spaces.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero page-hero-sage">
        <p className="section-kicker">About Volta Spark</p>
        <h1>We take care of the mess, so you can enjoy the space.</h1>
        <p>Volta Spark is a Lagos cleaning service built around reliable people, clear communication and careful work.</p>
      </section>

      <section className="about-story">
        <div>
          <p className="section-kicker">Our approach</p>
          <h2>Comfort starts with a space that feels properly cared for.</h2>
        </div>
        <div className="about-copy">
          <p>We clean homes, offices, short-lets, event spaces and newly completed properties across Lagos. Every booking begins with understanding the space, the timing and what a successful clean looks like for you.</p>
          <p>Our team arrives prepared, works respectfully and keeps you informed. There are no complicated accounts or unclear checkout steps: your request, quote and confirmation happen directly with us.</p>
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div className="section-heading">
          <div><p className="section-kicker">What matters to us</p><h2 id="values-title">Simple standards that shape every clean.</h2></div>
        </div>
        <div className="values-grid">
          <article><ShieldCheck size={23} aria-hidden="true" /><h3>Trusted people</h3><p>A trained, background-checked team that respects your property and privacy.</p></article>
          <article><Leaf size={23} aria-hidden="true" /><h3>Thoughtful care</h3><p>Effective product choices made for the surface, space and people using it.</p></article>
          <article><CalendarCheck2 size={23} aria-hidden="true" /><h3>Dependable service</h3><p>Clear timing and communication before, during and after your appointment.</p></article>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="about-cta-title">
        <div><p className="section-kicker section-kicker-light">Let us help</p><h2 id="about-cta-title">Ready for a cleaner space?</h2></div>
        <Link className="primary-button primary-button-light" href="/booking">Book your clean <ArrowRight size={19} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
