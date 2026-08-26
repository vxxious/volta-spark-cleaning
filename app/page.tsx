"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  HardHat,
  Home as HomeIcon,
  Leaf,
  MapPin,
  MessageCircle,
  Music2,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Truck,
  UsersRound,
} from "lucide-react";

const WHATSAPP_NUMBER = "2348035496228";

const services = [
  {
    name: "Home cleaning",
    shortName: "Home",
    description: "Regular care for apartments and family homes, shaped around your routine.",
    icon: HomeIcon,
  },
  {
    name: "Deep cleaning",
    shortName: "Deep clean",
    description: "A detailed, top-to-bottom reset for spaces that need extra attention.",
    icon: Sparkles,
  },
  {
    name: "Office and commercial",
    shortName: "Office",
    description: "Dependable cleaning that keeps teams comfortable and spaces client-ready.",
    icon: Building2,
  },
  {
    name: "Post-construction",
    shortName: "Post-build",
    description: "Fine dust and debris cleared after renovations or building work.",
    icon: HardHat,
  },
  {
    name: "Move-in or move-out",
    shortName: "Moving",
    description: "A fresh start before you unpack, or a clean finish before handover.",
    icon: Truck,
  },
  {
    name: "Event and short-let reset",
    shortName: "Event / short-let",
    description: "Fast, thoughtful resets before guests arrive or after the celebration ends.",
    icon: PartyPopper,
  },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/voltaspark_cleaning_services?igsi=MTZpYnBrNjkyMW1iag==",
    icon: Camera,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@voltasparkcleaning?_r=1&_t=ZS-99Ce5FMpStc",
    icon: Music2,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EpgJZsswM/?mibextid=wwXIfr",
    icon: UsersRound,
  },
] as const;

function Brand() {
  return (
    <span className="brand-lockup" aria-label="Volta Spark, Pure Clean Solutions">
      <span className="brand-name">
        Volta<span>Spark</span>
      </span>
      <small>Pure Clean Solutions.</small>
    </span>
  );
}

