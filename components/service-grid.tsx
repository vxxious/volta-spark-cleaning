"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { services } from "../lib/site-data";

export function ServiceGrid({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      grid.dataset.visible = "true";
      return;
    }

    grid.dataset.animate = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      grid.dataset.visible = "true";
      observer.disconnect();
    }, { rootMargin: "0px 0px -80px" });

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="services-grid" ref={gridRef}>
      {visibleServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <li key={service.name}>
            <Link
              href={`/?service=${encodeURIComponent(service.name)}#book`}
              className="service-card"
              style={{ "--entry-delay": `${Math.min(index * 60, 300)}ms` } as CSSProperties}
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
