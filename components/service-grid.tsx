import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "../lib/site-data";

export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;

  return (
    <div className="services-grid">
      {visibleServices.map((service) => {
        const Icon = service.icon;
        return (
          <Link
            href={`/booking?service=${encodeURIComponent(service.name)}`}
            className="service-card"
            key={service.name}
          >
            <span className="service-icon"><Icon size={21} aria-hidden="true" /></span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <span className="service-link">Choose service <ArrowRight size={16} aria-hidden="true" /></span>
          </Link>
        );
      })}
    </div>
  );
}
