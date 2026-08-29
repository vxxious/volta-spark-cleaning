"use client";

import { useEffect, useRef } from "react";

const wordmarks = ["Homes", "Offices", "Short lets", "Post construction"] as const;

export function BrandMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let visible = false;

    function syncPlayback() {
      marquee.dataset.running = String(visible && document.visibilityState === "visible");
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });

    observer.observe(marquee);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <section className="brand-marquee" aria-label="Volta Spark cleaning services" ref={marqueeRef}>
      <p className="sr-only">Volta Spark provides cleaning for homes, offices, short lets and post-construction spaces.</p>
      <div className="brand-marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="brand-marquee-group" key={group}>
            {wordmarks.map((label) => (
              <span className="marquee-item" key={`${group}-${label}`}>
                <span className="marquee-wordmark">Volta<span>Spark</span></span>
                <small>{label}</small>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
