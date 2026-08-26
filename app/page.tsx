"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import {
  ArrowDown, ArrowRight, BadgeCheck, Building2, CalendarDays, Check, CheckCircle2,
  Camera, Clock3, Home as HomeIcon, Leaf, MapPin, MessageCircle,
  Music2, PartyPopper, ShieldCheck, Sparkles, SprayCan, Star, Truck, UsersRound,
} from "lucide-react";

const WHATSAPP_NUMBER = "2348035496228";

const services = [
  { name: "Deep cleaning", shortName: "Deep clean", description: "A thorough top-to-bottom reset for homes and apartments.", icon: Sparkles },
  { name: "Standard cleaning", shortName: "Standard", description: "Regular upkeep that keeps your space fresh and comfortable.", icon: HomeIcon },
  { name: "Office & commercial", shortName: "Office", description: "Flexible cleaning for focused, client-ready workspaces.", icon: Building2 },
  { name: "Post-construction", shortName: "Post-build", description: "Detailed dust and debris removal after building work.", icon: SprayCan },
  { name: "Move-in / move-out", shortName: "Moving", description: "A spotless start or finish when you change homes.", icon: Truck },
  { name: "Event cleaning", shortName: "Event", description: "Before and after-event support, without the clean-up stress.", icon: PartyPopper },
] as const;

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/voltaspark_cleaning_services?igsi=MTZpYnBrNjkyMW1iag==", icon: Camera },
  { label: "TikTok", href: "https://www.tiktok.com/@voltasparkcleaning?_r=1&_t=ZS-99Ce5FMpStc", icon: Music2 },
  { label: "Facebook", href: "https://www.facebook.com/share/1EpgJZsswM/?mibextid=wwXIfr", icon: UsersRound },
] as const;

