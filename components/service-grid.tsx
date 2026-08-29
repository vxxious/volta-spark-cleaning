import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "../lib/site-data";

export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <ul className="services-grid">
      {visibleServices.map((service) => {
        const Icon = service.icon;
        return (
          <li key={service.name}>
            <Link
              href={`/?service=${encodeURIComponent(service.name)}#book`}
              className="service-card"
            >
              <span className="service-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className="service-copy">
                <strong>{service.name}</strong>
                <span>{service.description}</span>
              </span>
              <span className="service-link">Choose <ArrowRight size={17} aria-hidden="true" /></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
