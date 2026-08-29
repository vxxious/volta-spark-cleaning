import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceGrid } from "../../components/service-grid";

export const metadata: Metadata = {
  title: "Cleaning Services in Lagos | Volta Spark",
  description: "Explore Volta Spark home, deep, office, post-construction, moving and guest turnover cleaning services in Lagos.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="section-kicker">Our services</p>
        <h1>Cleaning that fits your space and schedule.</h1>
        <p>Choose the service you need, then send the details directly to our team on WhatsApp.</p>
      </section>

      <section className="services-section services-page" aria-label="Cleaning services">
        <ServiceGrid />
      </section>

      <section className="final-cta" aria-labelledby="services-cta-title">
        <div><p className="section-kicker section-kicker-light">Need help choosing?</p><h2 id="services-cta-title">Tell us about your space.</h2></div>
        <Link className="primary-button primary-button-light" href="/contact">Contact our team <ArrowRight size={19} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