function Brand() {
  return (
    <span className="brand-lockup">
      <span className="brand-symbol" aria-hidden="true"><Sparkles size={17} strokeWidth={2.5} /></span>
      <span className="brand-name">Volta<span>Spark</span><small>Pure Clean Solutions.</small></span>
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
      "Hello Volta Spark! I would like to request a cleaning quote.", "",
      `Name: ${name}`, `Service: ${selectedService}`, `Property: ${property}`,
      `Area in Lagos: ${area}`, `Preferred date: ${date || "Flexible"}`,
      notes ? `Extra details: ${notes}` : "",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main id="top">
      <header className="site-header">
        <a href="#top" aria-label="Volta Spark home"><Brand /></a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a><a href="#why-us">Why us</a>
          <a href="#booking" className="nav-cta">Book a clean <ArrowRight size={15} /></a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="eyebrow"><span><Sparkles size={13} /></span> Trusted cleaning in Lagos</div>
          <h1 id="hero-title">More shine.<br /><em>Less stress.</em></h1>
          <p className="hero-copy">Reliable cleaning for homes, offices and everything in between, handled by a trained team that cares about the details.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#booking">Book on WhatsApp <ArrowRight size={19} /></a>
            <a className="text-link" href="#services">Explore services <ArrowDown size={16} /></a>
          </div>
          <div className="trust-row" aria-label="Service promises">
            <span><Check size={14} /> Background-checked team</span>
            <span><Check size={14} /> Eco-friendly products</span>
            <span><Check size={14} /> Satisfaction guaranteed</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="sparkle-mark"><Sparkles size={84} strokeWidth={1.1} /></div>
          <div className="visual-card card-top"><span className="icon-circle"><Clock3 size={20} /></span><span><strong>On your time</strong><small>Flexible scheduling</small></span></div>
          <div className="visual-card card-bottom"><span className="icon-circle"><BadgeCheck size={20} /></span><span><strong>Done with care</strong><small>Trained professionals</small></span></div>
          <span className="visual-caption">Your comfort,<br /><strong>our priority.</strong></span>
        </div>
      </section>

      <section className="booking-shell" id="booking" aria-labelledby="booking-title">
        <div className="booking-intro">
          <span className="section-kicker">Quick booking</span>
          <h2 id="booking-title">Tell us what needs a little sparkle.</h2>
          <p>Choose your service and share a few details. We’ll open WhatsApp with your request ready to send.</p>
          <div className="booking-contact"><MessageCircle size={19} /><span><small>Prefer to chat directly?</small><a href="https://wa.me/2348035496228" target="_blank" rel="noreferrer">+234 803 549 6228</a></span></div>
        </div>

        <form className="booking-form" onSubmit={handleBooking}>
          <fieldset>
            <legend>1. Choose a service</legend>
            <div className="service-picker">
              {services.map((service) => {
                const Icon = service.icon;
                const selected = selectedService === service.name;
                return (
                  <button aria-pressed={selected} className={selected ? "active" : ""} key={service.name} onClick={() => setSelectedService(service.name)} type="button">
                    <Icon size={19} /><span>{service.shortName}</span>{selected && <CheckCircle2 className="selected-check" size={16} />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Your details</legend>
            <div className="form-grid">
              <label>Your name<input name="name" placeholder="e.g. Ada" required autoComplete="name" /></label>
              <label>Property type<select name="property" defaultValue="" required><option value="" disabled>Select one</option><option>Home / apartment</option><option>Office / commercial space</option><option>Short-let / Airbnb</option><option>Event venue</option><option>Construction site</option></select></label>
              <label>Area in Lagos<input name="area" placeholder="e.g. Magodo" required autoComplete="address-level2" /></label>
              <label>Preferred date <span className="optional">Optional</span><input name="date" type="date" /></label>
              <label className="full-width">Anything else? <span className="optional">Optional</span><textarea name="notes" placeholder="Number of rooms, preferred time, or anything we should know…" rows={3} /></label>
            </div>
          </fieldset>

          <button className="whatsapp-button" type="submit"><MessageCircle size={20} /> Continue to WhatsApp <ArrowRight size={19} /></button>
          <p className="form-note">No payment required. We’ll confirm your quote and availability in the chat.</p>
        </form>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-heading"><div><span className="section-kicker">What we clean</span><h2 id="services-title">A clean for every kind of day.</h2></div><p>From weekly upkeep to the biggest reset, choose the service that fits your space.</p></div>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a href="#booking" className="service-card" key={service.name} onClick={() => setSelectedService(service.name)}>
                <span className="service-number">0{index + 1}</span><Icon size={27} /><h3>{service.name}</h3><p>{service.description}</p><span className="service-link">Select service <ArrowRight size={15} /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="why-section" id="why-us" aria-labelledby="why-title">
        <div className="why-visual"><div className="why-badge"><Star size={20} fill="currentColor" /> <strong>5-star care</strong><span>for every space</span></div><div className="clean-rings" aria-hidden="true"><Sparkles size={92} strokeWidth={1} /></div><span className="why-quote">“Let us handle the mess while you enjoy a spotless space.”</span></div>
        <div className="why-copy">
          <span className="section-kicker light">Why Volta Spark</span><h2 id="why-title">Clean spaces.<br /><em>Clear minds.</em></h2><p>We bring the products, people and attention to detail. You get your time and comfort back.</p>
          <div className="benefit-list">
            <div><span><ShieldCheck size={22} /></span><p><strong>Trained & trusted</strong><small>A reliable, background-checked team.</small></p></div>
            <div><span><Leaf size={22} /></span><p><strong>Eco-conscious</strong><small>Thoughtful products for healthier spaces.</small></p></div>
            <div><span><CalendarDays size={22} /></span><p><strong>Reliable timing</strong><small>We work around the time that suits you.</small></p></div>
          </div>
        </div>
      </section>

      <section className="steps-section" aria-labelledby="steps-title">
        <span className="section-kicker">Easy from the start</span><h2 id="steps-title">A sparkling space in three steps.</h2>
        <div className="steps-grid">
          <div><span>01</span><MessageCircle size={24} /><h3>Tell us what you need</h3><p>Choose a service and send the ready-made request on WhatsApp.</p></div>
          <div><span>02</span><CalendarDays size={24} /><h3>Confirm your clean</h3><p>We’ll agree your quote, preferred date and arrival time with you.</p></div>
          <div><span>03</span><Sparkles size={24} /><h3>Enjoy the sparkle</h3><p>Our team handles the mess while you enjoy a fresh, comfortable space.</p></div>
        </div>
      </section>

      <section className="final-cta"><span className="section-kicker light">Ready when you are</span><h2>Let’s make your space<br /><em>sparkle.</em></h2><a href="#booking" className="primary-button">Book your clean <ArrowRight size={19} /></a></section>

      <footer>
        <div className="footer-brand"><Brand /><p>Professional cleaning for homes, offices and short-lets across Lagos.</p></div>
        <div className="footer-links"><strong>Explore</strong><a href="#services">Services</a><a href="#why-us">Why us</a><a href="#booking">Book a clean</a></div>
        <div className="footer-contact"><strong>Contact</strong><a href="https://wa.me/2348035496228" target="_blank" rel="noreferrer">+234 803 549 6228</a><span><MapPin size={14} /> Lagos, Nigeria</span></div>
        <div className="footer-social"><strong>Follow</strong><div>{socialLinks.map(({ label, href, icon: Icon }) => <a href={href} key={label} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18} /></a>)}</div></div>
        <div className="footer-bottom"><span>© 2026 Volta Spark Cleaning Services</span><span>Pure Clean Solutions.</span></div>
      </footer>

      <a className="mobile-booking-bar" href="#booking"><MessageCircle size={19} /> Book on WhatsApp <ArrowRight size={18} /></a>
    </main>
  );
}
