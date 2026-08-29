"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { services, WHATSAPP_NUMBER } from "../lib/site-data";

export function BookingForm({ initialService }: { initialService?: string }) {
  const validInitialService = initialService && services.some((service) => service.name === initialService)
    ? initialService
    : services[0].name;
  const [selectedService, setSelectedService] = useState(validInitialService);

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
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
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
          <label>Your name<input name="name" placeholder="e.g. Ada" required autoComplete="name" /></label>
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
          <label>Area in Lagos<input name="area" placeholder="e.g. Magodo" required autoComplete="address-level2" /></label>
          <label>Preferred date <span className="optional">Optional</span><input name="date" type="date" /></label>
          <label className="full-width">
            Extra details <span className="optional">Optional</span>
            <textarea name="notes" placeholder="Number of rooms, preferred time, or anything we should know" rows={3} />
          </label>
        </div>
      </fieldset>

      <button className="whatsapp-button" type="submit">
        <MessageCircle size={20} aria-hidden="true" /> Continue to WhatsApp
        <ArrowRight size={19} aria-hidden="true" />
      </button>
      <p className="form-note">Your details stay here until you choose to send them on WhatsApp.</p>
    </form>
  );
}