export default function Home() {
  const [selectedService, setSelectedService] = useState(services[0].name);

  function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const area = String(form.get("area") ?? "").trim();
    const property = String(form.get("property") ?? "").trim();
    const date = String(form.get("date") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const message = [
      "Hello Volta Spark! I would like to request a cleaning quote.",
      "",
      `Name: ${name}`,
      `Service: ${selectedService}`,
      `Property: ${property}`,
      `Area in Lagos: ${area}`,
      `Preferred date: ${date || "Flexible"}`,
      notes ? `Extra details: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="header-brand" href="#top">
          <Brand />
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#why-us">Why us</a>
          <a href="#process">How it works</a>
          <a className="nav-cta" href="#booking">
            Book a clean <ArrowRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <p className="eyebrow">Professional cleaning in Lagos</p>
          <h1 id="hero-title">
            A cleaner space,
            <span>without the stress.</span>
          </h1>
          <p className="hero-copy">
            Reliable home, office and short-let cleaning, booked in minutes and handled with care.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#booking">
              Book a cleaning <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a
              className="text-link"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" /> Chat with us
            </a>
          </div>
          <p className="hero-footnote">
            <Check size={16} aria-hidden="true" /> No payment required to request a quote
          </p>
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
            <span>
              <strong>Care you can count on</strong>
              <small>For homes and businesses across Lagos</small>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="trust-strip" aria-label="Volta Spark service promises">
        <div>
          <ShieldCheck size={20} aria-hidden="true" />
          <span><strong>Trained and trusted</strong><small>A reliable cleaning team</small></span>
        </div>
        <div>
          <Leaf size={20} aria-hidden="true" />
          <span><strong>Eco-conscious</strong><small>Thoughtful product choices</small></span>
        </div>
        <div>
          <CalendarDays size={20} aria-hidden="true" />
          <span><strong>Reliable timing</strong><small>Planned around your day</small></span>
        </div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Services</p>
            <h2 id="services-title">The right clean for your space.</h2>
          </div>
          <p>From everyday upkeep to a full reset, choose what you need and send your request in a few taps.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                href="#booking"
                className="service-card"
                key={service.name}
                onClick={() => setSelectedService(service.name)}
              >
                <span className="service-icon"><Icon size={24} aria-hidden="true" /></span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <span className="service-link">Choose service <ArrowRight size={16} aria-hidden="true" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="booking-section" id="booking" aria-labelledby="booking-title">
        <div className="booking-intro">
          <p className="section-kicker section-kicker-light">Quick booking</p>
          <h2 id="booking-title">Start your booking here.</h2>
          <p>Share the basics. We will prepare your request and open WhatsApp so you can send it directly to our team.</p>

          <ul className="booking-points">
            <li><CheckCircle2 size={19} aria-hidden="true" /> Takes about one minute</li>
            <li><CheckCircle2 size={19} aria-hidden="true" /> No account or payment needed</li>
            <li><CheckCircle2 size={19} aria-hidden="true" /> Quote confirmed in WhatsApp</li>
          </ul>

          <div className="booking-contact">
            <MessageCircle size={21} aria-hidden="true" />
            <span>
              <small>Prefer to chat directly?</small>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                +234 803 549 6228
              </a>
            </span>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleBooking}>
          <fieldset>
            <legend>Choose a service</legend>
            <div className="service-picker">
              {services.map((service) => {
                const Icon = service.icon;
                const selected = selectedService === service.name;
                return (
                  <button
                    aria-pressed={selected}
                    className={selected ? "active" : ""}
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    type="button"
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{service.shortName}</span>
                    {selected && <CheckCircle2 className="selected-check" size={16} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>Your details</legend>
            <div className="form-grid">
              <label>
                Your name
                <input name="name" placeholder="e.g. Ada" required autoComplete="name" />
              </label>
              <label>
                Property type
                <select name="property" defaultValue="" required>
                  <option value="" disabled>Select one</option>
                  <option>Home or apartment</option>
                  <option>Office or commercial space</option>
                  <option>Short-let or Airbnb</option>
                  <option>Event venue</option>
                  <option>Construction site</option>
                </select>
              </label>
              <label>
                Area in Lagos
                <input name="area" placeholder="e.g. Magodo" required autoComplete="address-level2" />
              </label>
              <label>
                Preferred date <span className="optional">Optional</span>
                <input name="date" type="date" />
              </label>
              <label className="full-width">
                Extra details <span className="optional">Optional</span>
                <textarea
                  name="notes"
                  placeholder="Number of rooms, preferred time, or anything we should know"
                  rows={3}
                />
              </label>
            </div>
          </fieldset>

          <button className="whatsapp-button" type="submit">
            <MessageCircle size={20} aria-hidden="true" /> Continue to WhatsApp
            <ArrowRight size={19} aria-hidden="true" />
          </button>
          <p className="form-note">Your details stay in this form until you choose to send them on WhatsApp.</p>
        </form>
      </section>

      <section className="why-section" id="why-us" aria-labelledby="why-title">
        <div className="why-heading">
          <p className="section-kicker">Why Volta Spark</p>
          <h2 id="why-title">A straightforward service, done properly.</h2>
          <p>Clear communication, careful work and a team that respects your space from arrival to finish.</p>
          <a className="text-link" href="#booking">Request a quote <ArrowRight size={17} aria-hidden="true" /></a>
        </div>

        <div className="benefit-list">
          <article>
            <span className="benefit-number">01</span>
            <div><h3>People you can trust</h3><p>A trained and background-checked team for homes, offices and guest spaces.</p></div>
          </article>
          <article>
            <span className="benefit-number">02</span>
            <div><h3>Careful product choices</h3><p>We use effective products with your comfort and the needs of each surface in mind.</p></div>
          </article>
          <article>
            <span className="benefit-number">03</span>
            <div><h3>Communication that is clear</h3><p>Your service, quote, timing and important details are agreed before the clean begins.</p></div>
          </article>
        </div>
      </section>

      <section className="process-section" id="process" aria-labelledby="process-title">
        <div className="section-heading process-heading">
          <div>
            <p className="section-kicker">How it works</p>
            <h2 id="process-title">From request to spotless.</h2>
          </div>
          <p>No account, complicated checkout or back-and-forth forms.</p>
        </div>

        <ol className="process-grid">
          <li>
            <span>1</span>
            <MessageCircle size={24} aria-hidden="true" />
            <h3>Send your request</h3>
            <p>Choose a service, add your details and continue to WhatsApp.</p>
          </li>
          <li>
            <span>2</span>
            <CalendarDays size={24} aria-hidden="true" />
            <h3>Confirm the plan</h3>
            <p>We agree the quote, date, arrival time and access details with you.</p>
          </li>
          <li>
            <span>3</span>
            <Sparkles size={24} aria-hidden="true" />
            <h3>Enjoy your clean space</h3>
            <p>Our team handles the work while you get your time and comfort back.</p>
          </li>
        </ol>
      </section>

      <section className="final-cta" aria-labelledby="final-cta-title">
        <div>
          <p className="section-kicker section-kicker-light">Ready when you are</p>
          <h2 id="final-cta-title">Your cleaner space starts here.</h2>
        </div>
        <a className="primary-button primary-button-light" href="#booking">
          Book your clean <ArrowRight size={19} aria-hidden="true" />
        </a>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Professional cleaning for homes, offices and short-lets across Lagos.</p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <a href="#services">Services</a>
            <a href="#why-us">Why us</a>
            <a href="#process">How it works</a>
          </div>
          <div className="footer-column">
            <strong>Contact</strong>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              +234 803 549 6228
            </a>
            <span><MapPin size={15} aria-hidden="true" /> Lagos, Nigeria</span>
          </div>
          <div className="footer-social">
            <strong>Follow</strong>
            <div>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 Volta Spark Cleaning Services</span>
          <a
            href="https://unsplash.com/photos/a-woman-mops-a-bright-modern-living-room-floor-2NcTLdFHpH8"
            target="_blank"
            rel="noreferrer"
          >
            Photography by Vitaly Gariev
          </a>
        </div>
      </footer>

      <a className="mobile-booking-bar" href="#booking">
        <MessageCircle size={19} aria-hidden="true" /> Book on WhatsApp
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    </main>
  );
}
