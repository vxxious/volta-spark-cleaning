"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  HardHat,
  Home as HomeIcon,
  Leaf,
  MapPin,
  MessageCircle,
  RefreshCcw,
  ShieldCheck,
  SprayCan,
  Truck,
} from "lucide-react";

type SocialIcon = { path: string };

const brandIcons = {
  instagram: {
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  tiktok: {
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  facebook: {
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
} satisfies Record<string, SocialIcon>;

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
    icon: SprayCan,
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
    icon: RefreshCcw,
  },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/voltaspark_cleaning_services?igsi=MTZpYnBrNjkyMW1iag==",
    icon: brandIcons.instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@voltasparkcleaning?_r=1&_t=ZS-99Ce5FMpStc",
    icon: brandIcons.tiktok,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EpgJZsswM/?mibextid=wwXIfr",
    icon: brandIcons.facebook,
  },
] as const;

function SocialBrandIcon({ icon }: { icon: SocialIcon }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

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
            <h3>Send your request</h3>
            <p>Choose a service, add your details and continue to WhatsApp.</p>
          </li>
          <li>
            <span>2</span>
            <h3>Confirm the plan</h3>
            <p>We agree the quote, date, arrival time and access details with you.</p>
          </li>
          <li>
            <span>3</span>
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
              {socialLinks.map(({ label, href, icon }) => (
                <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}>
                  <SocialBrandIcon icon={icon} />
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
