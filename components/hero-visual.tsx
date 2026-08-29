"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroVisual() {
  const figureRef = useRef<HTMLElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const locationLayerRef = useRef<HTMLSpanElement>(null);
  const servicesLayerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    const imageLayer = imageLayerRef.current;
    const locationLayer = locationLayerRef.current;
    const servicesLayer = servicesLayerRef.current;
    if (!figure || !imageLayer || !locationLayer || !servicesLayer) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 761px)");
    let frame = 0;
    let intersecting = false;

    function resetLayers() {
      imageLayer.style.transform = "translate3d(0, 0, 0) scale(1.06)";
      locationLayer.style.transform = "translate3d(0, 0, 0)";
      servicesLayer.style.transform = "translate3d(0, 0, 0)";
      figure.dataset.active = "false";
    }

    function updateLayers() {
      frame = 0;
      if (!intersecting || document.visibilityState !== "visible" || !motionQuery.matches) {
        resetLayers();
        return;
      }

      const rect = figure.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const figureCenter = rect.top + rect.height / 2;
      const progress = Math.max(-1, Math.min(1, (figureCenter - viewportCenter) / window.innerHeight));

      figure.dataset.active = "true";
      imageLayer.style.transform = `translate3d(0, ${progress * -18}px, 0) scale(1.06)`;
      locationLayer.style.transform = `translate3d(0, ${progress * 28}px, 0)`;
      servicesLayer.style.transform = `translate3d(0, ${progress * -34}px, 0)`;
    }

    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateLayers);
    }

    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      requestUpdate();
    });

    observer.observe(figure);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("visibilitychange", requestUpdate);
    motionQuery.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      document.removeEventListener("visibilitychange", requestUpdate);
      motionQuery.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <figure className="hero-photo-wrap" ref={figureRef}>
      <div className="hero-image-layer" ref={imageLayerRef}>
        <Image
          className="hero-photo"
          src="/volta-spark-cleaner.jpg"
          alt="A professional cleaner mopping a bright living room"
          width={1800}
          height={1013}
          priority
          sizes="(max-width: 760px) 100vw, 54vw"
        />
      </div>
      <span className="hero-visual-label hero-visual-location" ref={locationLayerRef}>Lagos, Nigeria</span>
      <span className="hero-visual-label hero-visual-services" ref={servicesLayerRef}>Homes, offices and short lets</span>
    </figure>
  );
}
