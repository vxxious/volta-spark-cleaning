/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors bypass unreliable Vinext client routing in production. */

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Volta Spark",
  description: "The page you requested could not be found. Return to Volta Spark or book a cleaning service in Lagos.",
};

export default function NotFound() {
  return (
    <main id="main-content">
      <section className="not-found-section" aria-labelledby="not-found-title">
        <div className="not-found-layout">
          <p className="not-found-code" aria-hidden="true">404</p>
          <div className="not-found-copy">
            <h1 id="not-found-title">This page is not here.</h1>
            <p>The link may have changed. Return home or continue directly to the cleaning request page.</p>
            <div className="not-found-actions">
              <a className="primary-button" href="/">Return home</a>
              <a className="text-link" href="/booking">Book a cleaning <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
